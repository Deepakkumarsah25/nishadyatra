/**
 * Home About Section - Auto-scrolling image carousel
 */
document.addEventListener("DOMContentLoaded", function () {
  const slider = document.getElementById("homeAboutSlider");
  if (!slider) return;

  const track = document.getElementById("homeAboutTrack");
  const slides = slider.querySelectorAll(".home-about-slide");
  const prevBtn = document.getElementById("homeAboutPrevBtn");
  const nextBtn = document.getElementById("homeAboutNextBtn");
  const dots = slider.querySelectorAll(".home-about-dot");

  if (!track || slides.length <= 1) return;

  let currentIndex = 0;
  let autoplayTimer = null;
  const slideCount = slides.length;
  const slideInterval = 3500; // 3.5 seconds

  function updateSlider(index) {
    if (index < 0) {
      currentIndex = slideCount - 1;
    } else if (index >= slideCount) {
      currentIndex = 0;
    } else {
      currentIndex = index;
    }

    // Slide track using CSS transform
    track.style.transform = `translateX(-${currentIndex * 100}%)`;

    // Update active class on slides
    slides.forEach((slide, idx) => {
      slide.classList.toggle("active", idx === currentIndex);
    });

    // Update active dot
    dots.forEach((dot, idx) => {
      dot.classList.toggle("active", idx === currentIndex);
    });
  }

  function nextSlide() {
    updateSlider(currentIndex + 1);
  }

  function prevSlide() {
    updateSlider(currentIndex - 1);
  }

  function startAutoplay() {
    stopAutoplay();
    autoplayTimer = setInterval(nextSlide, slideInterval);
  }

  function stopAutoplay() {
    if (autoplayTimer) {
      clearInterval(autoplayTimer);
      autoplayTimer = null;
    }
  }

  // Button Listeners
  if (nextBtn) {
    nextBtn.addEventListener("click", function (e) {
      e.preventDefault();
      nextSlide();
      startAutoplay();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", function (e) {
      e.preventDefault();
      prevSlide();
      startAutoplay();
    });
  }

  // Dot Listeners
  dots.forEach((dot) => {
    dot.addEventListener("click", function (e) {
      e.preventDefault();
      const targetIndex = parseInt(this.getAttribute("data-slide"), 10);
      if (!isNaN(targetIndex)) {
        updateSlider(targetIndex);
        startAutoplay();
      }
    });
  });

  // Pause on hover
  slider.addEventListener("mouseenter", stopAutoplay);
  slider.addEventListener("mouseleave", startAutoplay);

  // Touch Swipe Support
  let touchStartX = 0;
  let touchEndX = 0;

  slider.addEventListener(
    "touchstart",
    function (e) {
      touchStartX = e.changedTouches[0].screenX;
      stopAutoplay();
    },
    { passive: true }
  );

  slider.addEventListener(
    "touchend",
    function (e) {
      touchEndX = e.changedTouches[0].screenX;
      const diffX = touchStartX - touchEndX;
      if (Math.abs(diffX) > 40) {
        if (diffX > 0) {
          nextSlide();
        } else {
          prevSlide();
        }
      }
      startAutoplay();
    },
    { passive: true }
  );

  // Start initial autoplay
  startAutoplay();
});
