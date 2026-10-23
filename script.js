
/* =========================
   1. MOBILE NAVIGATION
========================= */

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const navItems = document.querySelectorAll(".nav-link");

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");

  menuToggle.setAttribute("aria-expanded", isOpen);
  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Close navigation" : "Open navigation"
  );

  menuToggle.innerHTML = isOpen
    ? '<i class="fa-solid fa-xmark"></i>'
    : '<i class="fa-solid fa-bars"></i>';
});

// Close the mobile menu after clicking a navigation link
navItems.forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
    menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
  });
});

// Close the menu when clicking outside it
document.addEventListener("click", (event) => {
  const clickedInsideMenu = navLinks.contains(event.target);
  const clickedToggle = menuToggle.contains(event.target);

  if (!clickedInsideMenu && !clickedToggle) {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
    menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
  }
});


/* =========================
   2. SCROLL REVEAL ANIMATION
========================= */

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12
    }
  );

  revealElements.forEach((element) => {
    revealObserver.observe(element);
  });
} else {
  // Fallback for older browsers
  revealElements.forEach((element) => {
    element.classList.add("visible");
  });
}


/* =========================
   3. ACTIVE NAVIGATION LINK
========================= */

const pageSections = document.querySelectorAll("main section[id]");

if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;

          navItems.forEach((link) => {
            const isActive =
              link.getAttribute("href") === `#${sectionId}`;

            link.classList.toggle("active", isActive);
          });
        }
      });
    },
    {
      rootMargin: "-25% 0px -60% 0px"
    }
  );

  pageSections.forEach((section) => {
    sectionObserver.observe(section);
  });
}


/* =========================
   4. AUTOMATIC COPYRIGHT YEAR
========================= */

const currentYear = document.getElementById("currentYear");

currentYear.textContent = new Date().getFullYear();


/* =========================
   5. CONTACT FORM
========================= */

// Replace this with your actual professional email address.
const recipientEmail = "YOUR_EMAIL@example.com";

const contactForm = document.getElementById("contactForm");
const formNote = document.getElementById("formNote");

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (recipientEmail === "YOUR_EMAIL@example.com") {
    formNote.textContent =
      "Please add your real email address in script.js before using this form.";
    return;
  }

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const subject = document.getElementById("subject").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !email || !subject || !message) {
    formNote.textContent = "Please fill in all the fields.";
    return;
  }

  const emailSubject = encodeURIComponent(subject);

  const emailBody = encodeURIComponent(
    `Name: ${name}\n` +
    `Email: ${email}\n\n` +
    `Message:\n${message}`
  );

  const mailtoLink =
    `mailto:${recipientEmail}` +
    `?subject=${emailSubject}` +
    `&body=${emailBody}`;

  formNote.textContent =
    "Opening your email application. Please send the message there.";

  window.location.href = mailtoLink;
});
