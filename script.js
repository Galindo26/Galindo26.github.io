/**
 * Daniel Galindo Aranda — Portfolio Script
 * Theme toggle & interactive behaviors
 */

document.addEventListener('DOMContentLoaded', () => {
  // Theme Toggle
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = themeToggle ? themeToggle.querySelector('.theme-icon') : null;
  const htmlElement = document.documentElement;

  // Retrieve saved theme or use dark as default
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
    if (!themeIcon) return;
    themeIcon.textContent = theme === 'dark' ? '🌙' : '☀️';
  }

  // Smooth scroll offset for fixed navbar
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const navHeight = document.querySelector('.navbar').offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight - 16;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // Reveal elements on scroll using IntersectionObserver
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.card, .project-card, .stat-item, .timeline-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
  });

  // Inject observer animation styles dynamically
  const style = document.createElement('style');
  style.textContent = `
    .visible {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
  `;
  document.head.appendChild(style);
});
