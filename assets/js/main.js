window.SignatureSquare = window.SignatureSquare || {};

document.addEventListener('DOMContentLoaded', function () {

  var header = document.querySelector('.site-header');
  var onScroll = function () {
    if (window.scrollY > 40) header.classList.add('solid');
    else header.classList.remove('solid');
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      links.classList.toggle('open');
      var expanded = links.classList.contains('open');
      toggle.setAttribute('aria-expanded', expanded);
    });
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { links.classList.remove('open'); });
    });
  }

  var revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.18 });

  function observeReveals(root) {
    (root || document).querySelectorAll('.reveal, .bracket').forEach(function (el) {
      revealObserver.observe(el);
    });
  }
  observeReveals();

  function observeMenuNav() {
    var sections = document.querySelectorAll('.menu-category');
    var navLinks = document.querySelectorAll('.menu-nav a');
    if (!sections.length || !navLinks.length) return;
    var navObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          navLinks.forEach(function (l) { l.classList.remove('active'); });
          var match = document.querySelector('.menu-nav a[href="#' + entry.target.id + '"]');
          if (match) match.classList.add('active');
        }
      });
    }, { rootMargin: '-40% 0px -50% 0px' });
    sections.forEach(function (s) { navObserver.observe(s); });
  }
  observeMenuNav();

  // Called by menu-render.js once the menu is fetched and injected into the DOM,
  // since that content doesn't exist yet at DOMContentLoaded time.
  window.SignatureSquare.observeMenu = function () {
    observeReveals(document.getElementById('menuBody'));
    observeMenuNav();
  };

  document.querySelectorAll('video[autoplay]').forEach(function (v) {
    v.play().catch(function () {});
  });
});
