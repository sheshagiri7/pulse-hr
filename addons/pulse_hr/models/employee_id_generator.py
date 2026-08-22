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
