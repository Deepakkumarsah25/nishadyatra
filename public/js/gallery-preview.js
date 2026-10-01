/**
 * Image Gallery Preview - Horizontal Scrolling (आगे-पीछे) Controller
 */
document.addEventListener("DOMContentLoaded", function () {
  const container = document.getElementById("galleryScrollContainer");
  const prevBtn = document.getElementById("galleryPrevBtn");
  const nextBtn = document.getElementById("galleryNextBtn");
  const dotsContainer = document.getElementById("galleryScrollDots");

  if (!container) return;

  const cards = container.querySelectorAll(".gallery-card-item");
  if (cards.length === 0) return;

  // Calculate scroll step (width of one card + gap)
  function getScrollStep() {
    const firstCard = cards[0];
    if (!firstCard) return 314;
    const cardWidth = firstCard.offsetWidth;
    const gap = 24; // matches gap in CSS
    return cardWidth + gap;
  }

  // Scroll forward (आगे)
  function scrollNext() {
    const step = getScrollStep();
    const maxScroll = container.scrollWidth - container.clientWidth;
    if (container.scrollLeft >= maxScroll - 10) {
      // Loop back to start smoothly
      container.scrollTo({ left: 0, behavior: "smooth" });
    } else {
      container.scrollBy({ left: step, behavior: "smooth" });
    }
  }

  // Scroll backward (पीछे)
  function scrollPrev() {
    const step = getScrollStep();
    if (container.scrollLeft <= 10) {
      const maxScroll = container.scrollWidth - container.clientWidth;
      container.scrollTo({ left: maxScroll, behavior: "smooth" });
    } else {
      container.scrollBy({ left: -step, behavior: "smooth" });
    }
  }

  // Button Click Handlers
  if (nextBtn) {
    nextBtn.addEventListener("click", function (e) {
      e.preventDefault();
      scrollNext();
      resetAutoplay();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", function (e) {
      e.preventDefault();
      scrollPrev();
      resetAutoplay();
    });
  }

  // Update dots indicator on scroll
  function updateDots() {
    if (!dotsContainer) return;
    const dots = dotsContainer.querySelectorAll(".gallery-scroll-dot");
    if (dots.length === 0) return;

    const scrollLeft = container.scrollLeft;
    const maxScroll = container.scrollWidth - container.clientWidth;
    const ratio = maxScroll > 0 ? scrollLeft / maxScroll : 0;
    const activeIndex = Math.min(
      dots.length - 1,
      Math.max(0, Math.round(ratio * (dots.length - 1)))
    );

    dots.forEach((dot, idx) => {
      dot.classList.toggle("active", idx === activeIndex);
    });
  }

  container.addEventListener("scroll", updateDots, { passive: true });

  // Dot Click Handlers
  if (dotsContainer) {
    const dots = dotsContainer.querySelectorAll(".gallery-scroll-dot");
    dots.forEach((dot, idx) => {
      dot.addEventListener("click", function (e) {
        e.preventDefault();
        const maxScroll = container.scrollWidth - container.clientWidth;
        const targetScroll = (maxScroll / (dots.length - 1)) * idx;
        container.scrollTo({ left: targetScroll, behavior: "smooth" });
        resetAutoplay();
      });
    });
  }

  // Mouse Drag / Grab to Scroll Support (Desktop)
  let isDown = false;
  let startX;
  let scrollLeftStart;

  container.addEventListener("mousedown", (e) => {
    isDown = true;
    container.classList.add("is-dragging");
    startX = e.pageX - container.offsetLeft;
    scrollLeftStart = container.scrollLeft;
    stopAutoplay();
  });

  window.addEventListener("mouseup", () => {
    if (isDown) {
      isDown = false;
      container.classList.remove("is-dragging");
      startAutoplay();
    }
  });

  container.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - container.offsetLeft;
    const walk = (x - startX) * 1.5; // drag speed multiplier
    container.scrollLeft = scrollLeftStart - walk;
  });

  // Touch Swipe Support (Mobile)
  let touchStartX = 0;
  let touchScrollLeft = 0;

  container.addEventListener(
    "touchstart",
    (e) => {
      touchStartX = e.touches[0].pageX;
      touchScrollLeft = container.scrollLeft;
      stopAutoplay();
    },
    { passive: true }
  );

  container.addEventListener(
    "touchend",
    () => {
      startAutoplay();
    },
    { passive: true }
  );

  // Auto-scrolling (gentle autoplay, pauses on hover)
  let autoplayTimer = null;
  const autoplayInterval = 4000; // 4 seconds

  function startAutoplay() {
    stopAutoplay();
    autoplayTimer = setInterval(scrollNext, autoplayInterval);
  }

  function stopAutoplay() {
    if (autoplayTimer) {
      clearInterval(autoplayTimer);
      autoplayTimer = null;
    }
  }

  function resetAutoplay() {
    startAutoplay();
  }

  container.addEventListener("mouseenter", stopAutoplay);
  container.addEventListener("mouseleave", startAutoplay);

  // Initialize
  updateDots();
  startAutoplay();
});
