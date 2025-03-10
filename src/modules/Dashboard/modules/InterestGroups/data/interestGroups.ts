// ./data/interestGroups.ts
export interface Opportunity {
  title: string;
  description: string;
}

export interface Event {
  id: string;
  title: string;
  link: string;
  venue: string;
  eventType: "Online" | "Offline";
  date: string;
  time: string;
  image: string;
}

export interface LearningPath {
  level: string;
  cards: {
    title: string;
    data: {
      description: string;
      whatYouWillLearn: string[];
      challenges: { title: string; resources: string[]; description: string }[];
    };
    resources: number;
    proofOfWork: number;
    rating: number;
    hasGift: boolean;
  }[];
}

export interface CardData {
  id?: number | string;
  name: string;
  muid?: string;
  role?: string;
  interest_groups?: { id: string; name: string }[];
  expertise?: string[];
  organizations?: { id: string; title: string; code: string; org_type: string }[];
  profile_pic?: string | null;
  image?: string;
  linkedin?: string;
  karma?: string;
}

export interface CommunityPartner {
  id: string;
  title: string;
  image: string;
  link: string;
}

export interface PartnerCompany {
  id: string;
  title: string;
  image: string;
  link: string;
}

export interface InterestGroupData {
  id: string;
  title: string;
  description: string;
  category?: string
  image?: string
  members?: string
  bannerImage: string;
  memberCount: number;
  memberSince: string;
  isPublic: boolean;
  prerequisites: string[];
  officeHours: string;
  thinkTankMeeting: string;
  interestGroupLeads: {
    description: string;
    leads?: {
      name: string;
      institution: string;
      linkedin: string;
      image: string;
      expertise?: string[];
    }[];
  };
  // Removed opportunities from root level
  peopleToFollow: {
    name: string;
    link: string;
  }[];
  blogsToFollow: {
    name: string;
    link: string;
  }[];
  topKeywords: string[];
  tabs: {
    about: {
      foundationDeck: string,
      description: string;
      opportunities: Opportunity[]; // Moved the big opportunities list here
    };
    forum?: {
      placeholder: string;
    };
    members: CardData[];
    events?: Event[];
    learningPaths?: LearningPath[];
    thinkTank?: CardData[];
    mentors?: CardData[];
  };
  communityPartners?: CommunityPartner[];
  partnerCompanies?: PartnerCompany[];
}

// Array of all interest groups
export const interestGroups: InterestGroupData[] = [
  //todo add cloud and devops interest group
  {
    id: "46fe1fb7-7b04-4ebe-837d-120bc16d0e0a",
    title: "UI/UX Interest Group",
    description:
      "Welcome to the UI/UX Interest Group! We’re a vibrant community of designers, researchers, and enthusiasts passionate about crafting intuitive and beautiful digital experiences.",
    bannerImage:
    "/assets/IG/Cover/1.png",
    memberCount: 2300,
    memberSince: "July 2022",
    isPublic: true,
    officeHours: "Tuesday 7:30PM",
    thinkTankMeeting: "Saturdays 8:00PM",
    interestGroupLeads: {
      description:
        "Interest group leads manage the activities and events within interest groups and serve as a point of contact for students interested in getting involved. Students can connect with these leads to learn about opportunities within their interests.",
      leads: [
        {
          name: "Abikrishna S",
          institution: "St. Thomas Institute for Science and Technology",
          linkedin: "https://www.linkedin.com/in/abikrishna-s-70303323b/",
          image: "/assets/IG/UI-UX/IG Leads/Abikrishna S.webp",
          expertise: ["UI Design", "User Research"],
        },
      ],
    },
    // Removed opportunities from here
    peopleToFollow: [
      { name: "Julie Zhuo", link: "https://www.linkedin.com/in/julie-zhuo/" },
      { name: "Katie Dill", link: "https://www.linkedin.com/in/katie-dill-79168b3/" },
      { name: "Luke Wroblewski", link: "https://www.linkedin.com/in/lukew/" },
      { name: "Matt Przegietka", link: "https://www.linkedin.com/in/mattprzegietka/" },
    ],
    blogsToFollow: [
      { name: "Smashing Magazine", link: "https://www.smashingmagazine.com/" },
      { name: "Nielsen Norman Group (NN/g)", link: "https://www.nngroup.com/" },
      { name: "UX Collective", link: "https://uxdesign.cc/" },
    ],
    topKeywords: [
      "user-centered design",
      "wireframing",
      "prototyping",
      "usability testing",
      "interaction design",
      "accessibility",
      "responsive design",
      "microinteractions",
      "design systems",
    ],
    prerequisites: [
      "Learn wireframing and prototyping using tools like Figma to visualize and test design concepts.",
      "Develop a strong grasp of basic graphic design principles, such as alignment, contrast, and typography.",
      "Understand how to conduct user research and gather feedback to refine designs and meet user needs effectively.",
    ],
    tabs: {
      about: {
        foundationDeck: "https://www.notion.so/11e59e69b1bf807d8bf8dfe078c074d7?pvs=25",
        description:
          "Are you passionate about crafting seamless, intuitive digital experiences? The UI/UX Design Interest Group invites you to explore the world of user interfaces and experiences. Perfect for anyone interested in creating user-centric, engaging designs. Join us to learn how to balance aesthetics with functionality to improve user satisfaction and solve real-world problems.",
        opportunities: [
          {
            title: "UI Designer",
            description:
              "Focuses on creating aesthetically pleasing and functional user interfaces.",
          },
          {
            title: "UX Researcher",
            description:
              "Gathers user feedback and insights to improve the design process.",
          },
          {
            title: "Interaction Designer",
            description:
              "Works on interactive elements and transitions to enhance user engagement.",
          },
          {
            title: "UX Writer",
            description:
              "Specializes in crafting clear and effective content within user interfaces.",
          },
        ], // Moved the big opportunities list here
      },
      forum: { placeholder: "Forum discussions will be displayed here." },
      members: [
        {
          id: 1,
          name: "Alice Johnson",
          muid: "alice123",
          profile_pic:
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&q=80",
          karma: "1200",
          interest_groups: [
            { id: "15edd535-08d2-4619-9da7-944e21365de9", name: "UI/UX Interest Group" },
          ],
          organizations: [
            { id: "org-1", title: "Design College", code: "DC01", org_type: "College" },
          ],
        },
        {
          id: 2,
          name: "Bob Smith",
          muid: "bob456",
          profile_pic:
            "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=40&h=40&q=80",
          karma: "950",
          interest_groups: [
            { id: "15edd535-08d2-4619-9da7-944e21365de9", name: "UI/UX Interest Group" },
          ],
          organizations: [
            { id: "org-2", title: "Art Institute", code: "AI01", org_type: "College" },
          ],
        },
        {
          id: 3,
          name: "Charlie Brown",
          muid: "charlie789",
          profile_pic:
            "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&q=80",
          karma: "1800",
          interest_groups: [
            { id: "15edd535-08d2-4619-9da7-944e21365de9", name: "UI/UX Interest Group" },
          ],
          organizations: [
            { id: "org-3", title: "UX Academy", code: "UXA01", org_type: "College" },
          ],
        },
        {
          id: 4,
          name: "Diana Lee",
          muid: "diana101",
          profile_pic:
            "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=40&h=40&q=80",
          karma: "750",
          interest_groups: [
            { id: "15edd535-08d2-4619-9da7-944e21365de9", name: "UI/UX Interest Group" },
          ],
          organizations: [
            { id: "org-4", title: "Design School", code: "DS01", org_type: "College" },
          ],
        },
        {
          id: 5,
          name: "Eve Parker",
          muid: "eve202",
          profile_pic:
            "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&q=80",
          karma: "2000",
          interest_groups: [
            { id: "15edd535-08d2-4619-9da7-944e21365de9", name: "UI/UX Interest Group" },
          ],
          organizations: [
            { id: "org-5", title: "Creative Institute", code: "CI01", org_type: "College" },
          ],
        },
      ],
      events: [
        {
          id: "evt-001",
          title: "UI/UX Design Sprint Workshop",
          link: "https://uiuxcommunity.com/events/design-sprint",
          venue: "Online via Zoom",
          eventType: "Online",
          date: "March 15, 2025",
          time: "14:00 - 17:00 GMT",
          image:
            "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800",
        },
        {
          id: "evt-002",
          title: "Figma Advanced Prototyping Masterclass",
          link: "https://uiuxcommunity.com/events/figma-masterclass",
          venue: "Semarang Convention Center",
          eventType: "Offline",
          date: "April 10, 2025",
          time: "09:00 - 12:00 WIB",
          image: "/assets/interestgroup_assets/Top100Desigers3.webp",
        },
        {
          id: "evt-003",
          title: "User Research Techniques Webinar",
          link: "https://uiuxcommunity.com/events/user-research-webinar",
          venue: "Online via Microsoft Teams",
          eventType: "Online",
          date: "May 5, 2025",
          time: "10:00 - 11:30 GMT",
          image: "/assets/interestgroup_assets/Top100Desigers2.webp",
        },
        {
          id: "evt-004",
          title: "UI Design Trends 2025 Conference",
          link: "https://uiuxcommunity.com/events/ui-trends-2025",
          venue: "Jakarta Design Hub",
          eventType: "Offline",
          date: "June 20, 2025",
          time: "13:00 - 17:00 WIB",
          image: "/assets/interestgroup_assets/Top100Desigers3.webp",
        },
        {
          id: "evt-005",
          title: "Accessibility in UX Design Workshop",
          link: "https://uiuxcommunity.com/events/accessibility-workshop",
          venue: "Online via Google Meet",
          eventType: "Online",
          date: "July 12, 2025",
          time: "15:00 - 16:30 GMT",
          image: "/assets/interestgroup_assets/Top100Desigers2.webp",
        },
      ],
      learningPaths: 
        [
          {
            level: "Level 4",
            cards: [
              {
                title: "Fundamental Understanding",
                data: {
                  description:
                    "UI/UX design is centered on crafting seamless and intuitive interactions between users and digital products. It combines two distinct but interconnected aspects: User Interface (UI) and User Experience (UX). UI focuses on the visual components users interact with, such as buttons, typography, and layouts, ensuring they are aesthetically appealing, consistent, and aligned with the product's design language. UX, on the other hand, emphasizes the overall user journey, addressing functionality, usability, and emotional engagement to create a satisfying experience. Together, UI and UX prioritize user-centered design, leveraging tools and methodologies like wireframing, prototyping, accessibility considerations, and usability testing. These approaches aim to solve user problems effectively, delivering a product that is not only functional but also delightful to use. While UI determines how a product looks, UX defines how it works and feels, ensuring a harmonious blend of visual appeal and user satisfaction.",
                  whatYouWillLearn: [
                    "Introduction to UI design principles, focusing on creating visually appealing, consistent, and user-friendly interfaces.",
                    "Understanding UX design fundamentals, emphasizing the overall user journey, functionality, usability, and emotional engagement.",
                    "How UI and UX work together to create seamless, user-centered digital experiences.",
                    "Methods and tools used in UI/UX design, such as wireframing, prototyping, accessibility considerations, and usability testing.",
                  ],
                  challenges: [
                    {
                      title: "Find and define a Simple Problem",
                      resources: [
                        "https://drive.google.com/file/d/17WuscJPIhgaq0VOnyi2wOTRfpZSpc16-/view",
                        "https://www.coursera.org/lecture/start-ux-design-process/create-problem-statements-NC282",
                      ],
                      description:
                        "In this task, you are required to prepare a problem statement based on research, user needs, and business goals and design a solution that meets the needs. Follow the template given below.\n\nNOTE: Ensure that you define the problem, and provide solutions to the basic questions (What, Why, When, Who, Where).\n\nAfter completing this task, share the PDF or Word File in the ⁠ui-ux channel using the hashtag #cl-findaproblem to avail 100 karma points.",
                    },
                    {
                      title: "Figma Basics",
                      resources: [
                        "https://www.classcentral.com/classroom/youtube-figma-tutorials-the-ultimate-crash-course-51794",
                      ],
                      description:
                        "In this task, you are required to go through the video provided below and clone any three screens of your favorite app in Figma. You can create the home screen and any other screens of your choice. After completing this task, share the Figma file in the ⁠ui-ux channel using the hashtag #cl-ui-figma to avail 400 karma points.",
                    },
                    {
                      title: "Sun and Moon",
                      resources: ["https://www.youtube.com/watch?v=rKtBy63cHJ4"],
                      description:
                        "In this task, you are required to watch the video provided below and create toggle buttons on your own. After completing this task, share the Figma file in the ⁠ui-ux channel using the hashtag #cl-ui-sunmoon to avail 400 karma points.",
                    },
                    {
                      title: "Create a User persona",
                      resources: [
                        "https://www.coursera.org/lecture/start-ux-design-process/understand-personas-ZpYoj",
                      ],
                      description:
                        "In this task, you are required to create personas of 3 target users and design a solution to the needs, based on research and data that provides a clear understanding of the users’ needs, goals, pain points, and motivations. Mention demographics, and users' quotes as well. After completing this task, share the PDF or Word File in the ⁠ui-ux channel using the hashtag #cl-ux-persona to avail 400 karma points.",
                    },
                    {
                      title: "Create a User journey Map",
                      resources: [
                        "https://www.figma.com/board/M8m8Dn0cTEPVaVZoqXpGy6/Journey-map?node-id=0-1&p=f&t=yea1zM3YfAF7kHGB-0",
                      ],
                      description:
                        "In this task, you are required to visually illustrate the user flow starting with the initial contact and progressing through the stages of engagement into long-term loyalty and advocating. Follow the template given below. After completing this task, share the PDF or Word File in the ⁠ui-ux channel using the hashtag #cl-ux-journeymap to avail 600 karma points.",
                    },
                    {
                      title: "Create simple wireframes",
                      resources: [
                        "https://www.coursera.org/lecture/wireframes-low-fidelity-prototypes/draw-your-first-wireframe-wN5Wk",
                      ],
                      description:
                        "In this task, you will learn how to create wireframes for a digital interface showing the layout, elements, and user flow. NOTE: There should be a minimum of 4 windows in the design. After completing this task, share the Figma file link (with edit access) of your paper wireframe in the ⁠ui-ux channel using the hashtag #cl-ux-wireframe to avail 400 karma points.",
                    },
                    {
                      title: "Analyze a Website for UX Issues",
                      resources: ["https://www.youtube.com/watch?v=GXTkczM8nmY"],
                      description:
                        "Analyze a website to identify UX issues by thoroughly reviewing key areas like navigation, accessibility, responsiveness, and performance. Identify user pain points such as confusing layouts, unclear CTAs, or slow load times. Document findings using screenshots and descriptions, categorizing issues by severity (High, Medium, Low). Provide actionable recommendations to address these problems. After completing this task, share the PDF or Word File in the ⁠ui-ux channel using the hashtag #cl-ux-uxissues not less than 4 pages to avail 300 karma points.",
                    },
                    {
                      title: "Basics of User-Centered Design",
                      resources: ["https://youtu.be/BTVLmf0Z6EY?si=ROUHeSp5LmSX9VmT"],
                      description:
                        "To understand User-Centered Design (UCD), it is essential to delve into its principles, which focus on meeting user needs and emphasizing iterative design processes. UCD consists of several key stages: user research, ideation, prototyping, testing, and iteration. To illustrate these concepts, consider designing a mobile app as an example. After completing this task, document the entire process and explain each step of UCD. Submit the completed documentation as a PDF.",
                    },
                    {
                      title: "Introduction to Prototyping",
                      resources: ["https://youtu.be/v1UKB-0EUhQ?si=teHsvMDhz23uXurJ"],
                      description:
                        "Researching prototyping basics involves understanding the concept of a prototype and its role in the design process. Design a basic user flow, such as a login screen leading to a dashboard for a webpage or mobile app. Test the prototype to ensure interactivity and simulate user navigation effectively. Document the process and compile the documentation into a well-structured PDF. After completing this task, submit the final PDF in the ⁠ui-ux channel using the hashtag #cl-ux-prototype.",
                    },
                    {
                      title: "Low-Fidelity UI Designs",
                      resources: ["https://www.youtube.com/watch?v=3F4mWr1cY-8"],
                      description:
                        "In this task, you are required to create and design a Low-Fi prototype of a digital wireframe you designed to represent its basic interface, focusing on functions over appearance, using Figma ONLY. NOTE: There should be a minimum of 8 windows in the prototype. After completing this task, share your Figma file URL in the ⁠ui-ux channel using the hashtag #cl-ux-lowfi to avail 400 karma points.",
                    },
                  ],
                },
                resources: 11,
                proofOfWork: 10,
                rating: 0,
                hasGift: false,
              },
            ],
          },
          {
            level: "Level 5",
            cards: [
              {
                title: "Intermediate Skills for UI/UX",
                data: {
                  description:
                    "Intermediate skills in UI/UX design focus on advancing your ability to create refined, user-friendly, and impactful digital experiences. Key skills include mastering interaction design through micro-interactions and animations to enhance engagement and implementing responsive and adaptive designs that work seamlessly across devices. Developing strong information architecture ensures content is well-structured and easy to navigate, while creating and maintaining design systems promotes consistency across projects. Knowledge of accessibility standards ensures inclusivity, and advanced prototyping techniques allow for realistic and interactive mockups. Additionally, conducting usability testing and analyzing feedback helps refine designs based on user behavior. Collaboration with cross-functional teams is crucial to align design goals with project objectives. Mastering these skills helps elevate your expertise in crafting polished and effective UI/UX solutions.",
                  whatYouWillLearn: [
                    "Mastering interaction design through micro-interactions and animations to enhance user engagement.",
                    "Implementing responsive and adaptive designs to ensure seamless user experiences across various devices.",
                    "Developing strong information architecture for well-structured, easy-to-navigate content.",
                    "Creating and maintaining design systems for consistency across projects.",
                    "Understanding accessibility standards to create inclusive designs.",
                    "Using advanced prototyping techniques to create realistic and interactive mockups.",
                    "Conducting usability testing and analyzing user feedback to refine designs.",
                    "Collaborating with cross-functional teams to align design goals with project objectives.",
                  ],
                  challenges: [
                    {
                      title: "Create a Competitive Audit Report",
                      resources: [
                        "https://www.coursera.org/lecture/start-ux-design-process/steps-to-conduct-a-competitive-audit-JG2nZ",
                        "https://www.figma.com/file/BhVVDrtphX5VSCqTz1wPaR/Competitor-Analysis-(Copy)?type=whiteboard&node-id=0%3A1&t=k2lljhoo7M05lcxm-1",
                      ],
                      description:
                        "In this task, you are required to assess and write a report on a company’s rival, pointing out its strengths, weaknesses, and opportunities. Examine competitor products, marketing strategies, and customer feedback. Specify recommendations to enhance the company’s position as well. Follow this template: https://www.figma.com/file/BhVVDrtphX5VSCqTz1wPaR/Competitor-Analysis-(Copy)?type=whiteboard&node-id=0%3A1&t=k2lljhoo7M05lcxm-1 NOTE: There should be a minimum of 3 competitors. After completing this task, share the PDF of your report in the ⁠ui-ux channel using the hashtag #cl-ux-competitivereport to avail 800 karma points.",
                    },
                    {
                      title: "Card Sorting Design Method",
                      resources: ["https://youtu.be/AxgMIEVcIMY?si=rw3aqxuneXr0uVPp"],
                      description:
                        "In this task, you will learn a design technique for a user-centered, card-sorting method for organizing website content by categorizing topics into groups and aiding in website structure and navigation. Make a report stating the similarities, and the most confusing points you faced while sorting. NOTE: There should be a minimum of 12 cards. After completing this task, share the PDF or an image showing all cards, and a PDF of the Report in the ⁠ui-ux channel using the hashtag #cl-ux-cardsorting to avail 800 karma points.",
                    },
                    {
                      title: "Understanding Breakpoints and Grid",
                      resources: [
                        "https://youtu.be/c0ZTaDMGb20?si=aPDomzhBJV1jcC9M",
                        "https://youtu.be/gHdcAH1nhiU?si=YBpZfcCqRG7lxzEt",
                      ],
                      description:
                        "Researching breakpoints and grid systems involves understanding their role in responsive design. Breakpoints are specific screen widths where a layout adjusts to ensure an optimal user experience across devices, such as desktops, tablets, and mobile phones. Grid systems, like the 12-column grid, provide a structured framework for aligning content, maintaining spacing, and enabling responsive behavior by reflowing elements based on screen size. To deepen your understanding, analyze websites or apps with responsive grid systems, observing how layouts adapt across devices. Using tools like Figma, design a simple webpage layout employing a grid system. Implement breakpoints to ensure the layout works seamlessly for mobile, tablet, and desktop views. After completing the task, share your Figma file URL in the ⁠ui-ux channel using the hashtag #cl-ux-brakpointsandgrid to earn 800 karma points.",
                    },
                    {
                      title: "Create Responsive Component",
                      resources: ["https://youtu.be/oXDAmwEWlDc?si=psRxny5y7tfvM0ud"],
                      description:
                        "Researching responsive design involves learning how UI components adapt seamlessly across various screen sizes using principles like breakpoints, flexible grids, and media queries. To apply these concepts, start by choosing a UI component such as a navigation bar, card, or button. Design the selected component using tools like Figma, ensuring it is tailored for different screen sizes—mobile, tablet, and desktop. Test its responsiveness by applying breakpoints and verifying that the layout adjusts smoothly across all screen sizes. Once the design is complete, share your Figma file URL in the ⁠ui-ux channel using the hashtag #cl-ux-responsivecomponent to earn 400 karma points.",
                    },
                    {
                      title: "Interactive Multi-Step Form",
                      resources: ["https://youtu.be/iiHDu_Ko6Xg?si=2GuHrTnDQxiQVLVI"],
                      description:
                        "To understand the concept of multi-step forms, research how they improve user experience by dividing lengthy processes into smaller, manageable steps. This approach reduces cognitive load and increases completion rates by presenting information progressively. Design the form layout using tools like Figma, ensuring a logical flow between steps, such as personal information, payment details, and confirmation. Enhance usability by incorporating interactivity through form validation, progress indicators, and dynamic elements like next/previous buttons and auto-save features. Once the design is complete, create an interactive prototype in Figma to simulate the multi-step form's functionality. After finishing the task, share both your Figma file URL and the prototype URL in the ⁠ui-ux channel using the hashtag #cl-ux-form to earn 400 karma points.",
                    },
                    {
                      title: "Design an onboarding flow",
                      resources: ["https://mulearn.org/"],
                      description:
                        "To study and redesign the MuLearn onboarding flow, begin by analyzing the current onboarding process on the MuLearn website. Pay attention to the key steps, such as sign-up, user personalization, and tutorials, and identify any pain points that may hinder user engagement or satisfaction. Next, define the key user actions required at each stage, such as creating an account, setting preferences, or exploring initial features. Based on this analysis, design a simplified, step-by-step onboarding flow that ensures clarity and ease of use. Using tools like Figma or Adobe XD, create an interactive prototype that visualizes the onboarding process with smooth transitions and user interactions. Test the prototype on various devices or gather feedback to identify and resolve usability issues. Once the task is complete, share your Figma file URL and the prototype URL in the ⁠ui-ux channel using the hashtag #cl-ux-onboarding to earn 600 karma points.",
                    },
                    {
                      title: "Design a splash screen",
                      resources: ["https://youtu.be/CZ440x65k-g?si=So63AmMoVHh3mjYI"],
                      description:
                        "To create an effective splash screen, begin by understanding its purpose: it serves as an introduction to the app or website, showcasing the brand’s logo, colors, or key visual elements while the application loads. Design a visually appealing concept using brand-aligned elements such as the logo, color palette, and typography. Ensure the design reflects the brand identity and creates a positive first impression. Consider responsiveness by designing the splash screen to look great on different devices, including mobile phones, tablets, and desktops. Use tools like Figma to create an interactive prototype of the splash screen, simulating how it will appear and function. Once the task is completed, document your design process, and share both your Figma file URL and prototype URL in the ⁠ui-ux channel using the hashtag #cl-ux-splashscreen to earn 600 karma points.",
                    },
                  ],
                },
                resources: 9,
                proofOfWork: 7,
                rating: 0,
                hasGift: false,
              },
            ],
          },
          {
            level: "Level 6",
            cards: [
              {
                title: "Core Skills for UI/UX",
                data: {
                  description:
                    "Core skills in UI/UX design combine creativity, technical proficiency, and analytical thinking to craft user-centered digital experiences. Designers must excel in wireframing and prototyping to visualize concepts and test user flows, alongside conducting user research to understand needs and challenges. Mastery of visual design principles like typography, color theory, and layout ensures aesthetically pleasing interfaces, while information architecture and interaction design enable seamless navigation and intuitive interactions. Proficiency in accessibility standards ensures inclusivity, and strong problem-solving skills help address user challenges effectively. Familiarity with tools such as Figma and Adobe XD, coupled with excellent collaboration and communication, is crucial for teamwork. Finally, leveraging analytics and user feedback allows for data-driven decision-making to refine designs and enhance user experiences. These skills are essential for creating functional and visually engaging products that meet both user and business goals.",
                  whatYouWillLearn: [
                    "Master wireframing and prototyping to visualize concepts and test user flows.",
                    "Conduct user research to identify needs and challenges and apply findings to design solutions.",
                    "Apply visual design principles such as typography, color theory, and layout to create aesthetically pleasing interfaces.",
                    "Develop strong information architecture and interaction design for seamless navigation and intuitive user interactions.",
                    "Ensure inclusivity by mastering accessibility standards in UI/UX design.",
                    "Use problem-solving skills to address user challenges effectively.",
                    "Become proficient with tools like Figma and Adobe XD for design and prototyping.",
                    "Collaborate effectively with teams, leveraging strong communication and teamwork skills.",
                    "Leverage analytics and user feedback for data-driven design decisions to improve user experiences.",
                  ],
                  challenges: [
                    {
                      title: "Create an Information Architecture",
                      resources: ["https://youtu.be/Ij4WquJaRTc?si=YaiwZn0Hos7EbfAo"],
                      description:
                        "In this task, you are required to create an Information Architecture (IA) to learn how to structure and organize digital content, enhancing user navigation using hierarchies, labeling, and navigation systems. Create a report stating why each element is in its specified place. NOTE: There should be a minimum of 4 pages. After completing this task, share the PDF or an Image of your IA in the ⁠ui-ux channel using the hashtag #cl-ux-infoarch to avail 800 karma points.",
                    },
                    {
                      title: "Create a Navigation Bar",
                      resources: ["https://youtu.be/Ox7uNtdHC8w?si=qto3i0d0n_CXCp30"],
                      description:
                        "To design an effective navigation bar, start by researching various styles such as top navigation, side navigation, and hamburger menus. Analyze their strengths and weaknesses, considering which style best aligns with the project's goals and user needs. Next, design a clean and user-friendly navigation bar. Include clear labels, intuitive icons, and logical groupings of sections to enhance usability. Ensure the navigation bar is aesthetically pleasing and aligns with the brand's visual identity. Incorporate responsive design techniques to create versions suitable for both desktop and mobile screens. For mobile, consider using collapsible menus, such as a hamburger menu, to save space while maintaining accessibility. Using tools like Figma or Adobe XD, create an interactive prototype of the navigation bar. Showcase hover effects, click actions, and transitions to simulate its functionality. Once the task is complete, share the Figma file URL and prototype URL in the ⁠ui-ux channel using the hashtag #cl-ux-navigationbar to earn 400 karma points.",
                    },
                    {
                      title: "Create a Slider",
                      resources: ["https://youtu.be/2d32vTtJUnw?si=CCIuegdMb2dciQWQ"],
                      description:
                        "To create a slider, first understand its purpose: it helps users navigate content like images, text, or products by sliding left or right, enhancing engagement and content accessibility. Design a visually appealing layout using tools like Figma or Adobe XD. Incorporate navigation elements such as arrows, indicators, and smooth transitions to ensure a seamless user experience. Focus on responsiveness by adapting the slider for both desktop and mobile devices. Adjust the size, controls, and spacing to maintain functionality and usability across screen sizes. Create an interactive prototype in Figma or Adobe XD that demonstrates how the slider works, including transitions and interactive navigation elements. Test the prototype on various devices to ensure responsiveness and usability. Once complete, document your work and share the Figma file URL and prototype URL in the ⁠ui-ux channel using the hashtag #cl-ux-slider to earn 200 karma points.",
                    },
                    {
                      title: "Create a Responsive and Interactive Accordion in Figma",
                      resources: ["https://youtu.be/SQWMFFhBSaE?si=mUDOGxJ6vS-0qtjw"],
                      description:
                        "To design an effective accordion layout, start by creating the basic structure using tools like Figma. Utilize frames and rectangles to design collapsible panels with clearly defined section titles and expandable content areas. Next, add interactivity by linking sections in Figma’s prototype tab. Set up interactions that allow users to expand or collapse sections by clicking, ensuring smooth transitions between states. Focus on responsiveness by adapting the accordion layout for various screen sizes, including mobile, tablet, and desktop. Adjust spacing, font sizes, and interaction zones to maintain usability across devices. Test the accordion to ensure smooth functionality and refine the design based on feedback or observed usability issues. Once finalized, document the design process and share both the Figma file URL and prototype URL in the ⁠ui-ux channel using the hashtag #cl-ux-accordion to earn 500 karma points.",
                    },
                    {
                      title: "Hi-Fidelity UI Designs",
                      resources: ["https://youtu.be/Fr-f2NE6B3U?si=NbmPO5EY8AlS1Nsa"],
                      description:
                        "To complete this task, begin by gathering project specifications, understanding user needs, and defining design goals for the intended platform, such as a mobile app or website. Start with low-fidelity wireframes to establish the layout structure and user flow, which helps in visualizing the design framework before adding details. Incorporate visual elements like colors, typography, images, and icons that align with the brand identity, ensuring consistency for a cohesive appearance. Next, develop interactive components such as buttons, dropdowns, and sliders, making them intuitive and user-friendly. Adapt the design for responsiveness, ensuring it works seamlessly across multiple screen sizes, including mobile, tablet, and desktop. Use tools like Figma or Adobe XD to create an interactive prototype, linking the designs to showcase user interactions and functionality. Test the design across various devices to identify usability issues and refine it based on feedback to improve the overall experience. Once finalized, share the Figma file URL and prototype URL in the ⁠ui-ux channel using the hashtag #cl-ux-accordion to avail 950 karma points.",
                    },
                  ],
                },
                resources: 5,
                proofOfWork: 5,
                rating: 0,
                hasGift: false,
              },
            ],
          },
        ],
      mentors: [
        {
          id: "m-001",
          name: "Enric S Neelamkaavil",
          role: "Product Designer @UST Global, µLearn Alumni",
          linkedin: "https://www.linkedin.com/in/enricsneelamkavil/",
          image: "/assets/IG/UI-UX/Mentors/Enric S.webp",
          expertise: ["UI Design", "User Research"],
        },
      ],
    },
    communityPartners: [
      {
        id: "cp-001",
        title: "UI/UX Community Semarang",
        image: "https://www.svgrepo.com/show/452142/adobe.svg",
        link: "https://uiuxsemarang.org",
      },
    ],
    partnerCompanies: [
      {
        id: "pc-001",
        title: "Tokoh Design Studio",
        image: "https://www.svgrepo.com/show/452202/figma.svg",
        link: "https://tokohstudio.com",
      },
    ],
  },
  //web development interest group
  {
    id: "9b8aaf7f-16a0-4a66-ae53-79b8c25e5faa",
    title: "Web Development",
    description:
      "Ever wondered how web applications are built? Everything seems complex until you learn the basics. μLearn Foundation's Web Development Interest Group is designed to help you develop and refine your skills, bringing together people eager to explore emerging web technologies.",
    bannerImage:
    "/assets/IG/Cover/2.png",

    memberCount: 4200,
    memberSince: "March 2021",
    isPublic: true,
    officeHours: "Wednesday 9:00PM",
    thinkTankMeeting: "Friday 7:00 PM @ Google Meet",
    interestGroupLeads: {
      description:
        "Interest group leads manage the activities and events within interest groups and serve as a point of contact for students interested in getting involved.",
      leads: [
        {
          name: "JanuKrishna A S",
          institution: "Marian Engineering College",
          linkedin: "https://www.linkedin.com/in/janukrishna-a-s-4ba8301b2",
          image: "/assets/IG/Web Development/IG Leads/Janukrishna AS.webp",
          expertise: ["Frontend Development", "Backend Development"],
        },
        {
          name: "Maanas M S",
          institution: "Marian Engineering College",
          linkedin: "https://www.linkedin.com/in/maanasms/",
          image: "/assets/IG/Web Development/IG Leads/Maanas MS.webp",
          expertise: ["Web Design", "Database Management"],
        },
      ],
    },
    prerequisites: [
      "Basic Computer Skills",
      "Basic Knowledge of the Internet",
      "HTML (HyperText Markup Language)",
      "CSS (Cascading Style Sheets)",
      "Basic JavaScript",
      "Version Control (Git)",
      "Browser Developer Tools",
      "Responsive Web Design",
      "Basic Graphic Design Principles",
      "Basic Knowledge of Web Hosting and Deployment",
      "Basic Knowledge of Web Accessibility",
    ],
    peopleToFollow: [
      { name: "Alex Sexton", link: "https://alexsexton.com/" },
      { name: "Tim Holman", link: "https://tholman.com/" },
    ],
    blogsToFollow: [
      { name: "A List Apart", link: "https://alistapart.com/" },
      { name: "Codrops", link: "https://tympanus.net/codrops/" },
      { name: "CSS Author", link: "https://cssauthor.com/" },
      { name: "Six Revisions", link: "https://x.com/sixrevisions" },
      { name: "100DaysOfCode", link: "https://www.100daysofcode.io/" },
      { name: "Freecodecamp", link: "https://www.freecodecamp.org/" },
    ],
    topKeywords: [
      "Agile",
      "Algorithm",
      "API",
      "Data Structure",
      "Deployment",
      "Domain Name",
      "MVP",
      "SSL",
      "Front-end",
      "Backend",
      "Full Stack",
      "Responsive Design",
    ],
    tabs: {
      about: {
        foundationDeck: "https://mulearnfoundation.notion.site/11e59e69b1bf80f1ad1ec76b48146da9?pvs=25",
        description:
          "Join the Web Development Interest Group to master the art of building responsive, scalable, and performant websites. From front-end to back-end, we’ve got you covered!",
        opportunities: [
          {
            title: "Full Stack Web Developer",
            description:
              "Work on both front-end and back-end, managing the entire application.",
          },
          {
            title: "Database Administrator",
            description:
              "Manage data storage, security, and organization for web applications.",
          },
          {
            title: "Frontend Developer",
            description:
              "Specialize in the visual and interactive parts of the site.",
          },
          {
            title: "Web Designer",
            description:
              "Focus on layout, color schemes, and aesthetics to enhance user experience.",
          },
          {
            title: "Backend Developer",
            description:
              "Handle server-side programming, managing application logic and databases.",
          },
        ],
      },
      forum: { placeholder: "Discuss web dev trends here." },
      members: [
        {
          id: 11,
          name: "Liam Carter",
          muid: "liam890",
          profile_pic:
            "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=40&h=40&q=80",
          karma: "1500",
          interest_groups: [
            { id: "25fdd535-08d2-4619-9da7-944e21365de9", name: "Web Development Interest Group" },
          ],
          organizations: [
            { id: "org-12", title: "Tech University", code: "TU01", org_type: "College" },
          ],
        },
        {
          id: 12,
          name: "Sophia Nguyen",
          muid: "sophia234",
          profile_pic:
            "https://images.unsplash.com/photo-1517841902196-6df2113b4251?w=40&h=40&q=80",
          karma: "1100",
          interest_groups: [
            { id: "25fdd535-08d2-4619-9da7-944e21365de9", name: "Web Development Interest Group" },
          ],
          organizations: [
            { id: "org-13", title: "Code Academy", code: "CA01", org_type: "College" },
          ],
        },
        {
          id: 13,
          name: "Noah Patel",
          muid: "noah567",
          profile_pic:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&q=80",
          karma: "1900",
          interest_groups: [
            { id: "25fdd535-08d2-4619-9da7-944e21365de9", name: "Web Development Interest Group" },
          ],
          organizations: [
            { id: "org-14", title: "Web Institute", code: "WI01", org_type: "College" },
          ],
        },
      ],
      events: [
        {
          id: "evt-006",
          title: "React Summit 2025",
          link: "https://webdevcommunity.com/events/react-summit",
          venue: "Online via Zoom",
          eventType: "Online",
          date: "March 20, 2025",
          time: "13:00 - 16:00 GMT",
          image: "https://images.unsplash.com/photo-1551288049-b51d5a7480e7?q=80&w=800",
        },
        {
          id: "evt-007",
          title: "Node.js Bootcamp",
          link: "https://webdevcommunity.com/events/nodejs-bootcamp",
          venue: "Bandung Tech Hub",
          eventType: "Offline",
          date: "April 25, 2025",
          time: "10:00 - 14:00 WIB",
          image: "/assets/interestgroup_assets/Top100Desigers2.webp",
        },
      ],
      learningPaths: [
        {
          level: "Level 4",
          cards: [
            {
              title: "HTML & CSS",
              data: {
                description:
                  "HTML provides the structure of webpages using elements like `<div>`, `<p>`, and `<header>` for content organization and semantic meaning. CSS styles these elements, controlling appearance, layout, and responsiveness with selectors, the box model, Flexbox, Grid, and media queries.",
                whatYouWillLearn: [
                  "HTML structure and elements",
                  "CSS Box Model and layouts",
                  "Flexbox and Grid for responsive designs",
                  "CSS styling (colors, fonts, animations)",
                  "Mobile-friendly design with media queries",
                  "Web layout best practices",
                ],
                challenges: [
                  {
                    title: "Cat Photo App",
                    resources: [],
                    description: "Build a simple website displaying cat photos using HTML, images, and basic CSS for responsiveness.",
                  },
                  {
                    title: "Format Letter Online",
                    resources: [],
                    description: "Create HTML templates for letters with clean CSS styling for a professional look.",
                  },
                  {
                    title: "Master Building Block",
                    resources: [],
                    description: "Design reusable CSS components (e.g., buttons, menus) with responsive design principles.",
                  },
                  {
                    title: "Redesign Website",
                    resources: [],
                    description: "Revamp a website using HTML and CSS, focusing on modern design and accessibility.",
                  },
                  {
                    title: "Style Biography",
                    resources: [],
                    description: "Design engaging biography templates with CSS typography and layouts.",
                  },
                  {
                    title: "Embed Experience",
                    resources: [],
                    description: "Enhance webpages with multimedia (images, videos, audio), ensuring usability and accessibility.",
                  },
                  {
                    title: "Style Word",
                    resources: [],
                    description: "Experiment with creative CSS typography for headings and text styles.",
                  },
                  {
                    title: "Perfect Form",
                    resources: [],
                    description: "Build accessible, user-friendly forms with modern CSS styling.",
                  },
                  {
                    title: "Tables",
                    resources: [],
                    description: "Design responsive, clear HTML tables with CSS for effective data presentation.",
                  },
                  {
                    title: "Layouts",
                    resources: [],
                    description: "Master Flexbox and Grid for responsive, flexible website layouts.",
                  },
                ],
              },
              resources: 0,
              proofOfWork: 10,
              rating: 0,
              hasGift: true,
            },
          ],
        },
        {
          level: "Level 5",
          cards: [
            {
              title: "JavaScript - The Behavior and Interactivity",
              data: {
                description:
                  "JavaScript adds interactivity to web pages, running in browsers to modify HTML/CSS, handle events, and communicate with servers. It covers variables, functions, objects, DOM manipulation, event handling, promises, async/await, and modern ES6+ features for dynamic applications.",
                whatYouWillLearn: [
                  "JavaScript basics and use cases",
                  "Core fundamentals (variables, functions, objects)",
                  "DOM manipulation and events",
                  "Asynchronous programming (Promises, async/await)",
                  "Modern ES6+ features",
                  "Popular frameworks (React, Vue, Angular)",
                ],
                challenges: [
                  {
                    title: "Story Generator Project",
                    resources: [],
                    description: "Build an interactive storytelling app using JavaScript for user input, logic, and DOM updates.",
                  },
                  {
                    title: "Building Blocks Project",
                    resources: [],
                    description: "Create reusable JavaScript components for forms and UI, focusing on modularity and events.",
                  },
                  {
                    title: "Objects Project",
                    resources: [],
                    description: "Explore JavaScript objects, classes, and ES6+ features for data modeling and manipulation.",
                  },
                  {
                    title: "Asynchronous Programming Project",
                    resources: [],
                    description: "Handle concurrent operations with callbacks, promises, and async/await, including API integration.",
                  },
                  {
                    title: "Client-Side Web APIs Project",
                    resources: [],
                    description: "Use browser APIs (e.g., geolocation, storage) for real-world application features and error handling.",
                  },
                ],
              },
              resources: 0,
              proofOfWork: 5,
              rating: 0,
              hasGift: true,
            },
          ],
        },
        {
          level: "Level 6",
          cards: [
            {
              title: "React - The UI Library",
              data: {
                description:
                  "React is a JavaScript library for building dynamic UIs with component-based architecture, virtual DOM, and JSX. It covers components, props, state, hooks, routing, testing, and performance optimization for single-page applications (SPAs).",
                whatYouWillLearn: [
                  "React basics and ecosystem",
                  "JSX and core concepts",
                  "State management with hooks",
                  "Component design and composition",
                  "Routing and navigation",
                  "Testing and performance optimization",
                ],
                challenges: [
                  {
                    title: "YouTube Clone",
                    resources: [],
                    description: "Build a video playback app with search, user interactions, API integration, and responsive design.",
                  },
                  {
                    title: "Portfolio Website",
                    resources: [],
                    description: "Create a personal portfolio with dynamic content, interactive UI, and responsive routing.",
                  },
                  {
                    title: "Movie App",
                    resources: [],
                    description: "Develop a movie search app with filtering, pagination, favorites, and API integration.",
                  },
                  {
                    title: "Budget App",
                    resources: [],
                    description: "Build an income/expense tracker with analytics, goals, and real-time calculations.",
                  },
                  {
                    title: "Chat Application",
                    resources: [],
                    description: "Create a real-time chat app with Firebase, authentication, and message notifications.",
                  },
                  {
                    title: "Todo List",
                    resources: [],
                    description: "Design a task management app with CRUD, filtering, local storage, and state management.",
                  },
                ],
              },
              resources: 0,
              proofOfWork: 6,
              rating: 0,
              hasGift: true,
            },
            {
              title: "Angular - The Full Framework",
              data: {
                description:
                  "Angular is a TypeScript-based framework for building large-scale web apps, offering components, dependency injection, modules, and RxJS. It includes routing, testing, performance optimization, and tools like Angular CLI for enterprise applications.",
                whatYouWillLearn: [
                  "Angular basics and ecosystem",
                  "TypeScript and core concepts",
                  "State management with RxJS",
                  "Component lifecycle and architecture",
                  "Routing and navigation",
                  "Testing and performance optimization",
                ],
                challenges: [
                  {
                    title: "Real-Time Chat Application",
                    resources: [],
                    description: "Build a chat app with authentication, WebSocket, multiple rooms, and real-time updates using Angular and Firebase.",
                  },
                  {
                    title: "E-Commerce Dashboard",
                    resources: [],
                    description: "Create an e-commerce dashboard with product CRUD, search, inventory tracking, and order management using Angular and NgRx.",
                  },
                  {
                    title: "Common Skills Development",
                    resources: [],
                    description: "Practice Angular architecture, real-time data, state management, authentication, and responsive design.",
                  },
                ],
              },
              resources: 0,
              proofOfWork: 3,
              rating: 0,
              hasGift: true,
            },
            {
              title: "Svelte - The Compiler Framework",
              data: {
                description:
                  "Svelte compiles components to vanilla JavaScript at build time, minimizing runtime overhead with no virtual DOM. It focuses on reactivity, stores, animations, and SvelteKit for routing, ideal for performant, lightweight UIs.",
                whatYouWillLearn: [
                  "Svelte basics and ecosystem",
                  "Reactivity and core concepts",
                  "State management with stores",
                  "Performance and routing with SvelteKit",
                  "Animations and transitions",
                  "Real-world project building",
                ],
                challenges: [
                  {
                    title: "Weather Dashboard with Svelte",
                    resources: [],
                    description: "Build a responsive weather app with search, current/forecast data, and OpenWeatherMap API integration using SvelteKit.",
                  },
                  {
                    title: "To-Do List Application with Svelte",
                    resources: [],
                    description: "Develop a to-do app with task management, filtering, local storage, and optional dark mode using Svelte stores.",
                  },
                ],
              },
              resources: 0,
              proofOfWork: 2,
              rating: 0,
              hasGift: true,
            },
          ],
        },
      ],
      thinkTank: [
        {
          id: "tt-002",
          name: "Ethan Brooks",
          role: "Lead Developer, Vercel",
          image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=40&h=40&q=80",
          expertise: ["React", "Next.js"],
        },
      ],
      mentors: [
        {
          id: "m-002",
          name: "Amal CP",
          role: "Associate Software Developer @ SOTI",
          linkedin: "https://www.linkedin.com/in/amal-c-p/",
          image: "/assets/IG/Web Development/Mentors/Amal C P.webp",
          expertise: [], // Assuming no expertise listed; add if available
        },
        {
          id: "m-003",
          name: "Bijo Mathew",
          role: "React Native Developer @ Superapps",
          linkedin: "https://www.linkedin.com/in/bijomathewjose/",
          image: "/assets/IG/Web Development/Mentors/Bijo.webp",
          expertise: [],
        },
        {
          id: "m-004",
          name: "Arjun MS",
          role: "Backend Developer @ Gtech µLearn",
          linkedin: "https://www.linkedin.com/in/the-arjun-ms/",
          image: "/assets/IG/Web Development/Mentors/Arjun M S.webp",
          expertise: [],
        },
        {
          id: "m-005",
          name: "Aswin Asok",
          role: "Co-Founder, MakeMyPass",
          linkedin: "https://www.linkedin.com/in/-aswinasok/",
          image: "/assets/IG/Web Development/Mentors/Aswin Asok.webp",
          expertise: [],
        },
      ],
    },
    communityPartners: [
      { id: "cp-002-1", title: "Pygrammers", image: "/assets/IG/Web Development/Community Partners/Pygrammers.webp", link: "#" },
      { id: "cp-002-2", title: "Engagesport", image: "/assets/IG/Web Development/Community Partners/Engagespot.webp", link: "#" },
      { id: "cp-002-3", title: "Reflections", image: "/assets/IG/Web Development/Community Partners/Reflections.webp", link: "#" },
      { id: "cp-002-4", title: "Faya", image: "/assets/IG/Web Development/Community Partners/Faya.webp", link: "#" },
      { id: "cp-002-5", title: "OpenFintech", image: "/assets/IG/Web Development/Community Partners/Open Fin Tech.webp", link: "#" },
      { id: "cp-002-6", title: "GitHub", image: "/assets/IG/Web Development/Community Partners/Github.webp", link: "https://github.com" },
      { id: "cp-002-7", title: "Elixir Labs", image: "/assets/IG/Web Development/Community Partners/Elixir Labs.webp", link: "#" },
      { id: "cp-002-8", title: "Open Grad", image: "/assets/IG/Web Development/Community Partners/Open Grad.webp", link: "#" },
      { id: "cp-002-9", title: "Softnotions", image: "/assets/IG/Web Development/Community Partners/Softnotions.webp", link: "#" },
      { id: "cp-002-10", title: "Hamon Solutions", image: "/assets/IG/Web Development/Community Partners/Hamon.webp", link: "#" },
      { id: "cp-002-11", title: "Alokin", image: "/assets/IG/Web Development/Community Partners/Alokin.webp", link: "#" },
    ],
    partnerCompanies: [
      {
        id: "pc-002",
        title: "NextJS Studio",
        image: "https://www.svgrepo.com/show/354113/nextjs-icon.svg",
        link: "https://nextjsstudio.com",
      },
    ],
  },

  // Cyber Security Interest Group
  {
    id: "3a74725e-a05a-418b-a275-39d68ad9a416",
    title: "Cybersecurity",
    description:
      "Curious about protecting the digital world? The Cybersecurity Interest Group by GTech μLearn delves into securing data and networks from potential threats. This group provides essential knowledge on staying safe online, ideal for those passionate about keeping cyberspace secure.",
    bannerImage:
    "/assets/IG/Cover/3.png",

    memberCount: 3000,
    memberSince: "September 2020",
    isPublic: true,
    officeHours: "Monday 7:30PM",
    thinkTankMeeting: "First Wednesday 7:00 PM @ Google Meet",
    interestGroupLeads: {
      description:
        "Cybersecurity Interest Group Leads oversee the activities and events within the cybersecurity community and act as the main point of contact for students eager to get involved. Students can reach out to these leads to explore opportunities in areas like ethical hacking, network defense, and security research, and stay informed about upcoming cybersecurity initiatives and events.",
      leads: [
        {
          name: "Dany Koshy P",
          institution: "College of Engineering Pathanapuram",
          linkedin: "https://www.linkedin.com/in/dany-koshy-p-a79328232/",
          image: "/assets/IG/Cyber Security/IG Lead/Dany Koshy.webp",
          expertise: ["Ethical Hacking", "Network Security"],
        },
        {
          name: "Aswin Krishna",
          institution: "Security Engineer @ KMart",
          linkedin: "https://www.linkedin.com/in/aswinkrishna07",
          image: "/assets/IG/Cyber Security/IG Lead/Aswin Krishna.webp",
          expertise: ["Security Research", "Incident Response"],
        },
        {
          name: "Geo Mathew Joseph",
          institution: "Marian Engineering College",
          linkedin: "https://www.linkedin.com/in/geomathewjoseph",
          image: "/assets/IG/Cyber Security/IG Lead/Geo Mathew.webp",
          expertise: ["Penetration Testing", "Security Analysis"],
        },
      ],
    },
    prerequisites: [
      "Cybersecurity requires a basic understanding of computer systems.",
      "Knowledge of operating systems, especially Linux and Windows, is crucial.",
      "Understanding networking concepts like IP addresses and protocols is essential.",
      "Familiarity with programming languages such as Python and Bash is beneficial.",
      "Web technologies like HTML and JavaScript are helpful in cybersecurity.",
      "Key concepts include encryption, authentication, and common threats like malware and phishing.",
      "Hands-on experience with tools like Wireshark, Nmap, and vulnerability scanners is essential.",
      "Problem-solving skills are critical for addressing cyber challenges.",
      "A continuous learning mindset is necessary to keep up with evolving cyber threats.",
    ],
    peopleToFollow: [
      { name: "Bruce Schneier", link: "https://www.schneier.com/" },
      { name: "Troy Hunt", link: "https://www.linkedin.com/in/troyhunt" },
      { name: "Brian Krebs", link: "https://www.linkedin.com/in/bkrebs" },
      { name: "InfoSec", link: "https://www.linkedin.com/company/infosec-institute/" },
      { name: "Cybersecurity Dive", link: "https://www.linkedin.com/showcase/cybersecuritydive/" },
    ],
    blogsToFollow: [
      { name: "Krebs on Security", link: "https://krebsonsecurity.com/" },
      { name: "Dark Reading", link: "https://www.darkreading.com/" },
      { name: "Threatpost", link: "https://threatpost.com/" },
    ],
    topKeywords: [
      "Encryption",
      "Firewall",
      "Penetration Testing",
      "Malware",
      "Phishing",
      "Intrusion Detection",
      "Ransomware",
      "Zero-Day",
      "Social Engineering",
      "DDoS",
    ],
    tabs: {
      about: {
        foundationDeck: "https://www.notion.so/Cybersecurity-11e59e69b1bf804c8fe3fd2acbca4258?pvs=4",
        description:
          "The Cyber Security Interest Group is your go-to place for learning about cybersecurity best practices, ethical hacking, and staying ahead of digital threats.",
        opportunities: [
          {
            title: "Cybersecurity Analyst",
            description:
              "Monitor networks for security breaches and prevent cyber threats.",
          },
          {
            title: "Ethical Hacker",
            description:
              "Test systems by attempting to break security to strengthen defenses.",
          },
          {
            title: "Information Security Manager",
            description: "Oversee and ensure the security of an organization's data.",
          },
          {
            title: "Security Software Developer",
            description:
              "Create software solutions specifically for enhancing security.",
          },
          {
            title: "Forensic Computer Analyst",
            description:
              "Investigate cybercrimes by analyzing evidence and gathering data.",
          },
        ],
      },
      forum: { placeholder: "Share cybersecurity tips here." },
      members: [
        {
          id: 14,
          name: "Mason Kim",
          muid: "mason890",
          profile_pic:
            "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=40&h=40&q=80",
          karma: "1300",
          interest_groups: [
            { id: "35fdd535-08d2-4619-9da7-944e21365de9", name: "Cybersecurity Interest Group" },
          ],
          organizations: [
            { id: "org-15", title: "Security Academy", code: "SA01", org_type: "College" },
          ],
        },
        {
          id: 15,
          name: "Ava Lopez",
          muid: "ava345",
          profile_pic:
            "https://images.unsplash.com/photo-1517841902196-6df2113b4251?w=40&h=40&q=80",
          karma: "900",
          interest_groups: [
            { id: "35fdd535-08d2-4619-9da7-944e21365de9", name: "Cybersecurity Interest Group" },
          ],
          organizations: [
            { id: "org-16", title: "Cyber College", code: "CC01", org_type: "College" },
          ],
        },
      ],
      events: [
        {
          id: "evt-008",
          title: "Ethical Hacking Workshop",
          link: "https://cyberseccommunity.com/events/hacking-workshop",
          venue: "Online via Zoom",
          eventType: "Online",
          date: "March 25, 2025",
          time: "14:00 - 16:00 GMT",
          image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800",
        },
      ],
      learningPaths: [
        {
          level: "Level 4",
          cards: [
            {
              title: "Fundamental IT Skills for CyberSecurity",
              data: {
                description:
                  "Computer networking is the process of connecting two or more computing devices to enable the transmission and exchange of information and resources. It allows devices to communicate, share data, and access resources like files, printers, and internet connections. The basics of networking involve key components such as nodes, links, switches, routers, and protocols. Nodes are network connection points that can receive, send, create, or store data, while links are the physical or wireless connections between nodes. Switches connect network devices and manage node-to-node communication, while routers send data packets between networks. Protocols are sets of rules governing data transmission between devices and are essential for building and maintaining networks. Networking can be categorized into different types such as local area networks (LANs), wide area networks (WANs), and cloud networks, each with its own characteristics and uses. Network security is essential for protecting data and devices from cyber threats and includes features such as firewalls, encryption, and access controls to prevent unauthorized access. Networking enables the efficient exchange of data, supports various applications, enhances productivity, and improves security. Operating systems (OS) manage computer hardware and provide a platform for applications to run. They handle functions like memory management, task processing, device control, and file management. Examples include Windows, macOS, Linux, and Unix, each offering different features suited for specific user needs. Linux, an open-source, Unix-like OS, is known for its stability, security, and flexibility, and it is commonly used in servers and embedded systems. macOS, developed by Apple Inc., is a user-friendly OS with a Unix-based architecture, while Windows is a widely-used OS supporting a vast range of software and hardware, offering features like multitasking and regular updates. Cybersecurity principles are built on the CIA triad: confidentiality, integrity, and availability, and are reinforced by governance, protection, detection, and response strategies. Risk management and regular assessments are necessary to identify vulnerabilities. Security architecture follows principles like economy of mechanism, least privilege, and separation of duties. Training users on best practices and continuously reviewing security measures are essential for maintaining a robust security posture. Types of security include red teams, which simulate attacks to find vulnerabilities, blue teams, which defend against attacks, and purple teams, a hybrid of both. Defensive security involves proactive measures like risk assessment, implementing strong protocols, monitoring for threats, and preparing incident response plans. Offensive security focuses on identifying vulnerabilities through red teaming, penetration testing, and ethical hacking. IoT penetration testing simulates attacks on IoT devices and networks to identify weaknesses, ensuring the security of interconnected systems. It identifies vulnerabilities in network services, interfaces, update mechanisms, and more, using tools like Nmap, Metasploit, and Burp Suite. Regular penetration testing helps organizations stay ahead of evolving threats, maintain client trust, and secure IoT devices.",
                whatYouWillLearn: [
                  "Understanding computer networking fundamentals: Learn how devices communicate over networks, including key components like nodes, links, switches, routers, and protocols. Gain insights into LANs, WANs, cloud networks, and network security measures to safeguard data and devices.",
                  "Overview of operating systems: Explore the functions and features of different operating systems, including Linux, macOS, and Windows. Understand how OS manage hardware, memory, tasks, and devices, with a focus on the unique characteristics of each platform.",
                  "Core principles of cybersecurity: Understand the CIA triad (confidentiality, integrity, availability) and risk management strategies to protect against cyber threats. Learn about governance, security architecture, and the importance of regular security assessments and training.",
                  "Defensive and offensive security techniques: Learn about red, blue, and purple teams and how they contribute to cybersecurity efforts. Understand defensive measures like risk assessment, threat monitoring, and incident response, and offensive practices like penetration testing and ethical hacking.",
                  "IoT penetration testing: Understand the challenges of securing IoT devices and networks. Learn the tools and techniques used in IoT penetration testing to identify vulnerabilities and ensure interconnected systems remain secure.",
                ],
                challenges: [
                  {
                    title: "TryHackMe Introduction",
                    resources: [
                      "https://tryhackme.com/room/hello",
                      "https://tryhackme.com/room/openvpn",
                    ],
                    description:
                      "In this task, you are asked to complete all the tasks provided in the TryHackMe rooms till you get 100% completion status. Visit the following TryHackme rooms: Hello Room and OpenVPN Room.\n\nNOTE: Here's a sample screenshot: https://drive.google.com/file/d/1mTzfFvvkZR5FHtk9LRI2uZPt7p-673kO/view?usp=sharing\n\nAfter completing all the tasks, share your public profile URL in the ⁠cyber-security channel using the hashtag #cl-cybersec-thmhello to avail 20 karma points.",
                  },
                  {
                    title: "Principles of Security",
                    resources: ["https://tryhackme.com/room/principlesofsecurity"],
                    description:
                      "In this task, you should demonstrate your understanding of security principles by completing all the tasks in the TryHackMe room 'Principles of Security' till you get 100% completion status.\n\nAfter completing the task, share your public profile URL in the ⁠cyber-security channel using the hashtag #cl-cybersec-principlesofsecurity to avail karma points.",
                  },
                  {
                    title: "Write a Blog",
                    resources: ["https://medium.com/"],
                    description:
                      "In this task, you should share your knowledge and insights on hacking, virtual machines, Linux, and networking by creating a blog with a minimum of 500 words, providing all the necessary information like explanations, examples, and any important insight.\n\nNOTE: You can post your blog on any platform (Medium, Hashnode, WordPress, etc.). Suggested Platform: https://medium.com/\n\nAfter completing this task, share your blog URL in the ⁠cyber-security channel using the hashtag #cl-cybersec-bloghackingintro to avail 100 karma points.",
                  },
                  {
                    title: "Task 4: Introduction to Offensive Security",
                    resources: [
                      "https://tryhackme.com/room/introtooffensivesecurity",
                    ],
                    description:
                      "In this task, you should demonstrate your understanding of offensive security concepts by completing all the tasks in the TryHackMe room 'Introduction to Offensive Security', ensuring you get 100% completion status.\n\nAfter completing the task, share your public profile URL in the ⁠cyber-security channel using the hashtag #cl-cybersec-thmintrotooffensivesecurity to avail 20 karma points.",
                  },
                  {
                    title: "Cisco Networking Basics",
                    resources: [
                      "https://skillsforall.com/course/networking-basics?courseLang=en-US",
                    ],
                    description:
                      "In this task, you have to obtain the Cisco Networking Basics badge by completing all the lessons and requirements in the 'Networking Basics' course provided by Skillsforall.\n\nAfter completing the course, share your badge in the ⁠cyber-security channel using the hashtag #cl-cybersec-cisconetworkingbasics to avail 800 karma points.",
                  },
                  {
                    title: "IoT PenTesting",
                    resources: ["https://tryhackme.com/room/iotintro"],
                    description:
                      "In this task, you have to showcase your skills in IoT (Internet of Things) PenTesting by completing all the tasks in the TryHackMe room 'IoT Pentesting' till you get a 100% completion status.\n\nAfter completing the task, share your public profile URL in the ⁠cyber-security channel using the hashtag #cl-cybersec-thmintroiotpentesting to avail 20 karma points.",
                  },
                  {
                    title: "Cisco Packet Tracer",
                    resources: [
                      "https://skillsforall.com/exam/introduction-packet-tracer?courseLang=en-US",
                      "https://skillsforall.com/course/getting-started-cisco-packet-tracer?courseLang=en-US",
                      "https://skillsforall.com/course/exploring-networking-cisco-packet-tracer?courseLang=en-US",
                      "https://skillsforall.com/course/exploring-iot-cisco-packet-tracer?courseLang=en-US",
                    ],
                    description:
                      "In this task, you are required to complete 4 different SkillsForAll courses on 'Introduction to Packet Tracer', 'Getting Started with Cisco Packet Tracer', 'Exploring Networking', and 'Exploring IoT' and earn badges by completing all the lessons and tasks provided.\n\nAfter completing these courses, share your badge in the ⁠cyber-security channel using the hashtag #cl-cybersec-ciscopackettracer to avail 1200 karma points.",
                  },
                ],
              },
              resources: 11,
              proofOfWork: 7,
              rating: 0,
              hasGift: false,
            },
          ],
        },
        {
          level: "Level 5",
          cards: [
            {
              title: "Networking Knowledge",
              data: {
                description:
                  "This section covers essential networking concepts, protocols, and security practices to equip you with the knowledge needed to manage, secure, and analyze networks effectively. From understanding SSL/TLS to learning about common protocols, ports, and web application security, this level provides a deep dive into the technologies that power modern networks.",
                whatYouWillLearn: [
                  "SSL vs TLS: Learn about Secure Sockets Layer (SSL) and Transport Layer Security (TLS), two cryptographic protocols used to secure internet communications. SSL has been deprecated, and TLS is the preferred, secure protocol for encrypting data in transit.",
                  "Common Protocols and their Uses: Study the fundamental networking protocols such as TCP/IP, HTTP/HTTPS, FTP/SFTP, and DNS, and how they are used in data transmission, web browsing, file transfer, and more.",
                  "OSI Model: Understand the seven layers of the Open Systems Interconnection (OSI) Model, which defines how data communication occurs across a network from physical transmission to application-level interactions.",
                  "Common Ports and their Uses: Get familiar with essential network ports like 80 (HTTP), 443 (HTTPS), and 22 (SSH), and learn how they facilitate communication for different network services and protocols.",
                  "Web Application Security: Explore the practices and protocols to secure web applications from threats like SQL injection, cross-site scripting (XSS), and cross-site request forgery (CSRF). Focus on secure development lifecycle (SDL), input validation, encryption, and monitoring.",
                  "Nessus: Learn how Nessus, a vulnerability scanning tool, helps cybersecurity professionals identify and manage security weaknesses in networks and systems, including its features such as predictive prioritization, dynamic plugin database, and compliance checks.",
                  "BurpSuite: Understand the comprehensive capabilities of BurpSuite for web application security testing, including its various tools for proxying, scanning, intercepting requests, and identifying vulnerabilities in web applications.",
                  "Threat Intelligence Tools: Dive into the tools used for gathering, analyzing, and disseminating threat intelligence, including ActorTrackr, AIEngine, Analyze, and others, which help organizations stay ahead of cyber threats and improve their security posture.",
                  "Nmap: Explore the functionalities of Nmap, a network scanning tool that is widely used for discovering network hosts, scanning for open ports, detecting services, and performing vulnerability assessments.",
                ],
                challenges: [
                  {
                    title: "Web Application Security",
                    resources: [
                      "https://tryhackme.com/room/introwebapplicationsecurity",
                    ],
                    description:
                      "In this task, you have to demonstrate your proficiency in web application security by completing all the tasks in the TryHackMe room 'Intro to Web Application Security' and ensure you get 100% completion status. After completing the task, share your public profile URL in the ⁠cyber-security channel using the hashtag #cl-cybersec-thmwebapplicationsecurity to avail 20 karma points.",
                  },
                  {
                    title: "Nmap Mastery",
                    resources: ["https://tryhackme.com/room/furthernmap"],
                    description:
                      "In this task, you have to demonstrate your expertise in using Nmap by completing all the tasks in the TryHackMe room 'Further Nmap' and make sure to get a 100% completion status. After completing the task, share your public profile URL in the ⁠cyber-security channel using the hashtag #cl-cybersec-thmnmap to avail 200 karma points.",
                  },
                  {
                    title: "Google Dorking Proficiency",
                    resources: ["https://tryhackme.com/room/googledorking"],
                    description:
                      "In this task, you have to showcase your expertise in Google Dorking by successfully completing all the tasks in the TryHackMe room 'Google Dorking' and get a 100% completion status. After completing the task, share your public profile URL in the ⁠cyber-security channel using the hashtag #cl-cybersec-googledorking to avail 100 karma points.",
                  },
                  {
                    title: "Threat Intelligence & Tools Mastery",
                    resources: ["https://tryhackme.com/room/threatinteltools"],
                    description:
                      "In this task, you have to demonstrate your proficiency in threat intelligence tools by successfully completing all the tasks in the TryHackMe room 'Threat Intelligence Tools' and make sure to get a 100% completion status. After completing the task, share your public profile URL in the ⁠cyber-security channel using the hashtag #cl-cybersec-thmthreatintelligencetools to avail 100 karma points.",
                  },
                  {
                    title: "Shodan.io",
                    resources: ["https://tryhackme.com/room/shodan"],
                    description:
                      "In this task, you have to showcase your proficiency in using Shodan.io by successfully completing all the tasks in the TryHackMe room 'Shodan' and make sure to get a 100% completion status. After completing the task, share your public profile URL in the ⁠cyber-security channel using the hashtag #cl-cybersec-thmshodan to avail 100 karma points.",
                  },
                  {
                    title: "Burp Suite Mastery",
                    resources: [
                      "https://tryhackme.com/room/burpsuitebasics",
                      "https://tryhackme.com/room/burpsuiterepeater",
                    ],
                    description:
                      "In this task, you have to demonstrate your proficiency in using Burp Suite by successfully completing all the tasks in the TryHackMe rooms 'Burp Suite Basics' and 'Burp Suite Repeater' making sure you get a 100% completion status for both rooms. After completing the task, share your public profile URL in the ⁠cyber-security channel using the hashtag #cl-cybersec-burpsuite to avail 400 karma points.",
                  },
                  {
                    title: "Nessus",
                    resources: ["https://tryhackme.com/room/rpnessusredux"],
                    description:
                      "In this task, you have to showcase your proficiency in using Nessus by successfully completing all the tasks in the TryHackMe room 'RP: Nessus Redux', and get a 100% completion status. After completing the task, share your public profile URL in the ⁠cyber-security channel using the hashtag #cl-cybersec-thmnessus to avail 100 karma points.",
                  },
                  {
                    title: "SQLMap",
                    resources: ["https://tryhackme.com/room/sqlmap"],
                    description:
                      "In this task, you have to demonstrate your proficiency in using SQLMap by successfully completing all the tasks in the TryHackMe room 'SQLMap', and get a 100% completion status. After completing the task, share your public profile URL in the ⁠cyber-security channel using the hashtag #cl-cybersec-sqlmap to avail 100 karma points.",
                  },
                  {
                    title: "Hydra Proficiency",
                    resources: ["https://tryhackme.com/room/hydra"],
                    description:
                      "In this task, you have to showcase your proficiency in using Hydra by successfully completing all the tasks in the TryHackMe room 'Hydra' ensuring a 100% completion status. After completing the task, share your public profile URL in the ⁠cyber-security channel using the hashtag #cl-cybersec-thmhydra to avail 50 karma points.",
                  },
                  {
                    title: "Metasploit Introduction",
                    resources: ["https://tryhackme.com/room/metasploitintro"],
                    description:
                      "In this task, you have to familiarize yourself with Metasploit by successfully completing all the tasks in the TryHackMe room 'Metasploit Intro' and get a 100% completion status. After completing the task, share your public profile URL in the ⁠cyber-security channel using the hashtag #cl-cybersec-thmmetasploit to avail 50 karma points.",
                  },
                  {
                    title: "Digital Forensics Introduction",
                    resources: ["https://tryhackme.com/room/introdigitalforensics"],
                    description:
                      "In this task, you have to gain insight into the field of digital forensics by successfully completing all the tasks in the TryHackMe room 'Intro to Digital Forensics' and make sure you get a 100% completion status. After completing the task, share your public profile URL in the ⁠cyber-security channel using the hashtag #cl-cybersec-thmintrodigitalforensics to avail 50 karma points.",
                  },
                  {
                    title: "Cryptography Introduction",
                    resources: ["https://tryhackme.com/room/cryptographyintro"],
                    description:
                      "In this task, you have to get acquainted with the fundamentals of cryptography by successfully completing all the tasks in the TryHackMe room 'Introduction to Cryptography' and get a 100% completion status. After completing the task, share your public profile URL in the ⁠cyber-security channel using the hashtag #cl-cybersec-introcryptography to avail 200 karma points.",
                  },
                  {
                    title: "Malware Introductory",
                    resources: ["https://tryhackme.com/room/malmalintroductory"],
                    description:
                      "In this task, you have to gain foundational knowledge about malware by successfully completing all the tasks in the TryHackMe room 'Malware Introductory' and ensure you get a 100% completion status. After completing the task, share your public profile URL in the ⁠cyber-security channel using the hashtag #cl-cybersec-thmmalwareintroductory to avail 100 karma points.",
                  },
                  {
                    title: "Android Hacking",
                    resources: ["https://tryhackme.com/room/androidhacking101"],
                    description:
                      "In this task, you have to dive into Android hacking basics by successfully completing all the tasks in the TryHackMe room 'Android Hacking 101' and get a 100% completion status. After completing the task, share your public profile URL in the ⁠cyber-security channel using the hashtag #cl-cybersec-thmintroandroidhacking101 to avail 50 karma points.",
                  },
                  {
                    title: "Bash Script Port Scanning",
                    resources: [],
                    description:
                      "In this task, you have to develop a Bash script for port scanning to a GitHub repository. After completing the task, share the hosted GitHub repository URL in the ⁠cyber-security channel using the hashtag #cl-cybersec-bashscriptportscanning to avail 200 karma points.",
                  },
                ],
              },
              resources: 15,
              proofOfWork: 15,
              rating: 0,
              hasGift: false,
            },
          ],
        },
        {
          level: "Level 6",
          cards: [
            {
              title: "Security Skills and Knowledges",
              data: {
                description:
                  "Understand Common Hacking Tools: Tools like Nmap, Nessus, Metasploit, Wireshark, and Aircrack-ng used for network exploration, security auditing, and penetration testing require ethical use. Learn more: https://www.eccouncil.org/cybersecurity-exchange/ethical-hacking/best-ethical-hacking-tools/ https://www.youtube.com/watch?v=4WqymtvuWZQ | CIA Triad: Confidentiality, Integrity, and Availability are key principles of information security, ensuring data is secure, accurate, and accessible. Learn more: https://www.fortinet.com/resources/cyberglossary/cia-triad https://www.youtube.com/watch?v=SBcDGb9l6yo | Basics of Forensics: Cyber forensics involves collecting, preserving, analyzing, and reporting digital evidence to investigate and prosecute cybercrimes. Learn more: https://www.splunk.com/en_us/blog/learn/cyber-forensics.html https://www.youtube.com/watch?v=UtDWApdO8Zk | Threat Hunting: Proactively searching for hidden threats using human intuition, threat intelligence, and data analysis to detect and mitigate threats. Learn more: https://www.ibm.com/topics/threat-hunting https://www.youtube.com/watch?v=VNp35Uw_bSM | Web-Based Attacks and OWASP 10: Highlights risks like injection flaws, XSS, and broken authentication to guide secure web development. Learn more: https://owasp.org/www-project-top-ten/ https://youtube.com/playlist?list=PLyqga7AXMtPOguwtCCXGZUKvd2CDCmUgQ | Blue Team vs Red Team vs Purple Team: Blue (defense) protects systems, Red (offense) tests defenses, Purple bridges both for collaboration and security. Learn more: https://www.checkpoint.com/cyber-hub/cyber-security/what-is-a-blue-team/ https://www.ibm.com/think/topics/red-teaming https://www.crowdstrike.com/cybersecurity-101/purple-teaming/",
                whatYouWillLearn: [
                  "Understand Common Hacking Tools: Tools like Nmap, Nessus, Metasploit, Wireshark, and Aircrack-ng used for network exploration, security auditing, and penetration testing require ethical use. Learn more: https://www.eccouncil.org/cybersecurity-exchange/ethical-hacking/best-ethical-hacking-tools/ https://www.youtube.com/watch?v=4WqymtvuWZQ",
                  "CIA Triad: Confidentiality, Integrity, and Availability are key principles of information security, ensuring data is secure, accurate, and accessible. Learn more: https://www.fortinet.com/resources/cyberglossary/cia-triad https://www.youtube.com/watch?v=SBcDGb9l6yo",
                  "Basics of Forensics: Cyber forensics involves collecting, preserving, analyzing, and reporting digital evidence to investigate and prosecute cybercrimes. Learn more: https://www.splunk.com/en_us/blog/learn/cyber-forensics.html https://www.youtube.com/watch?v=UtDWApdO8Zk",
                  "Threat Hunting: Proactively searching for hidden threats using human intuition, threat intelligence, and data analysis to detect and mitigate threats. Learn more: https://www.ibm.com/topics/threat-hunting https://www.youtube.com/watch?v=VNp35Uw_bSM",
                  "Web-Based Attacks and OWASP 10: Highlights risks like injection flaws, XSS, and broken authentication to guide secure web development. Learn more: https://owasp.org/www-project-top-ten/ https://youtube.com/playlist?list=PLyqga7AXMtPOguwtCCXGZUKvd2CDCmUgQ",
                  "Blue Team vs Red Team vs Purple Team: Blue (defense) protects systems, Red (offense) tests defenses, Purple bridges both for collaboration and security. Learn more: https://www.checkpoint.com/cyber-hub/cyber-security/what-is-a-blue-team/ https://www.ibm.com/think/topics/red-teaming https://www.crowdstrike.com/cybersecurity-101/purple-teaming",
                ],
                challenges: [
                  {
                    title: "DVWA Vulnerability Analysis Report",
                    resources: [
                      "https://www.vulnhub.com/entry/damn-vulnerable-web-application-dvwa-107,43/",
                      "https://cybereaon.com/wp-content/uploads/2021/05/sample_report_web.pdf",
                    ],
                    description:
                      "In this task, you have to create a report detailing the exploitation of every vulnerability in the Damn Vulnerable Web Application (DVWA). Check out the provided links. NOTE: Make sure you follow the format of the sample report and submit it in PDF format. After completing this task, upload the report PDF in the ⁠cyber-security channel using the hashtag #cl-cybersec-dvwa to avail 400 karma points.",
                  },
                  {
                    title: "OWASP Juice Shop",
                    resources: ["https://tryhackme.com/room/owaspjuiceshop"],
                    description:
                      "In this task, you have to demonstrate your expertise in web application security by successfully completing all the tasks in the TryHackMe room 'OWASP Juice Shop' and make sure you get a 100% completion status. After completing the task, share your public profile URL in the ⁠cyber-security channel using the hashtag #cl-cybersec-owaspjuiceshop to avail 400 karma points.",
                  },
                  {
                    title: "OWASP Top 10 Proficiency",
                    resources: ["https://tryhackme.com/room/owasptop10"],
                    description:
                      "In this task, you have to demonstrate your expertise in the OWASP Top 10 vulnerabilities by successfully completing the Tryhackme room 'OWASP Top 10' and getting a 100% completion status. After completing the task, share your public profile URL in the ⁠cyber-security channel using the hashtag #cl-cybersec-owasptop10 to avail 800 karma points.",
                  },
                  {
                    title: "Task 4: VulnHub Web Machine Challenge",
                    resources: [
                      "https://www.vulnhub.com/entry/web-machine-n7,756/",
                    ],
                    description:
                      "In this task, you have to compromise the given VulnHub machine by exploiting vulnerabilities, conducting a thorough penetration test, and creating a detailed write-up on its vulnerabilities, exploitation techniques, and any tools used. NOTE: Make sure to submit the write-up in PDF format. After completing the task, share the PDF write-up in the ⁠cyber-security channel using the hashtag #cl-cybersec-webmachine to avail 800 karma points.",
                  },
                  {
                    title: "VulnHub WebSploit Challenge",
                    resources: [
                      "https://www.vulnhub.com/entry/websploit2018-1,253/",
                    ],
                    description:
                      "In this task, you have to compromise the given VulnHub machine by exploiting vulnerabilities, conducting penetration tests, and creating a detailed write-up on the vulnerabilities, exploitation techniques, and any tools used. NOTE: Make sure to submit the write-up in PDF format. After completing the task, share the PDF write-up in the ⁠cyber-security channel using the hashtag #cl-cybersec-websploit to avail 800 karma points.",
                  },
                  {
                    title: "VulnHub OWASP Broken Web Application Challenge",
                    resources: [
                      "https://www.vulnhub.com/entry/owasp-broken-web-applications-project-12,46/",
                    ],
                    description:
                      "In this task, you have to compromise the given VulnHub machine 'OWASP Broken Web Applications Project' by exploiting vulnerabilities, conducting penetration tests, and creating a detailed write-up on the vulnerabilities, exploitation techniques, and any tools used. NOTE: Make sure to submit the write-up in PDF format. After completing the task, share the PDF write-up in the ⁠cyber-security channel using the hashtag #cl-cybersec-owaspbrokenwebapp to avail 800 karma points.",
                  },
                  {
                    title: "CSRF Vulnerability Crawler and Research",
                    resources: [],
                    description:
                      "In this task, you have to conduct research on CSRF (Cross-Site Request Forgery) Middleware and Protections, create a crawler and develop an HTML form Proof of Concept (PoC). Research CSRF Middleware and Protections, develop a crawler to scan web applications for CSRF vulnerabilities, create a PoC HTML page demonstrating the vulnerability, and upload your code to a GitHub repository. After completing this task, share the hosted GitHub repository URL in the ⁠cyber-security channel using the hashtag #cl-cybersec-crawler to avail 800 karma points.",
                  },
                  {
                    title: "WAF Evasion for XSS - Python Script",
                    resources: [],
                    description:
                      "In this task, you have to study and research Web Application Firewalls (WAFs) and their character-based filters for XSS (Cross-Site Scripting) and create a small Python script that can evade these filters. Research WAF mechanisms, develop a Python script to generate XSS payloads that evade character-based filters, test against a sample web application, document findings, and upload to a GitHub repository. After completing this task, share the hosted GitHub repository URL in the ⁠cyber-security channel using the hashtag #cl-cybersec-pysxss to avail 800 karma points.",
                  },
                ],
              },
              resources: 7,
              proofOfWork: 8,
              rating: 0,
              hasGift: false,
            },
          ],
        },
      ],
      thinkTank: [
        {
          id: "tt-003",
          name: "Lucas Reed",
          role: "Cybersecurity Expert, Cisco",
          image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&q=80",
          expertise: ["Penetration Testing", "Network Security"],
        },
      ],
      mentors: [
        {
          id: "m-003",
          name: "Rejah Rehim",
          role: "CEO and Co-founder, Beagle Security",
          linkedin: "https://www.linkedin.com/in/rejah",
          image: "/assets/IG/Cyber Security/Mentors/Rejah Rehim.webp",
          expertise: [], // Add if available
        },
        {
          id: "m-004",
          name: "Maninder Mohan",
          role: "Cyber Security Specialist",
          linkedin: "https://www.linkedin.com/in/manindar-m",
          image: "/assets/IG/Cyber Security/Mentors/Maninder Mohan.webp",
          expertise: [],
        },
        {
          id: "m-005",
          name: "Vishnu Vijayan V S",
          role: "Chief Information Security Officer",
          linkedin: "https://www.linkedin.com/in/vishnu-vijayan-vs",
          image: "/assets/IG/Cyber Security/Mentors/Vishnu Vijayan V S.webp",
          expertise: [],
        },
      ],
    },
    communityPartners: [
      {
        id: "cp-003-1",
        title: "Beagle Security",
        image: "/assets/IG/Cyber Security/Community partners/Beagle Security.webp",
        link: "#",
      },
      {
        id: "cp-003-2",
        title: "Zilicon Technologies",
        image: "/assets/IG/Cyber Security/Community partners/Zilicon technologies.webp",
        link: "#",
      },
    ],
    partnerCompanies: [
      {
        id: "pc-003",
        title: "SecureTech",
        image: "https://www.svgrepo.com/show/452092/shield.svg",
        link: "https://securetech.com",
      },
    ],
  },
  // Game Development Interest Group
  {
    id: "1be43a3a-bcfb-4ef1-b77a-959b01bcb782",
    title: "Game Development",
    description:
      "Passionate about creating immersive experiences in gaming? The Game Development Interest Group is your gateway to learning about designing, programming, and storytelling in the world of games. Whether you're into creating captivating visuals, coding mechanics, or crafting narratives, join us to level up your game development skills.",
    bannerImage:
    "/assets/IG/Cover/4.png",

    memberCount: 2500,
    memberSince: "January 2022",
    isPublic: true,
    officeHours: "Friday 8:30PM",
    thinkTankMeeting: "2nd Saturday 8:30 PM @ Google Meet",
    interestGroupLeads: {
      description:
        "Interest group leads manage the activities and events within interest groups and serve as a point of contact for students interested in getting involved. Students can connect with these leads to learn about opportunities within their interests",
      leads: [
        {
          name: "Sabal Krishna S",
          institution: "St.Thomas Institute for Science and Technology, Trivandrum",
          linkedin: "https://www.linkedin.com/in/sabal-krishna-s-29b758298/",
          image: "/assets/IG/Game Development/IG Lead/image.webp",
        },
      ],
    },
    prerequisites: [
      "Basic computer skills, such as installing software and managing files or folders.",
      "Familiarity with programming concepts, including variables, loops, and functions.",
      "Knowledge of C++ is a plus but not mandatory.",
      "Basic understanding of 3D math, such as vectors and transformations, for working with 3D objects.",
      "Awareness of fundamental game design principles, including level layout and gameplay mechanics.",
    ],
    peopleToFollow: [
      { name: "Hideo Kojima", link: "https://twitter.com/HIDEO_KOJIMA_EN" },
      { name: "John Carmack", link: "https://x.com/ID_AA_Carmack" },
      { name: "Rami Ismail", link: "https://x.com/tha_rami" },
      { name: "Cory Barlog", link: "https://x.com/corybarlog" },
    ],
    blogsToFollow: [
      {
        name: "Next Level Plugins",
        link: "https://nextlevelplugins.com/blog//2024/11/Level-Up-Your-Unreal-Engine-Game-Essential-Blogs-for-Developers.html",
      },
      {
        name: "Game Developer",
        link: "https://www.gamedeveloper.com/design/the-art-of-game-balance-evolution",
      },
      {
        name: "Game Dev Candids",
        link: "https://gamedevcandids.com/how-to-find-your-games-north-star/",
      },
    ],
    topKeywords: [
      "Game Engines",
      "Level Design",
      "Scripting",
      "3D Modeling",
      "AI for Games",
      "Game Physics",
      "UI/UX for Games",
      "Multiplayer Systems",
    ],
    tabs: {
      about: {
        foundationDeck: "https://www.notion.so/Game-Development-11e59e69b1bf8002aaa0e99daf76a94f?pvs=4",
        description:
          "The Game Development Interest Group unites creators passionate about designing immersive gaming experiences using cutting-edge tools and techniques.",
        opportunities: [
          {
            title: "Game Designer",
            description:
              "Shape the rules, mechanics, and storytelling for engaging gameplay.",
          },
          {
            title: "Game Programmer",
            description: "Code and optimize game mechanics, physics, and AI.",
          },
          {
            title: "3D Artist",
            description: "Design characters, environments, and props.",
          },
          {
            title: "Animator",
            description:
              "Create realistic or stylized movements for characters and objects.",
          },
          {
            title: "Level Designer",
            description: "Build engaging and balanced game levels.",
          },
          {
            title: "Sound Designer",
            description: "Develop immersive sound effects and music.",
          },
          {
            title: "UI/UX Designer",
            description:
              "Design user-friendly interfaces and enhance player experience.",
          },
          {
            title: "Quality Assurance Tester",
            description:
              "Ensure the game runs smoothly by identifying and reporting bugs.",
          },
          {
            title: "Narrative Designer",
            description: "Develop compelling stories, dialogues, and in-game lore.",
          },
        ],
      },
      forum: { placeholder: "Talk about game dev here." },
      members: [
        {
          id: 16,
          name: "Zoe Turner",
          muid: "zoe123",
          profile_pic:
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&q=80",
          karma: "1600",
          interest_groups: [
            { id: "45fdd535-08d2-4619-9da7-944e21365de9", name: "Game Development Interest Group" },
          ],
          organizations: [
            { id: "org-17", title: "Game College", code: "GC01", org_type: "College" },
          ],
        },
      ],
      events: [
        {
          id: "evt-009",
          title: "Unity Game Jam 2025",
          link: "https://gamedevcommunity.com/events/game-jam",
          venue: "Online via Discord",
          eventType: "Online",
          date: "April 15, 2025",
          time: "12:00 - 18:00 GMT",
          image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=800",
        },
      ],
      learningPaths: [
        {
          level: "Level 4",
          cards: [
            {
              title: "Foundational Understanding",
              data: {
                description:
                  "At the heart of every great game lies a solid foundation. Whether you're a beginner or someone with a bit of experience, understanding the building blocks of game development is essential. This means delving into the core mechanics that make games tick, like player interaction, objectives, and challenges. It’s not just about coding or graphics—it’s about crafting an experience that draws players in and keeps them engaged. In this phase, we’ll explore the tools and systems that Unreal Engine offers, such as its user-friendly Blueprint system that lets you create logic without needing to write code. We'll also familiarize ourselves with the engine’s interface, its capabilities, and its vast library of resources. Think of this as laying the foundation of a house—before you can build something impressive, you need to understand the basic structure and materials. This isn’t just about technical skills; it’s about getting comfortable with the process of game creation, feeling confident in your ability to transform ideas into reality, and building the mindset that turns challenges into creative opportunities.",
                whatYouWillLearn: [
                  "Introduction to Game Development: Understand the core principles of game design, including player engagement, objectives, and interactive mechanics that create immersive experiences.",
                  "Unreal Engine 5 Interface Overview: Familiarize yourself with the engine's interface, tools, and layout to build a strong understanding of its capabilities and workflows.",
                  "Blueprint System Basics: Learn how to use Unreal Engine’s visual scripting tool to create game logic without coding, empowering you to bring your ideas to life efficiently.",
                  "Navigating Resources and Tools: Explore Unreal Engine’s vast library of assets, tutorials, and documentation to enhance your projects and accelerate your learning.",
                ],
                challenges: [
                  {
                    title: "Research the basics of game development",
                    resources: [
                      "https://gamedevacademy.org/game-design-principles-tutorial/",
                      "https://youtu.be/7C92ZCnlmQo?si=BKyuWrZEapLfsvF6",
                    ],
                    description:
                      "Dive into the fundamentals of game development to understand key aspects like game design, programming, art, and sound. Explore essential concepts such as mechanics, gameplay elements, and player interaction. This foundational knowledge will serve as a stepping stone for creating engaging games. After completing your research, create a blog that summarizes your findings. Once done, submit the public link of the blog in the #Game-Dev channel using the hashtag #cl-game-dev-basics to earn 200 Karma Points. (Suggestion: Use Medium for blog)",
                  },
                  {
                    title: "Unreal Engine 5 Overview and Installation",
                    resources: [
                      "https://dev.epicgames.com/documentation/en-us/unreal-engine/installing-unreal-engine",
                      "https://www.youtube.com/watch?v=k-zMkzmduqI&t=12676s",
                    ],
                    description:
                      "Download and install Unreal Engine 5 on your system. Once installed, explore the interface to familiarize yourself with key components like the viewport, content browser, outliner, and details panel. This task will help you understand the basic layout and functionality of the engine, preparing you for future projects. After completing take a screenshot of the opening interface screen of unreal engine with the project name as your name. Once done, submit the screenshot in the #Game-Dev channel using the hashtag #cl-game-dev-unreal to earn 200 Karma Points.",
                  },
                ],
              },
              resources: 4,
              proofOfWork: 2,
              rating: 0,
              hasGift: true,
            },
            {
              title: "Core Engine Skills",
              data: {
                description:
                  "Once you’ve mastered the basics, it’s time to delve into Unreal Engine’s advanced features and bring your ideas to life. This stage focuses on key skills like manipulating 3D assets, designing functional and visually stunning environments, and using Blueprints for interactivity without complex coding. You’ll explore Unreal's physics engine for realistic dynamics, master lighting and rendering to set the perfect atmosphere, and gain expertise in scene and asset management. By honing these core skills, you’ll transition from beginner to expert, ready to build anything from simple prototypes to immersive game worlds, unlocking your full creative potential.",
                whatYouWillLearn: [
                  "Project Setup & Navigation: Learn to create and manage projects effectively, navigate the Unreal Engine interface, and organize assets for streamlined workflows.",
                  "Game Level Layout: Develop skills in designing game levels by arranging 3D assets to create compelling environments that guide and engage players.",
                  "Lighting and Rendering/Post-Processing: Master lighting techniques, rendering settings, and post-processing effects to create dynamic, atmospheric visuals that enhance the gaming experience.",
                  "Blueprints for Interactivity: Explore Unreal Engine’s visual scripting system to implement interactivity, gameplay mechanics, and dynamic features without extensive coding.",
                ],
    
                challenges: [
                  {
                    title: "Set up a simple project in Unreal Engine 5",
                    resources: ["https://www.youtube.com/watch?v=1XjgLKrb4_M"],
                    description:
                      "Create a new project in Unreal Engine 5 by selecting a suitable template, such as First Person, Third Person, or Blank, based on your preference. Set up the project structure by organizing folders for assets, blueprints, materials, and any other essential components. Familiarize yourself with the settings and configuration options to ensure the project is optimized for development. This task will help you understand the basics of project creation, structure, and initial setup within Unreal Engine. During the project setting up take a screen recording of the process. Once done, upload it to any cloud platform and submit the link in the #Game-Dev channel using the hashtag #cl-game-dev-project to earn 200 Karma Points.",
                  },
                  {
                    title: "Design a basic game level layout",
                    resources: ["https://www.youtube.com/watch?v=1XjgLKrb4_M"],
                    description:
                      "Design a basic game level layout in Unreal Engine 5 that incorporates clear pathways, obstacles, and interactive elements. Focus on creating an engaging environment that naturally guides players through the level. Consider player movement, visibility, and balance to ensure the design is both functional and enjoyable. This task is an excellent starting point for honing your level design and environmental creation skills. Create a basic game level layout using Unreal Engine. Your level should include clear pathways, obstacles, and interactive elements, focusing on functionality and creativity over fine details or polish. Once completed, upload your project to GitHub, ensuring you include a README file that describes your level design concept and the tools you used. Submit the GitHub repository link in the #Game-Dev channel using the hashtag #cl-game-dev-basiclayout to earn 250 Karma Points.",
                  },
                  {
                    title: "Experiment with lighting settings and post-processing",
                    resources: ["https://www.youtube.com/watch?v=1XjgLKrb4_M"],
                    description:
                      "Experiment with different lighting settings and post-processing effects in Unreal Engine 5 to enhance the visual appeal of your scene. Adjust light intensity, color, and shadows to create dynamic and realistic lighting. Explore post-processing features such as bloom, depth of field, and ambient occlusion to add depth and polish to your environment. This task will help you understand how lighting and post-processing can dramatically impact the mood and aesthetics of a game. Once completed, upload your project to GitHub, including a README file that describes the lighting and post-processing techniques you implemented. Submit the GitHub repository link in the #Game-Dev channel using the hashtag #cl-game-dev-lighting to earn 250 Karma Points.",
                  },
                  {
                    title: "Create basic interactions using Blueprints",
                    resources: [
                      "https://www.youtube.com/watch?v=1XjgLKrb4_M",
                      "https://www.youtube.com/watch?v=oHoXwMjhOC8&t=30s",
                    ],
                    description:
                      "Use Unreal Engine’s Blueprints to design and implement basic interactions in your game. Examples include opening doors, turning lights on or off, or activating objects when the player interacts with them. Focus on functionality and ensure the interactions respond correctly to player input. This task will introduce you to Unreal’s visual scripting system and the basics of interactive gameplay. Create basic game interactions using Unreal Engine’s Blueprints. Focus on implementing simple interactions such as opening doors, triggering events, or activating objects when the player interacts with them. Once completed, upload your project to GitHub, ensuring you include a README file that explains the interactions you implemented and how they work. Submit the GitHub repository link in the #Game-Dev channel using the hashtag #cl-game-dev-blueprints to earn 250 Karma Points.",
                  },
                ],
              },
              resources: 5,
              proofOfWork: 4,
              rating: 0,
              hasGift: true,
            },
          ],
        },
        {
          level: "Level 5",
          cards: [
            {
              title: "Programming and Scripting",
              data: {
                description:
                  "At the core of every game is the logic that drives its actions and interactions, which is where programming and scripting come in. While Unreal Engine’s Blueprint system is a great tool for non-programmers, mastering the fundamentals of scripting takes your skills to the next level. In this stage, we’ll focus on Unreal’s C++ integration, teaching you how to write code that interacts directly with the engine. C++ enables you to create complex game mechanics, optimize performance, and gain control over gameplay. You’ll start with basic coding concepts and move into more advanced topics like object-oriented and event-driven programming. By mastering scripting, you'll be able to solve problems creatively and create functional, scalable, and engaging gameplay.",
                whatYouWillLearn: [
                  "Introduction to C++ for Unreal: Learn the basics of Unreal Engine’s C++ programming, including setting up your development environment and understanding the core syntax and structure.",
                  "Advanced Blueprints: Enhance your Blueprint scripting knowledge by integrating C++ to create more robust and efficient gameplay systems.",
                  "Gameplay Mechanics Development: Explore the process of designing and implementing gameplay mechanics, from character controls to AI behavior, using both Blueprints and C++.",
                  "Event-Driven and Object-Oriented Programming: Master programming paradigms like event-driven and object-oriented approaches to create scalable and maintainable game logic.",
                ],
    
                challenges: [
                  {
                    title: "Write a simple C++ script for an in-game action",
                    resources: [
                      "https://awesometuts.com/blog/cpp-unreal-engine",
                      "https://youtu.be/HNfpKFER2hI?si=z3RgbjvHKIqo9Mxs",
                    ],
                    description:
                      "Write a simple C++ script in Unreal Engine 5 to implement an in-game action, such as making the player jump, interact with objects, or trigger a special effect. Focus on creating the core functionality using Unreal's C++ framework and ensure the script interacts properly with the game’s mechanics. This task will help you get hands-on experience with Unreal Engine’s C++ coding environment and improve your programming skills for game development.\n\nWrite a simple C++ script in Unreal Engine to implement an in-game action, such as triggering a jump, opening a door, or interacting with an object. Focus on the basic functionality and ensure the script works as intended within the game.\n\nOnce completed, upload your project to GitHub, including a README file that describes the script and the action it performs.\n\nSubmit the GitHub repository link in the #Game-Dev channel using the hashtag #cl-game-dev-cplusplus to earn 300 Karma Points.",
                  },
                  {
                    title: "Create a complex interaction using Blueprints",
                    resources: [
                      "https://dev.epicgames.com/documentation/en-us/unreal-engine/introduction-to-blueprints-visual-scripting-in-unreal-engine",
                      "https://www.youtube.com/watch?v=Xw9QEMFInYU",
                    ],
                    description:
                      "Design and implement a complex interaction using Unreal Engine’s Blueprints. Create systems such as a multi-step puzzle, a dynamic object that responds to multiple triggers, or an event sequence that combines animations and logic. Focus on creating seamless interactions that enhance gameplay and challenge the player. This task will deepen your understanding of Unreal's visual scripting system and help you create more engaging and intricate gameplay mechanics.\n\nCreate a complex in-game interaction using Unreal Engine’s Blueprints. This could involve multiple triggers, animations, or interactions that depend on player actions, such as a puzzle system, a dynamic object that reacts to player input, or a more advanced event sequence.\n\nOnce completed, upload your project to GitHub, including a README file that explains the interactions you’ve created and how they function.\n\nSubmit the GitHub repository link in the #Game-Dev channel using the hashtag #cl-game-dev-complexblueprint to earn 300 Karma Points.",
                  },
                  {
                    title: "Implement basic player movement and interaction",
                    resources: [
                      "https://dev.epicgames.com/documentation/en-us/unreal-engine/setting-up-character-movement",
                      "https://youtu.be/Z9zEEY7dGaM?si=gNllnL1I6569gklH",
                    ],
                    description:
                      "Set up basic player movement and interaction mechanics in Unreal Engine 5. Enable core movements like walking, running, and jumping by configuring input controls. Add simple player interactions such as picking up objects, pressing buttons, or opening doors using Blueprints or C++ scripting. This task will introduce you to handling character input and interaction systems, essential for creating engaging gameplay.\n\nImplement basic player movement and interaction in Unreal Engine using either Blueprints or C++. Set up standard player controls such as walking, running, jumping, and interacting with objects (e.g., picking up items, opening doors).\n\nOnce completed, upload your project to GitHub, including a README file that explains the movement mechanics and interactions you’ve implemented.\n\nSubmit the GitHub repository link in the #Game-Dev channel using the hashtag #cl-game-dev-playermovement to earn 350 Karma Points.",
                  },
                ],
              },
              resources: 6,
              proofOfWork: 3,
              rating: 0,
              hasGift: true,
            },
            {
              title: "3D Modeling and Animation",
              data: {
                description:
                  "Creating immersive game worlds starts with 3D modeling and animation, blending art with technical skill. In this phase, you’ll learn to use 3D modeling tools to design game assets like characters, landscapes, and props, focusing on polygonal modeling, texturing, and sculpting to create detailed, optimized models. Beyond static objects, you’ll explore animation techniques, including rigging and keyframe animation, to bring your models to life with realistic motion. Additionally, you’ll dive into Unreal Engine’s Animation Blueprint to integrate animations into gameplay. Mastering these skills will enhance your game’s visuals and storytelling, making your creations dynamic, engaging, and immersive.",
                whatYouWillLearn: [
                  "Importing Assets: Learn to import 3D models, textures, and other assets into Unreal Engine while ensuring compatibility and optimization for game development.",
                  "Animation Basics: Explore foundational animation techniques, including keyframing and timeline editing, to create smooth and realistic movement for characters and objects.",
                  "Rigging and Skeletal Meshes: Understand how to rig 3D models with skeletons and use skeletal meshes to enable dynamic animations and interactions in your game.",
                  "Using Animation Blueprints: Dive into Unreal Engine’s Animation Blueprint system to integrate and control animations in gameplay, adding realism and interactivity to your creations.",
                ],
    
                challenges: [
                  {
                    title: "Import a 3D model into Unreal Engine",
                    resources: [
                      "https://www.youtube.com/watch?v=axF0m6lOjG8",
                      "https://www.youtube.com/watch?v=0ISnxjlLfx0",
                    ],
                    description:
                      "Import a 3D model into Unreal Engine 5 to use within your project. Ensure the model is properly textured, scaled, and positioned in the scene. Verify that all materials, animations (if any), and collisions are functioning correctly. This task will familiarize you with the process of bringing external assets into Unreal Engine for use in game environments.\n\nImport a 3D model into Unreal Engine. The model should include textures and materials where applicable. Once imported, ensure the model is correctly placed in the scene and functions as expected.\n\nOnce completed, upload your project to GitHub, including a README file that describes the 3D model, the software used to create it, and any adjustments made in Unreal Engine.\n\nSubmit the GitHub repository link in the #Game-Dev channel using the hashtag #cl-game-dev-3dmodel to earn 250 Karma Points.",
                  },
                  {
                    title: "Add simple animations to a character",
                    resources: [
                      "https://www.youtube.com/watch?v=WUXvq6At6pE",
                      "https://www.youtube.com/watch?v=WUXvq6At6pE",
                    ],
                    description:
                      "Add simple animations to a character in Unreal Engine 5 using the Animation Blueprint system. Implement basic actions such as idle, walking, running, or jumping. Set up state transitions to ensure the animations play smoothly based on player input. This task will help you understand how to create lifelike movement and enhance the character’s presence in the game.\n\nAdd basic animations to a character in Unreal Engine, such as walking, running, and jumping. Use Unreal’s Animation Blueprint system to set up the character's animation states and transitions based on player input.\n\nOnce completed, upload your project to GitHub, including a README file that describes the animations added and how they are triggered within the game.\n\nSubmit the GitHub repository link in the #Game-Dev channel using the hashtag #cl-game-dev-characteranimations to earn 300 Karma Points.",
                  },
                  {
                    title: "Set up a skeletal mesh for a character model",
                    resources: [
                      "https://www.youtube.com/watch?v=g6BxRs910SA&list=WL&index=23",
                      "https://www.youtube.com/watch?v=FebmlYAJ0Uc&list=WL&index=19",
                      "https://www.youtube.com/watch?v=X4X-_ZdZgew&list=WL&index=20",
                    ],
                    description:
                      "Set up a skeletal mesh for a character model in Unreal Engine 5. Import the model with its skeleton and rigging, ensuring proper integration for animations and movement. Test the skeletal mesh to verify that it deforms correctly during animations. This task will help you understand the essentials of working with character models and preparing them for animation.\n\nSet up a skeletal mesh for a character model in Unreal Engine. Import your character model with its skeleton and rigging, ensuring that it is properly linked to the skeletal structure for animation. Configure the mesh to work with the animation system and verify that it moves correctly within the engine.\n\nOnce completed, upload your project to GitHub, including a README file that explains the skeletal mesh setup, the tools used for rigging, and any adjustments made in Unreal Engine.\n\nSubmit the GitHub repository link in the #Game-Dev channel using the hashtag #cl-game-dev-skeletalmesh to earn 350 Karma Points.",
                  },
                ],
              },
              resources: 7,
              proofOfWork: 3,
              rating: 0,
              hasGift: true,
            },
            {
              title: "Physics and Spatial Effects",
              data: {
                description:
                  "Games need more than visuals and interactivity—they need to feel real. Physics and special effects bring depth, realism, and excitement to your game world. Unreal Engine’s physics engine simulates gravity, collisions, and forces, enabling believable interactions like breaking walls or shattering objects. Special effects (VFX) enhance this realism, adding visual flair with elements like explosions, rain, fire, and magical spells. Using Unreal’s Niagara particle system, you’ll create dynamic, reactive effects that elevate gameplay. Mastering physics and VFX allows you to craft immersive, impactful experiences, blending realism with creative spectacle to make your game truly unforgettable.",
                whatYouWillLearn: [
                  "Physics Simulation: Understand the fundamentals of Unreal Engine’s physics system, including gravity, collisions, forces, and constraints, to create realistic in-game interactions.",
                  "Particle System and VFX: Learn to design visual effects using Unreal’s particle systems to simulate natural phenomena like fire, smoke, and water for a more immersive experience.",
                  "Niagara Effects System: Master Unreal Engine’s advanced Niagara system to create dynamic, real-time effects that react to gameplay and player interactions.",
                  "Integrating Physics with Gameplay: Combine physics simulations and special effects to enhance gameplay mechanics, such as destructible environments and interactive objects, for an engaging player experience.",
                ],
                challenges: [
                  {
                    title: "Apply Physics to Objects in a Scene",
                    resources: [
                      "https://www.youtube.com/watch?v=Klgz8HKcI88&list=WL&index=18&t=289s",
                      "https://www.youtube.com/watch?v=qbgDaRo312k&list=WL&index=26",
                    ],
                    description:
                      "Apply physics to objects in a scene using Unreal Engine 5. Enable features like gravity, collisions, and physical interactions, allowing objects to respond realistically to forces such as pushes, pulls, or impacts. Test the setup to ensure the objects behave naturally within the environment. This task will introduce you to Unreal’s physics system and enhance the realism of your game. Apply physics to objects in a scene in Unreal Engine. Set up realistic behaviors such as gravity, collision, and forces (e.g., pushing, pulling, and rotating) for different objects. Ensure the objects interact naturally with the environment, responding to player actions or environmental factors.Once completed, upload your project to GitHub, including a README file that explains the physics settings applied and how they affect the objects in the scene. Submit the GitHub repository link in the #Game-Dev channel using the hashtag #cl-game-dev-physics to earn 200 Karma Points.",
                  },
                  {
                    title: "Create a Particle Effect",
                    resources: [
                      "https://www.youtube.com/watch?v=0PZdiosoi68&list=WL&index=17",
                    ],
                    description:
                      "Create a particle effect in Unreal Engine 5, such as an explosion, smoke, or fire. Use the Niagara particle system to design the effect by adjusting properties like particle size, velocity, color, and lifespan. Experiment with additional modules to enhance realism and visual appeal. This task will help you understand the fundamentals of particle systems and how to add dynamic effects to your game. Create a particle effect using Niagara or other technologies available in Unreal Engine, such as an explosion, smoke, or fire. Use the Niagara system to design and implement the effect, adjusting properties like particle size, velocity, color, and duration to create a realistic and visually appealing result. Once completed, upload your project to GitHub, including a README file that describes the particle effect and how it was created using Niagara in Unreal Engine. Submit the GitHub repository link in the #Game-Dev channel using the hashtag #cl-game-dev-particleeffect to earn 300 Karma Points.",
                  },
                  {
                    title: "Design a Visual Effect Using Niagara",
                    resources: [
                      "https://www.youtube.com/watch?v=pzIORuULNfo&list=WL&index=15",
                    ],
                    description:
                      "Design a visual effect using the Niagara system in Unreal Engine 5, such as a magical spell, energy burst, or environmental effect like rain or fog. Leverage Niagara’s advanced modules to control particle behavior, colors, and animations. Experiment with features like ribbons, trails, or mesh emitters to create a visually engaging and immersive effect. This task will help you develop skills in creating advanced, custom visual effects for your game. Design a visual effect using Niagara in Unreal Engine, such as a magic spell, energy beam, or environmental effect (e.g., rain or fog). Focus on creating dynamic visuals with a combination of particle systems, forces, and behaviors. You can also incorporate advanced features like mesh particles, ribbons, or trails to enhance the effect. Once completed, upload your project to GitHub, including a README file that describes the visual effect, the techniques used, and how it was created using Niagara. Submit the GitHub repository link in the #Game-Dev channel using the hashtag #cl-game-dev-niagaravfx to earn 350 Karma Points.",
                  },
                ],
              },
              resources: 4,
              proofOfWork: 3,
              rating: 0,
              hasGift: true,
            },
          ],
        },
        {
          level: "Level 6",
          cards: [
            {
              title: "UIUX Design",
              data: {
                description:
                  "A game isn’t just about visuals and mechanics—it’s about crafting an experience that players navigate effortlessly. UI/UX design ensures interfaces are intuitive, functional, and immersive. In this phase, you’ll learn to create game menus, HUDs, and interactive elements using Unreal Engine’s UMG Editor. You’ll focus on designing clear layouts, responsive elements, and accessible features like colorblind-friendly palettes and readable fonts. By understanding player psychology, you’ll create seamless flows and consistent feedback that enhance gameplay. Mastering UI/UX design makes your game polished and enjoyable, turning complex systems into an intuitive, engaging experience for players.",
                whatYouWillLearn: [
                  "User Interface (UI) Creation: Learn to design user interfaces using Unreal Engine's UMG Editor, including menus, settings screens, and interactive buttons that enhance player interaction.",
                  "HUD and On-Screen Indicators: Explore how to create heads-up displays (HUDs) and in-game indicators for elements like health, ammo, and objectives, providing players with essential real-time information.",
                  "Responsive and Accessible Design: Understand the principles of responsive design to ensure interfaces adapt to different screen sizes, while incorporating accessibility features for diverse player needs.",
                  "Player Feedback and Interaction: Master techniques for delivering clear feedback through UI animations, sound effects, and visual cues, creating a seamless and engaging player experience.",
                ],
    
                challenges: [
                  {
                    title: "Design and implement a basic game menu",
                    resources: [
                      "https://www.youtube.com/watch?v=kumZj_mov58&list=WL&index=13",
                      "https://www.youtube.com/watch?v=zWI-36fIoDQ&list=WL&index=14",
                    ],
                    description:
                      "Design and implement a basic game menu in Unreal Engine 5. Include essential features such as a start button, options menu, and quit functionality. Use the UMG (Unreal Motion Graphics) system to create the menu interface and configure interactions using Blueprints. Ensure smooth navigation between menu screens. This task will introduce you to UI design and functionality within Unreal Engine.\n\nDesign and implement a basic game menu in Unreal Engine, including features like a main menu, start button, options, and quit functionality. Use Blueprints or C++ to create the menu structure and set up interactions, such as transitioning between menus and adjusting simple settings (e.g., volume, graphics quality).\n\nOnce completed, upload your project to GitHub, including a README file that explains the menu layout, the interactions implemented, and the functionality of each button.\n\nSubmit the GitHub repository link in the #Game-Dev channel using the hashtag #cl-game-dev-gamemenu to earn 250 Karma Points.",
                  },
                  {
                    title: "Displaying Player Health or Score in the UI",
                    resources: [
                      "https://www.youtube.com/watch?v=vO1i9Wcx4Xc&list=WL&index=12",
                      "https://www.youtube.com/watch?v=2YEZpSrdHfk&list=WL&index=11",
                    ],
                    description:
                      "Implement a system to display player health or score on the screen in Unreal Engine 5. Use UMG (Unreal Motion Graphics) to create UI elements like a health bar or score counter that updates in real-time as the player progresses. Customize the display for clarity and aesthetics. This task will help you understand how to integrate essential gameplay data into the user interface, enhancing player experience.\n\nImplement a system to display the player’s health or score on the screen in Unreal Engine. Use Blueprints or C++ to create a UI element (e.g., a health bar or score counter) that updates in real-time as the player progresses through the game.\n\nOnce completed, upload your project to GitHub, including a README file that explains the implementation of the health or score display, how it updates, and any relevant UI setup.\n\nSubmit the GitHub repository link in the #Game-Dev channel using the hashtag #cl-game-dev-playerscore to earn 250 Karma Points.",
                  },
                ],
              },
              resources: 4,
              proofOfWork: 2,
              rating: 0,
              hasGift: true,
            },
            {
              title: "Optimization and Debugging",
              data: {
                description:
                  "Even the most visually stunning and feature-rich games can falter if they lack smooth performance. Optimization and debugging are crucial phases in game development, ensuring your game runs seamlessly across devices. You’ll learn to fine-tune assets using techniques like Level of Detail (LOD) management, optimize textures and shaders, and leverage Unreal Engine’s profiling tools like Unreal Insights to tackle frame rate drops and memory issues. Debugging focuses on identifying and resolving gameplay disruptions, using tools like the Blueprint Debugger and Breakpoints. By mastering these skills, you’ll polish your game to perfection, creating an experience that’s both visually impressive and technically robust.",
                whatYouWillLearn: [
                  "Performance Optimization: Learn to enhance game performance by managing Level of Detail (LOD), optimizing textures, and reducing unnecessary resource usage.",
                  "Unreal Insights and Profiling: Use Unreal Engine's profiling tools like Unreal Insights to monitor performance metrics, identify bottlenecks, and improve frame rates and memory efficiency.",
                  "Debugging Tools: Master the Blueprint Debugger, Breakpoints, and Logs to identify and fix gameplay errors, ensuring a seamless player experience.",
                  "Asset and Shader Optimization: Understand techniques to streamline assets and shaders for efficient rendering, reducing load times and improving overall performance.",
                ],
                challenges: [
                  {
                    title: "Optimize assets and scripts for better performance",
                    resources: [
                      "https://www.youtube.com/watch?v=fUxZxQwL3W4&list=WL&index=10",
                      "https://www.youtube.com/watch?v=lfjG3z5VVIw&list=WL&index=9",
                      "https://www.youtube.com/watch?v=u3jlkKlzPiQ&list=WL&index=8",
                    ],
                    description:
                      "Optimize assets (such as textures, models, and sounds) and scripts in Unreal Engine 5 to improve game performance. Simplify meshes, reduce texture sizes, and optimize code to ensure smooth gameplay. Use Unreal's profiling tools to identify and address performance bottlenecks. This task will help you understand how to maintain high performance while ensuring visual and gameplay quality.\n\nOptimize game assets (textures, models, audio, etc.) and scripts in Unreal Engine to improve performance. Focus on reducing file sizes, simplifying meshes, and improving texture compression. For scripts, optimize code for efficiency, reduce unnecessary calculations, and ensure smooth execution.\n\nOnce completed, upload your project to GitHub, including a README file that describes the optimization techniques applied and the improvements in performance.\n\nSubmit the GitHub repository link in the #Game-Dev channel using the hashtag #cl-game-dev-optimization to earn 300 Karma Points.",
                  },
                  {
                    title: "Use debugging tools to identify and fix issues",
                    resources: [
                      "https://www.youtube.com/watch?v=XC_ntVpHg80&list=WL&index=7",
                      "https://www.youtube.com/watch?v=lflqdan_isw&list=WL&index=6",
                    ],
                    description:
                      "Use Unreal Engine’s debugging tools (such as the Blueprint Debugger, Visual Studio Debugger, and Profiler) to identify and resolve issues in your game project. Focus on solving common problems like performance drops, gameplay bugs, or logic errors. Document the issues you encounter and the steps you take to fix them. This task will enhance your troubleshooting skills and help ensure a smoother game development process.\n\nUse Unreal Engine’s debugging tools (such as the Blueprint Debugger, Visual Studio Debugger, and Profiler) to identify and fix issues within your game project. Focus on solving common problems like performance bottlenecks, gameplay bugs, or errors in logic. Document the issues you encountered and how you resolved them.\n\nOnce completed, upload your project to GitHub, including a README file that explains the debugging process, the tools used, and the fixes applied.\n\nSubmit the GitHub repository link in the #Game-Dev channel using the hashtag #cl-game-dev-debugging to earn 250 Karma Points.",
                  },
                ],
              },
              resources: 5,
              proofOfWork: 2,
              rating: 0,
              hasGift: true,
            },
            {
              title: "Publishing and Testing",
              data: {
                description:
                  "The final phases of game development—**Testing and Publishing**—are where your creation is polished and prepared for players. Testing ensures your game is stable, engaging, and performs flawlessly across platforms through rigorous playtesting, stress tests, and debugging. Tools like Unreal Engine’s Session Frontend and Automated Testing Frameworks help refine every detail. Publishing focuses on packaging and distributing your game, optimizing files, meeting platform-specific requirements, and crafting a compelling marketing strategy with trailers, visuals, and outreach to gaming communities. Together, these steps ensure your game not only reaches its audience but also delivers an unforgettable, polished experience.",
                whatYouWillLearn: [
                  "Testing and Quality Assurance: Conduct comprehensive playtesting and stress tests to identify bugs, improve gameplay balance, and ensure a stable experience for players.",
                  "Packaging and Deployment: Learn to package your game for distribution, optimizing files and ensuring compatibility with platform-specific requirements like consoles, PCs, and mobile devices.",
                  "Publishing on Platforms: Master the process of submitting your game to platforms such as Steam, Epic Games Store, or mobile app stores, meeting their technical and compliance standards.",
                  "Marketing and Launch Strategies: Develop compelling trailers, promotional materials, and community engagement plans to build excitement and attract players to your game.",
                ],
                challenges: [
                  {
                    title: "Conduct playtesting and gather feedback",
                    resources: [
                      "https://www.youtube.com/watch?v=YY7XWz_q-qo&list=WL&index=5",
                    ],
                    description:
                      "Conduct playtesting of your game with a group of players and gather their feedback on aspects like gameplay mechanics, difficulty, and user experience. Analyze the feedback and make adjustments to improve the overall game. This task will help you understand how player feedback can refine your design and enhance the player experience.\n\nConduct playtesting for your game project, either with a small group of peers or through an online community. Gather valuable feedback on gameplay mechanics, difficulty, and overall experience. Make adjustments based on the feedback received to improve the game.\n\nProof of Work Submission Options:\n\nPlaytesting Video: Record a video of the playtesting session, showing feedback from players, and include any changes made based on their input.\n\nSubmission Medium: YouTube (unlisted link), Google Drive, or any video hosting platform.\n\nFeedback Summary Report: Collect feedback in the form of a report or a Google Form. Include the main points raised by testers, and outline any changes you made in response to the feedback.\n\nSubmission Medium: Google Doc or PDF.\n\nSurvey Results: If you used an online survey (e.g., Google Forms) to collect feedback, submit the survey link with an explanation of how the feedback influenced changes in your project.\n\nSubmission Medium: Google Forms link.\n\nOnce completed, submit the chosen/preferred proof of work in the #Game-Dev channel using the hashtag #cl-game-dev-playtesting to earn 250 Karma Points.",
                  },
                  {
                    title: "Package the game for PC and test the build",
                    resources: [
                      "https://www.youtube.com/watch?v=O2PKihXmejw&list=WL&index=4",
                      "https://www.youtube.com/watch?v=emOsoyHSmAE&list=WL&index=3",
                      "https://www.youtube.com/watch?v=JOMrVMwGBso&list=WL&index=2",
                    ],
                    description:
                      "Package your game for PC using Unreal Engine 5’s packaging tools. Ensure that all assets are included and the game runs smoothly on a standard PC setup. Test the build for performance, functionality, and potential bugs. This task will help you prepare the game for distribution while ensuring it’s optimized for the PC platform.\n\nPackage your game for PC using Unreal Engine’s packaging tools. Ensure that the build is optimized and runs smoothly on a standard PC. Test the packaged game on your machine to ensure there are no critical issues such as crashes, performance drops, or missing assets.\n\nPlayable Build Link: Upload the packaged game to a file hosting platform like Google Drive, Dropbox, or Itch.io. Share the link to the playable build and include a description of any issues you encountered and resolved.\n\nSubmission Medium: Google Drive, Dropbox, or Itch.io link.\n\nOnce completed, submit the link in the #Game-Dev channel using the hashtag #cl-game-dev-pcbuild to earn 300 Karma Points.",
                  },
                  {
                    title: "Prepare the game for submission to a digital platform",
                    resources: [
                      "https://www.youtube.com/watch?v=KQkG2KElVxo&list=WL&index=1",
                    ],
                    description:
                      "Prepare your game for submission to a digital platform like Steam, Itch.io, or Epic Games Store. This includes creating necessary metadata (e.g., descriptions, screenshots, system requirements), packaging the final build, and ensuring your game complies with platform guidelines. This task will help you understand the submission process and ensure your game is ready for distribution on digital platforms.\n\nPrepare your game for submission to a digital platform (such as Steam, Itch.io, or Epic Games Store). This involves finalizing the game’s assets, creating platform-specific metadata (e.g., descriptions, screenshots, system requirements), ensuring the game complies with platform guidelines, and testing the submission process.\n\nProof of Work Submission Options:\n\nSubmission Documentation: Provide a detailed document outlining the steps you took to prepare the game for submission, including metadata creation, asset preparation, and platform compliance.\n\nSubmission Medium: Google Doc or PDF.\n\nSubmission Confirmation: If possible, submit a screenshot or confirmation of your submission to the platform (e.g., Steamworks, Itch.io developer dashboard).\n\nSubmission Medium: Screenshot or link to submission confirmation.\n\nPlatform Page Link: If the game is live on a platform (like Itch.io or Steam), provide the link to the game page along with a brief description of the submission process.\n\nSubmission Medium: Link to the game page on the platform.\n\nOnce completed, submit the chosen/preferred proof of work in the #Game-Dev channel using the hashtag #cl-game-dev-submission to earn 300 Karma Points.",
                  },
                ],
              },
              resources: 5,
              proofOfWork: 3,
              rating: 0,
              hasGift: true,
            },
            {
              title: "Portfolio and Community Engagement",
              data: {
                description: "Your journey as a game developer extends beyond creating games—it involves showcasing your work and engaging with a community of like-minded individuals. Portfolio Creation is essential to highlight your best work, including interactive demos, 3D environments, and mechanics. An interactive 3D portfolio using platforms like Unreal Engine or Three.js offers an immersive experience. Community Engagement, through platforms like Discord, Reddit, and Unreal Engine forums, is crucial for collaboration, learning, and networking. Participating in game jams, hackathons, and maintaining a professional presence on LinkedIn and ArtStation further enhances your career opportunities. Engaging with the community by mentoring, collaborating on open-source projects, and contributing to the ecosystem will establish your reputation as a skilled, approachable developer. By focusing on Portfolio and Community Engagement, you’ll open doors to professional opportunities and become an active contributor to the game development world.",
                whatYouWillLearn: ["Portfolio Development", "Community Engagement"],
    
                challenges: [
                  {
                    title: "Create a portfolio showcasing your projects",
                    resources: [],
                    description:
                      "Create a portfolio to showcase your game development projects. Include project descriptions, images, videos, or playable builds to highlight your skills and accomplishments. The portfolio can be a personal website, PDF, or a digital presentation. This task will help you organize and present your work in a professional way, making it easier to share with potential employers or collaborators.\n\nCreate a professional portfolio that showcases your game development projects. Include detailed descriptions, images, videos, and playable builds to highlight your work. The portfolio can be a personal website, PDF, or digital presentation that clearly communicates your skills and achievements.\n\nOnce completed, create a link to your portfolio and provide it for review.\n\nSubmit the link to your portfolio in the #Game-Dev channel using the hashtag #cl-game-dev-portfolio to earn 250 Karma Points.",
                  },
                  {
                    title: "Share your work and connect with other developers",
                    resources: [],
                    description:
                      "Share your game development projects with the community by posting on platforms like GitHub, LinkedIn, or Twitter. Engage with other developers to receive feedback, share ideas, and expand your network. This task will help you build a professional presence and connect with like-minded individuals in the game development community.\n\nShare your game development work and connect with other developers through platforms such as GitHub, LinkedIn, or Twitter. Post a summary of your latest project, including images, videos, or playable builds, and engage with the community to receive feedback, share ideas, and expand your network.\n\nOnce completed, create a link to your post or profile and provide it for review.\n\nSubmit the link in the #Game-Dev channel using the hashtag #cl-game-dev-connect to earn 200 Karma Points.",
                  },
                ],
              },
              resources: 0,
              proofOfWork: 2,
              rating: 0,
              hasGift: true,
            },
          ],
        },
      ],
      thinkTank: [
        {
          id: "tt-004",
          name: "James Carter",
          role: "Lead Game Designer, Epic Games",
          image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=40&h=40&q=80",
          expertise: ["Game Design", "Unreal Engine"],
        },
      ],
      mentors: [
        {
          id: "m-004",
          name: "Nikhil Chandran",
          role: "Founder & CEO @ TILTLABS",
          linkedin: "https://www.linkedin.com/in/nikhil-tiltlabs/",
          image: "/assets/IG/Game Development/Mentors/Nikhil Chandran.webp",
          expertise: [], // Add if available
        },
        {
          id: "m-005",
          name: "Mukesh Dev",
          role: "Founder & CEO-Banzan Studios",
          linkedin: "https://www.linkedin.com/in/mukeshdev/",
          image: "/assets/IG/Game Development/Mentors/Mukesh Dev.webp",
          expertise: [],
        },
        {
          id: "m-006",
          name: "Jobin Joseph",
          role: "Co-founder and CFO @ Norian Games",
          linkedin: "https://www.linkedin.com/in/jobin-joseph-8b0aa4265/",
          image: "/assets/IG/Game Development/Mentors/Jobin.webp",
          expertise: [],
        },
      ],
    },
    communityPartners: [
      {
        id: "cp-004-1",
        title: "TILTLABS",
        image: "/assets/IG/Game Development/Community Partners/Tiltlabs.webp",
        link: "#", // Replace with actual link if available
      },
      {
        id: "cp-004-2",
        title: "Banzan Studios",
        image: "/assets/IG/Game Development/Community Partners/Banzan.webp",
        link: "#",
      },
      {
        id: "cp-004-3",
        title: "Norian Games",
        image: "/assets/IG/Game Development/Community Partners/Norian.webp",
        link: "#",
      },
      {
        id: "cp-004-4",
        title: "AKEF",
        image: "/assets/IG/Game Development/Community Partners/AKEF.webp",
        link: "#",
      },
      {
        id: "cp-004-5",
        title: "AnimationXpress",
        image: "/assets/IG/Game Development/Community Partners/AnimationXpress.webp",
        link: "#",
      },
    ],
    partnerCompanies: [
      {
        id: "pc-004",
        title: "Pixel Studio",
        image: "https://www.svgrepo.com/show/452230/unreal-engine.svg",
        link: "https://pixelstudio.com",
      },
    ],
  },
//iot interest group
// {
//   level: "Level 4",
//   cards: [
//     {
//       title: "Understanding IOT",
//       data: {
//         description:
//           "The Internet of Things (IoT) refers to a system of interconnected devices that communicate and share data over the internet, enabling smarter automation, real-time decision-making, and innovation across industries. These devices ranging from smart home gadgets and wearable technology to industrial sensors and environmental monitors are equipped with sensors to collect data and actuators to perform actions. IoT systems rely on connectivity through protocols like Wi-Fi, Bluetooth, or cellular networks, processing data locally via edge computing or in the cloud.",
//         whatYouWillLearn: [
//           "Learners will gain a comprehensive understanding of the fundamentals of IoT, including its basics, architecture, significance, key components, diverse applications, and the importance of security in IoT systems.",
//         ],
//         challenges: [
//           {
//             title: "Introduction Course",
//             resources: [
//               "https://www.netacad.com/courses/introduction-iot?courseLang=en-US",
//             ],
//             description:
//               " IoT and Digital Transformation Task Explore the transformative potential of IoT by completing the Introduction to IoT course. This task will help you understand how IoT is driving digital transformation across various industries and expanding career opportunities in the future.",
//           },
          
//         ],
//       },
//       resources: 1,
//       proofOfWork: 2,
//       rating: 0,
//       hasGift: true,
//     },
//     {
//       title: "Programming for IOT",
//       data: {
//         description:
//           "Programming in the Internet of Things (IoT) involves creating software to manage and control devices, sensors, and networks that communicate seamlessly to perform tasks and make intelligent decisions. IoT programming spans a wide range of applications, from home automation to industrial systems, healthcare, and smart cities.",
//         whatYouWillLearn: [
//           "Python has become a dominant language for IoT programming due to its simplicity, versatility, and extensive library ecosystem. It is particularly well-suited for prototyping, high-level applications, and interfacing with cloud platforms.",
//           "C is a foundational language in IoT programming, particularly for embedded systems, due to its low-level access to hardware, efficient memory usage, and speed. It is often used to develop firmware and real-time applications for microcontrollers and other resource-constrained devices.",
//         ],
//         challenges: [
//           {
//             title: "Simulate Temperature Monitoring System",
//             resources: [],
//             description:
//               "In this task, create a C program that simulates a temperature monitoring system. The program should: \n1)Read temperature values (simulated input) at regular intervals. \n2)Display a warning message if the temperature crosses a specific threshold. \n3)Log all temperature readings to a file. \nRequirements: Use fscanf and fprintf for file handling",
//           },
//           {
//             title: "Simulate Blinking LED with PWM",
//             resources: [],
//             description:
//               "In this task, write a C program to simulate an LED blinking using Pulse Width Modulation (PWM). The program should: \n1)Print 'LED ON' and 'LED OFF' based on the duty cycle. \n2)Allow the user to input the desired frequency and duty cycle. \n3)Use a loop to generate the PWM signal for 10 seconds. \nRequirements:Use sleep or delay functions to simulate timing. Implement input validation for frequency and duty cycle.",
//           },
//         ],
//       },
//       resources: 0,
//       proofOfWork: 2,
//       rating: 0,
//       hasGift: true,
//     },
//     {
//       title: "Basics of Electronics",
//       data: {
//         description:
//           "Electronics are crucial for enabling IoT devices to function by connecting hardware with software. Core components include sensors, actuators, microcontrollers, and communication modules. Microcontrollers like ESP32 and Arduino process data, while sensors gather environmental information and actuators perform actions. Communication modules (e.g., Wi-Fi, Bluetooth) allow devices to connect and exchange data. Together, these elements form the foundation of low-power, efficient IoT systems used across industries.",
//         whatYouWillLearn: [
//           "Learners will develop a foundational understanding of electronics, including an introduction to actuators, microcontrollers, wireless communication, sensors, and power sources.",
//         ],
//         challenges: [
//           {
//             title: "Make a PPT on Basics of Electronics",
//             resources: [],
//             description:
//               "Explore the fundamentals of electronics by creating a detailed PowerPoint presentation. This task will help you understand key electronic components and their functions, which are foundational for various applications in the digital world.",
//           },
//         ],
//       },
//       resources: 0,
//       proofOfWork: 1,
//       rating: 0,
//       hasGift: true,
//     },
//     {
//       title: "Sensors and Actuators",
//       data: {
//         description:
//           "In the Internet of Things (IoT), sensors and actuators play critical roles in bridging the gap between the physical and digital worlds. They enable devices to perceive and interact with their environment, making IoT systems smarter and more responsive.",
//         whatYouWillLearn: [
//           "Learners will acquire knowledge about the various types of sensors used in IoT systems, the different types of actuators utilized in IoT applications, and the fundamentals of wireless sensor networks that enable seamless data collection and communication.",
//         ],
//         challenges: [
//           {
//             title: "Make a PPT on Sensors and Actuators",
//             resources: [],
//             description:
//               "Dive into the fundamentals of sensors and actuators by creating a detailed PowerPoint presentation.This task will enhance your understanding of how these components enable interaction between the digital and physical worlds.",
//           },
//         ],
//       },
//       resources: 0,
//       proofOfWork: 1,
//       rating: 0,
//       hasGift: true,
//     },
//   ],
// },
// {
//   level: "Level 5",
//   cards: [
//     {
//       title: "Hardware for IOT",
//       data: {
//         description:
//           "The Internet of Things (IoT) is an interconnected network of devices that collect, process, and exchange data. The hardware in IoT devices is essential for their functionality, encompassing microcontrollers, connectivity options, sensors, actuators, and power management. This section explores key hardware platforms for IoT, including Arduino, Raspberry Pi, other hardware options, IoT hardware design, embedded systems, and power management.",
//         whatYouWillLearn: [
//           "Learners will gain knowledge of IoT hardware platforms, including an introduction to Arduino, Raspberry Pi, and other essential IoT hardware systems.",
//         ],
//         challenges: [
//           {
//             title: "Basic Projects Using Arduino",
//             resources: [
//               "https://www.youtube.com/watch?v=c5btoce--ZU",
//               "https://youtu.be/CvqHkXeXN3M",
//               "https://youtu.be/0Lhgd8PQmn0",
//               "https://www.youtube.com/watch?v=dJJAQxyryoQ",
//               "https://www.youtube.com/watch?v=DzNZdEH916I",
//               "https://www.youtube.com/watch?v=hNmacZoweqY",
//             ],
//             description:
//               "Explore the world of Arduino by completing up to 6 basic Arduino-based projects . This course will introduce you to the basics of Arduino and teach you how to build and program your own Arduino-based projects. You'll learn about the Arduino hardware, the Arduino software, and the Arduino programming language.",
//           },
//           {
//             title: "Self Projects",
//             resources: [],
//             description:
//               "In this task, you will build Arduino projects and showcase your work. You can either simulate the projects using WokWi or create a physical project to demonstrate. This will enhance your understanding of Arduino and its practical applications in electronics. 1. You must design a simple security system that sounds an alarm when any motion is detected. Use Arduino, Passive Infrared (PIR) Sensor, Buzzer, and LED indicators. 2. You are required to build an automatic lighting system that turns on in the dark and off in bright conditions using Arduino, a light-dependent resistor (LDR), and an LED (or LED strip)",
//           },
//           {
//             title: "Basic Projects Using Raspberry Pi",
//             resources: [
//               "https://youtu.be/e9WXf-wRTNg",
//               "https://youtu.be/zE1J8F9U_jc?list=PLQFhP0-TLBMeUHHpPNt1UH2YA8mIua-Ag",
//             ],
//             description:
//               "In this task, you will complete 2 basic Raspberry Pi-based projects using a simulator like WokWi. This will help you understand the fundamentals of Raspberry Pi and its applications in electronics and IoT systems.",
//           },
//         ],
//       },
//       resources: 8,
//       proofOfWork: 3,
//       rating: 0,
//       hasGift: true,
//     },
//   ],
// },
// {
//   level: "Level 6",
//   cards: [
//     {
//       title: "Network Protocols for IOT",
//       data: {
//         description:
//           "The Internet of Things (IoT) ecosystem relies on a wide array of network protocols to facilitate seamless communication between devices. These protocols enable data exchange, ensuring connectivity, reliability, and security. Here’s an in-depth look at the primary protocols used in IoT communication.",
//         whatYouWillLearn: [
//           "Learners will gain an understanding of the basics of TCP/IP, the role of Bluetooth in IoT, and key communication protocols such as MQTT, Zigbee, Z-Wave, and LoRaWAN, which enable seamless connectivity in IoT systems.",
//         ],
//         challenges: [
//           {
//             title: "Bluetooth Controlled LED",
//             resources: [],
//             description:
//               "Explore the world of Arduino and Bluetooth by completing a project that controls an LED using a Bluetooth module.",
//           },
//         ],
//       },
//       resources: 0,
//       proofOfWork: 1,
//       rating: 0,
//       hasGift: true,
//     },
//     {
//       title: "Cloud Platforms used in IOT",
//       data: {
//         description:
//           "Cloud platforms in IoT are services that provide infrastructure, tools, and frameworks to connect IoT devices, manage their data, and enable smart decision-making. They bridge the gap between IoT hardware (sensors, actuators, and devices) and applications by offering scalable computing and storage solutions.",

//         whatYouWillLearn: [
//           "Learners will gain knowledge of IoT development platforms, including an introduction to Blynk and the Arduino IoT Cloud, enabling them to design, monitor, and manage IoT projects effectively.",
//         ],
//         challenges: [
//           {
//             title: "Home Automation",
//             resources: [],
//             description:
//               "In this challenge, you have to design a Home Automation System using an ESP32 microcontroller.",
//           },
//           {
//             title: "Gas Leakage Warning System",
//             resources: [],
//             description:
//               "In this challenge, you have to design a Gas Leakage Warning System using a microcontroller.",
//           },
//         ],
//       },
//       resources: 0,
//       proofOfWork: 2,
//       rating: 0,
//       hasGift: true,
//     },
//   ],
// },

  // Human Resources Interest Group
  {
    id: "65fdd535-08d2-4619-9da7-944e21365de9",//TODO : Add ID
    title: "HR",
    description:
      "Curious about what makes great organizations thrive? The Human Resources Interest Group is your ultimate platform to uncover the secrets of people management, leadership development, and organizational success. Discover how HR shapes careers, drives innovation, and builds strong workplace cultures. Whether you're aspiring to lead teams, influence business decisions, or create impactful employee experiences, this is your chance to dive into the world of HR and unlock limitless career potential. Join us and start building a future where you make a difference.",
    bannerImage:
    "/assets/IG/Cover/2.png",
    memberCount: 1400,
    memberSince: "August 2020",
    isPublic: true,
    officeHours: "Wednesday 8:00PM",
    thinkTankMeeting: "3rd Wednesday 8:30PM",
    interestGroupLeads: {
      description:
        "Interest group leads manage the activities and events within interest groups and serve as a point of contact for students interested in getting involved. Students can connect with these leads to learn about opportunities within their interests.",
      leads: [
        {
          name: "Hithesh G",
          institution: "University College of Engineering, Kariavattom",
          linkedin: "https://www.linkedin.com/in/hithesh-g",
          image: "/assets/IG/HR/IG Lead/Hithesh G.webp",
        },
      ],
    },
    prerequisites: [
      "No prior experience is necessary, though a basic understanding of management principles, communication skills, and organizational behavior is recommended.",
      "Familiarity with HR functions like talent acquisition, performance management, and employee relations is a plus.",
    ],
    peopleToFollow: [
      {
        name: "Dave Ulrich",
        link: "https://www.linkedin.com/in/daveulrichpro?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      },
      {
        name: "Brigette Hyacinth",
        link: "https://www.linkedin.com/in/brigettehyacinth?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      },
      {
        name: "Josh Bersin",
        link: "https://www.linkedin.com/in/bersin?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      },
    ],
    blogsToFollow: [
      { name: "SHRM Blog", link: "https://www.shrm.org/blog" },
      { name: "HR Bartender", link: "https://www.hrbartender.com/day-job/" },
    ],
    topKeywords: [
      "Talent Acquisition",
      "Employee Engagement",
      "Learning & Development",
      "Performance Management",
      "Compensation & Benefits",
      "Workplace Culture",
      "Diversity & Inclusion",
      "Employee Relations",
      "HR Technology",
      "Organizational Development",
    ],
    tabs: {
      about: {
        foundationDeck: "https://www.notion.so/HR-11e59e69b1bf80dcb994c2ba100c04d5?pvs=4",
        description:
          "The Human Resources Interest Group supports HR enthusiasts in mastering modern HR practices and fostering positive workplace cultures. ",
        opportunities: [
          {
            title: "Talent Acquisition Specialist",
            description: "Recruit and onboard top talent.",
          },
          {
            title: "Learning and Development Specialist",
            description:
              "Design and deliver training programs to enhance employee skills and career growth.",
          },
          {
            title: "Compensation and Benefits Analyst",
            description:
              "Develop competitive salary structures and benefits packages.",
          },
          {
            title: "Employee Engagement Manager",
            description:
              "Foster a positive workplace culture and improve employee satisfaction.",
          },
          {
            title: "HR Data Analyst",
            description:
              "Use data-driven insights to improve workforce planning and decision-making.",
          },
          {
            title: "Performance Management Specialist",
            description:
              "Develop systems to evaluate and enhance employee performance.",
          },
          {
            title: "HR Business Partner",
            description:
              "Align HR strategies with organizational goals to drive business success.",
          },
          {
            title: "Organizational Development Consultant",
            description:
              "Implement strategies to improve company efficiency and employee well-being.",
          },
        ],
      },
      forum: { placeholder: "Share HR insights here." },
      members: [
        {
          id: 18,
          name: "Isabella Moore",
          muid: "isabella789",
          profile_pic:
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&q=80",
          karma: "1200",
          interest_groups: [
            { id: "65fdd535-08d2-4619-9da7-944e21365de9", name: "Human Resources Interest Group" },
          ],
          organizations: [
            { id: "org-19", title: "HR Academy", code: "HRA01", org_type: "College" },
          ],
        },
      ],
      events: [
        {
          id: "evt-011",
          title: "HR Trends 2025 Summit",
          link: "https://hrcommunity.com/events/hr-trends",
          venue: "Online via Zoom",
          eventType: "Online",
          date: "June 15, 2025",
          time: "10:00 - 13:00 GMT",
          image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=800",
        },
      ],
      learningPaths: [
        {
      level: "Level 4",
      cards: [
        {
          title: "HR Fundamentals",
          data: {
            description:
              "HR Fundamentals provides a foundational understanding of Human Resource Management (HRM), essential for building a successful career in people management. This course covers key HR functions such as recruitment, onboarding, employee engagement, performance management, compliance, and workforce development. Participants will learn the core principles of creating a positive workplace culture, managing talent effectively, and aligning HR practices with organizational goals. Ideal for aspiring HR professionals and managers, this program equips learners with practical skills to navigate real-world HR challenges and contribute to business success.",
            whatYouWillLearn: ["Role of HR in an organization"],
            challenges: [
              {
                title: "Define the role of HR in an Organisation",
                resources: [],
                description:
                  "Explore the critical role Human Resources (HR) plays in organizations by understanding its functions and applying HR practices to solve a real-world organizational challenge. This task will help you think strategically about workforce management and its impact on organizational success.  ",
              },
            ],
          },
          resources: 0,
          proofOfWork: 1,
          rating: 0,
          hasGift: true,
        },
      ],
    },
    {
      level: "Level 5",
      cards: [
        {
          title: "Talent Acquisition",
          data: {
            description:
              "Think talent acquisition is just posting job ads and picking resumes? Think again! Talent Acquisition is the art of finding the right people for the right roles at the right time. It’s not just about filling vacancies; it’s about shaping a company's future by bringing in rockstar performers who align with its goals and culture. In this session, we'll dive into how to identify top talent, craft irresistible job offers, and create a hiring process that's both effective and engaging. You'll also explore modern recruitment strategies, from leveraging social media to making data-driven decisions. Because let's face it — finding great talent is like finding a diamond in the rough, and we’re here to teach you how to shine as a Talent Acquisition pro!",
            whatYouWillLearn: [
              "Strategic Workforce Planning,Employer Branding & Recruitment Marketing",
            ],
            challenges: [
              {
                title:
                  "Create a workforce plan for your current or a hypothetical organization",
                resources: ["https://youtu.be/mR9eICQJLXA?si=otvDfvtjlkdphHVh"],
                description:
                  "Develop a strategic workforce plan for your current organization or a hypothetical one. The workforce plan should identify current talent gaps, future hiring needs, and strategies to align workforce management with organizational goals. This task will help you think proactively about workforce planning and how it drives long-term business success",
              },
              {
                title:
                  "Create an onboarding checklist for new hires that includes key activities and milestones during their first 90 days.",
                resources: [],
                description:
                  "Develop a comprehensive onboarding checklist for new hires that outlines key activities and milestones during their first 90 days in the organization. This task will help you think critically about the onboarding process and how it contributes to employee engagement, productivity, and retention.",
              },
            ],
          },
          resources: 1,
          proofOfWork: 2,
          rating: 0,
          hasGift: true,
        },
        {
          title: "HR Policy and Procedures",
          data: {
            description:
              "An organization without clear policies is like a ship without a compass — destined for chaos! HR Policies and Procedures are the backbone of a well-structured workplace, ensuring that everyone is on the same page when it comes to company values, rules, and expectations. In this session, you'll learn how to craft practical HR policies that cover everything from employee conduct and attendance to leave management and workplace safety. We’ll also explore procedures that help maintain consistency, fairness, and legal compliance, making your organization a great place to work. Master the art of creating policies that are more than just paperwork — they’re the playbook for a thriving, productive, and happy workforce! ",
            whatYouWillLearn: ["Policy Familiarization and Comparison"],
            challenges: [
              {
                title:
                  "Obtain HR policy documents from two different organizations (or hypothetical ones) and compare them on key points like leave policy, code of conduct, and performance management.",
                resources: [],
                description:
                  "Develop a content calendar for your company’s social media channels focused on showcasing your employer brand. The calendar should include key themes such as employee stories, company culture, and behind-the-scenes content to highlight what makes your organization a great place to work. This task will help you think strategically about employer branding and how to engage potential candidates and employees through social media.",
              },
            ],
          },
          resources: 0,
          proofOfWork: 1,
          rating: 0,
          hasGift: true,
        },
      ],
    },
    {
      level: "Level 6",
      cards: [
        {
          title: "Employee Engagement and Organizational Success",
          data: {
            description:
              "A company's greatest asset isn’t its products or services — it’s its people! But what keeps employees motivated, inspired, and performing at their best? The secret lies in Employee Engagement. This session dives into strategies to create a workplace where employees feel valued, connected, and driven to contribute their best. From fostering a positive work culture to recognizing achievements and promoting growth, you’ll discover how engaged employees can boost productivity, innovation, and long-term success. After all, happy employees lead to happy customers — and that’s the recipe for organizational success. Let’s learn how to turn your workforce into your biggest competitive advantage!",
            whatYouWillLearn: [" Compensation and Benefits Management"],
            challenges: [
              {
                title:
                  "Analyze a Pay Structure, Create a sample pay structure for three job roles and explain how it aligns with industry standards.",
                resources: [],
                description:
                  "Create a sample pay structure for three job roles within an organization. Analyze how the pay structure aligns with industry standards and discuss the factors considered in determining the compensation for each role. This task will help you understand the importance of fair and competitive pay in attracting and retaining top talent.",
              },
              {
                title:
                  "Create a pay scale for entry-level, mid-level, and senior-level roles in a hypothetical company.",
                resources: [],
                description:
                  "In this task, you will explore how to create an appropriate and competitive pay scale for different roles within an organization. This will involve understanding the key factors that influence compensation and applying them to develop a pay structure for a hypothetical company.",
              },
            ],
          },
          resources: 0,
          proofOfWork: 2,
          rating: 0,
          hasGift: true,
        },
      ],
    },
      ],
      thinkTank: [
        {
          id: "tt-006",
          name: "Oliver Grant",
          role: "HR Director, LinkedIn",
          image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=40&h=40&q=80",
          expertise: ["Talent Management", "Employee Engagement"],
        },
      ],
      mentors: [
        {
          id: "m-006",
          name: "Deepa Nair",
          role: "Senior Manager Human Resource @6D Technologies",
          linkedin:
            "https://www.linkedin.com/in/deepa-nair-b43b4646?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
          image: "/assets/IG/HR/Mentors/Deepa Nair.webp",
          expertise: [], // Add if available
        },
        {
          id: "m-007",
          name: "Jithin Chakkalakkal",
          role: "Senior Manager Human Resource @Reflections Info Systems",
          linkedin:
            "https://www.linkedin.com/in/jithinchakkalakkal?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
          image: "/assets/IG/HR/Mentors/Jithin Chakkalakkal.webp",
          expertise: [],
        },
        {
          id: "m-008",
          name: "Vijin VR",
          role: "Assistant Manager - People & Culture @Rebid",
          linkedin:
            "https://www.linkedin.com/in/vijin-v-r-22bb5b161?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
          image: "/assets/IG/HR/Mentors/Vijin VR.webp",
          expertise: [],
        },
        {
          id: "m-009",
          name: "Judlin Berna NM",
          role: "Human Resources Generalist @FAYA",
          linkedin:
            "https://www.linkedin.com/in/judlinbernanm?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
          image: "/assets/IG/HR/Mentors/Judlin Berna.webp",
          expertise: [],
        },
        {
          id: "m-010",
          name: "Bijo Abraham",
          role: "Talent Acquisition & Career Life Coach @SELECT HR Solutions",
          linkedin:
            "https://www.linkedin.com/in/bijo-abraham-a719a554?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
          image: "/assets/IG/HR/Mentors/bijo.webp",
          expertise: [],
        },
      ],
    },
    communityPartners: [
      {
        id: "cp-006",
        title: "HR Network Indonesia",
        image: "https://www.svgrepo.com/show/452145/linkedin.svg",
        link: "https://hrnetworkindo.org",
      },
    ],
    partnerCompanies: [
      {
        id: "pc-006",
        title: "PeopleFirst HR",
        image: "https://www.svgrepo.com/show/452146/hr.svg",
        link: "https://peoplefirsthr.com",
      },
    ],
  },


  // Digital Marketing Interest Group
  {
    id: "5bf2bdfe-5c22-48ab-9572-9e9836c70e79",
    title: "Digital Marketing",
    description:
      "Excited to explore the dynamic world of digital marketing? The Digital Marketing Interest Group empowers you with practical and theoretical knowledge, covering SEO, email marketing, social media management, and analytics. This group is perfect for anyone passionate about creating impactful campaigns and analyzing audience behaviour.",
    bannerImage:
    "/assets/IG/Cover/5.png",
    memberCount: 2700,
    memberSince: "November 2021",
    isPublic: true,
    officeHours: "Tuesday 8:30PM",
    thinkTankMeeting: "4th Saturday 7:30PM",
    interestGroupLeads: {
      description:
        "Interest group leads manage the activities and events within interest groups and serve as a point of contact for students interested in getting involved. Students can connect with these leads to learn about opportunities within their interests",
      leads: [
        {
          name: "Marvin V Mathew",
          institution: "St. Thomas Institute of Science and Technology",
          linkedin: "https://www.linkedin.com/in/marvin-v-mathew",
          image: "/assets/IG/Digital Marketing/IG Lead/Marvin V Mathew.webp",
        },
        {
          name: "KH Arjun",
          institution: "Marian Engineering College",
          linkedin: "https://www.linkedin.com/in/k-h-arjun-310913206/",
          image: "/assets/IG/Digital Marketing/IG Lead/KH Arjun.webp",
        },
        {
          name: "Devadathan D R",
          institution: "St. Thomas Institute of Science and Technology",
          linkedin: "https://www.linkedin.com/in/devadathandr",
          image: "/assets/IG/Digital Marketing/IG Lead/Devadathan R.webp",
        },
      ],
    },
    prerequisites: [
      "Familiarity with internet browsing, Google Docs, Sheets, and Presentations.",
      "Basic written communication skills for captions, emails, and blogs.",
      "Understanding hashtags, engagement metrics, and social media platforms.",
      "Experience with design tools like Canva or Microsoft PowerPoint.",
      "Google Account for tools like Google Analytics and Keyword Planner.",
      "Active social media accounts (Instagram, LinkedIn, or YouTube).",
      "Tools like Canva, Mailchimp, HubSpot, CapCut, and Ubersuggest.",
      "Reliable internet and a laptop/PC for tasks like content creation, SEO, and email automation.",
    ],
    peopleToFollow: [
      { name: "Neil Patel", link: "https://www.linkedin.com/in/neilkpatel" },
      { name: "Rand Fishkin", link: "https://www.linkedin.com/in/randfishkin" },
      { name: "Ann Handley", link: "https://www.linkedin.com/in/annhandley" },
    ],
    blogsToFollow: [
      { name: "Moz Blog", link: "https://moz.com/blog" },
      { name: "Neil Patel Blog", link: "https://neilpatel.com/blog/" },
      { name: "HubSpot Blog", link: "https://blog.hubspot.com" },
    ],
    topKeywords: [
      "SEO",
      "Email Marketing",
      "Social Media Management",
      "Content Marketing",
      "Digital Advertising",
      "Analytics",
      "PPC",
      "Influencer Marketing",
      "Conversion Rate Optimization",
      "Audience Engagement",
    ],
    tabs: {
      about: {
        foundationDeck: "https://www.notion.so/Digital-Marketing-11e59e69b1bf801cae94daada4c746db?pvs=4",
        description:
          "The Digital Marketing Interest Group is where marketers come to learn, share, and grow in the fast-paced world of online advertising and branding.",
        opportunities: [
          {
            title: "SEO Specialist",
            description:
              "Optimize websites and content to rank higher in search engine results.",
          },
          {
            title: "Email Marketing Specialist",
            description:
              "Design and implement email campaigns to engage and convert audiences.",
          },
          {
            title: "Social Media Manager",
            description:
              "Create and execute social media strategies to build brand presence and engagement.",
          },
          {
            title: "Content Strategist",
            description:
              "Plan and create compelling content to drive engagement and conversions.",
          },
          {
            title: "Digital Advertising Specialist",
            description:
              "Manage digital ad campaigns, analyze metrics, and optimize ad spend for better results.",
          },
          {
            title: "Marketing Analyst",
            description:
              "Analyze data to measure the effectiveness of digital marketing campaigns and optimize strategies.",
          },
          {
            title: "Conversion Rate Optimization Specialist",
            description:
              "Focus on improving the percentage of website visitors who complete desired actions.",
          },
        ],
      },
      forum: { placeholder: "Discuss marketing strategies here." },
      members: [
        {
          id: 19,
          name: "Harper Scott",
          muid: "harper123",
          profile_pic:
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&q=80",
          karma: "1350",
          interest_groups: [
            { id: "75fdd535-08d2-4619-9da7-944e21365de9", name: "Digital Marketing Interest Group" },
          ],
          organizations: [
            { id: "org-20", title: "Marketing College", code: "MC01", org_type: "College" },
          ],
        },
      ],
      events: [
        {
          id: "evt-012",
          title: "SEO Mastery Workshop",
          link: "https://digitalmarketingcommunity.com/events/seo-workshop",
          venue: "Online via Zoom",
          eventType: "Online",
          date: "July 20, 2025",
          time: "11:00 - 13:00 GMT",
          image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=800",
        },
      ],
      learningPaths: [
        {
          level: "Level 4",
          cards: [
            {
              title: "Introduction to Digital Marketing",
              data: {
                description:
                  "This section provides a strong foundation in digital marketing by introducing you to essential concepts like online presence, SEO, and audience engagement. You'll explore tools and techniques to analyze competitors, perform basic keyword research, and gain hands-on experience with industry-standard practices. By the end, you'll have the skills to identify opportunities and craft strategies that drive online success.",
                whatYouWillLearn: [
                  "Gain a solid understanding of digital marketing fundamentals.",
                  "Learn how to analyze competitors and identify relevant keywords.",
                  "Understand how to optimize online presence.",
                  "Develop practical skills to craft effective marketing strategies.",
                  "Enhance digital visibility for any brand or business.",
                ],
                challenges: [
                  {
                    title: "Google’s Fundamentals of Digital Marketing course",
                    description:
                      "Step 1: Visit the page: https://skillshop.exceedlms.com/student/collection/648385-digital-marketing\nStep 2: Create a profile and start the course.\nStep 3: After completing all lessons, post the screenshot of the certificate in the digital-marketing channel with the hashtag #cl-dm-fundamentals to earn 400 karma points.",
                    resources: [
                      "https://skillshop.exceedlms.com/student/collection/648385-digital-marketing",
                    ],
                  },
                  {
                    title: "Practical Experience in Digital Marketing",
                    description:
                      "This exercise will help you gain hands-on experience in keyword research, audience segmentation, and understanding customer intent—key skills for any digital marketer.\nStep 1: Understand the scenario as a newly recruited Digital Marketer for an organization that focuses on the following solutions:\n- Digital Marketing Courses (Primary Keyword)\n- Software Training Institutes (Primary Keyword)\n- Gyms in Kazhakootam (Primary Keyword)\n\nStep 2: Conduct research and prepare a detailed report that includes:\n- Understanding Search Patterns & Intent: Analyze what users are searching for and their motivations.\n- Finding Related Keywords: Use tools to identify relevant long-tail and associated keywords.\n- Identifying Segments: Determine and classify the customer segments interested in each solution.\n- Motivations & Interests: Explore the reasons behind searches, including pain points and interests.\n\nStep 3: Refer to the following tools for Keyword Research:\n- Wordstream Free Keyword Tool: https://www.wordstream.com/keywords\n- Backlinko Keyword Tool: https://backlinko.com/tools/keyword\n- Wordtracker: https://www.wordtracker.com/\n\nStep 4: Once you've completed your report, post it in the digital-marketing channel with the hashtag #cl-dm-practexpto to earn 100 karma points.",
                    resources: [
                      "https://www.wordstream.com/keywords",
                      "https://backlinko.com/tools/keyword",
                      "https://www.wordtracker.com/",
                    ],
                  },
                  {
                    title: "Competitive Research Exercise",
                    description:
                      "This exercise will help you understand the competitive environment and how to position the organization you're working for effectively.\nStep 1: Understand the scenario as a marketing specialist for the following organizations:\n- Udemy (Online Course Provider)\n- Mashupstack (Software Development/Training)\n- Tiger Gym (Fitness Center/Gym)\n- Lenskart (Eyewear Retailer)\n\nStep 2: Conduct competitive research and prepare a detailed report focusing on identifying direct competitors offering similar services. For each organization, shortlist 3-4 key competitors.\n\nStep 3: Prepare a Detailed Competitive Report. Include the following:\n- Competitive Landscape: Overview of the competitors' positioning within the market.\n- USP (Unique Selling Proposition): Key selling points or advantages each competitor claims to offer.\n- Pricing: Gather pricing details for each competitor’s products/services and compare them.\n- Customer Reviews: Research customer reviews on platforms like Google Reviews, Trustpilot, etc., and summarize the sentiment.\n- Offerings: Overview of the main products/services offered by each competitor and how they compare to the respective organizations.\n\nStep 4: Once you've completed your report, post it in the digital-marketing channel with the hashtag #cl-dm-competitive-audit to earn 100 karma points.",
                    resources: [
                      "https://www.udemy.com",
                      "https://mashupstack.com",
                      "https://www.tigergym.in",
                      "https://www.lenskart.com",
                    ],
                  },
                ],
              },
              resources: 8,
              proofOfWork: 3,
              rating: 0,
              hasGift: false,
            },
          ],
        },
        {
          level: "Level 5",
          cards: [
            {
              title: "Advanced SEO Strategy and Execution",
              data: {
                description:
                  "This section dives deep into the advanced techniques of Search Engine Optimization, equipping you with the skills to optimize websites for maximum visibility. You'll explore strategies to enhance on-page content, build authoritative backlinks, improve technical site performance, and target local audiences effectively, ensuring comprehensive SEO implementation.",
    
                whatYouWillLearn: [
                  "By the end of this section, you will have a thorough understanding of advanced on-page and off-page SEO strategies, enabling you to enhance website content and build high-quality backlinks. You will learn to optimize website performance through technical SEO techniques, ensuring faster load times, mobile-friendliness, and improved search engine crawling. Additionally, you will develop skills to target local audiences effectively, improving visibility in local searches, and gain hands-on experience in executing comprehensive SEO campaigns to achieve better search engine rankings.",
                ],
                challenges: [
                  {
                    title: "SEO On-Page",
                    description:
                      "In this challenge, you are tasked with working on a project from one of the following websites: µLearn Website, Health and Wellbeing Website, Ucartz Website, or Cargo Website. Begin by conducting keyword research for the 'Health and Wellbeing' niche to identify high-potential keywords. You will also analyze competitors and map URLs to target the most relevant keywords, with a minimum of 25 keywords required. Tools such as Ahrefs, Semrush, Google Keyword Planner, Writerzen, and UberSuggest should be used for this task. Once the keyword research is complete, you will move on to implementing an on-page SEO checklist. This includes ensuring the website is mobile-friendly and optimized for speed. Use GTMetrix and Mobile-Friendly Test to verify these aspects, and optimize URLs to make them short and user-friendly. You will also need to optimize the website's performance by using tools like WP Rocket, ShortPixel, and Cloudflare for caching, image optimization, and lazy loading. The next step involves addressing technical SEO, which includes fixing any mixed content issues, creating and submitting a sitemap, and ensuring the proper setup of robots.txt. Afterward, focus on optimizing on-page content by ensuring target keywords are present in URLs, titles, headings, and the first paragraph. You must use H1, H2, and H3 tags properly, add internal links to other pages on the website, and include outbound links to authoritative sites. Write compelling meta titles and descriptions for better search visibility. The next task is to optimize images by adding descriptive alt text, using relevant keywords in image file names, and compressing the images for better performance. After completing these tasks, you will submit your work in the digital-marketing channel with the hashtag #cl-dm-onpage to earn 600 karma points.",
                    resources: [
                      "https://ahrefs.com",
                      "https://www.semrush.com",
                      "https://ads.google.com/intl/en_us/home/tools/keyword-planner/",
                      "https://www.writerzen.io",
                      "https://neilpatel.com/ubersuggest/",
                      "https://gtmetrix.com",
                      "https://search.google.com/test/mobile-friendly",
                      "https://wp-rocket.me",
                      "https://shortpixel.com",
                      "https://www.cloudflare.com",
                    ],
                  },
    
                  {
                    title: "Backlink Strategy & Outreach",
                    description:
                      "Develop a backlink strategy by identifying high-authority, niche-relevant websites for link-building. Conduct outreach to health, wellbeing, and medical-related blogs, forums, and directories to gain high-quality backlinks. Begin by identifying 10-15 relevant health and wellness websites with a high domain authority (DA). Contact webmasters for guest posting opportunities, collaborations, or mentions, and submit the website to niche-specific directories. Leverage broken link-building opportunities to gain backlinks. Once you've completed your report, post it in the #digital-marketing channel with the hashtag #cl-dm-offpage-1 to earn 150 karma points.",
                    resources: [
                      "https://ahrefs.com",
                      "https://www.semrush.com",
                      "https://hunter.io",
                      "https://pitchbox.com",
                    ],
                  },
                  {
                    title: "Social Media Presence & Engagement",
                    description:
                      "Ensure the business is properly listed in UK-based local directories and platforms (Google My Business, Yelp, etc.) with consistent NAP (Name, Address, Phone) details. Start by creating or optimizing the Google My Business profile for better local ranking, and submit the website to 5-10 local business directories. Ensure NAP details are consistent across all platforms and optimize the GMB profile by adding relevant keywords, business hours, and images. Once you've completed your report, post it in the #digital-marketing channel with the hashtag #cl-dm-offpage-2 to earn 100 karma points.",
                    resources: [
                      "https://moz.com/products/local",
                      "https://www.brightlocal.com",
                    ],
                  },
                  {
                    title: "Local SEO & Citation Building",
                    description:
                      "Build social media presence on platforms relevant to the health and wellness industry. Create and optimize profiles on platforms like Facebook, Instagram, and Pinterest, and share blog posts, health tips, and success stories to drive engagement. Use hashtags and social listening tools to target relevant audiences and engage with followers by responding to comments and messages. Once you've completed your report, post it in the #digital-marketing channel with the hashtag #cl-dm-offpage-3 to earn 50 karma points.",
                    resources: [
                      "https://hootsuite.com",
                      "https://buffer.com",
                      "https://sproutsocial.com",
                    ],
                  },
                  {
                    title: "Influencer Marketing & Collaboration",
                    description:
                      "Partner with health and wellness influencers, bloggers, and YouTubers to promote the website and build backlinks. Identify 5-7 influencers in the health and wellness niche and reach out for product reviews, shoutouts, or guest blogging opportunities. Track the performance of influencer collaborations and once you've completed your report, post it in the #digital-marketing channel with the hashtag #cl-dm-offpage-4 to earn 100 karma points.",
                    resources: [
                      "https://buzzsumo.com",
                      "https://www.influence.co",
                      "https://www.ninjaoutreach.com",
                    ],
                  },
                  {
                    title: "Content Syndication and PR",
                    description:
                      "Distribute high-quality content through syndication platforms and press release distribution services to get more exposure and backlinks. Create a press release about the brand and website's mission, and submit content to syndication platforms like Medium and LinkedIn. Reach out to health-related news sites and blogs for potential features or interviews. Once you've completed your report, post it in the #digital-marketing channel with the hashtag #cl-dm-offpage-5 to earn 70 karma points.",
                    resources: [
                      "https://www.prweb.com",
                      "https://outbrain.com",
                      "https://medium.com",
                    ],
                  },
                  {
                    title: "Forum Posting and QA Participation",
                    description:
                      "Engage with health and wellbeing communities by answering questions and contributing to discussions on forums like Reddit, Quora, and niche-specific health forums. Identify relevant subreddits, Quora questions, and health forums, then provide helpful, informative answers with a backlink to relevant site content. Participate regularly to establish authority in the niche. Once you've completed your report, post it in the #digital-marketing channel with the hashtag #cl-dm-offpage-6 to earn 60 karma points.",
                    resources: [
                      "https://www.reddit.com",
                      "https://www.quora.com",
                      "https://ahrefs.com",
                    ],
                  },
                  {
                    title: "Content Promotion via Email Outreach",
                    description:
                      "Promote the website’s blog posts and resources by conducting targeted email outreach to individuals, businesses, and organizations in the health and wellness niche. Build a list of 50-100 health and wellness contacts for email outreach, and promote blog posts, product launches, or partnership opportunities. Personalize each email for better response rates. Once you've completed your report, post it in the #digital-marketing channel with the hashtag #cl-dm-offpage-7 to earn 70 karma points.",
                    resources: ["https://mailchimp.com", "https://hunter.io"],
                  },
                  {
                    title: "Optimize Google My Business (GMB)",
                    description:
                      'Set up and optimize a Google My Business profile to boost local search visibility.\n\nSteps:\n\n1. Search for or Create a GMB Listing\nLook up the business on Google My Business.\nIf no listing exists, create a new one.\n2. Add Complete Business Details\nInclude Name, Address, Phone (NAP), business description, operating hours, and high-quality images.\n3. Publish a Post\nHighlight an event, offer, or promotion using the "Add Post" feature.\n4. Verify the Listing\nComplete the verification process through the postcard, phone, or email options.\n\nTools:\n\nLocalViking\n\nDeliverables:\n\nVerified GMB profile screenshots.\nScreenshot of the published post.\n\nSubmission:\nOnce you\'ve completed your task, post it in the #digital-marketing channel with the hashtag #cl-dm-local-1 to earn 200 karma points! 🎉🔥',
                    resources: [
                      "https://www.google.com/business/",
                      "https://localviking.com",
                    ],
                  },
                  {
                    title: "Ensure NAP Consistency",
                    description:
                      "1. Identify Local Directories\nChoose 5-10 directories (e.g., Yelp, Yellow Pages, etc.) relevant to your location and niche.\n2. Check Existing NAP Details\nReview the business's Name, Address, and Phone (NAP) in each directory.\n3. Update Inconsistent Details\nMake corrections for any inaccurate or outdated information.\n4. Document Changes\nTake screenshots before and after updating NAP details for proof.\n\nTools:\n\nAhrefs, BrightLocal, WhiteSpark\n\nDeliverables:\n\nList of directories reviewed.\nScreenshots of updates.\n\nSubmission:\nOnce you've completed your task, post it in the #digital-marketing channel with the hashtag #cl-dm-local-2 to earn 150 karma points! 🎉🔥",
                    resources: [
                      "https://www.brightlocal.com",
                      "https://whitespark.ca",
                    ],
                  },
                  {
                    title: "Create Location-Based Content",
                    description:
                      "Develop content that targets and engages local audiences.\n\nSteps:\n\n1. Research Local Topics\nUse Google Trends or Ahrefs to find trending topics relevant to your city or region.\n2. Draft a Blog Post\nWrite a blog targeting a location-based keyword (e.g., “Top Cafes in [City Name]”).\n3. Optimize for SEO\nAdd internal links to relevant pages and external links to high-authority sites.\nUse location-specific keywords in the title, headings, and body text.\n4. Finalize and Publish\nEnsure the content is engaging, grammatically correct, and visually appealing.\n\nTools:\n\nAhrefs, SemRush, SurferSEO\n\nDeliverables:\n\nPublished blog post or draft link.\nKeyword research and SEO optimization documentation.\n\nSubmission:\nOnce you've completed your task, post it in the #digital-marketing channel with the hashtag #cl-dm-local-3 to earn 250 karma points! 🎉🔥",
                    resources: [
                      "https://trends.google.com",
                      "https://ahrefs.com",
                      "https://www.semrush.com",
                    ],
                  },
                  {
                    title: "Generate and Respond to Reviews",
                    description:
                      "Build credibility by generating and professionally responding to reviews.\n\nSteps:\n\n1. Generate a Google Review Link\nUse a Google Review Link Generator to create a shareable link for customers.\n2. Share the Link\nPromote the link via social media or email campaigns.\n3. Respond to Reviews\nRespond to at least 5 reviews (positive or negative) in a professional tone.\n\nTools:\n\nGoogle Review Link Generator\n\nDeliverables:\n\nReview link and proof of social sharing.\nScreenshots of review responses.\n\nSubmission:\nOnce you've completed your task, post it in the #digital-marketing channel with the hashtag #cl-dm-local-4 to earn 100 karma points! 🎉🔥",
                    resources: [
                      "https://support.google.com/business/answer/7035772",
                    ],
                  },
                  {
                    title: "Add Local Schema Markup",
                    description:
                      "Enhance search engine visibility with structured data.\n\nSteps:\n\n1. Generate Schema Markup\nUse Google’s Structured Data Markup Helper to create local business schema.\n2. Integrate the Markup\nAdd the schema code to the website's HTML.\n3. Test the Markup\nValidate the code using Google’s Rich Results Test to ensure accuracy.\n\nTools:\n\nGoogle Structured Data Markup Helper\n\nDeliverables:\n\nLocal schema markup code snippet.\nScreenshot of successful test results.\n\nSubmission:\nOnce you've completed your task, post it in the #digital-marketing channel with the hashtag #cl-dm-local-5 to earn 150 karma points! 🎉🔥",
                    resources: [
                      "https://search.google.com/structured-data/testing-tool",
                    ],
                  },
                  {
                    title: "Optimize Google My Business (GMB)",
                    description:
                      'Set up and optimize a Google My Business profile to boost local search visibility.\n\nSteps:\n\n1. Search for or Create a GMB Listing\nLook up the business on Google My Business.\nIf no listing exists, create a new one.\n2. Add Complete Business Details\nInclude Name, Address, Phone (NAP), business description, operating hours, and high-quality images.\n3. Publish a Post\nHighlight an event, offer, or promotion using the "Add Post" feature.\n4. Verify the Listing\nComplete the verification process through the postcard, phone, or email options.\n\nTools:\n\nLocalViking\n\nDeliverables:\n\nVerified GMB profile screenshots.\nScreenshot of the published post.\n\nSubmission:\nOnce you\'ve completed your task, post it in the #digital-marketing channel with the hashtag #cl-dm-local-1 to earn 200 karma points! 🎉🔥',
                    resources: [
                      "https://www.google.com/business/",
                      "https://localviking.com",
                    ],
                  },
                  {
                    title: "Ensure NAP Consistency",
                    description:
                      "1. Identify Local Directories\nChoose 5-10 directories (e.g., Yelp, Yellow Pages, etc.) relevant to your location and niche.\n2. Check Existing NAP Details\nReview the business's Name, Address, and Phone (NAP) in each directory.\n3. Update Inconsistent Details\nMake corrections for any inaccurate or outdated information.\n4. Document Changes\nTake screenshots before and after updating NAP details for proof.\n\nTools:\n\nAhrefs, BrightLocal, WhiteSpark\n\nDeliverables:\n\nList of directories reviewed.\nScreenshots of updates.\n\nSubmission:\nOnce you've completed your task, post it in the #digital-marketing channel with the hashtag #cl-dm-local-2 to earn 150 karma points! 🎉🔥",
                    resources: [
                      "https://www.brightlocal.com",
                      "https://whitespark.ca",
                    ],
                  },
                  {
                    title: "Create Location-Based Content",
                    description:
                      "Develop content that targets and engages local audiences.\n\nSteps:\n\n1. Research Local Topics\nUse Google Trends or Ahrefs to find trending topics relevant to your city or region.\n2. Draft a Blog Post\nWrite a blog targeting a location-based keyword (e.g., “Top Cafes in [City Name]”).\n3. Optimize for SEO\nAdd internal links to relevant pages and external links to high-authority sites.\nUse location-specific keywords in the title, headings, and body text.\n4. Finalize and Publish\nEnsure the content is engaging, grammatically correct, and visually appealing.\n\nTools:\n\nAhrefs, SemRush, SurferSEO\n\nDeliverables:\n\nPublished blog post or draft link.\nKeyword research and SEO optimization documentation.\n\nSubmission:\nOnce you've completed your task, post it in the #digital-marketing channel with the hashtag #cl-dm-local-3 to earn 250 karma points! 🎉🔥",
                    resources: [
                      "https://trends.google.com",
                      "https://ahrefs.com",
                      "https://www.semrush.com",
                    ],
                  },
                  {
                    title: "Generate and Respond to Reviews",
                    description:
                      "Build credibility by generating and professionally responding to reviews.\n\nSteps:\n\n1. Generate a Google Review Link\nUse a Google Review Link Generator to create a shareable link for customers.\n2. Share the Link\nPromote the link via social media or email campaigns.\n3. Respond to Reviews\nRespond to at least 5 reviews (positive or negative) in a professional tone.\n\nTools:\n\nGoogle Review Link Generator\n\nDeliverables:\n\nReview link and proof of social sharing.\nScreenshots of review responses.\n\nSubmission:\nOnce you've completed your task, post it in the #digital-marketing channel with the hashtag #cl-dm-local-4 to earn 100 karma points! 🎉🔥",
                    resources: [
                      "https://support.google.com/business/answer/7035772",
                    ],
                  },
                  {
                    title: "Add Local Schema Markup",
                    description:
                      "Enhance search engine visibility with structured data.\n\nSteps:\n\n1. Generate Schema Markup\nUse Google’s Structured Data Markup Helper to create local business schema.\n2. Integrate the Markup\nAdd the schema code to the website's HTML.\n3. Test the Markup\nValidate the code using Google’s Rich Results Test to ensure accuracy.\n\nTools:\n\nGoogle Structured Data Markup Helper\n\nDeliverables:\n\nLocal schema markup code snippet.\nScreenshot of successful test results.\n\nSubmission:\nOnce you've completed your task, post it in the #digital-marketing channel with the hashtag #cl-dm-local-5 to earn 150 karma points! 🎉🔥",
                    resources: [
                      "https://search.google.com/structured-data/testing-tool",
                    ],
                  },
                ],
              },
              resources: 48,
              proofOfWork: 18,
              rating: 0,
              hasGift: false,
            },
          ],
        },
        {
          level: "Level 6",
          cards: [
            {
              title: "Advanced Digital Marketing Techniques",
              data: {
                description:
                  "This section delves into specialized strategies and tools to elevate your marketing expertise. This section focuses on mastering Google Ads for effective paid campaigns, leveraging data analytics to measure and improve performance, and creating high-value, SEO-optimized content through content marketing mastery. You’ll also explore affiliate marketing and partnerships to expand brand reach. These skills empower you to craft data-driven, impactful campaigns, create engaging content with visuals, and track performance metrics to achieve diverse business goals.",
                whatYouWillLearn: [
                  "Running Effective Google Ads Campaigns: Learn how to create and manage Google Ads campaigns, optimize bidding strategies, and target the right audience for maximum ROI.",
                  "Data Analytics for Marketing: Master data-driven marketing by analyzing metrics, tracking performance, and using insights to continually improve campaign effectiveness.",
                  "SEO-Optimized Content Creation: Develop skills to craft high-value content that is SEO-friendly, drives organic traffic, and engages target audiences.",
                  "Affiliate Marketing and Partnerships: Discover how to build affiliate marketing programs and partnerships to extend brand reach and enhance marketing results.",
                ],
                challenges: [
                  {
                    title: "Google Ads Certification",
                    description:
                      "Step 1: Visit the page: https://skillshop.docebosaas.com/learn/public/catalog/view/1. Step 2: Create a profile and start the course. Step 3: After completing all lessons, post the screenshot of the certificate in the digital-marketing channel with the hashtag #cl-dm-google-ads to earn 700 karma points.",
                    resources: [
                      "https://skillshop.docebosaas.com/learn/public/catalog/view/1",
                    ],
                  },
                  {
                    title: "Data Analytics and Reporting",
                    description:
                      "Create a Data-Driven Marketing Dashboard: Choose a marketing platform (Google Analytics or Data Studio) to track performance metrics. Set up KPIs: traffic, bounce rate, conversion rate, and ROI. Use GA4 to analyze user behavior and define audience segments. Create a dashboard that visually showcases trends and insights. Submit your dashboard link in #digital-marketing with the hashtag #cl-dm-analytics to earn 400 karma points!",
                    resources: [
                      "https://analytics.google.com",
                      "https://datastudio.google.com",
                      "https://www.microsoft.com/en-us/microsoft-365/excel",
                    ],
                  },
                  {
                    title: "Content Marketing Mastery",
                    description:
                      "Publish a High-Value Blog Post: Research trending keywords using Ahrefs or SEMrush. Write a 1,000-word blog post optimized for SEO. Include engaging visuals like infographics and videos. Publish the post and promote it via email marketing and social media. Share the published post link in #digital-marketing with the hashtag #cl-dm-content to earn 500 karma points!",
                    resources: [
                      "https://ahrefs.com",
                      "https://www.semrush.com",
                      "https://www.canva.com",
                      "https://wordpress.com",
                    ],
                  },
                  {
                    title: "Affiliate Marketing and Partnerships",
                    description:
                      "Build an Affiliate Outreach Strategy: Identify 10 potential affiliate partners in your niche. Draft a compelling outreach email or pitch. Create an affiliate page on your website with terms and tracking links. Monitor affiliate-generated leads and sales using an analytics tool. Share results in #digital-marketing with the hashtag #cl-dm-affiliate to earn 400 karma points!",
                    resources: [
                      "https://affiliatewp.com",
                      "https://analytics.google.com",
                      "https://www.canva.com",
                    ],
                  },
                ],
              },
              resources: 11,
              proofOfWork: 4,
              rating: 0,
              hasGift: false,
            },
          ],
        },
        {
          level: "Level 7",
          cards: [
            {
              title: "Social Media Marketing",
              data: {
                description:
                  "This section encompasses various strategies to enhance brand presence and engage audiences effectively. It starts with strategy development to define goals and execution plans, followed by establishing a strong brand identity across platforms. SM poster design and platform-specific content creation ensure content is visually appealing and tailored to each platform’s audience. Tracking trends through SM trends reports helps keep content relevant, while SM contest planning drives engagement. Hashtag research and optimization boosts discoverability, and engagement-boosting campaigns increase user interaction. Together, these elements form a robust approach to growing brand visibility and fostering audience connections.",
                whatYouWillLearn: [
                  "Developing Social Media Strategies: Learn to define goals, craft execution plans, and create effective strategies that align with brand objectives and target audiences.",
                  "Creating Platform-Specific Content: Understand how to design engaging content tailored to the unique features and audience of each social media platform.",
                  "Tracking Social Media Trends: Master how to monitor and analyze trending topics to keep your content relevant and timely.",
                  "Running Engagement-Boosting Campaigns: Learn to plan and execute social media contests, optimize hashtags for discoverability, and create campaigns that foster interaction and engagement.",
                ],
                challenges: [
                  {
                    title: "Affiliate Marketing and Partnerships",
                    description:
                      "Build a Comprehensive Social Media Strategy\n\nSteps:\n\nResearch a brand's current social media presence and performance. \nDevelop a detailed strategy with clear goals (e.g., awareness, engagement, conversions). \nInclude content ideas, a posting schedule, and platform-specific tactics. \nDeliverables: A complete social media strategy document.\n\nShare the strategy document in #digital-marketing with the hashtag #cl-dm-strategy to earn 500 karma points! ",
                    resources: [
                      "https://trello.com",
                      "https://www.notion.so",
                      "https://www.google.com/docs",
                    ],
                  },
                  {
                    title: "Brand Identity",
                    description:
                      "Create a brand identity for a fictitious company or product by designing key branding assets such as a logo, color palette, and typography. Use Canva or Figma to develop these assets and showcase them as part of the brand’s visual identity.\n\nSteps:\n\nChoose a Brand Name and Concept:\n\nSelect a name for the brand or product you want to create.\nDevelop a brief concept or story behind the brand (e.g., target audience, industry, and key values). This will guide your design choices.\nCreate a Logo Design:\n\nUse Canva or Figma to design a simple, memorable logo for the brand.\nEnsure the logo is scalable and works well in both large and small formats.\nExperiment with different typography, shapes, and colors that reflect the brand's personality.\nChoose a Color Palette:\n\nSelect 3-5 primary brand colors that align with the brand’s personality and target audience.\nCreate a cohesive color scheme that works across various design materials.\nDefine Brand Typography:\n\nChoose 2-3 fonts for headings, subheadings, and body text that fit the brand’s tone (e.g., professional, playful, minimalist).\nCreate Additional Branding Assets (Optional):\n\nDesign any additional branding materials such as business cards, social media profile images, or a website header.\nProvide Proof of Work:\n\nUpload the final designs (logo, color palette, typography) to a shared folder or Google Drive.\nDeliverables:\n\nLogo design (in PNG/SVG format).\nColor palette with hex codes.\nTypography style guide (font names and usage recommendations).\nCanva/Figma file link to the designs.\n\nUpload the designs to a shared folder and share the Canva/Figma file link.",
                    resources: ["https://www.canva.com", "https://www.figma.com"],
                  },
                  {
                    title: "SM Poster Design",
                    description:
                      "Design eye-catching and engaging social media posters for a campaign using Canva or Figma. The posters should align with the brand's message, be visually appealing, and ready for sharing on social media platforms.\n\nSteps:\n\nChoose a Campaign Theme or Topic:\n\nSelect a theme or campaign for the social media posters (e.g., product promotion, seasonal sale, brand awareness).\nEnsure the theme aligns with the brand's tone and message.\nDesign Posters Using Canva/Figma:\n\nCreate 3-5 unique and high-quality posters.\nEach poster should be optimized for the platform you are targeting (e.g., Instagram post, Facebook ad, etc.).\nIncorporate brand colors, fonts, and logos to maintain consistency with the brand identity.\nEnsure the posters are visually engaging, using elements like images, icons, and text in a balanced layout.\nExport the Posters:\n\nDownload the posters in high resolution (preferably in PNG or JPEG format) for web use.\nDeliverables:\n\n3-5 designed posters in PNG/JPEG format.\nCanva/Figma file link to the designs.\n\nUpload the final posters and share the Canva/Figma file link.",
                    resources: ["https://www.canva.com", "https://www.figma.com"],
                  },
                  {
                    title: "Platform-Specific Content Creation",
                    description:
                      "Design Platform-Specific Content for Two Social Media Platforms\n\nSteps:\n\nChoose two platforms (e.g., Instagram and LinkedIn). \nCreate 3 unique posts tailored to each platform’s audience and style. \nPost or schedule the content and track engagement. \nDeliverables:\n\n6 unique posts (3 per platform), Engagement metrics (likes, comments, shares).\n\nShare screenshots and engagement insights in #digital-marketing with the hashtag #cl-dm-platform to earn 400 karma points! ",
                    resources: [
                      "https://www.canva.com",
                      "https://buffer.com",
                      "https://www.meta.com/creator-studio",
                    ],
                  },
                  {
                    title: "SM Trends Report",
                    description:
                      "Compile a Report on Current Social Media Trends\n\nSteps:\n\nResearch and identify 5 relevant social media trends. \nHighlight how each trend can impact a niche or business. \nCreate a professional report summarizing your findings. \nDeliverables:\n\nA social media trends report.\n\nShare your report in #digital-marketing with the hashtag #cl-dm-trends to earn 400 karma points! ",
                    resources: [
                      "https://explodingtopics.com",
                      "https://trends.google.com",
                      "https://buzzsumo.com",
                    ],
                  },
                  {
                    title: "SM Contest Planning",
                    description:
                      "Design a Social Media Contest\n\nSteps:\n\nCreate a contest concept with defined goals, rules, and prizes. 🏆\nDesign engaging visuals and copy for the contest announcement. 🎨\nDeliverables:\n\nContest plan (goal, rules, prizes), Supporting visuals and copy.\n\nShare your contest plan in #digital-marketing with the hashtag #cl-dm-contest to earn 500 karma points! 🎉",
                    resources: [
                      "https://www.canva.com",
                      "https://www.figma.com",
                      "https://gleam.io",
                    ],
                  },
                  {
                    title: "Hashtag Research and Optimization",
                    description:
                      "Conduct Hashtag Research for a Niche\n\nSteps:\n\nChoose a niche and analyze trending hashtags. \nCreate a categorized list of 30 hashtags (e.g., high-volume, niche-specific, branded). \nDeliverables:\n\nA categorized list of 30 optimized hashtags.\n\nShare the list in #digital-marketing with the hashtag #cl-dm-hashtags to earn 300 karma points! ",
                    resources: ["https://hashtagify.me", "https://keyhole.co"],
                  },
                  {
                    title: "Engagement Boosting Campaign",
                    description:
                      "Plan and Execute an Engagement Campaign\n\nSteps:\n\nDesign a campaign that encourages audience participation (e.g., polls, challenges, Q&A). \nPost the campaign and monitor engagement for a week. \nDeliverables:\n\nCampaign post(s), Engagement metrics (likes, comments, shares).\n\nShare your campaign details and engagement metrics in #digital-marketing with the hashtag #cl-dm-engagement to earn 500 karma points! ",
                    resources: [
                      "https://www.instagram.com/stories",
                      "https://www.linkedin.com/polls",
                      "https://www.facebook.com/qna",
                    ],
                  },
                ],
              },
              resources: 21,
              proofOfWork: 8,
              rating: 0,
              hasGift: false,
            },
          ],
        },
      ],
      thinkTank: [
        {
          id: "tt-007",
          name: "Nathan Brooks",
          role: "Marketing Strategist, HubSpot",
          image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&q=80",
          expertise: ["SEO", "Content Marketing"],
        },
      ],
      mentors: [
        {
          id: "m-007",
          name: "Jijosh A T",
          role: "Managing Partner @ TechHazel Media",
          linkedin: "https://www.linkedin.com/in/jijosh-at-a70b1b77/",
          image: "/assets/IG/Digital Marketing/Mentors/Jijosh At.webp",
          expertise: [], // Add if available
        },
        {
          id: "m-008",
          name: "Renju R",
          role: "Digital Marketing Direction @ FAYA Corporation",
          linkedin: "https://www.linkedin.com/in/renju-r-407a1a62/",
          image: "/assets/IG/Digital Marketing/Mentors/Renju.webp",
          expertise: [],
        },
        {
          id: "m-009",
          name: "Deepraj R",
          role: "Senior Growth Marketer Consultant @ UprootSecurity",
          linkedin: "https://www.linkedin.com/in/deeprajr/",
          image: "/assets/IG/Digital Marketing/Mentors/Deepraj R.webp",
          expertise: [],
        },
      ],
    },
    communityPartners: [
      {
        id: "cp-007-1",
        title: "TechHazel Media",
        image: "/assets/IG/Digital Marketing/Community Partners/TechHazel Media.webp",
        link: "#", // Replace with actual link if available
      },
      {
        id: "cp-007-2",
        title: "Technopark Today",
        image: "/assets/IG/Digital Marketing/Community Partners/Technopark Today.webp",
        link: "#",
      },
      {
        id: "cp-007-3",
        title: "Kerala Knowledge Economy Mission",
        image:
          "/assets/IG/Digital Marketing/Community Partners/Kerala Knowledge Economy Mission.webp",
        link: "#",
      },
    ],
    partnerCompanies: [
      {
        id: "pc-007",
        title: "BrandBoost",
        image: "https://www.svgrepo.com/show/452148/hubspot.svg",
        link: "https://brandboost.com",
      },
    ],
  },
  //data science 
  {
    id: "85fdd535-08d2-4619-9da7-944e21365de9",
    title: "Data Science",
    description:
      "Excited about uncovering insights from data? The Data Science Interest Group offers an opportunity to explore big data, machine learning, and predictive analysis, perfect for anyone interested in data-driven decision-making. Join us to understand how data can reveal patterns, trends, and solutions.",
    bannerImage:
    "/assets/IG/Cover/2.png",
    memberCount: 1800, // Placeholder value; adjust as needed
    memberSince: "January 2023", // Placeholder; adjust as needed
    isPublic: true,
    officeHours: "Monday 8:30PM",
    thinkTankMeeting: "2nd Friday 6:30 PM @ Google Meet",
    interestGroupLeads: {
      description:
        "Interest group leads manage the activities and events within interest groups and serve as a point of contact for students interested in getting involved. Students can connect with these leads to learn about opportunities within their interests.",
      leads: [
        {
          name: "Muhammed Ziyan",
          institution: "St. Thomas Institute for Science and Technology",
          linkedin: "https://www.linkedin.com/in/mziyan/",
          image: "/assets/IG/Data Science/IG Lead/Muhammed Ziyan.webp",
          expertise: ["Machine Learning", "Big Data"],
        },
        {
          name: "Jeeva Vinod",
          institution: "Vidya Academy of Science and Technology",
          linkedin: "https://www.linkedin.com/in/jeeva-vinod-7b536a215",
          image: "/assets/IG/Data Science/IG Lead/Jeeva Vinod.webp",
          expertise: ["Data Visualization", "Predictive Modeling"],
        },
      ],
    },
    prerequisites: [
      "Know Python, a programming language used for working with data.",
      "Learn SQL to manage and access data stored in databases.",
      "Understand basic statistics to analyze data and find patterns.",
      "Know how to use Excel functions to organize and work with data.",
    ],
    peopleToFollow: [
      { name: "Hilary Mason", link: "https://x.com/hmason" },
      { name: "Ben Lorica", link: "https://x.com/bigdata" },
      { name: "DJ Patil", link: "https://x.com/dpatil" },
      { name: "Cassie Kozyrkov", link: "https://www.linkedin.com/in/kozyrkov/" },
      { name: "Kirk Borne", link: "https://www.linkedin.com/in/kirkdborne/" },
    ],
    blogsToFollow: [
      { name: "Towards Data Science", link: "https://towardsdatascience.com/" },
      { name: "Data Science Central", link: "https://www.datasciencecentral.com/" },
      { name: "KD Nuggets", link: "https://www.kdnuggets.com/" },
    ],
    topKeywords: [
      "Data Cleaning",
      "Machine Learning",
      "Big Data",
      "Data Visualization",
      "Python",
      "R",
      "Predictive Modeling",
      "Algorithms",
      "Data Wrangling",
      "Neural Networks",
    ],
    tabs: {
      about: {
        foundationDeck: "",
        description:
          "The Data Science Interest Group connects enthusiasts and professionals passionate about uncovering insights from data. Explore our resources at: <a href='https://mulearnfoundation.notion.site/11e59e69b1bf80dcb994c2ba100c04d5?pvs=25' target='_blank' rel='noopener noreferrer'>Foundation Deck</a>",
        opportunities: [
          {
            title: "Data Scientist",
            description: "Analyze data to extract actionable insights.",
          },
          {
            title: "Data Engineer",
            description: "Develop and maintain data pipelines for processing data.",
          },
          {
            title: "Machine Learning Engineer",
            description: "Design models to predict outcomes from data.",
          },
          {
            title: "Business Intelligence Analyst",
            description: "Use data to make informed business decisions.",
          },
          {
            title: "Data Analyst",
            description:
              "Work on datasets to derive trends and insights for companies.",
          },
        ],
      },
      forum: { placeholder: "Discuss data science topics here." },
      members: [
        {
          id: 20,
          name: "Emma Carter",
          muid: "emma456",
          profile_pic:
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&q=80", // Placeholder image
          karma: "1100", // Placeholder value
          interest_groups: [
            { id: "85fdd535-08d2-4619-9da7-944e21365de9", name: "Data Science Interest Group" },
          ],
          organizations: [
            {
              id: "org-21",
              title: "Data Science Academy",
              code: "DSA01",
              org_type: "College",
            }, // Placeholder organization
          ],
        },
      ],
      events: [
        {
          id: "evt-013",
          title: "Data Science Bootcamp 2025",
          link: "https://datasciencecommunity.com/events/bootcamp", // Placeholder link
          venue: "Online via Zoom",
          eventType: "Online",
          date: "August 10, 2025", // Placeholder date
          time: "14:00 - 17:00 GMT", // Placeholder time
          image:
            "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800", // Placeholder image
        },
      ],
      // learningPaths: [
      //   {
      //     id: "lp-008",
      //     title: "Data Science Basics",
      //     description: "Learn foundational data science skills with Python.",
      //     link: "/learning-paths/data-science", // Placeholder link
      //   },
      // ],
      thinkTank: [
        {
          id: "tt-008",
          name: "Alex Thompson",
          role: "Data Science Lead, Google",
          image:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&q=80", // Placeholder image
          expertise: ["Machine Learning", "Big Data"], // Placeholder expertise
        },
      ],
      mentors: [
        {
          id: "m-008",
          name: "Arjun MS",
          role: "Backend Developer @Gtech µLearn",
          linkedin: "https://www.linkedin.com/in/the-arjun-ms/",
          image: "/assets/IG/Data Science/Mentors/Arjun M S.webp",
          expertise: [], // Add if available
        },
      ],
    },
    communityPartners: [], // Set to empty array since provided data has null
    partnerCompanies: [
      {
        id: "pc-008",
        title: "DataTech Solutions",
        image: "https://www.svgrepo.com/show/452149/python.svg", // Placeholder image (Python-related)
        link: "https://datatechsolutions.com", // Placeholder link
      },
    ],
  },
//cloud and devops
  {
    id: "1719d19a-0206-4161-9c6f-0a7dba44d4e5", // Unique ID for Cloud and DevOps
    title: "Cloud and DevOps",
    description:
      "Wonder how applications are deployed and managed in the cloud? Cloud computing and DevOps are the backbone of modern IT infrastructure, ensuring that software is delivered faster, more efficiently, and with higher reliability. The Cloud Computing & DevOps Interest Group at GTech μLearn is here to equip you with the skills needed to master cloud platforms, automation tools, and continuous integration/continuous deployment (CI/CD) practices. Join us to explore, learn, and collaborate on real-world projects, and dive into the future of cloud-native technologies.",
    bannerImage:
    "/assets/IG/Cover/6.png",
    memberCount: 1057, 
    memberSince: "March 2023", // Placeholder; adjust as needed
    isPublic: true,
    officeHours: "Wednesday 7PM",
    thinkTankMeeting: "Thursday 6:00 PM @ Google Meet",
    interestGroupLeads: {
      description:
        "Interest group leads manage the activities and events within interest groups and serve as a point of contact for students interested in getting involved. Students can connect with these leads to learn about opportunities within their interests.",
      leads: [
        {
          name: "Lezin VM",
          institution: "College of Engineering Aranmula",
          linkedin: "https://www.linkedin.com/in/lezin-vm/",
          image: "/assets/IG/Devops/IG Leads/Lezin V M.webp",
          expertise: ["Cloud Computing", "DevOps"],
        },
      ],
    },
    prerequisites: [
      "Having a basic understanding of programming languages like Python, Java, or JavaScript will help with automation and cloud applications.",
      "Familiarity with operating systems (Linux and Windows) is important, as most tools run on these platforms.",
      "Knowledge of version control systems like Git, basic networking concepts (IP addresses, DNS, HTTP/HTTPS), and virtualization (VMs, Docker) will also be helpful.",
      "Familiarity with cloud platforms like AWS, Azure, or Google Cloud is an advantage but not required.",
    ],
    peopleToFollow: [
      { name: "Werner Vogels", link: "https://twitter.com/Werner" },
      { name: "Kelsey Hightower", link: "https://twitter.com/kelseyhightower" },
      { name: "Nicole Forsgren", link: "https://twitter.com/nicolefv" },
      { name: "Jeff Barr", link: "https://twitter.com/jeffbarr" },
      { name: "Martin Fowler", link: "https://martinfowler.com/" },
    ],
    blogsToFollow: [
      { name: "AWS News Blog", link: "https://aws.amazon.com/blogs/aws/" },
      { name: "All Things Distributed", link: "https://www.allthingsdistributed.com/" },
      { name: "DevOps.com", link: "https://devops.com/" },
      { name: "Cloudonaut", link: "https://cloudonaut.io/" },
      { name: "Google Cloud DevOps and SRE Blog", link: "https://cloud.google.com/blog/products/devops-sre" },
    ],
    topKeywords: [
      "CI/CD",
      "Containerization",
      "Kubernetes",
      "Docker",
      "Cloud Platforms",
      "Infrastructure as Code (IaC)",
      "Serverless",
      "DevOps Pipelines",
      "Monitoring",
      "SRE",
    ],
    tabs: {
      about: {
        foundationDeck: "",
        description:
          "The Cloud Computing & DevOps Interest Group connects enthusiasts and professionals passionate about modern IT infrastructure.",
        opportunities: [
          {
            title: "DevOps Engineer",
            description: "Develop processes for faster code releases.",
          },
          {
            title: "Cloud Engineer",
            description: "Manage cloud services and applications.",
          },
          {
            title: "Site Reliability Engineer",
            description: "Maintain uptime and ensure application performance.",
          },
          {
            title: "Automation Engineer",
            description: "Automate infrastructure and software deployment.",
          },
          {
            title: "Cloud Architect",
            description: "Design cloud-based solutions for organizations.",
          },
        ],
      },
      forum: { placeholder: "Discuss cloud and DevOps topics here." },
      members: [
        {
          id: 21,
          name: "Liam Patel",
          muid: "liam789",
          profile_pic:
            "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=40&h=40&q=80", // Placeholder image
          karma: "1450", // Placeholder value
          interest_groups: [
            { id: "95fdd535-08d2-4619-9da7-944e21365de9", name: "Cloud and DevOps Interest Group" },
          ],
          organizations: [
            {
              id: "org-22",
              title: "Tech Institute",
              code: "TI01",
              org_type: "College",
            }, // Placeholder organization
          ],
        },
      ],
      events: [
        {
          id: "evt-014",
          title: "Cloud DevOps Summit 2025",
          link: "https://clouddevopscommunity.com/events/summit", // Placeholder link
          venue: "Online via Zoom",
          eventType: "Online",
          date: "September 15, 2025", // Placeholder date
          time: "13:00 - 16:00 GMT", // Placeholder time
          image:
            "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800", // Placeholder image
        },
      ],
      // learningPaths: [
      //   {
      //     id: "lp-009",
      //     title: "DevOps with AWS",
      //     description: "Learn DevOps practices using AWS tools.",
      //     link: "/learning-paths/devops-aws", // Placeholder link
      //   },
      // ],
      thinkTank: [
        {
          id: "tt-009",
          name: "Sarah Mitchell",
          role: "Cloud Architect, Microsoft",
          image:
            "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=40&h=40&q=80", // Placeholder image
          expertise: ["Kubernetes", "Cloud Security"], // Placeholder expertise
        },
      ],
      mentors: [
        {
          id: "m-009",
          name: "Akash Santhosh",
          role: "Network and Systems Engineer | Debian Contributor µlearn Alumni",
          linkedin: "https://www.linkedin.com/in/akashsanthosh/",
          image: "/assets/IG/Devops/Mentors/Akash Santhosh.webp",
          expertise: [], // Add if available
        },
        {
          id: "m-010",
          name: "Muhammed Iqbal P B",
          role: "Cloud Architect @Codeace Leading AWS UG, CNCG & Grafana Kochi, µlearn Alumni",
          linkedin: "https://www.linkedin.com/in/iqbalpb/",
          image: "/assets/IG/Devops/Mentors/Muhammed Iqbal.webp",
          expertise: [],
        },
      ],
    },
    communityPartners: [
      {
        id: "cp-009-1",
        title: "Devops",
        image: "/assets/IG/Devops/Community Partners/Devops.webp",
        link: "#", // Placeholder link; replace with actual URL if available
      },
    ],
    partnerCompanies: [
      {
        id: "pc-009",
        title: "CloudSync",
        image: "https://www.svgrepo.com/show/452150/aws.svg", // Placeholder image (AWS-related)
        link: "https://cloudsync.com", // Placeholder link
      },
    ],
  },


  //product management
  {
    id: "04d29c15-4de4-4b43-ad63-0f4760c62919", // Unique ID for Product Management
    title: "Product Management",
    description:
      "Product Management is deciding what to build next”. Are you interested in learning to build the right product and the product right? Join our “Product Management” Interest Group to learn and collaborate with peers.",
    bannerImage:
    "/assets/IG/Cover/7.png",
    memberCount: 2199, // Placeholder value; adjust as needed
    memberSince: "March 2023", // Placeholder; adjust as needed
    isPublic: true,
    officeHours: "TBA",
    thinkTankMeeting: "TBA",
    interestGroupLeads: {
      description:
        "Interest group leads manage the activities and events within interest groups and serve as a point of contact for students interested in getting involved. Students can connect with these leads to learn about opportunities within their interests.",
      leads: [
        {
          name: "Adarsh Madhusoodanan",
          institution: "College of Engineering Trikaripur",
          linkedin: "https://www.linkedin.com/in/adarshmadhusoodananp/",
          image: "/assets/IG/Product Management/IG lead/Adarsh Madhusoodanan.webp",
          expertise: ["Product Strategy", "UX Design"],
        },
      ],
    },
    prerequisites: [
      "Develop empathy for users to understand their needs and pain points.",
      "Cultivate problem-solving abilities to identify challenges and think critically about solutions.",
      "Strengthen communication skills to effectively convey ideas and collaborate with others.",
      "Focus on teamwork, as product management often involves working with designers, developers, and stakeholders.",
    ],
    peopleToFollow: [
      { name: "Tim Herbig", link: "https://www.linkedin.com/in/timherbig/" },
      { name: "Daniel Elizalde", link: "https://www.linkedin.com/in/danielelizalde/" },
      { name: "John Carter", link: "https://www.linkedin.com/in/johncarter/" },
      { name: "Charles Du", link: "https://www.linkedin.com/in/charlesdu/" },
    ],
    blogsToFollow: [
      { name: "PM School", link: "https://pmschool.io/" },
      { name: "BlackBox of PM", link: "https://blackboxofpm.com/" },
      { name: "Department of Product", link: "https://www.departmentofproduct.com/" },
    ],
    topKeywords: [
      "Product Strategy",
      "Agile Methodology",
      "Market Research",
      "Customer Feedback",
      "Roadmapping",
      "Product Lifecycle",
      "UX/UI Design",
      "Cross-functional Teams",
    ],
    tabs: {
      about: {
        foundationDeck: "https://www.notion.so/Product-Management-11e59e69b1bf8081b32ccfc0255949e0?pvs=4",
        description:
          "The Product Management Interest Group connects enthusiasts eager to master the art of building the right product and building it right.",
        opportunities: [
          {
            title: "Product Manager",
            description:
              "Oversee product lifecycle and align it with user needs and business goals.",
          },
          {
            title: "Associate Product Manager",
            description:
              "Support senior product managers in research, planning, and execution.",
          },
          {
            title: "Product Marketing Manager",
            description:
              "Develop strategies to market and position products effectively.",
          },
          {
            title: "Technical Product Manager",
            description:
              "Bridge technical teams and business goals to deliver successful products.",
          },
          {
            title: "UX Researcher",
            description:
              "Focus on understanding user behavior to inform product design and strategy.",
          },
        ],
      },
      forum: { placeholder: "Discuss product management strategies here." },
      members: [
        {
          id: 22,
          name: "Sophie Bennett",
          muid: "sophie123",
          profile_pic:
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&q=80", // Placeholder image
          karma: "1250", // Placeholder value
          interest_groups: [
            { id: "a5fdd535-08d2-4619-9da7-944e21365de9", name: "Product Management Interest Group" },
          ],
          organizations: [
            {
              id: "org-23",
              title: "Management Academy",
              code: "MA01",
              org_type: "College",
            }, // Placeholder organization
          ],
        },
      ],
      events: [
        {
          id: "evt-015",
          title: "Product Management Summit 2025",
          link: "https://pmcommunity.com/events/summit", // Placeholder link
          venue: "Online via Zoom",
          eventType: "Online",
          date: "October 20, 2025", // Placeholder date
          time: "11:00 - 14:00 GMT", // Placeholder time
          image:
            "https://images.unsplash.com/photo-1551288049-b51d5a7480e7?q=80&w=800", // Placeholder image
        },
      ],
      learningPaths: [
        {
          level: "Level 4",
          cards: [
            {
              title: "Understanding the Role",
              data: {
                description:
                  "Product managers are responsible for guiding the success of a product by balancing customer needs, business goals, and technical feasibility. They define product vision, align it with business strategy, and ensure cross-functional teams collaborate effectively.",
                whatYouWillLearn: [
                  "Fundamentals of product management: Product management involves overseeing the entire lifecycle of a product, from conception to development, launch, and beyond. It requires balancing business objectives, user needs, and technical capabilities to create valuable products. Product managers work on product strategy, roadmaps, and coordinating cross-functional teams to ensure successful product delivery.",
                  "Essential skills needed for a product manager: Core skills include market research, communication, problem-solving, strategic thinking, and leadership. Each of these helps PMs to make informed decisions, navigate challenges, and lead teams effectively.",
                  "The product manager's role in the organization: Product managers are responsible for guiding the success of a product by balancing customer needs, business goals, and technical feasibility. They define product vision, align it with business strategy, and ensure cross-functional teams collaborate effectively.",
                ],
                challenges: [
                  {
                    title: "Fundamentals of product management",
                    resources: [
                      "https://www.udemy.com/course/product-management-a/",
                    ],
                    description:
                      'In this task, you will gain a fundamental understanding of Product Management through the Udemy course "Introduction to Product Management". You\'ll learn about the responsibilities and roles of a product manager and explore various opportunities in Product Management.\n\nAfter completing this course, post the screenshot of the tasks in the Gtech Mulearn Discord server ⁠product-management channel using the hashtag #cl-product-intro to avail 400 karma points.',
                  },
                ],
              },
              resources: 1,
              proofOfWork: 1,
              rating: 0,
              hasGift: false,
            },
            {
              title: "Product Strategy",
              data: {
                description:
                  "In this phase, SWOT (Strengths, Weaknesses, Opportunities, Threats) analysis helps define a product's strategic positioning. It guides decisions on where the product can excel (strengths), areas for improvement (weaknesses), new markets or user needs it can serve (opportunities), and external challenges (threats) that might hinder growth.",
                whatYouWillLearn: [
                  "Developing a product strategy:Developing a product strategy is a critical step in product management. It involves defining a long-term vision and plan that outlines how the product will achieve its goals and deliver value to both customers and the business.",
                  "Importance of product-market fit:Product-market fit is crucial for a product’s success as it determines whether a product meets the specific needs and demands of its target market. Achieving product-market fit means that customers find value in a product, driving demand and satisfaction. This alignment is often the difference between sustainable growth and stagnation, as it shows that the product genuinely solves a problem or fills a gap in the market.​",
                  "Understanding market trends:Understanding market trends is crucial for product managers and businesses, as it provides insights into shifts in consumer preferences, technological advancements, and competitive dynamics.",
                ],
                challenges: [
                  {
                    title: "SWOT Analysis",
                    resources: ["https://youtu.be/mR9eICQJLXA?si=otvDfvtjlkdphHVh"],
                    description:
                      "A SWOT analysis is a strategic planning tool that helps individuals or organizations assess their current position and develop strategies for growth. It stands for Strengths, Weaknesses, Opportunities, and Threats\n\nIn this task, you will gain a comprehensive understanding of SWOT Analysis by watching the provided video on the SWOT Analysis of Starbucks. After understanding the concept, prepare a SWOT Analysis, identifying its strengths, weaknesses, opportunities, and threats, for one of the following product companies: Boat Audio Devices, TATA Motors EV, or Xiaomi MI India.",
                  },
                  {
                    title: "Market Research",
                    resources: [
                      "https://blog.logrocket.com/product-management/what-is-market-analysis-definition-examples-template/",
                    ],
                    description:
                      "Conducting a Competitor Analysis\n\nIdentify Key Competitors: Research and select 3–5 competitors for your product. Include both direct competitors (similar products) and indirect competitors (alternative solutions). For example, if analyzing Spotify, key competitors might include Apple Music, YouTube Music, and Amazon Music.\n\nAnalyze Product Features and Pricing: Compare competitors’ features, pricing models, and unique selling points (USPs). For Spotify, you could note its personalized playlists, podcast integration, and ad-free premium plan. Highlight standout features like YouTube Music’s free streaming or Amazon Music’s integration with Prime Membership to identify gaps or advantages.\n\nRead Customer Reviews: Dive into reviews from platforms like App Store, Play Store, or social media. For example, users may praise Spotify’s discoverability features but criticize limited offline downloads in the free version. These insights reveal strengths to enhance and weaknesses to address in your product.",
                  },
                ],
              },
              resources: 2,
              proofOfWork: 2,
              rating: 0,
              hasGift: false,
            },
          ],
        },
        {
          level: "Level 5",
          cards: [
            {
              title: "Product Development Process",
              data: {
                description:
                  "The product development process is a cyclical approach where a product is built, tested, and refined in multiple iterations. Each cycle incorporates user feedback and performance insights, leading to continuous improvement and faster delivery of a polished product that meets user expectations.",
                whatYouWillLearn: [
                  "Agile product development: Agile product development is a flexible and iterative approach that emphasizes collaboration, customer feedback, and rapid prototyping. It allows teams to adapt quickly to changes by breaking the development process into small, manageable sprints or iterations. This ensures continuous delivery of value and aligns the product closely with user needs.",
                  "Designing for your target audience: Designing for your target audience involves understanding their needs, preferences, and behaviors to create user-centric products. This process includes conducting research, creating personas, and focusing on user experience (UX) to ensure the product solves their problems effectively and enhances satisfaction.",
                  "Iterative product development process: The iterative product development process is a cyclical approach where a product is built, tested, and refined in multiple iterations. Each cycle incorporates user feedback and performance insights, leading to continuous improvement and faster delivery of a polished product that meets user expectations.",
                  "Understanding customer journey: Understanding the customer journey maps out the entire experience a customer has with a product or service. This includes identifying touchpoints, pain points, and opportunities for improvement, allowing businesses to optimize their offerings for better engagement and satisfaction.",
                  "Customer surveys: Customer surveys collect quantitative data through structured questionnaires to measure customer satisfaction, preferences, and expectations. They are a scalable way to gather feedback and identify trends across a larger audience.",
                ],
                challenges: [
                  {
                    title: "Create a basic Agile sprint plan",
                    resources: ["https://scrumguides.org/"],
                    description:
                      "Research Agile Fundamentals: Start by understanding the core principles of Agile methodology—flexibility, iterative progress, and customer collaboration. Explore frameworks like Scrum, which organizes work into sprints, and concepts like user stories to capture product requirements.\n\nMock Product Idea: Choose a product idea to implement Agile practices. For instance, develop a task management app aimed at simplifying daily to-dos for students.\n\nDefine User Stories: Write user stories based on customer needs. Example: “As a student, I want to create task lists quickly so that I can organize my assignments better.” Ensure stories are clear, actionable, and customer-focused.\n\nCreate a Sprint Plan: Divide work into 2-week sprints. For the first sprint, focus on basic UI development and task creation functionality. In the second sprint, add editing features, task reminders, and basic data storage.",
                  },
                  {
                    title: "Conduct a persona creation exercise",
                    resources: [
                      "https://www.coursera.org/learn/foundations-user-experience-design",
                    ],
                    description:
                      "Step 1: Define the Hypothetical App\nChoose a mock app to base your research on. For example, consider an app for budget tracking for students that simplifies financial management through intuitive design and gamified saving goals.\n\nStep 2: Research Target Audience\nIdentify the audience likely to benefit from the app. For this example, the target audience could be college students aged 18–25, who are digitally savvy but face challenges managing personal finances.\n\nStep 3: Create a Persona\nDevelop a user persona that includes:\nDemographics: Age, gender, education level, income range. Example: Maria, 20, a college student earning a part-time income.\nBehaviors: Daily app usage, tech comfort, spending habits. Example: Uses budgeting apps occasionally, prefers gamified tools.\nPain Points: Financial stress, lack of budgeting knowledge, inconsistent savings. Example: Struggles to keep track of monthly expenses.",
                  },
                  {
                    title: "Product Development",
                    resources: ["http://designkit.org/"],
                    description:
                      "Step 1: Pick a Simple Product Idea\nChoose a basic product idea to demonstrate the iterative process. For instance, a habit-tracking mobile app designed to help users track and improve daily routines.\n\nStep 2: Follow the Iterative Process\nIdeation: Brainstorm key features such as habit creation, progress tracking, and reminders. Define the primary goal: to make habit tracking simple and engaging.\n\nPrototyping: Create a low-fidelity wireframe showcasing the app’s main screens (e.g., dashboard, add habit, progress graph). Tools like Figma or Balsamiq can be used for visual representation.\n\nTesting: Share the prototype with 5–10 potential users for feedback. Focus on usability, design clarity, and feature priorities.\n\nRefining: Address feedback such as making habit creation faster or improving UI visibility for progress graphs.\n\nStep 3: Second Iteration\nBased on feedback, refine the prototype and add enhancements. For instance, include a streak feature to motivate users and simplify navigation by grouping habits into categories.",
                  },
                  {
                    title: "Map a customer journey",
                    resources: [""],
                    description:
                      "Step 1: Awareness\nThe journey begins when a potential customer becomes aware of a book they might want to purchase. This could be through social media ads, book reviews, or recommendations from friends. For example, an ad on Facebook might prompt the user to explore a new bestseller.\n\nStep 2: Consideration\nOnce the customer is aware of the book, they might search for more information online. They may read customer reviews, check ratings on platforms like Amazon, or explore online bookstores to compare prices. They consider factors like price, availability, and the reputation of the seller.\n\nStep 3: Decision\nAfter considering options, the customer makes the decision to buy. They may add the book to their shopping cart and proceed to checkout. At this stage, they are focused on the user experience—whether the site is easy to navigate, and whether payment methods are clear and secure.\n\nStep 4: Purchase\nThe...",
                  },
                ],
              },
              resources: 3,
              proofOfWork: 4,
              rating: 0,
              hasGift: false,
            },
            {
              title: "Using Product Metrics",
              data: {
                description:
                  "Define metrics to measure the product’s performance and the success of the strategy. These could include customer acquisition cost (CAC), lifetime value (LTV), user engagement, and NPS (Net Promoter Score).",
                whatYouWillLearn: [
                  "Important product metrics to track:Key Product Metrics and Their Importance",
                  "Churn Rate",
                  "Definition: Churn rate measures the percentage of customers who stop using the product or service during a specific period. It indicates how well a product retains its customers.",
                  "Formula: Churn Rate = (Customers lost during a period / Customers at the start of the period) x 100",
                  "Why It Matters: A high churn rate signals issues with customer satisfaction or product value, indicating areas for improvement. Monitoring churn helps identify retention problems and the effectiveness of customer engagement strategies.",
                  "Customer Lifetime Value (CLV)",
                  "Definition: CLV represents the total revenue a business can expect from a customer over the entire duration of their relationship.",
                  "Formula: CLV = (Average Value of a Sale) x (Number of Transactions) x (Customer Retention Period)",
                  "Why It Matters: CLV helps businesses understand how much a customer is worth in the long term. A higher CLV indicates that the business has a loyal customer base, which leads to more sustainable revenue.",
                  "Net Promoter Score (NPS)",
                  "Definition: NPS is a metric used to measure customer loyalty and satisfaction based on the likelihood of customers recommending the product to others.",
                  "Formula: NPS = % Promoters - % Detractors",
                  "Why It Matters: NPS gauges the overall customer experience and satisfaction. A high NPS suggests strong customer loyalty, which can drive growth through word-of-mouth referrals. It also highlights areas where customer experience needs improvement.",
                  "Monthly Active Users (MAU)",
                  "Definition: MAU tracks the number of unique users who engage with the product within a given month.",
                  "Formula: MAU = Total number of unique users within a month",
                  "Why It Matters: MAU is a critical metric for tracking user engagement and product popularity. A growing MAU shows that the product is engaging and retaining its users, while a stagnant or declining MAU may indicate issues with user retention or product appeal.",
                  "Analyzing product metrics:Analyzing product metrics involves identifying patterns, evaluating trends, and linking them to business objectives. Start by collecting accurate data, segmenting users, and comparing metrics like retention or churn over time. Tools like dashboards and visualizations can help make data actionable, enabling teams to make data-driven decisions for product improvements.",
                  "Regular review of user behavior:Regularly reviewing user behavior ensures a deeper understanding of how customers interact with a product. Analyzing session durations, feature usage, and common pain points allows teams to identify areas for optimization, refine UX, and align product features with user expectations.",
                ],
                challenges: [
                  {
                    title:
                      "Create a table listing key product metrics",
                    resources: [
                      "",
                    ],
                    description:
                      "Research and Define: Dive into each of these product metrics to fully understand their definitions, formulas, and why they are crucial to product management.\n\nWrite About Them: Write a blog or report discussing these metrics in detail, explaining how each one affects decision-making and product optimization.\n\nPublish on Medium: Share your findings and insights by publishing the article on Medium.",
                  },
                ],
              },
              resources: 0,
              proofOfWork: 1,
              rating: 0,
              hasGift: false,
            },
          ],
        },
      ],
      thinkTank: [
        {
          id: "tt-010",
          name: "Emma Clarkson",
          role: "Senior Product Manager, Atlassian",
          image:
            "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=40&h=40&q=80", // Placeholder image
          expertise: ["Product Strategy", "Agile"], // Placeholder expertise
        },
      ],
      mentors: [
        {
          id: "m-011",
          name: "Angel",
          role: "", // Placeholder role; update with actual role if available
          linkedin: "", // Empty as provided; update if available
          image: "/assets/IG/Product Management/Mentors/Angel.webp",
          expertise: [], // Add if available
        },
      ],
    },
    communityPartners: [], // Set to empty array since provided data has null
    partnerCompanies: [
      {
        id: "pc-010",
        title: "ProductLabs",
        image: "https://www.svgrepo.com/show/452151/jira.svg", // Placeholder image (Jira-related, common in PM)
        link: "https://productlabs.com", // Placeholder link
      },
    ],
  },

];


export const uiuxInterestGroupData = interestGroups[0]; //correct
export const webDevInterestGroupData = interestGroups[1]; //correct
export const cyberSecInterestGroupData = interestGroups[2]; //correct
export const gameDevInterestGroupData = interestGroups[3]; //correct
export const iotInterestGroupData = interestGroups[4]; //correct
export const hrInterestGroupData = interestGroups[5]; //not in db
export const digitalMarketingInterestGroupData = interestGroups[6]; //correct
export const dataScienceInterestGroupData = interestGroups[7]; //not in db
export const cloudDevOpsInterestGroupData = interestGroups[8]; //id correct
export const productManagementInterestGroupData = interestGroups[9]; //correct
//to add
/* 
no or low code coming soon
Entrepreneurship 
AR VR MR
AI
Mobile Development coming soon
3d Animation and Game Development
Competitive coding coming soon
Blockchain coming soon
strategic leadership coming soon
Civil Engineering coming soon
Creative Design coming soon
Beckn coming soon
QA
   */

//below are mockdata entirely except id

// // Entrepreneurship Interest Group
// export const entrepreneurshipInterestGroupData: InterestGroupData = {
//   id: "243a1bda-893c-4de3-b457-51e7cb517d83", // Assigned from JSON for "Entrepreneurship"
//   title: "Entrepreneurship",
//   description:
//     "Dream of starting your own venture? The Entrepreneurship Interest Group supports aspiring founders with skills in ideation, business planning, and execution. Join us to connect with like-minded innovators, learn from experienced entrepreneurs, and turn your ideas into successful businesses.",
//   bannerImage:
//     "https://images.unsplash.com/photo-1556740738-6b4a6d8b5b9b?q=80&w=3540&auto=format&fit=crop",
//   memberCount: 17500,
//   memberSince: "February 2022",
//   isPublic: true,
//   officeHours: "Monday 6:00 PM @ Discord",
//   thinkTankMeeting: "1st Thursday 7:00 PM @ Zoom",
//   interestGroupLeads: {
//     description:
//       "Interest group leads manage the activities and events within interest groups and serve as a point of contact for students interested in getting involved. Students can connect with these leads to learn about opportunities within their interests.",
//     leads: [
//       {
//         name: "Rahul Menon",
//         institution: "Business School",
//         linkedin: "https://www.linkedin.com/in/rahul-menon",
//         image: "/assets/IG/Entrepreneurship/IG Leads/RahulMenon.webp",
//       },
//     ],
//   },
//   prerequisites: [
//     "Basic understanding of business concepts such as revenue, costs, and market needs.",
//     "Interest in startups and willingness to take initiative.",
//     "Strong communication skills for pitching ideas and networking.",
//   ],
//   peopleToFollow: [
//     { name: "Elon Musk", link: "https://www.linkedin.com/in/elon-musk" },
//     { name: "Sara Blakely", link: "https://www.linkedin.com/in/sarablakely27" },
//     { name: "Gary Vaynerchuk", link: "https://www.linkedin.com/in/garyvaynerchuk" },
//     { name: "Daymond John", link: "https://www.linkedin.com/in/daymondjohn" },
//   ],
//   blogsToFollow: [
//     { name: "Entrepreneur", link: "https://www.entrepreneur.com" },
//     { name: "Forbes Entrepreneurs", link: "https://www.forbes.com/entrepreneurs" },
//     { name: "Inc.", link: "https://www.inc.com" },
//   ],
//   topKeywords: [
//     "Startups",
//     "Business Planning",
//     "Pitching",
//     "Funding",
//     "Innovation",
//     "Market Research",
//     "Entrepreneurial Mindset",
//     "Scaling",
//   ],
//   tabs: {
//     about: {
//       foundationDeck: "https://www.notion.so/Entrepreneurship",
//       description:
//         "The Entrepreneurship Interest Group is your launchpad to mastering the skills needed to start and grow a business. From ideation to execution, we provide resources, mentorship, and a community to help you succeed. Explore our resources to build your entrepreneurial journey.",
//       opportunities: [
//         {
//           title: "Startup Founder",
//           description: "Create and lead your own company from the ground up.",
//         },
//         {
//           title: "Business Development Manager",
//           description:
//             "Drive growth strategies and partnerships for emerging ventures.",
//         },
//         {
//           title: "Venture Analyst",
//           description:
//             "Evaluate startup opportunities for investment or collaboration.",
//         },
//       ],
//     },
//     forum: { placeholder: "Discuss startup ideas and strategies here." },
//     members: [
//       {
//         id: 24,
//         name: "Sneha Nair",
//         muid: "sneha456",
//         profile_pic:
//           "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&q=80",
//         karma: "950",
//         interest_groups: [
//           {
//             id: "243a1bda-893c-4de3-b457-51e7cb517d83",
//             name: "Entrepreneurship",
//           },
//         ],
//         organizations: [
//           {
//             id: "org-25",
//             title: "Biz Academy",
//             code: "BA01",
//             org_type: "College",
//           },
//         ],
//       },
//     ],
//     events: [
//       {
//         id: "evt-017",
//         title: "Startup Pitch Night 2025",
//         link: "https://entrepreneurcommunity.com/events/pitch-night",
//         venue: "Online via Zoom",
//         eventType: "Online",
//         date: "December 5, 2025",
//         time: "18:00 - 20:00 GMT",
//         image:
//           "https://images.unsplash.com/photo-1556740738-6b4a6d8b5b9b?q=80&w=800",
//       },
//     ],
//     learningPaths: [
//       {
//         id: "lp-012",
//         title: "Entrepreneurship 101",
//         description: "Learn the basics of starting a business.",
//         link: "/learning-paths/entrepreneurship",
//       },
//     ],
//     thinkTank: [
//       {
//         id: "tt-012",
//         name: "Vikram Singh",
//         role: "Startup Mentor, Y Combinator",
//         image:
//           "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=40&h=40&q=80",
//         expertise: ["Business Strategy", "Funding"],
//       },
//     ],
//     mentors: [
//       {
//         id: "m-013",
//         name: "Anita Desai",
//         role: "Entrepreneurship Coach",
//         linkedin: "https://www.linkedin.com/in/anita-desai",
//         image: "/assets/IG/Entrepreneurship/Mentors/AnitaDesai.webp",
//         expertise: ["Startup Growth", "Pitch Development"],
//       },
//     ],
//   },
//   communityPartners: [
//     {
//       id: "cp-012",
//       title: "Startup Hub",
//       image: "/assets/IG/Entrepreneurship/CP/StartupHub.webp",
//       link: "https://startuphub.org",
//     },
//   ],
//   partnerCompanies: [
//     {
//       id: "pc-012",
//       title: "VentureWorks",
//       image: "https://www.svgrepo.com/show/452153/venture.svg",
//       link: "https://ventureworks.com",
//     },
//   ],
// };

// // AR/VR/MR Interest Group from data from notion
// export const arVrMrInterestGroupData: InterestGroupData = {
//   id: "2de0ee0c-ddc3-4f02-bf93-b6bd2d0625c3", // Assigned from JSON for "Ar Vr Mr"
//   title: "AR/VR/MR",
//   description:
//     '"AR/VR is reshaping the way we interact with the digital world.” Are you interested in learning how to create immersive experiences that blend the virtual and physical worlds? Join our “AR/VR Development” Interest Group to explore and collaborate with peers on creating augmented and virtual reality applications.',
//   bannerImage:
//     "https://images.unsplash.com/photo-1593504049359-74330189a345?q=80&w=3540&auto=format&fit=crop",
//   memberCount: 9800,
//   memberSince: "June 2023",
//   isPublic: true,
//   officeHours: "TBA", // Updated from markdown (not specified)
//   thinkTankMeeting: "TBA", // Updated from markdown (not specified)
//   interestGroupLeads: {
//     description:
//       "Interest group leads manage the activities and events within interest groups and serve as a point of contact for students interested in getting involved. Students can connect with these leads to learn about opportunities in AR/VR development.",
//     leads: [
//       {
//         name: "Dev Nandan S",
//         institution: "St. Thomas Institute for Science & Technology",
//         linkedin: "http://www.linkedin.com/in/dev-nandan-426861253",
//         image: "/assets/IG/ARVRMR/IG Leads/DevNandanS.webp", // Updated image path assumption
//       },
//     ],
//   },
//   prerequisites: [
//     "Basic understanding of 3D modeling concepts and tools (e.g., Unity, Unreal Engine).",
//     "Interest in immersive technologies and their applications.",
//     "Familiarity with programming basics (e.g., C# for Unity) is a plus but not required.",
//   ],
//   peopleToFollow: [
//     { name: "Tony Parisi", link: "https://x.com/auradeluxe" },
//     { name: "Charlie Fink", link: "https://www.linkedin.com/in/charliefinkvr/" },
//     { name: "Valem", link: "https://www.youtube.com/c/ValemVR" },
//     { name: "Kent Bye", link: "https://www.linkedin.com/in/kentbye/" },
//   ],
//   blogsToFollow: [
//     { name: "Upload VR", link: "https://uploadvr.com/" },
//     { name: "Road to VR", link: "https://www.roadtovr.com/" },
//     { name: "ARPost", link: "https://arpost.co/" },
//   ],
//   topKeywords: [
//     "AR Development",
//     "VR Development",
//     "Unity",
//     "Unreal Engine",
//     "3D Modeling",
//     "Augmented Reality",
//     "Virtual Reality",
//     "Mixed Reality",
//     "Interaction Design",
//     "XR Development",
//     "Spatial Computing",
//     "Immersive Media",
//     "Reality Capture",
//     "Immersive Learning",
//   ],
//   tabs: {
//     about: {
//       foundationDeck: "https://www.notion.so/ARVRMR", // Placeholder; update with actual link if provided
//       description:
//         "The AR/VR Development Interest Group is your gateway to mastering the art of creating immersive experiences. Whether you're interested in gaming, education, or enterprise applications, we provide resources and a community to help you innovate with AR, VR, and MR technologies.",
//       opportunities: [
//         {
//           title: "AR/VR Developer",
//           description: "Design and implement AR/VR applications and experiences.",
//         },
//         {
//           title: "3D Artist",
//           description: "Create 3D models and assets for immersive environments.",
//         },
//         {
//           title: "Technical Artist",
//           description:
//             "Bridge the gap between 3D design and technical development for AR/VR.",
//         },
//         {
//           title: "Interaction Designer",
//           description:
//             "Develop intuitive and engaging user interactions for AR/VR applications.",
//         },
//         {
//           title: "AR/VR Product Manager",
//           description:
//             "Oversee the lifecycle of AR/VR products and align them with user needs and business goals.",
//         },
//         {
//           title: "XR Researcher",
//           description:
//             "Focus on innovating and optimizing AR/VR technologies and experiences.",
//         },
//       ],
//     },
//     forum: { placeholder: "Discuss AR/VR/MR projects and ideas here." },
//     members: [
//       {
//         id: 25,
//         name: "Maya Rao",
//         muid: "maya789",
//         profile_pic:
//           "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&q=80",
//         karma: "700",
//         interest_groups: [
//           {
//             id: "2de0ee0c-ddc3-4f02-bf93-b6bd2d0625c3",
//             name: "AR/VR/MR",
//           },
//         ],
//         organizations: [
//           {
//             id: "org-26",
//             title: "VR Academy",
//             code: "VRA01",
//             org_type: "College",
//           },
//         ],
//       },
//     ],
//     events: [
//       {
//         id: "evt-018",
//         title: "AR/VR Innovation Summit 2025",
//         link: "https://arvrcommunity.com/events/summit",
//         venue: "Online via Zoom",
//         eventType: "Online",
//         date: "January 15, 2026",
//         time: "13:00 - 16:00 GMT",
//         image:
//           "https://images.unsplash.com/photo-1593504049359-74330189a345?q=80&w=800",
//       },
//     ],
//     learningPaths: [
//       {
//         id: "lp-013",
//         title: "AR/VR Development Roadmap",
//         description: "Explore AR/VR development with this comprehensive roadmap.",
//         link: "https://roadmap.sh/r/arvr-q0hum",
//       },
//     ],
//     thinkTank: [
//       {
//         id: "tt-013",
//         name: "Arjun Verma",
//         role: "VR Developer, Meta",
//         image:
//           "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&q=80",
//         expertise: ["VR Development", "3D Modeling"],
//       },
//     ],
//     mentors: [
//       {
//         id: "m-014",
//         name: "Karthik Narayanan",
//         role: "Design Lead @ RigLabs Collective",
//         linkedin: "", // Not provided in markdown; left blank
//         image: "/assets/IG/ARVRMR/Mentors/KarthikNarayanan.webp", // Updated image path assumption
//         expertise: ["AR/VR Design", "Immersive Experiences"],
//       },
//     ],
//   },
//   communityPartners: [
//     {
//       id: "cp-013-1",
//       title: "XTrudar",
//       image: "/assets/IG/ARVRMR/CP/XTrudar.webp", // Placeholder image path
//       link: "#", // No link provided; placeholder
//     },
//     {
//       id: "cp-013-2",
//       title: "Riglabs",
//       image: "/assets/IG/ARVRMR/CP/Riglabs.webp", // Placeholder image path
//       link: "#", // No link provided; placeholder
//     },
//   ],
//   partnerCompanies: [
//     {
//       id: "pc-013",
//       title: "Immersive Labs",
//       image: "https://www.svgrepo.com/show/452154/unity.svg",
//       link: "https://immersivelabs.com",
//     },
//   ],
// };


// //ai
// // Updated AI Interest Group
// export const aiInterestGroupData: InterestGroupData = {
//   id: "4ac6cca9-9157-4a07-8d71-edb62b2e5c35", // Assigned from JSON for "Ai"
//   title: "AI",
//   description:
//     "Fascinated by AI and machine learning? μLearn Foundation’s AI Interest Group provides the perfect space to dive into the potential of AI, from model training to advanced applications, and connect with others passionate about AI innovations.",
//   bannerImage:
//     "https://images.unsplash.com/photo-1555255707-c07966088b6b?q=80&w=3540&auto=format&fit=crop",
//   memberCount: 25000,
//   memberSince: "January 2022",
//   isPublic: true,
//   officeHours: "Thursday 9:00 PM", // Updated from markdown
//   thinkTankMeeting: "2nd Wednesday 8:30 PM @ Google Meet", // Updated from markdown
//   interestGroupLeads: {
//     description:
//       "Interest group leads manage the activities and events within interest groups and serve as a point of contact for students interested in getting involved. Students can connect with these leads to learn about opportunities within their interests.",
//     leads: [
//       {
//         name: "Mehbin A C",
//         institution: "College of Engineering, Trivandrum",
//         linkedin: "https://www.linkedin.com/in/mehbinac/",
//         image: "/assets/IG/AI/IG Leads/MehbinAC.webp", // Placeholder image path
//       },
//       {
//         name: "Sandra Alex",
//         institution: "Government Engineering College, Kozhikode",
//         linkedin: "https://www.linkedin.com/in/sandra07alex/",
//         image: "/assets/IG/AI/IG Leads/SandraAlex.webp", // Placeholder image path
//       },
//     ],
//   },
//   prerequisites: [
//     "Python Programming Basic: Familiarity with Python syntax, data types, functions, and libraries like NumPy, Pandas.",
//     "Mathematics Basics: Understanding of linear algebra, calculus, probability, and statistics.",
//   ],
//   peopleToFollow: [
//     { name: "Andrew Ng", link: "https://www.linkedin.com/in/andrewyng/" },
//     { name: "Yann LeCun", link: "https://www.linkedin.com/in/yann-lecun" },
//     { name: "Lex Fridman", link: "https://lexfridman.com/" },
//   ],
//   blogsToFollow: [
//     { name: "Towards Data Science", link: "https://towardsdatascience.com/" },
//     { name: "The Gradient", link: "https://thegradient.pub/" }, // Updated link based on typical source
//     { name: "AI Trends", link: "https://explodingtopics.com/ai-topics" },
//   ],
//   topKeywords: [
//     "Deep Learning",
//     "Supervised Learning",
//     "Unsupervised Learning",
//     "NLP",
//     "Data Preprocessing",
//     "Neural Networks",
//     "Model Evaluation",
//     "Reinforcement Learning",
//     "Bias",
//     "Ethics in AI",
//   ],
//   tabs: {
//     about: {
//       foundationDeck:
//         "https://www.notion.so/AI-11e59e69b1bf8022ab4afa9d34e6e646?pvs=21",
//       description:
//         "The AI Interest Group connects enthusiasts and professionals eager to harness the power of artificial intelligence. From building intelligent models to exploring real-world applications, we provide resources and a community to fuel your AI journey.",
//       opportunities: [
//         {
//           title: "Machine Learning Engineer",
//           description:
//             "Develop predictive models and work with data to drive AI solutions.",
//         },
//         {
//           title: "Data Scientist",
//           description:
//             "Analyze complex data and provide insights using machine learning.",
//         },
//         {
//           title: "AI Research Scientist",
//           description:
//             "Conduct research in AI, pushing the boundaries of what AI can do.",
//         },
//         {
//           title: "AI Product Manager",
//           description:
//             "Oversee AI project development and align goals with user needs.",
//         },
//         {
//           title: "Natural Language Processing Engineer",
//           description:
//             "Work on language-based AI applications, including chatbots and translation.",
//         },
//       ],
//     },
//     forum: { placeholder: "Discuss AI topics and projects here." },
//     members: [
//       {
//         id: 27,
//         name: "Anjali Gupta",
//         muid: "anjali456",
//         profile_pic:
//           "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&q=80",
//         karma: "1300",
//         interest_groups: [
//           {
//             id: "4ac6cca9-9157-4a07-8d71-edb62b2e5c35",
//             name: "AI",
//           },
//         ],
//         organizations: [
//           {
//             id: "org-28",
//             title: "AI Academy",
//             code: "AIA01",
//             org_type: "College",
//           },
//         ],
//       },
//     ],
//     events: [
//       {
//         id: "evt-020",
//         title: "AI Summit 2025",
//         link: "https://aicommunity.com/events/summit",
//         venue: "Online via Zoom",
//         eventType: "Online",
//         date: "March 15, 2026",
//         time: "13:00 - 16:00 GMT",
//         image:
//           "https://images.unsplash.com/photo-1555255707-c07966088b6b?q=80&w=800",
//       },
//     ],
//     learningPaths: [
//       {
//         id: "lp-015",
//         title: "Artificial Intelligence Roadmap",
//         description: "Explore AI development with this comprehensive roadmap.",
//         link: "https://roadmap.sh/r/artificial-inteliigence-nkvpv",
//       },
//     ],
//     thinkTank: [
//       {
//         id: "tt-015",
//         name: "Rakesh Nair",
//         role: "AI Researcher, DeepMind",
//         image:
//           "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&q=80",
//         expertise: ["Deep Learning", "NLP"],
//       },
//     ],
//     mentors: [
//       {
//         id: "m-016",
//         name: "Amal Shehu",
//         role: "Mentor",
//         linkedin: "https://www.linkedin.com/in/amalshehu/",
//         image: "/assets/IG/AI/Mentors/AmalShehu.webp", // Placeholder image path
//         expertise: [],
//       },
//       {
//         id: "m-017",
//         name: "Niyas Mohammed",
//         role: "Mentor",
//         linkedin: "https://www.linkedin.com/in/niyasmohammed/",
//         image: "/assets/IG/AI/Mentors/NiyasMohammed.webp", // Placeholder image path
//         expertise: [],
//       },
//       {
//         id: "m-018",
//         name: "Mudit Srivastava",
//         role: "Mentor",
//         linkedin: "https://www.linkedin.com/in/muditjps/",
//         image: "/assets/IG/AI/Mentors/MuditSrivastava.webp", // Placeholder image path
//         expertise: [],
//       },
//       {
//         id: "m-019",
//         name: "Robin Tommy",
//         role: "Mentor",
//         linkedin: "https://www.linkedin.com/in/robintommy/",
//         image: "/assets/IG/AI/Mentors/RobinTommy.webp", // Placeholder image path
//         expertise: [],
//       },
//       {
//         id: "m-020",
//         name: "Anil Antony",
//         role: "Mentor",
//         linkedin: "https://www.linkedin.com/in/iamanilantony/",
//         image: "/assets/IG/AI/Mentors/AnilAntony.webp", // Placeholder image path
//         expertise: [],
//       },
//     ],
//   },
//   communityPartners: [
//     {
//       id: "cp-015",
//       title: "Pathway",
//       image: "/assets/IG/AI/CP/Pathway.webp", // Placeholder image path
//       link: "#", // No link provided; placeholder
//     },
//   ],
//   partnerCompanies: [
//     {
//       id: "pc-015",
//       title: "AIWorks",
//       image: "https://www.svgrepo.com/show/452156/tensorflow.svg",
//       link: "https://aiworks.com",
//     },
//   ],
// };