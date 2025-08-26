  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");
  const navbar = document.querySelector(".navbar");


  hamburger.addEventListener("click", function () {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
  });


  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
    });
  });

  document.addEventListener("click", (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
    }
  });

  let lastScroll = 0;
  window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
      navbar.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)";
    } else {
      navbar.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.15)";
    }

    lastScroll = currentScroll;
  });

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate");
      }
    });
  }, observerOptions);

  const accordionHeaders = document.querySelectorAll(".accordion-header");

  accordionHeaders.forEach((header) => {
    header.addEventListener("click", function () {
      const expanded = this.getAttribute("aria-expanded") === "true";
      const panel = this.nextElementSibling;

      accordionHeaders.forEach((otherHeader) => {
        if (otherHeader !== this) {
          otherHeader.setAttribute("aria-expanded", "false");
          otherHeader.nextElementSibling.hidden = true;
        }
      });

      this.setAttribute("aria-expanded", !expanded);
      panel.hidden = expanded;

      if (!expanded) {
        panel.style.maxHeight = panel.scrollHeight + "px";
      } else {
        panel.style.maxHeight = "0";
      }
    });
  });

  const animateElements = document.querySelectorAll(
    ".hero-content, .hero-images, .stat-item, .service-card, .dream-image, .dream-content, .step-item, .steps-image, .testimonials-image, .testimonials-wrapper, .newsletter-content"
  );
  animateElements.forEach((el) => observer.observe(el));
