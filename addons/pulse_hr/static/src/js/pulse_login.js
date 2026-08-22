document.addEventListener('DOMContentLoaded', () => {

    const loginForm = document.getElementById('pulseLoginForm');
    const loginInput = document.getElementById('login');
    const passwordInput = document.getElementById('pulsePasswordInput');
    const intendedRoleInput = document.getElementById('intendedRoleInput');
    const loginLabel = document.getElementById('loginLabel');
    const formSubtitle = document.getElementById('formSubtitle');
    const loginInlineError = document.getElementById('loginInlineError');
    const passwordInlineError = document.getElementById('passwordInlineError');
    const submitBtn = document.getElementById('pulseSubmitBtn');
    const btnText = document.getElementById('btnText');
    const btnSpinner = document.getElementById('btnSpinner');

    // 1. Top Interactive Workspace Role Switcher Tabs (Above Welcome Back)
    const tabEmployee = document.getElementById('tabEmployee');
    const tabHr = document.getElementById('tabHr');

    function selectRole(role) {
        if (!intendedRoleInput) return;
        intendedRoleInput.value = role;

        if (role === 'hr') {
            if (tabHr) {
                tabHr.classList.add('selected');
                tabHr.setAttribute('aria-selected', 'true');
            }
            if (tabEmployee) {
                tabEmployee.classList.remove('selected');
                tabEmployee.setAttribute('aria-selected', 'false');
            }
            if (formSubtitle) formSubtitle.innerText = 'Log in to your HR Officer workspace.';
            if (loginLabel) loginLabel.innerText = 'HR Officer Login ID';
            if (loginInput) loginInput.placeholder = 'Enter your HR Officer Login ID';
        } else {
            if (tabEmployee) {
                tabEmployee.classList.add('selected');
                tabEmployee.setAttribute('aria-selected', 'true');
            }
            if (tabHr) {
                tabHr.classList.remove('selected');
                tabHr.setAttribute('aria-selected', 'false');
            }
            if (formSubtitle) formSubtitle.innerText = 'Log in to your Employee workspace.';
            if (loginLabel) loginLabel.innerText = 'Employee Login ID';
            if (loginInput) loginInput.placeholder = 'Enter your Employee Login ID';
        }
    }

    [tabEmployee, tabHr].forEach((tab) => {
        if (!tab) return;

        tab.addEventListener('click', () => {
            const role = tab.getAttribute('data-role');
            selectRole(role);
        });

        tab.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const role = tab.getAttribute('data-role');
                selectRole(role);
            }
        });
    });

    // 2. Password Visibility Toggle
    const toggleBtn = document.getElementById('togglePasswordBtn');
    const eyeIconShow = document.getElementById('eyeIconShow');
    const eyeIconHide = document.getElementById('eyeIconHide');

    if (passwordInput && toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            const isPassword = passwordInput.getAttribute('type') === 'password';
            passwordInput.setAttribute('type', isPassword ? 'text' : 'password');
            if (eyeIconShow && eyeIconHide) {
                eyeIconShow.style.display = isPassword ? 'none' : 'block';
                eyeIconHide.style.display = isPassword ? 'block' : 'none';
            }
        });
    }

    // 3. Custom Inline Form Validation & Loading State
    if (loginForm && loginInput && passwordInput) {
        
        loginInput.addEventListener('input', () => {
            if (loginInput.value.trim() !== '') {
                loginInput.classList.remove('input-error');
                if (loginInlineError) loginInlineError.style.display = 'none';
            }
        });

        passwordInput.addEventListener('input', () => {
            if (passwordInput.value !== '') {
                passwordInput.classList.remove('input-error');
                if (passwordInlineError) passwordInlineError.style.display = 'none';
            }
        });

        loginForm.addEventListener('submit', (e) => {
            let isValid = true;
            const loginVal = loginInput.value.trim();
            const passwordVal = passwordInput.value;

            if (!loginVal) {
                isValid = false;
                loginInput.classList.add('input-error');
                if (loginInlineError) loginInlineError.style.display = 'flex';
            } else {
                loginInput.classList.remove('input-error');
                if (loginInlineError) loginInlineError.style.display = 'none';
            }

            if (!passwordVal) {
                isValid = false;
                passwordInput.classList.add('input-error');
                if (passwordInlineError) passwordInlineError.style.display = 'flex';
            } else {
                passwordInput.classList.remove('input-error');
                if (passwordInlineError) passwordInlineError.style.display = 'none';
            }

            if (!isValid) {
                e.preventDefault();
                e.stopPropagation();
                if (!loginVal) loginInput.focus();
                else if (!passwordVal) passwordInput.focus();
                return false;
            }

            if (submitBtn && btnText && btnSpinner) {
                submitBtn.disabled = true;
                btnText.style.opacity = '0.4';
                btnSpinner.style.display = 'inline-block';
            }
        });
    }

    // 4. Connected Canvas System Nodes (~28 particles)
    const canvas = document.getElementById('pulseLoginCanvas');
    if (canvas && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        const ctx = canvas.getContext('2d');
        let width = (canvas.width = canvas.offsetWidth || window.innerWidth);
        let height = (canvas.height = canvas.offsetHeight || window.innerHeight);

        const particles = [];
        const particleCount = Math.min(28, Math.floor(width / 40));

        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.35,
                vy: (Math.random() - 0.5) * 0.35,
                radius: Math.random() * 1.6 + 1.1,
            });
        }

        function resizeCanvas() {
            if (!canvas) return;
            width = canvas.width = canvas.offsetWidth || window.innerWidth;
            height = canvas.height = canvas.offsetHeight || window.innerHeight;
        }
        window.addEventListener('resize', resizeCanvas);

        function drawNodes() {
            ctx.clearRect(0, 0, width, height);

            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];
                p.x += p.vx;
                p.y += p.vy;

                if (p.x < 0) p.x = width;
                if (p.x > width) p.x = 0;
                if (p.y < 0) p.y = height;
                if (p.y > height) p.y = 0;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(129, 140, 248, 0.5)';
                ctx.fill();

                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const dx = p.x - p2.x;
                    const dy = p.y - p2.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 130) {
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.strokeStyle = `rgba(99, 102, 241, ${0.15 * (1 - dist / 130)})`;
                        ctx.lineWidth = 0.8;
                        ctx.stroke();
                    }
                }
            }
            requestAnimationFrame(drawNodes);
        }
        drawNodes();
    }

    // 5. Desktop Pointer Mouse Parallax Engine for Visual Side Cards
    const wrapAttendance = document.getElementById('loginWrapAttendance');
    const wrapLeave = document.getElementById('loginWrapLeave');
    const wrapId = document.getElementById('loginWrapId');

    let mouseX = 0, mouseY = 0;
    let targetMouseX = 0, targetMouseY = 0;

    if (window.innerWidth >= 1024 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        window.addEventListener('mousemove', (e) => {
            targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
            targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
        });

        function animateParallax() {
            mouseX += (targetMouseX - mouseX) * 0.1;
            mouseY += (targetMouseY - mouseY) * 0.1;

            if (wrapAttendance) {
                wrapAttendance.style.transform = `translate3d(${mouseX * 30}px, ${mouseY * 20}px, 0px)`;
            }
            if (wrapLeave) {
                wrapLeave.style.transform = `translate3d(${mouseX * 20}px, ${mouseY * 30}px, 0px)`;
            }
            if (wrapId) {
                wrapId.style.transform = `translate3d(${mouseX * 35}px, ${mouseY * 18}px, 0px)`;
            }

            requestAnimationFrame(animateParallax);
        }
        requestAnimationFrame(animateParallax);
    }
});
