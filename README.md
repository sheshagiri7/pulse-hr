# PULSE

## Pulse HRMS — Human Resource Management System

Pulse HRMS is an enterprise Human Resource Management System built on **Odoo 17** featuring a unified PostgreSQL backend, a logo-inspired glassmorphic design token engine (`pulse_design_system.css`), and dedicated role-based frontend workspaces for Employees and HR Officers.

---

## Overview

Pulse digitizes and unifies core workforce management operations into a single platform:
- **Employee Mission Control**: A dedicated React frontend for regular staff to track duty attendance, request leaves, review payslips, check-in/out, verify biometric QR badges, and interact with an AI workforce copilot.
- **HR Officer Command Center**: An executive 3D telemetry dashboard and management suite for HR Officers to audit workforce attendance, manage employee directories, review/approve leave requests, monitor payroll disbursements, and update personnel security profiles.
- **Unified Odoo Backend**: Both frontends communicate directly with Odoo 17 ORM database models (`hr.employee`, `hr.attendance`, `hr.leave`, `pulse.payroll.record`, `pulse.notification`), ensuring real-time bidirectional data synchronization and strict server-side authorization.

---

## Key Features

### Employee (Ram's Frontend)
- **Personnel Profile**: View personal details, job tier, emergency contacts, security clearance, signed tax contracts (`W-2`, `NDA Tier-4`), and salary breakdown.
- **Attendance Tracking**: Real-time duty status, check-in/check-out timestamps, worked hours calculation, and weekly attendance history chart.
- **Leave Management**: View active leave balances (Casual, Sick, Paid Leave) and submit new leave requests.
- **Payroll Visibility**: Read-only monthly payslip summaries, gross/net salary breakdowns, tax deductions, and PF contributions.
- **Digital ID QR Verification**: Biometric QR verification badge with an active Privacy Shield.
- **AI Workforce Copilot**: Interactive workforce AI assistant modal (`AiAssistantModal`) for leave, policy, payslip, and duty queries.
- **Notifications**: Real-time system alerts for approved leaves, payslip readiness, and bulletin updates.

### HR / Admin (Yokesh's Frontend)
- **Workforce Command Center**: Executive 3D dashboard displaying total headcount, present status, on-time rates, pending leaves, and overall workforce health.
- **Employee Directory**: Full searchable employee roster with department filtering, location badges, and profile detail cards.
- **Attendance Intelligence**: Real-time attendance rate tracking, department breakdowns, late arrival anomaly flags, and audit proof popups.
- **Smart Leave Review**: Manager review queue for pending leave requests with one-click Approve/Reject buttons and reviewer comment logs.
- **Payroll Intelligence**: Monthly payroll disbursement monitoring (`₹24.8L`), tax verification audit alerts, and itemized variance breakdowns.
- **Admin Security Account**: Admin profile management, password updates, 2FA status, and active login session revocation controls.

### Authentication & Role Selection
- **Custom Pulse Login Portal**: Custom branded interface on `/web/login` with interactive role switcher tabs (`[ Employee Workspace ]` vs `[ HR Officer Workspace ]`).
- **Odoo Native Session Security**: Server-side credential validation with Odoo `res.users`.
- **Intended Role Verification**: Server-side role enforcement preventing regular employees from accessing HR workspaces.

---

## Role-Based Access

### Employee
- Access limited to `/employee/dashboard`.
- Data visibility strictly scoped to the authenticated employee's own records.
- Read-only access to payroll and contract documents.
- Cannot view company-wide attendance, modify payroll structures, or approve leave requests.

### HR Officer / Admin
- Access to `/hr/dashboard`, `/hr/employees`, `/hr/attendance`, `/hr/leaves`, `/hr/payroll`, and `/hr/account`.
- Full company-wide data visibility across all employee records, attendance punches, leave requests, and payroll metrics.
- Server-side authorized via Odoo security groups (`hr.group_hr_user`, `hr_attendance.group_hr_attendance_officer`, `base.group_system`).

---

## Employee ↔ HR Workflow

Both frontends communicate through the **same Odoo backend and PostgreSQL database**:

```text
       EMPLOYEE ACTION                     HR OFFICER ACTION
   (Ram's Employee Frontend)            (Yokesh's HR Frontend)
               │                                   │
               ▼                                   ▼
      ┌─────────────────────────────────────────────────┐
      │        UNIFIED ODOO POSTGRESQL BACKEND         │
      │  (hr.employee, hr.attendance, hr.leave, etc.)   │
      └─────────────────────────────────────────────────┘
               ▲                                   ▲
               │                                   │
      EMPLOYEE SEES HR UPDATE             HR SEES EMPLOYEE UPDATE
```

### Implemented & Verified Flows:
1. **Profile Updates**:
   - Employee updates phone/email on `/employee/dashboard` ➔ Saved to Odoo `hr.employee` ➔ HR sees updated details on `/hr/employees`.
   - HR updates designation/department on `/hr/employees` ➔ Saved to Odoo `hr.employee` ➔ Employee sees updated profile on `/employee/dashboard`.
2. **Attendance Tracking**:
   - Employee performs Duty Check-In/Out ➔ Saved to Odoo `hr.attendance` ➔ HR sees updated present count and attendance logs on `/hr/attendance`.
3. **Leave Approval Flow**:
   - Employee submits leave request ➔ Saved to Odoo `hr.leave` (state = `confirm`) ➔ HR sees request in `/hr/leaves` ➔ HR approves (state = `validate`) ➔ Employee sees status update to `APPROVED`.

---

## Technology Stack

- **Backend Framework**: Odoo 17 Community Edition (Python 3.10+, PostgreSQL 15+)
- **Containerization**: Docker & Docker Compose
- **Frontend Frameworks**: HTML5, Vanilla JavaScript (ES6+), React 18, Tailwind CSS, Three.js
- **Styling**: Master Pulse Design Tokens (`pulse_design_system.css`), Custom CSS Glassmorphism
- **Templating**: Odoo QWeb XML Templates

---

## Project Structure

```text
pulse-hr/
├── addons/
│   └── pulse_hr/
│       ├── __init__.py
│       ├── __manifest__.py
│       ├── controllers/
│       │   ├── __init__.py
│       │   └── main.py                  # Controllers & REST Endpoints
│       ├── models/
│       │   ├── __init__.py
│       │   ├── pulse_models.py          # Payroll, Punch, & Notification Models
│       │   └── employee_id_generator.py # Auto-ID Generation Engine (OI...)
│       ├── security/
│       │   └── ir.model.access.csv      # Odoo Model Security Access Rules
│       ├── data/
│       │   ├── demo_data.xml            # Demo Seed Data
│       │   └── seed_users.py
│       ├── views/
│       │   ├── landing_templates.xml    # Public Landing Page QWeb
│       │   ├── login_templates.xml      # Custom Login Portal QWeb
│       │   ├── employee_views.xml
│       │   └── dashboard_views.xml
│       └── static/
│           └── src/
│               ├── css/                 # Design System & Token Stylesheets
│               ├── img/                 # Official Logo & Favicon Assets
│               ├── employee/            # Ram's Employee Workspace Frontend
│               └── hr/                  # Yokesh's HR Officer Command Center
├── docker-compose.yml
├── start_odoo.sh
├── README.md
└── Pulse_Solution_Document.docx
```

---

## Quick Start & Running Locally

1. **Start Containers**:
   ```bash
   docker-compose up -d
   ```

2. **Upgrade Odoo Module**:
   ```bash
   docker exec pulse-odoo odoo --db_host=db --db_user=odoo --db_password=odoo -d pulse -u pulse_hr --stop-after-init
   docker restart pulse-odoo
   ```

3. **Access Routes**:
   - **Public Landing Page**: [http://localhost:8069/](http://localhost:8069/)
   - **Login Portal**: [http://localhost:8069/web/login](http://localhost:8069/web/login)

---

## Demo Credentials

| Role | Login ID | Password | Target Workspace |
| :--- | :--- | :--- | :--- |
| **Employee** | `alex_employee` | `Password123!` | `/employee/dashboard` |
| **HR Officer** | `hr_officer` | `Password123!` | `/hr/dashboard` |
