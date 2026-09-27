/**
 * INDEX.JS - Main Page Interactions and Metric Counter Animation
 */
document.addEventListener("DOMContentLoaded", () => {
  // Bind any open-sidebar links
  const pledgeBtn = document.getElementById("openSidebarPledge");
  const sidebarTrigger = document.getElementById("sidebarTrigger");

  if (pledgeBtn && sidebarTrigger) {
    pledgeBtn.addEventListener("click", (e) => {
      e.preventDefault();
      sidebarTrigger.click();
    });
  }

  // Smooth scroll for all hash links with fixed header offset
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId && targetId !== "#" && targetId !== "#quickActionSidebar") {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          const headerOffset = 70;
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          });
        }
      }
    });
  });
});
