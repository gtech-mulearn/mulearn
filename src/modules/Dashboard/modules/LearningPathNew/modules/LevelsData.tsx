import React from "react";
import {
  MdVideoLibrary,
  MdDesignServices,
  MdOutlineColorLens,
  MdOutlineComputer,
  MdShoppingCart,
  MdBrush,
  MdDevices,
  MdWeb,
  MdLayers,
  MdDashboard,
  MdSmartphone,
  MdTouchApp,
} from "react-icons/md";

const levelsData = [
  {
    level: 1,
    title: "Level 1",
    subtitle: "Fundamentals and OnBoarding",
    cards: [
      {
        id: "1-1",
        title: "Explore Discord with Lucia!",
        desc: "Earn 100 Karma Points",
        brief:
          "Welcome to your first adventure on our μLearn Discord server! Jump into the lobby, type /intro, and follow Lucia's guided steps. Once complete, share your certificate image with #ge-discord-guide to earn 100 karma points.",
        hashtag: "#ge-discord-guide", // Matches API: "task_name": "Discord Guide", "hashtag": "#ge-discord-guide"
        ig: "Discord Onboarding",
        icon: <MdVideoLibrary />,
        skills: ["Navigation", "Interaction", "Engagement"],
        publishedBy: "Deepu S Nath",
        publishedWhen: "4/29/24, 6:01 PM",
        prerequisites: ["Discord account", "Basic familiarity with Discord"],
        resources: ["https://discord.com/invite/yourserver"],
      },
      {
        id: "1-2",
        title: "Self Introduction",
        desc: "Earn 20 Karma Points",
        brief:
          "Update your profile picture, go to the self-introduction channel, and post a message starting with #ge-self-intro. Share a brief introduction about yourself and earn 20 karma points.",
        hashtag: "#ge-self-intro", // Matches API: "task_name": "Self Introduction", "hashtag": "#ge-self-intro"
        ig: "Community Engagement",
        icon: <MdDesignServices />,
        skills: ["Communication", "Storytelling"],
        publishedBy: "Admin",
        publishedWhen: "4/29/24, 6:05 PM",
        prerequisites: ["None"],
        resources: ["https://mulearn.io/self-introduction-guide"],
      },
    ],
  },
  {
    level: 2,
    title: "Level 2",
    subtitle: "Practice GRIT and Keep Going",
    leveller: {
      id: "2-5",
      title: "Python through Snakify",
      desc: "Learn Python by completing modules on Snakify.",
      brief:
        "Level up your Python skills by completing modules on Snakify. Share your progress screenshots with hashtags #ge-snakify-6 and #ge-snakify-11 to earn 400 Karma Points in total.",
      hashtag: "#ge-snakify-6", // Matches API: "task_name": "Python through Snakify 1", "hashtag": "#ge-snakify-6"
      ig: "Python Course",
      icon: <MdVideoLibrary />,
      skills: ["Python", "Problem Solving", "Learning"],
      publishedBy: "Aaronchettan",
      publishedWhen: "6/11/24, 1:38 AM",
      prerequisites: ["Basic computer literacy"],
      resources: ["https://snakify.org/"],
    },
    cards: [
      {
        id: "2-1",
        title: "Tell the World",
        desc: "Write a blogpost sharing your unique voice and life experiences.",
        brief:
          "In this task, you will write a blogpost (at least 400 words) showcasing your personal experiences or projects. Publish your blog on your preferred platform and share the link with the hashtag #ge-my-blog to earn 200 Karma Points.",
        hashtag: "#ge-my-blog", // Matches API: "task_name": "Tell the World", "hashtag": "#ge-my-blog"
        ig: "Community Engagement",
        icon: <MdVideoLibrary />,
        skills: ["Blog Writing", "Content Creation", "Storytelling"],
        publishedBy: "Aaronchettan",
        publishedWhen: "6/11/24, 1:11 AM",
        prerequisites: ["Basic writing skills"],
        resources: ["https://www.youtube.com/watch?v=ikFb9OLCKVY"],
      },
      {
        id: "2-2",
        title: "Find Better",
        desc: "Evaluate a product or service and provide improvement suggestions.",
        brief:
          "Select a product, evaluate its user satisfaction, and document 4 observations along with 2 improvement solutions. Post your presentation (minimum 8 slides) with the hashtag #ge-find-better to earn 200 Karma Points.",
        hashtag: "#ge-find-better", // Matches API: "task_name": "Find Better", "hashtag": "#ge-find-better"
        ig: "Product Evaluation",
        icon: <MdDesignServices />,
        skills: ["Observation", "Critical Thinking", "Presentation"],
        publishedBy: "Aaronchettan",
        publishedWhen: "6/11/24, 1:28 AM",
        prerequisites: ["Analytical skills"],
        resources: ["https://mulearn.org/r/find-better-template"],
      },
      {
        id: "2-3",
        title: "Keyboard Mastery",
        desc: "Improve your typing speed with a series of challenges.",
        brief:
          "Participate in the typing challenge in 4 stages (126, 285, 460, and 685 lessons). Post a screenshot with the appropriate hashtag for each stage to earn a total of 800 Karma Points (200 per stage).",
        hashtag: "#ge-typing-challenge-126", // Matches API: "task_name": "Typing Challenge", "hashtag": "#ge-typing-challenge-126" (first stage)
        ig: "Typing Challenge",
        icon: <MdVideoLibrary />,
        skills: ["Typing", "Focus", "Stamina", "Consistency"],
        publishedBy: "Aaronchettan",
        publishedWhen: "6/11/24, 1:38 AM",
        prerequisites: ["Basic keyboard familiarity"],
        resources: ["https://learn.mulearn.org/challenge/typing"],
      },
      {
        id: "2-4",
        title: "30 days of Coding",
        desc: "Complete a 30-day coding challenge and document your progress.",
        brief:
          "Embark on a 30-day coding challenge. Share your progress after 15 days and again after 30 days by posting your profile URL and screenshot with hashtags #ge-30-days-coding15 and #ge-30-days-coding30, earning 400 Karma Points in total.",
        hashtag: "#ge-30-days-coding15", // Matches API: "task_name": "30 days of Coding", "hashtag": "#ge-30-days-coding15" (first part)
        ig: "Coding Challenge",
        icon: <MdDesignServices />,
        skills: ["Coding", "Persistence", "Problem Solving"],
        publishedBy: "Aaronchettan",
        publishedWhen: "6/11/24, 1:52 AM",
        prerequisites: ["Basic programming knowledge"],
        resources: ["https://www.hackerrank.com/domains/tutorials/30-days-of-code"],
      },
      {
        id: "2-5",
        title: "Python through Snakify",
        desc: "Learn Python by completing modules on Snakify.",
        brief:
          "Level up your Python skills by completing modules on Snakify. Share your progress screenshots with hashtags #ge-snakify-6 and #ge-snakify-11 to earn 400 Karma Points in total.",
        hashtag: "#ge-snakify-6", // Matches API: "task_name": "Python through Snakify 1", "hashtag": "#ge-snakify-6"
        ig: "Python Course",
        icon: <MdVideoLibrary />,
        skills: ["Python", "Problem Solving", "Learning"],
        publishedBy: "Aaronchettan",
        publishedWhen: "6/11/24, 1:38 AM",
        prerequisites: ["Basic computer literacy"],
        resources: ["https://snakify.org/"],
      },
      {
        id: "2-6",
        title: "DWMS Muid Connect",
        desc: "Connect your muid with your DWMS account.",
        brief:
          "Follow the steps in the provided link to connect your muid with your Digital Workspace Management System. Post your screenshot with #dwms-muconnect to earn 100 Karma Points.",
        hashtag: "#dwms-muconnect", // From brief, no direct API match
        ig: "Account Integration",
        icon: <MdDesignServices />,
        skills: ["Technical Setup", "Troubleshooting"],
        publishedBy: "Aaronchettan",
        publishedWhen: "7/6/24, 5:41 PM",
        prerequisites: ["Access to DWMS and muid"],
        resources: [
          "https://ginger-marble-4c3.notion.site/DWMS-MuID-Connect-5a529107cdce4f9c982abc65b4e50702",
        ],
      },
    ],
  },
  {
    level: 3,
    title: "Level 3",
    subtitle: "Advanced Skills",
    leveller: {
      id: "3-15",
      title: "Mobile Game Deconstruction",
      desc: "Earn 200 Karma Points",
      brief:
        "Select a mobile game, deconstruct its core mechanics and design, and create a 10-slide presentation. Share your presentation with #ge-game-deconstruction to earn 200 Karma Points.",
      hashtag: "#ge-game-deconstruction", // Matches API: "task_name": "Mobile Game Deconstruction", "hashtag": "#ge-game-deconstruction"
      ig: "General Enablement",
      icon: <MdOutlineColorLens />,
      skills: ["Game Analysis", "Presentation"],
      publishedBy: "Shaheen Hyder",
      publishedWhen: "8/27/24, 11:39 PM",
      prerequisites: ["Basic game knowledge"],
      resources: ["https://departmentofplay.net/guide-how-to-deconstruct/"],
    },
    cards: [
      {
        id: "3-1",
        title: "GitHub Basics",
        desc: "Earn 200 Karma Points",
        brief:
          "Learn basic functions and features of GitHub, including forking and pull requests. Share your Pull Request URL with #ge-intro-to-github to earn 200 Karma Points.",
        hashtag: "#ge-intro-to-github", // Matches API: "task_name": "Introduction to GitHub", "hashtag": "#ge-intro-to-github"
        ig: "General Enablement",
        icon: <MdVideoLibrary />,
        skills: ["GitHub", "Version Control", "Collaboration"],
        publishedBy: "Shaheen Hyder",
        publishedWhen: "6/7/23, 12:29 AM",
        prerequisites: ["None"],
        resources: ["https://github.com/gtech-mulearn/Github-Enablment-Task#readme"],
      },
      {
        id: "3-2",
        title: "Introduction to Markdown",
        desc: "Earn 200 Karma Points",
        brief:
          "Learn how to communicate effectively using Markdown. Post your repository URL with #ge-intro-to-markdown to earn 200 Karma Points.",
        hashtag: "#ge-intro-to-markdown", // Matches API: "task_name": "Introduction to Markdown", "hashtag": "#ge-intro-to-markdown"
        ig: "General Enablement",
        icon: <MdDesignServices />,
        skills: ["Markdown", "Text Formatting"],
        publishedBy: "Shaheen Hyder",
        publishedWhen: "6/7/23, 1:14 AM",
        prerequisites: ["None"],
        resources: ["https://learn.mulearn.org/challenge/intro-to-markdown"],
      },
      {
        id: "3-3",
        title: "Introduction to Command Line",
        desc: "Earn 200 Karma Points",
        brief:
          "Learn the basics of the command line and complete introductory tasks. Share your progress with #ge-intro-to-command-line to earn 200 Karma Points.",
        hashtag: "#ge-intro-to-command-line", // Matches API: "task_name": "Introduction to Command line", "hashtag": "#ge-intro-to-command-line"
        ig: "General Enablement",
        icon: <MdOutlineComputer />,
        skills: ["Command Line", "Terminal Basics"],
        publishedBy: "Shaheen Hyder",
        publishedWhen: "6/7/23, 3:43 AM",
        prerequisites: ["Basic computer knowledge"],
        resources: ["https://learn.mulearn.org/challenge/intro-to-command-line"],
      },
      {
        id: "3-4",
        title: "HTML File on GitHub",
        desc: "Earn 200 Karma Points",
        brief:
          "Learn how to host an HTML file using GitHub Pages. Share your hosted URL with #ge-github-pages to earn 200 Karma Points.",
        hashtag: "#ge-github-pages", // Matches API: "task_name": "Introduction to GitHub pages", "hashtag": "#ge-github-pages"
        ig: "General Enablement",
        icon: <MdVideoLibrary />,
        skills: ["HTML", "GitHub Pages"],
        publishedBy: "Shaheen Hyder",
        publishedWhen: "6/7/23, 10:17 AM",
        prerequisites: ["Basic HTML knowledge"],
        resources: ["https://github.com/gtech-mulearn/learn-github-pages"],
      },
      {
        id: "3-5",
        title: "Learn HTML by Building a Cat Photo App",
        desc: "Earn 200 Karma Points",
        brief:
          "Build a cat photo app to learn common HTML tags. Share your FreeCodeCamp profile URL with #ge-intro-to-html to earn 200 Karma Points.",
        hashtag: "#ge-intro-to-html", // Matches API: "task_name": "Introduction to HTML", "hashtag": "#ge-intro-to-html"
        ig: "General Enablement",
        icon: <MdOutlineComputer />,
        skills: ["HTML", "Web Design"],
        publishedBy: "Shaheen Hyder",
        publishedWhen: "6/7/23, 11:07 AM",
        prerequisites: ["Basic HTML"],
        resources: ["https://learn.mulearn.org/challenge/intro-to-html"],
      },
      {
        id: "3-6",
        title: "Scratch Game",
        desc: "Earn 200 Karma Points",
        brief:
          "Develop a game using Scratch and share your game with #ge-intro-to-scratch to earn 200 Karma Points.",
        hashtag: "#ge-intro-to-scratch", // Matches API: "task_name": "Scratch Game", "hashtag": "#ge-intro-to-scratch"
        ig: "General Enablement",
        icon: <MdVideoLibrary />,
        skills: ["Scratch", "Game Design"],
        publishedBy: "Shaheen Hyder",
        publishedWhen: "9/27/23, 2:04 PM",
        prerequisites: ["Basic computer skills"],
        resources: ["https://youtube.com/playlist?list=PLQtMgOvMtjrtyMSDhs6kp8ZmjsuitIoH0"],
      },
      {
        id: "3-7",
        title: "Linux Fundamentals",
        desc: "Earn 300 Karma Points",
        brief:
          "Complete Linux fundamentals tasks on TryHackMe and share your public profile URL with #ge-linux-fundamentals to earn 300 Karma Points.",
        hashtag: "#ge-linux-fundamentals-1", // Matches API: "task_name": "Linux Fundamentals 1", "hashtag": "#ge-linux-fundamentals-1" (assuming part 1 as primary)
        ig: "General Enablement",
        icon: <MdOutlineComputer />,
        skills: ["Linux", "Command Line"],
        publishedBy: "Shaheen Hyder",
        publishedWhen: "9/27/23, 3:41 PM",
        prerequisites: ["Public profile required"],
        resources: [
          "https://tryhackme.com/room/linuxfundamentalspart1",
          "https://tryhackme.com/room/linuxfundamentalspart2",
          "https://tryhackme.com/room/linuxfundamentalspart3",
        ],
      },
      {
        id: "3-8",
        title: "Change the Look",
        desc: "Earn 200 Karma Points",
        brief:
          "Capture a picture of a poster and redesign it to make it more appealing. Share your Figma file URL with #ge-change-the-look to earn 200 Karma Points.",
        hashtag: "#ge-change-the-look", // Matches API: "task_name": "Change the Look", "hashtag": "#ge-change-the-look"
        ig: "General Enablement",
        icon: <MdDesignServices />,
        skills: ["Design", "Creativity"],
        publishedBy: "Shaheen Hyder",
        publishedWhen: "9/27/23, 5:04 PM",
        prerequisites: ["None"],
        resources: [],
      },
      {
        id: "3-9",
        title: "Website Redesign",
        desc: "Earn 200 Karma Points",
        brief:
          "Choose a website of your choice, redesign it, and share both the original and redesigned URLs with #ge-website-redesign to earn 200 Karma Points.",
        hashtag: "#ge-website-redesign", // Matches API: "task_name": "Website Redesign", "hashtag": "#ge-website-redesign"
        ig: "General Enablement",
        icon: <MdDesignServices />,
        skills: ["Web Design", "Creativity"],
        publishedBy: "Shaheen Hyder",
        publishedWhen: "10/4/23, 1:16 AM",
        prerequisites: ["Basic web design"],
        resources: [],
      },
      {
        id: "3-10",
        title: "Cafe Menu App using Thunkable",
        desc: "Earn 200 Karma Points",
        brief:
          "Build a cafe menu app that uses Google Sheets to store the menu. Share your project and sheet link with #ge-lowcode-cafe to earn 200 Karma Points.",
        hashtag: "#ge-lowcode-cafe", // Matches API: "task_name": "Cafe Menu App using Thunkable", "hashtag": "#ge-lowcode-cafe"
        ig: "General Enablement",
        icon: <MdVideoLibrary />,
        skills: ["App Development", "Low-code"],
        publishedBy: "Shaheen Hyder",
        publishedWhen: "10/4/23, 1:58 AM",
        prerequisites: ["Basic app building"],
        resources: ["https://x.thunkable.com/projects"],
      },
      {
        id: "3-11",
        title: "Networking Introduction",
        desc: "Earn 200 Karma Points",
        brief:
          "Complete networking tasks on TryHackMe and share your profile URL with #ge-what-is-networking to earn 200 Karma Points.",
        hashtag: "#ge-what-is-networking", // Matches API: "task_name": "What is Networking", "hashtag": "#ge-what-is-networking"
        ig: "General Enablement",
        icon: <MdVideoLibrary />,
        skills: ["Networking", "Technical Fundamentals"],
        publishedBy: "Shaheen Hyder",
        publishedWhen: "10/4/23, 2:23 AM",
        prerequisites: ["Basic networking knowledge"],
        resources: [
          "https://tryhackme.com/room/whatisnetworking",
          "https://tryhackme.com/room/openvpn",
          "https://tryhackme.com/room/introtolan",
        ],
      },
      {
        id: "3-12",
        title: "Autocrat Automation",
        desc: "Earn 200 Karma Points",
        brief:
          "Learn to generate certificates using Google Slides and Sheets with the Autocrat Extension. Share your Sheets URL and certificate with #ge-autocrat-automation to earn 200 Karma Points.",
        hashtag: "#ge-autocrat-automation", // Matches API: "task_name": "Autocrat Automation", "hashtag": "#ge-autocrat-automation"
        ig: "General Enablement",
        icon: <MdDesignServices />,
        skills: ["Automation", "Google Apps"],
        publishedBy: "Shaheen Hyder",
        publishedWhen: "10/4/23, 1:38 PM",
        prerequisites: ["None"],
        resources: [],
      },
      {
        id: "3-13",
        title: "THM Linux Modules",
        desc: "Earn 200 Karma Points",
        brief:
          "Complete all tasks in the TryHackMe 'Linux Modules' room and share your public profile URL with #ge-linux-modules to earn 200 Karma Points.",
        hashtag: "#ge-linux-modules", // Matches API: "task_name": "Linux Modules", "hashtag": "#ge-linux-modules"
        ig: "General Enablement",
        icon: <MdOutlineComputer />,
        skills: ["Linux", "Technical Skills"],
        publishedBy: "Shaheen Hyder",
        publishedWhen: "10/4/23, 2:23 AM",
        prerequisites: ["Public profile required"],
        resources: ["https://tryhackme.com/room/linuxmodules"],
      },
      {
        id: "3-14",
        title: "Problem Solving & Innovation",
        desc: "Earn 200 Karma Points",
        brief:
          "Complete the Problem Solving & Innovation course and share your experience on LinkedIn with #ge-problemsolving to earn 200 Karma Points.",
        hashtag: "#ge-problemsolving", // Matches API: "task_name": "Problem Solving & Innovation", "hashtag": "#ge-problemsolving"
        ig: "General Enablement",
        icon: <MdVideoLibrary />,
        skills: ["Problem Solving", "Innovation"],
        publishedBy: "Shaheen Hyder",
        publishedWhen: "8/27/24, 11:39 PM",
        prerequisites: ["None"],
        resources: [
          "https://app.mulearn.org/dashboard/wadhwani",
          "https://mulearn.org/r/wadhwani-proofofwork",
        ],
      },
      {
        id: "3-15",
        title: "Mobile Game Deconstruction",
        desc: "Earn 200 Karma Points",
        brief:
          "Select a mobile game, deconstruct its core mechanics and design, and create a 10-slide presentation. Share your presentation with #ge-game-deconstruction to earn 200 Karma Points.",
        hashtag: "#ge-game-deconstruction", // Matches API: "task_name": "Mobile Game Deconstruction", "hashtag": "#ge-game-deconstruction"
        ig: "General Enablement",
        icon: <MdOutlineColorLens />,
        skills: ["Game Analysis", "Presentation"],
        publishedBy: "Shaheen Hyder",
        publishedWhen: "8/27/24, 11:39 PM",
        prerequisites: ["Basic game knowledge"],
        resources: ["https://departmentofplay.net/guide-how-to-deconstruct/"],
      },
    ],
  },
  {
    level: 4,
    title: "Level 4",
    subtitle: "Master UI Fundamentals with Figma",
    leveller: {
      id: "4-4",
      title: "Design an E-commerce Product Page",
      desc: "Create an e-commerce product page focusing on UI best practices.",
      brief:
        "Include product images, pricing, description, and a prominent 'Add to Cart' button.",
      hashtag: "#cl-ui-ecommerce", // No direct API match, assigned based on context
      ig: "E-commerce UI",
      icon: <MdShoppingCart />,
      skills: ["E-commerce UI", "UX Writing", "Visual Hierarchy"],
      publishedBy: "Community",
      publishedWhen: "2/26/25, 10:30 AM",
      prerequisites: ["Basic UI Design"],
      resources: ["https://www.behance.net/"],
    },
    cards: [
      {
        id: "4-1",
        title: "Redesign a Mobile Login Screen",
        desc: "Create a visually appealing and user-friendly login screen for a mobile app.",
        brief:
          "Design a mobile login screen with dark and light modes. Submit a Figma file with your design.",
        hashtag: "#cl-ui-login", // No direct API match, assigned based on context
        ig: "UI Design",
        icon: <MdBrush />,
        skills: ["UI Design", "Typography", "Color Theory"],
        publishedBy: "Community",
        publishedWhen: "2/26/25, 10:00 AM",
        prerequisites: ["Basic knowledge of Figma"],
        resources: ["https://www.figma.com/"],
      },
      {
        id: "4-2",
        title: "Create a Wireframe for a Social Media App",
        desc: "Design a low-fidelity wireframe for a new social media app.",
        brief:
          "Use Figma to design a wireframe with at least 5 key screens (e.g., login, home, profile, messages).",
        hashtag: "#cl-ux-socialwireframe", // No direct API match, assigned based on context
        ig: "Wireframing",
        icon: <MdDevices />,
        skills: ["Wireframing", "User Flow"],
        publishedBy: "Community",
        publishedWhen: "2/26/25, 10:10 AM",
        prerequisites: ["Basic UI/UX concepts"],
        resources: ["https://www.smashingmagazine.com/"],
      },
      {
        id: "4-3",
        title: "Design a Landing Page for a Startup",
        desc: "Create an engaging landing page with a call-to-action.",
        brief:
          "Design a visually appealing landing page for a startup, including a hero section, testimonials, and CTA button.",
        hashtag: "#cl-ui-landing", // No direct API match, assigned based on context
        ig: "Web UI",
        icon: <MdWeb />,
        skills: ["Wireframing", "Layout Design", "CTA Optimization"],
        publishedBy: "Community",
        publishedWhen: "2/26/25, 10:20 AM",
        prerequisites: ["Basic Figma knowledge"],
        resources: ["https://www.awwwards.com/"],
      },
      {
        id: "4-4",
        title: "Design an E-commerce Product Page",
        desc: "Create an e-commerce product page focusing on UI best practices.",
        brief:
          "Include product images, pricing, description, and a prominent 'Add to Cart' button.",
        hashtag: "#cl-ui-ecommerce", 
        ig: "E-commerce UI",
        icon: <MdShoppingCart />,
        skills: ["E-commerce UI", "UX Writing", "Visual Hierarchy"],
        publishedBy: "Community",
        publishedWhen: "2/26/25, 10:30 AM",
        prerequisites: ["Basic UI Design"],
        resources: ["https://www.behance.net/"],
      },
    ],
  },
  {
    level: 5,
    title: "Level 5",
    subtitle: "Build Complex UI Components",
    leveller: {
      id: "4-4",
      title: "Design an E-commerce Product Page",
      desc: "Create an e-commerce product page focusing on UI best practices.",
      brief:
        "Include product images, pricing, description, and a prominent 'Add to Cart' button.",
      hashtag: "#cl-ui-ecommerce", 
      ig: "E-commerce UI",
      icon: <MdShoppingCart />,
      skills: ["E-commerce UI", "UX Writing", "Visual Hierarchy"],
      publishedBy: "Community",
      publishedWhen: "2/26/25, 10:30 AM",
      prerequisites: ["Basic UI Design"],
      resources: ["https://www.behance.net/"],
    },
    cards: [
      {
        id: "5-1",
        title: "Create a Design System in Figma",
        desc: "Develop a reusable design system with typography, colors, and components.",
        brief:
          "Create a scalable design system including typography, button styles, and form components.",
        hashtag: "#cl-ui-designsystem", 
        ig: "UI Systems",
        icon: <MdLayers />,
        skills: ["Design Systems", "Component Libraries", "Scalability"],
        publishedBy: "Community",
        publishedWhen: "2/26/25, 10:50 AM",
        prerequisites: ["Intermediate Figma knowledge"],
        resources: ["https://www.designsystems.com/"],
      },
      {
        id: "5-2",
        title: "Design a Dashboard UI",
        desc: "Create a data visualization dashboard for a SaaS platform.",
        brief: "Focus on data presentation, widgets, and UI consistency.",
        hashtag: "#cl-ui-dashboard", // No direct API match, assigned based on context
        ig: "Dashboard UI",
        icon: <MdDashboard />,
        skills: ["Data Visualization", "UI Layout"],
        publishedBy: "Community",
        publishedWhen: "2/26/25, 11:00 AM",
        prerequisites: ["Intermediate UI Design"],
        resources: ["https://www.behance.net/"],
      },
    ],
  },
  {
    level: 6,
    title: "Level 6",
    subtitle: "Create Advanced Prototypes and Interactions",
    leveller: {
      id: "4-4",
      title: "Design an E-commerce Product Page",
      desc: "Create an e-commerce product page focusing on UI best practices.",
      brief:
        "Include product images, pricing, description, and a prominent 'Add to Cart' button.",
      hashtag: "#cl-ui-ecommerce", // No direct API match, assigned based on context
      ig: "E-commerce UI",
      icon: <MdShoppingCart />,
      skills: ["E-commerce UI", "UX Writing", "Visual Hierarchy"],
      publishedBy: "Community",
      publishedWhen: "2/26/25, 10:30 AM",
      prerequisites: ["Basic UI Design"],
      resources: ["https://www.behance.net/"],
    },
    cards: [
      {
        id: "6-1",
        title: "Build a Fully Interactive Prototype",
        desc: "Create a working prototype with micro-interactions and animations.",
        brief:
          "Develop an interactive prototype using Figma's advanced prototyping tools.",
        hashtag: "#cl-ux-interactiveproto", // No direct API match, assigned based on context
        ig: "UX Prototyping",
        icon: <MdSmartphone />,
        skills: ["Prototyping", "User Testing", "Micro-interactions"],
        publishedBy: "Community",
        publishedWhen: "2/26/25, 11:10 AM",
        prerequisites: ["Advanced Figma knowledge"],
        resources: ["https://www.uxtools.co/"],
      },
      {
        id: "6-2",
        title: "Design a Gesture-Based Mobile App",
        desc: "Create a UI prototype that uses swipe, tap, and drag interactions.",
        brief:
          "Use Figma's interactive tools to develop a mobile UI with gesture-based interactions.",
        hashtag: "#cl-ux-gestureapp", // No direct API match, assigned based on context
        ig: "Gesture UI",
        icon: <MdTouchApp />,
        skills: ["Mobile UI", "Prototyping"],
        publishedBy: "Community",
        publishedWhen: "2/26/25, 11:20 AM",
        prerequisites: ["UX Interactions"],
        resources: ["https://www.interaction-design.org/"],
      },
    ],
  },
];

export default levelsData;