const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = process.env.PORT || 8080;
const ROOT_DIR = __dirname;

const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

// Mock Database State
let employees = [
  { id: 'EMP-101', name: 'Sarah Jenkins', role: 'Lead Architect', dept: 'Engineering', status: 'Active', location: 'San Francisco, CA', checkIn: '08:45 AM', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150' },
  { id: 'EMP-102', name: 'Alex Rivera', role: 'Senior Developer', dept: 'Engineering', status: 'Active', location: 'Austin, TX', checkIn: '09:02 AM', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150' },
  { id: 'EMP-103', name: 'Elena Rostova', role: 'Product Designer', dept: 'Design', status: 'Remote', location: 'Seattle, WA', checkIn: '08:30 AM', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150' },
  { id: 'EMP-104', name: 'Marcus Chen', role: 'Data Scientist', dept: 'AI & Data', status: 'Active', location: 'New York, NY', checkIn: '08:55 AM', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150' },
  { id: 'EMP-105', name: 'Priya Sharma', role: 'HR Operations Lead', dept: 'Human Resources', status: 'On Leave', location: 'Chicago, IL', checkIn: '--', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150' },
  { id: 'EMP-106', name: 'David Kim', role: 'DevOps Engineer', dept: 'Engineering', status: 'Active', location: 'San Jose, CA', checkIn: '09:15 AM', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150' }
];

let leaveRequests = [
  { id: 'LV-8901', name: 'Priya Sharma', role: 'HR Operations Lead', dept: 'HR', type: 'Annual Leave', duration: '5 Days (Aug 24 - Aug 28)', risk: 'Low Risk', status: 'Pending', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150' },
  { id: 'LV-8902', name: 'Daniel Vance', role: 'Backend Lead', dept: 'Engineering', type: 'Sick Leave', duration: '2 Days (Aug 24 - Aug 25)', risk: 'High Coverage Impact', status: 'Pending', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150' },
  { id: 'LV-8903', name: 'Clara Oswald', role: 'UX Researcher', dept: 'Design', type: 'Personal Leave', duration: '1 Day (Aug 26)', risk: 'Optimal', status: 'Pending', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150' },
  { id: 'LV-8904', name: 'James Miller', role: 'Finance Analyst', dept: 'Finance', type: 'Casual Leave', duration: '3 Days (Aug 27 - Aug 29)', risk: 'Payroll Period Conflict', status: 'Pending', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150' }
];

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;

  // Enable CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // REST API Endpoints
  if (pathname === '/api/stats') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({
      totalEmployees: 142,
      presentToday: 128,
      onTimeRate: '92%',
      pendingLeaves: leaveRequests.filter(l => l.status === 'Pending').length,
      monthlyPayroll: '₹24.8L',
      overallHealth: '91%',
      breakdowns: { attendance: 94, availability: 92, leaveStability: 89, payrollHealth: 96 }
    }));
  }

  if (pathname === '/api/employees') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    const { search, dept } = parsedUrl.query;
    let filtered = [...employees];
    if (search) {
      filtered = filtered.filter(e => e.name.toLowerCase().includes(search.toLowerCase()) || e.role.toLowerCase().includes(search.toLowerCase()));
    }
    if (dept && dept !== 'All') {
      filtered = filtered.filter(e => e.dept.toLowerCase() === dept.toLowerCase());
    }
    return res.end(JSON.stringify(filtered));
  }

  if (pathname === '/api/leaves') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify(leaveRequests));
  }

  if (pathname === '/api/auth/login' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk.toString(); });
    req.on('end', () => {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        success: true,
        token: 'jwt-dayflow-pulse-token-2026',
        user: { name: 'Admin Officer', role: 'Super Admin' }
      }));
    });
    return;
  }

  // AI Chatbot HR Intelligence API Endpoint
  if (pathname === '/api/ai/chat' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk.toString(); });
    req.on('end', () => {
      let data = {};
      try { data = JSON.parse(body); } catch (e) {}
      const msg = (data.message || '').toLowerCase();
      const page = (data.pageContext || '').toLowerCase();

      let reply = '';
      let actions = [];
      let barChart = null;

      // Page Context Specific Queries ("what's wrong here?", "anything to review?", "is payroll ready?")
      if (msg.includes('wrong') || msg.includes('page context') || msg.includes('status here')) {
        if (page.includes('attendance')) {
          reply = "**Attendance Intelligence Analysis**\n\n• Attendance Rate: **92.4%**\n• Present: **128 employees**\n• Late Arrivals: **7 employees**\n• Unnotified Absences: **3 staff** (Sales Dept)\n\n**KEY ALERT**: 4 consecutive late arrivals detected in Engineering.";
          actions = [{ label: "View Attendance", url: "/attendance", icon: "event_available" }, { label: "Open Directory", url: "/employees", icon: "group" }];
          barChart = [
            { label: "Engineering", val: 88, color: "#8B45F7" },
            { label: "Sales", val: 84, color: "#ffb4ab" },
            { label: "Design", val: 96, color: "#42e18d" },
            { label: "HR", val: 98, color: "#2878FF" }
          ];
        } else if (page.includes('leave')) {
          reply = "**Smart Leave Review Analysis**\n\n• Pending Requests: **4 requests** requiring manager sign-off.\n• High Risk: Daniel Vance (Engineering Lead) requested 2 days during sprint deployment.\n• Recommended Action: Approve Clara Oswald (Design) and Priya Sharma (HR).";
          actions = [{ label: "Review Leave", url: "/leaves", icon: "holiday_village" }, { label: "View Directory", url: "/employees", icon: "group" }];
        } else if (page.includes('payroll')) {
          reply = "**Payroll Intelligence Analysis**\n\n• Monthly Disbursement: **₹24.8L**\n• Processing Progress: **94% Complete**\n• Audit Warning: 6 employee records require tax deduction verification before bank submission.";
          actions = [{ label: "View Payroll", url: "/payroll", icon: "payments" }, { label: "View Dashboard", url: "/dashboard", icon: "dashboard" }];
        } else {
          reply = "**Workforce Command Center Status**\n\n• Total Employees: **142**\n• Overall Health Index: **91%**\n• System Status: **Optimal**\n• 4 pending leave requests & 6 payroll verifications outstanding.";
          actions = [{ label: "View Dashboard", url: "/dashboard", icon: "dashboard" }, { label: "Open Attendance", url: "/attendance", icon: "event_available" }];
        }
      } 
      // Specific HR Queries
      else if (msg.includes('absent') || msg.includes('who is absent')) {
        reply = "**Today's Absence Summary**\n\n• **Priya Sharma** (HR Operations Lead) - Approved Annual Leave\n• **3 Sales Executives** - Unnotified Absence (Offsite Follow-up)\n• **5 Employees** - Working Remote (Seattle & Austin)";
        actions = [{ label: "Open Attendance", url: "/attendance", icon: "event_available" }, { label: "View Directory", url: "/employees", icon: "group" }];
      } 
      else if (msg.includes('leave') || msg.includes('pending')) {
        reply = "**Pending Leave Requests (4 Total)**\n\n• **Priya Sharma** (HR Operations) - 5 Days (Aug 24-28) • Low Risk\n• **Daniel Vance** (Engineering Lead) - 2 Days (Aug 24-25) • High Coverage Risk\n• **Clara Oswald** (UX Researcher) - 1 Day (Aug 26) • Optimal\n• **James Miller** (Finance) - 3 Days (Aug 27-29) • Payroll Conflict";
        actions = [{ label: "Review Leave", url: "/leaves", icon: "holiday_village" }];
      } 
      else if (msg.includes('payroll') || msg.includes('salary') || msg.includes('money')) {
        reply = "**Monthly Payroll Summary**\n\n• Total Payroll: **₹24.8L**\n• Variance: **+7.4% vs last month**\n• New Hires Addition: +₹1.2L\n• 6 records pending tax proof verification.";
        actions = [{ label: "View Payroll", url: "/payroll", icon: "payments" }];
      } 
      else if (msg.includes('department') || msg.includes('low attendance') || msg.includes('issues')) {
        reply = "**Department Attendance Breakdown**\n\n• **Engineering**: 88% (4 late arrivals)\n• **Sales**: 84% (3 unnotified absences)\n• **Design**: 96% (Optimal)\n• **Human Resources**: 98% (Optimal)";
        barChart = [
          { label: "Engineering", val: 88, color: "#8B45F7" },
          { label: "Sales", val: 84, color: "#ffb4ab" },
          { label: "Design", val: 96, color: "#42e18d" },
          { label: "HR", val: 98, color: "#2878FF" }
        ];
        actions = [{ label: "Open Attendance", url: "/attendance", icon: "event_available" }, { label: "View Directory", url: "/employees", icon: "group" }];
      } 
      else if (msg.includes('employee') || msg.includes('staff') || msg.includes('roster')) {
        reply = "**Employee Roster Overview**\n\n• Total Active Staff: **142**\n• Engineering: **58** | Sales: **34** | Design: **22** | HR & Finance: **28**\n• Top Location: San Francisco, Austin, Seattle";
        actions = [{ label: "View Directory", url: "/employees", icon: "group" }];
      } 
      else {
        reply = "**Dayflow HR Intelligence Assistant**\n\nI scanned your workforce metrics:\n\n• Workforce Total: **142 employees**\n• Present Today: **128 staff** (90.1%)\n• Pending Leaves: **4 requests**\n• Monthly Payroll: **₹24.8L**\n\nHow can I help you investigate further?";
        actions = [
          { label: "View Dashboard", url: "/dashboard", icon: "dashboard" },
          { label: "View Employees", url: "/employees", icon: "group" },
          { label: "View Attendance", url: "/attendance", icon: "event_available" },
          { label: "Review Leave", url: "/leaves", icon: "holiday_village" },
          { label: "View Payroll", url: "/payroll", icon: "payments" }
        ];
      }

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ responseText: reply, actions: actions, barChart: barChart }));
    });
    return;
  }

  // HTML Route Mapping
  let filePath = '';
  if (pathname === '/' || pathname === '/dashboard' || pathname === '/command-center') {
    filePath = path.join(ROOT_DIR, 'dayflow_pulse_workforce_command_center', 'code.html');
  } else if (pathname === '/login' || pathname === '/admin-login') {
    filePath = path.join(ROOT_DIR, 'dayflow_pulse_3d_admin_login', 'code.html');
  } else if (pathname === '/attendance' || pathname === '/attendance-intelligence') {
    filePath = path.join(ROOT_DIR, 'dayflow_pulse_attendance_intelligence', 'code.html');
  } else if (pathname === '/employees' || pathname === '/employee-directory') {
    filePath = path.join(ROOT_DIR, 'dayflow_pulse_employee_directory', 'code.html');
  } else if (pathname === '/payroll' || pathname === '/payroll-intelligence') {
    filePath = path.join(ROOT_DIR, 'dayflow_pulse_payroll_intelligence', 'code.html');
  } else if (pathname === '/leaves' || pathname === '/smart-leave-review') {
    filePath = path.join(ROOT_DIR, 'dayflow_pulse_smart_leave_review', 'code.html');
  } else if (pathname === '/account' || pathname === '/profile' || pathname === '/admin-account') {
    filePath = path.join(ROOT_DIR, 'dayflow_pulse_admin_account', 'code.html');
  } else {
    // Resolve static asset files relative to root
    filePath = path.join(ROOT_DIR, pathname);
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      // Fallback to dashboard
      const fallbackPath = path.join(ROOT_DIR, 'dayflow_pulse_workforce_command_center', 'code.html');
      fs.readFile(fallbackPath, (fallbackErr, data) => {
        if (fallbackErr) {
          res.writeHead(404, { 'Content-Type': 'text/plain' });
          res.end('404 Not Found');
        } else {
          res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
          res.end(data);
        }
      });
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = mimeTypes[ext] || 'application/octet-stream';

    fs.readFile(filePath, (readErr, content) => {
      if (readErr) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('500 Internal Server Error');
      } else {
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content);
      }
    });
  });
});

server.listen(PORT, '127.0.0.1', () => {
  console.log(`====================================================`);
  console.log(`🚀 Dayflow Pulse 3D Local Server is LIVE!`);
  console.log(`🌐 Dashboard:   http://127.0.0.1:${PORT}/dashboard`);
  console.log(`🔐 Admin Login:  http://127.0.0.1:${PORT}/login`);
  console.log(`👥 Employees:    http://127.0.0.1:${PORT}/employees`);
  console.log(`⏱️ Attendance:   http://127.0.0.1:${PORT}/attendance`);
  console.log(`💰 Payroll:      http://127.0.0.1:${PORT}/payroll`);
  console.log(`📅 Leave Review: http://127.0.0.1:${PORT}/leaves`);
  console.log(`====================================================`);
});
