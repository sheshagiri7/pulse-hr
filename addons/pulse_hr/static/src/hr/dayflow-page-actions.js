/**
 * Dayflow HR Interactive Page Actions & Modals Component
 * Live Filters, Add Employee Modal, Anomaly Proof Modal, Payroll Approval Flow
 * Non-blocking Glassmorphic Toast System
 */

(function () {
  document.addEventListener('DOMContentLoaded', () => {
    initPageActions();
  });

  if (document.readyState === 'interactive' || document.readyState === 'complete') {
    initPageActions();
  }

  // Toast Notification System
  window.showDayflowToast = function(message, type = 'success') {
    let toastContainer = document.getElementById('dayflowToastContainer');
    if (!toastContainer) {
      toastContainer = document.createElement('div');
      toastContainer.id = 'dayflowToastContainer';
      toastContainer.style.cssText = 'position: fixed; top: 24px; right: 24px; z-index: 99999; display: flex; flex-direction: column; gap: 10px; pointer-events: none;';
      document.body.appendChild(toastContainer);
    }

    const toast = document.createElement('div');
    const icon = type === 'success' ? 'check_circle' : 'info';
    const color = type === 'success' ? '#42e18d' : '#2878FF';

    toast.style.cssText = `
      background: rgba(10, 16, 36, 0.95);
      backdrop-filter: blur(16px);
      border: 1px solid ${color};
      border-radius: 12px;
      padding: 12px 18px;
      color: #fff;
      font-size: 13px;
      font-weight: 600;
      box-shadow: 0 10px 30px rgba(0,0,0,0.6);
      display: flex;
      align-items: center;
      gap: 10px;
      pointer-events: auto;
      transition: all 0.3s ease;
    `;
    toast.innerHTML = `
      <span class="material-symbols-outlined" style="color: ${color}; font-size: 20px;">${icon}</span>
      <span>${message}</span>
    `;
    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(-10px)';
      setTimeout(() => toast.remove(), 300);
    }, 3200);
  };

  function initPageActions() {
    if (document.getElementById('dayflowAddEmployeeModal')) return;

    // 1. Add Employee Modal Markup
    const addEmpModal = document.createElement('div');
    addEmpModal.id = 'dayflowAddEmployeeModal';
    addEmpModal.className = 'dayflow-settings-backdrop';
    addEmpModal.style.zIndex = '9996';
    addEmpModal.innerHTML = `
      <div style="position: relative; width: 480px; max-width: 90vw; margin: 80px auto; background: rgba(10, 16, 36, 0.95); backdrop-filter: blur(24px); border: 1px solid rgba(40, 120, 255, 0.3); border-radius: 20px; padding: 24px; box-shadow: 0 25px 50px rgba(0,0,0,0.8); color: #fff;">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 14px; margin-bottom: 20px;">
          <h3 style="font-size: 18px; font-weight: 700; color: #fff; display: flex; align-items: center; gap: 8px;">
            <span class="material-symbols-outlined" style="color: #2878FF;">person_add</span> Add New Employee
          </h3>
          <button id="closeAddEmpModal" style="background: transparent; border: none; color: #c2c6d7; cursor: pointer;">
            <span class="material-symbols-outlined">close</span>
          </button>
        </div>

        <form id="addEmployeeForm" style="display: flex; flex-direction: column; gap: 14px;">
          <div>
            <label style="display: block; font-size: 12px; font-weight: 600; color: #c2c6d7; margin-bottom: 4px;">Full Name</label>
            <input type="text" id="newEmpName" required placeholder="e.g. Maya Lin" style="width: 100%; background: rgba(21, 26, 48, 0.8); border: 1px solid rgba(255,255,255,0.15); border-radius: 8px; padding: 10px 12px; color: #fff; font-size: 13px; outline: none;"/>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
            <div>
              <label style="display: block; font-size: 12px; font-weight: 600; color: #c2c6d7; margin-bottom: 4px;">Department</label>
              <select id="newEmpDept" style="width: 100%; background: #151a30; border: 1px solid rgba(255,255,255,0.15); border-radius: 8px; padding: 10px 12px; color: #fff; font-size: 13px; outline: none;">
                <option value="Engineering">Engineering</option>
                <option value="Design">Design</option>
                <option value="Sales">Sales</option>
                <option value="Human Resources">Human Resources</option>
                <option value="Finance">Finance</option>
              </select>
            </div>
            <div>
              <label style="display: block; font-size: 12px; font-weight: 600; color: #c2c6d7; margin-bottom: 4px;">Role / Title</label>
              <input type="text" id="newEmpRole" required placeholder="e.g. AI Engineer" style="width: 100%; background: rgba(21, 26, 48, 0.8); border: 1px solid rgba(255,255,255,0.15); border-radius: 8px; padding: 10px 12px; color: #fff; font-size: 13px; outline: none;"/>
            </div>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
            <div>
              <label style="display: block; font-size: 12px; font-weight: 600; color: #c2c6d7; margin-bottom: 4px;">Location</label>
              <input type="text" id="newEmpLoc" placeholder="San Francisco, CA" style="width: 100%; background: rgba(21, 26, 48, 0.8); border: 1px solid rgba(255,255,255,0.15); border-radius: 8px; padding: 10px 12px; color: #fff; font-size: 13px; outline: none;"/>
            </div>
            <div>
              <label style="display: block; font-size: 12px; font-weight: 600; color: #c2c6d7; margin-bottom: 4px;">Annual Salary</label>
              <input type="text" id="newEmpSalary" placeholder="₹28,00,000" style="width: 100%; background: rgba(21, 26, 48, 0.8); border: 1px solid rgba(255,255,255,0.15); border-radius: 8px; padding: 10px 12px; color: #fff; font-size: 13px; outline: none;"/>
            </div>
          </div>

          <div style="display: flex; justify-content: flex-end; gap: 10px; margin-top: 12px;">
            <button type="button" id="cancelAddEmp" style="background: transparent; border: 1px solid rgba(255,255,255,0.2); color: #c2c6d7; padding: 8px 16px; border-radius: 8px; font-size: 12px; cursor: pointer;">Cancel</button>
            <button type="submit" style="background: linear-gradient(135deg, #2878FF, #8B45F7); border: none; color: #fff; padding: 8px 20px; border-radius: 8px; font-size: 12px; font-weight: 700; cursor: pointer;">Save Employee</button>
          </div>
        </form>
      </div>
    `;

    // 2. Anomaly Proof Evidence Modal
    const proofModal = document.createElement('div');
    proofModal.id = 'dayflowProofModal';
    proofModal.className = 'dayflow-settings-backdrop';
    proofModal.style.zIndex = '9996';
    proofModal.innerHTML = `
      <div style="position: relative; width: 520px; max-width: 90vw; margin: 80px auto; background: rgba(10, 16, 36, 0.95); backdrop-filter: blur(24px); border: 1px solid rgba(139, 69, 247, 0.4); border-radius: 20px; padding: 24px; box-shadow: 0 25px 50px rgba(0,0,0,0.8); color: #fff;">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 14px; margin-bottom: 16px;">
          <h3 style="font-size: 16px; font-weight: 700; color: #fff; display: flex; align-items: center; gap: 8px;">
            <span class="material-symbols-outlined" style="color: #ffb4ab;">verified</span> AI Anomaly Evidence Report
          </h3>
          <button id="closeProofModal" style="background: transparent; border: none; color: #c2c6d7; cursor: pointer;">
            <span class="material-symbols-outlined">close</span>
          </button>
        </div>

        <div style="display: flex; flex-direction: column; gap: 14px; font-size: 13px; line-height: 1.5;">
          <div style="background: rgba(255, 180, 171, 0.1); border: 1px solid rgba(255, 180, 171, 0.3); border-radius: 10px; padding: 12px; color: #ffb4ab;">
            <strong>Telemetry Scan Result:</strong> 4 employees in Engineering checked in >15 minutes late for 3 consecutive days.
          </div>

          <div style="background: rgba(255,255,255,0.04); border-radius: 10px; padding: 12px;">
            <div style="font-weight: 700; color: #fff; margin-bottom: 6px;">Correlated Evidence:</div>
            <ul style="padding-left: 18px; color: #c2c6d7; list-style: disc;">
              <li>Badge logs show access at 09:30 AM (Standard: 09:00 AM)</li>
              <li>Offsite client meeting logged yesterday evening</li>
              <li>Manager notification pending approval</li>
            </ul>
          </div>

          <div style="display: flex; justify-content: flex-end; gap: 10px; margin-top: 10px;">
            <button id="ackAnomalyBtn" style="background: rgba(255,255,255,0.1); border: none; color: #fff; padding: 8px 16px; border-radius: 8px; font-size: 12px; cursor: pointer;">Acknowledge</button>
            <button id="resolveAnomalyBtn" style="background: #42e18d; border: none; color: #050817; padding: 8px 16px; border-radius: 8px; font-size: 12px; font-weight: 700; cursor: pointer;">Resolve & Approve</button>
          </div>
        </div>
      </div>
    `;

    // 3. Payroll Approval Modal
    const payrollModal = document.createElement('div');
    payrollModal.id = 'dayflowPayrollModal';
    payrollModal.className = 'dayflow-settings-backdrop';
    payrollModal.style.zIndex = '9996';
    payrollModal.innerHTML = `
      <div style="position: relative; width: 480px; max-width: 90vw; margin: 80px auto; background: rgba(10, 16, 36, 0.95); backdrop-filter: blur(24px); border: 1px solid rgba(40, 120, 255, 0.4); border-radius: 20px; padding: 24px; box-shadow: 0 25px 50px rgba(0,0,0,0.8); color: #fff;">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 14px; margin-bottom: 16px;">
          <h3 style="font-size: 16px; font-weight: 700; color: #fff; display: flex; align-items: center; gap: 8px;">
            <span class="material-symbols-outlined" style="color: #2878FF;">payments</span> Confirm Monthly Payroll Approval
          </h3>
          <button id="closePayrollModal" style="background: transparent; border: none; color: #c2c6d7; cursor: pointer;">
            <span class="material-symbols-outlined">close</span>
          </button>
        </div>

        <div style="display: flex; flex-direction: column; gap: 14px; font-size: 13px;">
          <div style="background: rgba(40, 120, 255, 0.1); border: 1px solid rgba(40, 120, 255, 0.3); border-radius: 10px; padding: 14px;">
            <div style="font-size: 11px; color: #c2c6d7; text-transform: uppercase; font-weight: 600;">Total Monthly Disbursement</div>
            <div style="font-size: 28px; font-weight: 700; color: #fff; margin-top: 2px;">₹24,80,000</div>
            <div style="font-size: 11px; color: #42e18d; margin-top: 4px;">142 Active Employees • Processing Date: Oct 28, 2026</div>
          </div>

          <div style="color: #c2c6d7; font-size: 12px; line-height: 1.5;">
            By clicking <strong>Disburse Payroll</strong>, automated bank transfer instructions will be generated and signed with your Superuser token.
          </div>

          <div style="display: flex; justify-content: flex-end; gap: 10px; margin-top: 10px;">
            <button id="cancelPayrollBtn" style="background: rgba(255,255,255,0.1); border: none; color: #fff; padding: 8px 16px; border-radius: 8px; font-size: 12px; cursor: pointer;">Cancel</button>
            <button id="disbursePayrollBtn" style="background: linear-gradient(135deg, #2878FF, #8B45F7); border: none; color: #fff; padding: 10px 20px; border-radius: 8px; font-size: 12px; font-weight: 700; cursor: pointer;">Disburse Payroll</button>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(addEmpModal);
    document.body.appendChild(proofModal);
    document.body.appendChild(payrollModal);

    // Modal action click bindings
    document.getElementById('ackAnomalyBtn')?.addEventListener('click', () => {
      proofModal.classList.remove('open');
      showDayflowToast('Anomaly flagged for team review.', 'info');
    });

    document.getElementById('resolveAnomalyBtn')?.addEventListener('click', () => {
      proofModal.classList.remove('open');
      showDayflowToast('Anomaly resolved & attendance status updated to Present.', 'success');
    });

    document.getElementById('cancelPayrollBtn')?.addEventListener('click', () => payrollModal.classList.remove('open'));
    document.getElementById('disbursePayrollBtn')?.addEventListener('click', () => {
      payrollModal.classList.remove('open');
      showDayflowToast('🎉 Monthly Payroll of ₹24.8L Approved & Disbursed!', 'success');
    });

    // Bind Add Employee / Proof / Payroll Triggers
    document.querySelectorAll('button, a').forEach(btn => {
      const text = (btn.textContent || '').trim().toUpperCase();
      if (text.includes('ADD EMPLOYEE')) {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          addEmpModal.classList.add('open');
        });
      }
      if (text.includes('PROVE THIS') || text.includes('PROOF')) {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          proofModal.classList.add('open');
        });
      }
      if (text.includes('APPROVE PAYROLL')) {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          payrollModal.classList.add('open');
        });
      }
    });

    // Close buttons
    document.getElementById('closeAddEmpModal')?.addEventListener('click', () => addEmpModal.classList.remove('open'));
    document.getElementById('cancelAddEmp')?.addEventListener('click', () => addEmpModal.classList.remove('open'));
    document.getElementById('closeProofModal')?.addEventListener('click', () => proofModal.classList.remove('open'));
    document.getElementById('closePayrollModal')?.addEventListener('click', () => payrollModal.classList.remove('open'));

    // Handle Form Submit
    const addForm = document.getElementById('addEmployeeForm');
    if (addForm) {
      addForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('newEmpName').value;
        const dept = document.getElementById('newEmpDept').value;
        const role = document.getElementById('newEmpRole').value;

        // Try adding row to table if on employee directory page
        const tbody = document.querySelector('tbody');
        if (tbody) {
          const tr = document.createElement('tr');
          tr.className = 'border-b border-rim-light/40 hover:bg-white/5 transition-colors';
          tr.innerHTML = `
            <td class="py-4 px-4">
              <div class="flex items-center gap-3">
                <div class="w-9 h-9 rounded-full bg-primary/20 text-primary font-bold flex items-center justify-center">${name.charAt(0)}</div>
                <div>
                  <div class="font-bold text-white text-sm">${name}</div>
                  <div class="text-xs text-on-surface-variant">EMP-${Math.floor(1000 + Math.random() * 9000)}</div>
                </div>
              </div>
            </td>
            <td class="py-4 px-4 text-sm text-on-surface-variant">${dept}</td>
            <td class="py-4 px-4 text-sm text-white">${role}</td>
            <td class="py-4 px-4"><span class="px-2 py-0.5 rounded bg-tertiary/15 text-tertiary text-xs font-bold">Active</span></td>
            <td class="py-4 px-4 text-sm text-white font-mono">98%</td>
            <td class="py-4 px-4 text-sm text-white font-mono">₹28,00,000</td>
            <td class="py-4 px-4 text-right"><span class="material-symbols-outlined text-on-surface-variant hover:text-white cursor-pointer">more_vert</span></td>
          `;
          tbody.insertBefore(tr, tbody.firstChild);
        }

        addEmpModal.classList.remove('open');
        showDayflowToast(`Employee ${name} added successfully to ${dept}!`, 'success');
        addForm.reset();
      });
    }

    // Live Employee Table Filter & Search
    const searchInputs = document.querySelectorAll('input[placeholder*="Search"]');
    searchInputs.forEach(input => {
      input.addEventListener('input', (e) => {
        const val = e.target.value.toLowerCase();
        document.querySelectorAll('tbody tr').forEach(row => {
          const text = row.textContent.toLowerCase();
          row.style.display = text.includes(val) ? '' : 'none';
        });
      });
    });

    // 4. Department & Status Dropdown Filters
    const deptSelect = document.getElementById('empDeptSelect');
    const statusSelect = document.getElementById('empStatusSelect');

    function filterEmployeeTable() {
      const selectedDept = (deptSelect ? deptSelect.value : '').toLowerCase();
      const selectedStatus = (statusSelect ? statusSelect.value : '').toLowerCase();

      document.querySelectorAll('tbody tr').forEach(row => {
        const text = row.textContent.toLowerCase();
        const matchesDept = !selectedDept || text.includes(selectedDept);
        const matchesStatus = !selectedStatus || text.includes(selectedStatus);

        if (matchesDept && matchesStatus) {
          row.style.display = '';
        } else {
          row.style.display = 'none';
        }
      });
    }

    if (deptSelect) deptSelect.addEventListener('change', filterEmployeeTable);
    if (statusSelect) statusSelect.addEventListener('change', filterEmployeeTable);

    // 5. More Filters Modal & Drawer
    const moreFiltersBtn = document.getElementById('moreFiltersBtn');
    const moreFiltersModal = document.createElement('div');
    moreFiltersModal.id = 'dayflowMoreFiltersModal';
    moreFiltersModal.className = 'dayflow-settings-backdrop';
    moreFiltersModal.style.zIndex = '9996';
    moreFiltersModal.innerHTML = `
      <div style="position: relative; width: 440px; max-width: 90vw; margin: 80px auto; background: rgba(10, 16, 36, 0.95); backdrop-filter: blur(24px); border: 1px solid rgba(40, 120, 255, 0.4); border-radius: 20px; padding: 24px; box-shadow: 0 25px 50px rgba(0,0,0,0.8); color: #fff;">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 14px; margin-bottom: 16px;">
          <h3 style="font-size: 16px; font-weight: 700; color: #fff; display: flex; align-items: center; gap: 8px;">
            <span class="material-symbols-outlined" style="color: #2878FF;">filter_list</span> Advanced Filters
          </h3>
          <button id="closeMoreFiltersModal" style="background: transparent; border: none; color: #c2c6d7; cursor: pointer;">
            <span class="material-symbols-outlined">close</span>
          </button>
        </div>

        <div style="display: flex; flex-direction: column; gap: 14px; font-size: 13px;">
          <div>
            <label style="display: block; font-size: 12px; font-weight: 600; color: #c2c6d7; margin-bottom: 6px;">Min. Attendance Score</label>
            <select id="filterMinAttendance" style="width: 100%; background: #151a30; border: 1px solid rgba(255,255,255,0.15); border-radius: 8px; padding: 10px 12px; color: #fff; font-size: 13px; outline: none;">
              <option value="0">All Scores (0% - 100%)</option>
              <option value="90">90% and above</option>
              <option value="95">95% and above</option>
              <option value="98">98% and above</option>
            </select>
          </div>

          <div>
            <label style="display: block; font-size: 12px; font-weight: 600; color: #c2c6d7; margin-bottom: 6px;">Salary Tier</label>
            <select id="filterSalaryTier" style="width: 100%; background: #151a30; border: 1px solid rgba(255,255,255,0.15); border-radius: 8px; padding: 10px 12px; color: #fff; font-size: 13px; outline: none;">
              <option value="all">All Salaries</option>
              <option value="high">High Tier (> ₹30L)</option>
              <option value="mid">Mid Tier (₹20L - ₹30L)</option>
              <option value="standard">Standard Tier (< ₹20L)</option>
            </select>
          </div>

          <div style="display: flex; justify-content: flex-end; gap: 10px; margin-top: 10px;">
            <button id="resetFiltersBtn" style="background: transparent; border: 1px solid rgba(255,255,255,0.2); color: #c2c6d7; padding: 8px 16px; border-radius: 8px; font-size: 12px; cursor: pointer;">Reset</button>
            <button id="applyMoreFiltersBtn" style="background: linear-gradient(135deg, #2878FF, #8B45F7); border: none; color: #fff; padding: 8px 20px; border-radius: 8px; font-size: 12px; font-weight: 700; cursor: pointer;">Apply Filters</button>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(moreFiltersModal);

    if (moreFiltersBtn) {
      moreFiltersBtn.addEventListener('click', (e) => {
        e.preventDefault();
        moreFiltersModal.classList.add('open');
      });
    }

    document.getElementById('closeMoreFiltersModal')?.addEventListener('click', () => moreFiltersModal.classList.remove('open'));
    document.getElementById('resetFiltersBtn')?.addEventListener('click', () => {
      document.getElementById('filterMinAttendance').value = '0';
      document.getElementById('filterSalaryTier').value = 'all';
      if (deptSelect) deptSelect.value = '';
      if (statusSelect) statusSelect.value = '';
      filterEmployeeTable();
      moreFiltersModal.classList.remove('open');
      showDayflowToast('Filters reset to default.', 'info');
    });

    document.getElementById('applyMoreFiltersBtn')?.addEventListener('click', () => {
      moreFiltersModal.classList.remove('open');
      showDayflowToast('Advanced filters applied.', 'success');
    });

    // 6. Pagination System
    let currentPage = 1;
    const totalPages = 25;
    const totalEntries = 248;

    const counterEl = document.getElementById('paginationCounter');
    const prevBtn = document.getElementById('paginationPrevBtn');
    const nextBtn = document.getElementById('paginationNextBtn');
    const pageBtns = document.querySelectorAll('.page-btn');

    function updatePagination(page) {
      currentPage = page;

      // Update active button state
      pageBtns.forEach(btn => {
        const p = parseInt(btn.getAttribute('data-page'));
        if (p === currentPage) {
          btn.className = 'page-btn w-8 h-8 rounded-lg bg-primary/20 border border-primary text-primary font-bold text-sm flex items-center justify-center cursor-pointer';
        } else {
          btn.className = 'page-btn w-8 h-8 rounded-lg bg-surface-container border border-rim-light text-on-surface hover:border-primary/50 hover:text-primary text-sm flex items-center justify-center transition-all cursor-pointer';
        }
      });

      // Update Prev/Next disabled states
      if (prevBtn) prevBtn.disabled = currentPage === 1;
      if (nextBtn) nextBtn.disabled = currentPage === totalPages;

      // Update counter text
      const start = (currentPage - 1) * 4 + 1;
      const end = Math.min(currentPage * 4, totalEntries);
      if (counterEl) {
        counterEl.innerHTML = `Showing <span class="font-semibold text-on-surface">${start}</span> to <span class="font-semibold text-on-surface">${end}</span> of <span class="font-semibold text-on-surface">${totalEntries}</span> entries`;
      }

      showDayflowToast(`Loaded Employee Directory Page ${currentPage}`, 'info');
    }

    pageBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const p = parseInt(btn.getAttribute('data-page'));
        updatePagination(p);
      });
    });

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        if (currentPage > 1) updatePagination(currentPage - 1);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        if (currentPage < totalPages) updatePagination(currentPage + 1);
      });
    }

    // 7. Smart Leave Review Logic (/leaves)
    const cardSarah = document.getElementById('leaveCardSarah');
    const cardDavid = document.getElementById('leaveCardDavid');
    const cardMarcus = document.getElementById('leaveCardMarcus');

    const recText = document.getElementById('leaveRecommendationText');
    const confText = document.getElementById('leaveConfidenceText');
    const evidenceList = document.getElementById('leaveEvidenceList');

    const rejectBtn = document.getElementById('leaveRejectBtn');
    const approveBtn = document.getElementById('leaveApproveBtn');
    const addCommentBtn = document.getElementById('leaveAddCommentBtn');
    const leaveFilterBtn = document.getElementById('leaveFilterBtn');

    let activeLeaveApplicant = 'Sarah Jenkins';

    const leaveData = {
      'Sarah Jenkins': {
        recommendation: 'Reject / Reschedule',
        recommendationClass: 'font-headline-md text-[28px] font-bold text-error',
        confidence: '87%',
        evidence: [
          { icon: 'group_off', color: 'text-secondary', title: '2 teammates already on leave', desc: 'A. Smith and M. Garcia approved for overlapping dates.' },
          { icon: 'trending_down', color: 'text-error', title: 'Team availability 72%', desc: 'Falls below critical 80% operational threshold.' },
          { icon: 'rocket_launch', color: 'text-tertiary', title: 'Overlaps with peak workload', desc: "'Project Phoenix' phase 3 deployment scheduled Oct 15." }
        ]
      },
      'David Chen': {
        recommendation: 'Approve / Low Risk',
        recommendationClass: 'font-headline-md text-[28px] font-bold text-tertiary',
        confidence: '94%',
        evidence: [
          { icon: 'check_circle', color: 'text-tertiary', title: 'Zero overlapping team leaves', desc: 'No other UX designers scheduled off during Oct 20-22.' },
          { icon: 'trending_up', color: 'text-tertiary', title: 'Team availability 91%', desc: 'Well above the 80% operational threshold.' },
          { icon: 'task_alt', color: 'text-primary', title: 'No release sprint overlap', desc: 'Design sprint complete; no critical milestones affected.' }
        ]
      },
      'Marcus Wright': {
        recommendation: 'Requires Review',
        recommendationClass: 'font-headline-md text-[28px] font-bold text-secondary',
        confidence: '78%',
        evidence: [
          { icon: 'warning', color: 'text-secondary', title: '1 PM colleague on leave', desc: 'J. Doe approved for partial overlap on Nov 02.' },
          { icon: 'schedule', color: 'text-secondary', title: 'Team availability 82%', desc: 'Borderline threshold during Q4 planning week.' },
          { icon: 'sync', color: 'text-primary', title: 'Delegation required', desc: 'Backup PM assignment needed for sprint standups.' }
        ]
      }
    };

    function selectLeaveApplicant(name, selectedCard) {
      activeLeaveApplicant = name;
      const data = leaveData[name];
      if (!data) return;

      // Update card visual borders
      [cardSarah, cardDavid, cardMarcus].forEach(card => {
        if (card) {
          card.classList.remove('ai-accent', 'border-secondary/30', 'bg-surface-container-high/40');
          card.classList.add('opacity-70');
        }
      });

      if (selectedCard) {
        selectedCard.classList.remove('opacity-70');
        selectedCard.classList.add('ai-accent', 'border-secondary/30', 'bg-surface-container-high/40');
      }

      // Update Panel Details
      if (recText) {
        recText.textContent = data.recommendation;
        recText.className = data.recommendationClass;
      }
      if (confText) confText.textContent = data.confidence;

      if (evidenceList) {
        evidenceList.innerHTML = data.evidence.map(item => `
          <li class="flex items-start gap-3">
            <span class="material-symbols-outlined ${item.color} mt-0.5">${item.icon}</span>
            <div>
              <p class="font-body-md text-body-md text-on-surface">${item.title}</p>
              <p class="font-label-sm text-label-sm text-text-muted">${item.desc}</p>
            </div>
          </li>
        `).join('');
      }
    }

    if (cardSarah) cardSarah.addEventListener('click', () => selectLeaveApplicant('Sarah Jenkins', cardSarah));
    if (cardDavid) cardDavid.addEventListener('click', () => selectLeaveApplicant('David Chen', cardDavid));
    if (cardMarcus) cardMarcus.addEventListener('click', () => selectLeaveApplicant('Marcus Wright', cardMarcus));

    if (rejectBtn) {
      rejectBtn.addEventListener('click', () => {
        showDayflowToast(`❌ Leave Request for ${activeLeaveApplicant} REJECTED. Employee notified.`, 'error');
      });
    }

    if (approveBtn) {
      approveBtn.addEventListener('click', () => {
        showDayflowToast(`✓ Leave Request for ${activeLeaveApplicant} APPROVED! Workforce schedule updated.`, 'success');
      });
    }

    // Add Comment Modal
    const commentModal = document.createElement('div');
    commentModal.id = 'leaveCommentModal';
    commentModal.className = 'dayflow-settings-backdrop';
    commentModal.style.zIndex = '9997';
    commentModal.innerHTML = `
      <div style="position: relative; width: 440px; max-width: 90vw; margin: 80px auto; background: rgba(10, 16, 36, 0.95); backdrop-filter: blur(24px); border: 1px solid rgba(40, 120, 255, 0.4); border-radius: 20px; padding: 24px; box-shadow: 0 25px 50px rgba(0,0,0,0.8); color: #fff;">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 14px; margin-bottom: 16px;">
          <h3 style="font-size: 16px; font-weight: 700; color: #fff; display: flex; align-items: center; gap: 8px;">
            <span class="material-symbols-outlined" style="color: #2878FF;">add_comment</span> Add Reviewer Comment
          </h3>
          <button id="closeLeaveCommentModal" style="background: transparent; border: none; color: #c2c6d7; cursor: pointer;">
            <span class="material-symbols-outlined">close</span>
          </button>
        </div>

        <div style="display: flex; flex-direction: column; gap: 14px;">
          <p style="font-size: 12px; color: #c2c6d7;">Adding official audit note for <strong id="commentApplicantName" style="color: #fff;"></strong>'s leave request:</p>
          <textarea id="leaveCommentText" rows="4" style="width: 100%; background: #151a30; border: 1px solid rgba(255,255,255,0.15); border-radius: 8px; padding: 12px; color: #fff; font-size: 13px; outline: none; resize: vertical;" placeholder="Type reviewer feedback or justification..."></textarea>
          <div style="display: flex; justify-content: flex-end; gap: 10px; margin-top: 6px;">
            <button id="cancelLeaveCommentBtn" style="background: transparent; border: 1px solid rgba(255,255,255,0.2); color: #c2c6d7; padding: 8px 16px; border-radius: 8px; font-size: 12px; cursor: pointer;">Cancel</button>
            <button id="saveLeaveCommentBtn" style="background: linear-gradient(135deg, #2878FF, #8B45F7); border: none; color: #fff; padding: 8px 20px; border-radius: 8px; font-size: 12px; font-weight: 700; cursor: pointer;">Save Comment</button>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(commentModal);

    if (addCommentBtn) {
      addCommentBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const appNameEl = document.getElementById('commentApplicantName');
        if (appNameEl) appNameEl.textContent = activeLeaveApplicant;
        commentModal.classList.add('open');
      });
    }

    document.getElementById('closeLeaveCommentModal')?.addEventListener('click', () => commentModal.classList.remove('open'));
    document.getElementById('cancelLeaveCommentBtn')?.addEventListener('click', () => commentModal.classList.remove('open'));
    document.getElementById('saveLeaveCommentBtn')?.addEventListener('click', () => {
      commentModal.classList.remove('open');
      showDayflowToast(`✓ Reviewer comment logged for ${activeLeaveApplicant}!`, 'success');
    });

    if (leaveFilterBtn) {
      leaveFilterBtn.addEventListener('click', (e) => {
        e.preventDefault();
        showDayflowToast('Filtering queue by High Impact leave requests.', 'info');
      });
    }

    // 8. Payroll Variance & Itemized Discrepancies (/payroll)
    const varModal = document.createElement('div');
    varModal.id = 'dayflowVarianceModal';
    varModal.className = 'dayflow-settings-backdrop';
    varModal.style.zIndex = '9998';
    varModal.innerHTML = `
      <div style="position: relative; width: 480px; max-width: 90vw; margin: 80px auto; background: rgba(10, 16, 36, 0.95); backdrop-filter: blur(24px); border: 1px solid rgba(40, 120, 255, 0.4); border-radius: 20px; padding: 24px; box-shadow: 0 25px 50px rgba(0,0,0,0.8); color: #fff;">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 14px; margin-bottom: 16px;">
          <h3 id="varModalTitle" style="font-size: 16px; font-weight: 700; color: #fff; display: flex; align-items: center; gap: 8px;">
            <span class="material-symbols-outlined" style="color: #2878FF;">analytics</span> Variance Breakdown
          </h3>
          <button id="closeVarModal" style="background: transparent; border: none; color: #c2c6d7; cursor: pointer;">
            <span class="material-symbols-outlined">close</span>
          </button>
        </div>

        <div id="varModalBody" style="display: flex; flex-direction: column; gap: 12px; font-size: 13px;">
          <!-- Items inserted dynamically -->
        </div>

        <div style="display: flex; justify-content: flex-end; margin-top: 18px;">
          <button id="closeVarModalBtn" style="background: linear-gradient(135deg, #2878FF, #8B45F7); border: none; color: #fff; padding: 8px 20px; border-radius: 8px; font-size: 12px; font-weight: 700; cursor: pointer;">Close</button>
        </div>
      </div>
    `;
    document.body.appendChild(varModal);

    document.getElementById('closeVarModal')?.addEventListener('click', () => varModal.classList.remove('open'));
    document.getElementById('closeVarModalBtn')?.addEventListener('click', () => varModal.classList.remove('open'));

    const varianceData = {
      newEmps: {
        title: '🆕 New Employees (+₹1.2L)',
        items: [
          { name: 'Devon Vance', role: 'Senior Architect', impact: '+₹80,000/mo', date: 'Joined Oct 02' },
          { name: 'Aarav Shah', role: 'Frontend Engineer', impact: '+₹40,000/mo', date: 'Joined Oct 09' }
        ]
      },
      salaryRev: {
        title: '📈 Salary Revisions (+₹82K)',
        items: [
          { name: 'Priya Sharma', role: 'Annual Appraisal Adjustment', impact: '+₹45,000/mo', date: 'Effective Oct 01' },
          { name: 'Rohan Verma', role: 'Promotion Increment', impact: '+₹37,000/mo', date: 'Effective Oct 01' }
        ]
      },
      overtime: {
        title: '⏱️ Overtime Payouts (+₹34K)',
        items: [
          { name: 'DevOps Release Squad', role: 'Phase 3 Phoenix Launch', impact: '+₹22,000', date: 'Oct 12 - Oct 16' },
          { name: 'Security Audit Team', role: 'ISO Compliance Sprint', impact: '+₹12,000', date: 'Oct 05 - Oct 08' }
        ]
      }
    };

    function showVarianceModal(key) {
      const data = varianceData[key];
      if (!data) return;
      document.getElementById('varModalTitle').innerHTML = `<span class="material-symbols-outlined" style="color: #2878FF;">analytics</span> ${data.title}`;
      const body = document.getElementById('varModalBody');
      body.innerHTML = data.items.map(item => `
        <div style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 10px; padding: 12px; display: flex; justify-content: space-between; align-items: center;">
          <div>
            <div style="font-weight: 700; color: #fff;">${item.name}</div>
            <div style="font-size: 11px; color: #8b95ae;">${item.role} • ${item.date}</div>
          </div>
          <div style="font-weight: 700; color: #ffb4ab;">${item.impact}</div>
        </div>
      `).join('');
      varModal.classList.add('open');
    }

    document.getElementById('varianceNewEmps')?.addEventListener('click', () => showVarianceModal('newEmps'));
    document.getElementById('varianceSalaryRev')?.addEventListener('click', () => showVarianceModal('salaryRev'));
    document.getElementById('varianceOvertime')?.addEventListener('click', () => showVarianceModal('overtime'));

    // Prove This Discrepancy Evidence Handlers
    const discData = {
      'Rahul Sharma': {
        issue: 'Unusual Overtime (42hrs)',
        proof: 'Logged 42 overtime hours between Oct 10 - Oct 18 during Project Phoenix release. Historical average is 12hrs/month.',
        status: 'Flagged for Manager Verification'
      },
      'Anita Kumar': {
        issue: 'Bonus Discrepancy',
        proof: 'Diwali performance bonus calculated at 15% rate instead of standard 10% policy cap due to legacy formula trigger.',
        status: 'Audit Adjustment Required'
      },
      'Priya Desai': {
        issue: 'Missing Tax Decl.',
        proof: 'Form 12BB rent receipts pending verification for HRA tax exemption deduction.',
        status: 'TDS Deduction Hold'
      }
    };

    document.querySelectorAll('.prove-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const empName = btn.getAttribute('data-emp');
        const info = discData[empName] || { issue: 'Payroll Discrepancy', proof: 'Itemized breakdown verified against timecards.', status: 'Review Required' };

        const proofModal = document.getElementById('dayflowAnomalyModal');
        if (proofModal) {
          const content = proofModal.querySelector('div > div');
          if (content) {
            content.innerHTML = `
              <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 14px; margin-bottom: 16px;">
                <h3 style="font-size: 16px; font-weight: 700; color: #fff; display: flex; align-items: center; gap: 8px;">
                  <span class="material-symbols-outlined" style="color: #ffb4ab;">gavel</span> Discrepancy Audit: ${empName}
                </h3>
                <button onclick="document.getElementById('dayflowAnomalyModal').classList.remove('open')" style="background: transparent; border: none; color: #c2c6d7; cursor: pointer;">
                  <span class="material-symbols-outlined">close</span>
                </button>
              </div>

              <div style="display: flex; flex-direction: column; gap: 14px; font-size: 13px;">
                <div style="background: rgba(255,180,171,0.1); border: 1px solid rgba(255,180,171,0.3); border-radius: 10px; padding: 12px;">
                  <div style="font-weight: 700; color: #ffb4ab; margin-bottom: 4px;">Issue: ${info.issue}</div>
                  <div style="color: #c2c6d7;">Status: ${info.status}</div>
                </div>

                <div style="background: #151a30; border: 1px solid rgba(255,255,255,0.1); border-radius: 10px; padding: 14px; color: #e1e2f7;">
                  <div style="font-weight: 600; color: #2878FF; margin-bottom: 6px;">Audit Trail Evidence:</div>
                  <p style="margin: 0; line-height: 1.5; font-size: 12px; color: #c2c6d7;">${info.proof}</p>
                </div>

                <div style="display: flex; justify-content: flex-end; gap: 10px; margin-top: 10px;">
                  <button onclick="document.getElementById('dayflowAnomalyModal').classList.remove('open'); window.showDayflowToast('Discrepancy acknowledged for ${empName}', 'info');" style="background: rgba(255,255,255,0.1); border: none; color: #fff; padding: 8px 16px; border-radius: 8px; font-size: 12px; cursor: pointer;">Acknowledge</button>
                  <button onclick="document.getElementById('dayflowAnomalyModal').classList.remove('open'); window.showDayflowToast('✓ ${empName}\\'s payroll discrepancy resolved & recalculated!', 'success');" style="background: linear-gradient(135deg, #2878FF, #8B45F7); border: none; color: #fff; padding: 8px 20px; border-radius: 8px; font-size: 12px; font-weight: 700; cursor: pointer;">Resolve & Recalculate</button>
                </div>
              </div>
            `;
          }
          proofModal.classList.add('open');
        }
      });
    });

    // -------------------------------------------------------------
    // HR ACCOUNT EDIT PROFILE MODAL & PASSWORD UPDATE HANDLERS
    // -------------------------------------------------------------
    const editHrModal = document.createElement('div');
    editHrModal.id = 'dayflowEditHrProfileModal';
    editHrModal.className = 'dayflow-settings-backdrop';
    editHrModal.style.zIndex = '9999';
    editHrModal.innerHTML = `
      <div style="position: relative; width: 480px; max-width: 90vw; margin: 80px auto; background: rgba(10, 16, 36, 0.96); backdrop-filter: blur(24px); border: 1px solid rgba(40, 120, 255, 0.4); border-radius: 20px; padding: 24px; box-shadow: 0 25px 50px rgba(0,0,0,0.85); color: #fff; font-family: system-ui, sans-serif;">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 14px; margin-bottom: 20px;">
          <h3 style="font-size: 18px; font-weight: 700; color: #fff; display: flex; align-items: center; gap: 8px; margin: 0;">
            <span class="material-symbols-outlined" style="color: #2878FF;">manage_accounts</span> Edit HR Admin Profile
          </h3>
          <button id="closeEditHrModal" style="background: transparent; border: none; color: #c2c6d7; cursor: pointer;">
            <span class="material-symbols-outlined">close</span>
          </button>
        </div>

        <form id="editHrProfileForm" style="display: flex; flex-direction: column; gap: 14px;">
          <div>
            <label style="display: block; font-size: 12px; font-weight: 600; color: #c2c6d7; margin-bottom: 4px;">Full Name</label>
            <input type="text" id="hrEditName" value="Admin Officer" required style="width: 100%; background: #151a30; border: 1px solid rgba(255,255,255,0.15); border-radius: 8px; padding: 10px 12px; color: #fff; font-size: 13px; outline: none;"/>
          </div>

          <div>
            <label style="display: block; font-size: 12px; font-weight: 600; color: #c2c6d7; margin-bottom: 4px;">Title / Role Designation</label>
            <input type="text" id="hrEditTitle" value="HR Operations Director & Enterprise Administrator" required style="width: 100%; background: #151a30; border: 1px solid rgba(255,255,255,0.15); border-radius: 8px; padding: 10px 12px; color: #fff; font-size: 13px; outline: none;"/>
          </div>

          <div>
            <label style="display: block; font-size: 12px; font-weight: 600; color: #c2c6d7; margin-bottom: 4px;">Work Email</label>
            <input type="email" id="hrEditEmail" value="admin.officer@dayflow.ai" required style="width: 100%; background: #151a30; border: 1px solid rgba(255,255,255,0.15); border-radius: 8px; padding: 10px 12px; color: #fff; font-size: 13px; outline: none;"/>
          </div>

          <div style="display: flex; justify-content: flex-end; gap: 10px; margin-top: 10px;">
            <button type="button" id="cancelEditHrModal" style="background: transparent; border: 1px solid rgba(255,255,255,0.2); color: #c2c6d7; padding: 8px 16px; border-radius: 8px; font-size: 12px; cursor: pointer;">Cancel</button>
            <button type="submit" style="background: linear-gradient(135deg, #2878FF, #8B45F7); border: none; color: #fff; padding: 8px 22px; border-radius: 8px; font-size: 12px; font-weight: 700; cursor: pointer;">Save Changes</button>
          </div>
        </form>
      </div>
    `;
    document.body.appendChild(editHrModal);

    // Bind Edit Profile Button
    document.querySelectorAll('button').forEach(btn => {
      if ((btn.textContent || '').trim().includes('Edit Profile')) {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          editHrModal.classList.add('open');
        });
      }
    });

    document.getElementById('closeEditHrModal')?.addEventListener('click', () => editHrModal.classList.remove('open'));
    document.getElementById('cancelEditHrModal')?.addEventListener('click', () => editHrModal.classList.remove('open'));

    document.getElementById('editHrProfileForm')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const newName = document.getElementById('hrEditName').value;
      const newTitle = document.getElementById('hrEditTitle').value;
      const newEmail = document.getElementById('hrEditEmail').value;

      // Update text in DOM profile card
      document.querySelectorAll('h1, h2, h3, div').forEach(el => {
        if (el.textContent && el.textContent.includes('Admin Officer')) {
          el.childNodes.forEach(child => {
            if (child.nodeType === 3 && child.nodeValue.includes('Admin Officer')) {
              child.nodeValue = child.nodeValue.replace('Admin Officer', newName);
            }
          });
        }
      });

      editHrModal.classList.remove('open');
      window.showDayflowToast('✓ Profile details updated successfully!', 'success');
    });

    // Password Update Button
    document.querySelectorAll('button').forEach(btn => {
      if ((btn.textContent || '').trim().includes('UPDATE PASSWORD')) {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          const inputs = document.querySelectorAll('input[type="password"]');
          if (inputs.length >= 2) {
            inputs.forEach(i => i.value = '');
          }
          window.showDayflowToast('✓ Security password updated successfully!', 'success');
        });
      }
    });

    // Revoke Sessions
    document.querySelectorAll('button, a').forEach(el => {
      const text = (el.textContent || '').trim();
      if (text === 'Revoke' || text === 'Terminate All') {
        el.addEventListener('click', (e) => {
          e.preventDefault();
          if (text === 'Terminate All') {
            window.showDayflowToast('✓ All secondary active sessions terminated!', 'success');
          } else {
            el.closest('div').style.opacity = '0.4';
            el.textContent = 'Revoked';
            window.showDayflowToast('✓ Session revoked successfully!', 'info');
          }
        });
      }
    });

  }
})();
