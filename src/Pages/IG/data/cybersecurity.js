export const cybersecurity = {
  title: "Cybersecurity",
  introduction: {
    description:
      "Curious about protecting the digital world? The Cybersecurity Interest Group by GTech μLearn delves into securing data and networks from potential threats. This group provides essential knowledge on staying safe online, ideal for those passionate about keeping cyberspace secure.",
    downloadLink:
      "https://mulearnfoundation.notion.site/11e59e69b1bf804c8fe3fd2acbca4258?pvs=25",
    schedules: {
      officeHours: "Monday 7:30 PM @ Discord Lobby",
      thinkTankMeeting: "First Wednesday 7:00 PM @ Google Meet",
    },
  },

  communityPartners: [
    {
      name: "Beagle Security",
      image: "/assets/IG/Cyber Security/Community Partners/Beagle Security.jpg",
    },
    {
      name: "Zilicon technologies",
      image:
        "/assets/IG/Cyber Security/Community Partners/Zilicon technologies.png",
    },
  ],
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
  roadMap: [
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
  mentors: [
    {
      name: "Rejah Rehim",
      role: "CEO and Co founder, Beagle Security",
      linkedin: "https://www.linkedin.com/in/rejah",
      imageUrl: "/assets/IG/Cyber Security/Mentors/Rejah Rehim.jpg",
    },
    {
      name: "Maninder Mohan",
      role: "Cyber Security Specialist",
      linkedin: "https://www.linkedin.com/in/manindar-m",
      imageUrl: "/assets/IG/Cyber Security/Mentors/Maninder Mohan.jpg",
    },
    {
      name: "Vishnu Vijayan V S",
      role: "Chief Information Security Officer",
      linkedin: "https://www.linkedin.com/in/vishnu-vijayan-vs",
      imageUrl: "/assets/IG/Cyber Security/Mentors/Vishnu Vijayan V S.jpg",
    },
  ],
  interestGroupLeads: {
    description:
      "Cybersecurity Interest Group Leads oversee the activities and events within the cybersecurity community and act as the main point of contact for students eager to get involved. Students can reach out to these leads to explore opportunities in areas like ethical hacking, network defense, and security research, and stay informed about upcoming cybersecurity initiatives and events.",
    leads: [
      {
        name: "Dany Koshy P",
        institution: "College of Engineering Pathanapuram",
        linkedin: "https://www.linkedin.com/in/dany-koshy-p-a79328232/",
        imageUrl: "/assets/IG/Cyber Security/IG lead/Dany Koshy.jpg",
      },
      {
        name: "Aswin Krishna",
        linkedin: "https://www.linkedin.com/in/aswinkrishna07",
        institution: "Security Engineer @ KMart",
        imageUrl: "/assets/IG/Cyber Security/IG lead/Aswin Krishna.jpg",
      },
      {
        name: "Geo Mathew Joseph",
        institution: "Marian Engineering College",
        linkedin: "https://www.linkedin.com/in/geomathewjoseph",
        imageUrl: "/assets/IG/Cyber Security/IG lead/Geo Mathew.jpg",
      },
    ],
  },
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
  peopleToFollow: [
    {
      name: "Bruce Schneier",
      link: "https://www.schneier.com/",
    },
    {
      name: "Troy Hunt",
      link: "https://www.linkedin.com/in/troyhunt",
    },
    {
      name: "Brian Krebs",
      link: "https://www.linkedin.com/in/bkrebs",
    },
    {
      name: "InfoSec",
      link: "https://www.linkedin.com/company/infosec-institute/",
    },
    {
      name: "Cybersecurity Dive",
      link: "https://www.linkedin.com/showcase/cybersecuritydive/",
    },
  ],
  blogsToFollow: [
    {
      name: "Krebs on Security",
      link: "https://krebsonsecurity.com/",
    },
    {
      name: "Dark Reading",
      link: "https://www.darkreading.com/",
    },
    {
      name: "Threatpost",
      link: "https://threatpost.com/",
    },
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
};
