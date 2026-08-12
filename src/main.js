// OSTRAN – Company Profile JS

// ============================
// Navbar: scroll behavior + mobile menu
// ============================
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

function updateNavbar() {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
    navbar.classList.add('light-mode');
  } else {
    navbar.classList.remove('scrolled');
    navbar.classList.remove('light-mode');
  }
}

window.addEventListener('scroll', updateNavbar, { passive: true });
updateNavbar();

navToggle.addEventListener('click', () => {
  const isOpen = navMenu.classList.toggle('open');
  navToggle.classList.toggle('open', isOpen);
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

// Close mobile menu when a nav link is clicked
navMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// ============================
// Scroll Reveal
// ============================
function initScrollReveal() {
  const revealTargets = document.querySelectorAll(
    '.problem-card, .pillar-card, .workflow__step, .hardware-card, ' +
    '.dashboard-feature, .comparison-item, .comparison-col, ' +
    '.contact-item, .section__header, .problem-detail__text, ' +
    '.problem-detail__visual, .solution-intro, .dashboard-mockup, ' +
    '.cta-box, .workflow__details'
  );

  revealTargets.forEach((el, i) => {
    el.classList.add('reveal');
    // Stagger siblings within same parent
    const siblings = el.parentElement.querySelectorAll('.reveal');
    siblings.forEach((sib, idx) => {
      if (idx > 0 && idx < 5) {
        sib.classList.add(`reveal-delay-${idx}`);
      }
    });
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// ============================
// Active nav link on scroll
// ============================
function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.navbar__nav a[href^="#"]');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
          });
        }
      });
    },
    { threshold: 0.4 }
  );

  sections.forEach(section => observer.observe(section));
}

// ============================
// Contact form (client-side validation only)
// ============================
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const WA_NUMBER = '6281204845787';

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;

    form.querySelectorAll('[required]').forEach(field => {
      field.classList.remove('error');
      if (!field.value.trim()) {
        field.classList.add('error');
        valid = false;
      }
      if (field.type === 'email' && field.value.trim()) {
        const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRe.test(field.value.trim())) {
          field.classList.add('error');
          valid = false;
        }
      }
    });

    if (!valid) return;

    const name    = (form.querySelector('#name')?.value    || '').trim();
    const company = (form.querySelector('#company')?.value || '').trim();
    const email   = (form.querySelector('#email')?.value   || '').trim();
    const message = (form.querySelector('#message')?.value || '').trim();

    const lines = [
      '🔔 *Pesan dari Website OSTRAN*',
      '',
      `👤 *Nama*: ${name}`,
    ];
    if (company) lines.push(`🏢 *Perusahaan*: ${company}`);
    if (email)   lines.push(`📧 *Email*: ${email}`);
    if (message) {
      lines.push('');
      lines.push(`📝 *Pesan*:`);
      lines.push(message);
    }

    const waText = encodeURIComponent(lines.join('\n'));
    window.open(`https://wa.me/${WA_NUMBER}?text=${waText}`, '_blank', 'noopener,noreferrer');

    // Show success state after redirect
    const success = document.createElement('div');
    success.className = 'form-success';
    success.innerHTML = `
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" style="margin:0 auto 12px">
        <circle cx="24" cy="24" r="22" stroke="#22C55E" stroke-width="2.5"/>
        <path d="M14 24l8 8 12-16" stroke="#22C55E" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <p style="font-size:1.1rem;font-weight:700;color:#16A34A;margin-bottom:8px">Mengarahkan ke WhatsApp…</p>
      <p style="color:#64748B;font-size:0.9rem">Pesan Anda sudah disiapkan di WhatsApp. Tim kami akan segera merespons.</p>
    `;
    form.replaceWith(success);
  });

  // Remove error on input
  form.querySelectorAll('input, textarea').forEach(field => {
    field.addEventListener('input', () => field.classList.remove('error'));
  });
}

// ============================
// Smooth scroll offset for fixed navbar
// ============================
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();
      const offset = parseInt(getComputedStyle(document.documentElement)
        .getPropertyValue('--navbar-h')) || 72;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
}

// ============================
// Back to Top Button
// ============================
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ============================
// Init all
// ============================
document.addEventListener('DOMContentLoaded', () => {
  initScrollReveal();
  initActiveNav();
  initContactForm();
  initSmoothScroll();
  initBackToTop();
});
