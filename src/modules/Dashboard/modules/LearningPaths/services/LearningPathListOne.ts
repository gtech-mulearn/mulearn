// eslint-disable-next-line import/no-anonymous-default-export
export default [
  // SOFTWARE ROADMAPS (10)
  {
    id: "1",
    title: "Java Developer Roadmap",
    desc: "A complete guide covering Java from basics to advanced concepts like OOP, DSA, Spring Boot, Microservices, and Deployment.",
    overview: "This roadmap covers Java from scratch, starting with the basics and gradually moving to advanced topics like OOP, DSA, Spring Boot, Microservices, and Deployment.",
    learnings: [
      "Build a strong foundation in Java fundamentals, data structures, and algorithms.",
      "Master Spring Boot, Hibernate, and JSP/Servlets for modern web development.",
      "Work on real-world projects like a quiz app and a weather app to apply learned concepts.",
      "Prepare for job interviews with hands-on coding challenges and practice questions."
    ],
    level: 5,
    skills: ["Java", "Spring", "OOP", "Microservices", "Data Structures"],
    projects: ["Quiz Application", "Weather Application", "E-commerce API", "Blog Management System"],
    mainTopics: [
      "Basics",
      "OOP in Java",
      "DSA",
      "Advanced Java",
      "Spring Boot & Microservices",
      "Testing & Debug",
      "Performance",
      "System Design",
      "Interview"
    ],
    ig: "Software",
    learners: 251,
    mentors: 12,
    topics: [
      {
        "code": "Basics",
        "id": 11,
        "title": "Basics of Java",
        "content": [
          {
            "id": 111,
            "title": "Introduction to Java",
            "proofOfWork": "Write a brief essay on the history and evolution of Java to demonstrate your understanding.",
            "karmaPoint": 100,
            "content": [
              {
                "id": 1111,
                "title": "What is Java? Overview & History",
                "url": "https://www.geeksforgeeks.org/introduction-to-java/"
              },
              {
                "id": 1112,
                "title": "Installing Java & Setting Up Environment",
                "url": "https://www.javatpoint.com/how-to-set-path-in-java"
              },
              {
                "id": 1113,
                "title": "Your First Java Program",
                "url": "https://www.programiz.com/java-programming/hello-world"
              }
            ]
          },
          {
            "id": 112,
            "title": "Java Syntax & Basic Constructs",
            "proofOfWork": "Develop a mini calculator app using Java syntax and control flow statements to prove your grasp on the basics.",
            "karmaPoint": 200,
            "content": [
              {
                "id": 1121,
                "title": "Variables and Data Types",
                "url": "https://www.w3schools.com/java/java_variables.asp"
              },
              {
                "id": 1122,
                "title": "Operators in Java",
                "url": "https://www.javatpoint.com/operators-in-java"
              },
              {
                "id": 1123,
                "title": "Control Flow Statements (if-else, loops)",
                "url": "https://www.geeksforgeeks.org/loops-in-java/"
              }
            ]
          },
          {
            "id": 113,
            "title": "Methods and Functions in Java",
            "proofOfWork": "Implement a program that demonstrates method overloading and proper function calls in Java.",
            "karmaPoint": 100,
            "content": [
              {
                "id": 1131,
                "title": "Defining & Calling Methods",
                "url": "https://www.programiz.com/java-programming/methods"
              },
              {
                "id": 1132,
                "title": "Method Overloading",
                "url": "https://www.javatpoint.com/method-overloading-in-java"
              },
              {
                "id": 1133,
                "title": "Pass by Value vs Pass by Reference",
                "url": "https://www.baeldung.com/java-pass-by-value-or-reference"
              }
            ]
          }
        ]
      },
      {
        "code": "OOP in Java",
        "id": 12,
        "title": "Object-Oriented Programming (OOP) in Java",
        "content": [
          {
            "id": 121,
            "title": "Introduction to OOP",
            "proofOfWork": "Design a simple Java program that demonstrates the four pillars of OOP by modeling a real-world scenario (e.g., a library system).",
            "karmaPoint": 50,
            "content": [
              {
                "id": 1211,
                "title": "What is Object-Oriented Programming?",
                "url": "https://www.geeksforgeeks.org/object-oriented-programming-oops-concept-in-java/"
              },
              {
                "id": 1212,
                "title": "Classes and Objects in Java",
                "url": "https://www.w3schools.com/java/java_classes.asp"
              }
            ]
          },
          {
            "id": 122,
            "title": "Encapsulation",
            "proofOfWork": "Create a Java class that uses private fields and public getters/setters to demonstrate proper encapsulation.",
            "karmaPoint": 100,
            "content": [
              {
                "id": 1221,
                "title": "What is Encapsulation?",
                "url": "https://www.javatpoint.com/encapsulation"
              },
              {
                "id": 1222,
                "title": "Getters and Setters in Java",
                "url": "https://www.geeksforgeeks.org/getter-and-setter-in-java/"
              }
            ]
          },
          {
            "id": 123,
            "title": "Inheritance",
            "proofOfWork": "Implement a class hierarchy in Java that demonstrates inheritance and method overriding with a practical example (e.g., animal classes).",
            "karmaPoint": 50,
            "content": [
              {
                "id": 1231,
                "title": "Understanding Inheritance in Java",
                "url": "https://www.programiz.com/java-programming/inheritance"
              },
              {
                "id": 1231,
                "title": "Method Overriding",
                "url": "https://www.javatpoint.com/method-overriding-in-java"
              }
            ]
          },
          {
            "id": 124,
            "title": "Polymorphism",
            "proofOfWork": "Develop a Java program that uses both method overloading and overriding to showcase polymorphism in action.",
            "karmaPoint": 100,
            "content": [
              {
                "id": 1241,
                "title": "Method Overloading vs Overriding",
                "url": "https://www.geeksforgeeks.org/difference-between-method-overloading-and-method-overriding-in-java/"
              },
              {
                "id": 1242,
                "title": "Runtime vs Compile-time Polymorphism",
                "url": "https://www.scaler.com/topics/polymorphism-in-java/"
              }
            ]
          },
          {
            "id": 125,
            "title": "Abstraction",
            "proofOfWork": "Design an abstract class or interface in Java and implement it in a subclass to illustrate the use of abstraction.",
            "karmaPoint": 50,
            "content": [
              {
                "id": 1251,
                "title": "Abstract Classes and Interfaces",
                "url": "https://www.w3schools.com/java/java_abstract.asp"
              },
              {
                "id": 1252,
                "title": "Difference Between Abstract Class and Interface",
                "url": "https://www.javatpoint.com/difference-between-abstract-class-and-interface"
              }
            ]
          }
        ]
      },
      {
        "code": "DSA",
        "id": 13,
        "title": "Data Structures & Algorithms in Java",
        "content": [
          {
            "id": 131,
            "title": "Introduction to DSA",
            "proofOfWork": "Build a simple algorithm that uses recursion and analyze its time complexity with Big O notation.",
            "karmaPoint": 50,
            "content": [
              {
                "id": 1311,
                "title": "Why Learn Data Structures & Algorithms?",
                "url": "https://www.geeksforgeeks.org/why-data-structures-and-algorithms-are-important-to-learn/"
              },
              {
                "id": 1312,
                "title": "Big O Notation & Time Complexity",
                "url": "https://www.programiz.com/dsa/big-o-notation"
              },
              {
                "id": 1314,
                "title": "Understanding Recursion",
                "url": "https://www.geeksforgeeks.org/recursion/"
              }
            ]
          },
          {
            "id": 132,
            "title": "Arrays",
            "proofOfWork": "Implement basic array operations (insertion, deletion, search) in Java and discuss their time complexities.",
            "karmaPoint": 100,
            "content": [
              {
                "id": 1321,
                "title": "Introduction to Arrays in Java",
                "url": "https://www.w3schools.com/java/java_arrays.asp"
              },
              {
                "id": 1322,
                "title": "Operations on Arrays (Insert, Delete, Search)",
                "url": "https://www.geeksforgeeks.org/array-data-structure/"
              },
              {
                "id": 1323,
                "title": "Two Dimensional Arrays",
                "url": "https://www.programiz.com/java-programming/multidimensional-array"
              }
            ]
          },
          {
            "id": 133,
            "title": "Linked Lists",
            "proofOfWork": "Develop Java implementations for singly, doubly, and circular linked lists, showcasing basic operations on each.",
            "karmaPoint": 50,
            "content": [
              {
                "id": 1331,
                "title": "Singly Linked List",
                "url": "https://www.javatpoint.com/singly-linked-list"
              },
              {
                "id": 1332,
                "title": "Doubly Linked List",
                "url": "https://www.geeksforgeeks.org/doubly-linked-list/"
              },
              {
                "id": 1333,
                "title": "Circular Linked List",
                "url": "https://www.programiz.com/dsa/circular-linked-list"
              }
            ]
          },
          {
            "id": 134,
            "title": "Stacks & Queues",
            "proofOfWork": "Create a Java application that uses both stacks and queues to solve a practical problem like undo/redo functionality.",
            "karmaPoint": 100,
            "content": [
              {
                "id": 1341,
                "title": "Stack in Java",
                "url": "https://www.javatpoint.com/stack-in-java"
              },
              {
                "id": 1342,
                "title": "Queue in Java",
                "url": "https://www.geeksforgeeks.org/queue-data-structure/"
              },
              {
                "id": 1343,
                "title": "Deque (Double-Ended Queue)",
                "url": "https://www.programiz.com/java-programming/deque"
              }
            ]
          },
          {
            "id": 135,
            "title": "Trees",
            "proofOfWork": "Construct a binary tree in Java and implement in-order, pre-order, and post-order traversals, explaining their use-cases.",
            "karmaPoint": 50,
            "content": [
              {
                "id": 1351,
                "title": "Binary Trees & Traversals",
                "url": "https://www.geeksforgeeks.org/binary-tree-data-structure/"
              },
              {
                "id": 1352,
                "title": "Binary Search Tree (BST)",
                "url": "https://www.javatpoint.com/binary-search-tree"
              },
              {
                "id": 1353,
                "title": "AVL Trees (Self-Balancing Trees)",
                "url": "https://www.geeksforgeeks.org/avl-tree-set-1-insertion/"
              }
            ]
          },
          {
            "id": 136,
            "title": "Graphs",
            "proofOfWork": "Implement graph traversal algorithms like BFS and DFS in Java and explain how Dijkstra’s algorithm finds the shortest path.",
            "karmaPoint": 100,
            "content": [
              {
                "id": 1361,
                "title": "Graph Representation (Adjacency Matrix & List)",
                "url": "https://www.programiz.com/dsa/graph-representation"
              },
              {
                "id": 1362,
                "title": "Graph Traversal Algorithms (BFS & DFS)",
                "url": "https://www.geeksforgeeks.org/breadth-first-search-or-bfs-for-a-graph/"
              },
              {
                "id": 1363,
                "title": "Dijkstra’s Shortest Path Algorithm",
                "url": "https://www.programiz.com/dsa/dijkstra-algorithm"
              }
            ]
          },
          {
            "id": 137,
            "title": "Sorting Algorithms",
            "proofOfWork": "Write Java implementations for bubble sort, quick sort, and merge sort, and compare their performance.",
            "karmaPoint": 50,
            "content": [
              {
                "id": 1371,
                "title": "Bubble Sort",
                "url": "https://www.javatpoint.com/bubble-sort-in-java"
              },
              {
                "id": 1372,
                "title": "Quick Sort",
                "url": "https://www.programiz.com/dsa/quick-sort"
              },
              {
                "id": 1373,
                "title": "Merge Sort",
                "url": "https://www.geeksforgeeks.org/merge-sort/"
              }
            ]
          },
          {
            "id": 138,
            "title": "Searching Algorithms",
            "proofOfWork": "Implement both linear and binary search in Java, and discuss their advantages in different scenarios.",
            "karmaPoint": 100,
            "content": [
              {
                "id": 1381,
                "title": "Linear Search",
                "url": "https://www.programiz.com/dsa/linear-search"
              },
              {
                "id": 1382,
                "title": "Binary Search",
                "url": "https://www.javatpoint.com/binary-search-in-java"
              }
            ]
          },
          {
            "id": 139,
            "title": "Dynamic Programming",
            "proofOfWork": "Solve a classic dynamic programming problem (e.g., Fibonacci sequence) in Java using both top-down and bottom-up approaches.",
            "karmaPoint": 50,
            "content": [
              {
                "id": 1391,
                "title": "Introduction to Dynamic Programming",
                "url": "https://www.geeksforgeeks.org/dynamic-programming/"
              },
              {
                "id": 1392,
                "title": "Top-Down vs Bottom-Up Approach",
                "url": "https://www.programiz.com/dsa/dynamic-programming"
              },
              {
                "id": 1393,
                "title": "Fibonacci Sequence using DP",
                "url": "https://www.geeksforgeeks.org/program-for-nth-fibonacci-number/"
              }
            ]
          }
        ]

      },
      {
        "code": "Advanced Java",
        "id": 14,
        "title": "Advanced Java Concepts",
        "content": [
          {
            "id": 141,
            "title": "Exception Handling in Java",
            "proofOfWork": "Create a Java application that demonstrates robust exception handling by implementing custom exceptions along with proper try-catch-finally blocks.",
            "karmaPoint": 50,
            "content": [
              {
                "id": 1411,
                "title": "Introduction to Exceptions",
                "url": "https://www.geeksforgeeks.org/exceptions-in-java/"
              },
              {
                "id": 1412,
                "title": "Try, Catch, Finally Blocks",
                "url": "https://www.javatpoint.com/try-catch-block"
              },
              {
                "id": 1413,
                "title": "Checked vs Unchecked Exceptions",
                "url": "https://www.geeksforgeeks.org/checked-vs-unchecked-exceptions-in-java/"
              },
              {
                "id": 1414,
                "title": "Throw and Throws Keyword",
                "url": "https://www.programiz.com/java-programming/throw-throws"
              },
              {
                "id": 1415,
                "title": "Custom Exceptions in Java",
                "url": "https://www.javatpoint.com/custom-exception"
              }
            ]
          },
          {
            "id": 142,
            "title": "Multithreading & Concurrency",
            "proofOfWork": "Develop a multi-threaded Java program that uses threads, synchronization, and thread pools to solve a concurrency problem.",
            "karmaPoint": 100,
            "content": [
              {
                "id": 1421,
                "title": "Introduction to Threads",
                "url": "https://www.javatpoint.com/multithreading-in-java"
              },
              {
                "id": 1422,
                "title": "Creating Threads in Java",
                "url": "https://www.geeksforgeeks.org/multithreading-in-java/"
              },
              {
                "id": 1423,
                "title": "Thread Lifecycle",
                "url": "https://www.programiz.com/java-programming/thread"
              },
              {
                "id": 1424,
                "title": "Synchronization and Locks",
                "url": "https://www.baeldung.com/java-thread-synchronization"
              },
              {
                "id": 1425,
                "title": "Thread Pools and Executor Framework",
                "url": "https://www.geeksforgeeks.org/java-util-concurrent-executor-framework/"
              }
            ]
          },
          {
            "id": 143,
            "title": "Java Memory Management & JVM Internals",
            "proofOfWork": "Analyze a Java application's memory usage by explaining heap vs stack memory and demonstrate garbage collection with a sample program.",
            "karmaPoint": 50,
            "content": [
              {
                "id": 1431,
                "title": "JVM Architecture",
                "url": "https://www.geeksforgeeks.org/jvm-architecture-explained/"
              },
              {
                "id": 1432,
                "title": "Heap and Stack Memory",
                "url": "https://www.javatpoint.com/java-heap-memory-vs-stack-memory"
              },
              {
                "id": 1433,
                "title": "Garbage Collection in Java",
                "url": "https://www.baeldung.com/java-garbage-collection"
              },
              {
                "id": 1434,
                "title": "JIT (Just-In-Time) Compiler",
                "url": "https://www.geeksforgeeks.org/just-in-time-jit-compiler/"
              },
              {
                "id": 1435,
                "title": "Java Class Loading Mechanism",
                "url": "https://www.javatpoint.com/classloader-in-java"
              }
            ]
          },
          {
            "id": 144,
            "title": "Java I/O (Input/Output) & Serialization",
            "proofOfWork": "Implement a file-processing application in Java that reads/writes data using I/O streams and performs object serialization/deserialization.",
            "karmaPoint": 100,
            "content": [
              {
                "id": 1441,
                "title": "Java File Handling (File, Reader, Writer)",
                "url": "https://www.javatpoint.com/file-handling-in-java"
              },
              {
                "id": 1442,
                "title": "BufferedReader & Scanner",
                "url": "https://www.geeksforgeeks.org/bufferedreader-in-java/"
              },
              {
                "id": 1443,
                "title": "Serialization and Deserialization",
                "url": "https://www.baeldung.com/java-serialization"
              }
            ]
          },
          {
            "id": 145,
            "title": "Java Reflection API",
            "proofOfWork": "Write a Java program that uses the Reflection API to inspect classes and dynamically access or modify private members.",
            "karmaPoint": 50,
            "content": [
              {
                "id": 1451,
                "title": "Introduction to Reflection in Java",
                "url": "https://www.geeksforgeeks.org/reflection-in-java/"
              },
              {
                "id": 1452,
                "title": "Accessing Private Members using Reflection",
                "url": "https://www.baeldung.com/java-access-private-fields-methods"
              }
            ]
          },
          {
            "id": 146,
            "title": "Annotations in Java",
            "proofOfWork": "Create custom annotations and write a processor to handle them at runtime, demonstrating their impact on your Java application.",
            "karmaPoint": 100,
            "content": [
              {
                "id": 1461,
                "title": "Introduction to Java Annotations",
                "url": "https://www.javatpoint.com/java-annotations"
              },
              {
                "id": 1462,
                "title": "Built-in Java Annotations",
                "url": "https://www.geeksforgeeks.org/annotations-in-java/"
              },
              {
                "id": 1463,
                "title": "Creating Custom Annotations",
                "url": "https://www.baeldung.com/java-custom-annotation"
              }
            ]
          },
          {
            "id": 147,
            "title": "Lambda Expressions & Functional Interfaces",
            "proofOfWork": "Develop a Java application that leverages lambda expressions and functional interfaces to process a data collection functionally.",
            "karmaPoint": 50,
            "content": [
              {
                "id": 1471,
                "title": "Introduction to Lambda Expressions",
                "url": "https://www.geeksforgeeks.org/lambda-expressions-java-8/"
              },
              {
                "id": 1472,
                "title": "Functional Interfaces in Java",
                "url": "https://www.javatpoint.com/functional-interfaces-in-java"
              },
              {
                "id": 1473,
                "title": "Stream API in Java",
                "url": "https://www.baeldung.com/java-8-streams"
              }
            ]
          }
        ]

      },
      {
        "code": "Spring Boot & Microservices",
        "id": 15,
        "title": "Java Spring Boot & Microservices",
        "content": [
          {
            "id": 151,
            "title": "Introduction to Spring Boot",
            "proofOfWork": "Build a simple Spring Boot application that displays a welcome message and demonstrates dependency injection using core annotations.",
            "karmaPoint": 50,
            "content": [
              {
                "id": 1511,
                "title": "What is Spring Boot?",
                "url": "https://spring.io/projects/spring-boot"
              },
              {
                "id": 1512,
                "title": "Setting up a Spring Boot Project",
                "url": "https://www.javatpoint.com/spring-boot-tutorial"
              },
              {
                "id": 1513,
                "title": "Spring Boot Annotations",
                "url": "https://www.baeldung.com/spring-boot-annotations"
              },
              {
                "id": 1514,
                "title": "Dependency Injection in Spring",
                "url": "https://www.journaldev.com/2394/spring-dependency-injection"
              }
            ]
          },
          {
            "id": 152,
            "title": "Spring Boot REST API Development",
            "proofOfWork": "Create a RESTful API using Spring Boot that performs CRUD operations, incorporates exception handling, and logs request data.",
            "karmaPoint": 100,
            "content": [
              {
                "id": 1521,
                "title": "Building REST APIs with Spring Boot",
                "url": "https://www.baeldung.com/building-a-restful-web-service-with-spring-and-java"
              },
              {
                "id": 1522,
                "title": "Spring Boot @RestController",
                "url": "https://www.journaldev.com/21485/spring-restcontroller"
              },
              {
                "id": 1523,
                "title": "Handling HTTP Requests in Spring Boot",
                "url": "https://www.javatpoint.com/spring-rest-requestmapping"
              },
              {
                "id": 1524,
                "title": "Spring Boot Exception Handling",
                "url": "https://www.baeldung.com/exception-handling-for-rest-with-spring"
              },
              {
                "id": 1525,
                "title": "Spring Boot Logging with SLF4J and Logback",
                "url": "https://www.baeldung.com/spring-boot-logging"
              }
            ]
          },
          {
            "id": 153,
            "title": "Spring Boot Security & Authentication",
            "proofOfWork": "Implement a secure REST API using Spring Security with JWT and OAuth2 to manage authentication and role-based access.",
            "karmaPoint": 50,
            "content": [
              {
                "id": 1531,
                "title": "Spring Security Overview",
                "url": "https://www.baeldung.com/spring-security-login"
              },
              {
                "id": 1532,
                "title": "JWT Authentication with Spring Boot",
                "url": "https://www.javainuse.com/spring/boot-jwt"
              },
              {
                "id": 1533,
                "title": "OAuth2 Authentication in Spring Boot",
                "url": "https://www.baeldung.com/spring-security-oauth"
              },
              {
                "id": 1534,
                "title": "Role-based Access Control",
                "url": "https://www.toptal.com/java/spring-security-tutorial"
              }
            ]
          },
          {
            "id": 154,
            "title": "Spring Boot Database Integration",
            "proofOfWork": "Develop a Spring Boot application integrated with a SQL database using Spring Data JPA, implementing complete CRUD operations and migrations.",
            "karmaPoint": 100,
            "content": [
              {
                "id": 1541,
                "title": "Spring Boot with MySQL/PostgreSQL",
                "url": "https://www.baeldung.com/spring-boot-jpa-sql"
              },
              {
                "id": 1542,
                "title": "Spring Data JPA and Hibernate",
                "url": "https://www.journaldev.com/16118/spring-boot-jpa-hibernate-mysql"
              },
              {
                "id": 1543,
                "title": "CRUD Operations with Spring Boot",
                "url": "https://www.geeksforgeeks.org/spring-boot-crud-operations/"
              },
              {
                "id": 1544,
                "title": "Using Liquibase for Database Migrations",
                "url": "https://www.baeldung.com/liquibase-refactor-schema-of-java-app"
              }
            ]
          },
          {
            "id": 155,
            "title": "Microservices Architecture",
            "proofOfWork": "Design and implement a microservices-based application using Spring Boot with Eureka for service discovery and an API Gateway for routing.",
            "karmaPoint": 50,
            "content": [
              {
                "id": 1551,
                "title": "Introduction to Microservices",
                "url": "https://martinfowler.com/articles/microservices.html"
              },
              {
                "id": 1552,
                "title": "Building Microservices with Spring Boot",
                "url": "https://www.baeldung.com/spring-boot-microservices"
              },
              {
                "id": 1553,
                "title": "Service Discovery with Eureka",
                "url": "https://www.javatpoint.com/spring-cloud-eureka"
              },
              {
                "id": 1554,
                "title": "API Gateway with Spring Cloud Gateway",
                "url": "https://www.baeldung.com/spring-cloud-api-gateway"
              },
              {
                "id": 1555,
                "title": "Circuit Breaker with Resilience4j",
                "url": "https://resilience4j.readme.io/docs"
              },
              {
                "id": 1556,
                "title": "Centralized Configuration with Spring Cloud Config",
                "url": "https://spring.io/projects/spring-cloud-config"
              }
            ]
          },
          {
            "id": 156,
            "title": "Containerization & Deployment",
            "proofOfWork": "Containerize a Spring Boot application using Docker and set up a CI/CD pipeline with Jenkins or GitHub Actions for automated deployment.",
            "karmaPoint": 100,
            "content": [
              {
                "id": 1561,
                "title": "Docker for Java Developers",
                "url": "https://www.baeldung.com/dockerizing-spring-boot-application"
              },
              {
                "id": 1562,
                "title": "Docker Compose for Microservices",
                "url": "https://www.javatpoint.com/docker-compose"
              },
              {
                "id": 1563,
                "title": "Kubernetes Deployment for Spring Boot",
                "url": "https://kubernetes.io/docs/tutorials/stateless-application/spring-boot/"
              },
              {
                "id": 1564,
                "title": "CI/CD with Jenkins & GitHub Actions",
                "url": "https://www.baeldung.com/jenkins-docker"
              }
            ]
          }
        ]

      },
      {
        "code": "Testing & Debug",
        "id": 16,
        "title": "Testing & Debugging",
        "content": [
          {
            "id": 161,
            "title": "Unit Testing with JUnit & Mockito",
            "proofOfWork": "Write comprehensive unit tests for a Java application using JUnit and Mockito to mock dependencies and ensure code reliability.",
            "karmaPoint": 50,
            "content": [
              {
                "id": 1611,
                "title": "Introduction to JUnit",
                "url": "https://www.baeldung.com/junit-5"
              },
              {
                "id": 1612,
                "title": "Writing Unit Tests in Java",
                "url": "https://www.geeksforgeeks.org/unit-testing-in-java-with-junit/"
              },
              {
                "id": 1613,
                "title": "Mockito for Mocking Dependencies",
                "url": "https://www.baeldung.com/mockito-series"
              },
              {
                "id": 1614,
                "title": "Spring Boot Testing with JUnit & Mockito",
                "url": "https://www.javatpoint.com/spring-boot-unit-testing"
              }
            ]
          },
          {
            "id": 162,
            "title": "Integration Testing",
            "proofOfWork": "Develop integration tests for your REST API using Postman or RestAssured, and document your testing strategy.",
            "karmaPoint": 100,
            "content": [
              {
                "id": 1621,
                "title": "Introduction to Integration Testing",
                "url": "https://www.geeksforgeeks.org/integration-testing/"
              },
              {
                "id": 1622,
                "title": "Testing REST APIs with Postman & RestAssured",
                "url": "https://www.baeldung.com/rest-assured-tutorial"
              },
              {
                "id": 1623,
                "title": "Spring Boot Integration Testing",
                "url": "https://www.baeldung.com/spring-boot-testing"
              }
            ]
          },
          {
            "id": 163,
            "title": "Debugging Techniques",
            "proofOfWork": "Use debugging tools in your IDE (like IntelliJ IDEA or Eclipse) to diagnose and fix issues in a sample Java application, then document your process.",
            "karmaPoint": 50,
            "content": [
              {
                "id": 1631,
                "title": "Using Java Debugger (JDB)",
                "url": "https://www.javatpoint.com/java-jdb"
              },
              {
                "id": 1632,
                "title": "Debugging in IntelliJ IDEA & Eclipse",
                "url": "https://www.baeldung.com/java-debugging"
              },
              {
                "id": 1633,
                "title": "Common Java Debugging Issues & Fixes",
                "url": "https://www.geeksforgeeks.org/debugging-in-java/"
              }
            ]
          }
        ]

      },
      {
        "code": "Performance",
        "id": 17,
        "title": "Performance Optimization",
        "content": [
          {
            "id": 171,
            "title": "Memory Management & Garbage Collection",
            "proofOfWork": "Develop a Java application that monitors JVM memory usage and demonstrates effective garbage collection tuning by simulating high-load scenarios.",
            "karmaPoint": 50,
            "content": [
              {
                "id": 1711,
                "title": "JVM Memory Management",
                "url": "https://www.baeldung.com/jvm-memory-structure"
              },
              {
                "id": 1712,
                "title": "Understanding Java Garbage Collection",
                "url": "https://www.geeksforgeeks.org/garbage-collection-java/"
              },
              {
                "id": 1713,
                "title": "Garbage Collection Tuning",
                "url": "https://www.baeldung.com/java-11-garbage-collection"
              }
            ]
          },
          {
            "id": 172,
            "title": "Java Performance Tuning",
            "proofOfWork": "Optimize an existing Java application by profiling its performance and applying tuning strategies such as efficient data handling and JVM parameter adjustments.",
            "karmaPoint": 100,
            "content": [
              {
                "id": 1711,
                "title": "Profiling Java Applications",
                "url": "https://www.baeldung.com/java-profilers"
              },
              {
                "id": 1712,
                "title": "Using JConsole & VisualVM",
                "url": "https://www.baeldung.com/java-visualvm"
              },
              {
                "id": 1713,
                "title": "Optimizing Java Code Performance",
                "url": "https://www.geeksforgeeks.org/java-performance-optimization-tips/"
              }
            ]
          }
        ]

      },
      {
        "code": "System Design",
        "id": 18,
        "title": "System Design & Architecture",
        "content": [
          {
            "id": 181,
            "title": "Introduction to System Design",
            "proofOfWork": "Design a scalable system architecture for a hypothetical application, incorporating load balancing, caching, and database sharding strategies.",
            "karmaPoint": 50,
            "content": [
              {
                "id": 1811,
                "title": "What is System Design?",
                "url": "https://www.educative.io/courses/grokking-the-system-design-interview"
              },
              {
                "id": 1812,
                "title": "Scalability, Load Balancing, and Caching",
                "url": "https://www.baeldung.com/cs/scalability-load-balancing"
              },
              {
                "id": 1813,
                "title": "CAP Theorem & Database Sharding",
                "url": "https://www.baeldung.com/cap-theorem-nosql"
              }
            ]
          },
          {
            "id": 182,
            "title": "Microservices vs Monolithic Architecture",
            "proofOfWork": "Compare and contrast microservices and monolithic architectures by designing a system for a real-world scenario, including diagrams and a written rationale.",
            "karmaPoint": 100,
            "content": [
              {
                "id": 1821,
                "title": "Monolithic vs Microservices: Pros & Cons",
                "url": "https://www.baeldung.com/microservices-vs-monolith"
              },
              {
                "id": 1822,
                "title": "Event-Driven Architecture",
                "url": "https://martinfowler.com/articles/201701-event-driven.html"
              },
              {
                "id": 1823,
                "title": "API Gateway & Service Mesh",
                "url": "https://www.nginx.com/blog/what-is-an-api-gateway/"
              }
            ]
          },
          {
            "id": 183,
            "title": "Real-World Case Studies",
            "proofOfWork": "Analyze a real-world case study (e.g., Netflix or Uber) and create a report detailing how their system architecture supports scalability and reliability.",
            "karmaPoint": 50,
            "content": [
              {
                "id": 1831,
                "title": "How Netflix Built Its Scalable System",
                "url": "https://www.infoq.com/articles/netflix-architecture/"
              },
              {
                "id": 1832,
                "title": "Uber’s Microservices Architecture",
                "url": "https://eng.uber.com/microservice-architecture/"
              }
            ]
          }
        ]

      },
      {
        "code": "Interview",
        "id": 19,
        "title": "Interview Preparation",
        "content": [
          {
            "id": 191,
            "title": "Java Interview Questions",
            "proofOfWork": "Prepare for Java interviews by researching and answering these questions. Create a mini-project or blog post explaining the concepts behind the most challenging questions.",
            "karmaPoint": 50,
            "content": [
              {
                "id": 1911,
                "title": "Top Java Interview Questions & Answers",
                "url": "https://www.geeksforgeeks.org/top-50-java-interview-questions/"
              },
              {
                "id": 1912,
                "title": "Java 8 Features Interview Questions",
                "url": "https://www.javatpoint.com/java-8-interview-questions"
              },
              {
                "id": 1913,
                "title": "Spring Boot Interview Questions",
                "url": "https://www.baeldung.com/spring-boot-interview-questions"
              }
            ]
          },
          {
            "id": 192,
            "title": "Data Structures & Algorithms for Interviews",
            "proofOfWork": "Solve a set of top DSA problems from platforms like LeetCode and GeeksforGeeks, then document your solution approaches and optimizations.",
            "karmaPoint": 100,
            "content": [
              {
                "id": 1921,
                "title": "Most Asked DSA Questions",
                "url": "https://www.geeksforgeeks.org/must-do-coding-questions-for-companies-like-amazon-microsoft-adobe/"
              },
              {
                "id": 1922,
                "title": "LeetCode Top 100 Problems",
                "url": "https://leetcode.com/problemset/top-interview-questions/"
              }
            ]
          },
          {
            "id": 193,
            "title": "Mock Interviews & Resources",
            "proofOfWork": "Engage in mock interviews on platforms like Pramp, then reflect on your performance by writing a detailed review focusing on strengths and areas for improvement.",
            "karmaPoint": 50,
            "content": [
              {
                "id": 1931,
                "title": "Cracking the Coding Interview Guide",
                "url": "https://www.crackingthecodinginterview.com/"
              },
              {
                "id": 1932,
                "title": "HackerRank & CodeSignal Practice",
                "url": "https://www.hackerrank.com/domains/tutorials/10-days-of-javascript"
              },
              {
                "id": 1933,
                "title": "Mock Interviews on Pramp",
                "url": "https://www.pramp.com/"
              }
            ]
          }
        ]

      }
    ]
  },
  {
    id: '2',
    title: "Full-Stack Web Development",
    desc: "Master HTML, CSS, JavaScript, React, Node.js, Express, MongoDB, and DevOps.",
    overview: "This roadmap guides you through full-stack web development, starting from frontend basics to backend, databases, and deployment.",
    learnings: [
      "Build a solid foundation in HTML, CSS, and JavaScript for frontend development.",
      "Learn React.js for creating modern, interactive user interfaces.",
      "Master backend development with Node.js, Express.js, and MongoDB.",
      "Gain experience in DevOps, testing, and deploying web applications."
    ],
    level: 5,
    skills: ["HTML", "CSS", "JavaScript", "React", "Node.js", "MongoDB", "Express", "DevOps"],
    projects: ["Portfolio Website", "E-commerce Platform", "Blog CMS", "Real-time Chat App"],
    mainTopics: [
      "Frontend Basics",
      "JavaScript & DOM Manipulation",
      "React.js",
      "Backend Development",
      "Databases",
      "Authentication & Security",
      "Testing & Debugging",
      "DevOps & Deployment",
      "System Design & Scalability"
    ],
    ig: "Software",
    learners: 430,
    mentors: 15,
    topics: [
      {
        "code": "Frontend Basics",
        "title": "HTML, CSS, and Responsive Design",
        "content": [
          {
            "title": "Introduction to HTML & CSS",
            "content": [
              {
                "title": "HTML Basics",
                "url": "https://www.w3schools.com/html/html_intro.asp"
              },
              {
                "title": "CSS Basics & Styling Elements",
                "url": "https://www.w3schools.com/css/css_intro.asp"
              },
              {
                "title": "Responsive Design & Media Queries",
                "url": "https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Media_queries"
              }
            ]
          },
          {
            "title": "CSS Flexbox & Grid",
            "content": [
              {
                "title": "Mastering CSS Flexbox",
                "url": "https://css-tricks.com/snippets/css/a-guide-to-flexbox/"
              },
              {
                "title": "Understanding CSS Grid Layout",
                "url": "https://css-tricks.com/snippets/css/complete-guide-grid/"
              }
            ]
          }
        ]
      },
      {
        "code": "JavaScript & DOM Manipulation",
        "title": "JavaScript Essentials",
        "content": [
          {
            "title": "JavaScript Basics",
            "content": [
              {
                "title": "Introduction to JavaScript",
                "url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Introduction"
              },
              {
                "title": "DOM Manipulation",
                "url": "https://www.w3schools.com/js/js_htmldom.asp"
              },
              {
                "title": "Event Handling in JavaScript",
                "url": "https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events"
              }
            ]
          }
        ]
      },
      {
        "code": "React.js",
        "title": "Modern Frontend with React",
        "content": [
          {
            "title": "Getting Started with React",
            "content": [
              {
                "title": "Introduction to React",
                "url": "https://react.dev/"
              },
              {
                "title": "Components and Props",
                "url": "https://react.dev/learn/your-first-component"
              },
              {
                "title": "State and Lifecycle",
                "url": "https://react.dev/learn/state-and-lifecycle"
              }
            ]
          }
        ]
      },
      {
        "code": "Backend Development",
        "title": "Server-side Development with Node.js & Express.js",
        "content": [
          {
            "title": "Node.js Basics",
            "content": [
              {
                "title": "Introduction to Node.js",
                "url": "https://nodejs.org/en/docs/guides/getting-started-guide"
              },
              {
                "title": "Creating an Express.js Server",
                "url": "https://expressjs.com/en/starter/hello-world.html"
              },
              {
                "title": "Handling API Requests with Express",
                "url": "https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/routes"
              }
            ]
          }
        ]
      },
      {
        "code": "Databases",
        "title": "Working with MongoDB",
        "content": [
          {
            "title": "Introduction to MongoDB",
            "url": "https://www.mongodb.com/docs/manual/introduction/"
          },
          {
            "title": "CRUD Operations with MongoDB",
            "url": "https://www.mongodb.com/docs/manual/crud/"
          }
        ]
      },
      {
        "code": "Authentication & Security",
        "title": "Implementing User Authentication",
        "content": [
          {
            "title": "Authentication with JWT",
            "url": "https://jwt.io/introduction/"
          },
          {
            "title": "Securing Web Applications",
            "url": "https://owasp.org/www-project-top-ten/"
          }
        ]
      },
      {
        "code": "Testing & Debugging",
        "title": "Ensuring Code Quality",
        "content": [
          {
            "title": "Introduction to Testing",
            "url": "https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Cross_browser_testing/Introduction"
          },
          {
            "title": "Unit Testing with Jest",
            "url": "https://jestjs.io/docs/getting-started"
          },
          {
            "title": "Debugging in Chrome DevTools",
            "url": "https://developer.chrome.com/docs/devtools/javascript/"
          }
        ]
      },
      {
        "code": "DevOps & Deployment",
        "title": "Deploying and Managing Applications",
        "content": [
          {
            "title": "Introduction to DevOps",
            "url": "https://aws.amazon.com/devops/what-is-devops/"
          },
          {
            "title": "Continuous Integration & Deployment",
            "url": "https://circleci.com/continuous-integration/"
          },
          {
            "title": "Deploying on AWS and Vercel",
            "url": "https://vercel.com/docs"
          }
        ]
      },
      {
        "code": "System Design & Scalability",
        "title": "Building Scalable and Efficient Systems",
        "content": [
          {
            "title": "Introduction to System Design",
            "url": "https://github.com/donnemartin/system-design-primer"
          },
          {
            "title": "Load Balancing & Caching",
            "url": "https://aws.amazon.com/caching/"
          },
          {
            "title": "Database Scaling Techniques",
            "url": "https://www.digitalocean.com/community/tutorial_series/database-scalability-best-practices"
          }
        ]
      },
      {
        "code": "Testing & Debugging",
        "title": "Ensuring Code Quality",
        "content": [
          {
            "title": "Introduction to Testing",
            "url": "https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Cross_browser_testing/Introduction"
          },
          {
            "title": "Unit Testing with Jest",
            "url": "https://jestjs.io/docs/getting-started"
          },
          {
            "title": "Debugging in Chrome DevTools",
            "url": "https://developer.chrome.com/docs/devtools/javascript/"
          }
        ]
      },
      {
        "code": "DevOps & Deployment",
        "title": "Deploying and Managing Applications",
        "content": [
          {
            "title": "Introduction to DevOps",
            "url": "https://aws.amazon.com/devops/what-is-devops/"
          },
          {
            "title": "Continuous Integration & Deployment",
            "url": "https://circleci.com/continuous-integration/"
          },
          {
            "title": "Deploying on AWS and Vercel",
            "url": "https://vercel.com/docs"
          }
        ]
      },
      {
        "code": "System Design & Scalability",
        "title": "Building Scalable and Efficient Systems",
        "content": [
          {
            "title": "Introduction to System Design",
            "url": "https://github.com/donnemartin/system-design-primer"
          },
          {
            "title": "Load Balancing & Caching",
            "url": "https://aws.amazon.com/caching/"
          },
          {
            "title": "Database Scaling Techniques",
            "url": "https://www.digitalocean.com/community/tutorial_series/database-scalability-best-practices"
          }
        ]
      }
    ]
  },
  {
    id: "3",
    title: "Python for Data Science",
    desc: "Learn Python, Pandas, NumPy, Matplotlib, Scikit-learn, and Machine Learning fundamentals.",
    overview: "This roadmap provides a structured learning path for mastering Python for Data Science. It covers Python programming basics, data manipulation with Pandas and NumPy, data visualization, and an introduction to machine learning using Scikit-learn.",
    learnings: [
      "Understand Python fundamentals and its application in data science.",
      "Learn data manipulation with Pandas and numerical computing with NumPy.",
      "Master data visualization using Matplotlib and Seaborn.",
      "Build and evaluate machine learning models using Scikit-learn."
    ],
    level: 4,
    skills: ["Python", "Pandas", "NumPy", "Matplotlib", "Scikit-learn", "Machine Learning"],
    projects: ["Data Analysis Project", "Exploratory Data Analysis (EDA) Project", "Predictive Model using Scikit-learn"],
    mainTopics: [
      "Python Basics",
      "Data Handling with Pandas & NumPy",
      "Data Visualization",
      "Machine Learning Fundamentals",
      "Model Evaluation & Optimization"
    ],
    ig: "Software",
    learners: 370,
    mentors: 15,
    topics: [
      {
        "code": "Python Basics",
        "title": "Python Fundamentals",
        "content": [
          {
            "title": "Introduction to Python",
            "content": [
              { "title": "Why Python for Data Science?", "url": "https://www.geeksforgeeks.org/python-for-data-science/" },
              { "title": "Installing Python and Setting Up Environment", "url": "https://realpython.com/installing-python/" },
              { "title": "Python Basics: Variables, Data Types, and Operators", "url": "https://www.w3schools.com/python/python_variables.asp" }
            ]
          },
          {
            "title": "Control Structures and Functions",
            "content": [
              { "title": "Conditionals and Loops", "url": "https://www.programiz.com/python-programming/if-elif-else" },
              { "title": "Functions and Lambda Expressions", "url": "https://www.w3schools.com/python/python_functions.asp" }
            ]
          }
        ]
      },
      {
        "code": "Data Handling with Pandas & NumPy",
        "title": "Data Handling with Pandas & NumPy",
        "content": [
          {
            "title": "Introduction to Pandas",
            "content": [
              { "title": "Pandas DataFrames and Series", "url": "https://pandas.pydata.org/docs/getting_started/intro_tutorials/01_table_oriented.html" },
              { "title": "Data Cleaning and Manipulation", "url": "https://realpython.com/pandas-data-cleaning/" }
            ]
          },
          {
            "title": "NumPy for Numerical Computing",
            "content": [
              { "title": "NumPy Arrays and Operations", "url": "https://numpy.org/doc/stable/user/absolute_beginners.html" },
              { "title": "Matrix Operations with NumPy", "url": "https://www.geeksforgeeks.org/python-numpy/" }
            ]
          }
        ]
      },
      {
        "code": "Data Visualization",
        "title": "Data Visualization",
        "content": [
          {
            "title": "Matplotlib Basics",
            "content": [
              { "title": "Creating Plots with Matplotlib", "url": "https://matplotlib.org/stable/tutorials/introductory/pyplot.html" },
              { "title": "Customizing Plots", "url": "https://www.geeksforgeeks.org/matplotlib-tutorial/" }
            ]
          },
          {
            "title": "Seaborn for Statistical Data Visualization",
            "content": [
              { "title": "Seaborn Basics", "url": "https://seaborn.pydata.org/tutorial.html" },
              { "title": "Creating Advanced Visualizations", "url": "https://realpython.com/python-matplotlib-guide/" }
            ]
          }
        ]
      },
      {
        "code": "Machine Learning Fundamentals",
        "title": "Machine Learning Basics with Scikit-learn",
        "content": [
          {
            "title": "Introduction to Machine Learning",
            "content": [
              { "title": "What is Machine Learning?", "url": "https://www.geeksforgeeks.org/machine-learning/" },
              { "title": "Types of Machine Learning", "url": "https://www.analyticsvidhya.com/blog/2017/09/common-machine-learning-algorithms/" }
            ]
          },
          {
            "title": "Building Machine Learning Models",
            "content": [
              { "title": "Linear Regression with Scikit-learn", "url": "https://scikit-learn.org/stable/modules/linear_model.html" },
              { "title": "Classification with Decision Trees & Random Forests", "url": "https://scikit-learn.org/stable/modules/tree.html" }
            ]
          }
        ]
      },
      {
        "code": "Model Evaluation & Optimization",
        "title": "Model Evaluation & Optimization",
        "content": [
          {
            "title": "Evaluating Machine Learning Models",
            "content": [
              { "title": "Confusion Matrix, Precision & Recall", "url": "https://www.datacamp.com/tutorial/precision-recall-classification-metrics" },
              { "title": "Cross-Validation Techniques", "url": "https://scikit-learn.org/stable/modules/cross_validation.html" }
            ]
          },
          {
            "title": "Hyperparameter Tuning",
            "content": [
              { "title": "Grid Search and Random Search", "url": "https://scikit-learn.org/stable/modules/grid_search.html" },
              { "title": "Using Scikit-learn Pipelines", "url": "https://scikit-learn.org/stable/modules/compose.html" }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "5",
    title: "Game Development with Unreal Engine",
    desc: "Learn Unreal Engine, C++ scripting, 2D & 3D game mechanics, and deployment.",
    overview: "This roadmap covers Unreal Engine development from scratch, starting with the basics and gradually moving to advanced topics like C++ scripting, physics, AI, and deployment.",
    learnings: [
      "Understand the basics of Unreal Engine and its interface.",
      "Learn Blueprints and C++ for scripting gameplay mechanics.",
      "Develop 2D and 3D games with physics, animations, and AI.",
      "Deploy games to PC, console, and mobile platforms."
    ],
    level: 4,
    skills: ["Unreal Engine", "C++", "Blueprints", "Game Physics", "AI"],
    projects: ["First-Person Shooter", "Platformer Game", "Racing Game", "Multiplayer Shooter"],
    mainTopics: [
      "Getting Started",
      "Blueprints & C++",
      "Game Mechanics",
      "AI & Physics",
      "Animation & UI",
      "Multiplayer",
      "Optimization & Deployment"
    ],
    ig: "Software",
    learners: 300,
    mentors: 10,
    topics: [
      {
        "code": "Getting Started",
        "title": "Introduction to Unreal Engine",
        "content": [
          {
            "title": "Unreal Engine Overview & Installation",
            "content": [
              {
                "title": "Introduction to Unreal Engine",
                "url": "https://www.unrealengine.com/en-US/what-is-unreal-engine"
              },
              {
                "title": "Installing Unreal Engine & Setting Up",
                "url": "https://www.unrealengine.com/en-US/download"
              },
              {
                "title": "Navigating the Unreal Editor",
                "url": "https://docs.unrealengine.com/4.27/en-US/GettingStarted/FromUnity/Overview/"
              }
            ]
          },
          {
            "title": "Basic Concepts & Project Setup",
            "content": [
              {
                "title": "Creating a New Unreal Project",
                "url": "https://docs.unrealengine.com/4.27/en-US/GettingStarted/YourFirstGame/"
              },
              {
                "title": "Understanding Assets, Actors, and Components",
                "url": "https://docs.unrealengine.com/4.27/en-US/ProgrammingAndScripting/ActorFramework/"
              }
            ]
          }
        ]
      },
      {
        "code": "Blueprints & C++",
        "title": "Game Scripting with Blueprints & C++",
        "content": [
          {
            "title": "Introduction to Blueprints",
            "content": [
              {
                "title": "What are Blueprints?",
                "url": "https://docs.unrealengine.com/4.27/en-US/ProgrammingAndScripting/Blueprints/"
              },
              {
                "title": "Creating and Using Blueprint Scripts",
                "url": "https://www.unrealengine.com/en-US/blog/using-blueprints-to-create-gameplay-in-unreal-engine"
              }
            ]
          },
          {
            "title": "Unreal Engine C++ Basics",
            "content": [
              {
                "title": "Introduction to C++ in Unreal Engine",
                "url": "https://docs.unrealengine.com/4.27/en-US/ProgrammingAndScripting/ProgrammingWithCPP/"
              },
              {
                "title": "Writing Your First C++ Class",
                "url": "https://www.raywenderlich.com/5114-unreal-engine-4-for-beginners"
              }
            ]
          },
        ],
      },
      {
        code: 'Game Mechanics',
        title: 'Game Mechanics in Unreal Engine',
        content: [
          {
            title: 'Core Game Mechanics',
            content: [
              {
                title: 'Introduction to Game Mechanics',
                url: 'https://www.gamedeveloper.com/design/game-mechanics-overview'
              },
              {
                title: 'Implementing Player Movement',
                url: 'https://docs.unrealengine.com/4.27/en-US/InteractiveExperiences/PlayerMovement/'
              }
            ]
          }
        ]
      },
      {
        code: 'AI & Physics',
        title: 'AI & Physics in Unreal Engine',
        content: [
          {
            title: 'Artificial Intelligence in Games',
            content: [
              {
                title: 'Introduction to AI in Unreal Engine',
                url: 'https://docs.unrealengine.com/4.27/en-US/InteractiveExperiences/AI/'
              }
            ]
          },
          {
            title: 'Physics Simulations',
            content: [
              {
                title: 'Physics in Unreal Engine',
                url: 'https://docs.unrealengine.com/4.27/en-US/Physics/'
              }
            ]
          }
        ]
      },
      {
        code: 'Animation & UI',
        title: 'Animation & UI in Unreal Engine',
        content: [
          {
            title: 'Character Animation',
            content: [
              {
                title: 'Creating Character Animations',
                url: 'https://docs.unrealengine.com/4.27/en-US/AnimatingObjects/'
              }
            ]
          },
          {
            title: 'User Interface (UI) Design',
            content: [
              {
                title: 'Designing UI with UMG',
                url: 'https://docs.unrealengine.com/4.27/en-US/UMG/'
              }
            ]
          }
        ]
      },
      {
        code: 'Multiplayer',
        title: 'Multiplayer Development in Unreal Engine',
        content: [
          {
            title: 'Networking Basics',
            content: [
              {
                title: 'Introduction to Multiplayer in Unreal',
                url: 'https://docs.unrealengine.com/4.27/en-US/ProgrammingAndScripting/Networking/'
              }
            ]
          }
        ]
      },
      {
        code: 'Optimization & Deployment',
        title: 'Optimization & Deployment in Unreal Engine',
        content: [
          {
            title: 'Game Optimization',
            content: [
              {
                title: 'Performance Optimization Techniques',
                url: 'https://docs.unrealengine.com/4.27/en-US/TestingAndOptimization/PerformanceAndProfiling/'
              }
            ]
          },
          {
            title: 'Deployment',
            content: [
              {
                title: 'Deploying to Different Platforms',
                url: 'https://docs.unrealengine.com/4.27/en-US/SharingAndReleasing/'
              }
            ]
          }
        ]
      }
    ]

  },

  {
    id: '4',
    title: 'Cybersecurity Fundamentals',
    desc: 'Understand cybersecurity principles, ethical hacking, penetration testing, and network security.',
    level: 5,
    tags: ['Cybersecurity', 'Hacking', 'Networking'],
    ig: 'Software',
    learners: 215,
  },
  // {
  //     id: '5',
  //     title: 'Game Development with Unity',
  //     desc: 'Learn Unity engine, C# scripting, 2D & 3D game mechanics, and deployment.',
  //     level: 4,
  //     tags: ['Unity', 'Game Dev', 'C#'],
  //     ig: 'Software',
  //     learners: 300,
  // },
  {
    id: '6',
    title: 'Blockchain Development',
    desc: 'Explore blockchain technology, smart contracts, Ethereum, and Web3 development.',
    level: 5,
    tags: ['Blockchain', 'Web3', 'Smart Contracts'],
    ig: 'Software',
    learners: 180,
  },
  {
    id: '7',
    title: 'iOS App Development',
    desc: 'Build iOS apps using Swift, SwiftUI, Core Data, and integrate APIs.',
    level: 4,
    tags: ['Swift', 'iOS', 'Xcode'],
    ig: 'Software',
    learners: 220,
  },
  {
    id: '8',
    title: 'Android App Development',
    desc: 'Learn Kotlin, Jetpack Compose, MVVM architecture, and Firebase integration.',
    level: 4,
    tags: ['Kotlin', 'Android', 'Mobile'],
    ig: 'Software',
    learners: 250,
  },
  {
    id: '9',
    title: 'Cloud Computing & DevOps',
    desc: 'Master AWS, Docker, Kubernetes, CI/CD, and serverless architecture.',
    level: 5,
    tags: ['AWS', 'DevOps', 'Cloud'],
    ig: 'Software',
    learners: 320,
  },
  {
    id: '10',
    title: 'AI & Machine Learning',
    desc: 'Deep dive into AI, TensorFlow, deep learning, NLP, and neural networks.',
    level: 5,
    tags: ['AI', 'ML', 'TensorFlow'],
    ig: 'Software',
    learners: 410,
  },

  // HARDWARE ROADMAPS (10)
  {
    id: '11',
    title: 'Embedded Systems Development',
    desc: 'Learn microcontrollers, ARM architecture, and real-time OS programming.',
    level: 4,
    tags: ['Embedded', 'Microcontrollers', 'C'],
    ig: 'Hardware',
    learners: 180,
  },
  {
    id: '12',
    title: 'IoT Development',
    desc: 'Build IoT systems with Raspberry Pi, Arduino, MQTT, and sensor networks.',
    level: 5,
    tags: ['IoT', 'Arduino', 'Raspberry Pi'],
    ig: 'Hardware',
    learners: 250,
  },
  {
    id: '13',
    title: 'VLSI Design',
    desc: 'Introduction to FPGA, ASIC design, and hardware description languages like Verilog.',
    level: 5,
    tags: ['VLSI', 'Verilog', 'FPGA'],
    ig: 'Hardware',
    learners: 140,
  },
  {
    id: '14',
    title: 'Robotics & Automation',
    desc: 'Learn robotic kinematics, AI in robotics, ROS, and control systems.',
    level: 5,
    tags: ['Robotics', 'AI', 'ROS'],
    ig: 'Hardware',
    learners: 190,
  },

  // MANAGEMENT ROADMAPS (10)
  {
    id: '21',
    title: 'MBA Essentials',
    desc: 'Introduction to business strategy, finance, marketing, and operations.',
    level: 4,
    tags: ['Business', 'MBA', 'Finance'],
    ig: 'Management',
    learners: 310,
  },
  {
    id: '22',
    title: 'Product Management',
    desc: 'Learn product strategy, roadmaps, user research, and Agile development.',
    level: 4,
    tags: ['Product', 'Agile', 'User Research'],
    ig: 'Management',
    learners: 270,
  },

  // CREATIVE ROADMAPS (10)
  {
    id: '31',
    title: 'UI/UX Design',
    desc: 'Master Figma, Adobe XD, wireframing, and user research.',
    level: 4,
    tags: ['UI/UX', 'Design', 'Figma'],
    ig: 'Creative',
    learners: 260,
  },
  {
    id: '32',
    title: 'Graphic Design Mastery',
    desc: 'Learn Photoshop, Illustrator, typography, and brand identity design.',
    level: 3,
    tags: ['Graphic Design', 'Photoshop', 'Branding'],
    ig: 'Creative',
    learners: 180,
  },
  {
    id: '33',
    title: 'Filmmaking & Video Production',
    desc: 'Learn cinematography, video editing, scriptwriting, and production techniques.',
    level: 5,
    tags: ['Filmmaking', 'Cinematography', 'Editing'],
    ig: 'Creative',
    learners: 220,
  },
  {
    id: '34',
    title: 'Animation & Motion Graphics',
    desc: 'Explore 2D/3D animation, After Effects, Blender, and motion design principles.',
    level: 5,
    tags: ['Animation', 'Blender', 'After Effects'],
    ig: 'Creative',
    learners: 170,
  },
  {
    id: '35',
    title: 'Game Art & Design',
    desc: 'Understand game aesthetics, 3D modeling, texturing, and game asset creation.',
    level: 5,
    tags: ['Game Design', '3D Modeling', 'Art'],
    ig: 'Creative',
    learners: 210,
  },
  {
    id: '36',
    title: 'Music Production & Sound Design',
    desc: 'Learn digital audio production, sound engineering, and mixing techniques.',
    level: 5,
    tags: ['Music Production', 'Audio', 'Mixing'],
    ig: 'Creative',
    learners: 160,
  }
];
