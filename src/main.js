/* ================================================
   WorkVision Labs — Main JavaScript (v2)
   Multi-page support
   ================================================ */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initHamburger();
  initScrollAnimations();
  initCounterAnimations();
  initContactForm();
  initNotifyForm();
  initBackToTop();
  initSmoothScroll();
});

/* ---- Navbar Scroll Effect ---- */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  // Only do scroll-based styling on homepage
  const isHomePage = window.location.pathname === '/' || window.location.pathname.endsWith('index.html');

  if (isHomePage) {
    const navLinks = document.querySelectorAll('.nav-link:not(.btn-nav)');
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }

      // Update active nav link based on scroll position (home page only)
      let current = '';
      sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
          current = section.getAttribute('id');
        }
      });

      navLinks.forEach(link => {
        const href = link.getAttribute('href');
        // Only manage active state for hash links on home page
        if (href && href.startsWith('#')) {
          link.classList.remove('active');
          if (href === `#${current}`) {
            link.classList.add('active');
          }
        }
      });
    });
  }
}

/* ---- Hamburger Menu ---- */
function initHamburger() {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  if (!hamburger || !navLinks) return;

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
  });

  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('open');
    });
  });

  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
      hamburger.classList.remove('active');
      navLinks.classList.remove('open');
    }
  });
}

/* ---- Scroll Animations (Intersection Observer) ---- */
function initScrollAnimations() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const siblings = entry.target.parentElement.querySelectorAll('.animate-on-scroll');
          let delay = 0;
          siblings.forEach((sibling, i) => {
            if (sibling === entry.target) {
              delay = i * 80;
            }
          });

          setTimeout(() => {
            entry.target.classList.add('visible');
          }, Math.min(delay, 400));

          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px',
    }
  );

  document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
  });
}

/* ---- Counter Animations ---- */
function initCounterAnimations() {
  const counters = document.querySelectorAll('[data-target]');
  if (counters.length === 0) return;

  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = parseInt(entry.target.getAttribute('data-target'));
          animateCounter(entry.target, 0, target, 1500);
          counterObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach(counter => counterObserver.observe(counter));
}

function animateCounter(element, start, end, duration) {
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(start + (end - start) * eased);
    element.textContent = current;

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}

/* ---- Contact Form ---- */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const toast = document.getElementById('toast');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.querySelector('#name').value.trim();
    const email = form.querySelector('#email').value.trim();
    const message = form.querySelector('#message').value.trim();

    if (!name || !email || !message) return;

    if (toast) {
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 4000);
    }

    form.reset();
  });
}

/* ---- Notify Form (Coming Soon) ---- */
function initNotifyForm() {
  const form = document.getElementById('notifyForm');
  if (!form) return;

  const toast = document.getElementById('toast');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (toast) {
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 4000);
    }

    form.reset();
  });
}

/* ---- Back to Top ---- */
function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 600) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ---- Smooth Scroll ---- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href === '#') return;

      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}
