(() => {
  const header = document.querySelector('[data-header]');
  const navToggle = document.querySelector('[data-nav-toggle]');
  const navMenu = document.querySelector('[data-nav-menu]');
  const year = document.querySelector('[data-year]');

  if (year) {
    year.textContent = String(new Date().getFullYear());
  }

  const setHeaderState = () => {
    if (!header) return;
    header.classList.toggle('is-scrolled', window.scrollY > 12);
  };

  const closeMenu = () => {
    if (!navToggle || !navMenu) return;
    navMenu.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  };

  const toggleMenu = () => {
    if (!navToggle || !navMenu) return;
    const isOpen = navMenu.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  };

  setHeaderState();
  window.addEventListener('scroll', setHeaderState, { passive: true });
  window.addEventListener('resize', () => {
    if (window.innerWidth > 1200) closeMenu();
  }, { passive: true });

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', toggleMenu);

    navMenu.addEventListener('click', (event) => {
      if (event.target instanceof HTMLAnchorElement) {
        closeMenu();
      }
    });

    document.addEventListener('click', (event) => {
      if (!navMenu.classList.contains('is-open')) return;
      const target = event.target;
      if (!(target instanceof Node)) return;
      if (navMenu.contains(target) || navToggle.contains(target)) return;
      closeMenu();
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') closeMenu();
    });
  }
})();
