/**
 * SANKALP PHOTO GALLERY — JAVASCRIPT
 * District Filter, Real-time Search, and Lightbox Viewer
 */

document.addEventListener("DOMContentLoaded", () => {
  const cards = Array.from(document.querySelectorAll(".gallery-card"));
  const emptyState = document.getElementById("galleryEmptyState");
  const searchInput = document.getElementById("gallerySearchInput");
  const districtChips = Array.from(document.querySelectorAll(".district-chip"));
  const visibleCountBadge = document.getElementById("visibleCountBadge");

  // Lightbox Elements
  const lightbox = document.getElementById("galleryLightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  const lightboxDistrict = document.getElementById("lightboxDistrict");
  const lightboxDate = document.getElementById("lightboxDate");
  const lightboxName = document.getElementById("lightboxName");
  const lightboxCaption = document.getElementById("lightboxCaption");
  const lightboxCloseBtn = document.getElementById("lightboxCloseBtn");
  const lightboxPrevBtn = document.getElementById("lightboxPrevBtn");
  const lightboxNextBtn = document.getElementById("lightboxNextBtn");
  const lightboxDownloadBtn = document.getElementById("lightboxDownloadBtn");

  let currentDistrict = "all";
  let currentSearchQuery = "";
  let currentVisibleCards = [...cards];
  let activeIndex = 0;

  // ==========================================
  // FILTERING LOGIC
  // ==========================================

  function applyFilters() {
    let matchCount = 0;
    currentVisibleCards = [];

    cards.forEach((card) => {
      const cardDistrict = (card.getAttribute("data-district") || "").toLowerCase().trim();
      const cardName = (card.getAttribute("data-name") || "").toLowerCase();
      const cardCaption = (card.getAttribute("data-caption") || "").toLowerCase();

      const matchesDistrict =
        currentDistrict === "all" ||
        cardDistrict === currentDistrict.toLowerCase().trim();

      const matchesSearch =
        !currentSearchQuery ||
        cardName.includes(currentSearchQuery) ||
        cardDistrict.includes(currentSearchQuery) ||
        cardCaption.includes(currentSearchQuery);

      if (matchesDistrict && matchesSearch) {
        card.style.display = "";
        card.style.animation = "fadeInCard 0.35s ease forwards";
        matchCount++;
        currentVisibleCards.push(card);
      } else {
        card.style.display = "none";
      }
    });

    if (emptyState) {
      emptyState.style.display = matchCount === 0 ? "block" : "none";
    }

    if (visibleCountBadge) {
      visibleCountBadge.textContent = `${matchCount} photos displayed`;
    }
  }

  // District Chip Click
  districtChips.forEach((chip) => {
    chip.addEventListener("click", () => {
      districtChips.forEach((c) => c.classList.remove("active"));
      chip.classList.add("active");
      currentDistrict = chip.getAttribute("data-district") || "all";
      applyFilters();
    });
  });

  // Search Input
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      currentSearchQuery = e.target.value.toLowerCase().trim();
      applyFilters();
    });
  }

  // ==========================================
  // LIGHTBOX LOGIC
  // ==========================================

  function openLightbox(index) {
    if (!currentVisibleCards || currentVisibleCards.length === 0) return;

    activeIndex = (index + currentVisibleCards.length) % currentVisibleCards.length;
    const card = currentVisibleCards[activeIndex];
    if (!card) return;

    const imgUrl = card.getAttribute("data-image");
    const name = card.getAttribute("data-name") || "Campaign Member";
    const district = card.getAttribute("data-district") || "";
    const date = card.getAttribute("data-date") || "";
    const caption = card.getAttribute("data-caption") || "";

    lightboxImg.src = imgUrl;
    lightboxImg.alt = name;
    lightboxName.textContent = name;
    lightboxDistrict.textContent = district ? `📍 ${district}` : "";
    lightboxDate.textContent = date ? `📅 ${date}` : "";
    lightboxCaption.textContent = caption || "A solemn pledge taken in dedication to the Nishad Sankalp Campaign.";

    if (lightboxDownloadBtn) {
      lightboxDownloadBtn.href = imgUrl;
    }

    lightbox.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    lightbox.classList.remove("active");
    document.body.style.overflow = "";
  }

  function showNextPhoto() {
    openLightbox(activeIndex + 1);
  }

  function showPrevPhoto() {
    openLightbox(activeIndex - 1);
  }

  // Card click to open lightbox
  cards.forEach((card) => {
    card.addEventListener("click", () => {
      const idx = currentVisibleCards.indexOf(card);
      if (idx !== -1) {
        openLightbox(idx);
      }
    });
  });

  // Lightbox Nav buttons
  if (lightboxCloseBtn) lightboxCloseBtn.addEventListener("click", closeLightbox);
  if (lightboxNextBtn) lightboxNextBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    showNextPhoto();
  });
  if (lightboxPrevBtn) lightboxPrevBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    showPrevPhoto();
  });

  // Click outside box to close
  if (lightbox) {
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });
  }

  // Keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("active")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") showNextPhoto();
    if (e.key === "ArrowLeft") showPrevPhoto();
  });

  // Mobile Touch Swipe support for Lightbox
  let touchStartX = 0;
  let touchEndX = 0;

  if (lightbox) {
    lightbox.addEventListener(
      "touchstart",
      (e) => {
        touchStartX = e.changedTouches[0].screenX;
      },
      { passive: true }
    );

    lightbox.addEventListener(
      "touchend",
      (e) => {
        touchEndX = e.changedTouches[0].screenX;
        const diffX = touchEndX - touchStartX;
        if (Math.abs(diffX) > 50) {
          if (diffX < 0) {
            // Swiped left
            showNextPhoto();
          } else {
            // Swiped right
            showPrevPhoto();
          }
        }
      },
      { passive: true }
    );
  }

  // Initial filter run
  applyFilters();
});
