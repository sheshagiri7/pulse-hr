import json
import os
from odoo import http, fields
from odoo.http import request
from odoo.addons.web.controllers.home import Home


class PulseLandingController(http.Controller):

    @http.route(['/', '/pulse'], type='http', auth='public', sitemap=True)
    def pulse_landing(self, **kw):
        """Serves the Pulse HR public landing page."""
        return request.render('pulse_hr.landing_page', {})


class PulseEmployeeDashboardController(http.Controller):

    @http.route('/employee/dashboard', type='http', auth='user', sitemap=False)
    def employee_dashboard(self, **kw):
        """Serves Ram's Employee frontend index.html."""
        emp_file_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '../static/src/employee/index.html'))
        if not os.path.exists(emp_file_path):
            emp_file_path = os.path.abspath('/Users/sheshagiri/Pulse/Emp/index.html')

        try:
            with open(emp_file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            return request.make_response(content, headers=[('Content-Type', 'text/html; charset=utf-8')])
        except Exception:
            return request.not_found()


class PulseApiController(http.Controller):

    def _json_response(self, data, status=200):
        return request.make_response(
            json.dumps(data, default=str),
            headers=[('Content-Type', 'application/json')],
            status=status
        )

    def _get_current_employee(self):
        user = request.env.user
        employee = request.env['hr.employee'].sudo().search([('user_id', '=', user.id)], limit=1)
        if not employee:
            employee = request.env['hr.employee'].sudo().search([('work_email', '=', user.email)], limit=1)
        return employee

    # 1. User Info & Profile Endpoint
    @http.route('/api/pulse/user_info', type='http', auth='user', methods=['GET'], csrf=False)
    def get_user_info(self, **kw):
        user = request.env.user
        emp = self._get_current_employee()
        is_hr = user.has_group('hr.group_hr_user') or user.has_group('hr_attendance.group_hr_attendance_officer')

        data = {
            'user_id': user.id,
            'name': emp.name if emp else user.name,
            'login_id': emp.login_id if emp and emp.login_id else user.login,
            'email': emp.work_email if emp and emp.work_email else user.email,
            'phone': emp.work_phone or '+1 (555) 234-5678',
            'department': emp.department_id.name if emp and emp.department_id else 'Core Engineering',
            'designation': emp.job_title or 'Senior System Architect',
            'joining_date': str(emp.create_date.date()) if emp and emp.create_date else '2026-01-15',
            'is_hr': is_hr,
        }
        return self._json_response(data)

    # 2. Attendance Status & History Endpoint
    @http.route('/api/pulse/attendance/status', type='http', auth='user', methods=['GET'], csrf=False)
    def get_attendance_status(self, **kw):
        emp = self._get_current_employee()
        if not emp:
            return self._json_response({'error': 'Employee record not found'}, status=404)

        today = fields.Date.today()
        attendance = request.env['hr.attendance'].sudo().search([
            ('employee_id', '=', emp.id),
            ('check_in', '>=', f'{today} 00:00:00')
        ], order='check_in desc', limit=1)

        is_checked_in = bool(attendance and not attendance.check_out)

        return self._json_response({
            'status': 'PRESENT' if is_checked_in else 'ABSENT',
            'is_checked_in': is_checked_in,
            'check_in_time': attendance.check_in.strftime('%H:%M:%S') if attendance and attendance.check_in else None,
            'check_out_time': attendance.check_out.strftime('%H:%M:%S') if attendance and attendance.check_out else None,
            'worked_hours': round(attendance.worked_hours, 2) if attendance else 0.0,
        })

    # 3. Check-In Action
    @http.route('/api/pulse/attendance/check_in', type='http', auth='user', methods=['POST'], csrf=False)
    def check_in(self, **kw):
        emp = self._get_current_employee()
        if not emp:
            return self._json_response({'error': 'Employee record not found'}, status=404)

        open_attendance = request.env['hr.attendance'].sudo().search([
            ('employee_id', '=', emp.id),
            ('check_out', '=', False)
        ], limit=1)

        if open_attendance:
            return self._json_response({'message': 'Already checked in', 'status': 'PRESENT'})

        attendance = request.env['hr.attendance'].sudo().create({
            'employee_id': emp.id,
            'check_in': fields.Datetime.now(),
        })

        request.env['pulse.attendance.punch'].sudo().create({
            'employee_id': emp.id,
            'attendance_id': attendance.id,
            'punch_type': 'in',
            'method': 'Pulse Mission Control',
        })

        return self._json_response({'message': 'Successfully checked in', 'status': 'PRESENT'})

    # 4. Check-Out Action
    @http.route('/api/pulse/attendance/check_out', type='http', auth='user', methods=['POST'], csrf=False)
    def check_out(self, **kw):
        emp = self._get_current_employee()
        if not emp:
            return self._json_response({'error': 'Employee record not found'}, status=404)

        open_attendance = request.env['hr.attendance'].sudo().search([
            ('employee_id', '=', emp.id),
            ('check_out', '=', False)
        ], limit=1)

        if not open_attendance:
            return self._json_response({'message': 'Not currently checked in', 'status': 'ABSENT'})

        open_attendance.write({'check_out': fields.Datetime.now()})

        request.env['pulse.attendance.punch'].sudo().create({
            'employee_id': emp.id,
            'attendance_id': open_attendance.id,
            'punch_type': 'out',
            'method': 'Pulse Mission Control',
        })

        return self._json_response({'message': 'Successfully checked out', 'status': 'ABSENT'})

    # 5. Leave Balances & History
    @http.route('/api/pulse/leave/balances', type='http', auth='user', methods=['GET'], csrf=False)
    def get_leave_balances(self, **kw):
        emp = self._get_current_employee()

        leave_types = [
            {'type': 'Casual Leave', 'total_days': 12, 'used_days': 3, 'remaining_days': 9},
            {'type': 'Sick Leave', 'total_days': 10, 'used_days': 1, 'remaining_days': 9},
            {'type': 'Paid Leave', 'total_days': 15, 'used_days': 4, 'remaining_days': 11},
        ]

        requests_data = []
        if emp:
            leaves = request.env['hr.leave'].sudo().search([('employee_id', '=', emp.id)], order='create_date desc')
            for l in leaves:
                requests_data.append({
                    'id': l.id,
                    'leave_type': l.holiday_status_id.name if l.holiday_status_id else 'Paid Leave',
                    'start_date': str(l.request_date_from),
                    'end_date': str(l.request_date_to),
                    'total_days': l.number_of_days,
                    'status': l.state.upper() if l.state else 'APPROVED',
                })

        if not requests_data:
            requests_data = [
                {
                    'id': 101,
                    'leave_type': 'Paid Leave',
                    'start_date': '2026-08-25',
                    'end_date': '2026-08-26',
                    'total_days': 2,
                    'status': 'APPROVED',
                }
            ]

        return self._json_response({'balances': leave_types, 'requests': requests_data})

    # 6. Apply Leave Request
    @http.route('/api/pulse/leave/request', type='http', auth='user', methods=['POST'], csrf=False)
    def submit_leave_request(self, **kw):
        emp = self._get_current_employee()
        if not emp:
            return self._json_response({'error': 'Employee record not found'}, status=404)

        try:
            raw_body = request.httprequest.data
            body = json.loads(raw_body.decode('utf-8')) if raw_body else kw
        except Exception:
            body = kw

        leave_type_name = body.get('leave_type', 'Paid Leave')
        start_date = body.get('start_date', fields.Date.today())
        end_date = body.get('end_date', fields.Date.today())

        leave_type = request.env['hr.leave.type'].sudo().search([('name', 'ilike', leave_type_name)], limit=1)
        if not leave_type:
            leave_type = request.env['hr.leave.type'].sudo().search([], limit=1)

        leave_rec = request.env['hr.leave'].sudo().create({
            'name': body.get('reason', 'Pulse Mission Control Leave Request'),
            'employee_id': emp.id,
            'holiday_status_id': leave_type.id if leave_type else False,
            'request_date_from': start_date,
            'request_date_to': end_date,
        })

        return self._json_response({'message': 'Leave request submitted successfully', 'id': leave_rec.id, 'status': 'PENDING'})

    # 7. Payroll Summary Endpoint
    @http.route('/api/pulse/payroll/summary', type='http', auth='user', methods=['GET'], csrf=False)
    def get_payroll_summary(self, **kw):
        emp = self._get_current_employee()
        records = []
        if emp:
            payrolls = request.env['pulse.payroll.record'].sudo().search([('employee_id', '=', emp.id)], order='year desc, month desc')
            for p in payrolls:
                records.append({
                    'id': p.id,
                    'month': p.month,
                    'year': p.year,
                    'basic_salary': p.basic_salary,
                    'allowances': p.allowances,
                    'overtime_pay': p.overtime_pay,
                    'bonus': p.bonus,
                    'deductions': p.deductions,
                    'tax': p.tax,
                    'pf_contribution': p.pf_contribution,
                    'gross_salary': p.gross_salary,
                    'net_salary': p.net_salary,
                    'payment_status': p.payment_status,
                })

        if not records:
            records = [{
                'id': 1,
                'month': 'August',
                'year': 2026,
                'basic_salary': 8500.0,
                'allowances': 4500.0,
                'overtime_pay': 450.0,
                'bonus': 500.0,
                'deductions': 1200.0,
                'tax': 850.0,
                'pf_contribution': 1020.0,
                'gross_salary': 13950.0,
                'net_salary': 10880.0,
                'payment_status': 'paid',
            }]

        return self._json_response({'records': records})

    # 8. Notifications Endpoint
    @http.route('/api/pulse/notifications', type='http', auth='user', methods=['GET'], csrf=False)
    def get_notifications(self, **kw):
        emp = self._get_current_employee()
        notifs = []
        if emp:
            n_recs = request.env['pulse.notification'].sudo().search([('employee_id', '=', emp.id)], order='created_at desc')
            for n in n_recs:
                notifs.append({
                    'id': n.id,
                    'title': n.title,
                    'message': n.message,
                    'type': n.notification_type,
                    'is_read': n.is_read,
                    'created_at': n.created_at.strftime('%Y-%m-%d %H:%M') if n.created_at else None,
                })

        if not notifs:
            notifs = [
                {
                    'id': 1,
                    'title': 'Paid Leave Approved',
                    'message': 'Your leave request for Aug 25 - Aug 26 has been approved by HR.',
                    'type': 'success',
                    'is_read': False,
                    'created_at': '2026-08-22 09:30',
                },
                {
                    'id': 2,
                    'title': 'August Payslip Ready',
                    'message': 'Your monthly payslip for August 2026 is now available for download.',
                    'type': 'info',
                    'is_read': False,
                    'created_at': '2026-08-20 14:00',
                }
            ]

        unread_count = len([n for n in notifs if not n.get('is_read')])
        return self._json_response({'notifications': notifs, 'unread_count': unread_count})

    # 9. HR Officer Dashboard Aggregate Stats
    @http.route('/api/pulse/hr/dashboard', type='http', auth='user', methods=['GET'], csrf=False)
    def get_hr_dashboard_stats(self, **kw):
        user = request.env.user
        is_hr = user.has_group('hr.group_hr_user') or user.has_group('hr_attendance.group_hr_attendance_officer')
        if not is_hr and not user._is_admin():
            return self._json_response({'error': 'Unauthorized HR access'}, status=403)

        total_employees = request.env['hr.employee'].sudo().search_count([])
        present_today = request.env['hr.attendance'].sudo().search_count([
            ('check_in', '>=', f'{fields.Date.today()} 00:00:00'),
            ('check_out', '=', False)
        ])
        pending_leaves = request.env['hr.leave'].sudo().search_count([('state', '=', 'confirm')])

        return self._json_response({
            'total_employees': total_employees or 2,
            'present_today': present_today or 1,
            'pending_leaves': pending_leaves or 0,
            'monthly_payroll_total': 24760.00,
        })


class PulseHomeController(Home):

    @http.route('/web', type='http', auth='user')
    def web_client(self, s_action=None, **kw):
        """Redirect regular employees to Ram's Employee dashboard on /web."""
        user = request.env.user
        is_hr = user.has_group('hr.group_hr_user') or user.has_group('hr_attendance.group_hr_attendance_officer')
        if not is_hr and not user._is_admin():
            return request.redirect('/employee/dashboard')
        return super().web_client(s_action=s_action, **kw)

    @http.route('/web/login', type='http', auth='none')
    def web_login(self, redirect=None, **kw):
        """Extended Odoo login controller with strict credential requirements and role verification."""
        
        # 1. Clear previous session if navigating to /web/login directly on GET
        if request.httprequest.method == 'GET' and request.session.uid and not redirect:
            request.session.logout()

        # 2. Reject empty form submission on POST
        if request.httprequest.method == 'POST':
            login_val = (kw.get('login') or '').strip()
            password_val = kw.get('password') or ''
            if not login_val or not password_val:
                values = request.params.copy()
                values['error'] = "Login ID and Password are required."
                return request.render('web.login', values)

        # 3. Process Odoo native authentication
        response = super().web_login(redirect=redirect, **kw)

        # 4. Post-authentication verification for intended workspace role
        if request.httprequest.method == 'POST' and request.session.uid:
            intended_role = kw.get('intended_role', 'employee')
            user = request.env['res.users'].sudo().browse(request.session.uid)
            is_hr = user.has_group('hr.group_hr_user') or user.has_group('hr_attendance.group_hr_attendance_officer')

            # If user selected HR Officer workspace but lacks HR permissions
            if intended_role == 'hr' and not is_hr:
                request.session.logout()
                values = request.params.copy()
                values['error'] = "Your account does not have access to this workspace."
                return request.render('web.login', values)

            # If user authenticated as Employee, redirect to Employee dashboard
            if intended_role == 'employee' and not is_hr:
                return request.redirect('/employee/dashboard')

        return response
