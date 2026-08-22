# ⚡ Pulse HRMS — Next-Gen Enterprise Workforce Platform

Every workday, perfectly aligned.

Pulse HRMS is an end-to-end Human Resource Management System built on **Odoo 17** featuring a unified PostgreSQL backend, glassmorphic design system, and role-based frontend workspaces for Employees and HR Officers.

---

## 🚀 Key Features

* **🔐 Custom Workspace Portal**: Single authentication gate supporting credential enforcement and role routing (`Employee` vs `HR Officer`).
* **👥 Employee Mission Control (Ram's Frontend)**:
  * Biometric Check-In/Check-Out duty tracking.
  * Interactive Leave Request submission & real-time balance tracking.
  * Read-only Payroll & Monthly Payslip summaries.
  * Digital Personnel Identity QR verification with active Privacy Shield.
  * 🤖 **Pulse AI Copilot**: Instant AI workforce chat assistant.
* **🛡️ HR Officer Command Center (Yokesh's Frontend)**:
  * Executive 3D Telemetry Dashboard (`/hr/dashboard`).
  * Employee Directory roster & full personnel management (`/hr/employees`).
  * Real-time Attendance Intelligence & Anomaly Audit (`/hr/attendance`).
  * Smart Leave Review queue with one-click Approve/Reject actions (`/hr/leaves`).
  * Payroll Intelligence disbursement tracking & tax compliance audit (`/hr/payroll`).
  * Admin Security & Session Profile management (`/hr/account`).

---

## 🛠️ Technology Stack

* **Backend Engine**: Odoo 17 Community Edition (Python 3.10+, PostgreSQL 15+)
* **Containerization**: Docker & Docker Compose
* **Frontend Architecture**: HTML5, Vanilla JavaScript (ES6+), React 18, Glassmorphic CSS Design Token Engine (`pulse_design_system.css`)
* **Design System Palette**: Deep Midnight Navy (`#050816`), Card Surfaces (`#0B1020`), Borders (`#1E2A4A`), Royal Blue (`#2457FF`), Cyan (`#22D3EE`), Violet (`#7C3AED`)

---

## 📁 Repository Structure

```
pulse-hr/
├── addons/
│   └── pulse_hr/
│       ├── __init__.py
│       ├── __manifest__.py
│       ├── controllers/
│       │   ├── __init__.py
│       │   └── main.py             # Unified HTTP Controllers & REST Endpoints
│       ├── models/
│       │   ├── __init__.py
│       │   ├── pulse_models.py     # Payroll, Punch, & Notification Models
│       │   └── employee_id_generator.py # Auto-ID Generation Engine (OI...)
│       ├── security/
│       │   └── ir.model.access.csv # Odoo Security Access Rules
│       ├── data/
│       │   ├── demo_data.xml       # Demo Seed Data
│       │   └── seed_users.py
│       ├── views/
│       │   ├── landing_templates.xml
│       │   ├── login_templates.xml
│       │   ├── employee_views.xml
│       │   └── dashboard_views.xml
│       └── static/
│           └── src/
│               ├── css/            # Master Pulse Design System Tokens
│               ├── img/            # Brand Logo & Favicon Assets
│               ├── employee/       # Ram's Employee Workspace Frontend
│               └── hr/             # Yokesh's HR Officer Command Center
├── docker-compose.yml
├── start_odoo.sh
├── README.md
└── Pulse_Solution_Document.docx
```

---

## 🔑 Demo Access Credentials

| Role | Login ID | Password | Destination Workspace |
| :--- | :--- | :--- | :--- |
| **Employee** | `alex_employee` | `Password123!` | `/employee/dashboard` |
| **HR Officer** | `hr_officer` | `Password123!` | `/hr/dashboard` |

---

## ⚡ Quick Start & Running Locally

1. **Start Odoo & PostgreSQL Containers**:
   ```bash
   docker-compose up -d
   ```

2. **Upgrade Module (If Needed)**:
   ```bash
   docker exec pulse-odoo odoo --db_host=db --db_user=odoo --db_password=odoo -d pulse -u pulse_hr --stop-after-init
   docker restart pulse-odoo
   ```

3. **Access Application**:
   * **Public Landing Page**: [http://localhost:8069/](http://localhost:8069/)
   * **Custom Login Portal**: [http://localhost:8069/web/login](http://localhost:8069/web/login)
