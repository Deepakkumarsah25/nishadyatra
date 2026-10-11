/**
 * SANKALP PHOTO GALLERY — JAVASCRIPT
 * District Filter, Real-time Search, and Lightbox Viewer
 */

document.addEventListener("DOMContentLoaded", () => {
  let cards = Array.from(document.querySelectorAll(".gallery-card"));
  const searchInput = document.getElementById("gallerySearchInput");
  const stateFilter = document.getElementById("galleryStateFilter");
  const districtFilter = document.getElementById("galleryDistrictFilter");
  const filterForm = document.getElementById("galleryFilters");
  const grid = document.getElementById("galleryGrid");
  const paginationHost = document.getElementById("galleryPaginationHost");
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
  const lightboxCounter = document.getElementById("lightboxCounter");
  const lightboxThumbStrip = document.getElementById("lightboxThumbStrip");
  const lightboxAlbumBadge = document.getElementById("lightboxAlbumBadge");

  let currentVisibleCards = [...cards];
  let activeCardIndex = 0;
  let activeCardImages = [];
  let activeImageIndex = 0;
  let filterTimer;
  let activeRequest;

  // ==========================================
  // FILTERING LOGIC
  // ==========================================

  function applyFilters() {
    currentVisibleCards = [...cards];
    cards.forEach((card) => { card.style.display = ""; });
    let emptyState = document.getElementById("galleryEmptyState");
    if (emptyState) emptyState.style.display = cards.length ? "none" : "block";
    if (visibleCountBadge) visibleCountBadge.textContent = `${cards.length} फ़ोटो`;
  }

  const buildFilterUrl = () => {
    const url = new URL(filterForm.action, window.location.origin);
    const params = new URLSearchParams(new FormData(filterForm));
    params.delete("page");
    url.search = params.toString();
    return url;
  };

  const loadGallery = async (url, historyMode = "replace") => {
    activeRequest?.abort();
    activeRequest = new AbortController();
    try {
      const response = await fetch(url.pathname + url.search, {
        signal: activeRequest.signal,
        headers: { "X-Requested-With": "XMLHttpRequest", Accept: "text/html" },
      });
      if (!response.ok) throw new Error(`Gallery request failed (${response.status})`);
      const documentHtml = await response.text();
      const nextDocument = new DOMParser().parseFromString(documentHtml, "text/html");
      const nextGrid = nextDocument.getElementById("galleryGrid");
      const nextPagination = nextDocument.getElementById("galleryPaginationHost");
      if (!nextGrid || !nextPagination) throw new Error("Gallery results were not found in the response.");

      grid.innerHTML = nextGrid.innerHTML;
      paginationHost.innerHTML = nextPagination.innerHTML;
      cards = Array.from(grid.querySelectorAll(".gallery-card"));
      applyFilters();
      if (historyMode === "push") history.pushState({}, "", url.pathname + url.search);
      else if (historyMode === "replace") history.replaceState({}, "", url.pathname + url.search);
    } catch (error) {
      if (error.name !== "AbortError") {
        console.error(error);
        window.location.assign(url.pathname + url.search);
      }
    }
  };

  const scheduleFilter = (delay = 350) => {
    clearTimeout(filterTimer);
    filterTimer = setTimeout(() => loadGallery(buildFilterUrl()), delay);
  };

  if (filterForm) {
    filterForm.addEventListener("submit", (event) => {
      event.preventDefault();
      scheduleFilter(0);
    });
    stateFilter?.addEventListener("change", () => scheduleFilter(250));
    districtFilter?.addEventListener("change", () => scheduleFilter(250));
    searchInput?.addEventListener("input", () => scheduleFilter(450));
    paginationHost?.addEventListener("click", (event) => {
      const link = event.target.closest(".gallery-pagination a");
      if (!link) return;
      const target = new URL(link.href, window.location.origin);
      if (target.origin !== window.location.origin) return;
      event.preventDefault();
      clearTimeout(filterTimer);
      loadGallery(target, "push");
    });
    window.addEventListener("popstate", () => {
      clearTimeout(filterTimer);
      const params = new URLSearchParams(window.location.search);
      searchInput.value = params.get("search") || "";
      if (stateFilter) stateFilter.value = params.get("state") || "all";
      if (window.populateDistricts) {
        window.populateDistricts(stateFilter, districtFilter, params.get("district") || "all");
      }
      if (districtFilter) districtFilter.value = params.get("district") || "all";
      loadGallery(new URL(window.location.href), "none");
    });
  }

  // ==========================================
  // LIGHTBOX LOGIC WITH MULTI-IMAGE ALBUMS
  // ==========================================

  function setActiveImage(imgIndex) {
    if (!activeCardImages || activeCardImages.length === 0) return;
    activeImageIndex = (imgIndex + activeCardImages.length) % activeCardImages.length;
    const item = activeCardImages[activeImageIndex];
    const url = typeof item === "string" ? item : (item && item.url ? item.url : "");

    if (lightboxImg) {
      lightboxImg.style.opacity = "0.7";
      lightboxImg.src = url;
      lightboxImg.onload = () => { lightboxImg.style.opacity = "1"; };
      setTimeout(() => { lightboxImg.style.opacity = "1"; }, 150);
    }

    if (lightboxCounter) {
      if (activeCardImages.length > 1) {
        lightboxCounter.style.display = "block";
        lightboxCounter.textContent = `${activeImageIndex + 1} / ${activeCardImages.length}`;
      } else {
        lightboxCounter.style.display = "none";
      }
    }

    // Highlight thumbnail in strip
    if (lightboxThumbStrip) {
      const thumbs = lightboxThumbStrip.querySelectorAll(".lightbox-thumb-item");
      thumbs.forEach((th, i) => {
        if (i === activeImageIndex) {
          th.classList.add("active");
          th.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
        } else {
          th.classList.remove("active");
        }
      });
    }
  }

  function openLightbox(cardIdx) {
    if (!currentVisibleCards || currentVisibleCards.length === 0) return;

    activeCardIndex = (cardIdx + currentVisibleCards.length) % currentVisibleCards.length;
    const card = currentVisibleCards[activeCardIndex];
    if (!card) return;

    // Parse card images
    activeCardImages = [];
    try {
      const raw = card.getAttribute("data-images");
      if (raw) activeCardImages = JSON.parse(raw);
    } catch (e) {
      activeCardImages = [];
    }

    if (!Array.isArray(activeCardImages) || activeCardImages.length === 0) {
      const single = card.getAttribute("data-image");
      activeCardImages = single ? [{ url: single }] : [];
    }

    // Toggle navigation arrows visibility
    if (lightboxPrevBtn && lightboxNextBtn) {
      if (activeCardImages.length > 1 || currentVisibleCards.length > 1) {
        lightboxPrevBtn.style.display = "flex";
        lightboxNextBtn.style.display = "flex";
      } else {
        lightboxPrevBtn.style.display = "none";
        lightboxNextBtn.style.display = "none";
      }
    }

    // Populate thumbnail strip
    if (lightboxThumbStrip) {
      if (activeCardImages.length > 1) {
        lightboxThumbStrip.style.display = "flex";
        lightboxThumbStrip.innerHTML = activeCardImages.map((img, i) => {
          const u = typeof img === "string" ? img : (img && img.url ? img.url : "");
          return `
            <div class="lightbox-thumb-item" data-index="${i}" title="फ़ोटो ${i + 1}">
              <img src="${u}" alt="Thumbnail ${i + 1}" loading="lazy" />
            </div>
          `;
        }).join("");
      } else {
        lightboxThumbStrip.style.display = "none";
        lightboxThumbStrip.innerHTML = "";
      }
    }

    setActiveImage(0);

    lightbox.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    lightbox.classList.remove("active");
    document.body.style.overflow = "";
  }

  function showNextPhoto() {
    if (activeCardImages && activeCardImages.length > 1) {
      setActiveImage(activeImageIndex + 1);
    } else {
      openLightbox(activeCardIndex + 1);
    }
  }

  function showPrevPhoto() {
    if (activeCardImages && activeCardImages.length > 1) {
      setActiveImage(activeImageIndex - 1);
    } else {
      openLightbox(activeCardIndex - 1);
    }
  }

  // Event delegation keeps lightbox clicks working after AJAX filter updates.
  grid?.addEventListener("click", (event) => {
    const card = event.target.closest(".gallery-card");
    if (!card) return;
    const index = currentVisibleCards.indexOf(card);
    if (index !== -1) openLightbox(index);
  });

  // Clicking on thumbnail strip switches active photo
  lightboxThumbStrip?.addEventListener("click", (event) => {
    const thumb = event.target.closest(".lightbox-thumb-item");
    if (!thumb) return;
    const idx = parseInt(thumb.getAttribute("data-index"), 10);
    if (!isNaN(idx)) {
      setActiveImage(idx);
    }
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
