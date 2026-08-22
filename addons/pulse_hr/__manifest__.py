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
    'depends': ['hr', 'hr_attendance', 'hr_holidays', 'base'],
    'data': [
        'security/ir.model.access.csv',
        'views/employee_views.xml',
        'views/dashboard_views.xml',
        'data/demo_data.xml',
    ],
    'installable': True,
    'application': True,
    'license': 'LGPL-3',
}
