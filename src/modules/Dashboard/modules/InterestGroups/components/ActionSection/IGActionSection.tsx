// src/components/IGActionSection.tsx
import React, { useState } from 'react';
import styles from './IGActionSection.module.css';
import { InterestGroupData, CardData, LearningPath } from '../../data/interestGroups';
import Karma from '../../../Profile/assets/svg/Karma';
import AvgKarma from '../../../Profile/assets/svg/AvgKarma';
import Rank from '../../../Profile/assets/svg/Rank';
import UserCard from '/src/modules/Dashboard/components/UserCard';
import { useNavigate, useParams } from 'react-router-dom';
import LearningPathCard from '../LearningPathCard';
import LearningPathDetailPage from '../LearningPathDetailPage'; // Import the detail page component
import AsideDetails from '/src/modules/Dashboard/components/AsideDetails';

const IGActionSection = ({ data }: { data: InterestGroupData }) => {
  const tabNames = [
    "About",
    "Learning Paths",
    "IG Leads",
    "Mentors",
    "Blogs and People",
  ];
  const [activeTab, setActiveTab] = useState("About");
  const [selectedPath, setSelectedPath] = useState<{ level: string; card: LearningPath['cards'][0] } | null>(null); // State for selected learning path
  const [selectedUser, setSelectedUser] = useState<CardData | null>(null); // State for selected user (for aside)
  const [isAsideOpen, setIsAsideOpen] = useState(false); // State for aside visibility
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>(); // Get the interest group ID from URL

  // Log the id to debug
  // console.log('Current Interest Group ID:', id);

  const handleUserSelect = (cardData: CardData) => {
    setSelectedUser(cardData);
    setIsAsideOpen(true);
  };

  const handleAsideClose = () => {
    setIsAsideOpen(false);
    setSelectedUser(null);
  };

  const handlePathSelect = (level: string, card: LearningPath['cards'][0]) => {
    setSelectedPath({ level, card });
  };

  const handleBackToPaths = () => {
    setSelectedPath(null); // Go back to showing cards
  };

  const renderAsideContent = (user: CardData) => {
    const isThinkTank = !user.muid && !user.karma && user.role && user.expertise;
    const isRegularUser = user.muid || user.karma;

    const getPrimaryOrganization = () => {
      if (user.role) return user.role.split(",")[0] || "N/A";
      if (user.organizations) {
        const college = user.organizations.find((org) => org.org_type === "College");
        return college ? college.title : "N/A";
      }
      return "N/A";
    };

    const getExpertiseTags = () => {
      if (user.expertise) return user.expertise;
      return [];
    };

    return (
      <div className={styles.profileContainer}>
        <div className={styles.profileHeader}>
          <div className={styles.profileImageContainer}>
            <img
              src={user.profile_pic || user.image || "/placeholder.svg"}
              alt={user.name}
              className={styles.profileImage}
            />
          </div>
          {/* <div className={styles.memberSince}>Member since 2023</div> */}
          <button className={styles.connectBtn} onClick={handleAsideClose}>
            Close
          </button>
        </div>

        <div className={styles.profileInfo}>
          <h2 className={styles.profileName}>{user.name}</h2>
          {isRegularUser && user.muid && (
            <p className={styles.profileUsername}>{user.muid}</p>
          )}
          <p className={styles.profileCollegeName}>{getPrimaryOrganization()}</p>
          {isRegularUser && <p className={styles.profileLevel}>LEVEL 5</p>}
          {(isThinkTank || (!isRegularUser && user.expertise)) && (
            <div className={styles.expertiseTags}>
              {getExpertiseTags().length > 0 ? (
                getExpertiseTags().map((tag, index) => (
                  <span key={index} className={styles.expertiseTag}>
                    {tag}
                  </span>
                ))
              ) : (
                <span className={styles.noExpertiseTag}>No expertise listed</span>
              )}
            </div>
          )}
        </div>

        {isRegularUser && (
          <div className={styles.statsGrid}>
            <div className={styles.statsCard}>
              <Karma />
              <p className={styles.statsLabel}>Karma</p>
              <p className={styles.statsValue}>{user.karma || "0"}</p>
            </div>
            <div className={styles.statsCard}>
              <AvgKarma />
              <p className={styles.statsLabel}>Avg.Karma/Month</p>
              <p className={styles.statsValue}>1.156K</p>
            </div>
            <div className={styles.statsCard}>
              <Rank />
              <p className={styles.statsLabel}>Rank</p>
              <p className={styles.statsValue}>1</p>
            </div>
            <div className={styles.statsCard}>
              <Rank />
              <p className={styles.statsLabel}>Percentile</p>
              <p className={styles.statsValue}>0.29</p>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "About":
        return (
          <div className={`${styles.tabContent} ${styles.about}`}>
            <p>{data.tabs.about.description}</p>
            <p>
              Explore our resources here:{' '}
              <a
                className="!text-blue-600 cursor-pointer"
                onClick={() => navigate(data.tabs.about.foundationDeck)}
              >
                foundation deck
              </a>
            </p>
            <div className="flex flex-col justify-center items-start gap-4 flex-wrap">
              <div>
                <h3>Prerequisites</h3>
                <ul className={styles.prerequisitesList}>
                  {data.prerequisites.map((prerequisite, index) => (
                    <li key={index} className={styles.prerequisiteItem}>
                      {prerequisite}
                    </li>
                  ))}
                </ul>
              </div>
              <h3>Opportunities</h3>
              <div className="flex flex-col ">
                {data.tabs.about.opportunities.map((opportunity) => (
                  <div key={opportunity.title} className={styles.careerPath}>
                    <h4>{opportunity.title}</h4>
                    <p>{opportunity.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case "Learning Paths":
        return (
          <>
            {selectedPath ? (
              <LearningPathDetailPage
                level={selectedPath.level}
                card={selectedPath.card}
                onBack={handleBackToPaths} // Pass a callback to go back
              />
            ) : (
              <div className={styles.cardsContainer}>
                {!data.tabs.learningPaths ? (
                  <p>No learning paths available.</p>
                ) : (
                  data.tabs.learningPaths?.map((path: LearningPath) => (
                    <LearningPathCard
                      key={path.level}
                      id={id || ''}
                      level={path.level}
                      card={path.cards[0]}
                      onSelect={handlePathSelect} // Pass the selection handler
                    />
                  ))
                )}
                
              </div>
            )}
          </>
        );
      case "IG Leads":
        return (
          <div className={styles.cardsContainer}>
            {data.interestGroupLeads.leads?.map((person) => (
              <UserCard key={person.name} data={person} onSelect={handleUserSelect} />
            ))}
          </div>
        );
      case "Mentors":
        return (
          <div className={styles.cardsContainer}>
            {data.tabs.mentors?.map((person) => (
              <UserCard key={person.id} data={person} onSelect={handleUserSelect} />
            ))}
          </div>
        );
      case "Blogs and People":
        return (
          <div className={`${styles.tabContent} ${styles.blogsAndPeople}`}>
            <div className={styles.section}>
              <h3>Top Blogs to Follow</h3>
              <div className={styles.blogsContainer}>
                {data.blogsToFollow.map((blog, index) => (
                  <div key={index} className={styles.blogCard}>
                    <h4>{blog.name}</h4>
                    <a
                      href={blog.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.blogLink}
                    >
                      Visit Blog
                    </a>
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.section}>
              <h3>People to Follow</h3>
              <div className={styles.peopleContainer}>
                {data.peopleToFollow.map((person, index) => (
                  <div key={index} className={styles.personCard}>
                    <h4>{person.name}</h4>
                    <a
                      href={person.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.personLink}
                    >
                      Follow on LinkedIn
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <div className={styles.pageContainer}>
        <div className={styles.tabs}>
          {tabNames.map((tab) => (
            <button
              key={tab}
              className={`${styles.tabButton} ${activeTab === tab ? styles.activeTab : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className={styles.tabContentContainer}>{renderTabContent()}</div>
      </div>
      {/* <AsideDetails isOpen={isAsideOpen} handleClose={handleAsideClose}>
        {selectedUser && renderAsideContent(selectedUser)}
      </AsideDetails> */}
    </>
  );
};

export default IGActionSection;