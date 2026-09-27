/**
 * Daniel Galindo Aranda — Portfolio Script
 * Modern, Lightweight, High-Performance Interactions:
 * - Theme toggle (Dark / Light), synced with the pre-paint script in <head>
 * - Mobile navigation & active section highlighting
 * - Ambient node network with cursor attraction, glow and click pulses
 * - Hero 2-DOF planar arm solved with analytic inverse kinematics
 * - Card cursor spotlight, scroll reveal & clipboard utilities
 */

document.addEventListener('DOMContentLoaded', () => {
  const htmlElement = document.documentElement;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // UI strings come from i18n.js; Spanish fallbacks keep the page working without it
  const FALLBACK_UI = {
    themeToLight: 'Activar tema claro',
    themeToDark: 'Activar tema oscuro',
    menuOpen: 'Abrir menú',
    menuClose: 'Cerrar menú',
    copied: '¡Copiado!'
  };
  const t = key => (window.siteI18n && window.siteI18n.t(key)) || FALLBACK_UI[key];

  // ==========================================================================
  // 1. Theme Toggle (Dark / Light)
  // ==========================================================================
  const themeToggle = document.getElementById('theme-toggle');
  const sunIcon = document.getElementById('theme-icon-sun');
  const moonIcon = document.getElementById('theme-icon-moon');
  const getTheme = () => htmlElement.getAttribute('data-theme') || 'dark';

  updateThemeIcon(getTheme());

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const newTheme = getTheme() === 'dark' ? 'light' : 'dark';
      htmlElement.setAttribute('data-theme', newTheme);
      try {
        localStorage.setItem('theme', newTheme);
      } catch (err) {
        // Storage unavailable (private mode): theme still applies for this visit
      }
      updateThemeIcon(newTheme);
    });
  }

  function updateThemeIcon(theme) {
    if (sunIcon && moonIcon) {
      sunIcon.style.display = theme === 'dark' ? 'block' : 'none';
      moonIcon.style.display = theme === 'dark' ? 'none' : 'block';
    }
    if (themeToggle) {
      themeToggle.setAttribute('aria-label', theme === 'dark' ? t('themeToLight') : t('themeToDark'));
    }
  }

  // ==========================================================================
  // 2. Mobile Navigation
  // ==========================================================================
  const navbar = document.querySelector('.navbar');
  const navToggle = document.getElementById('nav-toggle');

  function setNavOpen(open) {
    if (!navbar || !navToggle) return;
    navbar.classList.toggle('nav-open', open);
    navToggle.setAttribute('aria-expanded', String(open));
    navToggle.setAttribute('aria-label', open ? t('menuClose') : t('menuOpen'));
  }

  setNavOpen(false);

  if (navToggle) {
    navToggle.addEventListener('click', () => {
      setNavOpen(!navbar.classList.contains('nav-open'));
    });
  }

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') setNavOpen(false);
  });

  // ==========================================================================
  // 3. Smooth Scroll for Fixed Navbar
  // ==========================================================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        setNavOpen(false);
        const navHeight = navbar ? navbar.offsetHeight : 0;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight - 16;

        window.scrollTo({
          top: targetPosition,
          behavior: prefersReducedMotion ? 'auto' : 'smooth'
        });

        // Move keyboard focus along with the scroll (skip link, focusable targets)
        if (targetElement.hasAttribute('tabindex')) {
          targetElement.focus({ preventScroll: true });
        }
      }
    });
  });

  // ==========================================================================
  // 4. Active Section Highlight
  // ==========================================================================
  const navLinks = Array.from(document.querySelectorAll('.nav-links a[href^="#"]'));
  const linkById = new Map(navLinks.map(a => [a.getAttribute('href').slice(1), a]));

  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      navLinks.forEach(a => {
        a.classList.remove('active');
        a.removeAttribute('aria-current');
      });
      const link = linkById.get(entry.target.id);
      if (link) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'true');
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px' });

  document.querySelectorAll('section[id], footer[id]').forEach(section => sectionObserver.observe(section));

  // ==========================================================================
  // 5. Copy Email to Clipboard
  // ==========================================================================
  const copyBtn = document.getElementById('copy-email-btn');
  const copyText = document.getElementById('copy-text');

  let copyLabel = null;
  let copyTimer = null;

  function resetCopyButton(restoreLabel) {
    clearTimeout(copyTimer);
    if (restoreLabel && copyLabel !== null) copyText.textContent = copyLabel;
    copyLabel = null;
    copyBtn.style.borderColor = '';
    copyBtn.style.color = '';
  }

  if (copyBtn && copyText) {
    copyBtn.addEventListener('click', () => {
      const email = copyBtn.getAttribute('data-email') || 'galindoaranda26@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        if (copyLabel === null) copyLabel = copyText.textContent;
        copyText.textContent = t('copied');
        copyBtn.style.borderColor = 'var(--accent-secondary)';
        copyBtn.style.color = 'var(--accent-secondary)';

        clearTimeout(copyTimer);
        copyTimer = setTimeout(() => resetCopyButton(true), 2200);
      }).catch(err => {
        console.error('Error al copiar correo:', err);
      });
    });
  }

  // Language switch: refresh labels owned by this script (i18n.js already rewrote the rest)
  document.addEventListener('site:langchange', () => {
    updateThemeIcon(getTheme());
    setNavOpen(navbar ? navbar.classList.contains('nav-open') : false);
    if (copyBtn && copyText) resetCopyButton(false);
  });

  // ==========================================================================
  // 6. Card Spotlight Hover Effect (Linear / Vercel style)
  // ==========================================================================
  const spotlightCards = document.querySelectorAll('.card, .stat-item, .about-card, .placeholder-card');
  spotlightCards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
      card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
    });
  });

  // ==========================================================================
  // 7. Scroll Reveal Animations (IntersectionObserver)
  // Uses the `translate` property so card hover `transform` keeps working.
  // ==========================================================================
  if (!prefersReducedMotion) {
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.card, .placeholder-card, .stat-item, .timeline-item, .stack-group').forEach(el => {
      el.classList.add('reveal');
      revealObserver.observe(el);
    });
  }

  // ==========================================================================
  // 8. Shared Palette (read from CSS custom properties)
  // ==========================================================================
  const palette = { accent: '47, 129, 247', text: '139, 148, 158', bg: '9, 12, 16', isDark: true };

  function hexToRgb(value) {
    let hex = value.trim().replace('#', '');
    if (hex.length === 3) hex = hex.split('').map(c => c + c).join('');
    const num = parseInt(hex, 16);
    if (hex.length !== 6 || Number.isNaN(num)) return null;
    return `${(num >> 16) & 255}, ${(num >> 8) & 255}, ${num & 255}`;
  }

  function readPalette() {
    const styles = getComputedStyle(htmlElement);
    palette.accent = hexToRgb(styles.getPropertyValue('--accent-primary')) || palette.accent;
    palette.text = hexToRgb(styles.getPropertyValue('--text-secondary')) || palette.text;
    palette.bg = hexToRgb(styles.getPropertyValue('--bg-primary')) || palette.bg;
    palette.isDark = getTheme() === 'dark';
  }

  readPalette();

  // ==========================================================================
  // 9. Pointer State (shared by the network and the arm)
  // ==========================================================================
  const pointer = { x: -1000, y: -1000, active: false, strength: 0 };

  function trackPointer(e) {
    pointer.x = e.clientX;
    pointer.y = e.clientY;
    pointer.active = true;
  }

  window.addEventListener('pointermove', trackPointer, { passive: true });
  window.addEventListener('pointerdown', e => {
    trackPointer(e);
    spawnPulse(e);
  }, { passive: true });
  window.addEventListener('pointerup', e => {
    if (e.pointerType !== 'mouse') pointer.active = false;
  });
  window.addEventListener('mouseout', e => {
    if (!e.relatedTarget) pointer.active = false;
  });
  window.addEventListener('blur', () => {
    pointer.active = false;
  });

  // ==========================================================================
  // 10. Ambient Node Network
  // ==========================================================================
  const canvas = document.getElementById('ambient-canvas');
  const ctx = canvas ? canvas.getContext('2d') : null;
  let width = 0;
  let height = 0;
  let nodes = [];
  const pulses = [];

  const LINK_DIST = 140;
  const LINK_DIST_SQ = LINK_DIST * LINK_DIST;
  const POINTER_DIST = 190;
  const POINTER_DIST_SQ = POINTER_DIST * POINTER_DIST;
  const POINTER_CORE = 50; // nodes gather around the cursor instead of collapsing onto it

  function createNode() {
    const speed = 0.12 + Math.random() * 0.25;
    const angle = Math.random() * Math.PI * 2;
    const vx = Math.cos(angle) * speed;
    const vy = Math.sin(angle) * speed;
    return {
      x: Math.random() * width,
      y: Math.random() * height,
      bvx: vx,
      bvy: vy,
      vx,
      vy,
      radius: 1.4 + Math.random() * 1.2,
      alpha: 0.45 + Math.random() * 0.4,
      glow: 0
    };
  }

  function resizeNetwork() {
    if (!ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // Density scales with viewport area; existing nodes are kept to avoid a visible jump
    const target = Math.round(Math.min(110, Math.max(30, (width * height) / 11000)));
    while (nodes.length < target) nodes.push(createNode());
    nodes.length = target;
    nodes.forEach(n => {
      if (n.x > width + 20) n.x = Math.random() * width;
      if (n.y > height + 20) n.y = Math.random() * height;
    });
  }

  function spawnPulse(e) {
    if (prefersReducedMotion || !ctx) return;
    if (e.target instanceof Element && e.target.closest('a, button, input, textarea, select')) return;
    pulses.push({ x: e.clientX, y: e.clientY, r: 0, life: 1 });
    if (pulses.length > 6) pulses.shift();
  }

  function stepNetwork() {
    const s = pointer.strength;

    for (let p = pulses.length - 1; p >= 0; p--) {
      pulses[p].r += 6;
      pulses[p].life -= 0.018;
      if (pulses[p].life <= 0) pulses.splice(p, 1);
    }

    for (let i = 0; i < nodes.length; i++) {
      const n = nodes[i];
      let glowTarget = 0;

      // Cursor: soft attraction with a short-range repulsive core
      if (s > 0.01) {
        const dx = pointer.x - n.x;
        const dy = pointer.y - n.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < POINTER_DIST_SQ && d2 > 1) {
          const d = Math.sqrt(d2);
          const proximity = 1 - d / POINTER_DIST;
          let f = proximity * 0.035 * s;
          if (d < POINTER_CORE) f -= (1 - d / POINTER_CORE) * 0.06 * s;
          n.vx += (dx / d) * f;
          n.vy += (dy / d) * f;
          glowTarget = proximity * s;
        }
      }

      // Click pulses: expanding ring that pushes nodes outward
      for (let p = 0; p < pulses.length; p++) {
        const pulse = pulses[p];
        const dx = n.x - pulse.x;
        const dy = n.y - pulse.y;
        const d = Math.sqrt(dx * dx + dy * dy);
        const band = Math.abs(d - pulse.r);
        if (band < 30 && d > 1) {
          const f = (1 - band / 30) * 0.35 * pulse.life;
          n.vx += (dx / d) * f;
          n.vy += (dy / d) * f;
          glowTarget = Math.max(glowTarget, pulse.life);
        }
      }

      // Damping back to the node's own drift velocity
      n.vx += (n.bvx - n.vx) * 0.03;
      n.vy += (n.bvy - n.vy) * 0.03;
      n.x += n.vx;
      n.y += n.vy;
      n.glow += (glowTarget - n.glow) * 0.15;

      // Wrap around screen boundaries with buffer
      if (n.x < -20) n.x = width + 20;
      if (n.x > width + 20) n.x = -20;
      if (n.y < -20) n.y = height + 20;
      if (n.y > height + 20) n.y = -20;
    }
  }

  function drawNetwork() {
    ctx.clearRect(0, 0, width, height);
    const rgb = palette.accent;
    const lineMax = palette.isDark ? 0.25 : 0.2;
    const s = pointer.strength;

    // 1. Links between nearby nodes (brighter around glowing nodes)
    ctx.lineWidth = 0.8;
    for (let i = 0; i < nodes.length; i++) {
      const a = nodes[i];
      for (let j = i + 1; j < nodes.length; j++) {
        const b = nodes[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < LINK_DIST_SQ) {
          const alpha = Math.min(0.6, (1 - Math.sqrt(d2) / LINK_DIST) * lineMax * (1 + (a.glow + b.glow) * 0.8));
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(${rgb}, ${alpha})`;
          ctx.stroke();
        }
      }
    }

    // 2. Links to the cursor (fade in/out with pointer strength)
    if (s > 0.01) {
      const pointerMax = palette.isDark ? 0.5 : 0.4;
      ctx.lineWidth = 1.1;
      for (let i = 0; i < nodes.length; i++) {
        const dx = pointer.x - nodes[i].x;
        const dy = pointer.y - nodes[i].y;
        const d2 = dx * dx + dy * dy;
        if (d2 < POINTER_DIST_SQ) {
          const alpha = (1 - Math.sqrt(d2) / POINTER_DIST) * pointerMax * s;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(pointer.x, pointer.y);
          ctx.strokeStyle = `rgba(${rgb}, ${alpha})`;
          ctx.stroke();
        }
      }

      ctx.beginPath();
      ctx.arc(pointer.x, pointer.y, 3, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${rgb}, ${0.7 * s})`;
      ctx.fill();
    }

    // 3. Pulse rings
    ctx.lineWidth = 1.2;
    for (let p = 0; p < pulses.length; p++) {
      ctx.beginPath();
      ctx.arc(pulses[p].x, pulses[p].y, pulses[p].r, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(${rgb}, ${pulses[p].life * 0.35})`;
      ctx.stroke();
    }

    // 4. Nodes with halo when excited
    const themeFactor = palette.isDark ? 1 : 0.8;
    for (let i = 0; i < nodes.length; i++) {
      const n = nodes[i];
      const r = n.radius * (1 + n.glow * 1.1);
      if (n.glow > 0.05) {
        ctx.beginPath();
        ctx.arc(n.x, n.y, r * 3.2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rgb}, ${n.glow * 0.15})`;
        ctx.fill();
      }
      ctx.beginPath();
      ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${rgb}, ${Math.min(1, n.alpha + n.glow * 0.5) * themeFactor})`;
      ctx.fill();
    }
  }

  // ==========================================================================
  // 11. Hero Planar Arm (2-DOF, analytic inverse kinematics)
  // ==========================================================================
  const armCanvas = document.getElementById('arm-canvas');
  const armCtx = armCanvas ? armCanvas.getContext('2d') : null;
  const telemetry = {
    q1: document.getElementById('tm-q1'),
    q2: document.getElementById('tm-q2'),
    x: document.getElementById('tm-x'),
    y: document.getElementById('tm-y')
  };
  const arm = {
    w: 0, h: 0, baseX: 0, baseY: 0, l1: 0, l2: 0,
    q1: -Math.PI / 2, q2: 0, elbow: 1,
    goalX: 0, goalY: 0, visible: true, frame: 0
  };

  function resizeArm() {
    if (!armCtx) return;
    const rect = armCanvas.getBoundingClientRect();
    arm.w = rect.width;
    arm.h = rect.height;
    if (!arm.w || !arm.h) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    armCanvas.width = arm.w * dpr;
    armCanvas.height = arm.h * dpr;
    armCtx.setTransform(dpr, 0, 0, dpr, 0, 0);

    arm.baseX = arm.w * 0.5;
    arm.baseY = arm.h - 62; // leaves room for the telemetry row below the ground line
    const reach = Math.min(arm.w * 0.48, (arm.h - 62) * 0.85);
    arm.l1 = reach * 0.56;
    arm.l2 = reach * 0.44;
  }

  const wrapAngle = a => Math.atan2(Math.sin(a), Math.cos(a));

  function solveIK(tx, ty, elbow) {
    const dx = tx - arm.baseX;
    const dy = ty - arm.baseY;
    const maxR = arm.l1 + arm.l2 - 0.5;
    const minR = Math.abs(arm.l1 - arm.l2) + 0.5;
    const d = Math.min(maxR, Math.max(minR, Math.hypot(dx, dy)));
    const c2 = (d * d - arm.l1 * arm.l1 - arm.l2 * arm.l2) / (2 * arm.l1 * arm.l2);
    const q2 = elbow * Math.acos(Math.max(-1, Math.min(1, c2)));
    const q1 = Math.atan2(dy, dx) - Math.atan2(arm.l2 * Math.sin(q2), arm.l1 + arm.l2 * Math.cos(q2));
    return { q1, q2 };
  }

  function stepArm(now, instant) {
    const t = now / 1000;
    const reach = arm.l1 + arm.l2;

    // Idle trajectory, blended with the cursor as the pointer becomes active
    let gx = arm.baseX + reach * 0.55 * Math.cos(t * 0.5);
    let gy = arm.baseY - reach * (0.6 + 0.2 * Math.sin(t * 0.8));

    const s = pointer.strength;
    if (s > 0.01) {
      const rect = armCanvas.getBoundingClientRect();
      gx = gx * (1 - s) + (pointer.x - rect.left) * s;
      gy = gy * (1 - s) + (pointer.y - rect.top) * s;
    }
    gy = Math.min(gy, arm.baseY - 12);
    arm.goalX = gx;
    arm.goalY = gy;

    // Keep the elbow configuration (hysteresis) unless the elbow would dip below the base
    let sol = solveIK(gx, gy, arm.elbow);
    if (arm.baseY + arm.l1 * Math.sin(sol.q1) > arm.baseY - 8) {
      const alt = solveIK(gx, gy, -arm.elbow);
      if (Math.sin(alt.q1) < Math.sin(sol.q1)) {
        arm.elbow = -arm.elbow;
        sol = alt;
      }
    }

    // First-order joint filter: smooth motion and animated elbow reconfiguration
    const k = instant ? 1 : 0.1;
    arm.q1 = wrapAngle(arm.q1 + wrapAngle(sol.q1 - arm.q1) * k);
    arm.q2 = wrapAngle(arm.q2 + wrapAngle(sol.q2 - arm.q2) * k);
  }

  function drawArm() {
    const c = armCtx;
    const { baseX, baseY, l1, l2, q1, q2 } = arm;
    const rgb = palette.accent;
    const txt = palette.text;
    const reach = l1 + l2;
    const ex = baseX + l1 * Math.cos(q1);
    const ey = baseY + l1 * Math.sin(q1);
    const fx = ex + l2 * Math.cos(q1 + q2);
    const fy = ey + l2 * Math.sin(q1 + q2);

    c.clearRect(0, 0, arm.w, arm.h);
    c.lineCap = 'round';
    c.lineJoin = 'round';

    // Workspace boundary & ground
    c.setLineDash([3, 6]);
    c.lineWidth = 1;
    c.strokeStyle = `rgba(${txt}, 0.3)`;
    c.beginPath();
    c.arc(baseX, baseY, reach, Math.PI, Math.PI * 2);
    c.stroke();
    c.beginPath();
    c.moveTo(baseX - reach - 10, baseY + 14);
    c.lineTo(baseX + reach + 10, baseY + 14);
    c.stroke();

    // Goal crosshair and error vector
    c.strokeStyle = `rgba(${rgb}, 0.55)`;
    c.beginPath();
    c.moveTo(fx, fy);
    c.lineTo(arm.goalX, arm.goalY);
    c.stroke();
    c.setLineDash([]);
    c.beginPath();
    c.arc(arm.goalX, arm.goalY, 7, 0, Math.PI * 2);
    c.moveTo(arm.goalX - 12, arm.goalY);
    c.lineTo(arm.goalX + 12, arm.goalY);
    c.moveTo(arm.goalX, arm.goalY - 12);
    c.lineTo(arm.goalX, arm.goalY + 12);
    c.stroke();

    // Joint 1 angle indicator
    c.strokeStyle = `rgba(${rgb}, 0.45)`;
    c.beginPath();
    c.arc(baseX, baseY, 30, Math.min(0, q1), Math.max(0, q1));
    c.stroke();

    // Base
    c.beginPath();
    c.moveTo(baseX - 26, baseY + 14);
    c.lineTo(baseX - 14, baseY - 4);
    c.lineTo(baseX + 14, baseY - 4);
    c.lineTo(baseX + 26, baseY + 14);
    c.closePath();
    c.fillStyle = `rgba(${rgb}, 0.12)`;
    c.fill();
    c.strokeStyle = `rgba(${rgb}, 0.7)`;
    c.lineWidth = 1.5;
    c.stroke();

    // Links drawn as hollow capsules (blueprint style)
    function link(x1, y1, x2, y2, w) {
      c.beginPath();
      c.moveTo(x1, y1);
      c.lineTo(x2, y2);
      c.strokeStyle = `rgba(${rgb}, 0.9)`;
      c.lineWidth = w;
      c.stroke();
      c.strokeStyle = `rgb(${palette.bg})`;
      c.lineWidth = w - 4;
      c.stroke();
    }
    link(baseX, baseY, ex, ey, 14);
    link(ex, ey, fx, fy, 11);

    // Gripper: jaws open when far from the goal and close as it arrives
    const a = q1 + q2;
    const err = Math.hypot(arm.goalX - fx, arm.goalY - fy);
    const open = 4 + 6 * Math.min(1, err / 60);
    const px = -Math.sin(a);
    const py = Math.cos(a);
    c.strokeStyle = `rgba(${rgb}, 0.9)`;
    c.lineWidth = 2;
    c.beginPath();
    c.moveTo(fx + px * (open + 3), fy + py * (open + 3));
    c.lineTo(fx - px * (open + 3), fy - py * (open + 3));
    [1, -1].forEach(side => {
      const jx = fx + px * open * side;
      const jy = fy + py * open * side;
      c.moveTo(jx, jy);
      c.lineTo(jx + Math.cos(a) * 14, jy + Math.sin(a) * 14);
    });
    c.stroke();

    // Joints
    [[baseX, baseY, 9], [ex, ey, 8], [fx, fy, 5]].forEach(([x, y, r]) => {
      c.beginPath();
      c.arc(x, y, r, 0, Math.PI * 2);
      c.fillStyle = `rgb(${palette.bg})`;
      c.fill();
      c.strokeStyle = `rgba(${rgb}, 0.95)`;
      c.lineWidth = 2;
      c.stroke();
      c.beginPath();
      c.arc(x, y, 2.2, 0, Math.PI * 2);
      c.fillStyle = `rgb(${rgb})`;
      c.fill();
    });

    // Telemetry readout (y axis up, degrees), throttled
    if (arm.frame++ % 4 === 0 && telemetry.q1) {
      const fmt = v => v.toFixed(1).replace('-', '−');
      telemetry.q1.textContent = `${fmt(-q1 * 180 / Math.PI)}°`;
      telemetry.q2.textContent = `${fmt(-q2 * 180 / Math.PI)}°`;
      telemetry.x.textContent = Math.round(fx - baseX).toString().replace('-', '−');
      telemetry.y.textContent = Math.round(baseY - fy).toString().replace('-', '−');
    }
  }

  const armReady = () => armCtx && arm.visible && arm.w > 0;

  const hero = document.getElementById('hero');
  if (hero && armCtx) {
    new IntersectionObserver(entries => {
      arm.visible = entries[0].isIntersecting;
    }).observe(hero);
  }

  // ==========================================================================
  // 12. Render Loop (paused when the tab is hidden; static when motion is reduced)
  // ==========================================================================
  let rafId = null;

  function frame(now) {
    pointer.strength += ((pointer.active ? 1 : 0) - pointer.strength) * 0.08;
    if (ctx) {
      stepNetwork();
      drawNetwork();
    }
    if (armReady()) {
      stepArm(now, false);
      drawArm();
    }
    rafId = requestAnimationFrame(frame);
  }

  function renderStatic() {
    if (ctx) drawNetwork();
    if (armReady()) {
      stepArm(0, true);
      drawArm();
    }
  }

  function start() {
    if (prefersReducedMotion) {
      renderStatic();
    } else if (rafId === null) {
      rafId = requestAnimationFrame(frame);
    }
  }

  function stop() {
    if (rafId !== null) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
  }

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stop();
    else start();
  });

  new MutationObserver(() => {
    readPalette();
    if (prefersReducedMotion) renderStatic();
  }).observe(htmlElement, { attributes: true, attributeFilter: ['data-theme'] });

  let resizeTimeout = null;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      resizeNetwork();
      resizeArm();
      if (prefersReducedMotion) renderStatic();
    }, 150);
  });

  resizeNetwork();
  resizeArm();
  if (!prefersReducedMotion) {
    // Start the arm already on its idle pose instead of sweeping in from vertical
    if (armReady()) stepArm(performance.now(), true);
  }
  start();
});
