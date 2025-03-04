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
      name: 'Resource Sharing',
      description:
        'Provide your tools, platforms, and expertise for free while tapping into pre-trained talent. Save onboarding time and scale your projects efficiently.',
      image:
      '/assets/roles_images/Podcast_Social.png',
    },
    {
      id: 2,
      name: 'Product Launch',
      description:
        'Introduce your products directly to a community of curious, tech-savvy developers, accelerating your market reach and user feedback.',
      image:
      '/assets/roles_images/Creative_Writing.png',
    },
    {
      id: 3,
      name: 'Talent Recruitment',
      description:
        'Hire pre-trained, motivated developers who are ready to contribute from day one—reducing training costs and speeding up project delivery.',
      image:
      '/assets/roles_images/Business_Woman.png',
    },
    {
      id: 4,
      name: 'Brand Engagement',
      description:
      'Enhance your brand reputation by actively participating in a free learning community and nurturing long-term relationships with future innovators.',
      image:
      '/assets/roles_images/Online_Support.png',
    },
  ],
  learner: [
    {
      id: 1,
      name: 'Skill Development',
      description:
        'Gain hands-on experience with real-world projects and training modules to build a strong technical foundation.',
      image:
        'https://img.freepik.com/free-vector/online-education-concept-illustration_114360-5364.jpg',
    },
    {
      id: 2,
      name: 'Career Opportunities',
      description:
        'Connect with top companies, secure internships, and explore job opportunities with partners looking for fresh talent.',
      image:
        'https://img.freepik.com/free-vector/learning-online-concept-illustration_114360-5258.jpg',
    },
    {
      id: 3,
      name: 'Collaborative Learning',
      description:
        'Engage with peers and experts in a collaborative environment that fosters growth, innovation, and lifelong learning.',
      image:
        '/assets/roles_images/trendy.png',
      },
      {
        id: 4,
        name: 'Verifiable Credits',
        description:
        'Earn certifications and gain recognition for your skills, making your profile stand out in the competitive job market.',
        image:
        '/assets/roles_images/ideo-call.png',
      },
    ],
    community: [
      {
        id: 1,
        name: 'Networking',
        description:
        'Connect with like-minded individuals and professionals to expand your network and foster future collaborations.',
        image:
        '/assets/roles_images/ideo-call.png',
      },
      {
        id: 2,
        name: 'Knowledge Sharing',
        description:
        'Exchange ideas, best practices, and innovative solutions to drive collective growth and industry evolution.',
        image:
        '/assets/roles_images/cartoon-teacher.png',
      },
      {
        id: 3,
        name: 'Collaborative Projects',
        description:
        'Work together on meaningful projects that impact the tech ecosystem while learning and growing as a community.',
        image:
        'https://img.freepik.com/free-vector/people-community-concept-illustration_114360-622.jpg',
      },
      {
        id: 4,
        name: 'Mentorship & Guidance',
        description:
        'Provide and receive mentorship that inspires personal and professional development throughout the community.',
        image:
        '/assets/roles_images/3d-cartoon-handsome.png',
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
