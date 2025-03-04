import React, { useState } from 'react';
import { motion, Variants } from 'framer-motion';
import styles from './RolesSection.module.css'; // Assume CSS Modules for styling

// Sample motion variant for fadeInUp animation
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
};

interface Role {
  id: string;
  label: string;
}

const roles: Role[] = [
  { id: 'partner', label: 'Partner' },
  { id: 'learner', label: 'Learner' },
  { id: 'community', label: 'Community' },
  // { id: 'enabler', label: 'Enabler' }
];

interface RoleItem {
  id: number;
  name: string;
  description: string;
  image: string;
}

interface RolesContent {
  [key: string]: RoleItem[];
}

const rolesContent: RolesContent = {
  partner: [
    {
      id: 1,
      name: 'Leverage Resources & Expertise',
      description:
        'Share your tools, platforms, and industry expertise at no cost while accessing a highly skilled, pre-trained talent pool. Minimize onboarding time, streamline workflow integration, and scale projects efficiently through seamless collaboration.',
      image:
      '/assets/roles_images/Podcast_Social.png',
    },
    {
      id: 2,
      name: 'Product Introduction',
      description:
        'Launch your products directly to a community of tech-savvy developers and early adopters. Boost brand awareness, accelerate product adoption, and gather real-time user insights for continuous improvement.',
      image:
      '/assets/roles_images/Creative_Writing.png',
    },
    {
      id: 3,
      name: 'Talent Acquisition',
      description:
        'Hire top-tier, job-ready developers with proven skills, reducing training costs and expediting project execution. Gain access to a dynamic talent pipeline that meets industry demands and ensures faster onboarding.',
      image:
      '/assets/roles_images/Business_Woman.png',
    },
    {
      id: 4,
      name: 'Brand Presence',
      description:
      'Elevate your brand reputation by engaging with a vibrant learning ecosystem. Build lasting relationships with future industry leaders while positioning your company as an innovator in the tech community.',
      image:
      '/assets/roles_images/Online_Support.png',
    },
  ],
  learner: [
    {
      id: 1,
      name: 'Skill Development',
      description:
        'Gain practical experience through hands-on projects and industry-relevant training. Build a strong technical foundation with real-world applications that enhance your expertise.',
      image:
        '/assets/roles_images/skill-development.svg',
    },
    {
      id: 2,
      name: 'Career Growth & Job Opportunities',
      description:
        'Connect with top companies, land internships, and explore high-impact job opportunities. Get noticed by hiring partners actively seeking fresh, skilled talent.',
      image:
        '/assets/roles_images/career-growth.svg',
    },
    {
      id: 3,
      name: 'Collaborative Learning Experience',
      description:
        'Learn alongside peers and industry experts in an interactive, knowledge-sharing environment. Develop critical problem-solving skills while staying ahead with the latest tech trends.',
      image:
        '/assets/roles_images/learning.svg',
      },
      {
        id: 4,
        name: 'Recognized Certifications & Skill Validation',
        description:
        'Earn industry-recognized certifications and verifiable credentials that enhance your professional profile. Stand out in a competitive job market with proof of your expertise.',
        image:
        '/assets/roles_images/certifications.svg',
      },
    ],
    community: [
      {
        id: 1,
        name: 'Expand Your Network & Build Connections',
        description:
        'Engage with a vibrant community of like-minded individuals and industry professionals. Grow your network, discover collaboration opportunities, and build lasting relationships that drive career success.',
        image:
        '/assets/roles_images/networking.svg',
      },
      {
        id: 2,
        name: 'Knowledge Sharing & Industry Insights',
        description:
        'Exchange ideas, best practices, and innovative solutions with experts and peers. Stay updated on the latest trends, emerging technologies, and industry advancements.',
        image:
        '/assets/roles_images/knowledgesharing.svg',
      },
      {
        id: 3,
        name: 'Collaborative Projects & Real-World Impact',
        description:
        'Join forces with community members to work on impactful projects that shape the tech ecosystem. Gain hands-on experience, enhance problem-solving skills, and contribute to meaningful innovations.',
        image:
        '/assets/roles_images/collaboration.svg',
      },
      {
        id: 4,
        name: 'Mentorship & Career Guidance',
        description:
        'Access mentorship from industry leaders while also giving back by guiding others. Gain valuable insights, career advice, and professional support to accelerate personal and professional growth.',
        image:
        '/assets/roles_images/mentorship.svg',
    },
  ],
  enabler: [
    {
      id: 1,
      name: 'Resource Provision',
      description:
        'Facilitate access to cutting-edge tools and technologies, empowering learners with the resources they need to succeed.',
      image:
        'https://img.freepik.com/free-vector/digital-transformation_23-2148804417.jpg',
    },
    {
      id: 2,
      name: 'Skill Bridging',
      description:
        'Bridge the gap between academic learning and industry demands by providing practical, hands-on training modules.',
      image:
        'https://img.freepik.com/free-vector/technology-innovation_23-2148812878.jpg',
    },
    {
      id: 3,
      name: 'Innovative Platforms',
      description:
        'Deploy innovative platforms that support creative learning, foster collaboration, and drive digital transformation.',
      image:
        'https://img.freepik.com/free-vector/businessman-using-digital-tablet_74855-6340.jpg',
    },
    {
      id: 4,
      name: 'Community Support',
      description:
        'Invest in a thriving ecosystem by supporting initiatives that benefit all members of the learning community.',
      image:
        'https://img.freepik.com/free-vector/customer-support-concept-illustration_114360-5090.jpg',
    },
  ],
};




const RolesSection: React.FC = () => {
  const [activeRole, setActiveRole] = useState<string>('partner');

  return (
    <motion.section
      className={styles.rolesSection}
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {/* Section Header */}
      <motion.div className={styles.header} variants={fadeInUp}>
        <h1>Roles in Mulearn Network</h1>
        <h6>A brief overview of the diverse roles that power our network.</h6>
      </motion.div>

      {/* Navigation Bar */}
      <motion.nav className={styles.navBar} variants={fadeInUp}>
        <ul>
          {roles.map((role: Role) => (
            <li
              key={role.id}
              className={`${styles.navItem} ${activeRole === role.id ? styles.active : ''}`}
              onClick={() => setActiveRole(role.id)}
            >
              {role.label}
            </li>
          ))}
        </ul>
      </motion.nav>

      {/* Role Content (Apple-like grid with 6 items) */}
      <motion.div className={styles.roleContent} variants={fadeInUp}>
        {rolesContent[activeRole].map((item: RoleItem) => (
          <motion.div key={item.id} className={styles.roleItem} variants={fadeInUp}>
            <img src={item.image} alt={item.name} className={styles.roleImage} />
            <h6 className={styles.roleTitle}>{item.name}</h6>
            <p className={styles.roleDesc}>{item.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
};

export default RolesSection;
