/*
Nama File    : script.js
Tanggal      : 3 Januari 2026
Kelas        : 05TPLP017
Kelompok     : 6
Anggota      : - Aufa Wafi Dhaifullah (231011401814)
               - Fadlan Lesmana (231011400735)
               - Ivandhika Satria Putra Ferdianto (231011401818)
Deskripsi    : JavaScript untuk interaktivitas website
               Navbar, dark mode, scroll animations, dan code toggles
*/

// DARK MODE / THEME MANAGER
const toggleBtn = document.createElement("button");
toggleBtn.id = "theme-toggle";
toggleBtn.className = "theme-toggle";
toggleBtn.ariaLabel = "Ganti Mode Tema";
toggleBtn.innerHTML = '<i class="fas fa-moon"></i>'; // Default icon

// Inject Toggle Button into Navbar
function injectThemeToggle() {
  const navbar = document.querySelector(".navbar");
  const hamburger = document.querySelector(".hamburger");

  if (navbar && hamburger) {
    // Insert before hamburger so it's visible on mobile
    navbar.insertBefore(toggleBtn, hamburger);
  }
}

// Check LocalStorage or System Preference
function initTheme() {
  const savedTheme = localStorage.getItem("theme");
  const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  if (savedTheme === "dark" || (!savedTheme && systemDark)) {
    document.documentElement.setAttribute("data-theme", "dark");
    toggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
  } else {
    document.documentElement.setAttribute("data-theme", "light");
    toggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
  }
}

// Toggle Logic
toggleBtn.addEventListener("click", () => {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";

  document.documentElement.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);

  // Animate Icon
  toggleBtn.style.transform = "rotate(360deg)";
  setTimeout(() => {
    toggleBtn.innerHTML =
      newTheme === "dark"
        ? '<i class="fas fa-sun"></i>'
        : '<i class="fas fa-moon"></i>';
    toggleBtn.style.transform = "rotate(0deg)";
  }, 200);
});

// Run Init
document.addEventListener("DOMContentLoaded", () => {
  injectThemeToggle();
  initTheme();
});

// ============================================
// NAVIGATION - Hamburger Menu Toggle
// ============================================
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
const navItems = document.querySelectorAll(".nav-links a");

if (hamburger) {
  // Toggle menu on hamburger click
  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");

    // Animate hamburger to X
    hamburger.classList.toggle("active");
  });

  // Close menu when clicking nav item (but NOT the dropdown toggle)
  navItems.forEach((item) => {
    // Skip the dropdown parent link to avoid conflict
    if (
      item.parentElement &&
      item.parentElement.classList.contains("dropdown")
    ) {
      return; // Don't close menu when clicking "Materi"
    }
    item.addEventListener("click", () => {
      navLinks.classList.remove("active");
      hamburger.classList.remove("active");
    });
  });

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    if (
      !hamburger.contains(e.target) &&
      !navLinks.contains(e.target) &&
      !toggleBtn.contains(e.target)
    ) {
      navLinks.classList.remove("active");
      hamburger.classList.remove("active");
    }
  });
}

// ============================================
// DROPDOWN MENU - Click-Based Toggle
// ============================================
const dropdown = document.querySelector(".dropdown");
const dropdownLink = dropdown ? dropdown.querySelector("a") : null;

if (dropdown && dropdownLink) {
  // Toggle dropdown on click
  dropdownLink.addEventListener("click", (e) => {
    e.preventDefault(); // Prevent default link behavior
    dropdown.classList.toggle("active");
  });

  // Close dropdown when clicking outside
  document.addEventListener("click", (e) => {
    if (!dropdown.contains(e.target)) {
      dropdown.classList.remove("active");
    }
  });

  // Close dropdown when clicking a dropdown item
  const dropdownItems = dropdown.querySelectorAll(".dropdown-content a");
  dropdownItems.forEach((item) => {
    item.addEventListener("click", () => {
      dropdown.classList.remove("active");
    });
  });
}

// ============================================
// SMOOTH SCROLLING for anchor links
// ============================================
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");

    // Skip if href is just "#"
    if (href === "#") return;

    e.preventDefault();
    const target = document.querySelector(href);

    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// ============================================
// FLOATING TOC (Mobile) - Table of Contents
// ============================================
function initFloatingTOC() {
  const sidebar = document.querySelector(".col-left");

  // Only proceed if sidebar exists (Materi pages)
  if (!sidebar) return;

  // Create floating button
  const tocBtn = document.createElement("button");
  tocBtn.className = "floating-toc-btn";
  tocBtn.innerHTML = '<i class="fas fa-list-ul"></i> Daftar Isi';
  tocBtn.setAttribute("aria-label", "Toggle Table of Contents");

  // Create overlay
  const overlay = document.createElement("div");
  overlay.className = "mobile-toc-overlay";

  // Create panel
  const panel = document.createElement("div");
  panel.className = "mobile-toc-panel";

  // Create header
  const header = document.createElement("div");
  header.className = "mobile-toc-header";
  header.innerHTML = `
    <h3>Daftar Isi</h3>
    <button class="mobile-toc-close" aria-label="Close">&times;</button>
  `;

  // Clone sidebar content
  const sidebarContent = sidebar.cloneNode(true);
  sidebarContent.removeAttribute("class");
  sidebarContent.style.cssText = "";

  // Assemble
  panel.appendChild(header);
  panel.appendChild(sidebarContent);
  overlay.appendChild(panel);

  // Inject into document
  document.body.appendChild(tocBtn);
  document.body.appendChild(overlay);

  // Event listeners
  const closeBtn = overlay.querySelector(".mobile-toc-close");

  const toggleTOC = () => {
    overlay.classList.toggle("active");
  };

  tocBtn.addEventListener("click", toggleTOC);
  closeBtn.addEventListener("click", toggleTOC);

  // Close when clicking overlay background
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) {
      toggleTOC();
    }
  });

  // Close when clicking a TOC link
  const tocLinks = panel.querySelectorAll("a");
  tocLinks.forEach((link) => {
    link.addEventListener("click", () => {
      overlay.classList.remove("active");
    });
  });
}

// Initialize on DOM ready
document.addEventListener("DOMContentLoaded", initFloatingTOC);

// ============================================
// SMOOTH SCROLLING for anchor links
// ============================================
const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Get form values
    const nama = document.getElementById("nama").value.trim();
    const email = document.getElementById("email").value.trim();
    const pesan = document.getElementById("pesan").value.trim();

    // Validation
    if (!nama || !email || !pesan) {
      showNotification("Mohon lengkapi semua bidang!", "error");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showNotification("Format email tidak valid!", "error");
      return;
    }

    // Success
    showNotification(
      `Terima kasih ${nama}, pesan Anda telah kami terima!`,
      "success"
    );
    contactForm.reset();
  });
}

// ============================================
// NOTIFICATION HELPER
// ============================================
function showNotification(message, type = "info") {
  // Remove existing notifications
  const existing = document.querySelector(".notification");
  if (existing) existing.remove();

  // Create notification element
  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.textContent = message;

  // Add styles
  notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: ${
          type === "success"
            ? "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
            : "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
        };
        color: white;
        border-radius: 0.5rem;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
        font-weight: 500;
    `;

  document.body.appendChild(notification);

  // Auto remove after 3 seconds
  setTimeout(() => {
    notification.style.animation = "slideOutRight 0.3s ease";
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// Add notification animations
const style = document.createElement("style");
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ============================================
// SCROLL TO TOP BUTTON
// ============================================
const scrollBtn = document.createElement("button");
scrollBtn.innerHTML = "↑";
scrollBtn.className = "scroll-to-top";
scrollBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    box-shadow: 0 4px 12px rgba(99, 102, 241, 0.4);
    z-index: 9999;
`;

// Only append if not already there (safety check though this script runs once)
if (!document.querySelector(".scroll-to-top")) {
  document.body.appendChild(scrollBtn);
}

// Show/hide scroll button
window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    scrollBtn.style.opacity = "1";
    scrollBtn.style.visibility = "visible";
  } else {
    scrollBtn.style.opacity = "0";
    scrollBtn.style.visibility = "hidden";
  }
});

scrollBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

scrollBtn.addEventListener("mouseenter", () => {
  scrollBtn.style.transform = "scale(1.1)";
});

scrollBtn.addEventListener("mouseleave", () => {
  scrollBtn.style.transform = "scale(1)";
});

// ============================================
// CODE SYNTAX HIGHLIGHTING (Simple)
// ============================================
document.querySelectorAll("pre code").forEach((block) => {
  block.classList.add("code-block");
});

console.log("✨ Website Tutorial Pemrograman Web 1 - Ready!");

// ============================================
// SCROLL ANIMATIONS (Intersection Observer)
// ============================================
const observerOptions = {
  threshold: 0.15,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("fade-in");
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all elements with .animate-on-scroll class
window.addEventListener("load", () => {
  document.querySelectorAll(".animate-on-scroll").forEach((el) => {
    observer.observe(el);
  });
});
// ============================================
// COLLAPSIBLE CONTENT TOGGLE (Code Show/Hide)
// Enhanced with Modern Animations
// ============================================
const toggleCodeButtons = document.querySelectorAll(".btn-toggle-code");
toggleCodeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const codeWrapper = button.closest(".code-wrapper");
    const codeBox = codeWrapper.querySelector(".code-box");

    //Toggle active class on button for icon rotation
    button.classList.toggle("active");

    // Toggle show class for smooth animation
    codeBox.classList.toggle("show");

    // Update button text with icon
    if (codeBox.classList.contains("show")) {
      button.innerHTML = '<i class="fas fa-eye-slash"></i> Sembunyikan Kode';
    } else {
      button.innerHTML = '<i class="fas fa-eye"></i> Tampilkan Kode';
    }
  });
});
