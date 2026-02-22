const navToggle = document.querySelector(".nav__toggle");
const navLinks = document.querySelector(".nav__links");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("is-open");
  });

  document.addEventListener("click", (event) => {
    if (!navLinks.contains(event.target) && !navToggle.contains(event.target)) {
      navLinks.classList.remove("is-open");
    }
  });
}

const currentPath = window.location.pathname.replace(/index.html$/, "");
const navAnchors = document.querySelectorAll(".nav__links a");

navAnchors.forEach((anchor) => {
  const href = anchor.getAttribute("href");
  if (!href) return;
  const normalized = href.replace("./", "");
  if (currentPath.endsWith(normalized.replace(/index.html$/, ""))) {
    anchor.classList.add("active");
  }
});

const revealTargets = document.querySelectorAll(
  ".section, .hero, .card, .subpage-hero, .footer"
);

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealTargets.forEach((el) => {
    el.classList.add("reveal");
    observer.observe(el);
  });
} else {
  revealTargets.forEach((el) => el.classList.add("is-visible"));
}
