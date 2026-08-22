/**
 * Dayflow Header Controls Component JS
 * Interactive Notifications, Settings Drawer, and Profile Navigation
 */

(function () {
  document.addEventListener('DOMContentLoaded', () => {
    initHeaderControls();
  });

  // Fallback direct run if DOM ready
  if (document.readyState === 'interactive' || document.readyState === 'complete') {
    initHeaderControls();
  }

  function initHeaderControls() {
    if (document.getElementById('dayflowNotifDropdown')) return;

    // Build Notification Dropdown HTML
    const notifDropdown = document.createElement('div');
    notifDropdown.id = 'dayflowNotifDropdown';
    notifDropdown.className = 'dayflow-notif-dropdown';
    notifDropdown.innerHTML = `
      <div class="dayflow-notif-header">
        <div class="dayflow-notif-title">
          <span class="material-symbols-outlined text-secondary" style="font-size: 18px;">notifications</span>
          Notifications <span id="notifBadgeCount" style="background: rgba(255, 180, 171, 0.2); color: #ffb4ab; font-size: 10px; padding: 2px 6px; border-radius: 10px; font-weight: 700; transition: all 0.3s ease;">3 NEW</span>
        </div>
        <button id="markNotifsRead" style="background: transparent; border: none; color: #8B95AE; font-size: 11px; cursor: pointer; text-decoration: underline; transition: all 0.2s ease;">Mark read</button>
      </div>

      <div class="dayflow-notif-body">
        <a href="/hr/attendance" class="dayflow-notif-item">
          <div class="dayflow-notif-icon" style="background: rgba(255, 180, 171, 0.15); color: #ffb4ab;">
            <span class="material-symbols-outlined" style="font-size: 20px;">rule</span>
          </div>
          <div class="dayflow-notif-text">
            <div class="dayflow-notif-heading">Attendance Anomaly Detected</div>
            <div class="dayflow-notif-desc">7 employees flagged for late consecutive arrivals today.</div>
          </div>
        </a>

        <a href="/hr/leaves" class="dayflow-notif-item">
          <div class="dayflow-notif-icon" style="background: rgba(139, 69, 247, 0.15); color: #d5bbff;">
            <span class="material-symbols-outlined" style="font-size: 20px;">event_busy</span>
          </div>
          <div class="dayflow-notif-text">
            <div class="dayflow-notif-heading">Leave Review Pending</div>
            <div class="dayflow-notif-desc">4 critical leave requests await Superuser sign-off.</div>
          </div>
        </a>

        <a href="/hr/payroll" class="dayflow-notif-item">
          <div class="dayflow-notif-icon" style="background: rgba(244, 180, 0, 0.15); color: #F4B400;">
            <span class="material-symbols-outlined" style="font-size: 20px;">account_balance</span>
          </div>
          <div class="dayflow-notif-text">
            <div class="dayflow-notif-heading">Payroll Tax Verification</div>
            <div class="dayflow-notif-desc">6 employee records require tax declaration audit.</div>
          </div>
        </a>
      </div>

      <div class="dayflow-notif-footer">
        <a href="/hr/dashboard" style="color: #2878FF; font-size: 12px; font-weight: 700; text-decoration: none;">View All Command Center Alerts →</a>
      </div>
    `;

    // Build Settings Drawer HTML
    const settingsBackdrop = document.createElement('div');
    settingsBackdrop.id = 'dayflowSettingsBackdrop';
    settingsBackdrop.className = 'dayflow-settings-backdrop';

    const settingsModal = document.createElement('div');
    settingsModal.id = 'dayflowSettingsModal';
    settingsModal.className = 'dayflow-settings-modal';
    settingsModal.innerHTML = `
      <div class="dayflow-settings-header">
        <div class="dayflow-notif-title">
          <span class="material-symbols-outlined text-primary" style="font-size: 20px;">settings</span>
          System Preferences
        </div>
        <button id="closeSettingsBtn" class="dayflow-ai-control-btn">
          <span class="material-symbols-outlined" style="font-size: 18px;">close</span>
        </button>
      </div>

      <div class="dayflow-settings-body">
        <div class="dayflow-setting-group">
          <div style="font-size: 12px; font-weight: 700; color: #2878FF; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 0.05em;">3D Visual Engine</div>
          <div class="dayflow-setting-row">
            <div>
              <div class="dayflow-setting-label">3D Particle Background</div>
              <div class="dayflow-setting-desc">Enable interactive Three.js 3D animations</div>
            </div>
            <label class="dayflow-switch">
              <input type="checkbox" checked id="toggle3dSetting">
              <span class="dayflow-slider"></span>
            </label>
          </div>
          <div class="dayflow-setting-row">
            <div>
              <div class="dayflow-setting-label">High-FPS Rendering</div>
              <div class="dayflow-setting-desc">Render at 60 FPS for maximum smoothness</div>
            </div>
            <label class="dayflow-switch">
              <input type="checkbox" checked>
              <span class="dayflow-slider"></span>
            </label>
          </div>
        </div>

        <div class="dayflow-setting-group">
          <div style="font-size: 12px; font-weight: 700; color: #8B45F7; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 0.05em;">Pulse AI Assistant</div>
          <div class="dayflow-setting-row">
            <div>
              <div class="dayflow-setting-label">Real-time Anomaly Scan</div>
              <div class="dayflow-setting-desc">Auto-analyze workforce leave & attendance risks</div>
            </div>
            <label class="dayflow-switch">
              <input type="checkbox" checked>
              <span class="dayflow-slider"></span>
            </label>
          </div>
          <div class="dayflow-setting-row">
            <div>
              <div class="dayflow-setting-label">Sound Notifications</div>
              <div class="dayflow-setting-desc">Play audio alert on high priority HR anomalies</div>
            </div>
            <label class="dayflow-switch">
              <input type="checkbox">
              <span class="dayflow-slider"></span>
            </label>
          </div>
        </div>

        <div class="dayflow-setting-group">
          <div style="font-size: 12px; font-weight: 700; color: #42e18d; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 0.05em;">Account & Security</div>
          <a href="/hr/account" style="display: flex; items-center; justify-content: space-between; color: #ffffff; text-decoration: none; padding: 6px 0;">
            <span style="font-size: 13px; font-weight: 600;">Manage Admin Security Profile</span>
            <span class="material-symbols-outlined" style="font-size: 16px; color: #42e18d;">arrow_forward</span>
          </a>
        </div>
      </div>
    `;

    document.body.appendChild(notifDropdown);
    document.body.appendChild(settingsBackdrop);
    document.body.appendChild(settingsModal);

    // Live Notification Fetch from Odoo Database
    function loadLiveNotifications() {
      fetch('/api/pulse/notifications')
        .then(res => res.json())
        .then(data => {
          if (!data.notifications || data.notifications.length === 0) return;
          const bodyEl = notifDropdown.querySelector('.dayflow-notif-body');
          const badgeEl = notifDropdown.querySelector('#notifBadgeCount');
          if (badgeEl) badgeEl.textContent = `${data.unread_count || data.notifications.length} NEW`;

          if (bodyEl) {
            bodyEl.innerHTML = data.notifications.map(n => `
              <a href="/hr/leaves" class="dayflow-notif-item">
                <div class="dayflow-notif-icon" style="background: rgba(244, 180, 0, 0.15); color: #F4B400;">
                  <span class="material-symbols-outlined" style="font-size: 20px;">event_upcoming</span>
                </div>
                <div class="dayflow-notif-text">
                  <div class="dayflow-notif-heading">${escapeHtml(n.title)}</div>
                  <div class="dayflow-notif-desc">${escapeHtml(n.message)}</div>
                </div>
              </a>
            `).join('');
          }
        })
        .catch(() => {});
    }

    function escapeHtml(text) {
      if (!text) return '';
      return String(text).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }

    loadLiveNotifications();

    // Bind Notification Bell and Settings Gear Icons
    document.querySelectorAll('.material-symbols-outlined').forEach(icon => {
      const text = icon.textContent.trim();

      // Notifications Bell Click
      if (text === 'notifications' || text === 'notifications_none') {
        const btn = icon.closest('button') || icon;
        if (btn) {
          btn.style.cursor = 'pointer';
          btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            loadLiveNotifications();
            notifDropdown.classList.toggle('open');
            settingsModal.classList.remove('open');
            settingsBackdrop.classList.remove('open');
          });
        }
      }

      // Settings Gear Click
      if (text === 'settings' || text === 'settings_suggest') {
        const btn = icon.closest('button') || icon;
        if (btn) {
          btn.style.cursor = 'pointer';
          btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            settingsModal.classList.add('open');
            settingsBackdrop.classList.add('open');
            notifDropdown.classList.remove('open');
          });
        }
      }
    });

    // Mark Notifs Read
    const markReadBtn = document.getElementById('markNotifsRead');
    const badgeCount = document.getElementById('notifBadgeCount');
    if (markReadBtn) {
      markReadBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();

        // Update Header Badge state
        if (badgeCount) {
          badgeCount.textContent = 'ALL READ';
          badgeCount.style.background = 'rgba(66, 225, 141, 0.2)';
          badgeCount.style.color = '#42e18d';
        }

        // Hide Mark Read button / update label
        markReadBtn.textContent = '✓ Read';
        markReadBtn.style.color = '#42e18d';
        markReadBtn.style.textDecoration = 'none';
        markReadBtn.style.cursor = 'default';

        // Hide all red unread badge dots on bell icons across header
        document.querySelectorAll('.dayflow-header-badge, .bg-error.rounded-full, .bg-error').forEach(b => {
          if (b.classList.contains('w-2') || b.classList.contains('dayflow-header-badge')) {
            b.style.display = 'none';
          }
        });

        // Visually update notification items to read state
        document.querySelectorAll('.dayflow-notif-item').forEach(item => {
          item.style.opacity = '0.55';
          item.style.filter = 'grayscale(0.3)';
        });
      });
    }

    // Close Settings
    const closeSettingsBtn = document.getElementById('closeSettingsBtn');
    if (closeSettingsBtn) {
      closeSettingsBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        settingsModal.classList.remove('open');
        settingsBackdrop.classList.remove('open');
      });
    }
    settingsBackdrop.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      settingsModal.classList.remove('open');
      settingsBackdrop.classList.remove('open');
    });

    // Close dropdown on outside click
    document.addEventListener('click', (e) => {
      if (!notifDropdown.contains(e.target)) {
        notifDropdown.classList.remove('open');
      }
    });

    // Hide Admin Account button from sidebar navigation menus across all pages
    const hideAdminAccountStyle = document.createElement('style');
    hideAdminAccountStyle.textContent = `
      nav a[href="/hr/account"]:not(.dayflow-header-profile), 
      aside a[href="/hr/account"]:not(.dayflow-header-profile), 
      .md\\:w-64 a[href="/hr/account"]:not(.dayflow-header-profile) {
        display: none !important;
      }
    `;
    document.head.appendChild(hideAdminAccountStyle);

    document.querySelectorAll('nav a, aside a, .md\\:w-64 a').forEach(a => {
      const text = (a.textContent || '').trim();
      if (text.includes('Admin Account') && !a.classList.contains('dayflow-header-profile')) {
        a.style.display = 'none';
        if (a.parentElement && a.parentElement.tagName === 'LI') {
          a.parentElement.style.display = 'none';
        }
      }
    });

    // -------------------------------------------------------------
    // SIDEBAR LOGOUT BUTTON INJECTION ACROSS ALL HR PAGES
    // -------------------------------------------------------------
    const sidebars = document.querySelectorAll('aside nav, nav, .md\\:w-64 nav');
    sidebars.forEach(nav => {
      if (!nav.querySelector('#hrSidebarLogoutBtn')) {
        const logoutBtn = document.createElement('a');
        logoutBtn.id = 'hrSidebarLogoutBtn';
        logoutBtn.href = '/web/session/logout?redirect=/web/login';
        logoutBtn.style.cssText = 'display: flex; align-items: center; gap: 10px; margin-top: auto; padding: 12px 16px; color: #ffb4ab; background: rgba(255, 180, 171, 0.12); border: 1px solid rgba(255, 180, 171, 0.3); border-radius: 12px; font-weight: 700; font-size: 13px; text-decoration: none; transition: all 0.2s ease; cursor: pointer;';
        logoutBtn.innerHTML = `
          <span class="material-symbols-outlined" style="font-size: 20px; color: #ffb4ab;">logout</span>
          <span>Logout</span>
        `;
        logoutBtn.addEventListener('mouseenter', () => {
          logoutBtn.style.background = 'rgba(255, 180, 171, 0.25)';
          logoutBtn.style.borderColor = 'rgba(255, 180, 171, 0.5)';
        });
        logoutBtn.addEventListener('mouseleave', () => {
          logoutBtn.style.background = 'rgba(255, 180, 171, 0.12)';
          logoutBtn.style.borderColor = 'rgba(255, 180, 171, 0.3)';
        });
        nav.appendChild(logoutBtn);
      }
    });

    // -------------------------------------------------------------
    // TOP-RIGHT PROFILE & LOGOUT MENU DROPDOWN
    // -------------------------------------------------------------
    let profileDropdown = document.getElementById('hrProfileDropdownMenu');
    if (!profileDropdown) {
      profileDropdown = document.createElement('div');
      profileDropdown.id = 'hrProfileDropdownMenu';
      profileDropdown.style.cssText = 'position: fixed; top: 68px; right: 24px; z-index: 99999; display: none; width: 270px; background: rgba(10, 16, 36, 0.96); backdrop-filter: blur(24px); border: 1px solid rgba(40, 120, 255, 0.4); border-radius: 16px; padding: 16px; box-shadow: 0 20px 50px rgba(0,0,0,0.85); color: #fff; font-family: system-ui, sans-serif;';
      profileDropdown.innerHTML = `
        <div style="display: flex; align-items: center; gap: 12px; padding-bottom: 12px; margin-bottom: 12px; border-bottom: 1px solid rgba(255,255,255,0.1);">
          <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150" id="hrMenuAvatar" style="width: 44px; height: 44px; border-radius: 50%; object-fit: cover; border: 2px solid #3B82F6;"/>
          <div>
            <div id="hrMenuName" style="font-weight: 700; font-size: 14px; color: #fff;">Yokesh V.</div>
            <div style="font-size: 11px; color: #3B82F6; font-weight: 600;">HR Operations Officer</div>
          </div>
        </div>

        <a href="/hr/account" style="display: flex; align-items: center; gap: 10px; padding: 10px 12px; border-radius: 10px; color: #dfe1f7; text-decoration: none; font-size: 13px; font-weight: 600; transition: background 0.2s ease; margin-bottom: 8px;">
          <span class="material-symbols-outlined" style="font-size: 18px; color: #3B82F6;">manage_accounts</span>
          <span>Security & Account Profile</span>
        </a>

        <a href="/web/session/logout?redirect=/web/login" style="display: flex; align-items: center; gap: 10px; padding: 10px 12px; border-radius: 10px; color: #ffb4ab; background: rgba(255, 180, 171, 0.12); border: 1px solid rgba(255, 180, 171, 0.3); text-decoration: none; font-size: 13px; font-weight: 700; transition: all 0.2s ease;">
          <span class="material-symbols-outlined" style="font-size: 18px; color: #ffb4ab;">logout</span>
          <span>Logout of Pulse HR</span>
        </a>
      `;
      document.body.appendChild(profileDropdown);
    }

    // Toggle dropdown on header profile avatar click
    document.querySelectorAll('.dayflow-header-profile, [data-profile-trigger="true"]').forEach(profileEl => {
      profileEl.style.cursor = 'pointer';
      profileEl.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const isHidden = profileDropdown.style.display === 'none' || !profileDropdown.style.display;
        profileDropdown.style.display = isHidden ? 'block' : 'none';
      });
    });

    document.addEventListener('click', (e) => {
      if (profileDropdown && !profileDropdown.contains(e.target)) {
        profileDropdown.style.display = 'none';
      }
    });

    // Toggle 3D background setting
    const toggle3d = document.getElementById('toggle3dSetting');
    if (toggle3d) {
      toggle3d.addEventListener('change', (e) => {
        const bg = document.getElementById('threejs-bg-container');
        if (bg) {
          bg.style.display = e.target.checked ? 'block' : 'none';
        }
      });
    }

    // -------------------------------------------------------------
    // GLOBAL TOP BAR SEARCH & COMMAND PALETTE HANDLER
    // -------------------------------------------------------------
    const searchPopup = document.createElement('div');
    searchPopup.id = 'dayflowGlobalSearchPopup';
    searchPopup.style.cssText = `
      position: absolute;
      top: 100%;
      left: 0;
      width: 100%;
      max-height: 420px;
      overflow-y: auto;
      background: rgba(10, 16, 36, 0.96);
      backdrop-filter: blur(24px);
      border: 1px solid rgba(40, 120, 255, 0.4);
      border-radius: 12px;
      margin-top: 8px;
      box-shadow: 0 20px 40px rgba(0,0,0,0.8);
      z-index: 9999;
      display: none;
      padding: 12px;
      color: #fff;
    `;

    const searchDatabase = [
      { type: 'page', title: 'Workforce Command Center', desc: 'Main 3D Executive Dashboard', url: '/dashboard', icon: 'dashboard' },
      { type: 'page', title: 'Employee Directory', desc: 'Manage 248 Active Employees & Roles', url: '/employees', icon: 'badge' },
      { type: 'page', title: 'Attendance Intelligence', desc: 'Real-time Monitoring & Anomaly Audit', url: '/attendance', icon: 'timelapse' },
      { type: 'page', title: 'Payroll Intelligence', desc: 'Monthly Salary Disbursement & Variances', url: '/payroll', icon: 'payments' },
      { type: 'page', title: 'Smart Leave Review', desc: 'AI Workforce Capacity & Overlap Audit', url: '/leaves', icon: 'event_available' },
      { type: 'page', title: 'Admin Account & Security', desc: 'Superuser Profile & Active Sessions', url: '/account', icon: 'manage_accounts' },

      { type: 'emp', title: 'Rahul Sharma', desc: 'Software Engineer • Engineering (EMP-4089)', url: '/employees', icon: 'person' },
      { type: 'emp', title: 'Sarah Jenkins', desc: 'Senior DevOps Engineer • Infrastructure', url: '/leaves', icon: 'person' },
      { type: 'emp', title: 'David Chen', desc: 'UX Designer • Product Design', url: '/employees', icon: 'person' },
      { type: 'emp', title: 'Anita Kumar', desc: 'HR Lead • Human Resources', url: '/employees', icon: 'person' },
      { type: 'emp', title: 'Priya Desai', desc: 'Finance Analyst • Accounting', url: '/payroll', icon: 'person' },
      { type: 'emp', title: 'Marcus Wright', desc: 'Project Manager • Operations', url: '/leaves', icon: 'person' },

      { type: 'action', title: 'Add New Employee', desc: 'Open Glassmorphic Hire Form', action: 'addEmp', icon: 'person_add' },
      { type: 'action', title: 'Approve Monthly Payroll', desc: 'Disburse ₹24.8L Salary Funds', action: 'payroll', icon: 'account_balance' },
      { type: 'action', title: 'Audit Attendance Anomaly', desc: 'Inspect Geo-Location Flag', action: 'anomaly', icon: 'gavel' }
    ];

    function renderSearchResults(query, container) {
      const q = query.toLowerCase().trim();
      const matches = searchDatabase.filter(item => 
        !q || item.title.toLowerCase().includes(q) || item.desc.toLowerCase().includes(q)
      );

      if (matches.length === 0) {
        container.innerHTML = `
          <div style="padding: 16px; text-align: center; color: #8b95ae; font-size: 12px;">
            No matching command, employee, or record found for "<strong style="color:#fff;">${query}</strong>"
          </div>
        `;
        return;
      }

      container.innerHTML = matches.map(item => `
        <div class="dayflow-search-item" data-url="${item.url || ''}" data-action="${item.action || ''}" style="display: flex; align-items: center; gap: 12px; padding: 10px 12px; border-radius: 8px; cursor: pointer; transition: background 0.2s ease; margin-bottom: 4px;">
          <div style="width: 32px; height: 32px; border-radius: 8px; background: rgba(40,120,255,0.15); color: #2878FF; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
            <span class="material-symbols-outlined" style="font-size: 18px;">${item.icon}</span>
          </div>
          <div style="flex: 1; overflow: hidden;">
            <div style="font-size: 13px; font-weight: 600; color: #fff; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${item.title}</div>
            <div style="font-size: 11px; color: #8b95ae; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${item.desc}</div>
          </div>
          <span class="material-symbols-outlined" style="font-size: 16px; color: #42e18d;">north_east</span>
        </div>
      `).join('');

      container.querySelectorAll('.dayflow-search-item').forEach(el => {
        el.addEventListener('mouseenter', () => el.style.background = 'rgba(255,255,255,0.08)');
        el.addEventListener('mouseleave', () => el.style.background = 'transparent');
        el.addEventListener('click', () => {
          const url = el.getAttribute('data-url');
          const act = el.getAttribute('data-action');
          searchPopup.style.display = 'none';
          if (act === 'addEmp') {
            document.getElementById('dayflowAddEmpModal')?.classList.add('open');
          } else if (act === 'payroll') {
            document.getElementById('dayflowPayrollModal')?.classList.add('open');
          } else if (act === 'anomaly') {
            document.getElementById('dayflowAnomalyModal')?.classList.add('open');
          } else if (url) {
            window.location.href = url;
          }
        });
      });
    }

    // Attach to all top search inputs
    const topSearchInputs = document.querySelectorAll('header input, nav input, input[placeholder*="Search"], input[placeholder*="commands"]');
    topSearchInputs.forEach(input => {
      const parent = input.parentElement;
      if (parent) parent.style.position = 'relative';

      input.addEventListener('focus', () => {
        if (parent) parent.appendChild(searchPopup);
        renderSearchResults(input.value, searchPopup);
        searchPopup.style.display = 'block';
      });

      input.addEventListener('input', (e) => {
        if (parent) parent.appendChild(searchPopup);
        renderSearchResults(e.target.value, searchPopup);
        searchPopup.style.display = 'block';
      });

      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          const firstItem = searchPopup.querySelector('.dayflow-search-item');
          if (firstItem) firstItem.click();
        } else if (e.key === 'Escape') {
          searchPopup.style.display = 'none';
        }
      });
    });

    document.addEventListener('click', (e) => {
      if (!e.target.closest('header input') && !e.target.closest('#dayflowGlobalSearchPopup')) {
        searchPopup.style.display = 'none';
      }
    });
  }
})();
