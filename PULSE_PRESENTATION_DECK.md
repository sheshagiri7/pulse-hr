# 📊 PULSE HRMS — PRESENTATION SLIDE DECK

> **Event**: ODOO × NMIT BANGALORE HACKATHON 2026  
> **Team Name**: TEAM ZYNTAX  
> **Institution**: Rathinam Technical Campus  
> **Project**: PULSE — Smart Human Resource Management System Built on Odoo 17  

---

## 🖼️ SLIDE 1: COVER / TITLE SLIDE

```text
================================================================================
                               TEAM ZYNTAX
                                  PULSE
                 SMART HUMAN RESOURCE MANAGEMENT SYSTEM
                             BUILT ON ODOO
                     ODOO × NMIT BANGALORE HACKATHON 2026
================================================================================
```

### Slide Content:
- **Title**: PULSE
- **Subtitle**: Smart Human Resource Management System Built on Odoo
- **Event**: ODOO × NMIT BANGALORE HACKATHON 2026
- **Team**: TEAM ZYNTAX

---

## 👥 SLIDE 2: TEAM MEMBERS

```text
================================================================================
                               TEAM ZYNTAX
                               TEAM MEMBERS

  • LEADER & BACKEND DEVELOPER: SHESHAGIRI .S
  • FRONTEND DEVELOPER       : RAMAMANIKANDAN .C
  • DATABASE ENGINEER        : YOKESH .A
  • RESEARCH & DEVELOPER     : SUBASRI .S

  COLLEGE: RATHINAM TECHNICAL CAMPUS
================================================================================
```

### Speaker Notes:
- Introduce Team Zyntax and specify each member's core engineering contribution.
- Highlight Team Leader Sheshagiri .S for Odoo 17 custom addon backend & ORM architecture.

---

## ⚠️ SLIDE 3: PROBLEM STATEMENT

```text
================================================================================
                            PROBLEM STATEMENT

  Traditional HR processes can be:
  ❌ Manual and time-consuming
  ❌ Fragmented across disconnected workflows
  ❌ Difficult to track and audit
  ❌ Prone to errors and data duplication
  ❌ Difficult to secure sensitive employee information

  OUR GOAL:
  🎯 Bring essential HR operations into one centralized and secure platform.
================================================================================
```

### Key Takeaway:
- Disjointed tools lead to manual payroll calculation errors, missing attendance logs, lost leave requests, and privacy leaks.

---

## 💡 SLIDE 4: OUR SOLUTION

```text
================================================================================
                              OUR SOLUTION

  Pulse is a role-based Human Resource Management System built on Odoo 17.

  Integrates:
  👤 Employee Management   🕐 Attendance Management   🏖 Leave / Time Off
  💰 Payroll & Tax Engine  🔐 Role-Based Access

  KEY APPROACH:
  Odoo Native HR Apps + Custom Development = PULSE HRMS

  01. Automated HR Workflows — Automates employee onboarding, attendance, and leaves.
  02. Centralized HR Management — Unifies employee info, attendance, and payroll.
  03. Secure Role-Based Access — Scoped permission matrix for employees & HR admins.
================================================================================
```

---

## 🔄 SLIDE 5: WORKFLOW ARCHITECTURE

```text
================================================================================
                             WORKFLOW ARCHITECTURE

  ADMIN / HR OFFICER
        │
        ▼
  Create Employee Record
        │
        ▼
  Generate Employee ID & Login Credentials (Auto ID Format)
        │
        ▼
  Employee Login (Role-based switch)
        │
        ▼
  Employee Profile Workspace
        │
        ▼
  Attendance Telemetry (Check-in / Check-out)
        │
        ▼
  Leave Application (Casual / Sick / Paid)
        │
        ▼
  HR Approval Loop (Approve / Reject in 1 Click)
        │
        ▼
  Payroll Computation & Form 16 Tax Certificate Generation
        │
        ▼
  Reports, Governance & Company Broadcasts
================================================================================
```

---

## ⚡ SLIDE 6: KEY INNOVATION — AUTOMATIC EMPLOYEE ID GENERATION

```text
================================================================================
                             KEY INNOVATION
                   AUTOMATIC EMPLOYEE ID GENERATION

  When HR creates a new employee, Pulse automatically generates:
  • Unique Login ID
  • First-Time Temporary Password

  LOGIN ID FORMAT:
  [Company Code] + [Name Initials] + [Joining Year] + [Serial Number]

  EXAMPLE:
  OIJODO20260001 (Odoo Indian Tech / Joining Year 2026 / Serial 0001)

  BENEFITS:
  ✅ Eliminates manual entry errors
  ✅ Provides consistent enterprise identity
  ✅ Simplifies digital onboarding
  ✅ Establishes an auditable identity structure
================================================================================
```

---

## 🎯 SLIDE 7: CORE FEATURES

```text
================================================================================
                             CORE FEATURES

  1. EMPLOYEE MANAGEMENT
     • Employee profiles & contact cards
     • Department & manager hierarchies
     • Role-based security permissions

  2. ATTENDANCE TELEMETRY
     • 1-Click Check-in / Check-out toggle
     • Daily worked hours & punctuality calculation
     • Live attendance state tracking

  3. LEAVE MANAGEMENT
     • Instant Leave Dispatcher form
     • Leave quota balances (Casual, Sick, Earned)
     • Real-time HR review and approval loop

  4. PAYROLL & TAX COMPLIANCE
     • INR (₹) compensation breakdown
     • Automatic Form 16 Annual Tax PDF generator
     • Restricted salary access control
================================================================================
```

---

## 🔐 SLIDE 8: USER ROLES & SECURITY MATRIX

```text
================================================================================
                         USER ROLES & SECURITY

  ADMIN / HR OFFICER:
  • Create & onboarding new employees
  • Manage company-wide employee directory
  • Audit attendance telemetry & department rates
  • Approve or reject leave applications
  • Access authorized payroll data & broadcast announcements

  EMPLOYEE:
  • Secure authentication & role-scoped dashboard
  • View personal profile & duty telemetry
  • Perform 1-click attendance check-in/out
  • Apply for leave & track approval status
  • Download read-only payslips & Form 16 tax statement

  SECURITY:
  🔐 Sensitive salary and private employee data restricted via Odoo security groups.
================================================================================
```

---

## 📐 SLIDE 9: ER DIAGRAM & DATABASE SCHEMAS

```text
================================================================================
                            ER DIAGRAM & SCHEMAS

   ┌───────────────────┐        1:N        ┌───────────────────┐
   │    hr.employee    │───────────────────<    hr.attendance  │
   ├───────────────────┤                   ├───────────────────┤
   │ id (PK)           │                   │ id (PK)           │
   │ name              │                   │ employee_id (FK)  │
   │ emp_code          │                   │ check_in          │
   │ work_email        │                   │ check_out         │
   │ department_id     │                   │ worked_hours      │
   └─────────┬─────────┘                   └───────────────────┘
             │
             │ 1:N
             ├─────────────────────────────┐
             ▼                             ▼
   ┌───────────────────┐         ┌───────────────────┐
   │     hr.leave      │         │pulse.payroll.record│
   ├───────────────────┤         ├───────────────────┤
   │ id (PK)           │         │ id (PK)           │
   │ employee_id (FK)  │         │ employee_id (FK)  │
   │ holiday_status_id │         │ month_year        │
   │ request_date_from │         │ net_wage (₹)      │
   │ state (confirm/   │         │ form16_pdf        │
   │        validate)  │         └───────────────────┘
   └───────────────────┘
================================================================================
```

---

## 💻 SLIDE 10: TECHNOLOGY STACK

```text
================================================================================
                           TECHNOLOGY STACK

  BACKEND ENGINE  : Odoo 17 Community Edition (Python 3.10)
  DATABASE LAYER  : PostgreSQL 15 (Containerized with Docker)
  FRONTEND STACK  : React 18, HTML5, JavaScript (ES6+), Three.js
  DESIGN SYSTEM   : Master Pulse Design Tokens (Glassmorphic HSL Palette)
  CUSTOM ADDON    : addons/pulse_hr
  API PROTOCOL    : JSON-RPC & RESTful HTTP Controllers
================================================================================
```

---

## 📈 SLIDE 11: IMPACT & VALUE PROPOSITION

```text
================================================================================
                     IMPACT & VALUE PROPOSITION

  FOR HR OFFICERS:
  ⚡ 80% reduction in manual HR onboarding burden
  📊 Centralized workforce telemetry & analytics
  ⏱️ Instant 1-click leave approval workflow

  FOR EMPLOYEES:
  📱 Transparent self-service employee portal
  ⏱️ Easy 1-click attendance check-in
  📄 Instant export of Form 16 Tax PDFs

  FOR THE ORGANIZATION:
  🛡️ Enterprise-grade data privacy & role security
  🔍 Zero identity duplication via Auto-ID generator
  📈 Complete visibility over HR operations
================================================================================
```

---

## 🏆 SLIDE 12: CONCLUSION & DIFFERENTIATORS

```text
================================================================================
                    CONCLUSION & KEY DIFFERENTIATORS

  • Centralizes employee, attendance, leave, and payroll management into one platform.
  • Automates key HR onboarding processes via Odoo 17 integration.
  • Enforces strict data privacy with server-side role-based security.
  • Delivers high operational efficiency for both employees and HR leaders.

  OUR KEY DIFFERENTIATORS:
  🌟 Automatic Employee ID Generation (`OIJODO20260001`)
  🌟 Role-Based Workspace Separation (Employee vs HR Command Center)
  🌟 Integrated Odoo 17 Engine with Form 16 Tax Certificate Export
================================================================================
```

---

## 🎉 SLIDE 13: THANK YOU & DEMO

```text
================================================================================
                               TEAM ZYNTAX
                            THANK YOU VERY MUCH

                  Questions & Live Interactive Demo

  • Employee Workspace: http://localhost:8069/employee/dashboard
  • HR Command Center : http://localhost:8069/hr/dashboard
  • Login Portal      : http://localhost:8069/web/login
================================================================================
```
