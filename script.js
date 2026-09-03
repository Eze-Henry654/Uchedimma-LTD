document.addEventListener("DOMContentLoaded", () => {
  /* ==========================================================================
       Hero Image Carousel Logic
       ========================================================================== */
  const slides = document.querySelectorAll(".slide");
  const dots = document.querySelectorAll(".dot");
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");
  let currentSlide = 0;
  let slideInterval;

  function showSlide(index) {
    slides.forEach((slide) => slide.classList.remove("active"));
    dots.forEach((dot) => dot.classList.remove("active"));

    currentSlide = (index + slides.length) % slides.length;

    slides[currentSlide].classList.add("active");
    dots[currentSlide].classList.add("active");
  }

  function nextSlide() {
    showSlide(currentSlide + 1);
  }

  function prevSlide() {
    showSlide(currentSlide - 1);
  }

  // Auto Advance Slides every 5 Seconds
  function startSlider() {
    slideInterval = setInterval(nextSlide, 5000);
  }

  function pauseSlider() {
    clearInterval(slideInterval);
  }

  nextBtn.addEventListener("click", () => {
    nextSlide();
    pauseSlider();
    startSlider();
  });

  prevBtn.addEventListener("click", () => {
    prevSlide();
    pauseSlider();
    startSlider();
  });

  dots.forEach((dot) => {
    dot.addEventListener("click", (e) => {
      const index = parseInt(e.target.dataset.index);
      showSlide(index);
      pauseSlider();
      startSlider();
    });
  });

  startSlider();

  /* ==========================================================================
       WhatsApp & Direct Reach Action Modal Logic
       ========================================================================== */
  const modal = document.getElementById("actionModal");
  const directBtn = document.getElementById("directActionBtn");
  const closeModal = document.querySelector(".close-modal");
  const whatsappDirectLink = document.getElementById("whatsappDirectLink");

  // Phone configured for WhatsApp direct API routing
  const rawPhoneNumber = "447776302284";
  const defaultWAMessage = encodeURIComponent(
    "Hello UCHEDIMMA LTD, I am interested in your logistics and transport services.",
  );

  whatsappDirectLink.href = `https://wa.me/${rawPhoneNumber}?text=${defaultWAMessage}`;

  directBtn.addEventListener("click", () => {
    modal.style.display = "flex";
  });

  closeModal.addEventListener("click", () => {
    modal.style.display = "none";
  });

  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });

  /* ==========================================================================
       Dual Dispatch Form Submission (WhatsApp & Email fallback)
       ========================================================================== */
  const ctaForm = document.getElementById("ctaForm");

  ctaForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("senderName").value;
    const email = document.getElementById("senderEmail").value;
    const phone = document.getElementById("senderPhone").value;
    const message = document.getElementById("senderMessage").value;

    // Structured Message Formatting
    const formattedText =
      `*NEW FREIGHT INQUIRY - UCHEDIMMA LTD*%0A%0A` +
      `*Name:* ${encodeURIComponent(name)}%0A` +
      `*Email:* ${encodeURIComponent(email)}%0A` +
      `*Phone:* ${encodeURIComponent(phone)}%0A` +
      `*Message:* ${encodeURIComponent(message)}`;

    // Send via WhatsApp directly
    const waURL = `https://wa.me/${rawPhoneNumber}?text=${formattedText}`;
    window.open(waURL, "_blank");

    // Trigger Mailto client parallel dispatch
    const mailtoSubject = encodeURIComponent(`Freight Inquiry from ${name}`);
    const mailtoBody = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${message}`,
    );

    setTimeout(() => {
      window.location.href = `mailto:uchechukwumbagwu@yahoo.com?subject=${mailtoSubject}&body=${mailtoBody}`;
    }, 1000);

    ctaForm.reset();
  });

  // Force page to scroll to the top on load
  if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }
  window.scrollTo(0, 0);
});

/* ==========================================================================
   Mobile Hamburger Menu Toggle
   ========================================================================== */
const hamburgerToggle = document.getElementById("hamburgerToggle");
const navMenu = document.getElementById("navMenu");
const navLinks = document.querySelectorAll(".nav-menu a");

// Toggle menu visibility
hamburgerToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active");

  // Switch between bars icon and 'X' close icon
  const icon = hamburgerToggle.querySelector("i");
  if (navMenu.classList.contains("active")) {
    icon.classList.remove("fa-bars");
    icon.classList.add("fa-xmark");
  } else {
    icon.classList.remove("fa-xmark");
    icon.classList.add("fa-bars");
  }
});

// Auto-close dropdown when any navigation link is clicked
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (navMenu.classList.contains("active")) {
      navMenu.classList.remove("active");
      const icon = hamburgerToggle.querySelector("i");
      icon.classList.remove("fa-xmark");
      icon.classList.add("fa-bars");
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const whatsappBtn = document.getElementById("whatsappBtn");
  const emailBtn = document.getElementById("emailBtn");

  // Replace with your company details
  const companyPhone = "+447776302284"; // UK number format without leading +
  const companyEmail = "uchechukwumbagwu@yahoo.com";

  function getFormData() {
    const name = document.getElementById("senderName").value.trim();
    const email = document.getElementById("senderEmail").value.trim();
    const phone = document.getElementById("senderPhone").value.trim();
    const message =
      document.querySelector("#ctaForm textarea")?.value.trim() || "";

    if (!name || !email || !phone) {
      alert("Please fill in all required fields (Name, Email, and Phone).");
      return null;
    }

    return { name, email, phone, message };
  }

  // Handle WhatsApp Submission
  whatsappBtn.addEventListener("click", () => {
    const data = getFormData();
    if (!data) return;

    const text =
      `*New Transport Quote Request*%0A%0A` +
      `*Name:* ${encodeURIComponent(data.name)}%0A` +
      `*Email:* ${encodeURIComponent(data.email)}%0A` +
      `*Phone:* ${encodeURIComponent(data.phone)}%0A` +
      `*Request Details:* ${encodeURIComponent(data.message)}`;

    window.open(`https://wa.me/${companyPhone}?text=${text}`, "_blank");
  });

  // Handle Email Submission
  emailBtn.addEventListener("click", () => {
    const data = getFormData();
    if (!data) return;

    const subject = encodeURIComponent(
      `Transport Quote Request - ${data.name}`,
    );
    const body = encodeURIComponent(
      `Hello UCHEDIMMA LTD Team,\n\n` +
        `I would like to request a transport quote with the following details:\n\n` +
        `Name / Company: ${data.name}\n` +
        `Email Address: ${data.email}\n` +
        `Phone Number: ${data.phone}\n\n` +
        `Request Details:\n${data.message}\n\n` +
        `Best regards,\n${data.name}`,
    );

    window.location.href = `mailto:${companyEmail}?subject=${subject}&body=${body}`;
  });
});
