export const iot = {
  title: "Internet Of Things",
  introduction: {
    description:
      "Imagine a world where devices communicate seamlessly, revolutionizing industries and everyday life. The Internet of Things (IoT) bridges the physical and digital realms, enabling innovations in smart homes, healthcare, manufacturing, and more. The IoT Interest Group is your gateway to exploring this transformative technology, mastering its tools, and collaborating with like-minded innovators.",
    downloadLink:
      "https://mulearnfoundation.notion.site/11e59e69b1bf804cb2f0ddce810b0ada?pvs=25",
    schedules: {
      officeHours: "Sunday 7:30 PM @Discord Lobby",
      thinkTankMeeting: "1st Saturday 7:00 PM @Google Meet",
    },
  },

  roadMap: [
    {
      level: "Level 4",
      cards: [
        {
          title: "Understanding IOT",
          data: {
            description:
              "The Internet of Things (IoT) refers to a system of interconnected devices that communicate and share data over the internet, enabling smarter automation, real-time decision-making, and innovation across industries. These devices ranging from smart home gadgets and wearable technology to industrial sensors and environmental monitors are equipped with sensors to collect data and actuators to perform actions. IoT systems rely on connectivity through protocols like Wi-Fi, Bluetooth, or cellular networks, processing data locally via edge computing or in the cloud.",
            whatYouWillLearn: [
              "Learners will gain a comprehensive understanding of the fundamentals of IoT, including its basics, architecture, significance, key components, diverse applications, and the importance of security in IoT systems.",
            ],
            challenges: [
              {
                title: "Introduction Course",
                resources: [
                  "https://www.netacad.com/courses/introduction-iot?courseLang=en-US",
                ],
                description:
                  " IoT and Digital Transformation Task Explore the transformative potential of IoT by completing the Introduction to IoT course. This task will help you understand how IoT is driving digital transformation across various industries and expanding career opportunities in the future.",
              },
              
            ],
          },
          resources: 1,
          proofOfWork: 2,
          rating: 0,
          hasGift: true,
        },
        {
          title: "Programming for IOT",
          data: {
            description:
              "Programming in the Internet of Things (IoT) involves creating software to manage and control devices, sensors, and networks that communicate seamlessly to perform tasks and make intelligent decisions. IoT programming spans a wide range of applications, from home automation to industrial systems, healthcare, and smart cities.",
            whatYouWillLearn: [
              "Python has become a dominant language for IoT programming due to its simplicity, versatility, and extensive library ecosystem. It is particularly well-suited for prototyping, high-level applications, and interfacing with cloud platforms.",
              "C is a foundational language in IoT programming, particularly for embedded systems, due to its low-level access to hardware, efficient memory usage, and speed. It is often used to develop firmware and real-time applications for microcontrollers and other resource-constrained devices.",
            ],
            challenges: [
              {
                title: "Simulate Temperature Monitoring System",
                resources: [],
                description:
                  "In this task, create a C program that simulates a temperature monitoring system. The program should: \n1)Read temperature values (simulated input) at regular intervals. \n2)Display a warning message if the temperature crosses a specific threshold. \n3)Log all temperature readings to a file. \nRequirements: Use fscanf and fprintf for file handling",
              },
              {
                title: "Simulate Blinking LED with PWM",
                resources: [],
                description:
                  "In this task, write a C program to simulate an LED blinking using Pulse Width Modulation (PWM). The program should: \n1)Print 'LED ON' and 'LED OFF' based on the duty cycle. \n2)Allow the user to input the desired frequency and duty cycle. \n3)Use a loop to generate the PWM signal for 10 seconds. \nRequirements:Use sleep or delay functions to simulate timing. Implement input validation for frequency and duty cycle.",
              },
            ],
          },
          resources: 0,
          proofOfWork: 2,
          rating: 0,
          hasGift: true,
        },
        {
          title: "Basics of Electronics",
          data: {
            description:
              "Electronics are crucial for enabling IoT devices to function by connecting hardware with software. Core components include sensors, actuators, microcontrollers, and communication modules. Microcontrollers like ESP32 and Arduino process data, while sensors gather environmental information and actuators perform actions. Communication modules (e.g., Wi-Fi, Bluetooth) allow devices to connect and exchange data. Together, these elements form the foundation of low-power, efficient IoT systems used across industries.",
            whatYouWillLearn: [
              "Learners will develop a foundational understanding of electronics, including an introduction to actuators, microcontrollers, wireless communication, sensors, and power sources.",
            ],
            challenges: [
              {
                title: "Make a PPT on Basics of Electronics",
                resources: [],
                description:
                  "Explore the fundamentals of electronics by creating a detailed PowerPoint presentation. This task will help you understand key electronic components and their functions, which are foundational for various applications in the digital world.",
              },
            ],
          },
          resources: 0,
          proofOfWork: 1,
          rating: 0,
          hasGift: true,
        },
        {
          title: "Sensors and Actuators",
          data: {
            description:
              "In the Internet of Things (IoT), sensors and actuators play critical roles in bridging the gap between the physical and digital worlds. They enable devices to perceive and interact with their environment, making IoT systems smarter and more responsive.",
            whatYouWillLearn: [
              "Learners will acquire knowledge about the various types of sensors used in IoT systems, the different types of actuators utilized in IoT applications, and the fundamentals of wireless sensor networks that enable seamless data collection and communication.",
            ],
            challenges: [
              {
                title: "Make a PPT on Sensors and Actuators",
                resources: [],
                description:
                  "Dive into the fundamentals of sensors and actuators by creating a detailed PowerPoint presentation.This task will enhance your understanding of how these components enable interaction between the digital and physical worlds.",
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
          title: "Hardware for IOT",
          data: {
            description:
              "The Internet of Things (IoT) is an interconnected network of devices that collect, process, and exchange data. The hardware in IoT devices is essential for their functionality, encompassing microcontrollers, connectivity options, sensors, actuators, and power management. This section explores key hardware platforms for IoT, including Arduino, Raspberry Pi, other hardware options, IoT hardware design, embedded systems, and power management.",
            whatYouWillLearn: [
              "Learners will gain knowledge of IoT hardware platforms, including an introduction to Arduino, Raspberry Pi, and other essential IoT hardware systems.",
            ],
            challenges: [
              {
                title: "Basic Projects Using Arduino",
                resources: [
                  "https://www.youtube.com/watch?v=c5btoce--ZU",
                  "https://youtu.be/CvqHkXeXN3M",
                  "https://youtu.be/0Lhgd8PQmn0",
                  "https://www.youtube.com/watch?v=dJJAQxyryoQ",
                  "https://www.youtube.com/watch?v=DzNZdEH916I",
                  "https://www.youtube.com/watch?v=hNmacZoweqY",
                ],
                description:
                  "Explore the world of Arduino by completing up to 6 basic Arduino-based projects . This course will introduce you to the basics of Arduino and teach you how to build and program your own Arduino-based projects. You'll learn about the Arduino hardware, the Arduino software, and the Arduino programming language.",
              },
              {
                title: "Self Projects",
                resources: [],
                description:
                  "In this task, you will build Arduino projects and showcase your work. You can either simulate the projects using WokWi or create a physical project to demonstrate. This will enhance your understanding of Arduino and its practical applications in electronics. 1. You must design a simple security system that sounds an alarm when any motion is detected. Use Arduino, Passive Infrared (PIR) Sensor, Buzzer, and LED indicators. 2. You are required to build an automatic lighting system that turns on in the dark and off in bright conditions using Arduino, a light-dependent resistor (LDR), and an LED (or LED strip)",
              },
              {
                title: "Basic Projects Using Raspberry Pi",
                resources: [
                  "https://youtu.be/e9WXf-wRTNg",
                  "https://youtu.be/zE1J8F9U_jc?list=PLQFhP0-TLBMeUHHpPNt1UH2YA8mIua-Ag",
                ],
                description:
                  "In this task, you will complete 2 basic Raspberry Pi-based projects using a simulator like WokWi. This will help you understand the fundamentals of Raspberry Pi and its applications in electronics and IoT systems.",
              },
            ],
          },
          resources: 8,
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
          title: "Network Protocols for IOT",
          data: {
            description:
              "The Internet of Things (IoT) ecosystem relies on a wide array of network protocols to facilitate seamless communication between devices. These protocols enable data exchange, ensuring connectivity, reliability, and security. Here’s an in-depth look at the primary protocols used in IoT communication.",
            whatYouWillLearn: [
              "Learners will gain an understanding of the basics of TCP/IP, the role of Bluetooth in IoT, and key communication protocols such as MQTT, Zigbee, Z-Wave, and LoRaWAN, which enable seamless connectivity in IoT systems.",
            ],
            challenges: [
              {
                title: "Bluetooth Controlled LED",
                resources: [],
                description:
                  "Explore the world of Arduino and Bluetooth by completing a project that controls an LED using a Bluetooth module.",
              },
            ],
          },
          resources: 0,
          proofOfWork: 1,
          rating: 0,
          hasGift: true,
        },
        {
          title: "Cloud Platforms used in IOT",
          data: {
            description:
              "Cloud platforms in IoT are services that provide infrastructure, tools, and frameworks to connect IoT devices, manage their data, and enable smart decision-making. They bridge the gap between IoT hardware (sensors, actuators, and devices) and applications by offering scalable computing and storage solutions.",

            whatYouWillLearn: [
              "Learners will gain knowledge of IoT development platforms, including an introduction to Blynk and the Arduino IoT Cloud, enabling them to design, monitor, and manage IoT projects effectively.",
            ],
            challenges: [
              {
                title: "Home Automation",
                resources: [],
                description:
                  "In this challenge, you have to design a Home Automation System using an ESP32 microcontroller.",
              },
              {
                title: "Gas Leakage Warning System",
                resources: [],
                description:
                  "In this challenge, you have to design a Gas Leakage Warning System using a microcontroller.",
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

  communityPartners: [
    {
      name: "Veda IIT",
      image: "/assets/IG/IoT/Community Partners/Veda IIT.jpg",
    },
    {
      name: "Arduino",
      image: "/assets/IG/IoT/Community Partners/arduino.jpg",
    },
  ],
  prerequisites: [
    "Master the Basics: Understand sensors, actuators, microcontrollers (like Arduino and Raspberry Pi), and power systems.",
    "Learn basic circuit design and component interfacing.",
    "Programming Skills: Learn C/C++ for microcontroller programming.",
    "Explore Python for data analysis and IoT scripting.",
    "Understand IoT Protocols: Explore protocols like MQTT, HTTP, CoAP, and LoRaWAN.",
    "Familiarize yourself with cloud platforms such as AWS IoT Core and Google IoT Cloud.",
    "Build Mini Projects: Start small, for example, create a smart home temperature monitor using an ESP8266 module and a DHT11 sensor.",
    "Marketing and Presentation Skills (optional but valuable): Learn to communicate your IoT solutions effectively to diverse audiences.",
  ],
  mentors: [
    {
      name: "Nizamudeen Yooncekutty",
      role: "Software Developer @ UST",
      linkedin: "https://www.linkedin.com/in/nizamudeen-yooncekutty-406181339/",
      imageUrl: "/assets/IG/IoT/Mentors/Nizamudeen.jpg",
    },
    {
      name: "Rajeevan A B",
      role: "Embedded system Developer @ Elsys Intelligent Devices",
      linkedin: "https://www.linkedin.com/in/rajeevan-a-b-4a2196181/",
      imageUrl: "/assets/IG/IoT/Mentors/Rajeevan.jpg",
    },
  ],
  interestGroupLeads: {
    description:
      "Interest group leads manage the activities and events within interest groups and serve as a point of contact for students interested in getting involved. Students can connect with these leads to learn about opportunities within their interests",
    leads: [
      {
        name: "Vaishnav RS",
        institution: "Marian Engineering College",
        linkedin: "http://linkedin.com/in/vaishnav-rs-9079a8164/",
        imageUrl: "/assets/IG/IoT/Leads/vaishnav.jpg", // Add appropriate image URL
      },
      {
        name: "Akhilesh A S",
        institution: "Trinity College of Engineering",
        linkedin: "https://www.linkedin.com/in/akhilesh-a-s-90abbb293/",
        imageUrl: "/assets/IG/IoT/Leads/Akhilesh.jpg", // Add appropriate image URL
      },
    ],
  },
  opportunities: [
    {
      title: "IoT Developer",
      description: "Create and deploy IoT applications.",
    },
    {
      title: "Embedded Systems Engineer",
      description: "Design hardware and firmware for IoT devices.",
    },
    {
      title: "IoT Data Analyst",
      description: "Analyze data from connected devices to extract insights.",
    },
    {
      title: "IoT Architect",
      description: "Plan and design scalable IoT infrastructures.",
    },
    {
      title: "Cloud Integration Specialist",
      description: "Connect IoT devices to cloud systems.",
    },
  ],
  peopleToFollow: [
    {
      name: "Dr. Mazlan Abbas",
      link: "https://www.linkedin.com/in/mazlan?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BZANm3syKSpWPzCEkBX32bA%3D%3D",
    },
    {
      name: "Stacey Higginbotham",
      link: "https://www.linkedin.com/in/staceyhigginbotham",
    },
    {
      name: "Daniel Elizalde",
      link: "https://www.linkedin.com/in/danielelizalde?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3B%2FGvF8xq3RQqhVm9QniGKUQ%3D%3D",
    },
    {
      name: "Borja Gómez Zarceño",
      link: "https://www.linkedin.com/in/borja-g%C3%B3mez-zarce%C3%B1o-7574674b?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3Bcju9Hl%2BWSquCf2s1tahdlw%3D%3D",
    },
  ],
  blogsToFollow: [
    {
      name: "IoT for All",
      link: "https://www.iotforall.com/",
    },
    {
      name: "Hackster.io",
      link: "https://www.hackster.io/",
    },
    {
      name: "Arduino Blog",
      link: "https://blog.arduino.cc/",
    },
  ],

  topKeywords: [
    "IoT",
    "Internet of Things",
    "sensors",
    "MQTT",
    "Arduino",
    "Raspberry Pi",
    "LoRaWAN",
    "cloud computing",
    "smart devices",
    "IoT security",
    "edge computing",
    "IoT trends in 2024",
  ],
};
