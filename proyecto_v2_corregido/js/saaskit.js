/* ============================================================
   saaskit.js
   ============================================================ */

// ── DYNAMIC CONFIG LOADER
// Carga configuración desde el editor o JSON externo
async function loadDynamicConfig() {
  try {
    // Primero intentar cargar de localStorage (desde el editor)
    const stored = localStorage.getItem('saaskit-config');
    let config = stored ? JSON.parse(stored) : null;

    // Si no hay config almacenada, cargar del JSON
    if (!config) {
      const response = await fetch('../config/saaskit-config.json');
      config = await response.json();
    }

    applyConfig(config);
  } catch (error) {
    console.log('Usando configuración por defecto (sin config JSON)');
  }
}

function applyConfig(config) {
  // General
  if (config.general) {
    document.title = `${config.general.productName || 'FlowApp'} — ${config.general.tagline || ''}`;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.content = config.general.description || '';

    // Logo
    document.querySelectorAll('.nav-logo-mark').forEach(el => {
      if (config.general.logoEmoji) el.textContent = config.general.logoEmoji;
    });
    document.querySelectorAll('.nav-logo').forEach(el => {
      const nameEl = el.childNodes[el.childNodes.length - 1];
      if (nameEl && config.general.productName) {
        nameEl.textContent = ' ' + config.general.productName;
      }
    });
  }

  // Hero
  if (config.hero) {
    const badge = document.querySelector('.hero-announce');
    if (badge && config.hero.badgeText) {
      badge.innerHTML = `
        <span>${config.hero.badgeText || ''}</span>
        <span class="announce-badge">${config.hero.badgeVersion || ''}</span>
        ${config.hero.badgeLink || ''}
      `;
    }

    const h1 = document.querySelector('.hero-h1');
    if (h1 && config.hero.title) {
      const parts = config.hero.title.split(config.hero.titleHighlight || '');
      if (parts.length === 2) {
        h1.innerHTML = `
          El SaaS que<br>
          <span class="gradient-text">${config.hero.titleHighlight}</span><br>
          <em>${config.hero.titleEmphasis || ''}</em>
        `;
      } else {
        h1.textContent = config.hero.title;
      }
    }

    const heroP = document.querySelector('.hero-p');
    if (heroP) heroP.textContent = config.hero.description || heroP.textContent;

    const heroBtns = document.querySelectorAll('.hero-btns .btn');
    if (heroBtns[0] && config.hero.ctaPrimary) heroBtns[0].textContent = config.hero.ctaPrimary;
    if (heroBtns[1] && config.hero.ctaSecondary) heroBtns[1].textContent = config.hero.ctaSecondary;

    const proofText = document.querySelector('.proof-text');
    if (proofText && config.hero.proofText) {
      proofText.innerHTML = `<span class="proof-stars">${config.hero.proofStars || '★★★★★'}</span><strong>${config.hero.proofText}</strong>`;
    }
  }

  // Features
  if (config.features) {
    const featTitle = document.querySelector('.features-header .section-title');
    if (featTitle && config.features.title) {
      featTitle.innerHTML = config.features.title.replace(/,/, ',<br><em>') + '</em>';
    }
    const featSub = document.querySelector('.features-header .section-sub');
    if (featSub) featSub.textContent = config.features.subtitle || featSub.textContent;

    // Feature items
    if (config.features.items) {
      document.querySelectorAll('.feat-card').forEach((card, i) => {
        const item = config.features.items[i];
        if (item) {
          const ico = card.querySelector('.feat-ico');
          if (ico && item.icon) ico.textContent = item.icon;
          const h3 = card.querySelector('h3');
          if (h3 && item.title) h3.textContent = item.title;
          const p = card.querySelector('p');
          if (p && item.description) p.textContent = item.description;
        }
      });
    }
  }

  // Pricing
  if (config.pricing) {
    const priceTitle = document.querySelector('.pricing-header .section-title');
    if (priceTitle && config.pricing.title) {
      priceTitle.innerHTML = config.pricing.title.replace(/transparentes/, '<em>transparentes</em>');
    }
    const priceSub = document.querySelector('.pricing-header .section-sub');
    if (priceSub) priceSub.textContent = config.pricing.subtitle || priceSub.textContent;

    // Planes
    if (config.pricing.plans) {
      document.querySelectorAll('.price-card').forEach((card, i) => {
        const plan = config.pricing.plans[i];
        if (plan) {
          const name = card.querySelector('.price-plan');
          if (name) name.textContent = plan.name || name.textContent;

          const monthly = card.querySelector('[data-monthly]');
          const annual = card.querySelector('[data-annual]');
          if (monthly) {
            monthly.dataset.monthly = plan.priceMonthly || '0';
            monthly.dataset.annual = plan.priceAnnual || '0';
            monthly.textContent = plan.priceMonthly || '0';
          }

          const desc = card.querySelector('.price-desc');
          if (desc) desc.textContent = plan.description || desc.textContent;

          const featured = card.querySelector('.featured-label');
          if (featured) {
            featured.style.display = plan.featured ? 'block' : 'none';
            if (plan.featuredLabel) featured.textContent = plan.featuredLabel;
          }

          const cta = card.querySelector('.btn');
          if (cta) cta.textContent = plan.cta || cta.textContent;
        }
      });
    }

    const trialText = document.querySelector('.pricing .section-sub + p');
    if (trialText) trialText.textContent = config.pricing.trialText || trialText.textContent;
  }

  // Testimonials
  if (config.testimonials) {
    const testiTitle = document.querySelector('.testi-header .section-title');
    if (testiTitle && config.testimonials.title) {
      testiTitle.innerHTML = config.testimonials.title.replace(/FlowApp/, '<em>FlowApp</em>');
    }
    const testiSub = document.querySelector('.testi-header .section-sub');
    if (testiSub) testiSub.textContent = config.testimonials.subtitle || testiSub.textContent;

    // Testimonio items
    if (config.testimonials.items) {
      document.querySelectorAll('.testi-card').forEach((card, i) => {
        const item = config.testimonials.items[i];
        if (item) {
          const stars = card.querySelector('.testi-stars');
          if (stars) stars.textContent = item.stars || '★★★★★';
          const text = card.querySelector('.testi-text');
          if (text) text.textContent = `"${item.text || ''}"`;
          const author = card.querySelector('.testi-info strong');
          if (author) author.textContent = item.author || author.textContent;
          const role = card.querySelector('.testi-info span');
          if (role) role.textContent = item.role || role.textContent;
          const av = card.querySelector('.testi-av');
          if (av && item.initials) av.textContent = item.initials;
        }
      });
    }
  }

  // FAQ
  if (config.faq) {
    const faqTitle = document.querySelector('.faq .section-title');
    if (faqTitle && config.faq.title) {
      faqTitle.innerHTML = config.faq.title.replace(/frecuentes/, '<em>frecuentes</em>');
    }
    const faqSub = document.querySelector('.faq .section-sub');
    if (faqSub) faqSub.textContent = config.faq.subtitle || faqSub.textContent;

    // FAQ items
    if (config.faq.items) {
      document.querySelectorAll('.faq-item').forEach((item, i) => {
        const faq = config.faq.items[i];
        if (faq) {
          const question = item.querySelector('.faq-question');
          if (question && faq.question) {
            question.childNodes[0].textContent = faq.question;
          }
          const answer = item.querySelector('.faq-answer');
          if (answer) answer.textContent = faq.answer || '';
        }
      });
    }
  }

  // CTA
  if (config.cta) {
    const tag = document.querySelector('.cta-box .tag');
    if (tag) tag.textContent = config.cta.tagline || tag.textContent;

    const ctaH2 = document.querySelector('.cta-box h2');
    if (ctaH2 && config.cta.title) {
      ctaH2.innerHTML = config.cta.title.replace(/excusas/, '<em>Sin excusas.</em>');
    }

    const ctaP = document.querySelector('.cta-box p');
    if (ctaP) ctaP.textContent = config.cta.subtitle || ctaP.textContent;

    const ctaBtns = document.querySelectorAll('.cta-box .btn');
    if (ctaBtns[0] && config.cta.ctaPrimary) ctaBtns[0].textContent = config.cta.ctaPrimary;
    if (ctaBtns[1] && config.cta.ctaSecondary) ctaBtns[1].textContent = config.cta.ctaSecondary;

    const note = document.querySelector('.cta-note');
    if (note) note.textContent = config.cta.note || note.textContent;
  }

  // Footer
  if (config.footer) {
    const footerDesc = document.querySelector('.footer-brand p');
    if (footerDesc) footerDesc.textContent = config.footer.description || footerDesc.textContent;

    const footerName = document.querySelector('.footer-brand-name');
    if (footerName && config.general?.productName) {
      footerName.innerHTML = `<div class="nav-logo-mark">${config.general.logoEmoji || '⚡'}</div> ${config.general.productName}`;
    }

    const footerCopyright = document.querySelector('.footer-bottom span');
    if (footerCopyright && config.footer.copyright) {
      footerCopyright.innerHTML = `© <span id="footer-year"></span> ${config.footer.copyright}`;
    }

    // Footer links
    if (config.footer.links) {
      const cols = document.querySelectorAll('.footer-col ul');
      if (config.footer.links.producto && cols[0]) {
        cols[0].innerHTML = config.footer.links.producto.map(l => `<li><a href="#">${l}</a></li>`).join('');
      }
      if (config.footer.links.empresa && cols[1]) {
        cols[1].innerHTML = config.footer.links.empresa.map(l => `<li><a href="#">${l}</a></li>`).join('');
      }
      if (config.footer.links.soporte && cols[2]) {
        cols[2].innerHTML = config.footer.links.soporte.map(l => `<a href="${l.includes('@') ? 'mailto:' + l : '#'}">${l}</a>`).join('');
      }
    }
  }

  // Marquee (requires special handling due to duplication)
  if (config.marquee && config.marquee.length > 0) {
    const marqueeTracks = document.querySelectorAll('.marquee-track');
    const marqueeItems = config.marquee.map(item =>
      `<span class="marquee-item"><span class="dot"></span>${item}</span>`
    ).join('');
    const marqueeContent = marqueeItems + marqueeItems; // Duplicate for seamless loop

    marqueeTracks.forEach(track => {
      track.innerHTML = marqueeContent;
    });
  }
}

// ── THEME
const html     = document.documentElement;
const themeBtn = document.getElementById('theme-btn');
const saved    = localStorage.getItem('sk-theme');
let isDark     = saved ? saved === 'dark' : true;

function applyTheme(dark) {
  html.setAttribute('data-theme', dark ? 'dark' : 'light');
  if (themeBtn) themeBtn.textContent = dark ? '🌙' : '☀️';
  localStorage.setItem('sk-theme', dark ? 'dark' : 'light');
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
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
    }
  });
}, { threshold: 0.08 });
document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

// ── PRICING TOGGLE
const ptBtns = document.querySelectorAll('.ptoggle-btn');
const priceNums = document.querySelectorAll('.price-num[data-monthly]');
ptBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    ptBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const annual = btn.dataset.period === 'annual';
    priceNums.forEach(p => {
      p.textContent = annual ? p.dataset.annual : p.dataset.monthly;
    });
  });
});

// ── FAQ ACCORDION
document.querySelectorAll('.faq-item').forEach(item => {
  item.querySelector('.faq-question').addEventListener('click', () => {
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
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

// ── LOAD DYNAMIC CONFIG (must be last)
loadDynamicConfig();
