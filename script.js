(() => {
  "use strict";
  const header = document.getElementById("site-header");
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.getElementById("main-nav");
  const label = toggle.querySelector(".sr-only");

  function setMenu(open) {
    toggle.setAttribute("aria-expanded", String(open));
    label.textContent = open ? "Close navigation" : "Open navigation";
    nav.classList.toggle("open", open);
  }

  toggle.addEventListener("click", () => setMenu(toggle.getAttribute("aria-expanded") !== "true"));
  nav.addEventListener("click", event => {
    if (event.target.closest("a")) setMenu(false);
  });
  document.addEventListener("click", event => {
    if (!header.contains(event.target)) setMenu(false);
  });
  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
      setMenu(false);
      toggle.focus();
    }
  });
  window.matchMedia("(min-width: 901px)").addEventListener("change", event => {
    if (event.matches) setMenu(false);
  });

  function updateHeader() {
    header.classList.toggle("scrolled", window.scrollY > 16);
  }
  window.addEventListener("scroll", updateHeader, { passive: true });
  updateHeader();

  document.getElementById("year").textContent = new Date().getFullYear();

  if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.remove("pending");
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.05 });

    document.querySelectorAll(".reveal").forEach(element => {
      element.classList.add("pending");
      observer.observe(element);
    });

    window.setTimeout(() => {
      document.querySelectorAll(".pending").forEach(element => element.classList.remove("pending"));
    }, 4500);
  }
})();
