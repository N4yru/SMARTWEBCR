/* ============================================================
   shopflow.js — Lógica compartida de ShopFlow
   Usado por: shopflow-index, shopflow-catalogo, shopflow-producto
   ============================================================ */

// ── STORE CONFIG (editá esto para cada cliente)
const STORE = {
  name:    'ShopFlow',
  email:   'hola@tienda.com',
  whatsapp: '50600000000',
  logo:    '../imagenes/Logo Smart Web CR- sin fondo.png',
};

// ── THEME
const html     = document.documentElement;
const themeBtn = document.getElementById('theme-btn');
const saved    = localStorage.getItem('sf-theme');
let isDark     = saved ? saved === 'dark' : true;

function applyTheme(dark) {
  html.setAttribute('data-theme', dark ? 'dark' : 'light');
  if (themeBtn) themeBtn.textContent = dark ? '🌙' : '☀️';
  localStorage.setItem('sf-theme', dark ? 'dark' : 'light');
}
applyTheme(isDark);
if (themeBtn) themeBtn.addEventListener('click', () => { isDark = !isDark; applyTheme(isDark); });

// ── NAV STICKY
const nav = document.getElementById('main-nav');
window.addEventListener('scroll', () => {
  if (nav) nav.classList.toggle('stuck', window.scrollY > 20);
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

// ── ACTIVE LINK
const currentPage = window.location.pathname.split('/').pop() || 'shopflow-index.html';
document.querySelectorAll('.nav-links a').forEach(a => {
  const href = (a.getAttribute('href') || '').split('/').pop().split('?')[0];
  if (href === currentPage) a.classList.add('active');
});

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
  const target = parseFloat(el.dataset.count);
  const suffix = el.dataset.suffix || '';
  const obs = new IntersectionObserver(([entry]) => {
    if (!entry.isIntersecting) return;
    obs.disconnect();
    let n = 0;
    const step = target / 55;
    const timer = setInterval(() => {
      n = Math.min(n + step, target);
      el.textContent = (Number.isInteger(target) ? Math.round(n) : n.toFixed(1)) + suffix;
      if (n >= target) clearInterval(timer);
    }, 22);
  }, { threshold: 0.5 });
  obs.observe(el);
});

// ── CART (simple counter, reemplazá con tu lógica real)
let cartCount = parseInt(localStorage.getItem('sf-cart') || '0');
function updateCartBadge() {
  const badge = document.getElementById('cart-count');
  if (badge) badge.textContent = cartCount;
}
updateCartBadge();

function addToCart(qty = 1) {
  cartCount += qty;
  localStorage.setItem('sf-cart', cartCount);
  updateCartBadge();
}

// ── SEARCH
const searchBtn = document.getElementById('search-btn');
if (searchBtn) {
  searchBtn.addEventListener('click', () => {
    const q = prompt('¿Qué buscás?');
    if (q) window.location.href = 'shopflow-catalogo.html?q=' + encodeURIComponent(q);
  });
}

// ── FOOTER YEAR
const yearEl = document.getElementById('footer-year');
if (yearEl) yearEl.textContent = new Date().getFullYear();
