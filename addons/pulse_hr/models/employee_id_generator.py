import random
import string
from odoo import models, fields, api


class HrEmployee(models.Model):
    _inherit = 'hr.employee'

    login_id = fields.Char(string='Login ID', readonly=True, copy=False)
    temp_password = fields.Char(string='Temporary Password', readonly=True, copy=False)
    company_code = fields.Char(string='Company Code', default='OI')

    @api.model_create_multi
    def create(self, vals_list):
        for vals in vals_list:
            # Only auto-generate if not already set
            if not vals.get('login_id'):
                vals['login_id'] = self._generate_login_id(vals)

        employees = super().create(vals_list)

        for employee in employees:
            # Create res.users account if login_id is present and user_id not set
            if employee.login_id and not employee.user_id:
                temp_pwd = self._generate_temp_password()
                email = employee.work_email or f"{employee.login_id.lower()}@example.com"

                # Create corresponding res.users account with generated credentials
                user = self.env['res.users'].sudo().create({
                    'name': employee.name,
                    'login': employee.login_id,
                    'password': temp_pwd,
                    'email': email,
                    'groups_id': [(6, 0, [self.env.ref('base.group_user').id])],
                })

                # Link user account to employee record
                employee.sudo().write({
                    'user_id': user.id,
                    'temp_password': temp_pwd,
                })

        return employees

    def _generate_login_id(self, vals):
        """Format: [CompanyCode][First2LettersFirstName+First2LettersLastName][YearOfJoining][Serial]
        Example: OIJODO20260001
        """
        company_code = vals.get('company_code', 'OI')
        name = vals.get('name', 'XXXX')
        parts = name.split()
        first = parts[0][:2].upper() if len(parts) > 0 else 'XX'
        last = parts[-1][:2].upper() if len(parts) > 1 else 'XX'

        join_date = vals.get('joining_date') or fields.Date.today()
        if isinstance(join_date, str):
            year = join_date[:4]
        else:
            year = str(join_date.year)

        # Count existing employees who joined the same year for serial number
        existing_count = self.search_count([
            ('login_id', 'like', f'{company_code}{first}{last}{year}%')
        ])
        serial = str(existing_count + 1).zfill(4)

        return f'{company_code}{first}{last}{year}{serial}'

    def _generate_temp_password(self, length=10):
        chars = string.ascii_letters + string.digits
        return ''.join(random.choice(chars) for _ in range(length))

    @api.model
    def get_pulse_dashboard_data(self):
        """API endpoint for the Pulse HR Gamified Dashboard OWL Client Action"""
        employees = self.search([])
        today = fields.Date.today()
        
        # Current user info & roles
        user = self.env.user
        current_employee = self.search([('user_id', '=', user.id)], limit=1)
        is_hr_manager = user.has_group('hr.group_hr_user') or user.has_group('hr.group_hr_manager')

        # Compute attendance statuses
        # Check-ins today with no checkout
        checked_in_emp_ids = set()
        if 'hr.attendance' in self.env:
            open_attendances = self.env['hr.attendance'].sudo().search([('check_out', '=', False)])
            checked_in_emp_ids = set(open_attendances.mapped('employee_id.id'))

        # Leaves active today
        on_leave_emp_ids = set()
        if 'hr.leave' in self.env:
            active_leaves = self.env['hr.leave'].sudo().search([
                ('state', '=', 'validate'),
                ('date_from', '<=', today),
                ('date_to', '>=', today)
            ])
            on_leave_emp_ids = set(active_leaves.mapped('employee_id.id'))

        cards = []
        present_count = 0
        absent_count = 0
        leave_count = 0

        for emp in employees:
            if emp.id in on_leave_emp_ids:
                status = 'leave'
                leave_count += 1
            elif emp.id in checked_in_emp_ids:
                status = 'present'
                present_count += 1
            else:
                status = 'absent'
                absent_count += 1

            # Mock/Compute Streak & Leave Balances for Gamification
            # Streak based on emp.id or attendance history
            streak = 5 + (emp.id % 7) if status == 'present' else (emp.id % 4)
            leave_allocated = 20
            leave_taken = 4 + (emp.id % 5)
            leave_remaining = max(0, leave_allocated - leave_taken)
            leave_pct = int((leave_remaining / leave_allocated) * 100)

            cards.append({
                'id': emp.id,
                'name': emp.name,
                'job_title': emp.job_title or emp.department_id.name or 'Team Member',
                'department': emp.department_id.name or 'General',
                'login_id': emp.login_id or f"EMP{emp.id:04d}",
                'work_email': emp.work_email or '',
                'avatar_url': f"/web/image/hr.employee/{emp.id}/avatar_128",
                'status': status,  # 'present' | 'absent' | 'leave'
                'streak': streak,
                'leave_allocated': leave_allocated,
                'leave_taken': leave_taken,
                'leave_remaining': leave_remaining,
                'leave_pct': leave_pct,
                'is_current_user': current_employee.id == emp.id if current_employee else False,
            })

        total = len(employees)
        attendance_rate = round((present_count / total * 100)) if total > 0 else 0

        # Current user's stats
        user_card = next((c for c in cards if c['is_current_user']), cards[0] if cards else None)

        return {
            'metrics': {
                'total_employees': total,
                'present_count': present_count,
                'absent_count': absent_count,
                'leave_count': leave_count,
                'attendance_rate': attendance_rate,
                'user_streak': user_card['streak'] if user_card else 5,
                'user_leave_pct': user_card['leave_pct'] if user_card else 80,
                'user_leave_remaining': user_card['leave_remaining'] if user_card else 16,
            },
            'employees': cards,
            'is_hr_manager': is_hr_manager,
            'current_user_name': user.name,
        }


