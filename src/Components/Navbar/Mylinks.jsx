const mainlink = "https://learn.mulearn.org";
export const links = [
  {
    head: -1,
    name: "About",
    submenu: true,
    sublinks: [
      {
        name: "The Team",
        submenu: true,
        sublinks: [
          {
            name: "Our Team",
            submenu: false,
            sublinks: [],
            link: "/team",
            foreign: false,
          },
        ],
      },
      {
        name: "Partners",
        submenu: true,
        sublinks: [
          {
            name: "Community Partners",
            submenu: false,
            sublinks: [],
            link: "/community-partners",
            foreign: false,
          },
          {
            name: "Company Partners",
            submenu: false,
            sublinks: [],
            link: "/company-partners",
            foreign: false,
          },
        ],
      },
      {
        name: "Leaderboard",
        submenu: true,
        sublinks: [
          {
            name: "Leaderboards",
            link: "/leaderboard",
          },
        ],
      },
      {
        name: "Media",
        submenu: true,
        sublinks: [
          {
            name: "Gallery",
            submenu: false,
            sublinks: [],
            link: "/gallery",
            foreign: false,
          },
          {
            name: "News",
            submenu: false,
            sublinks: [],
            link: "/news",
            foreign: false,
          },
        ],
      },
      {
        name: "Campus Chapters",
        submenu: true,
        sublinks: [
          {
            name: "Home Page",
            submenu: false,
            sublinks: [],
            link: "/campuschapters",
            foreign: false,
          },
          {
            name: "Campus Logo Generator",
            submenu: false,
            sublinks: [],
            link: "/campuschapters/#logo-generator",
            foreign: false,
          },
          {
            name: "Success Stories",
            submenu: false,
            sublinks: [],
            link: "/campuschapters/#success-stories",
            foreign: false,
          },
        ],
      },
    ],
  },
  {
    head: -1,
    name: "Programs",
    submenu: true,
    sublinks: [
      {
        head: 1,
        name: "Flagship",
        submenu: true,
        sublinks: [
          {
            name: "YIP 2021",
            submenu: false,
            sublinks: [],
            link: "/yip",
            foreign: false,
          },
          {
            name: "Foundation Program",
            submenu: false,
            sublinks: [],
            link: "https://foundation.mulearn.org",
            foreign: true,
          },
        ],
      },
      {
        head: 1,
        name: "Ongoing",
        submenu: true,
        sublinks: [
          {
            name: "Art of Teaching",
            submenu: false,
            sublinks: [],
            link: "/artofteaching",
            foreign: false,
          },
        ],
      },
      {
        head: 1,
        name: "Others",
        submenu: true,
        sublinks: [
          {
            name: "Wiki Syllabus",
            submenu: false,
            sublinks: [],
            link: "/wikisyllabus",
            foreign: false,
          },
          {
            name: "Hacktober Fest",
            submenu: false,
            sublinks: [],
            link: "/hacktoberfest",
            foreign: false,
          },
        ],
      },
    ],
  },
  {
    head: -1,
    name: "Events Page",
    submenu: true,
    sublinks: [
      {
        head: 2,
        name: "Global Calendar",
        submenu: true,
        sublinks: [
          {
            name: "Calendar",
            link: "/calendar",
            submenu: false,
            sublinks: [],
            foreign: false,
          },
        ],
      },
      {
        head: 2,
        name: "Announcements",
        submenu: true,
        sublinks: [
          {
            name: "Announcements",
            link: "/announcements",
            submenu: false,
            sublinks: [],
            foreign: false,
          },
        ],
      },
      {
        head: 2,
        name: "Weekly Events",
        submenu: true,
        sublinks: [
          {
            name: "Inspiration Station",
            link: "/isr",
            submenu: false,
            sublinks: [],
            foreign: false,
          },
        ],
      },
    ],
  },
  {
    head: -1,
    name: "Interest Group",
    submenu: true,
    sublinks: [
      {
        head: 3,
        name: "Interest Groups",
        submenu: true,
        sublinks: [
          {
            name: "Home Page",
            link: mainlink + "/",
            submenu: false,
            sublinks: [],
            foreign: false,
          },
          {
            name: "Web Development",
            link: mainlink + "/web",
            submenu: false,
            sublinks: [],
            foreign: false,
          },
          {
            name: "Android Development",
            link: mainlink + "/android",
            submenu: false,
            sublinks: [],
            foreign: false,
          },
          {
            name: "UI / UX",
            link: mainlink + "/uiux",
            submenu: false,
            sublinks: [],
            foreign: false,
          },
          {
            name: "Product Management",
            link: mainlink + "/pm",
            submenu: false,
            sublinks: [],
            foreign: false,
          },
          {
            name: "IoT",
            link: mainlink + "/iot",
            submenu: false,
            sublinks: [],
            foreign: false,
          },
          {
            name: "Cyber Security",
            link: mainlink + "/cybersec",
            submenu: false,
            sublinks: [],
            foreign: false,
          },
        ],
      },
      {
        head: 3,
        name: "Search",
        submenu: true,
        sublinks: [
          {
            name: "Mentor Directory",
            link: mainlink + "/mentors",
            submenu: false,
            sublinks: [],
            foreign: false,
          },
          {
            name: "Existing Circles",
            link: mainlink + "/searchcircles",
            submenu: false,
            sublinks: [],
            foreign: false,
          },
        ],
      },
      {
        head: 3,
        name: "Practice",
        submenu: true,
        sublinks: [
          {
            name: "Problem Shelf",
            link: mainlink + "/problemshelves",
            submenu: false,
            sublinks: [],
            foreign: false,
          },
          {
            name: "Challenges",
            link: mainlink + "/challenges",
            submenu: false,
            sublinks: [],
            foreign: false,
          },
          {
            name: "Courses",
            link: mainlink + "/courses",
            submenu: false,
            sublinks: [],
            foreign: false,
          },
          {
            name: "APISetu",
            link: mainlink + "/apisetu",
            submenu: false,
            sublinks: [],
            foreign: false,
          },
        ],
      },
    ],
  },
];
