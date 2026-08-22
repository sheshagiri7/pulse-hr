from odoo.tests.common import TransactionCase, tagged


@tagged('post_install', '-at_install')
class TestEmployeeIDGenerator(TransactionCase):

    def test_create_employee_generates_user_and_credentials(self):
        # Create sample employee
        employee = self.env['hr.employee'].create({
            'name': 'John Doe',
            'work_email': 'johndoe@example.com',
            'company_code': 'OI',
        })

        # 1. Verify login_id is generated correctly
        self.assertTrue(employee.login_id, "Login ID should be auto-generated")
        self.assertTrue(employee.login_id.startswith("OIJODO"), f"Login ID {employee.login_id} should start with OIJODO")

        # 2. Verify temporary password is generated
        self.assertTrue(employee.temp_password, "Temporary password should be generated")
        self.assertEqual(len(employee.temp_password), 10, "Temporary password should be 10 characters")

        # 3. Verify res.users account is created and linked
        self.assertTrue(employee.user_id, "res.users account should be created and linked to employee")
        self.assertEqual(employee.user_id.login, employee.login_id, "User login should match employee login_id")
        self.assertEqual(employee.user_id.name, employee.name, "User name should match employee name")
        self.assertEqual(employee.user_id.email, employee.work_email, "User email should match employee work email")

        # 4. Verify user can authenticate with generated temporary password
        authenticated_uid = self.env['res.users'].authenticate(
            self.env.db, employee.user_id.login, employee.temp_password, {}
        )
        self.assertEqual(authenticated_uid, employee.user_id.id, "Employee user should authenticate successfully with temp_password")
