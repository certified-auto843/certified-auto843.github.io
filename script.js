(() => {
  'use strict';
  const header = document.getElementById('header');
  const toggle = document.querySelector('.toggle');
  const nav = document.getElementById('nav');
  function setMenu(open) {
    toggle.setAttribute('aria-expanded', String(open));
    toggle.querySelector('.sr').textContent = open ? 'Close navigation' : 'Open navigation';
    toggle.querySelector('[aria-hidden]').textContent = open ? '×' : '☰';
    nav.classList.toggle('open', open);
  }
  toggle.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
  nav.addEventListener('click', e => { if (e.target.closest('a')) setMenu(false); });
  document.addEventListener('click', e => { if (!header.contains(e.target)) setMenu(false); });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') { setMenu(false); toggle.focus(); }
  });
  const desktop = window.matchMedia('(min-width: 901px)');
  desktop.addEventListener('change', e => { if (e.matches) setMenu(false); });
  const updateHeader = () => header.classList.toggle('scrolled', window.scrollY > 16);
  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();
  document.getElementById('year').textContent = new Date().getFullYear();
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.remove('pending'); entry.target.classList.add('visible'); observer.unobserve(entry.target); }
    }), { threshold: 0.05 });
    document.querySelectorAll('.reveal').forEach(element => { element.classList.add('pending'); observer.observe(element); });
    // Fail-safe: never leave content hidden if observer delivery fails.
    setTimeout(() => document.querySelectorAll('.pending').forEach(element => element.classList.remove('pending')), 4500);
  }
})();
