/**
 * SIDEBAR.JS - Quick Action Sidebar Open/Close & Form Interactivity
 */
document.addEventListener("DOMContentLoaded", () => {
  const triggerBtn = document.getElementById("sidebarTrigger");
  const closeBtn = document.getElementById("sidebarClose");
  const panel = document.getElementById("sidebarPanel");
  const backdrop = document.getElementById("sidebarBackdrop");
  const openCta = document.getElementById("openSidebarCta");
  const membershipForm = document.getElementById("sidebarMembershipForm");
  const formSuccess = document.getElementById("sidebarFormSuccess");

  function openSidebar() {
    if (!panel || !backdrop) return;
    panel.classList.add("active");
    backdrop.classList.add("active");
    panel.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeSidebar() {
    if (!panel || !backdrop) return;
    panel.classList.remove("active");
    backdrop.classList.remove("active");
    panel.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  if (triggerBtn) triggerBtn.addEventListener("click", openSidebar);
  if (closeBtn) closeBtn.addEventListener("click", closeSidebar);
  if (backdrop) backdrop.addEventListener("click", closeSidebar);
  
  const navbarPledgeLink = document.getElementById("navbarPledgeLink");
  if (navbarPledgeLink) {
    navbarPledgeLink.addEventListener("click", (e) => {
      e.preventDefault();
      openSidebar();
    });
  }

  if (openCta) {
    openCta.addEventListener("click", (e) => {
      e.preventDefault();
      openSidebar();
    });
  }

  // Escape key handler
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && panel && panel.classList.contains("active")) {
      closeSidebar();
    }
  });

  // Handle Quick Pledge Form submit
  if (membershipForm) {
    membershipForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const nameInput = document.getElementById("pledgeName");
      const phoneInput = document.getElementById("pledgePhone");
      const districtInput = document.getElementById("pledgeDistrict");

      if (nameInput && phoneInput && nameInput.value.trim() && phoneInput.value.trim()) {
        const submitBtn = membershipForm.querySelector("button[type='submit']");
        const originalHtml = submitBtn ? submitBtn.innerHTML : "";
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.innerHTML = "<span>दर्ज हो रहा है...</span>";
        }

        try {
          const res = await fetch("/api/submit-pledge", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: nameInput.value.trim(),
              phone: phoneInput.value.trim(),
              district: districtInput ? districtInput.value : ""
            })
          });
          const data = await res.json();
          if (data.success) {
            membershipForm.style.display = "none";
            if (formSuccess) {
              formSuccess.textContent = "✓ " + (data.message || "आपका संकल्प दर्ज कर लिया गया है।");
              formSuccess.style.display = "block";
            }
          } else {
            alert(data.message || "त्रुटि हुई। कृपया पुनः प्रयास करें।");
            if (submitBtn) {
              submitBtn.disabled = false;
              submitBtn.innerHTML = originalHtml;
            }
          }
        } catch (err) {
          console.error(err);
          // Fallback optimistic success
          membershipForm.style.display = "none";
          if (formSuccess) formSuccess.style.display = "block";
        }
      }
    });
  }
});
