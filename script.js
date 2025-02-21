
      AOS.init({
    duration: 800,
    offset: 100,
    once: true
  });
  document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menuToggle');
    const mobileNav = document.getElementById('mobileNav');
    const menuItems = document.querySelectorAll('.menu-item');

    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('active');
      mobileNav.classList.toggle('active');
      document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
    });

    menuItems.forEach((item, index) => {
      item.style.opacity = '0';
      item.style.transform = 'translateX(20px)';
    
      item.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        mobileNav.classList.remove('active');
        document.body.style.overflow = '';
      });
    });

    function animateMenuItems() {
      menuItems.forEach((item, index) => {
        setTimeout(() => {
          item.style.transition = 'all 0.4s ease';
          item.style.opacity = '1';
          item.style.transform = 'translateX(0)';
        }, 100 * index);
      });
    }

    mobileNav.addEventListener('transitionend', (e) => {
      if (e.propertyName === 'right' && mobileNav.classList.contains('active')) {
        animateMenuItems();
      }
    });
      // Initialize Intersection Observer
      const observerOptions = {
        root: null,
        threshold: 0.1,
        rootMargin: "0px"
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          } else {
            entry.target.classList.remove('animate-in');
          }
        });
      }, observerOptions);

      // Observe all sections
      document.querySelectorAll('section').forEach(section => {
        section.classList.add('scroll-animation');
        observer.observe(section);
      });
    });
  
  const logoObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const logo = entry.target;
      const background = getBackgroundColor(logo);
      const isDark = isBackgroundDark(background);
      
      if (isDark) {
        logo.classList.add('logo-light-mode');
        logo.classList.remove('logo-dark-mode');
      } else {
        logo.classList.add('logo-dark-mode');
        logo.classList.remove('logo-light-mode');
      }
    });
  }, { threshold: 0.5 });
  
  document.addEventListener('DOMContentLoaded', () => {
    const logo = document.querySelector('#animated-logo');
    const logoWrapper = document.createElement('div');
    logoWrapper.className = 'logo-wrapper';
    logo.parentNode.insertBefore(logoWrapper, logo);
    logoWrapper.appendChild(logo);
    
    logoObserver.observe(logoWrapper);
  });
  
  function getBackgroundColor(element) {
    return window.getComputedStyle(element.parentElement).backgroundColor;
  }
  
  function isBackgroundDark(color) {
    const rgb = color.match(/\d+/g);
    if (!rgb) return false;
    const brightness = (rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000;
    return brightness < 128;
  }
  document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.carousel-track');
    const slides = document.querySelectorAll('.carousel-slide');
    const nextBtn = document.querySelector('.carousel-btn.next');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const dotsContainer = document.querySelector('.carousel-dots');
  
    let currentIndex = 0;
    const slideWidth = slides[0].offsetWidth + 32; // Including margin
  
    // Create dots
    slides.forEach((_, index) => {
      const dot = document.createElement('div');
      dot.classList.add('dot');
      if (index === 0) dot.classList.add('active');
      dot.addEventListener('click', () => goToSlide(index));
      dotsContainer.appendChild(dot);
    });
  
    const dots = document.querySelectorAll('.dot');
  
    function updateDots() {
      dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
      });
    }
  
    function goToSlide(index) {
      currentIndex = index;
      track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
      updateDots();
      updateSlides();
    }
  
    function updateSlides() {
      slides.forEach((slide, index) => {
        slide.classList.toggle('active', index === currentIndex);
        const offset = index - currentIndex;
        const rotation = offset * 45;
        slide.style.transform = index === currentIndex 
          ? 'rotateY(0) scale(1)' 
          : `rotateY(${rotation}deg) scale(0.9)`;
      });
    }
  
    nextBtn.addEventListener('click', () => {
      if (currentIndex < slides.length - 1) {
        currentIndex++;
        goToSlide(currentIndex);
      }
    });
  
    prevBtn.addEventListener('click', () => {
      if (currentIndex > 0) {
        currentIndex--;
        goToSlide(currentIndex);
      }
    });
  
    // Auto-play with smooth item-by-item transition
    const autoPlay = setInterval(() => {
      if (currentIndex < slides.length - 1) {
        currentIndex++;
      } else {
        currentIndex = 0;
      }
      goToSlide(currentIndex);
    }, 5000);
  
    // Pause auto-play on hover
    track.addEventListener('mouseenter', () => clearInterval(autoPlay));
  });  