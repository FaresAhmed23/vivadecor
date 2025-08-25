// script.js (continued)

document.addEventListener("DOMContentLoaded", function () {
  // Mobile menu toggle
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");
  const navbar = document.querySelector(".navbar");

  // Toggle mobile menu
  hamburger.addEventListener("click", function () {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
  });

  // Close mobile menu when clicking on a link
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
    });
  });

  // Close mobile menu when clicking outside
  document.addEventListener("click", (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
    }
  });

  // Navbar scroll effect
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

  // Smooth scroll for anchor links
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

  // Intersection Observer for animations
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

      // Close all other accordions
      accordionHeaders.forEach((otherHeader) => {
        if (otherHeader !== this) {
          otherHeader.setAttribute("aria-expanded", "false");
          otherHeader.nextElementSibling.hidden = true;
        }
      });

      // Toggle current accordion
      this.setAttribute("aria-expanded", !expanded);
      panel.hidden = expanded;

      // Smooth height animation
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
});
