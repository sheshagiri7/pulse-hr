{
    'name': 'Pulse HR',
    'version': '1.0',
    'summary': 'Pulse - HR Management System (Odoo x NMIT Hackathon 2026)',
    'description': """
        Extends Odoo HR with:
        - Auto-generated employee Login ID and first-time password
        - Role-based dashboard with live attendance status
    """,
    'category': 'Human Resources',
    'author': 'Team Pulse',
    'depends': ['hr', 'hr_attendance', 'hr_holidays', 'base', 'web'],
    'data': [
        'security/ir.model.access.csv',
        'views/employee_views.xml',
        'views/dashboard_views.xml',
        'views/login_templates.xml',
        'data/demo_data.xml',
    ],
    'assets': {
        'web.assets_frontend': [
            'pulse_hr/static/src/css/pulse_login.css',
        ],
        'web.assets_backend': [
            'pulse_hr/static/src/css/pulse_dashboard.css',
            'pulse_hr/static/src/js/pulse_dashboard.js',
            'pulse_hr/static/src/xml/pulse_dashboard.xml',
        ],
    },
    'installable': True,
    'application': True,
    'license': 'LGPL-3',
}

