/* ============================================================
   main.js — Sitio principal de plantillas
   ============================================================ */

// ── LANG TOGGLE
const html    = document.documentElement;
const langBtn = document.getElementById('lang-btn');
let lang = 'es';
langBtn.addEventListener('click', () => {
  lang = lang === 'es' ? 'en' : 'es';
  html.setAttribute('data-lang', lang);
  langBtn.textContent = lang.toUpperCase();
});

// ── THEME TOGGLE
const themeBtn = document.getElementById('theme-btn');
let isDark = localStorage.getItem('tc-theme') !== 'light';

function applyTheme(dark) {
  html.setAttribute('data-theme', dark ? 'dark' : 'light');
  themeBtn.textContent = dark ? '🌙' : '☀️';
  localStorage.setItem('tc-theme', dark ? 'dark' : 'light');
}
applyTheme(isDark);
themeBtn.addEventListener('click', () => { isDark = !isDark; applyTheme(isDark); });

// ── NAV STICKY
const nav = document.getElementById('main-nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('stuck', window.scrollY > 20);
}, { passive: true });

// ── HAMBURGER
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');
hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => navLinks.classList.remove('open'))
);

// ── REVEAL ON SCROLL
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('on'), i * 80);
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

// ── TEMPLATE FILTER
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    document.querySelectorAll('.tpl-card').forEach(card => {
      const match = filter === 'all' || card.dataset.cat === filter;
      card.style.opacity = match ? '1' : '0';
      setTimeout(() => { card.style.display = match ? '' : 'none'; }, match ? 0 : 300);
    });
  });
});

// ── FOOTER YEAR
document.getElementById('footer-year').textContent = new Date().getFullYear();
