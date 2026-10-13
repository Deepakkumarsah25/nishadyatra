const mongoose = require("mongoose");

const kalashYatraSchema = new mongoose.Schema(
  {
    hero: {
      liveBadgeText: { type: String,  },
      headingMain: { type: String,  },
      headingHighlight: { type: String,  },
      subheading: { type: String,  },
      highlights: [{ type: String }],
      primaryBtnText: { type: String,  },
      primaryBtnLink: { type: String,  },
      secondaryBtnText: { type: String,  },
      secondaryBtnLink: { type: String,  },
      stats: [
        {
          number: { type: String, default: "" },
          label: { type: String, default: "" },
          sub: { type: String, default: "" },
        },
      ],
      featuredVideo: {
        title: { type: String,  },
        duration: { type: String,  },
        videoUrl: { type: String,  },
        posterImage: { type: String,  },
        badge: { type: String,  },
      },
    },

    milestonesSection: {
      kicker: { type: String,  },
      title: { type: String,  },
      titleHighlight: { type: String,  },
      subtitle: { type: String,  },
      items: [
        {
          stateKey: { type: String, },
          stateName: { type: String, default: "" },
          district: { type: String, default: "" },
          title: { type: String, default: "" },
          image: { type: String, default: "" },
          description: { type: String, default: "" },
          tag: { type: String, default: "" },
          videoUrl: { type: String, default: "" },
          order: { type: Number, default: 0 },
        },
      ],
    },

    videos: [
      {
        title: { type: String, required: true },
        videoUrl: { type: String, required: true },
        videoPublicId: { type: String, default: "" },
        thumbnail: { type: String, default: "" },
        thumbnailPublicId: { type: String, default: "" },
        personOrPlace: { type: String, default: "" },
        category: {
          type: String,
          enum: ["all", "yatra", "program", "speech", "sankalp"],
          default: "",
        },
        state: { type: String, },
        district: { type: String, default: "" },
        duration: { type: String, },
        viewsCount: { type: String, },
        date: { type: String, default: "" },
        description: { type: String, default: "" },
        tag: { type: String, },
        order: { type: Number, default: 0 },
        isHighlighted: { type: Boolean, default: false },
      },
    ],

    pillarsSection: {
      kicker: { type: String,  },
      title: { type: String,  },
      titleAccent: { type: String,  },
      subtitle: { type: String,  },
      storyCollage: {
        primaryCard: {
          image: { type: String, default: "" },
          badge: { type: String, default: "" },
          title: { type: String, default: "" },
          desc: { type: String, default: "" },
          videoUrl: { type: String, default: "" },
        },
        subCard1: {
          image: { type: String, default: "" },
          tag: { type: String, default: "" },
          title: { type: String, default: "" },
          desc: { type: String, default: "" },
          videoUrl: { type: String, default: "" },
        },
        subCard2: {
          image: { type: String, default: "" },
          tag: { type: String, default: "" },
          title: { type: String, default: "" },
          desc: { type: String, default: "" },
          videoUrl: { type: String, default: "" },
        },
      },
      pillars: [
        {
          number: { type: String, default: "" },
          iconKey: { type: String, default: "water" },
          title: { type: String, default: "" },
          description: { type: String, default: "" },
          order: { type: Number, default: 0 },
        },
      ],
    },

    democraticPledge: {
      enabled: { type: Boolean, default: true },
      badge: { type: String, },
      title: { type: String, },
      subtitle: { type: String, },
      pledgeText: {
        type: String,
        
      },
      signOff: { type: String, },
      keyPoints: [{ type: String }],
      videoUrl: { type: String, default: "" },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("KalashYatra", kalashYatraSchema);
