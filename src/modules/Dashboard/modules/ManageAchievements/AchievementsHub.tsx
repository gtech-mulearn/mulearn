// AchievementsHub.tsx - Hub page for all achievement-related features
import React from 'react';
import styles from '../../modules/Management/Pages/ManagementPage.module.css';
import { useNavigate } from 'react-router-dom';

const subcategories = [
    {
        icon: '🏆',
        title: 'Achievements List',
        description: 'View, create, edit, and delete achievements.',
        path: 'management/achievements/list'
    },
    {
        icon: '⚙️',
        title: 'Achievement Rules',
        description: 'Configure eligibility rules for achievements.',
        path: 'management/achievements/rules'
    },
    {
        icon: '🎯',
        title: 'Manage Skills',
        description: 'Create and manage skills for skill-based achievements.',
        path: 'management/manage-skills'
    },
    {
        icon: '🧪',
        title: 'Simulate',
        description: 'Test and simulate achievement eligibility for users.',
        path: 'management/achievements/simulate'
    },
    {
        icon: '📊',
        title: 'Issue Logs',
        description: 'View achievement issuance history and logs.',
        path: 'management/achievements/logs'
    },
    {
        icon: '🎁',
        title: 'Bulk Issue',
        description: 'Issue achievements to multiple users at once.',
        path: 'management/achievements/bulk-issue'
    },
    {
        icon: '📈',
        title: 'Analytics',
        description: 'View achievement statistics and user progress.',
        path: 'management/achievements/analytics'
    }
];

const AchievementsHub: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className={styles.container}>
            <h1 className={styles.pageTitle}>Achievements</h1>
            <p className={styles.pageSubtitle}>Manage all achievement-related features</p>

            <div className={styles.cardContainer}>
                {subcategories.map((category, index) => (
                    <div
                        key={index}
                        className={styles.card}
                        onClick={() => navigate(`/dashboard/${category.path}`)}
                    >
                        <span className={styles.cardIcon}>{category.icon}</span>
                        <h3 className={styles.cardTitle}>{category.title}</h3>
                        <p className={styles.cardDescription}>{category.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AchievementsHub;
