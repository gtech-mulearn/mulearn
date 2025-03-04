import React from "react";
import {
    MdDashboard,
  MdLayers,
  MdShoppingCart,
  MdWeb,
  MdSmartphone,
  MdTouchApp,
  MdBrush,
  MdDevices
} from "react-icons/md";

const levelsDataUIUX = [
    {
        "level": 4,
        "title": "Level 4",
        "subtitle": "Master UI Fundamentals with Figma",
        "leveller": {
          "id": "4-4",
          "title": "Design an E-commerce Product Page",
          "desc": "Create an e-commerce product page focusing on UI best practices.",
          "brief": "Include product images, pricing, description, and a prominent 'Add to Cart' button.",
          "ig": "E-commerce UI",
          "icon": <MdShoppingCart />,
          "skills": ["E-commerce UI", "UX Writing", "Visual Hierarchy"],
          "publishedBy": "Community",
          "publishedWhen": "2/26/25, 10:30 AM",
          "prerequisites": ["Basic UI Design"],
          "resources": ["https://www.behance.net/"]
        },
        "cards": [
          {
            "id": "4-1",
            "title": "Redesign a Mobile Login Screen",
            "desc": "Create a visually appealing and user-friendly login screen for a mobile app.",
            "brief": "Design a mobile login screen with dark and light modes. Submit a Figma file with your design.",
            "ig": "UI Design",
            "icon": <MdBrush />,
            "skills": ["UI Design", "Typography", "Color Theory"],
            "publishedBy": "Community",
            "publishedWhen": "2/26/25, 10:00 AM",
            "prerequisites": ["Basic knowledge of Figma"],
            "resources": ["https://www.figma.com/"]
          },
          {
            "id": "4-2",
            "title": "Create a Wireframe for a Social Media App",
            "desc": "Design a low-fidelity wireframe for a new social media app.",
            "brief": "Use Figma to design a wireframe with at least 5 key screens (e.g., login, home, profile, messages).",
            "ig": "Wireframing",
            "icon": <MdDevices />,
            "skills": ["Wireframing", "User Flow"],
            "publishedBy": "Community",
            "publishedWhen": "2/26/25, 10:10 AM",
            "prerequisites": ["Basic UI/UX concepts"],
            "resources": ["https://www.smashingmagazine.com/"]
          },
          {
            "id": "4-3",
            "title": "Design a Landing Page for a Startup",
            "desc": "Create an engaging landing page with a call-to-action.",
            "brief": "Design a visually appealing landing page for a startup, including a hero section, testimonials, and CTA button.",
            "ig": "Web UI",
            "icon": <MdWeb />,
            "skills": ["Wireframing", "Layout Design", "CTA Optimization"],
            "publishedBy": "Community",
            "publishedWhen": "2/26/25, 10:20 AM",
            "prerequisites": ["Basic Figma knowledge"],
            "resources": ["https://www.awwwards.com/"]
          },
          {
            "id": "4-4",
            "title": "Design an E-commerce Product Page",
            "desc": "Create an e-commerce product page focusing on UI best practices.",
            "brief": "Include product images, pricing, description, and a prominent 'Add to Cart' button.",
            "ig": "E-commerce UI",
            "icon": <MdShoppingCart />,
            "skills": ["E-commerce UI", "UX Writing", "Visual Hierarchy"],
            "publishedBy": "Community",
            "publishedWhen": "2/26/25, 10:30 AM",
            "prerequisites": ["Basic UI Design"],
            "resources": ["https://www.behance.net/"]
          }
        ]
      },
      {
        "level": 5,
        "title": "Level 5",
        "subtitle": "Build Complex UI Components",
        "leveller": {
          "id": "4-4",
          "title": "Design an E-commerce Product Page",
          "desc": "Create an e-commerce product page focusing on UI best practices.",
          "brief": "Include product images, pricing, description, and a prominent 'Add to Cart' button.",
          "ig": "E-commerce UI",
          "icon": <MdShoppingCart />,
          "skills": ["E-commerce UI", "UX Writing", "Visual Hierarchy"],
          "publishedBy": "Community",
          "publishedWhen": "2/26/25, 10:30 AM",
          "prerequisites": ["Basic UI Design"],
          "resources": ["https://www.behance.net/"]
        },
        "cards": [
          {
            "id": "5-1",
            "title": "Create a Design System in Figma",
            "desc": "Develop a reusable design system with typography, colors, and components.",
            "brief": "Create a scalable design system including typography, button styles, and form components.",
            "ig": "UI Systems",
            "icon": <MdLayers />,
            "skills": ["Design Systems", "Component Libraries", "Scalability"],
            "publishedBy": "Community",
            "publishedWhen": "2/26/25, 10:50 AM",
            "prerequisites": ["Intermediate Figma knowledge"],
            "resources": ["https://www.designsystems.com/"]
          },
          {
            "id": "5-2",
            "title": "Design a Dashboard UI",
            "desc": "Create a data visualization dashboard for a SaaS platform.",
            "brief": "Focus on data presentation, widgets, and UI consistency.",
            "ig": "Dashboard UI",
            "icon": <MdDashboard />,
            "skills": ["Data Visualization", "UI Layout"],
            "publishedBy": "Community",
            "publishedWhen": "2/26/25, 11:00 AM",
            "prerequisites": ["Intermediate UI Design"],
            "resources": ["https://www.behance.net/"]
          }
        ]
      },
      {
        "level": 6,
        "title": "Level 6",
        "subtitle": "Create Advanced Prototypes and Interactions",
        "leveller": {
          "id": "4-4",
          "title": "Design an E-commerce Product Page",
          "desc": "Create an e-commerce product page focusing on UI best practices.",
          "brief": "Include product images, pricing, description, and a prominent 'Add to Cart' button.",
          "ig": "E-commerce UI",
          "icon": <MdShoppingCart />,
          "skills": ["E-commerce UI", "UX Writing", "Visual Hierarchy"],
          "publishedBy": "Community",
          "publishedWhen": "2/26/25, 10:30 AM",
          "prerequisites": ["Basic UI Design"],
          "resources": ["https://www.behance.net/"]
        },
        "cards": [
          {
            "id": "6-1",
            "title": "Build a Fully Interactive Prototype",
            "desc": "Create a working prototype with micro-interactions and animations.",
            "brief": "Develop an interactive prototype using Figma's advanced prototyping tools.",
            "ig": "UX Prototyping",
            "icon": <MdSmartphone />,
            "skills": ["Prototyping", "User Testing", "Micro-interactions"],
            "publishedBy": "Community",
            "publishedWhen": "2/26/25, 11:10 AM",
            "prerequisites": ["Advanced Figma knowledge"],
            "resources": ["https://www.uxtools.co/"]
          },
          {
            "id": "6-2",
            "title": "Design a Gesture-Based Mobile App",
            "desc": "Create a UI prototype that uses swipe, tap, and drag interactions.",
            "brief": "Use Figma's interactive tools to develop a mobile UI with gesture-based interactions.",
            "ig": "Gesture UI",
            "icon": <MdTouchApp />,
            "skills": ["Mobile UI", "Prototyping"],
            "publishedBy": "Community",
            "publishedWhen": "2/26/25, 11:20 AM",
            "prerequisites": ["UX Interactions"],
            "resources": ["https://www.interaction-design.org/"]
          }
        ]
      }
];

export default levelsDataUIUX;
