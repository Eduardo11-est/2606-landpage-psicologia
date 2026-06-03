// ============================================================
//  NAVBAR — scroll effect + hamburger
// ============================================================
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const isOpen = navLinks.classList.contains('open');
  hamburger.setAttribute('aria-expanded', isOpen);
  // Animate hamburger → X
  const spans = hamburger.querySelectorAll('span');
  if (isOpen) {
    spans[0].style.cssText = 'transform: rotate(45deg) translate(5px, 5px);';
    spans[1].style.cssText = 'opacity: 0; transform: scaleX(0);';
    spans[2].style.cssText = 'transform: rotate(-45deg) translate(5px, -5px);';
  } else {
    spans.forEach(s => s.style.cssText = '');
  }
});

// Close nav on link click (mobile)
navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.querySelectorAll('span').forEach(s => s.style.cssText = '');
  });
});

// ============================================================
//  ANIMATE ON SCROLL (Intersection Observer)
// ============================================================
const animateEls = document.querySelectorAll('[data-animate]');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const delay = parseInt(entry.target.dataset.delay || 0);
      setTimeout(() => entry.target.classList.add('in-view'), delay);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

animateEls.forEach(el => observer.observe(el));

// ============================================================
//  COUNTER ANIMATION (hero stats)
// ============================================================
function animateCounter(el, target, duration = 1800) {
  let start = null;
  const startValue = 0;

  function step(timestamp) {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    el.textContent = Math.floor(eased * (target - startValue) + startValue);
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target;
  }
  requestAnimationFrame(step);
}

const statsSection = document.querySelector('.hero__stats');
let statsStarted = false;

const statsObserver = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting && !statsStarted) {
    statsStarted = true;
    document.querySelectorAll('.stat__number').forEach(el => {
      animateCounter(el, parseInt(el.dataset.target));
    });
  }
}, { threshold: 0.5 });

if (statsSection) statsObserver.observe(statsSection);

// ============================================================
//  CONTACT FORM
// ============================================================
const form = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');
const submitBtn = document.getElementById('btn-form-submit');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const nome = form.querySelector('#nome').value.trim();
  const email = form.querySelector('#email').value.trim();

  if (!nome) {
    shakeField(form.querySelector('#nome'));
    return;
  }
  if (!email || !isValidEmail(email)) {
    shakeField(form.querySelector('#email'));
    return;
  }

  // Simulate sending (replace with real API call)
  submitBtn.disabled = true;
  submitBtn.querySelector('.btn-text').textContent = 'Enviando…';
  submitBtn.querySelector('.btn-icon').textContent = '⏳';

  setTimeout(() => {
    submitBtn.disabled = false;
    submitBtn.querySelector('.btn-text').textContent = 'Enviar Mensagem';
    submitBtn.querySelector('.btn-icon').textContent = '→';
    formSuccess.classList.add('visible');
    form.reset();
    setTimeout(() => formSuccess.classList.remove('visible'), 6000);
  }, 1400);
});

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function shakeField(field) {
  field.style.borderColor = '#f87171';
  field.style.animation = 'none';
  field.offsetHeight; // reflow
  field.style.animation = 'shake 0.4s ease';
  field.addEventListener('animationend', () => {
    field.style.animation = '';
    field.style.borderColor = '';
  }, { once: true });
}

// Inject shake keyframe dynamically
const shakeStyle = document.createElement('style');
shakeStyle.textContent = `
  @keyframes shake {
    0%,100% { transform: translateX(0); }
    20%,60%  { transform: translateX(-6px); }
    40%,80%  { transform: translateX(6px); }
  }
`;
document.head.appendChild(shakeStyle);

// ============================================================
//  SMOOTH ACTIVE NAV LINK
// ============================================================
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-link:not(.nav-link--cta)');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navItems.forEach(link => {
        link.classList.toggle(
          'active-nav',
          link.getAttribute('href') === `#${id}`
        );
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));

// Inject active nav style
const activeStyle = document.createElement('style');
activeStyle.textContent = `
  .nav-link.active-nav {
    color: var(--clr-primary) !important;
    background: rgba(167,139,250,0.08) !important;
  }
`;
document.head.appendChild(activeStyle);

// ============================================================
//  PARALLAX subtle on hero
// ============================================================
const shapes = document.querySelectorAll('.shape');
document.addEventListener('mousemove', (e) => {
  const cx = window.innerWidth / 2;
  const cy = window.innerHeight / 2;
  const dx = (e.clientX - cx) / cx;
  const dy = (e.clientY - cy) / cy;

  shapes.forEach((shape, i) => {
    const factor = (i + 1) * 8;
    shape.style.transform = `translate(${dx * factor}px, ${dy * factor}px)`;
  });
});


