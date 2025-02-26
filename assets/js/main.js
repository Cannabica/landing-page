/**
* Template Name: QuickStart
* Template URL: https://bootstrapmade.com/quickstart-bootstrap-startup-website-template/
* Updated: Aug 07 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function () {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function (e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Frequently Asked Questions Toggle
   */
  document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle').forEach((faqItem) => {
    faqItem.addEventListener('click', () => {
      faqItem.parentNode.classList.toggle('faq-active');
    });
  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function (swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function (e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

})();

document.addEventListener('DOMContentLoaded', function () {
  // Inicializar Swipers
  const swiperWeb = new Swiper('.carousel-web', {
    loop: true,
    slidesPerView: 1,
    spaceBetween: 30,
    centeredSlides: true,
    centeredSlidesBounds: true, // ayuda a no dejar espacio en blanco
    watchOverflow: true,        // desactiva el loop si hay pocas slides
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      768: {
        // Puedes mostrar 1.2 slides en pantallas grandes
        slidesPerView: 1.2,
      }
    }
  });

  const swiperMobile = new Swiper('.carousel-mobile', {
    loop: true,
    slidesPerView: 1,
    spaceBetween: 20,
    centeredSlides: true,
    centeredSlidesBounds: true, // ayuda a no dejar espacio en blanco
    watchOverflow: true,        // desactiva el loop si hay pocas slides
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      576: {
        slidesPerView: 'auto',
        centeredSlides: true
      }
    }
  });

  // Control de dispositivos
  // (Ahora con radio buttons en vez de .btn-device directas)
  const deviceWebInput = document.getElementById('btn-device-web');
  const deviceMobileInput = document.getElementById('btn-device-mobile');

  function updateDeviceView() {
    if (deviceWebInput.checked) {
      document.querySelector('.carousel-web').style.display = 'block';
      document.querySelector('.carousel-mobile').style.display = 'none';
      swiperWeb.update();
    } else {
      document.querySelector('.carousel-web').style.display = 'none';
      document.querySelector('.carousel-mobile').style.display = 'block';
      swiperMobile.update();
    }
  }
  const deviceSwitch = document.getElementById('deviceSwitch');
  const themeSwitch = document.getElementById('themeSwitch');

  // Evento para cambiar de Web a Móvil
  deviceSwitch.addEventListener('change', function () {
    if (this.checked) {
      // Móvil
      document.querySelector('.carousel-web').style.display = 'none';
      document.querySelector('.carousel-mobile').style.display = 'block';
      swiperMobile.update();
    } else {
      // Web
      document.querySelector('.carousel-web').style.display = 'block';
      document.querySelector('.carousel-mobile').style.display = 'none';
      swiperWeb.update();
    }
  });

  // Evento para cambiar de Claro a Oscuro
  themeSwitch.addEventListener('change', function () {
    const isDark = this.checked;
    document.querySelectorAll('.swiper').forEach(swiper => {
      swiper.classList.remove('theme-light', 'theme-dark');
      swiper.classList.add(isDark ? 'theme-dark' : 'theme-light');
    });
  });

  // Lógica para abrir la imagen en un modal (Bootstrap)
  const modal = new bootstrap.Modal(document.getElementById('imageModal'));
  const modalImage = document.getElementById('modalImage');

  // Escuchar clic en todas las imágenes de Swiper
  document.querySelectorAll('.swiper-slide img').forEach(img => {
    img.style.cursor = 'pointer';
    img.addEventListener('click', () => {
      // Obtener la URL de la imagen
      const src = img.getAttribute('src');
      // Asignarla al modal y mostrarlo
      modalImage.setAttribute('src', src);
      modal.show();
    });
  });

});
