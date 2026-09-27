const burger = document.getElementById("burgerBtn");
const navLinks = document.getElementById("navLinks");
const drawerOverlay = document.getElementById("drawerOverlay");

let scrollPosition = 0;


// =========================================
// OPEN DRAWER
// =========================================

function openDrawer() {

  // Current scroll position save
  scrollPosition = window.scrollY;

  navLinks.classList.add("open");

  drawerOverlay.classList.add("open");

  burger.classList.add("open");

  burger.setAttribute(
    "aria-expanded",
    "true"
  );


  // Complete page lock
  document.documentElement.style.overflow = "hidden";

  document.body.style.position = "fixed";

  document.body.style.top =
    `-${scrollPosition}px`;

  document.body.style.left = "0";

  document.body.style.right = "0";

  document.body.style.width = "100%";

  document.body.style.overflow = "hidden";
}


// =========================================
// CLOSE DRAWER
// =========================================

function closeDrawer() {

  navLinks.classList.remove("open");

  drawerOverlay.classList.remove("open");

  burger.classList.remove("open");

  burger.setAttribute(
    "aria-expanded",
    "false"
  );


  // Unlock page
  document.documentElement.style.overflow = "";

  document.body.style.position = "";

  document.body.style.top = "";

  document.body.style.left = "";

  document.body.style.right = "";

  document.body.style.width = "";

  document.body.style.overflow = "";


  // Return to previous position
  window.scrollTo(
    0,
    scrollPosition
  );
}


// =========================================
// HAMBURGER
// =========================================

burger.addEventListener("click", () => {

  if (
    navLinks.classList.contains("open")
  ) {

    closeDrawer();

  } else {

    openDrawer();

  }

});


// =========================================
// OVERLAY
// =========================================

drawerOverlay.addEventListener(
  "click",
  closeDrawer
);


// =========================================
// MENU LINK
// =========================================

navLinks
  .querySelectorAll("a")
  .forEach((link) => {

    link.addEventListener(
      "click",
      closeDrawer
    );

  });


// =========================================
// ESC KEY
// =========================================

document.addEventListener(
  "keydown",
  (event) => {

    if (
      event.key === "Escape" &&
      navLinks.classList.contains("open")
    ) {

      closeDrawer();

    }

  }
);