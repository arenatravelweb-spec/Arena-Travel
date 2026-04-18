/* ─── NAV SCROLL ─────────────────────────────────────── */
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });

/* ─── MOBILE MENU ────────────────────────────────────── */
const navToggle = document.getElementById('nav-toggle');
const navList   = document.getElementById('nav-list');

navToggle.addEventListener('click', () => {
  const open = navList.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', open);
  document.body.style.overflow = open ? 'hidden' : '';
});

navList.querySelectorAll('.nav__link').forEach(link => {
  link.addEventListener('click', () => {
    navList.classList.remove('open');
    document.body.style.overflow = '';
  });
});

/* ─── DESTINATION TABS ───────────────────────────────── */
const tabBtns   = document.querySelectorAll('.tab-btn');
const destCards = document.querySelectorAll('.dest-card');

tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    tabBtns.forEach(b => b.classList.remove('tab-btn--active'));
    btn.classList.add('tab-btn--active');

    const filter = btn.dataset.tab;
    destCards.forEach(card => {
      const match = filter === 'todos' || card.dataset.category === filter;
      card.classList.toggle('hidden', !match);
    });
  });
});

/* ─── COUNTER ANIMATION ──────────────────────────────── */
function animateCounter(el) {
  const target   = parseInt(el.dataset.target, 10);
  const duration = 1800;
  const start    = performance.now();

  function step(now) {
    const elapsed  = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const ease     = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(ease * target).toLocaleString('es-ES');
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

const statNumbers = document.querySelectorAll('.stats__number');
const statsObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      statsObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

statNumbers.forEach(n => statsObs.observe(n));

/* ─── SCROLL REVEAL ──────────────────────────────────── */
const revealEls = document.querySelectorAll(
  '.dest-card, .pkg-card, .exp__item, .nosotros__content, .nosotros__media, .section__header, .stats__item, .contacto__info, .contacto__form'
);

revealEls.forEach((el, i) => {
  el.classList.add('reveal');
  el.style.transitionDelay = `${(i % 4) * 0.1}s`;
});

const revealObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => revealObs.observe(el));

/* ─── TESTIMONIALS SLIDER ────────────────────────────── */
const track    = document.getElementById('testimonios-track');
const cards    = track ? Array.from(track.children) : [];
const dotsWrap = document.getElementById('testi-dots');
const prevBtn  = document.getElementById('testi-prev');
const nextBtn  = document.getElementById('testi-next');

let current  = 0;
let perView  = getPerView();
let autoPlay;

function getPerView() {
  return window.innerWidth <= 768 ? 1 : window.innerWidth <= 1024 ? 2 : 3;
}

function buildDots() {
  if (!dotsWrap) return;
  dotsWrap.innerHTML = '';
  const total = Math.ceil(cards.length / perView);
  for (let i = 0; i < total; i++) {
    const dot = document.createElement('button');
    dot.className = 'testi-dot' + (i === 0 ? ' testi-dot--active' : '');
    dot.setAttribute('aria-label', `Ir a slide ${i + 1}`);
    dot.addEventListener('click', () => goTo(i));
    dotsWrap.appendChild(dot);
  }
}

function updateDots() {
  if (!dotsWrap) return;
  dotsWrap.querySelectorAll('.testi-dot').forEach((d, i) => {
    d.classList.toggle('testi-dot--active', i === current);
  });
}

function goTo(index) {
  const total = Math.ceil(cards.length / perView);
  current = (index + total) % total;

  const cardW   = cards[0].offsetWidth + 24; // gap = 1.5rem = 24px
  track.style.transform = `translateX(-${current * perView * cardW}px)`;
  updateDots();
}

if (prevBtn) prevBtn.addEventListener('click', () => { goTo(current - 1); resetAutoPlay(); });
if (nextBtn) nextBtn.addEventListener('click', () => { goTo(current + 1); resetAutoPlay(); });

function startAutoPlay() {
  autoPlay = setInterval(() => goTo(current + 1), 5000);
}

function resetAutoPlay() {
  clearInterval(autoPlay);
  startAutoPlay();
}

if (cards.length) {
  buildDots();
  startAutoPlay();
}

window.addEventListener('resize', () => {
  const newPer = getPerView();
  if (newPer !== perView) {
    perView  = newPer;
    current  = 0;
    buildDots();
    goTo(0);
  }
}, { passive: true });

/* ─── CONTACT FORM ───────────────────────────────────── */
const form = document.getElementById('contact-form');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    let valid = true;

    form.querySelectorAll('[required]').forEach(field => {
      field.classList.remove('error');
      if (!field.value.trim()) {
        field.classList.add('error');
        valid = false;
      }
    });

    if (!valid) return;

    const btn = form.querySelector('button[type="submit"]');
    btn.textContent = 'Enviando…';
    btn.disabled = true;

    setTimeout(() => {
      btn.textContent = '¡Mensaje enviado! ✓';
      btn.style.background = '#2d9c6e';
      form.reset();
      setTimeout(() => {
        btn.textContent = 'Enviar consulta';
        btn.style.background = '';
        btn.disabled = false;
      }, 4000);
    }, 1200);
  });
}

/* ─── ACTIVE NAV LINK ON SCROLL ──────────────────────── */
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav__link[href^="#"]');

const sectionObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(l => l.classList.remove('active'));
      const active = document.querySelector(`.nav__link[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(s => sectionObs.observe(s));
