from odoo import models, fields, api


class PulseShift(models.Model):
    _name = 'pulse.shift'
    _description = 'Pulse Shift Schedule'

    shift_name = fields.Char(string='Shift Name', required=True)
    start_time = fields.Char(string='Start Time', default='09:00')
    end_time = fields.Char(string='End Time', default='17:00')
    break_duration = fields.Float(string='Break Duration (Hours)', default=1.0)
    required_hours = fields.Float(string='Required Hours', default=8.0)
    grace_period_minutes = fields.Integer(string='Grace Period (Minutes)', default=15)


class PulseEmployeeShift(models.Model):
    _name = 'pulse.employee.shift'
    _description = 'Employee Shift Assignment'

    employee_id = fields.Many2one('hr.employee', string='Employee', required=True, ondelete='cascade')
    shift_id = fields.Many2one('pulse.shift', string='Shift', required=True)
    effective_from = fields.Date(string='Effective From', default=fields.Date.today)
    effective_to = fields.Date(string='Effective To')


class PulseAttendancePunch(models.Model):
    _name = 'pulse.attendance.punch'
    _description = 'Detailed Attendance Telemetry Punch'

    employee_id = fields.Many2one('hr.employee', string='Employee', required=True, ondelete='cascade')
    attendance_id = fields.Many2one('hr.attendance', string='Attendance Record', ondelete='cascade')
    punch_type = fields.Selection([('in', 'Check-In'), ('out', 'Check-Out')], string='Punch Type', required=True)
    punch_time = fields.Datetime(string='Punch Time', default=fields.Datetime.now, required=True)
    method = fields.Char(string='Method', default='Web Portal / Biometric')
    device_id = fields.Char(string='Device ID', default='PULSE-GATEWAY-01')
    location = fields.Char(string='Location', default='Mission Control HQ')


class PulseSalaryStructure(models.Model):
    _name = 'pulse.salary.structure'
    _description = 'Employee Salary Structure'

    employee_id = fields.Many2one('hr.employee', string='Employee', required=True, ondelete='cascade')
    basic_salary = fields.Float(string='Basic Salary', default=8500.0)
    house_allowance = fields.Float(string='House Allowance', default=2500.0)
    shift_allowance = fields.Float(string='Shift Allowance', default=800.0)
    other_allowances = fields.Float(string='Other Allowances', default=1200.0)
    pf_percentage = fields.Float(string='PF Contribution (%)', default=12.0)
    tax_percentage = fields.Float(string='Tax (%)', default=10.0)
    effective_from = fields.Date(string='Effective From', default=fields.Date.today)
    effective_to = fields.Date(string='Effective To')


class PulsePayrollRecord(models.Model):
    _name = 'pulse.payroll.record'
    _description = 'Monthly Payroll Record'

    employee_id = fields.Many2one('hr.employee', string='Employee', required=True, ondelete='cascade')
    month = fields.Char(string='Month', default='August')
    year = fields.Integer(string='Year', default=2026)
    basic_salary = fields.Float(string='Basic Salary', default=8500.0)
    allowances = fields.Float(string='Total Allowances', default=4500.0)
    overtime_pay = fields.Float(string='Overtime Pay', default=450.0)
    bonus = fields.Float(string='Performance Bonus', default=500.0)
    deductions = fields.Float(string='Deductions', default=1200.0)
    tax = fields.Float(string='Tax', default=850.0)
    pf_contribution = fields.Float(string='PF Contribution', default=1020.0)
    gross_salary = fields.Float(string='Gross Salary', compute='_compute_totals', store=True)
    net_salary = fields.Float(string='Net Salary', compute='_compute_totals', store=True)
    payment_status = fields.Selection([('paid', 'Paid'), ('pending', 'Pending'), ('processing', 'Processing')], string='Status', default='paid')
    payment_date = fields.Date(string='Payment Date', default=fields.Date.today)

    @api.depends('basic_salary', 'allowances', 'overtime_pay', 'bonus', 'deductions', 'tax', 'pf_contribution')
    def _compute_totals(self):
        for rec in self:
            rec.gross_salary = rec.basic_salary + rec.allowances + rec.overtime_pay + rec.bonus
            rec.net_salary = rec.gross_salary - (rec.deductions + rec.tax + rec.pf_contribution)


class PulseBenefit(models.Model):
    _name = 'pulse.benefit'
    _description = 'Company Benefits Offered'

    benefit_name = fields.Char(string='Benefit Name', required=True)
    description = fields.Text(string='Description')
    provider = fields.Char(string='Provider', default='Pulse Corporate')
    benefit_type = fields.Selection([('health', 'Health & Dental'), ('wellness', 'Wellness & Fitness'), ('retirement', 'Retirement & 401K'), ('perks', 'Perks')], string='Type', default='health')
    active = fields.Boolean(string='Active', default=True)


class PulseEmployeeBenefit(models.Model):
    _name = 'pulse.employee.benefit'
    _description = 'Employee Enrolled Benefit'

    employee_id = fields.Many2one('hr.employee', string='Employee', required=True, ondelete='cascade')
    benefit_id = fields.Many2one('pulse.benefit', string='Benefit', required=True)
    enrollment_date = fields.Date(string='Enrollment Date', default=fields.Date.today)
    status = fields.Selection([('active', 'Active'), ('pending', 'Pending Approval'), ('cancelled', 'Cancelled')], string='Status', default='active')
    coverage_details = fields.Char(string='Coverage Details', default='Full Coverage')


class PulseEmployeeDocument(models.Model):
    _name = 'pulse.employee.document'
    _description = 'Employee Verified Document'

    employee_id = fields.Many2one('hr.employee', string='Employee', required=True, ondelete='cascade')
    document_name = fields.Char(string='Document Name', required=True)
    file_url = fields.Char(string='File URL or Identifier', default='#')
    file_type = fields.Char(string='File Type', default='PDF')
    file_size = fields.Char(string='File Size', default='1.2 MB')
    uploaded_at = fields.Datetime(string='Uploaded At', default=fields.Datetime.now)
    status = fields.Selection([('verified', 'Verified'), ('pending', 'Pending Verification'), ('rejected', 'Rejected')], string='Status', default='verified')


class PulseNotification(models.Model):
    _name = 'pulse.notification'
    _description = 'Employee Notification'

    employee_id = fields.Many2one('hr.employee', string='Employee', required=True, ondelete='cascade')
    title = fields.Char(string='Title', required=True)
    message = fields.Text(string='Message', required=True)
    notification_type = fields.Selection([('info', 'Information'), ('success', 'Success'), ('warning', 'Warning'), ('alert', 'Alert')], string='Type', default='info')
    is_read = fields.Boolean(string='Is Read', default=False)
    created_at = fields.Datetime(string='Created At', default=fields.Datetime.now)


class PulseUserSettings(models.Model):
    _name = 'pulse.user.settings'
    _description = 'User Workspace Settings'

    employee_id = fields.Many2one('hr.employee', string='Employee', required=True, ondelete='cascade')
    theme = fields.Selection([('dark', 'Dark Mission Control'), ('light', 'Light Mode')], string='Theme', default='dark')
    notification_enabled = fields.Boolean(string='Notifications Enabled', default=True)
    email_notifications = fields.Boolean(string='Email Notifications', default=True)
    timezone = fields.Char(string='Timezone', default='UTC / IST (+05:30)')
    language = fields.Char(string='Language', default='English (US)')


class HrAttendanceExtend(models.Model):
    _inherit = 'hr.attendance'

    overtime_hours = fields.Float(string='Overtime Hours', default=0.0)
    late_minutes = fields.Integer(string='Late Minutes', default=0)
    attendance_method = fields.Char(string='Attendance Method', default='Pulse Web Portal')
    location = fields.Char(string='Location', default='Mission Control HQ')
    notes = fields.Char(string='Notes')


class PulseAnnouncement(models.Model):
    _name = 'pulse.announcement'
    _description = 'HR Broadcast Announcement'

    title = fields.Char(string='Title', required=True)
    category = fields.Char(string='Category', default='HR BRIEFING')
    summary = fields.Text(string='Summary', required=True)
    author = fields.Char(string='Author', default='Pulse HR Operations')
    date_str = fields.Char(string='Date Display', default='Today')
    is_pinned = fields.Boolean(string='Is Pinned', default=False)
    active = fields.Boolean(string='Active', default=True)
    created_at = fields.Datetime(string='Created At', default=fields.Datetime.now)
