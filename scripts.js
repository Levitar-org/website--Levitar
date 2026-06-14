(function () {
  'use strict';

  /* ─── Mobile Menu ─── */
  var hamburger = document.querySelector('.nav-hamburger');
  var mobileMenu = document.querySelector('.mobile-menu');
  var mobileMenuClose = document.querySelector('.mobile-menu-close');
  var mobileLinks = document.querySelectorAll('.mobile-menu-link');

  if (hamburger && mobileMenu) {
    function openMenu() {
      mobileMenu.classList.add('open');
      mobileMenu.setAttribute('aria-hidden', 'false');
      hamburger.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    }
    function closeMenu() {
      mobileMenu.classList.remove('open');
      mobileMenu.setAttribute('aria-hidden', 'true');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
    hamburger.addEventListener('click', openMenu);
    if (mobileMenuClose) mobileMenuClose.addEventListener('click', closeMenu);
    mobileLinks.forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeMenu();
    });
  }

  /* ─── Scroll Reveal ─── */
  var revealElements = document.querySelectorAll('.reveal');
  if (revealElements.length > 0) {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );
    revealElements.forEach(function (el) {
      revealObserver.observe(el);
    });
  }

  /* ─── Active Nav Link on Scroll ─── */
  var sections = document.querySelectorAll('section[id]');
  var navLinks = document.querySelectorAll('.nav-link');
  if (sections.length > 0 && navLinks.length > 0) {
    var navObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var id = entry.target.getAttribute('id');
          navLinks.forEach(function (link) {
            var href = link.getAttribute('href');
            if (href === '#' + id || href.endsWith('#' + id)) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    }, { threshold: 0.2, rootMargin: '-80px 0px 0px 0px' });
    sections.forEach(function (s) { navObserver.observe(s); });
  }

  /* ─── Form Handler ─── */
  var contactForm = document.getElementById('contactForm');
  var formSuccess = document.getElementById('formSuccess');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = document.getElementById('formName').value.trim();
      var business = document.getElementById('formBusiness').value.trim();
      var email = document.getElementById('formEmail').value.trim();
      var phone = document.getElementById('formPhone').value.trim();
      var needs = [];
      document.querySelectorAll('input[name="need"]:checked').forEach(function (cb) { needs.push(cb.nextElementSibling.textContent.trim()); });
      var message = document.getElementById('formMessage').value.trim();
      var subject = encodeURIComponent('Consulta de ' + name + ' — ' + business);
      var body = encodeURIComponent(
        'Nombre: ' + name + '\n' +
        'Negocio: ' + business + '\n' +
        'Email: ' + email + '\n' +
        'Teléfono: ' + phone + '\n' +
        'Necesita: ' + (needs.length > 0 ? needs.join(', ') : 'No especificado') + '\n' +
        'Mensaje: ' + (message || 'Sin mensaje')
      );
      contactForm.style.display = 'none';
      formSuccess.style.display = 'block';
      window.open('mailto:levitarinfo@gmail.com?subject=' + subject + '&body=' + body, '_blank');
    });
  }

  /* ─── Lucide Icons ─── */
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  /* ─── Smooth Scroll ─── */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
})();
