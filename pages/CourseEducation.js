// Mobile menu toggle functionality
const mobileMenuToggle = document.getElementById("mobileMenuToggle");
const mobileMenu = document.getElementById("mobileMenu");
const hamburgerIcon = document.getElementById("hamburgerIcon");
const closeIcon = document.getElementById("closeIcon");

let isMenuOpen = false;

mobileMenuToggle.addEventListener("click", function () {
  isMenuOpen = !isMenuOpen;

  if (isMenuOpen) {
    mobileMenu.classList.add("mobile-menu-open");
    hamburgerIcon.classList.add("hidden");
    closeIcon.classList.remove("hidden");
  } else {
    mobileMenu.classList.remove("mobile-menu-open");
    hamburgerIcon.classList.remove("hidden");
    closeIcon.classList.add("hidden");
  }
});

// Close menu when clicking on a link (mobile)
const mobileLinks = mobileMenu.querySelectorAll("a");
mobileLinks.forEach((link) => {
  link.addEventListener("click", function () {
    isMenuOpen = false;
    mobileMenu.classList.remove("mobile-menu-open");
    hamburgerIcon.classList.remove("hidden");
    closeIcon.classList.add("hidden");
  });
});

// Intersection Observer for animations
const observerOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0.1,
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.animationPlayState = "running";
    }
  });
}, observerOptions);

// Observe all fade elements
document.querySelectorAll(".fade-element").forEach((el) => {
  observer.observe(el);
});

// Create floating particles
function createParticle() {
  const particle = document.createElement("div");
  particle.className = "particle";

  const size = Math.random() * 6 + 2;
  particle.style.width = size + "px";
  particle.style.height = size + "px";
  particle.style.left = Math.random() * 100 + "%";
  particle.style.animationDuration = Math.random() * 4 + 6 + "s";
  particle.style.animationDelay = Math.random() * 2 + "s";

  document.getElementById("particles").appendChild(particle);

  // Remove particle after animation
  setTimeout(() => {
    if (particle.parentNode) {
      particle.parentNode.removeChild(particle);
    }
  }, 8000);
}

// Generate particles continuously
setInterval(createParticle, 800);

// Create initial particles
for (let i = 0; i < 10; i++) {
  setTimeout(createParticle, i * 100);
}

// Add scroll-triggered animations
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const parallaxElements = document.querySelectorAll(".animate-float");

  parallaxElements.forEach((element) => {
    const speed = 0.5;
    element.style.transform = `translateY(${scrolled * speed}px)`;
  });
});

//   ================================== Payment Section ===============================================
let selectedPlan = "";
let selectedPrice = "";

function openPaymentModal(planName, price) {
  selectedPlan = planName;
  selectedPrice = price;
  document.getElementById(
    "selectedPlan"
  ).textContent = `${planName} - ${price}`;

  const overlay = document.getElementById("modalOverlay");
  const modal = document.getElementById("paymentModal");

  // Show overlay
  overlay.classList.remove("opacity-0", "invisible");
  overlay.classList.add("opacity-100", "visible");

  // Show modal with animation
  setTimeout(() => {
    modal.classList.remove("scale-95", "opacity-0");
    modal.classList.add("scale-100", "opacity-100");
  }, 50);

  // Prevent background scrolling
  document.body.style.overflow = "hidden";
}

function closeModal(event) {
  if (
    event &&
    event.target !== event.currentTarget &&
    !event.target.closest("button")
  ) {
    return;
  }

  const overlay = document.getElementById("modalOverlay");
  const modal = document.getElementById("paymentModal");

  // Hide modal with animation
  modal.classList.remove("scale-100", "opacity-100");
  modal.classList.add("scale-95", "opacity-0");

  // Hide overlay after animation
  setTimeout(() => {
    overlay.classList.remove("opacity-100", "visible");
    overlay.classList.add("opacity-0", "invisible");
  }, 200);

  // Restore scrolling
  document.body.style.overflow = "auto";

  // Reset form
  document.getElementById("paymentForm").reset();
}

function processPayment(event) {
  event.preventDefault();

  const submitBtn = document.getElementById("submitBtn");
  const submitText = document.getElementById("submitText");
  const loadingSpinner = document.getElementById("loadingSpinner");

  // Show loading state
  submitBtn.disabled = true;
  submitText.classList.add("hidden");
  loadingSpinner.classList.remove("hidden");

  // Simulate payment processing
  setTimeout(() => {
    // Success state
    submitBtn.classList.remove("from-purple-600", "to-blue-600");
    submitBtn.classList.add("from-green-500", "to-green-600");
    loadingSpinner.classList.add("hidden");
    submitText.textContent = "Payment Successful!";
    submitText.classList.remove("hidden");

    setTimeout(() => {
      alert(
        `Payment successful for ${selectedPlan}! Thank you for your purchase.`
      );
      closeModal();

      // Reset button state
      submitBtn.disabled = false;
      submitBtn.classList.remove("from-green-500", "to-green-600");
      submitBtn.classList.add("from-purple-600", "to-blue-600");
      submitText.textContent = "Complete Payment";
    }, 1500);
  }, 2000);
}

// Format card number input
document.getElementById("cardNumber").addEventListener("input", function (e) {
  let value = e.target.value.replace(/\s/g, "").replace(/[^0-9]/gi, "");
  let formattedValue = value.match(/.{1,4}/g)?.join(" ") || value;
  e.target.value = formattedValue;
});

// Format expiry date input
document.getElementById("expiry").addEventListener("input", function (e) {
  let value = e.target.value.replace(/\D/g, "");
  if (value.length >= 2) {
    value = value.substring(0, 2) + "/" + value.substring(2, 4);
  }
  e.target.value = value;
});

// Only allow numbers in CVV
document.getElementById("cvv").addEventListener("input", function (e) {
  e.target.value = e.target.value.replace(/\D/g, "");
});

// Close modal with Escape key
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    closeModal();
  }
});
// ====================== Dark Mode ============================
// Dark mode toggle functionality
const darkModeToggle = document.getElementById("darkModeToggle");
const html = document.documentElement;

// Check for saved theme preference or default to system preference
function initializeTheme() {
  const savedTheme = localStorage.getItem("theme");
  const systemPrefersDark = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;

  if (savedTheme === "dark" || (!savedTheme && systemPrefersDark)) {
    html.classList.add("dark");
  } else {
    html.classList.remove("dark");
  }
}

// Toggle dark mode
function toggleDarkMode() {
  const isDark = html.classList.contains("dark");

  if (isDark) {
    html.classList.remove("dark");
    localStorage.setItem("theme", "light");
  } else {
    html.classList.add("dark");
    localStorage.setItem("theme", "dark");
  }
}

// Event listeners
darkModeToggle.addEventListener("click", toggleDarkMode);

// Listen for system theme changes
window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", (e) => {
    if (!localStorage.getItem("theme")) {
      if (e.matches) {
        html.classList.add("dark");
      } else {
        html.classList.remove("dark");
      }
    }
  });

// Initialize theme on page load
initializeTheme();
