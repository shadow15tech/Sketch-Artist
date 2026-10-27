
/* =========================================
   1. MOBILE NAVIGATION
========================================= */

const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");

if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", () => {
    const isExpanded =
      menuToggle.getAttribute("aria-expanded") === "true";

    menuToggle.setAttribute("aria-expanded", String(!isExpanded));
    mainNav.classList.toggle("is-open", !isExpanded);
  });

  // Close the menu after selecting a navigation link
  mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });

  // Close the menu when Escape is pressed
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      mainNav.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.focus();
    }
  });

  // Reset mobile navigation when returning to desktop layout
  window.addEventListener("resize", () => {
    if (window.innerWidth > 950) {
      mainNav.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
    }
  });
}


/* =========================================
   2. PORTFOLIO FILTERS
========================================= */

const filterButtons = document.querySelectorAll(".filter-btn");
const portfolioItems = document.querySelectorAll(".portfolio-item");

if (filterButtons.length && portfolioItems.length) {
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const selectedFilter = button.dataset.filter || "all";

      // Update the selected filter button
      filterButtons.forEach((item) => {
        const isActive = item === button;

        item.classList.toggle("active", isActive);
        item.setAttribute("aria-pressed", String(isActive));
      });

      // Show matching artwork
      portfolioItems.forEach((item) => {
        const category = item.dataset.category || "";
        const shouldShow =
          selectedFilter === "all" || category === selectedFilter;

        item.hidden = !shouldShow;
      });
    });
  });
}


/* =========================================
   3. CONTACT FORM
========================================= */

const contactForm = document.querySelector("#contact-form");

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!contactForm.checkValidity()) {
      contactForm.reportValidity();
      return;
    }

    const formData = new FormData(contactForm);

    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const artwork = String(formData.get("artwork") || "").trim();
    const message = String(formData.get("message") || "").trim();

    // Replace this with the artist's real email address
    const artistEmail = "artist@example.com";

    const subject = encodeURIComponent(
      `Artwork enquiry from ${name}`
    );

    const body = encodeURIComponent(
      `Name: ${name}\n` +
      `Email: ${email}\n` +
      `Artwork interest: ${artwork}\n\n` +
      `Message:\n${message}`
    );

    // Opens the visitor's default email application
    window.location.href =
      `mailto:${artistEmail}?subject=${subject}&body=${body}`;
  });
}


/* =========================================
   4. AUTOMATIC FOOTER YEAR
========================================= */

const currentYear = document.querySelector("#current-year");

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

/* =========================================
   5. SMOOTH SECTION SCROLLING
========================================= */

const internalLinks = document.querySelectorAll(
  'a[href^="#"]:not([href="#"])'
);

internalLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    const targetId = link.getAttribute("href");
    const target = document.querySelector(targetId);

    if (!target) return;

    event.preventDefault();

    target.scrollIntoView({
      behavior: window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches
        ? "auto"
        : "smooth",
      block: "start",
    });

    // Keep the URL hash in sync with the selected section
    if (window.location.hash !== targetId) {
      history.pushState(null, "", targetId);
    }
  });
});


/* =========================================
   6. ACTIVE NAVIGATION ON SCROLL
========================================= */

const pageSections = document.querySelectorAll(
  "main section[id], section[id]"
);

const navigationLinks = document.querySelectorAll(
  '.main-nav a[href^="#"]'
);

if ("IntersectionObserver" in window && pageSections.length) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const activeId = entry.target.id;

        navigationLinks.forEach((link) => {
          const isActive =
            link.getAttribute("href") === `#${activeId}`;

          if (isActive) {
            link.setAttribute("aria-current", "location");
          } else {
            link.removeAttribute("aria-current");
          }
        });
      });
    },
    {
      root: null,
      rootMargin: "-25% 0px -60% 0px",
      threshold: 0,
    }
  );

  pageSections.forEach((section) => {
    sectionObserver.observe(section);
  });
}
/* =========================================
   7. SCROLL-REVEAL ANIMATIONS
========================================= */

const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

const revealElements = document.querySelectorAll(
  ".section-heading, " +
  ".category-card, " +
  ".about-content, " +
  ".about-visual, " +
  ".portfolio-item, " +
  ".service-card, " +
  ".process-step, " +
  ".testimonial-card, " +
  ".contact-content, " +
  ".contact-form-wrap"
);

if (!prefersReducedMotion && "IntersectionObserver" in window) {
  revealElements.forEach((element) => {
    element.classList.add("reveal-ready");
  });

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -35px 0px",
    }
  );

  revealElements.forEach((element) => {
    revealObserver.observe(element);
  });
}