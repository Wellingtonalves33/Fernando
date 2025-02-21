let isMenuOpen = false;
      function handleMenu() {
        const menu = document.getElementById('header-menu');
        if (isMenuOpen) {
          menu.classList.add('none');
          menu.classList.remove('flex');
        } else {
          menu.classList.remove('none');
          menu.classList.add('flex');
        }
        isMenuOpen = !isMenuOpen;
      }
      AOS.init({
    duration: 800,
    offset: 100,
    once: true
  });