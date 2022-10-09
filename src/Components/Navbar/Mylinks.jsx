export const links = [
  {
    name: "About",
    submenu: true,
    sublinks: [
      {
        Head: "The Team",
        sublink: [
          { name: "Our Team", link: "/team" },
          { name: "Executive Committe", link: "/team/execom" },
          { name: "YIP Team", link: "/team/yip" },
          { name: "Community Team", link: "/team/community" },
        ],
      },
      {
        Head: "Partners",
        sublink: [
          { name: "Community Partners", link: "/community-partners" },
          { name: "Company Partners", link: "/company-partners" },
        ],
      },
    ],
  },
  {
    name: "Programs",
    submenu: true,
    sublinks: [
      {
        Head: "Past Program",
        sublink: [
          { name: "YIP 2021", link: "https://yip.mulearn.org" },
          {
            name: "Foundation Program",
            link: "https://foundation.mulearn.org",
          },
        ],
      },
      {
        Head: "Ongoing Program",
        sublink: [{ name: "Art of Teaching", link: "/artofteaching" }],
      },
      {
        Head: "Others",
        sublink: [{ name: "Wiki Syllabus", link: "/wikisyllabus" }],
      },
    ],
  },
  {
    name: "Events Page",
    submenu: true,
    sublinks: [
      {
        Head: "Global Calendar",
        sublink: [{ name: "Calendar", link: "/calendar" }],
      },
      {
        Head: "Announcements",
        sublink: [{ name: "Mu-Announcements", link: "/announcements" }],
      },
      {
        Head: "Weekly Events",
        sublink: [{ name: "Inspiration Station", link: "/isr" }],
      },
    ],
  },
];
