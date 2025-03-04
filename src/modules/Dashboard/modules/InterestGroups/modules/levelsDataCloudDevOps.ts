export const levelsDataCloudDevOps = [
    {
      "level": 4,
      "title": "Level 4",
      "subtitle": "Foundations of Cloud Computing and DevOps",
      "cards": [
        {
          "id": "4-1",
          "title": "Explore Cloud Computing Basics",
          "desc": "Understand the core concepts of cloud computing, including service models and deployment types.",
          "brief": "Research cloud computing fundamentals (IaaS, PaaS, SaaS, public/private/hybrid clouds). Write a blog summarizing your findings and submit the public link.",
          "karma": 200,
          "hashtag": "#cl-cloud-basics",
          "discordChannelName": "Cloud-DevOps",
          "ig": "Cloud Computing",
          "icon": "<MdCloud />",
          "skills": ["Cloud Concepts", "Research", "Documentation"],
          "publishedBy": "Community",
          "publishedWhen": "2/26/25, 10:00 AM",
          "prerequisites": ["Basic IT knowledge"],
          "resources": [
            "https://aws.amazon.com/what-is-cloud-computing/",
            "https://www.youtube.com/watch?v=M988_fsOSWo"
          ]
        },
        {
          "id": "4-2",
          "title": "Set Up an AWS Free Tier Account",
          "desc": "Create an AWS account and explore its basic services.",
          "brief": "Sign up for AWS Free Tier, explore the console, and take a screenshot of the dashboard. Submit the screenshot.",
          "karma": 200,
          "hashtag": "#cl-cloud-aws-setup",
          "discordChannelName": "Cloud-DevOps",
          "ig": "AWS",
          "icon": "<MdCloudQueue />",
          "skills": ["AWS Basics", "Account Setup", "Console Navigation"],
          "publishedBy": "Community",
          "publishedWhen": "2/26/25, 10:10 AM",
          "prerequisites": ["Basic internet skills"],
          "resources": [
            "https://aws.amazon.com/free/",
            "https://www.youtube.com/watch?v=zvQ6zG_aggQ"
          ]
        },
        {
          "id": "4-3",
          "title": "Introduction to DevOps Principles",
          "desc": "Learn the foundational principles of DevOps and its role in software delivery.",
          "brief": "Research DevOps concepts (CI/CD, automation, collaboration). Create a blog or PDF summary and submit the public link.",
          "karma": 200,
          "hashtag": "#cl-devops-principles",
          "discordChannelName": "Cloud-DevOps",
          "ig": "DevOps",
          "icon": "<MdBuild />",
          "skills": ["DevOps Basics", "Research", "Documentation"],
          "publishedBy": "Community",
          "publishedWhen": "2/26/25, 10:20 AM",
          "prerequisites": ["Basic software development knowledge"],
          "resources": [
            "https://www.atlassian.com/devops/what-is-devops",
            "https://www.youtube.com/watch?v=9pZ2xmsSDdo"
          ]
        },
        {
          "id": "4-4",
          "title": "Install and Configure Git",
          "desc": "Set up Git for version control, a key DevOps tool.",
          "brief": "Install Git, configure your user profile, and create a simple repository. Submit a screenshot of your `git config` output and repository link.",
          "karma": 250,
          "hashtag": "#cl-devops-git",
          "discordChannelName": "Cloud-DevOps",
          "ig": "Version Control",
          "icon": "<MdGitHub />",
          "skills": ["Git Setup", "Version Control Basics", "CLI Usage"],
          "publishedBy": "Community",
          "publishedWhen": "2/26/25, 10:30 AM",
          "prerequisites": ["Basic command-line knowledge"],
          "resources": [
            "https://git-scm.com/book/en/v2/Getting-Started-Installing-Git",
            "https://www.youtube.com/watch?v=HVsySz-h9r4"
          ]
        }
      ]
    },
    {
      "level": 5,
      "title": "Level 5",
      "subtitle": "Intermediate Cloud and DevOps Practices",
      "cards": [
        {
          "id": "5-1",
          "title": "Deploy a Static Website on AWS S3",
          "desc": "Host a static website using AWS S3 to understand cloud storage and deployment.",
          "brief": "Create a simple HTML/CSS site, upload it to an S3 bucket, and make it publicly accessible. Submit the public URL.",
          "karma": 300,
          "hashtag": "#cl-cloud-s3website",
          "discordChannelName": "Cloud-DevOps",
          "ig": "AWS S3",
          "icon": "<MdWeb />",
          "skills": ["AWS S3", "Static Hosting", "Cloud Deployment"],
          "publishedBy": "Community",
          "publishedWhen": "2/26/25, 10:40 AM",
          "prerequisites": ["AWS Free Tier account"],
          "resources": [
            "https://docs.aws.amazon.com/AmazonS3/latest/userguide/WebsiteHosting.html",
            "https://www.youtube.com/watch?v=mls8Wn7i438"
          ]
        },
        {
          "id": "5-2",
          "title": "Set Up a CI/CD Pipeline with GitHub Actions",
          "desc": "Automate a simple build and deploy process using GitHub Actions.",
          "brief": "Create a GitHub repository with a basic app, set up a GitHub Actions workflow to build and test it. Submit the repository link.",
          "karma": 350,
          "hashtag": "#cl-devops-cicd",
          "discordChannelName": "Cloud-DevOps",
          "ig": "CI/CD",
          "icon": "<MdAutorenew />",
          "skills": ["GitHub Actions", "CI/CD Basics", "Automation"],
          "publishedBy": "Community",
          "publishedWhen": "2/26/25, 10:50 AM",
          "prerequisites": ["Git installed", "Basic programming knowledge"],
          "resources": [
            "https://docs.github.com/en/actions/quickstart",
            "https://www.youtube.com/watch?v=R8_veQiYBjI"
          ]
        },
        {
          "id": "5-3",
          "title": "Launch an EC2 Instance and Install a Web Server",
          "desc": "Deploy a virtual server on AWS EC2 and configure it with a web server.",
          "brief": "Launch an EC2 instance, install Apache/Nginx, and host a sample page. Submit the public IP or URL.",
          "karma": 350,
          "hashtag": "#cl-cloud-ec2",
          "discordChannelName": "Cloud-DevOps",
          "ig": "AWS EC2",
          "icon": "<MdServer />",
          "skills": ["EC2 Setup", "Web Server Configuration", "Cloud Infrastructure"],
          "publishedBy": "Community",
          "publishedWhen": "2/26/25, 11:00 AM",
          "prerequisites": ["AWS Free Tier account", "Basic Linux knowledge"],
          "resources": [
            "https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/EC2_GetStarted.html",
            "https://www.youtube.com/watch?v=3p5KmbnXhZo"
          ]
        },
        {
          "id": "5-4",
          "title": "Containerize an Application with Docker",
          "desc": "Learn containerization by packaging an app with Docker.",
          "brief": "Create a simple app (e.g., Node.js), write a Dockerfile, build and run the container. Submit the GitHub repository link with Dockerfile.",
          "karma": 300,
          "hashtag": "#cl-devops-docker",
          "discordChannelName": "Cloud-DevOps",
          "ig": "Docker",
          "icon": "<MdDocker />",
          "skills": ["Docker Basics", "Containerization", "CLI Usage"],
          "publishedBy": "Community",
          "publishedWhen": "2/26/25, 11:10 AM",
          "prerequisites": ["Basic programming knowledge"],
          "resources": [
            "https://docs.docker.com/get-started/",
            "https://www.youtube.com/watch?v=fqMOX6JJhGo"
          ]
        },
        {
          "id": "5-5",
          "title": "Automate Infrastructure with Terraform",
          "desc": "Use Terraform to define and deploy cloud infrastructure as code.",
          "brief": "Write a Terraform script to launch an AWS EC2 instance. Apply it and submit the GitHub repository link with the script.",
          "karma": 350,
          "hashtag": "#cl-devops-terraform",
          "discordChannelName": "Cloud-DevOps",
          "ig": "IaC",
          "icon": "<MdConstruction />",
          "skills": ["Terraform Basics", "Infrastructure as Code", "AWS"],
          "publishedBy": "Community",
          "publishedWhen": "2/26/25, 11:20 AM",
          "prerequisites": ["AWS Free Tier account", "Basic command-line skills"],
          "resources": [
            "https://learn.hashicorp.com/tutorials/terraform/aws-build",
            "https://www.youtube.com/watch?v=SLB_c_ayRMo"
          ]
        }
      ]
    },
    {
      "level": 6,
      "title": "Level 6",
      "subtitle": "Advanced Cloud and DevOps Mastery",
      "cards": [
        {
          "id": "6-1",
          "title": "Deploy a Multi-Tier Application on AWS",
          "desc": "Deploy a multi-tier app using EC2, RDS, and S3 for a full cloud architecture.",
          "brief": "Create a simple app with a frontend (S3), backend (EC2), and database (RDS). Submit the GitHub repository link and app URL.",
          "karma": 500,
          "hashtag": "#cl-cloud-multitier",
          "discordChannelName": "Cloud-DevOps",
          "ig": "Cloud Architecture",
          "icon": "<MdArchitecture />",
          "skills": ["Multi-Tier Deployment", "AWS Services", "Networking"],
          "publishedBy": "Community",
          "publishedWhen": "2/26/25, 11:30 AM",
          "prerequisites": ["Intermediate AWS knowledge"],
          "resources": [
            "https://aws.amazon.com/getting-started/hands-on/deploy-web-app/",
            "https://www.youtube.com/watch?v=5v1K0qA5jUc"
          ]
        },
        {
          "id": "6-2",
          "title": "Set Up a Kubernetes Cluster with Minikube",
          "desc": "Deploy a local Kubernetes cluster and run a containerized app.",
          "brief": "Install Minikube, deploy a Dockerized app with Kubernetes manifests. Submit the GitHub repository link with manifests.",
          "karma": 450,
          "hashtag": "#cl-devops-kubernetes",
          "discordChannelName": "Cloud-DevOps",
          "ig": "Kubernetes",
          "icon": "<MdCluster />",
          "skills": ["Kubernetes Basics", "Container Orchestration", "CLI"],
          "publishedBy": "Community",
          "publishedWhen": "2/26/25, 11:40 AM",
          "prerequisites": ["Docker knowledge"],
          "resources": [
            "https://minikube.sigs.k8s.io/docs/start/",
            "https://www.youtube.com/watch?v=X48VuXVvVbw"
          ]
        },
        {
          "id": "6-3",
          "title": "Implement Monitoring with Prometheus and Grafana",
          "desc": "Set up monitoring for an application using Prometheus and Grafana.",
          "brief": "Deploy a simple app, configure Prometheus and Grafana for metrics, and submit a screenshot of the dashboard with the repository link.",
          "karma": 400,
          "hashtag": "#cl-devops-monitoring",
          "discordChannelName": "Cloud-DevOps",
          "ig": "Monitoring",
          "icon": "<MdMonitor />",
          "skills": ["Prometheus", "Grafana", "System Monitoring"],
          "publishedBy": "Community",
          "publishedWhen": "2/26/25, 11:50 AM",
          "prerequisites": ["Docker knowledge", "Basic Linux skills"],
          "resources": [
            "https://prometheus.io/docs/introduction/overview/",
            "https://www.youtube.com/watch?v=hr1oXcuTGsQ"
          ]
        },
        {
          "id": "6-4",
          "title": "Automate a Blue-Green Deployment",
          "desc": "Implement a blue-green deployment strategy using AWS or Kubernetes.",
          "brief": "Set up a blue-green deployment for an app (e.g., with AWS ELB or Kubernetes). Submit the GitHub repository link with deployment scripts.",
          "karma": 500,
          "hashtag": "#cl-devops-bluegreen",
          "discordChannelName": "Cloud-DevOps",
          "ig": "Deployment Strategies",
          "icon": "<MdSwapHoriz />",
          "skills": ["Blue-Green Deployment", "CI/CD", "Cloud Automation"],
          "publishedBy": "Community",
          "publishedWhen": "2/26/25, 12:00 PM",
          "prerequisites": ["Intermediate AWS or Kubernetes knowledge"],
          "resources": [
            "https://aws.amazon.com/blogs/devops/implementing-blue-green-deployments-with-aws/",
            "https://www.youtube.com/watch?v=3z-DYi0lSXY"
          ]
        },
        {
          "id": "6-5",
          "title": "Secure a Cloud Application",
          "desc": "Apply security best practices to a cloud-deployed application.",
          "brief": "Deploy an app on AWS, secure it with IAM roles, VPC, and SSL. Submit the GitHub repository link and a security checklist.",
          "karma": 450,
          "hashtag": "#cl-cloud-security",
          "discordChannelName": "Cloud-DevOps",
          "ig": "Cloud Security",
          "icon": "<MdSecurity />",
          "skills": ["Cloud Security", "IAM", "Network Configuration"],
          "publishedBy": "Community",
          "publishedWhen": "2/26/25, 12:10 PM",
          "prerequisites": ["Intermediate AWS knowledge"],
          "resources": [
            "https://aws.amazon.com/security/best-practices/",
            "https://www.youtube.com/watch?v=8rVzvSrp3tw"
          ]
        },
        {
          "id": "6-6",
          "title": "Create a DevOps Portfolio",
          "desc": "Build a portfolio showcasing your Cloud and DevOps projects.",
          "brief": "Create a portfolio (website, PDF, or presentation) with project details and submit the public link.",
          "karma": 300,
          "hashtag": "#cl-devops-portfolio",
          "discordChannelName": "Cloud-DevOps",
          "ig": "Portfolio",
          "icon": "<MdFolderOpen />",
          "skills": ["Portfolio Design", "Project Showcase", "Documentation"],
          "publishedBy": "Community",
          "publishedWhen": "2/26/25, 12:20 PM",
          "prerequisites": ["Completed Cloud/DevOps projects"],
          "resources": [
            "https://www.freecodecamp.org/news/how-to-build-a-developer-portfolio/",
            "https://www.youtube.com/watch?v=byto0iIqkSw"
          ]
        }
      ]
    }
  ];