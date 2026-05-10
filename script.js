/* ============================================
   BYZHI Bio Link – script.js
   ============================================ */

/* ── 1. NOISE TEXTURE ─────────────────────── */
(function generateNoise() {
  const canvas  = document.getElementById('noise-canvas');
  const ctx     = canvas.getContext('2d');
  let   animId;
  let   frame   = 0;

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function drawNoise() {
    const { width, height } = canvas;
    const imageData = ctx.createImageData(width, height);
    const data      = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
      const value = Math.random() * 255 | 0;
      data[i]     = value;
      data[i + 1] = value;
      data[i + 2] = value;
      data[i + 3] = 255;
    }

    ctx.putImageData(imageData, 0, 0);
  }

  function tick() {
    frame++;
    if (frame % 3 === 0) drawNoise(); // refresh every 3 frames ≈ 20 fps
    animId = requestAnimationFrame(tick);
  }

  resize();
  window.addEventListener('resize', resize);
  tick();
})();


/* ── 2. RIPPLE EFFECT ON BUTTONS ─────────── */
document.querySelectorAll('.link-btn').forEach(btn => {
  btn.addEventListener('pointerdown', function (e) {
    const rect   = this.getBoundingClientRect();
    const size   = Math.max(rect.width, rect.height);
    const x      = e.clientX - rect.left - size / 2;
    const y      = e.clientY - rect.top  - size / 2;

    const ripple       = document.createElement('span');
    ripple.className   = 'ripple';
    ripple.style.cssText = `
      width:  ${size}px;
      height: ${size}px;
      left:   ${x}px;
      top:    ${y}px;
    `;

    this.appendChild(ripple);
    ripple.addEventListener('animationend', () => ripple.remove());
  });
});


/* ── 3. PARALLAX MOUSE GLOW (desktop) ──────── */
(function setupParallax() {
  const orbs = document.querySelectorAll('.orb');

  window.addEventListener('mousemove', (e) => {
    const cx = window.innerWidth  / 2;
    const cy = window.innerHeight / 2;
    const dx = (e.clientX - cx) / cx;  // -1 to 1
    const dy = (e.clientY - cy) / cy;

    orbs.forEach((orb, i) => {
      const factor = (i + 1) * 12;
      orb.style.transform = `translate(${dx * factor}px, ${dy * factor}px)`;
    });
  });
})();


/* ── 4. SCROLL REVEAL (extra safety) ──────── */
(function setupIntersectionObserver() {
  if (!('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.animationPlayState = 'running';
        }
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll('.link-btn').forEach(el => {
    observer.observe(el);
  });
})();


/* ── 5. CLICK ANALYTICS STUB ─────────────── */
document.querySelectorAll('.link-btn').forEach(btn => {
  btn.addEventListener('click', function (e) {
    // Replace href="#" with real URLs before deploying:
    // e.g. "https://www.tiktok.com/@byhahihihi?is_from_webapp=1&sender_device=pc"
    //      "https://youtube.com/@sklbahi?si=QmdyFVBMTalbGRto"
    //      "https://saweria.co/iklilbahy"

    // Visual feedback: brief scale pulse
    this.style.transition = 'transform 0.1s ease';
    this.style.transform  = 'scale(0.96)';
    setTimeout(() => {
      this.style.transform  = '';
      this.style.transition = '';
    }, 120);
  });
});


/* ── 6. AVATAR GLOW PULSE ─────────────────── */
(function avatarPulse() {
  const ring = document.querySelector('.avatar-ring');
  if (!ring) return;

  // Pause spin on hover, resume on leave
  const avatar = document.querySelector('.avatar-wrapper');
  avatar.addEventListener('mouseenter', () => {
    ring.style.animationPlayState = 'paused';
  });
  avatar.addEventListener('mouseleave', () => {
    ring.style.animationPlayState = 'running';
  });
})();
