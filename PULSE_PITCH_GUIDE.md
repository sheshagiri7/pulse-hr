# 🏆 PULSE HRMS — PRESENTATION & DEMO PITCH GUIDE

> **Project Name**: PULSE HRMS (Powered by Odoo 17 Engine)  
> **Event**: ODOO × NMIT BANGALORE HACKATHON 2026  
> **Team Name**: TEAM ZYNTAX  
> **Institution**: Rathinam Technical Campus  
> **Team Roster**:
> - **Leader & Backend Developer**: Sheshagiri .S
> - **Frontend Developer**: Ramamanikandan .C
> - **Database Engineer**: Yokesh .A
> - **Research & Developer**: Subasri .S  
> **Status**: 100% Production Ready & Tested  

---

## 📊 PRESENTATION SLIDE ALIGNMENT (Based on pulse.pdf Deck)

| Slide | Topic | Key Content & Project Alignment |
| :---: | :--- | :--- |
| **01** | **Title** | **PULSE — Smart Human Resource Management System** built on Odoo 17 for ODOO × NMIT Bangalore Hackathon 2026. |
| **02** | **Team Zyntax** | Leader: **Sheshagiri .S** (Backend), **Ramamanikandan .C** (Frontend), **Yokesh .A** (DB), **Subasri .S** (Research/Dev) — Rathinam Technical Campus. |
| **03** | **Problem Statement** | Traditional HR is manual, fragmented across workflows, hard to track, prone to errors/duplication, and lacks role-based security. |
| **04** | **Our Solution** | Centralized, role-based HRMS integrating Employee Management, Attendance, Leave/Time Off, Payroll, and Role Security. |
| **05** | **Workflow** | Admin creates employee ➔ Auto ID & Credential Generation ➔ Employee Login ➔ Attendance Punch ➔ Leave Application ➔ HR Approval ➔ Payroll & Governance. |
| **06** | **Key Innovation** | **Automatic Employee ID Generation** (Format: `Company Code` + `Initials` + `Joining Year` + `Serial No`, e.g., `OIJODO20260001`). |
| **07** | **Core Features** | Employee Profiles, Real-time Attendance Telemetry, Smart Leave Reviewer, and Indian Tax & Payroll Engine (Form 16). |
| **08** | **User Roles & Security** | Server-side role enforcement separating **Admin/HR Command Center** from **Employee Self-Service Workspace**. |
| **09** | **ER Diagram** | Connected schema across `hr.employee`, `hr.attendance`, `hr.leave`, `pulse.payroll.record`, and `pulse.announcement`. |
| **10** | **Technology Stack** | Odoo 17 Framework (Python 3.10), PostgreSQL 15, React 18 / Glassmorphic CSS, Three.js 3D Login, REST & JSON-RPC Controllers. |
| **11** | **Impact** | Reduced HR overhead, 1-click employee self-service, enterprise security, and audit-ready operations. |
| **12** | **Conclusion** | Automatic ID Generation + Role-Based Access + Integrated Odoo Workflow = Scalable HR Solution. |
| **13** | **Thank You** | Questions & Live Interactive Demo with Judges. |

---

## 🎯 2-MINUTE JUDGE PITCH SCRIPT (Word for Word)

### **[0:00 - 0:25] The Hook & Problem Statement (Slides 1-3)**
> *"Good day judges! We are **Team Zyntax** from Rathinam Technical Campus — led by Sheshagiri .S (Backend), Ramamanikandan .C (Frontend), Yokesh .A (Database), and Subasri .S (Research). Traditional HR software is fragmented, manual, prone to identity duplication, and difficult to secure. Our solution, **PULSE HRMS**, digitizes every workday into a unified, secure platform — natively built on top of Odoo 17."*

### **[0:25 - 0:55] Key Innovation & Employee Workspace (Slides 4-6)**
> *"Our key innovation starts right at onboarding with **Automatic Employee Identity Generation** — forming auditable IDs like `OIJODO20260001`. In the **Employee Workspace** (`/employee/dashboard`), employees can check-in with 1-click duty telemetry, view active leave quotas, and submit time-off requests directly into Odoo."*

### **[0:55 - 1:30] HR Officer Command Center & Approval Loop (Slides 7-9)**
> *"Over in the **HR Officer Command Center** (`/hr/dashboard`), HR gets real-time attendance analytics, workforce rosters, and pending leave applications under **Smart Leave Review** (`/hr/leaves`). HR approves leave in 1 click, instantly updating the Odoo database and notifying the employee dashboard. HR can also broadcast company-wide bulletins to all employee feeds."*

### **[1:30 - 2:00] Indian Payroll & Tax Engine & Wrap Up (Slides 10-13)**
> *"Finally, in the **Payroll Terminal**, salary computations use **Indian Rupees (₹)** with HDFC account integration and Form 16 / TDS compliance. With 1 click, employees export a digitally verifiable **Form 16 Tax PDF**. **PULSE HRMS** turns daily HR friction into seamless flow. Thank you — we are open for questions!"*

---

## 🧭 LIVE DEMO CLICK-THROUGH SEQUENCE FOR JUDGES

Follow this exact order during live evaluation:

1. **Step 1: Custom 3D Login & Role Switcher**
   - URL: `http://localhost:8069/web/login`
   - Action: Highlight **Team Zyntax** logo and select `[ Employee Workspace ]` tab.

2. **Step 2: Employee Dashboard & Duty Telemetry**
   - URL: `http://localhost:8069/employee/dashboard`
   - Show: Live attendance rate card (`98.4%`), worked hours (`7.8h`), punctuality score (`99`).
   - Action: Click the glowing **`CHECKED IN (CLOCK OUT)`** button to log duty status in Odoo.

3. **Step 3: Submit Leave Request**
   - Action: Click **`Time Off & Leave Dispatcher`** card (`#card-leave-dispatcher`).
   - Action: Select Leave Type (*Casual Leave*), pick dates, enter reason (*Family Event*), and click **`Submit Leave Request to HR`**.

4. **Step 4: Switch to HR Command Center & Approve Leave**
   - URL: `http://localhost:8069/hr/dashboard` or `/hr/leaves`
   - Show: Workforce Telemetry Chart and pending Leave Review queue.
   - Action: Click **`Approve`** on the pending request. Observe immediate status change to `Approved`.

5. **Step 5: HR Broadcast Announcement**
   - Action: On `/hr/dashboard`, type Title: `Hackathon Final Pitch`, Summary: `Presentation scheduled at 4 PM`, click **`Broadcast Announcement`**.
   - Action: Switch back to `/employee/dashboard` tab — see announcement render live in employee feed!

6. **Step 6: Form 16 Tax Certificate Export**
   - Action: On `/employee/dashboard`, click **`Payroll & Compensation Terminal`** (`#card-payroll-terminal`).
   - Action: Click **`Export Form 16 / Annual Tax Statement`**.
   - Result: Print-ready Form 16 certificate opens with digital signature verification & QR code!

---

## 📋 FEATURE MATRIX vs PROBLEM STATEMENT

| Requirement | Status | Execution Details |
| :--- | :---: | :--- |
| **Automatic Employee ID** | ✅ 100% | Format: `Company Code` + `Initials` + `Joining Year` + `Serial No` (`OIJODO20260001`) |
| **Secure Authentication** | ✅ 100% | Role-based Sign In / Sign Up routes with Odoo session guards |
| **Employee Workspace** | ✅ 100% | Duty telemetry, 1-click check-in, leave application, AI copilot |
| **HR Command Center** | ✅ 100% | Workforce analytics, employee directory, leave review queue, announcement broadcast |
| **Attendance Telemetry** | ✅ 100% | Real-time check-in/out logging, weekly worked hours, punctuality tracking |
| **Leave Approval Loop** | ✅ 100% | Employee applies ➔ Saved to Odoo `hr.leave` ➔ HR approves ➔ Database & Employee UI updated |
| **Indian Payroll & Tax** | ✅ 100% | INR (₹) compensation breakdown, HDFC bank direct deposit, printable Form 16 Tax PDF |

---

## 🛠️ TECHNICAL ARCHITECTURE

- **Backend**: Odoo 17 Framework (Python 3.10)
- **Database**: PostgreSQL 15 Containerized
- **Frontend**: React 18 / Tailwind CSS with Glassmorphic HSL theme (`pulse_design_system.css`)
- **Custom Addon**: `addons/pulse_hr` with Odoo models (`pulse.announcement`, `hr.employee`, `hr.attendance`, `hr.leave`, `pulse.payroll.record`)
- **API Protocol**: JSON-RPC `/web/dataset/call_kw` & RESTful HTTP controllers

---

## 🏆 JUDGES' TOP QUESTIONS & ANSWERS

* **Q: Who developed PULSE and for what event?**
  * **Answer**: *"PULSE HRMS was created by **Team Zyntax** from Rathinam Technical Campus — Sheshagiri .S (Backend Lead), Ramamanikandan .C (Frontend Lead), Yokesh .A (Database Lead), and Subasri .S (Research/Dev) for the **ODOO × NMIT Bangalore Hackathon 2026**."*

* **Q: What is your key innovation?**
  * **Answer**: *"Our key innovation is **Automatic Employee Identity Generation** (`OIJODO20260001`) combined with native Odoo 17 role-based security, instant 1-click leave dispatcher loops, and automated Form 16 Indian tax certificate generation."*

* **Q: Is this integrated with Odoo backend or just static HTML?**
  * **Answer**: *"It is 100% backed by an Odoo 17 custom addon inside Docker (`pulse-odoo`). All attendance punches, leave submissions, profile edits, and announcements read and write directly to Odoo database tables via Python ORM controllers."*
