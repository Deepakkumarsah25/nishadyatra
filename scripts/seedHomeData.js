const HeroSlide = require("../models/HeroSlide");
const Initiative = require("../models/Initiative");
const WhyChoose = require("../models/WhyChoose");
const SiteNotice = require("../models/SiteNotice");
const HomeQuickInfo = require("../models/HomeQuickInfo");

const defaultHeroSlides = [
  {
    tag: "National & Social Service",
    badgeText: "Jai Nishadraj • Sacred Consciousness & Empowerment Pledge",
    headingPrefix: "Unity, Self-Respect and",
    highlightText: "a Brighter Future",
    headingSuffix: "A Resolute Step Ahead",
    description:
      "Nishad Sankalp Campaign is an enduring grassroots movement dedicated to organizing every section of our community, empowering youth with quality education and career guidance, and preserving our cultural pride.",
    imageUrl:
      "https://images.unsplash.com/photo-1532375810709-75b1da00537c?auto=format&fit=crop&w=1920&q=85",
    primaryBtnText: "Join Campaign",
    primaryBtnLink: "#quickActionSidebar",
    primaryBtnInitiative: "",
    secondaryBtnText: "Our Key Initiatives",
    secondaryBtnLink: "#what-we-do",
    secondaryBtnInitiative: "",
    order: 1,
    isActive: true,
  },
  {
    tag: "Cultural Heritage",
    badgeText: "Honoring Riverine Culture, Navigation & Riverbanks",
    headingPrefix: "The Flow of Sacred Rivers and",
    highlightText: "Traditional Livelihoods",
    headingSuffix: "Protection & Revival",
    description:
      "Dedicated community movement protecting traditional boating and mining rights for riverine families, distributing modern safety gear, and preserving bank cleanliness.",
    imageUrl:
      "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1920&q=85",
    primaryBtnText: "Join River Conservation Movement",
    primaryBtnLink: "#initiativeAction",
    primaryBtnInitiative: "river-rights",
    secondaryBtnText: "Explore Our Pledges",
    secondaryBtnLink: "#why-choose",
    secondaryBtnInitiative: "",
    order: 2,
    isActive: true,
  },
  {
    tag: "Youth Empowerment",
    badgeText: "Education, Skill Development & Competitive Exam Support",
    headingPrefix: "Every Talented Student Deserves",
    highlightText: "the Right Platform & Mentorship",
    headingSuffix: "",
    description:
      "Free digital libraries, mentorship by senior officers for competitive exams, and direct facilitation of government entrepreneurship schemes.",
    imageUrl:
      "https://images.unsplash.com/photo-1514222134-b57cbb8ce073?auto=format&fit=crop&w=1920&q=85",
    primaryBtnText: "Contact Youth Wing",
    primaryBtnLink: "#initiativeAction",
    primaryBtnInitiative: "youth-wing",
    secondaryBtnText: "Self-Employment Schemes",
    secondaryBtnLink: "#initiativeAction",
    secondaryBtnInitiative: "schemes-info",
    order: 3,
    isActive: true,
  },
];

const defaultInitiatives = [
  {
    key: "social-rights",
    cardTag: "Awakening & Rights",
    title: "Social Unity & Constitutional Rights",
    description:
      "Empowering communities through village forums and grassroots dialogue regarding constitutional rights, welfare schemes, and policy benefits.",
    points: [
      "Legal awareness camps in every village council",
      "Eradication of social evils and superstitions",
    ],
    btnText: "Support or Join",
    modalTag: "Consciousness & Rights Cell",
    modalTitle: "Social Unity & Legal Rights Support",
    modalDescription:
      "An active cell under Nishad Sankalp Campaign providing village-level legal aid camps, ration and pension assistance, and protection of constitutional rights.",
    modalHighlights: [
      "Free resolution of administrative hurdles in government welfare schemes.",
      "Regular organization of legal consultation forums across traditional settlements and ghats.",
      "Collective pledges and awareness campaigns against social evils.",
    ],
    helplineText: "Rights Support: +91 99999 99999",
    helplineTel: "+919999999999",
    formTitle: "Registration for Support & Assistance",
    formSubmitText: "Send Support Request",
    iconKey: "scale",
    order: 1,
    isActive: true,
  },
  {
    key: "youth-wing",
    cardTag: "Education Promotion",
    title: "Educational Support & Youth Mentorship",
    description:
      "Providing scholarship guidance, competitive exam study materials, and higher education counseling to promising students.",
    points: [
      "Establishment of free libraries and study centers",
      "Free mentorship for civil services and technical examinations",
    ],
    btnText: "Contact Youth Wing",
    modalTag: "Education & Youth Cell",
    modalTitle: "Youth Wing Mentorship & Student Aid",
    modalDescription:
      "Specialized mentorship and textbook aid for students preparing for competitive exams (UPSC, UPPSC, SSC, Police, Army, Agniveer).",
    modalHighlights: [
      "Free career counseling led by successful administrative officers and experienced educators.",
      "Access to digital study materials, current affairs compendiums, and test series.",
      "Scholarship coordination for economically underprivileged talented students.",
    ],
    helplineText: "Youth Wing Helpline: +91 99999 99998",
    helplineTel: "+919999999998",
    formTitle: "Student Mentorship Application Form",
    formSubmitText: "Request Mentorship from Youth Wing",
    iconKey: "school",
    order: 2,
    isActive: true,
  },
  {
    key: "schemes-info",
    cardTag: "Economic Self-Reliance",
    title: "Self-Employment & Fisheries Modernization",
    description:
      "Comprehensive assistance for government subsidies and credit for traditional boating, modern aquaculture, biofloc technology, and micro-enterprises.",
    points: [
      "Direct linkage with Pradhan Mantri Matsya Sampada Yojana",
      "Formation and financial empowerment of Self-Help Groups (SHGs)",
    ],
    btnText: "Explore Welfare Schemes",
    modalTag: "Self-Employment & Schemes Center",
    modalTitle: "Fisheries Development & Livelihood Schemes",
    modalDescription:
      "Accurate information and application support for central and state government schemes benefiting boatmen, fishers, and micro-entrepreneurs.",
    modalHighlights: [
      "Pradhan Mantri Matsya Sampada Yojana (PMMSY) - 40% to 60% government grants.",
      "Boatmen Kisan Credit Card (KCC) - Concessional credit facilities.",
      "Formation, registration, and financial management mentorship for Self-Help Groups (SHGs).",
    ],
    helplineText: "Schemes Consultation: +91 99999 99997",
    helplineTel: "+919999999997",
    formTitle: "Scheme Application Support Request",
    formSubmitText: "Request Information & Support",
    iconKey: "trending",
    order: 3,
    isActive: true,
  },
  {
    key: "river-rights",
    cardTag: "Water & Environment",
    title: "River Conservation & Riverbank Rights",
    description:
      "Cleanliness of sacred rivers, ghat safety, and safeguarding traditional boating and customary rights for families dependent on rivers for centuries.",
    points: [
      "Riverbank cleanup drives and public awareness rallies",
      "Safety equipment distribution at ghats and Boatmen Welfare Fund",
    ],
    btnText: "Join the Campaign",
    modalTag: "Water & Riverbank Rights",
    modalTitle: "River Conservation, Ghat Safety & Livelihood Rights",
    modalDescription:
      "A collective initiative ensuring the natural flow of sacred rivers, ghat beautification, and legal safeguarding of boating and customary livelihoods.",
    modalHighlights: [
      "Regular cleanup and safety initiatives across ghats of the Ganga, Yamuna, and tributaries.",
      "Modern life-jackets, safety gear, and emergency rescue training for boatmen.",
      "Legal safeguarding of historic rights in traditional boating and river activities.",
    ],
    helplineText: "River Guard Helpline: +91 99999 99996",
    helplineTel: "+919999999996",
    formTitle: "River Guard / Environment Volunteer Form",
    formSubmitText: "Register Participation",
    iconKey: "water",
    order: 4,
    isActive: true,
  },
  {
    key: "disaster-relief",
    cardTag: "Service & Healthcare",
    title: "Emergency Flood Relief & Health Camps",
    description:
      "Rapid disaster response providing rations, medicine, clean drinking water, and safe boat evacuation during floods and natural crises in riverine villages.",
    points: [
      "24/7 network of rapid response volunteer teams",
      "Free medical checkup camps and medicine distribution in villages",
    ],
    btnText: "Join Relief Team",
    modalTag: "Disaster Service & Relief Wing",
    modalTitle: "Emergency Flood Relief & Health Service Wing",
    modalDescription:
      "Dedicated volunteer network providing food, medicine, clean water, and boat rescue services to flood-affected and low-lying communities.",
    modalHighlights: [
      "24x7 active rapid rescue squad comprising local boatmen and expert swimmers.",
      "Distribution of dry rations, clean drinking water, and tarpaulins to affected families.",
      "Free post-flood medical camps to prevent the spread of waterborne infections.",
    ],
    helplineText: "Emergency Relief: 1800-123-4567 / +91 99999 99995",
    helplineTel: "+919999999995",
    formTitle: "Relief Volunteer / Assistance Request Form",
    formSubmitText: "Join the Relief Team",
    iconKey: "hospital",
    order: 5,
    isActive: true,
  },
  {
    key: "cultural-events",
    cardTag: "Cultural Heritage",
    title: "The Glorious Legacy of Nishadraj Guhya",
    description:
      "Preserving and passing on the historic friendship, supreme sacrifice, and valor of Maharaj Nishadraj Guhya to the next generation.",
    points: [
      "Annual Nishadraj Jayanti and cultural conventions",
      "Felicitation ceremonies for community elders and mentors",
    ],
    btnText: "Cultural Festival Details",
    modalTag: "Cultural Heritage Cell",
    modalTitle: "Cultural Legacy & Nishadraj Jayanti Festival",
    modalDescription:
      "A sacred celebration bringing the glorious saga of Maharaj Nishadraj Guhya, his historic brotherhood with Lord Rama, and the valor of ancestors to every household.",
    modalHighlights: [
      "Annual state-level Nishadraj Jayanti, grand processions, and cultural evenings.",
      "Intellectual seminars and conferences at Shringverpur Dham, Prayagraj, and Kashi.",
      "Felicitation awards for outstanding youth and elders in education, sports, arts, and public service.",
    ],
    helplineText: "Festival Committee Contact: +91 99999 99994",
    helplineTel: "+919999999994",
    formTitle: "Festival Participation / Invitation Request",
    formSubmitText: "Get Festival Details & Invitation",
    iconKey: "flag",
    order: 6,
    isActive: true,
  },
];

const defaultWhyChoose = {
  sectionTag: "Transparency & Commitment",
  sectionTitle: "Why Choose the",
  highlightText: "Nishad Sankalp Campaign?",
  sectionSubtitle:
    "Our objective is not political ambition, but ensuring that education, self-respect, legal protection, and economic progress reach the last person in society.",
  introHeading: "A Foundation Built on Ground Realities & Unwavering Dedication",
  introDesc:
    "Through relentless struggle and dedicated public service, we have earned the lasting trust of our community. Standing by your side at every step is our highest calling.",
  pillars: [
    {
      title: "100% Active Ground Presence",
      description:
        "Solving real issues in person across villages, towns, and ghats instead of paper promises.",
      iconKey: "shield",
      order: 1,
    },
    {
      title: "Selfless & Transparent Leadership",
      description:
        "No hidden agendas; every fund, activity, and decision is undertaken openly in the collective interest of society.",
      iconKey: "users",
      order: 2,
    },
    {
      title: "Proven Impact & Rapid Assistance",
      description:
        "Our volunteers stand directly on the ground for scholarships, administrative hurdles, or legal guidance.",
      iconKey: "check",
      order: 3,
    },
    {
      title: "Cultural Pride with Modern Vision",
      description:
        "Taking pride in sacred values and traditions while preparing future generations in science, technology, and competitive excellence.",
      iconKey: "award",
      order: 4,
    },
  ],
  quoteText:
    "When each hand in the community joins together in purpose, the course of history transforms. Nishad Sankalp Campaign is your voice.",
  pledgePoints: [
    "Free membership and transparent community participation",
    "Direct outreach meetings at the village and block levels",
    "Personalized guidance and mentorship for students and youth",
    "Immediate volunteer response teams during crises and emergencies",
  ],
  pledgeBtnText: "Take the Pledge Today",
  pledgeBtnLink: "#quickActionSidebar",
};

const defaultNotices = [
  {
    title: "Youth Guidance Camp: Free support sessions for competitive examinations.",
    dateText: "September 28, 2026",
    link: "",
    order: 1,
    isActive: true,
  },
  {
    title: "Launch of Phase 2 of the Ganga Riverbank Cleanliness & Community Outreach Journey.",
    dateText: "October 02, 2026",
    link: "",
    order: 2,
    isActive: true,
  },
];

const defaultQuickInfo = {
  sidebarTitle: "Nishad Sankalp Campaign",
  sidebarSubtitle: "Quick Service & Support Center",
  pledgeBoxTitle: "Join the Campaign by Taking a Pledge",
  pledgeBoxDesc:
    "Register your online pledge for the upliftment and empowerment of our community.",
  helplineText: "Helpline: +91 99999 99999",
  helplineTel: "+919999999999",
  email: "info@nishadsankalp.org",
  sidebarFooterText: "Public service is our true pledge",
};

const seedHomeData = async () => {
  try {
    // 1. Hero Slides
    const heroCount = await HeroSlide.countDocuments();
    if (heroCount === 0) {
      await HeroSlide.insertMany(defaultHeroSlides);
    }

    // 2. Initiatives
    const initiativeCount = await Initiative.countDocuments();
    if (initiativeCount === 0) {
      await Initiative.insertMany(defaultInitiatives);
    }

    // 3. Why Choose Us
    const whyChooseCount = await WhyChoose.countDocuments();
    if (whyChooseCount === 0) {
      await WhyChoose.create(defaultWhyChoose);
    }

    // 4. Site Notices
    const noticeCount = await SiteNotice.countDocuments();
    if (noticeCount === 0) {
      await SiteNotice.insertMany(defaultNotices);
    }

    // 5. Quick Info
    const quickInfoCount = await HomeQuickInfo.countDocuments();
    if (quickInfoCount === 0) {
      await HomeQuickInfo.create(defaultQuickInfo);
    }
  } catch (err) {
    console.error("Home data seed error:", err.message);
  }
};

module.exports = {
  seedHomeData,
  defaultHeroSlides,
  defaultInitiatives,
  defaultWhyChoose,
  defaultNotices,
  defaultQuickInfo,
};
