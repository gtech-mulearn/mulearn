import React, { useState, useEffect, useRef, useCallback } from "react";
import styles from "./LearningPathPage.module.css";
import CardCarousel from "../modules/CardCarousal";
import IGSelector from "../../InterestGroups/components/IGSelection/IGSelector";
import { getUserLog, getUserProfile } from "../../Profile/services/api";
import MuLoader from "@/MuLearnComponents/MuLoader/MuLoader";
import { useUserStore } from "/src/ZustandProvider";
import { FormattedLevel, getFilteredUserTasks, getUserIGFormattedTasks,  } from "../services/api";
import ConnectDiscord from "../../ConnectDiscord/pages/ConnectDiscord";
import { privateGateway } from "@/MuLearnServices/apiGateways";
import { dashboardRoutes } from "@/MuLearnServices/urls";
import { isEqual } from 'lodash';
import toast from "react-hot-toast";


interface OffCanvasProps {
  isOpen: boolean;
  onClose: () => void;
  data: any;
}

const OffCanvas: React.FC<OffCanvasProps> = ({ isOpen, onClose, data }) => {
  const offCanvasClass = isOpen
    ? `${styles.offCanvas} ${styles.offCanvasOpen}`
    : styles.offCanvas;

  if (!data) return null;

  const isSpecialLevel = data.interestGroups;
  console.log(data, "data");

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={offCanvasClass} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          Close
        </button>

        {isSpecialLevel ? (
          <div className={styles.offCanvasSection}>
            <h2 className={styles.offCanvasSectionTitle}>Special Pathway</h2>
            <div className={styles.offCanvasSectionContent}>
              <p>Select an interest group to continue levels 4–7:</p>
              {data.interestGroups?.length && data.interestGroups.map((ig: any) => (
                <div
                  key={ig.id}
                  style={{
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    padding: "8px",
                    marginBottom: "8px",
                  }}
                >
                  <strong>{ig.name}</strong> — {ig.description}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <>
            {/* Title & Description */}
            <div className={styles.offCanvasSection}>
              <h2 className={styles.offCanvasSectionTitle}>{data.title}</h2>
              <div className={styles.offCanvasSectionContent}>
                <p>{data.brief}</p>
              </div>
            </div>

            {/* Interest Group & Skills */}
            <div className={styles.offCanvasSection}>
              <h3 className={styles.offCanvasSectionTitle}>Interest Group</h3>
              <div className={styles.offCanvasSectionContent}>
                <p>{data.ig}</p>
                <strong>Skills:</strong>{" "}
                {data.skills?.map((skill: string) => (
                  <span key={skill} className={styles.skillPill}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Published Info */}
            <div className={styles.offCanvasSection}>
              <h3 className={styles.offCanvasSectionTitle}>Published Info</h3>
              <div className={styles.offCanvasSectionContent}>
                <p>
                  <strong>By:</strong> {data.publishedBy}
                </p>
                {/* <p>
                  <strong>When:</strong> {data.publishedWhen}
                </p> */}
              </div>
            </div>

            {/* Prerequisites */}
            <div className={styles.offCanvasSection}>
              <h3 className={styles.offCanvasSectionTitle}>Prerequisites</h3>
              <div className={styles.offCanvasSectionContent}>
                <ul>
                  {data.prerequisites?.map((preq: string, i: number) => (
                    <li key={i}>{preq}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Resources */}
            <div className={styles.offCanvasSection}>
              <h3 className={styles.offCanvasSectionTitle}>Resources</h3>
              <div className={styles.offCanvasSectionContent}>
                <ul>
                  {data.resources?.map((link: string, i: number) => (
                    <li key={i}>
                      <a href={link} target="_blank" rel="noopener noreferrer">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className={styles.offCanvasSection}>
              <button className={styles.proofOfWorkButton}><a href={data.discord_link} target="_blank"> Submit proof of work</a></button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

interface TaskCardProps {
  card: any;
  onClickCTA: () => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ card, onClickCTA }) => {
  const skillColors = [
    "#FFB6C1",
    "#87CEFA",
    "#90EE90",
    "#F5DEB3",
    "#FFDAB9",
    "#DDA0DD",
  ];

  return (
    <div className={`${styles.card} ${card.completed ? styles.completedCard : ""}`}>
      <div className={styles.cardContent}>
        <div className={styles.cardIcon}>
          {card.completed ? (
            <i className="fi fi-rr-check-circle" style={{ color: "#28a745" }}></i>
          ) : (
            card.icon || <i className="fi fi-rr-circle"></i>
          )}
        </div>
        <div className={styles.cardTitle}>{card.title}</div>
        <div className={styles.cardDesc}>{card.desc}</div>
        <div className={styles.cardIg}>
          <strong>IG:</strong> {card.ig}
        </div>
        <div className={styles.cardSkills}>
          <strong>Skills:</strong>{" "}
          {card.skills?.map((skill: string, index: number) => (
            <span
              key={skill}
              className={styles.skillPill}
              style={{
                backgroundColor: skillColors[index % skillColors.length],
              }}
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
      <button className={styles.viewButton} onClick={onClickCTA}>
        View
      </button>
    </div>
  );
};

const HASHTAGSLEVL1TO3 = [
  "#ge-discord-guide",
  "#ge-self-intro",
  "#ge-snakify-6",
  "#ge-my-blog",
  "#ge-find-better",
  "#ge-typing-challenge-126",
  "#ge-30-days-coding15",
  "#ge-snakify-6",
  "#dwms-muconnect",
  "#ge-game-deconstruction",
  "#ge-intro-to-github",
  "#ge-intro-to-markdown",
  "#ge-intro-to-command-line",
  "#ge-github-pages",
  "#ge-intro-to-html",
  "#ge-intro-to-scratch",
  "#ge-linux-fundamentals-1",
  "#ge-change-the-look",
  "#ge-website-redesign",
  "#ge-lowcode-cafe",
  "#ge-what-is-networking",
  "#ge-autocrat-automation",
  "#ge-linux-modules",
  "#ge-problemsolving",
  "#ge-game-deconstruction",
];

const LearningPathPage: React.FC = () => {
  const { userProfile, userInfo, setUserProfile } = useUserStore();
  const [activeTab, setActiveTab] = useState<"startLearning" | "becomeExpert">("startLearning");
  const [basicLevelData, setBasicLevelData] = useState<FormattedLevel[] | null>(null);
  const [intermediateLevelData, setIntermediateLevelData] = useState<FormattedLevel[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const tabRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({
    startLearning: null,
    becomeExpert: null,
  });

  const [indicatorStyle, setIndicatorStyle] = useState<{ left: number; width: number }>({
    left: 0,
    width: 0,
  });

  const [offCanvasOpen, setOffCanvasOpen] = useState(false);
  const [selectedData, setSelectedData] = useState<any | null>(null);
  const [userLog, setUserLog] = useState<any[]>([]);
  const [selectedIg, setSelectedIg] = useState<InterestGroup>({ id: "", name: "", karma: 0 });
  const userIGs = useUserStore((state) => state.userProfile.interest_groups || []);
  const userIGIDs = React.useMemo(() => userIGs.map((ig) => ig.id), [userIGs]);

  const fetchUserIGs = useCallback(async () => {
    setIsLoading(true);
    let userIGsData = useUserStore.getState().userProfile.interest_groups || [];
    const currentLevel = Number(useUserStore.getState().userProfile.level?.replace("lvl", "")) || 0;

    try {
        if (currentLevel < 4) {
            userIGsData = []; 
            setIsLoading(false);
            return userIGsData;
        } else if (!userIGsData.length) {
            const response = await privateGateway.get(dashboardRoutes.getUserProfile);
            console.log("Fetched user profile response:", response.data);
            setUserProfile(response.data.response);
            userIGsData = response.data.response.interest_groups || [];
            if (!userIGsData.length) {
                console.error("User has no interest groups");
            }
        }
    } catch (error) {
        console.error("Failed to refetch user profile:", error);
        userIGsData = [];
    } finally {
        setIsLoading(false);
    }

    return userIGsData;
}, [setUserProfile]);

  const unlockedLevel = Number(userProfile.level?.replace("lvl", "")) || 0;

  const fetchIntermediateTasks = useCallback(async () => {
    setIsLoading(true);
    const currentLevel = unlockedLevel; 

    if (currentLevel < 4 || !userIGIDs.length) {
        setIntermediateLevelData([{
            level: 4,
            title: "Level 4",
            subtitle: "You need to reach Level 4 to access these tasks and join Interest Groups",
            cards: [],
            progress: { 
                level: 4, 
                completedTasks: 0, 
                totalTasks: 0, 
                requiredKarma: 0, 
                earnedKarma: 0 
            },
            isUnlocked: false
        }]);
        setIsLoading(false);
        return;
    }
    if (unlockedLevel >= 4 && userIGIDs.length === 0) {
      toast.error("You need to join an interest group to access these tasks");
      setIntermediateLevelData([]); 
      setIsLoading(false);
      return;
  }

    try {
        const response = await getUserIGFormattedTasks(userIGIDs, unlockedLevel);
        let processedLevels: FormattedLevel[] = [];

        if (selectedIg.id) {
            processedLevels = response[selectedIg.id] || [];
        } else {
            const levelMap: Record<number, FormattedLevel> = {
                4: {
                    level: 4,
                    title: "Level 4",
                    subtitle: "Level 4 Tasks",
                    cards: [],
                    progress: { level: 4, completedTasks: 0, totalTasks: 0, requiredKarma: 0, earnedKarma: 0 },
                    isUnlocked: 4 <= unlockedLevel,
                },
                5: {
                    level: 5,
                    title: "Level 5",
                    subtitle: "Level 5 Tasks",
                    cards: [],
                    progress: { level: 5, completedTasks: 0, totalTasks: 0, requiredKarma: 0, earnedKarma: 0 },
                    isUnlocked: 5 <= unlockedLevel,
                },
                6: {
                    level: 6,
                    title: "Level 6",
                    subtitle: "Level 6 Tasks",
                    cards: [],
                    progress: { level: 6, completedTasks: 0, totalTasks: 0, requiredKarma: 0, earnedKarma: 0 },
                    isUnlocked: 6 <= unlockedLevel,
                },
                7: {
                    level: 7,
                    title: "Level 7",
                    subtitle: "Level 7 Tasks",
                    cards: [],
                    progress: { level: 7, completedTasks: 0, totalTasks: 0, requiredKarma: 0, earnedKarma: 0 },
                    isUnlocked: 7 <= unlockedLevel,
                },
            };

            Object.values(response).forEach((igLevels) => {
                igLevels.forEach((level) => {
                    if (levelMap[level.level]) {
                        levelMap[level.level].cards = [...levelMap[level.level].cards, ...level.cards];
                        levelMap[level.level].progress.totalTasks = levelMap[level.level].cards.length;
                        levelMap[level.level].progress.completedTasks = levelMap[level.level].cards.filter(
                            (card) => card.completed
                        ).length;
                        levelMap[level.level].progress.earnedKarma = levelMap[level.level].cards
                            .filter((card) => card.completed)
                            .reduce((sum, card) => sum + (card.karma || 0), 0);
                    }
                });
            });

            processedLevels = Object.values(levelMap)
                .filter((level) => level.cards.length > 0)
                .sort((a, b) => a.level - b.level);
        }

        setIntermediateLevelData(processedLevels);
    } catch (error) {
        console.error("Error fetching intermediate tasks:", error);
        setIntermediateLevelData([]);
    } finally {
        setIsLoading(false);
    }
}, [userIGIDs, selectedIg, unlockedLevel]);

  useEffect(() => {
    fetchIntermediateTasks();
  }, [fetchIntermediateTasks]);

 

useEffect(() => {
  setIsLoading(true);
  const fetchBasicLevels = async () => {
    try {
      const response = await getFilteredUserTasks(HASHTAGSLEVL1TO3);
      const newData = response.map((level) => ({
        ...level,
        isUnlocked: level.level <= unlockedLevel,
      }));

      setBasicLevelData((prev) => {
        if (!prev) return newData;

        const prevCompleted = prev.map((level) => ({
          id: level.level,
          completed: level.cards?.map((card) => card.completed) || [],
        }));
        const newCompleted = newData.map((level) => ({
          id: level.level,
          completed: level.cards?.map((card) => card.completed) || [],
        }));
        return isEqual(prevCompleted, newCompleted) ? prev : newData;
      });
    } catch (error) {
      console.error("Error fetching basic levels:", error);
      setBasicLevelData([]);
    } finally {
      setIsLoading(false);
    }
  };
  fetchBasicLevels();
}, [unlockedLevel]);

  useEffect(() => {
    setIsLoading(true);
    const fetchUserData = async () => {
      try {
        await Promise.all([
          getUserProfile(setUserProfile, () => {}, () => {}),
          getUserLog(setUserLog),
          fetchUserIGs(), // Fetch IG data here
        ]);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUserData();
  }, [setUserProfile, fetchUserIGs]);

  useEffect(() => {
    const activeElement = tabRefs.current[activeTab];
    if (activeElement) {
      setIndicatorStyle({
        left: activeElement.offsetLeft,
        width: activeElement.offsetWidth,
      });
    }
  }, [activeTab]);

  const handleOpenOffCanvas = (data: any) => {
    setSelectedData(data);
    setOffCanvasOpen(true);
  };

  const handleCloseOffCanvas = () => {
    setOffCanvasOpen(false);
    setSelectedData(null);
  };

  const levelsToRender = activeTab === "startLearning" ? basicLevelData : intermediateLevelData;

  if (levelsToRender === null) {
    return <MuLoader />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.topBar}>
        <div className={styles.indicator} style={{ left: indicatorStyle.left, width: indicatorStyle.width }} />
        <button
          ref={(el) => (tabRefs.current.startLearning = el)}
          className={`${styles.topBarButton} ${activeTab === "startLearning" ? styles.activeTab : ""}`}
          onClick={() => setActiveTab("startLearning")}
        >
          Start Journey
        </button>
        <button
          ref={(el) => (tabRefs.current.becomeExpert = el)}
          className={`${styles.topBarButton} ${activeTab === "becomeExpert" ? styles.activeTab : ""}`}
          onClick={() => setActiveTab("becomeExpert")}
        >
          Become Expert
        </button>
      </div>

      {activeTab === "becomeExpert" && (
        <div style={{ marginBottom: "2rem", marginTop: "2rem" }}>
          <IGSelector
            userProfile={userProfile}
            selectedIg={selectedIg}
            setSelectedIg={setSelectedIg}
            userLog={userLog}
            igs={userIGs}
            isProfilePage={false}
            setUserProfile={setUserProfile}
          />
        </div>
      )}

      {activeTab === "startLearning" && !userInfo.exist_in_guild && (
        <div className={styles.levelSection}>
          <h2>Level 0</h2>
          <h4 className={styles.levelSubtitle}>Connect to our Discord server to start your journey!</h4>
          <ConnectDiscord />
        </div>
      )}

      {isLoading ? (
        <div >
        <MuLoader />
        </div>
      ) : levelsToRender.length > 0 && (
        levelsToRender.map((level) => {
          const isLocked = level.level > unlockedLevel;
          return (
            <div key={level.level} className={styles.levelSection}>
              <h2>Level {level.level}</h2>
              <h4 className={styles.levelSubtitle}>{level.subtitle}</h4>
              {isLocked && (
                <div className={styles.unlockTaskSection}>
                  <p className={styles.lockedText}>Complete Level {level.level - 1} to unlock</p>
                  {level.leveller && (
                    <button onClick={() => handleOpenOffCanvas(level.leveller)}>Unlock now</button>
                  )}
                </div>
              )}
              <div className={`${styles.cardsContainer} ${isLocked ? styles.locked : ""}`}>
                {level.cards && level.cards.length > 0 && (
                  <CardCarousel>
                    {level.cards.map((card: any) => (
                      <div key={card.id} className={isLocked ? styles.lockedCard : ""}>
                        {isLocked && (
                          <div className={styles.lockedRibbon}>
                            Complete Level {level.level - 1} to unlock
                          </div>
                        )}
                        <TaskCard card={card} onClickCTA={() => handleOpenOffCanvas(card)} />
                      </div>
                    ))}
                  </CardCarousel>
                )}
              </div>
            </div>
          );
        })
      )}
      {levelsToRender.length === 0 && (
        <div className="text-center">No tasks available</div>
      )}

      <OffCanvas isOpen={offCanvasOpen} onClose={handleCloseOffCanvas} data={selectedData} />
    </div>
  );
};

export default LearningPathPage;