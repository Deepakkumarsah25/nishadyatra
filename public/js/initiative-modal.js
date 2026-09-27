/**
 * INITIATIVE-MODAL.JS - Handles Dynamic Actions for What-We-Do Cards
 */
document.addEventListener("DOMContentLoaded", () => {
  // Modal Data Dictionary for all 6 initiatives
  const initiativeData = {
    "social-rights": {
      tag: "चेतना व जागरण प्रकोष्ठ",
      title: "सामाजिक एकता व विधिक अधिकार सहयोग",
      description: "निषाद संकल्प अभियान के अंतर्गत ग्राम स्तर पर विधिक सहायता शिविर, राशन व पेंशन लाभ, और संवैधानिक अधिकारों की सुरक्षा हेतु सक्रिय प्रकोष्ठ।",
      highlights: [
        "सरकारी योजनाओं और अनुलाभों में प्रशासनिक अड़चनों का निःशुल्क समाधान।",
        "पारंपरिक बस्तियों व घाटों पर विधिक परामर्श चौपाल का नियमित आयोजन।",
        "समाजिक कुरीतियों के विरुद्ध सामूहिक संकल्प व चेतना अभियान।"
      ],
      helplineText: "अधिकार सहायता: +91 99999 99999",
      helplineTel: "+919999999999",
      formTitle: "सहयोग अथवा समस्या निवारण हेतु पंजीकरण",
      formSubmitText: "सहयोग अनुरोध भेजें"
    },

    "youth-wing": {
      tag: "शिक्षा व युवा प्रकोष्ठ",
      title: "युवा विंग मार्गदर्शन एवं छात्र सहायता",
      description: "प्रतियोगी परीक्षाओं (UPSC, UPPSC, SSC, Police, Army, Agniveer) की तैयारी कर रहे छात्र-छात्राओं के लिए विशेष मेंटरशिप और पुस्तक सहायता।",
      highlights: [
        "सफल अधिकारियों व अनुभवी शिक्षकों द्वारा निःशुल्क करियर काउंसलिंग।",
        "डिजिटल स्टडी मटेरियल, करंट अफेयर्स और टेस्ट सीरीज़ की सुविधा।",
        "आर्थिक रूप से कमजोर मेधावी विद्यार्थियों के लिए छात्रवृत्ति समन्वय।"
      ],
      helplineText: "युवा विंग हेल्पलाइन: +91 99999 99998",
      helplineTel: "+919999999998",
      formTitle: "विद्यार्थी मार्गदर्शन आवेदन फॉर्म",
      formSubmitText: "युवा विंग से मार्गदर्शन प्राप्त करें"
    },

    "schemes-info": {
      tag: "स्वरोजगार व योजना केंद्र",
      title: "मत्स्य संपदा व स्वरोजगार योजनाएं",
      description: "केंद्र व राज्य सरकार द्वारा नाविकों, मत्स्य पालकों और लघु उद्यमियों के लिए संचालित सभी कल्याणकारी योजनाओं की सटीक जानकारी व आवेदन सहयोग।",
      highlights: [
        "प्रधानमंत्री मत्स्य संपदा योजना (PMMSY) - 40% से 60% तक सरकारी अनुदान।",
        "नाविक किसान क्रेडिट कार्ड (KCC) - रियायती ब्याज दर पर ऋण सुविधा।",
        "स्वयं सहायता समूहों (SHG) का गठन, रजिस्ट्रेशन एवं वित्तीय मार्गदर्शन।"
      ],
      helplineText: "योजना परामर्श: +91 99999 99997",
      helplineTel: "+919999999997",
      formTitle: "योजना आवेदन सहायता अनुरोध",
      formSubmitText: "योजना जानकारी व सहयोग मांगें"
    },

    "river-rights": {
      tag: "जल व तटवर्ती अधिकार",
      title: "नदी संरक्षण, घाट सुरक्षा व आजीविका अधिकार",
      description: "पवित्र नदियों की अविरलता, घाटों के सौंदर्यीकरण और पारंपरिक नदी तटीय परिवारों के नौकायन व आजीविका अधिकारों के संरक्षण का सामूहिक अभियान।",
      highlights: [
        "गंगा, यमुना और सहायक नदियों के घाटों पर नियमित स्वच्छता व सुरक्षा अभियान।",
        "नाविक बंधुओं के लिए आधुनिक लाइफ-जैकेट, सुरक्षा किट व आपातकालीन प्रशिक्षण।",
        "पारंपरिक नौकायन व मछली पकड़ने के ऐतिहासिक अधिकारों की कानूनी सुरक्षा।"
      ],
      helplineText: "नदी प्रहरी हेल्पलाइन: +91 99999 99996",
      helplineTel: "+919999999996",
      formTitle: "नदी प्रहरी / पर्यावरण मित्र स्वयंसेवक फॉर्म",
      formSubmitText: "अभियान में सहभागिता दर्ज करें"
    },

    "disaster-relief": {
      tag: "आपदा सेवा व राहत दल",
      title: "आपातकालीन बाढ़ राहत व स्वास्थ्य सेवा दल",
      description: "नदी तटवर्ती एवं निचले क्षेत्रों में बाढ़ अथवा आकस्मिक संकट के समय भोजन, दवा, स्वच्छ जल और नावों द्वारा सुरक्षित बचाव कार्य का विशेष स्वयंसेवक नेटवर्क।",
      highlights: [
        "24x7 सक्रिय स्थानीय नाविक व तैराक स्वयंसेवकों का त्वरित बचाव दस्ता।",
        "बाढ़ प्रभावित परिवारों को सूखा राशन, शुद्ध जल व तिरपाल वितरण।",
        "बाढ़ के पश्चात संक्रामक रोगों से बचाव हेतु निःशुल्क मेडिकल चेकअप कैंप।"
      ],
      helplineText: "आपातकालीन राहत: 1800-123-4567 / +91 99999 99995",
      helplineTel: "+919999999995",
      formTitle: "राहत स्वयंसेवक / सहायता अनुरोध फॉर्म",
      formSubmitText: "राहत दल में शामिल हों"
    },

    "cultural-events": {
      tag: "सांस्कृतिक गौरव प्रकोष्ठ",
      title: "सांस्कृतिक धरोहर एवं निषादराज जयंती महोत्सव",
      description: "महाराज निषादराज गुह्य जी की गौरवशाली गाथा, ऐतिहासिक मित्रता और समाज के महापुरुषों के त्याग व शौर्य को जन-जन तक पहुंचाने का पावन उत्सव।",
      highlights: [
        "वार्षिक राज्यस्तरीय निषादराज जयंती, भव्य शोभायात्रा व सांस्कृतिक संध्या।",
        "श्रृंगवेरपुर धाम, प्रयागराज व काशी में विचार गोष्ठियां व सम्मेलन।",
        "शिक्षा, खेल, कला और समाजसेवा में उत्कृष्ट युवाओं व वरिष्ठों का सम्मान समारोह।"
      ],
      helplineText: "उत्सव समिति संपर्क: +91 99999 99994",
      helplineTel: "+919999999994",
      formTitle: "उत्सव में भागीदारी / आमंत्रण अनुरोध",
      formSubmitText: "उत्सव विवरण व आमंत्रण पाएं"
    }
  };

  // DOM Elements
  const backdrop = document.getElementById("initiativeModalBackdrop");
  const closeBtn = document.getElementById("initiativeModalClose");
  const categoryTag = document.getElementById("modalCategoryTag");
  const modalTitle = document.getElementById("modalTitle");
  const modalDesc = document.getElementById("modalDesc");
  const highlightsList = document.getElementById("modalHighlightsList");
  const helplineBtn = document.getElementById("modalHelplineBtn");
  const helplineText = document.getElementById("modalHelplineText");
  const formTitle = document.getElementById("modalFormTitle");
  const submitBtnText = document.getElementById("modalSubmitBtnText");
  const initiativeForm = document.getElementById("initiativeActionForm");
  const successBanner = document.getElementById("modalSuccessBanner");
  const initiativeCategoryInput = document.getElementById("initiativeCategoryInput");

  function openInitiativeModal(initiativeKey) {
    const data = (window.INITIATIVES_DATA && window.INITIATIVES_DATA[initiativeKey]) || initiativeData[initiativeKey];
    if (!data || !backdrop) return;

    // Reset previous form state
    if (initiativeForm) {
      initiativeForm.reset();
      initiativeForm.style.display = "block";
    }
    if (successBanner) {
      successBanner.style.display = "none";
    }

    // Populate data
    if (categoryTag) categoryTag.textContent = data.tag;
    if (modalTitle) modalTitle.textContent = data.title;
    if (modalDesc) modalDesc.textContent = data.description;
    if (formTitle) formTitle.textContent = data.formTitle;
    if (submitBtnText) submitBtnText.textContent = data.formSubmitText;
    if (initiativeCategoryInput) initiativeCategoryInput.value = data.title;

    if (helplineBtn && helplineText) {
      helplineBtn.setAttribute("href", `tel:${data.helplineTel}`);
      helplineText.textContent = data.helplineText;
    }

    // Populate highlights
    if (highlightsList) {
      highlightsList.innerHTML = "";
      data.highlights.forEach((point) => {
        const li = document.createElement("li");
        li.className = "modal-highlight-item";
        li.innerHTML = `
          <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
          <span>${point}</span>
        `;
        highlightsList.appendChild(li);
      });
    }

    // Show modal
    backdrop.classList.add("active");
    backdrop.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeInitiativeModal() {
    if (!backdrop) return;
    backdrop.classList.remove("active");
    backdrop.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  // Attach click listeners to all buttons having data-initiative
  document.querySelectorAll("[data-initiative]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const initiativeKey = btn.getAttribute("data-initiative");
      openInitiativeModal(initiativeKey);
    });
  });

  // Close handlers
  if (closeBtn) closeBtn.addEventListener("click", closeInitiativeModal);
  if (backdrop) {
    backdrop.addEventListener("click", (e) => {
      if (e.target === backdrop) {
        closeInitiativeModal();
      }
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && backdrop && backdrop.classList.contains("active")) {
      closeInitiativeModal();
    }
  });

  // Handle Form Submission
  if (initiativeForm) {
    initiativeForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const submitBtn = initiativeForm.querySelector("button[type='submit']");
      const name = document.getElementById("modalUserName")?.value;
      const phone = document.getElementById("modalUserPhone")?.value;
      const district = document.getElementById("modalUserDistrict")?.value;
      const category = initiativeCategoryInput?.value || "पहल सहायता";
      const message = document.getElementById("modalUserMessage")?.value;

      if (submitBtn) {
        submitBtn.disabled = true;
        const origText = submitBtn.innerHTML;
        submitBtn.innerHTML = `<span>जमा हो रहा है...</span>`;

        try {
          const res = await fetch("/api/submit-inquiry", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, phone, district, category, message }),
          });
          const data = await res.json();
          if (data.success) {
            initiativeForm.style.display = "none";
            if (successBanner) {
              successBanner.textContent = "✓ " + (data.message || "आपका अनुरोध और विवरण सफलतापूर्वक दर्ज कर लिया गया है।");
              successBanner.style.display = "block";
            }
          } else {
            alert(data.message || "त्रुटि हुई। कृपया पुनः प्रयास करें।");
          }
        } catch (err) {
          console.error(err);
          initiativeForm.style.display = "none";
          if (successBanner) successBanner.style.display = "block";
        } finally {
          submitBtn.disabled = false;
          submitBtn.innerHTML = origText;
        }
      }
    });
  }
});
