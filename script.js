/**
 * Daniel Galindo Aranda — Portfolio Script
 * Modern, Lightweight, High-Performance Interactions:
 * - Theme toggle (Dark / Light) with SVG state
 * - Ambient particle & network canvas with subtle mouse interaction
 * - Card cursor spotlight illumination
 * - Smooth anchor navigation & clipboard utilities
 */

document.addEventListener('DOMContentLoaded', () => {
  // ==========================================================================
  // 1. Theme Toggle (Dark / Light)
  // ==========================================================================
  const themeToggle = document.getElementById('theme-toggle');
  const sunIcon = document.getElementById('theme-icon-sun');
  const moonIcon = document.getElementById('theme-icon-moon');
  const htmlElement = document.documentElement;

  const savedTheme = localStorage.getItem('theme') || 'dark';
  htmlElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = htmlElement.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      htmlElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      updateThemeIcon(newTheme);
    });
  }

  function updateThemeIcon(theme) {
    if (sunIcon && moonIcon) {
      if (theme === 'dark') {
        sunIcon.style.display = 'block';
        moonIcon.style.display = 'none';
      } else {
        sunIcon.style.display = 'none';
        moonIcon.style.display = 'block';
      }
    }
  }

  // ==========================================================================
  // 2. Smooth Scroll for Fixed Navbar
  // ==========================================================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const navbar = document.querySelector('.navbar');
        const navHeight = navbar ? navbar.offsetHeight : 0;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight - 16;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ==========================================================================
  // 3. Copy Email to Clipboard
  // ==========================================================================
  const copyBtn = document.getElementById('copy-email-btn');
  const copyText = document.getElementById('copy-text');

  if (copyBtn && copyText) {
    copyBtn.addEventListener('click', () => {
      const email = copyBtn.getAttribute('data-email') || 'galindoaranda26@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        const originalText = copyText.textContent;
        copyText.textContent = '¡Copiado!';
        copyBtn.style.borderColor = 'var(--accent-secondary)';
        copyBtn.style.color = 'var(--accent-secondary)';
        
        setTimeout(() => {
          copyText.textContent = originalText;
          copyBtn.style.borderColor = '';
          copyBtn.style.color = '';
        }, 2200);
      }).catch(err => {
        console.error('Error al copiar correo:', err);
      });
    });
  }

  // ==========================================================================
  // 4. Card Spotlight Hover Effect (Linear / Vercel style)
  // ==========================================================================
  const spotlightCards = document.querySelectorAll('.card, .stat-item, .about-card, .placeholder-card');
  spotlightCards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });

  // ==========================================================================
  // 5. Scroll Reveal Animations (IntersectionObserver)
  // ==========================================================================
  const observerOptions = {
    threshold: 0.08,
    rootMargin: '0px 0px -40px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.card, .placeholder-card, .stat-item, .timeline-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(16px)';
    el.style.transition = 'opacity 0.45s cubic-bezier(0.16, 1, 0.3, 1), transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)';
    observer.observe(el);
  });

  const animStyle = document.createElement('style');
  animStyle.textContent = `
    .visible {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
  `;
  document.head.appendChild(animStyle);

  // ==========================================================================
  // 6. Ambient Particle & Network Canvas (Sophisticated & Lightweight)
  // ==========================================================================
  const canvas = document.getElementById('ambient-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = 0;
  let height = 0;
  let dpr = window.devicePixelRatio || 1;
  let animationFrameId = null;

  // Reduced motion preference check
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Mouse tracking state
  const mouse = {
    x: -1000,
    y: -1000,
    active: false,
    idleTimer: null
  };

  window.addEventListener('mousemove', e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    mouse.active = true;

    clearTimeout(mouse.idleTimer);
    mouse.idleTimer = setTimeout(() => {
      mouse.active = false;
    }, 2500);
  });

  window.addEventListener('mouseleave', () => {
    mouse.active = false;
  });

  // Particle definition
  class Particle {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      // Gentle, slow velocity
      this.vx = (Math.random() - 0.5) * 0.35;
      this.vy = (Math.random() - 0.5) * 0.35;
      this.radius = 1.0 + Math.random() * 0.9;
      this.baseAlpha = 0.25 + Math.random() * 0.3;
    }

    update() {
      // Mouse interaction: subtle elastic pull when cursor is nearby
      if (mouse.active) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 140;

        if (dist < maxDist && dist > 1) {
          const force = (1 - dist / maxDist) * 0.015;
          this.x += dx * force;
          this.y += dy * force;
        }
      }

      this.x += this.vx;
      this.y += this.vy;

      // Wrap around screen boundaries with buffer
      if (this.x < -20) this.x = width + 20;
      if (this.x > width + 20) this.x = -20;
      if (this.y < -20) this.y = height + 20;
      if (this.y > height + 20) this.y = -20;
    }

    draw(theme) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      if (theme === 'dark') {
        ctx.fillStyle = `rgba(88, 166, 255, ${this.baseAlpha})`;
      } else {
        ctx.fillStyle = `rgba(9, 105, 218, ${this.baseAlpha * 0.7})`;
      }
      ctx.fill();
    }
  }

  let particles = [];

  function initParticles() {
    dpr = window.devicePixelRatio || 1;
    width = window.innerWidth;
    height = window.innerHeight;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    // Density: balanced between 22 on mobile and 48 on desktop
    const count = Math.min(48, Math.max(20, Math.floor(width / 26)));
    particles = [];
    for (let i = 0; i < count; i++) {
      particles.push(new Particle());
    }
  }

  function render() {
    if (document.hidden) {
      animationFrameId = requestAnimationFrame(render);
      return;
    }

    ctx.clearRect(0, 0, width, height);
    const theme = htmlElement.getAttribute('data-theme') || 'dark';
    const connectionDist = 115;
    const mouseConnectionDist = 135;

    // 1. Draw connections between nearby particles
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < connectionDist) {
          const alpha = (1 - dist / connectionDist) * (theme === 'dark' ? 0.12 : 0.08);
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = theme === 'dark' 
            ? `rgba(56, 139, 253, ${alpha})` 
            : `rgba(9, 105, 218, ${alpha})`;
          ctx.lineWidth = 0.75;
          ctx.stroke();
        }
      }
    }

    // 2. Draw connections to mouse cursor when active
    if (mouse.active) {
      for (let i = 0; i < particles.length; i++) {
        const dx = mouse.x - particles[i].x;
        const dy = mouse.y - particles[i].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouseConnectionDist) {
          const alpha = (1 - dist / mouseConnectionDist) * (theme === 'dark' ? 0.18 : 0.12);
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = theme === 'dark' 
            ? `rgba(88, 166, 255, ${alpha})` 
            : `rgba(9, 105, 218, ${alpha})`;
          ctx.lineWidth = 0.85;
          ctx.stroke();
        }
      }
    }

    // 3. Update and draw each particle
    for (let i = 0; i < particles.length; i++) {
      if (!prefersReducedMotion) {
        particles[i].update();
      }
      particles[i].draw(theme);
    }

    animationFrameId = requestAnimationFrame(render);
  }

  // Handle window resizing with debounce
  let resizeTimeout = null;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      initParticles();
    }, 150);
  });

  // Start simulation
  initParticles();
  render();
});
