document.addEventListener('DOMContentLoaded', () => {

    // 1. Living Canvas Node Network (~36 active drifting telemetry particles)
    const canvas = document.getElementById('pulseNodeCanvas');
    if (canvas && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        const ctx = canvas.getContext('2d');
        let width = (canvas.width = canvas.offsetWidth || window.innerWidth);
        let height = (canvas.height = canvas.offsetHeight || window.innerHeight);

        const particles = [];
        const particleCount = Math.min(36, Math.floor(width / 35));

        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.85,
                vy: (Math.random() - 0.5) * 0.85,
                radius: Math.random() * 2.0 + 1.2,
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
                ctx.fillStyle = 'rgba(129, 140, 248, 0.75)';
                ctx.fill();

                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const dx = p.x - p2.x;
                    const dy = p.y - p2.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 160) {
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.strokeStyle = `rgba(99, 102, 241, ${0.22 * (1 - dist / 160)})`;
                        ctx.lineWidth = 1.0;
                        ctx.stroke();
                    }
                }
            }
            requestAnimationFrame(drawNodes);
        }
        drawNodes();
    }

    // 2. Responsive Mouse Parallax & Scroll Engine
    const wrapAttendance = document.getElementById('wrapAttendance');
    const wrapLeave = document.getElementById('wrapLeave');
    const wrapId = document.getElementById('wrapId');

    let mouseX = 0, mouseY = 0;
    let targetMouseX = 0, targetMouseY = 0;

    if (window.innerWidth >= 768 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        window.addEventListener('mousemove', (e) => {
            targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
            targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
        });

        function animateParallax() {
            mouseX += (targetMouseX - mouseX) * 0.08;
            mouseY += (targetMouseY - mouseY) * 0.08;

            if (wrapAttendance) {
                wrapAttendance.style.transform = `translate3d(${mouseX * 35}px, ${mouseY * 25}px, 0px)`;
            }
            if (wrapLeave) {
                wrapLeave.style.transform = `translate3d(${mouseX * -28}px, ${mouseY * 35}px, 0px)`;
            }
            if (wrapId) {
                wrapId.style.transform = `translate3d(${mouseX * 40}px, ${mouseY * -20}px, 0px)`;
            }

            requestAnimationFrame(animateParallax);
        }
        requestAnimationFrame(animateParallax);
    }

    // 3. Pulse Waveform Card Glow Pulse Loop
    const cardAttendance = document.getElementById('heroCardAttendance');
    const cardLeave = document.getElementById('heroCardLeave');
    const cardId = document.getElementById('heroCardId');
    const cardsSequence = [cardAttendance, cardLeave, cardId];

    if (cardsSequence[0]) {
        let activeCardIdx = 0;
        setInterval(() => {
            cardsSequence.forEach((c) => c && c.classList.remove('pulse-card-glow'));
            if (cardsSequence[activeCardIdx]) {
                cardsSequence[activeCardIdx].classList.add('pulse-card-glow');
            }
            activeCardIdx = (activeCardIdx + 1) % cardsSequence.length;
        }, 1800);
    }

    // 4. Scroll Reveal Observer
    const revealElements = document.querySelectorAll('[data-reveal]');
    if ('IntersectionObserver' in window) {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -40px 0px',
        };

        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const delay = parseInt(entry.target.getAttribute('data-delay')) || 0;
                    setTimeout(() => {
                        entry.target.classList.add('reveal-active');
                    }, delay);
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        revealElements.forEach((el) => revealObserver.observe(el));
    } else {
        revealElements.forEach((el) => el.classList.add('reveal-active'));
    }

    // 5. Interactive Employee ID Generation Typing Sequence Demo
    const codeChars = document.querySelectorAll('.code-char');
    const statusBadge = document.getElementById('pulseIdStatus');

    if (codeChars.length > 0) {
        let charIndex = 0;
        function resetChars() {
            codeChars.forEach((c) => {
                c.style.opacity = '0';
                c.style.transform = 'translateY(8px)';
            });
            if (statusBadge) statusBadge.style.opacity = '0';
            charIndex = 0;
        }

        function typeNextChar() {
            if (charIndex < codeChars.length) {
                codeChars[charIndex].style.opacity = '1';
                codeChars[charIndex].style.transform = 'translateY(0px)';
                codeChars[charIndex].style.transition = 'all 0.15s ease';
                charIndex++;
                setTimeout(typeNextChar, 90);
            } else {
                if (statusBadge) {
                    statusBadge.style.opacity = '1';
                    statusBadge.style.transition = 'opacity 0.4s ease';
                }
                setTimeout(() => {
                    resetChars();
                    setTimeout(typeNextChar, 500);
                }, 3000);
            }
        }

        resetChars();
        setTimeout(typeNextChar, 600);
    }
});
