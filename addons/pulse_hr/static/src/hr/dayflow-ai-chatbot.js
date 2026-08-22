/**
 * Dayflow AI HR Commander Chatbot Client Script
 */

(function () {
  if (document.getElementById('dayflow-ai-root')) return;

  // Root container
  const root = document.createElement('div');
  root.id = 'dayflow-ai-root';

  // Inject HTML Markup
  root.innerHTML = `
    <!-- Floating Trigger Button -->
    <button id="dayflowAiTrigger" class="dayflow-ai-trigger" title="Dayflow AI HR Commander" aria-label="Dayflow AI Assistant">
      <div class="dayflow-ai-orb">
        <span class="material-symbols-outlined" style="font-size: 22px; display: flex; align-items: center; justify-content: center; width: 100%; height: 100%; text-align: center; margin: 0; padding: 0;">psychology</span>
      </div>
      <span class="dayflow-ai-badge"></span>
    </button>

    <!-- Chat Panel Window -->
    <div id="dayflowAiPanel" class="dayflow-ai-panel">
      <!-- Header -->
      <div class="dayflow-ai-header">
        <div class="dayflow-ai-brand">
          <div class="dayflow-ai-avatar">
            <span class="material-symbols-outlined" style="font-size: 22px;">auto_awesome</span>
          </div>
          <div>
            <div class="dayflow-ai-title">DAYFLOW AI</div>
            <div class="dayflow-ai-subtitle">
              <span class="dayflow-ai-status-dot"></span>
              HR Intelligence Assistant
            </div>
          </div>
        </div>
        <div class="dayflow-ai-controls">
          <button id="dayflowAiClearBtn" class="dayflow-ai-control-btn" title="Clear Conversation">
            <span class="material-symbols-outlined" style="font-size: 18px;">restart_alt</span>
          </button>
          <button id="dayflowAiMinimizeBtn" class="dayflow-ai-control-btn" title="Minimize">
            <span class="material-symbols-outlined" style="font-size: 18px;">remove</span>
          </button>
          <button id="dayflowAiCloseBtn" class="dayflow-ai-control-btn" title="Close">
            <span class="material-symbols-outlined" style="font-size: 18px;">close</span>
          </button>
        </div>
      </div>

      <!-- Message History Body -->
      <div id="dayflowAiBody" class="dayflow-ai-body">
        <!-- Welcome Screen -->
        <div id="dayflowAiWelcome" class="dayflow-ai-welcome">
          <div class="dayflow-ai-welcome-title">Good morning, Admin. 👋</div>
          <div class="dayflow-ai-welcome-desc">How can I help you understand your workforce today? Select a quick topic or type your query below.</div>
          
          <div class="dayflow-ai-quick-grid">
            <button class="dayflow-ai-quick-btn" onclick="window.DayflowAI.sendPrompt('Give me today\'s workforce summary.')">
              <span class="material-symbols-outlined" style="font-size: 16px; color: #2878FF;">dashboard</span>
              Workforce Overview
            </button>
            <button class="dayflow-ai-quick-btn" onclick="window.DayflowAI.sendPrompt('Who is absent today?')">
              <span class="material-symbols-outlined" style="font-size: 16px; color: #42e18d;">how_to_reg</span>
              Attendance Issues
            </button>
            <button class="dayflow-ai-quick-btn" onclick="window.DayflowAI.sendPrompt('What leave requests need attention?')">
              <span class="material-symbols-outlined" style="font-size: 16px; color: #d5bbff;">event_busy</span>
              Pending Leave
            </button>
            <button class="dayflow-ai-quick-btn" onclick="window.DayflowAI.sendPrompt('Is payroll ready for review?')">
              <span class="material-symbols-outlined" style="font-size: 16px; color: #F4B400;">payments</span>
              Payroll Insights
            </button>
          </div>

          <div style="font-size: 11px; color: #8B95AE; font-weight: 600; margin-bottom: 6px; text-transform: uppercase; letter-spacing: 0.05em;">Suggested Questions</div>
          <div class="dayflow-ai-chips">
            <span class="dayflow-ai-chip" onclick="window.DayflowAI.sendPrompt('Show me employees with low attendance.')">Show low attendance</span>
            <span class="dayflow-ai-chip" onclick="window.DayflowAI.sendPrompt('Which departments have attendance issues?')">Department issues</span>
            <span class="dayflow-ai-chip" onclick="window.DayflowAI.sendPrompt('What is wrong on this page?')">Page context insights</span>
          </div>
        </div>
      </div>

      <!-- Footer Input -->
      <div class="dayflow-ai-footer">
        <div class="dayflow-ai-input-wrap">
          <input id="dayflowAiInput" class="dayflow-ai-input" placeholder="Ask Dayflow AI about workforce..." type="text" autocomplete="off"/>
        </div>
        <button id="dayflowAiSendBtn" class="dayflow-ai-send-btn" title="Send Message">
          <span class="material-symbols-outlined" style="font-size: 20px;">send</span>
        </button>
      </div>
    </div>
  `;

  document.body.appendChild(root);

  // DOM Elements
  const trigger = document.getElementById('dayflowAiTrigger');
  const panel = document.getElementById('dayflowAiPanel');
  const minimizeBtn = document.getElementById('dayflowAiMinimizeBtn');
  const closeBtn = document.getElementById('dayflowAiCloseBtn');
  const clearBtn = document.getElementById('dayflowAiClearBtn');
  const body = document.getElementById('dayflowAiBody');
  const input = document.getElementById('dayflowAiInput');
  const sendBtn = document.getElementById('dayflowAiSendBtn');

  let history = [];

  // Toggle Panel
  function togglePanel() {
    panel.classList.toggle('open');
    if (panel.classList.contains('open')) {
      input.focus();
    }
  }

  trigger.addEventListener('click', togglePanel);
  minimizeBtn.addEventListener('click', togglePanel);
  closeBtn.addEventListener('click', togglePanel);

  // Clear Conversation
  clearBtn.addEventListener('click', () => {
    history = [];
    body.innerHTML = `
      <div id="dayflowAiWelcome" class="dayflow-ai-welcome">
        <div class="dayflow-ai-welcome-title">Good morning, Admin. 👋</div>
        <div class="dayflow-ai-welcome-desc">Conversation cleared. How can I assist you with your workforce data now?</div>
        <div class="dayflow-ai-quick-grid">
          <button class="dayflow-ai-quick-btn" onclick="window.DayflowAI.sendPrompt('Give me today\'s workforce summary.')">
            <span class="material-symbols-outlined" style="font-size: 16px; color: #2878FF;">dashboard</span>
            Workforce Overview
          </button>
          <button class="dayflow-ai-quick-btn" onclick="window.DayflowAI.sendPrompt('Who is absent today?')">
            <span class="material-symbols-outlined" style="font-size: 16px; color: #42e18d;">how_to_reg</span>
            Attendance Issues
          </button>
          <button class="dayflow-ai-quick-btn" onclick="window.DayflowAI.sendPrompt('What leave requests need attention?')">
            <span class="material-symbols-outlined" style="font-size: 16px; color: #d5bbff;">event_busy</span>
            Pending Leave
          </button>
          <button class="dayflow-ai-quick-btn" onclick="window.DayflowAI.sendPrompt('Is payroll ready for review?')">
            <span class="material-symbols-outlined" style="font-size: 16px; color: #F4B400;">payments</span>
            Payroll Insights
          </button>
        </div>
      </div>
    `;
  });

  // Close on Escape key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && panel.classList.contains('open')) {
      panel.classList.remove('open');
    }
  });

  // Time formatter
  function getTimeStr() {
    const d = new Date();
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  // Scroll to bottom
  function scrollToBottom() {
    body.scrollTop = body.scrollHeight;
  }

  // Add User Message
  function addUserMessage(text) {
    const welcome = document.getElementById('dayflowAiWelcome');
    if (welcome && history.length === 0) {
      welcome.style.display = 'none';
    }

    const msgDiv = document.createElement('div');
    msgDiv.className = 'dayflow-ai-msg user';
    msgDiv.innerHTML = `
      <div class="dayflow-ai-msg-bubble">${escapeHtml(text)}</div>
      <div class="dayflow-ai-msg-time">${getTimeStr()}</div>
    `;
    body.appendChild(msgDiv);
    scrollToBottom();
  }

  // Add Typing Indicator
  function showTyping() {
    const typingDiv = document.createElement('div');
    typingDiv.id = 'dayflowAiTyping';
    typingDiv.className = 'dayflow-ai-typing';
    typingDiv.innerHTML = `
      <div class="dayflow-ai-dot"></div>
      <div class="dayflow-ai-dot"></div>
      <div class="dayflow-ai-dot"></div>
    `;
    body.appendChild(typingDiv);
    scrollToBottom();
  }

  function removeTyping() {
    const typingDiv = document.getElementById('dayflowAiTyping');
    if (typingDiv) typingDiv.remove();
  }

  // Add AI Message
  function addAiMessage(data) {
    removeTyping();

    const msgDiv = document.createElement('div');
    msgDiv.className = 'dayflow-ai-msg ai';

    let contentHtml = formatMarkdown(data.responseText);

    // Mini bar charts
    if (data.barChart) {
      contentHtml += `<div class="dayflow-ai-bar-card">`;
      data.barChart.forEach(b => {
        contentHtml += `
          <div class="dayflow-ai-bar-item">
            <span>${escapeHtml(b.label)}</span>
            <div class="dayflow-ai-bar-track">
              <div class="dayflow-ai-bar-fill" style="width: ${b.val}%; background-color: ${b.color || '#2878FF'};"></div>
            </div>
            <span style="font-weight: 700;">${b.val}%</span>
          </div>
        `;
      });
      contentHtml += `</div>`;
    }

    // Action buttons
    if (data.actions && data.actions.length > 0) {
      contentHtml += `<div class="dayflow-ai-actions">`;
      data.actions.forEach(a => {
        contentHtml += `
          <button class="dayflow-ai-action-btn" onclick="window.location.href='${a.url}'">
            <span class="material-symbols-outlined" style="font-size: 14px;">${a.icon || 'arrow_forward'}</span>
            ${escapeHtml(a.label)}
          </button>
        `;
      });
      contentHtml += `</div>`;
    }

    msgDiv.innerHTML = `
      <div class="dayflow-ai-msg-bubble">${contentHtml}</div>
      <div class="dayflow-ai-msg-time">Dayflow AI • ${getTimeStr()}</div>
    `;
    body.appendChild(msgDiv);
    scrollToBottom();
  }

  // Helper Escape HTML
  function escapeHtml(str) {
    return str.replace(/[&<>"']/g, function(m) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[m];
    });
  }

  // Markdown Formatter (Bold, Bullets, Line Breaks)
  function formatMarkdown(text) {
    if (!text) return '';
    let html = escapeHtml(text);
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/• (.*?)(?=\n|$)/g, '<li>$1</li>');
    html = html.replace(/(<li>.*?<\/li>)/gs, '<ul style="margin: 6px 0; padding-left: 16px; list-style: disc;">$1</ul>');
    html = html.replace(/\n\n/g, '<br/><br/>');
    html = html.replace(/\n/g, '<br/>');
    return html;
  }

  // Send Message Logic
  function sendMessage(text) {
    const query = text || input.value.trim();
    if (!query) return;

    if (!panel.classList.contains('open')) {
      panel.classList.add('open');
    }

    input.value = '';
    addUserMessage(query);
    showTyping();

    const currentPage = window.location.pathname;

    fetch('/api/ai/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: query,
        pageContext: currentPage,
        history: history.slice(-6)
      })
    })
      .then(res => res.json())
      .then(data => {
        history.push({ role: 'user', content: query });
        history.push({ role: 'assistant', content: data.responseText });
        addAiMessage(data);
      })
      .catch(err => {
        removeTyping();
        addAiMessage({
          responseText: "Dayflow AI is currently operating in offline mode. Here are quick shortcuts to review data:",
          actions: [
            { label: "View Attendance", url: "/hr/attendance", icon: "event_available" },
            { label: "Review Leave", url: "/hr/leaves", icon: "holiday_village" },
            { label: "View Directory", url: "/hr/employees", icon: "group" },
            { label: "View Payroll", url: "/hr/payroll", icon: "payments" }
          ]
        });
      });
  }

  sendBtn.addEventListener('click', () => sendMessage());
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  });

  // Global API Hook for Quick Prompts
  window.DayflowAI = {
    sendPrompt: function (promptText) {
      sendMessage(promptText);
    },
    open: function () {
      panel.classList.add('open');
    },
    close: function () {
      panel.classList.remove('open');
    }
  };

})();
