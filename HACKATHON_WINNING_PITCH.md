# 🏆 PULSE HRMS — HACKATHON WINNING PRESENTATION & DEMO GUIDE

> **Project Name**: PULSE HRMS (Powered by Odoo 17 Engine)  
> **Target Problem**: Dayflow Human Resource Management System  
> **Team Lead**: Yokesh V. (Core Engineering Lead)  
> **Status**: 100% Production Ready & Tested  

---

## 🎯 2-MINUTE JUDGE PITCH SCRIPT (Word for Word)

### **[0:00 - 0:25] The Hook & Problem Statement**
> *"Good day judges! Traditional HR software is clunky, fragmented, and disconnected. Our solution, **PULSE HRMS**, digitizes every workday with real-time duty telemetry, automated leave clearance, and instant payroll visibility — built natively on top of Odoo 17."*

### **[0:25 - 0:55] Employee Workspace Demo**
> *"Let's start in the **Employee Workspace** (`/employee/dashboard`). Here, Yokesh V. can see live attendance rate (98.4%), log duty check-ins via a glowing 1-click toggle, and track team availability in real time. Need time off? Click **Apply Leave**, select date ranges, and submit. The system logs it straight into Odoo."*

### **[0:55 - 1:30] HR Officer Command Center & Live Approval Loop**
> *"Now let's switch to the **HR Officer Command Center** (`/hr/dashboard`). Dr. Sarah Chen gets an instant notification for Yokesh's leave request under **Smart Leave Review** (`/hr/leaves`). With 1 click, HR approves it. The database updates instantly, and a live alert dispatches back to Yokesh's dashboard. HR can also broadcast company-wide announcements directly to all employee feeds."*

### **[1:30 - 2:00] Indian Payroll & Form 16 PDF Engine & Wrap Up**
> *"Finally, in the **Payroll Terminal**, compensation is shown in **Indian Rupees (₹)** with full Form 16 / TDS compliance and HDFC Bank account verification. Click **Export Form 16**, and a print-ready Income Tax certificate generates instantly with digital signature verification and QR validation. **PULSE HRMS** turns daily HR friction into seamless flow."*

---

## 🧭 LIVE DEMO CLICK-THROUGH SEQUENCE FOR JUDGES

Follow this exact order during live evaluation for maximum impact:

1. **Step 1: Open Employee Dashboard**
   - URL: `http://localhost:8069/employee/dashboard`
   - Show: Glowing KPI cards (`ATTENDANCE RATE` `98.4%`, `HOURS LOGGED TODAY` `7.8h`, `PUNCTUALITY SCORE` `99`).
   - Action: Click the bottom-right glowing **`CHECKED IN (CLOCK OUT)`** button to trigger live API attendance sync.

2. **Step 2: Submit Leave Request**
   - Action: Click **`Time Off & Leave Dispatcher`** card (`#card-leave-dispatcher`).
   - Action: Select Leave Type (*Casual Leave*), pick dates, type reason (*Family Event*), and click **`Submit Leave Request to HR`**.

3. **Step 3: Switch to HR Operations Command Center**
   - Action: Open `http://localhost:8069/hr/dashboard` or `/hr/leaves`.
   - Show: Live Attendance Telemetry chart, Workforce Roster, and pending Leave Review queue.
   - Action: Click **`Approve`** on Yokesh's leave request. Notice the status change to Approved!

4. **Step 4: HR Announcement Broadcast**
   - Action: On `/hr/dashboard`, scroll to **HR Broadcast Controller**.
   - Action: Type Title: `Mission Update`, Summary: `All-hands meeting at 4 PM`, click **`Broadcast Announcement to Workforce`**.
   - Action: Open `/employee/dashboard` in another tab — see the announcement render live in the **Mission & HR Announcements** banner!

5. **Step 5: Form 16 Tax PDF & Payslip Generation**
   - Action: On `/employee/dashboard`, click **`Payroll & Compensation Terminal`** (`#card-payroll-terminal`).
   - Action: Click **`Export Form 16 / Annual Tax Statement`**.
   - Result: A new print-ready window opens rendering the official Form 16 Certificate with digital signature and QR verification!

---

## 📋 FEATURE MATRIX vs PROBLEM STATEMENT

| Requirement | Status | Execution Details |
| :--- | :---: | :--- |
| **Secure Authentication** | ✅ 100% | Role-based Sign In / Sign Up routes with session guards |
| **Employee Dashboard** | ✅ 100% | Quick cards, live telemetry, team squad roster with initials fallback |
| **HR Command Center** | ✅ 100% | Full workforce analytics, roster management, announcement broadcast |
| **Attendance Tracking** | ✅ 100% | 1-click check-in/out button, weekly telemetry, daily status |
| **Leave Approval Loop** | ✅ 100% | Employee applies → HR notified → HR approves/rejects → DB & Employee notified |
| **Indian Payroll & Tax** | ✅ 100% | INR (₹) amounts, HDFC Bank direct transfers, printable Form 16 & Payslip PDF generator |

---

## 🛠️ TECHNICAL ARCHITECTURE

- **Backend**: Odoo 17 Framework (Python 3.10)
- **Database**: PostgreSQL 15 Containerized
- **Frontend**: React 18 / Tailwind CSS with Glassmorphic HSL theme
- **Custom Addon**: `addons/pulse_hr` with Odoo models (`pulse.announcement`, `hr.employee`, `hr.attendance`, `hr.leave`)
- **API Protocol**: JSON-RPC `/web/dataset/call_kw` & RESTful HTTP controllers

---

## 🏆 JUDGES' TOP QUESTIONS & WINNING ANSWERS

* **Q: Is this integrated with Odoo backend or just static HTML?**
  * **Answer**: *"It is 100% backed by an Odoo 17 custom addon inside Docker (`pulse-odoo`). All attendance punches, leave submissions, profile edits, and announcements read and write directly to Odoo database tables via Python ORM controllers."*

* **Q: How does the leave approval loop work between roles?**
  * **Answer**: *"When an employee applies for leave on `/employee/dashboard`, a record is written to `hr.leave`. When HR opens `/hr/leaves`, the endpoint fetches pending requests. Approving a request updates the Odoo state to `validate` and dispatches a notification payload back to the employee."*

* **Q: How did you handle localization?**
  * **Answer**: *"All financial metrics use Indian Rupees (₹ INR Lakhs), tax compliance is aligned with Form 16 / TDS Section 203 regulations, bank accounts use HDFC Bank format, and locations are centered in Indian tech hubs (Bengaluru HQ, Mumbai, Hyderabad)."*
