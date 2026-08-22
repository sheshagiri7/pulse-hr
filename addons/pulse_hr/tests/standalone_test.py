import unittest
import datetime

# Mock classes to test unit logic without needing running database connection
class MockDate:
    @staticmethod
    def today():
        return datetime.date(2026, 8, 22)

class TestEmployeeIDGeneratorLogic(unittest.TestCase):

    def _generate_login_id(self, vals, existing_count=0):
        company_code = vals.get('company_code', 'OI')
        name = vals.get('name', 'XXXX')
        parts = name.split()
        first = parts[0][:2].upper() if len(parts) > 0 else 'XX'
        last = parts[-1][:2].upper() if len(parts) > 1 else 'XX'

        join_date = vals.get('joining_date') or MockDate.today()
        if isinstance(join_date, str):
            year = join_date[:4]
        else:
            year = str(join_date.year)

        serial = str(existing_count + 1).zfill(4)
        return f'{company_code}{first}{last}{year}{serial}'

    def test_login_id_formatting(self):
        vals = {'name': 'John Doe', 'company_code': 'OI'}
        login_id = self._generate_login_id(vals, existing_count=0)
        self.assertEqual(login_id, 'OIJODO20260001')

    def test_login_id_increment(self):
        vals = {'name': 'Jane Smith', 'company_code': 'OI'}
        login_id = self._generate_login_id(vals, existing_count=4)
        self.assertEqual(login_id, 'OIJASM20260005')

if __name__ == '__main__':
    unittest.main()
