(function () {
  ("use strict");
  // Selector Helper Function
  const select = (el, all = false) => {
    el = el.trim();
    return all ? document.querySelectorAll(el) : document.querySelector(el);
  };

  // Event Listener Helper Function
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all);
    if (selectEl) {
      all
        ? selectEl.forEach((e) => e.addEventListener(type, listener))
        : selectEl.addEventListener(type, listener);
    }
  };

  // Scroll Event Listener Helper Function
  const onScroll = (el, listener) => {
    el.addEventListener("scroll", listener);
  };

  // Scroll With Header Offset
  const scrollto = (el) => {
    const header = select("#header");
    let offset = header.offsetHeight;
    let elPos = select(el).offsetTop;

    scrollTo({
      top: elPos - offset + 10,
      behavior: "smooth",
    });
  };

  // Preloader
  const preloader = select("#preloader");
  window.addEventListener("load", () => {
    preloader.style.display = "none";
    document.body.style.overflow = "auto";
  });

  // Back To Top Button
  const backToTopBtn = select(".back-to-top");
  if (backToTopBtn) {
    const showTopButton = () =>
      scrollY > 100
        ? backToTopBtn.classList.add("show")
        : backToTopBtn.classList.remove("show");
    const backToTop = () =>
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    window.addEventListener("load", backToTopBtn);
    onScroll(document, showTopButton);
    on("click", ".back-to-top", backToTop);
  }

  // Change Theme
  const modeToggler = select(".mode-toggler");
  if (modeToggler) {
    const updateIcon = () => {
      select(".mode-toggler .mode-icon", true).forEach((icon) =>
        icon.classList.remove("active")
      );
      select(`#${document.body.dataset.theme}`).classList.add("active");
    };
    const changeTheme = () => {
      document.body.dataset.theme === "light"
        ? (document.body.dataset.theme = "dark")
        : (document.body.dataset.theme = "light");
      updateIcon();
      localStorage.setItem("theme", document.body.dataset.theme);
    };
    on("click", ".mode-toggler", changeTheme);
    window.addEventListener("load", () => {
      if (localStorage.theme) {
        document.body.dataset.theme = localStorage.theme;
        updateIcon();
      }
    });
  }

  // Toggle navbar-scrolled Class when Page Scrolls
  const navbar = select("#navbar");
  if (navbar) {
    const navbarScrolled = () => {
      scrollY > 100
        ? navbar.classList.add("navbar-scrolled")
        : navbar.classList.remove("navbar-scrolled");
    };
    window.addEventListener("load", navbarScrolled);
    onScroll(document, navbarScrolled);
  }

  // Update Active State of Navbar Links on Scroll
  const navbarLinks = select(".navbar .scrollto", true);
  if (navbarLinks) {
    const updateActiveLink = () => {
      navbarLinks.forEach((navLink) => {
        if (!navLink.hash) return;
        let section = select(navLink.hash);
        if (!section) return;
        let header = select("#header");
        if (
          scrollY >= section.offsetTop - header.offsetHeight &&
          scrollY <=
            section.offsetTop + section.offsetHeight - header.offsetHeight
        ) {
          navLink.classList.add("active");
        } else {
          navLink.classList.remove("active");
        }
      });
    };
    window.addEventListener("load", updateActiveLink);
    onScroll(document, updateActiveLink);
  }

  // Scroll to Section with Header Offset when Click on Links
  on(
    "click",
    ".scrollto",
    function (e) {
      if (select(this.hash)) {
        e.preventDefault();
        scrollto(this.hash);
      }
    },
    true
  );

  // Scroll to Section on Page Load
  window.addEventListener("load", () => {
    if (location.hash) {
      if (select(location.hash)) {
        scrollto(location.hash);
      }
    }
  });
  // Set Hero Section Height
  const resizeHero = () => {
    const header = select("#header"),
      heroSection = select("#hero");
    heroSection.style.minHeight = `${
      window.innerHeight - header.offsetHeight
    }px`;
  };
  window.addEventListener("load", resizeHero);

  // Skills Animation
  const skillsSection = select("#skills");
  if (skillsSection) {
    const skillsProgress = select("#skills .skill .progress-bar", true);
    let isShow = false;
    const showProgress = () => {
      if (
        scrollY >= skillsSection.offsetTop - skillsSection.offsetHeight / 2 &&
        !isShow
      ) {
        skillsProgress.forEach(
          (progress) => (progress.style.height = progress.dataset.progress)
        );
        isShow = true;
      }
    };
    window.addEventListener("load", showProgress);
    onScroll(document, showProgress);
  }
  // Initialize Glightbox
  const lightbox = GLightbox();

  // Initialize SWIPER
  const swiper = new Swiper(".projects", {
    slidesPerView: 3,
    spaceBetween: 20,
    loop: true,
    effect: "coverflow",
    coverflowEffect: {
      rotate: 0,
      scale: 0.85,
      depth: 50,
    },
    pagination: {
      el: ".swiper-pagination",
      dynamicBullets: true,
      dynamicMainBullets: 3,
      clickbale: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    keyboard: {
      enabled: true,
      onlyInViewport: false,
    },

    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      520: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 2,
      },
      992: {
        slidesPerView: 3,
      },
    },
  });

  // Initialize AOS
  AOS.init({
    duration: 1000,
    easing: "ease-in-out",
    once: true,
    mirror: false,
  });
})();
