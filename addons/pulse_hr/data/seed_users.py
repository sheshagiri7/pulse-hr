# Python script to seed test users directly in Odoo shell
# Run with: docker exec -i pulse-odoo odoo shell -d pulse_hr_db < addons/pulse_hr/data/seed_users.py

# 1. Create HR Officer User
hr_user = env['res.users'].sudo().search([('login', '=', 'hr_officer')], limit=1)
if not hr_user:
    hr_user = env['res.users'].sudo().create({
        'name': 'HR Officer (Pulse)',
        'login': 'hr_officer',
        'password': 'Password123!',
        'email': 'hr.officer@pulse.local',
        'groups_id': [(6, 0, [
            env.ref('base.group_user').id,
            env.ref('hr.group_hr_user').id,
            env.ref('hr_attendance.group_hr_attendance_officer').id,
            env.ref('hr_holidays.group_hr_holidays_user').id,
        ])],
    })
    print("Created HR Officer User (login: hr_officer)")

# Create/Link HR Officer Employee
hr_emp = env['hr.employee'].sudo().search([('user_id', '=', hr_user.id)], limit=1)
if not hr_emp:
    env['hr.employee'].sudo().create({
        'name': 'HR Officer (Pulse)',
        'work_email': 'hr.officer@pulse.local',
        'user_id': hr_user.id,
        'login_id': 'OIHRHR20260001',
        'temp_password': 'Password123!',
    })
    print("Created HR Officer Employee Record")

# 2. Create Regular Employee User
emp_user = env['res.users'].sudo().search([('login', '=', 'alex_employee')], limit=1)
if not emp_user:
    emp_user = env['res.users'].sudo().create({
        'name': 'Alex Employee',
        'login': 'alex_employee',
        'password': 'Password123!',
        'email': 'alex.employee@pulse.local',
        'groups_id': [(6, 0, [
            env.ref('base.group_user').id,
        ])],
    })
    print("Created Regular Employee User (login: alex_employee)")

# Create/Link Regular Employee
regular_emp = env['hr.employee'].sudo().search([('user_id', '=', emp_user.id)], limit=1)
if not regular_emp:
    env['hr.employee'].sudo().create({
        'name': 'Alex Employee',
        'work_email': 'alex.employee@pulse.local',
        'user_id': emp_user.id,
        'login_id': 'OIALEM20260002',
        'temp_password': 'Password123!',
    })
    print("Created Regular Employee Record")

env.cr.commit()
print("Successfully seeded test users!")
