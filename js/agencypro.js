/* ============================================================
   agencypro.js
   ============================================================ */

// ── THEME
const html     = document.documentElement;
const themeBtn = document.getElementById('theme-btn');
const saved    = localStorage.getItem('ap-theme');
let isDark     = saved ? saved === 'dark' : true;

function applyTheme(dark) {
  html.setAttribute('data-theme', dark ? 'dark' : 'light');
  if (themeBtn) themeBtn.textContent = dark ? '🌙' : '☀️';
  localStorage.setItem('ap-theme', dark ? 'dark' : 'light');
}
applyTheme(isDark);
if (themeBtn) themeBtn.addEventListener('click', () => { isDark = !isDark; applyTheme(isDark); });

// ── NAV SCROLL
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 30);
}, { passive: true });

// ── HAMBURGER
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');
if (hamburger) {
  hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
  navLinks.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => navLinks.classList.remove('open'))
  );
}

// ── REVEAL ON SCROLL
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 90);
    }
  });
}, { threshold: 0.08 });
document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

// ── COUNTERS
document.querySelectorAll('[data-count]').forEach(el => {
  const target = parseInt(el.dataset.count);
  const suffix = el.dataset.suffix || '';
  const obs = new IntersectionObserver(([entry]) => {
    if (!entry.isIntersecting) return;
    obs.disconnect();
    let n = 0;
    const step = target / 55;
    const timer = setInterval(() => {
      n = Math.min(n + step, target);
      el.textContent = Math.round(n) + suffix;
      if (n >= target) clearInterval(timer);
    }, 22);
  }, { threshold: 0.5 });
  obs.observe(el);
});

// ── SMOOTH SCROLL
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ── FOOTER YEAR
const yearEl = document.getElementById('footer-year');
if (yearEl) yearEl.textContent = new Date().getFullYear();
