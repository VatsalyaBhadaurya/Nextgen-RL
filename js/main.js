/* ============================================================
   Nextgen Research Lab — MaaKosh · interactions
   ============================================================ */
(function () {
  'use strict';

  /* ---------- footer year ---------- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- nav: scrolled state ---------- */
  var nav = document.getElementById('nav');
  function onScroll() {
    if (window.scrollY > 24) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- mobile menu ---------- */
  var burger = document.getElementById('burger');
  var panel = document.createElement('nav');
  panel.className = 'nav__panel';
  panel.setAttribute('aria-label', 'Mobile');
  panel.innerHTML = [
    ['#problem', 'Problem'], ['#ecosystem', 'Ecosystem'], ['#progress', 'Progress'],
    ['#validation', 'Validation'], ['#team', 'Team'], ['#faq', 'FAQ'], ['#contact', 'Contact']
  ].map(function (l) { return '<a href="' + l[0] + '">' + l[1] + '</a>'; }).join('');
  document.body.appendChild(panel);

  function closeMenu() { panel.classList.remove('open'); burger.classList.remove('open'); burger.setAttribute('aria-expanded', 'false'); }
  burger.addEventListener('click', function () {
    var open = panel.classList.toggle('open');
    burger.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', String(open));
  });
  panel.addEventListener('click', function (e) { if (e.target.tagName === 'A') closeMenu(); });

  /* ---------- scroll reveal ---------- */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in'); });
  }

  /* ---------- animated counters ---------- */
  function animateCount(el) {
    var target = parseFloat(el.getAttribute('data-count'));
    var prefix = el.getAttribute('data-prefix') || '';
    var suffix = el.getAttribute('data-suffix') || '';
    var dur = 1600, start = null;
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
      var val = Math.round(target * eased);
      el.textContent = prefix + val + suffix;
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = prefix + target + suffix;
    }
    requestAnimationFrame(step);
  }

  var counters = document.querySelectorAll('[data-count]');
  if ('IntersectionObserver' in window) {
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { animateCount(entry.target); cio.unobserve(entry.target); }
      });
    }, { threshold: 0.5 });
    counters.forEach(function (el) { cio.observe(el); });
  } else {
    counters.forEach(animateCount);
  }

  /* ---------- subtle parallax on hero devices ---------- */
  var orbit = document.querySelector('.orbit');
  if (orbit && window.matchMedia('(pointer:fine)').matches) {
    var band = orbit.querySelector('.device--band');
    var patch = orbit.querySelector('.device--patch');
    orbit.addEventListener('mousemove', function (e) {
      var r = orbit.getBoundingClientRect();
      var x = (e.clientX - r.left) / r.width - 0.5;
      var y = (e.clientY - r.top) / r.height - 0.5;
      if (band) band.style.transform = 'translate(-58px,-34px) translate(' + (x * 18) + 'px,' + (y * 18) + 'px)';
      if (patch) patch.style.transform = 'translate(96px,118px) translate(' + (x * -26) + 'px,' + (y * -26) + 'px)';
    });
    orbit.addEventListener('mouseleave', function () {
      if (band) band.style.transform = '';
      if (patch) patch.style.transform = '';
    });
  }
})();
