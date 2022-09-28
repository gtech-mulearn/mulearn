const courses = [
  {
    id: "1",
    categrory: "artificial_intelligence",
    coursername: "Data Analyst Associate (DA-100)",
    coursedetails:
      "Data Analyst Associate pathway will help learners to get skilled on concepts like preparing data for analysis, data modelling...",
    duration: "18 Hours 41 Minutes",
    companyname: "Microsoft",
    link: "https://futureskillsprime.in/courses/data-analyst-associate-da-1",
  },
  {
    id: "2",
    categrory: "artificial_intelligence",
    coursername: "Azure AI Fundamentals (AI-900)",
    coursedetails:
      "Azure AI Fundamentals pathway will help learners to get skilled on concepts like AI on Azure, Azure Machine Learning, Natural Language...",
    duration: "9 Hours 50 Minutes",
    companyname: "Microsoft",
    link: "https://futureskillsprime.in/courses/azure-ai-fundamentals-ai-900",
  },
  {
    id: "3",
    categrory: "artificial_intelligence",
    coursername: "Machine Learning - Linear Regression",
    coursedetails:
      "One of the fastest-growing emerging technology, Linear Regression is being adopted by organizations for forecasts and future predictions.",
    duration: "23 Hours",
    companyname: "Leaps",
    link: "https://futureskillsprime.in/course/machine-learning-linear-regression",
  },
  {
    id: "4",
    categrory: "artificial_intelligence",
    coursername: "Data Science for Beginners",
    coursedetails:
      "Aligned to Competency Standards developed by SSC NASSCOM in collaboration with Industry and approved by Government of India",
    duration: "30 Hours",
    companyname: "B∞RD",
    link: "https://futureskillsprime.in/course/data-science-for-beginners",
  },
  {
    id: "5",
    categrory: "artificial_intelligence",
    coursername: "SQL Fundamentals",
    coursedetails:
      "This course oers you informative web links, hands-on exercises, and quizzes to work with the MySQL database.",
    duration: "8 Hours",
    companyname: "Accenture",
    link: "Introduction to SQL Fundamentals | FutureSkills Prime",
  },
  {
    id: "6",
    categrory: "big_data_analytics",
    coursername: "Fundamentals of Data Analytics",
    coursedetails:
      "This course focusses on the building blocks of analytics and statistics to understand the foundations of Data Analytics.",
    duration: "61 Hours",
    companyname: "Leaps",
    link: "https://futureskillsprime.in/course/fundamentals-of-data-analytics",
  },
  {
    id: "7",
    categrory: "blockchain",
    coursername: "Programming Basics for Blockchain Engineers",
    coursedetails:
      "Blockchain Programming simplified to learn and practice coding in 5 dierent programming languages with atmost ease!",
    duration: "10 hours",
    companyname: "terv",
    link: "https://futureskillsprime.in/course/programming-basics-for-blockchain-engineers",
  },
 
  {
    id: "8",
    categrory: "cloud_computing",
    coursername: "Azure Administrator Associate (AZ-204)",
    coursedetails:
      "Azure Developer Associate pathway helps learners to get skilled on concepts like server-side logic, server-less architecture...",
    duration: "32 Hours 54 Minutes",
    companyname: "Microsoft",
    link: "https://futureskillsprime.in/courses/azure-developer-associate-az-204",
  },
  {
    id: "9",
    categrory: "cloud_computing",
    coursername: "Azure Administrator Associate (AZ-104)",
    coursedetails:
      "Azure Administrator Associate helps learners to understand practical and conceptual concepts like Azure Storage, Active Directory, Virtual...",
    duration: "49 Hours 36 Minutes",
    companyname: "Microsoft",
    link: "https://futureskillsprime.in/courses/azure-administrator-associate-az-104",
  },
  {
    id: "10",
    categrory: "cloud_computing",
    coursername: "Salesforce Developer Catalyst",
    coursedetails:
      "Describe key features of Salesforce technology using dierent programming languages.",
    duration: "53 Hours 53 Minutes",
    companyname: "salesforce",
    link: "Salesforce Developer: Certified programming course (futureskillsprime.in)",
  },
  {
    id: "11",
    categrory: "cloud_computing",
    coursername:
      "AWS Cloud Masterclass - Cloud Practitioner Essentials (Self-Paced)",
    coursedetails: "Develop a fundamental understanding of AWS Cloud.",
    duration: "8 hours",
    companyname: "ethnus, AWS training partner",
    link: "https://futureskillsprime.in/course/aws-cloud-masterclass-cloud-practitioner-essentials-self-paced",
  },
  {
    id: "12",
    categrory: "cloud_computing",
    coursername: "AWS Cloud Masterclass",
    coursedetails:
      "This course provides an overall understanding of the AWS Cloud, designed for anyone who wants to learn about basic cloud concepts...",
    duration: "3 Hours",
    companyname: "ethnus, AWS training partner",
    link: "https://futureskillsprime.in/courses/aws-cloud-masterclass",
  },
 
  {
    id: "13",
    categrory: "cybersecurity",
    coursername: "Security Administrator Associate (MS-500)",
    coursedetails:
      "Security Administrator Associate helps learners to get skilled on concepts like Identity and Access with Azure Directory, Threat Protection...",
    duration: "11 Hours 51 Minutes",
    companyname: "Microsoft",
    link: "https://futureskillsprime.in/courses/security-administrator-associate-ms-500",
  },
  {
    id: "14",
    categrory: "cybersecurity",
    coursername: "Programming Basics for Cyber Security Engineers",
    coursedetails:
      "Learn & Code programming basics for Cyber Security domain that aids the learner become a Cyber Security Engineer by practicing coding on...",
    duration: "10 Hours",
    companyname: "terv",
    link: "Learn key coding essentials in our cyber security course (futureskillsprime.in)",
  },
  {
    id: "15",
    categrory: "cybersecurity",
    coursername: "Cisco NetAcad – Introduction to Cybersecurity",
    coursedetails:
      "The Course explores the broader topics of Cybersecurity, helping the learner understand trends, threats.",
    duration: "15 Hours",
    companyname: "CISCO Networking Acadamey",
    link: "https://futureskillsprime.in/course/cisco-netacad%E2%80%93introduction-to-cyber-security",
  },
  {
    id: "16",
    categrory: "cybersecurity",
    coursername: "Cybersecurity Essentials",
    coursedetails: "Learn the basics to fight Cybercrime.",
    duration: "30 Hours",
    companyname: "",
    link: "",
  },
  {
    id: "17",
    categrory: "internet_of_things",
    coursername: "Introduction to IoT",
    coursedetails:
      "IoT is a technology area that is rapidly expanding with new companies, products and opportunities, springing up all over the world to take advantage of it.  Through this Introduction to IoT course by CISCO, learners will be able to understand and learn the workings of IoT, how IoT is transforming businesses and implementing secure IoT solutions.",
    duration: "40 hours",
    companyname: "CISCO Networking Academy",
    link: "https://futureskillsprime.in/course/introduction-to-iot",
  },
  {
    id: "18",
    categrory: "robotic_process_automation",
    coursername: "Programming Basics for Automation Engineers",
    coursedetails:
      "Crack the myth of difficultly in Automation programming through this practice package and take your first step in the journey of Automation...",
    duration: "10 Hours",
    companyname: "TERV",
    link: "https://futureskillsprime.in/course/programming-basics-for-automation-engineers",
  },
  {
    id: "19",
    categrory: "robotic_process_automation",
    coursername: "TruBot Designer",
    coursedetails:
      "TruBot Designer course will help you in designing RPA processes from scratch in TruBot RPA and automate different types of processes. It includes testing, debugging, and publishing of the bots.",
    duration: "4 Hours 30 Minutes",
    companyname: "DATAMATICS",
    link: "https://futureskillsprime.in/course/trubot-designer",
  },
  {
    id: "20",
    categrory: "robotic_process_automation",
    coursername: "TruBot Cockpit",
    coursedetails:
      "TruBot Cockpit is a web-based application that enables you to create, manage, deploy, and monitor bots",
    duration: "2 Hours 20 Minutes",
    companyname: "DATAMATICS",
    link: "https://futureskillsprime.in/course/trubot-cockpit",
  },
  {
    id: "21",
    categrory: "web_mobile_development_and_marketing",
    coursername: "Developer Associate (MS-600)",
    coursedetails:
      "Developer Associate pathway will help learners to get skilled on concepts like customizing Office applications & SharePoint...",
    duration: "25 Hours 49 Minutes",
    companyname: "Microsoft",
    link: "https://futureskillsprime.in/courses/developer-associate-ms-600",
  },
  {
    id: "22",
    categrory: "web_mobile_development_and_marketing",
    coursername: "Adobe UX Foundation Learning Journey",
    coursedetails:
      "This free of cost UX Foundation Learning Journey is created by experts from Adobe and aligns 100% to the curriculum approved. Course by Self Paced 43 Hours 3",
    duration: "43 Hours 35 Minutes",
    companyname: "Adobe",
    link: "https://futureskillsprime.in/course/adobe-ux-foundation-learning-journey",
  },
  {
    id: "23",
    categrory: "continuous_leaning",
    coursername: "Embracing Change",
    coursedetails:
      "Develop a growth mindset and deal with setbacks positively.",
    duration: "4.05 Hours",
    companyname: "KARAPPA",
    link: "https://futureskillsprime.in/course/embracing-change",
  },
  {
    id: "24",
    categrory: "continuous_leaning",
    coursername: "Brisk Business Administrator – Basic Skills",
    coursedetails:
      "Business Administrator Skills are very important while you start a venture. Get trained by taking up our basic business development skills courses",
    duration: "1 Hour",
    companyname: "TALENTPEPZ",
    link: "https://futureskillsprime.in/course/brisk-business-administrator-basic-skills",
  },
  {
    id: "25",
    categrory: "continuous_leaning",
    coursername: "Quantitative Aptitude - An Introduction",
    coursedetails:
      "This program provides you the core concepts of number systems applied to solve real world problems. Master the co",
    duration: "3.1 Hours",
    companyname: "TALENTPEPZ",
    link: "https://futureskillsprime.in/course/an-introduction",
  },
  {
    id: "26",
    categrory: "effective_communication",
    coursername: "Be a Master Communicator",
    coursedetails:
      "An immersive, game-based learning adventure on mastering workplace communication. Learn about the core values of communication...",
    duration: "1 Hours",
    companyname: "FLOGAMES",
    link: "https://futureskillsprime.in/courses/be-a-master-communicator",
  },
  {
    id: "27",
    categrory: "Product Management",
    coursername: "Project Management Basics",
    coursedetails:
      "A foundation course that helps develop a well-versed understanding of elements that make up the product management discipline.",
    duration: "6 Hours",
    companyname: "Institute of PRODUCT LEADERSHIP",
    link: "https://futureskillsprime.in/course/project-management-basics",
  },
];

export default courses;
