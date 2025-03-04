import React from 'react';
import styles from './ManagementPage.module.css';
import { useNavigate } from 'react-router-dom';

// Define the subcategories data for MuLearn Foundation Dashboard
const subcategories = [
  {
    icon: '👤',
    title: 'User Management: Manage Users',
    description: 'Add, edit, and delete user accounts.',
    path: "management/user-management/manage-users"
  },
  {
    icon: '🔐',
    title: 'User Management: Role Verification',
    description: 'Verify and assign roles to users.',
    path: "management/user-management/user-role-verification"
  },
  {
    icon: '🛡️',
    title: 'User Management: Manage Roles',
    description: 'Create and configure user role permissions.',
    path: "management/manage-roles"
  },





  {
    icon: '🔗',
    title: 'Organization: Affiliation',
    description: 'Manage user affiliations with organizations.',
    path: "management/organization/affiliation"
  },
  {
    icon: '🔄',
    title: 'Organization: Transfer',
    description: 'Handle ownership transfers between organizations.',
    path: "management/organization/organization-transfer"
  },
  {
    icon: '🏢',
    title: 'Organization: Departments',
    description: 'Manage organizational departments and structure.',
    path: "management/organization/manage-departments"
  },
  {
    icon: '🏛️',
    title: 'Organization: Organizations',
    description: 'Create and manage organization profiles.',
    path: "management/organization/organizations"
  },
  {
    icon: '✅',
    title: 'Organization: Verification',
    description: 'Verify legitimacy of registered organizations.',
    path: "management/verify-organizations"
  },




  {
    icon: '👥',
    title: 'Community: Interest Groups',
    description: 'Manage user interest groups and categories.',
    path: "management/interest-groups"
  },
  {
    icon: '🤝',
    title: 'Community: Meetup Verification',
    description: 'Verify and approve community meetups.',
    path: "management/lc-meetup-verification"
  },
  {
    icon: '🎓',
    title: 'Community: College Levels',
    description: 'Manage educational levels and institutions.',
    path: "management/college-levels"
  },
  {
    icon: '📍',
    title: 'Community: Locations',
    description: 'Manage geographical locations for events and users.',
    path: "management/manage-locations"
  },
  {
    icon: '📢',
    title: 'Community: Channels',
    description: 'Configure communication channels.',
    path: "management/channels"
  },
  {
    icon: '🛠️',
    title: 'Community: Discord Moderation',
    description: 'Moderate and manage Discord integration.',
    path: "management/discord-moderation"
  },





  {
    icon: '🎟️',
    title: 'System: Karma Voucher',
    description: 'Manage karma point vouchers and distribution.',
    path: "management/karma-voucher"
  },
  {
    icon: '⚠️',
    title: 'System: Error Log',
    description: 'View and manage system error reports.',
    path: "management/error-log"
  },
  {
    icon: '⚙️',
    title: 'System: Dynamic Type',
    description: 'Configure dynamic content types.',
    path: "management/dynamic-type"
  },
  {
    icon: '🔗',
    title: 'System: URL Shortener',
    description: 'Create and manage shortened URLs.',
    path: "management/url-shortener"
  }
];

const ManagementPage: React.FC = () => {

  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <h1 className={styles.pageTitle}>Management</h1>
      <p className={styles.pageSubtitle}>Management Categories</p>

      {/* Card Layout */}
      <div className={styles.cardContainer}>
        {subcategories.map((category, index) => (
          <div key={index} className={styles.card} onClick={()=> {
            navigate(`/dashboard/${category.path}`);
          }}>
            <span className={styles.cardIcon}>{category.icon}</span>
            <h3 className={styles.cardTitle}>{category.title}</h3>
            <p className={styles.cardDescription}>{category.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManagementPage;