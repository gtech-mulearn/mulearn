// ManageAchievements.tsx - Achievement Management Hub
import React from 'react';
import styles from '../Management/Pages/ManagementPage.module.css';
import { useNavigate } from 'react-router-dom';

// Define the achievement management subcategories
const subcategories = [
    {
        icon: '🏆',
        title: 'Achievement Definitions',
        description: 'Create, edit, and manage achievement definitions.',
        path: "management/manage-achievements/definitions",
    },
    {
        icon: '📋',
        title: 'Rule Engine',
        description: 'Configure automated rules for achievement eligibility.',
        path: "management/manage-achievements/rules",
    },
    {
        icon: '🔍',
        title: 'Simulate & Debug',
        description: 'Test rule evaluations and debug user eligibility.',
        path: "management/manage-achievements/simulate",
    },
    {
        icon: '📜',
        title: 'Audit Logs',
        description: 'View complete history of achievement operations.',
        path: "management/manage-achievements/audit",
    },
    {
        icon: '🎁',
        title: 'Manual Operations',
        description: 'Manually issue or revoke achievements for users.',
        path: "management/manage-achievements/manual",
    },
];

const ManageAchievements: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className={styles.container}>
            <h1 className={styles.pageTitle}>🏆 Achievement Management</h1>
            <p className={styles.pageSubtitle}>Central hub for managing achievements, rules, and user rewards</p>

            {/* Card Layout */}
            <div className={styles.cardContainer}>
                {subcategories.map((category, index) => (
                    <div
                        key={index}
                        className={styles.card}
                        onClick={() => {
                            navigate(`/dashboard/${category.path}`);
                        }}
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

export default ManageAchievements;