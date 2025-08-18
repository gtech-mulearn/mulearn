import React, { useState, useEffect, useRef, useCallback } from "react";
import ReactMarkdown from 'react-markdown';
import styles from "./LearningPathPage.module.css";
import CardCarousel from "../modules/CardCarousal";
import IGSelector from "../../InterestGroups/components/IGSelection/IGSelector";
import { getUserLog, getUserProfile } from "../../Profile/services/api";
import MuLoader from "@/MuLearnComponents/MuLoader/MuLoader";
import { useUserStore } from "/src/ZustandProvider";
import { ApiResponse, Task, Level, getUserTasks, getUserIgTasks, getStartLearningTasks, getBecomeExpertTasks, getIgDisplayName } from "../services/api";
import ConnectDiscord from "../../ConnectDiscord/pages/ConnectDiscord";
import { privateGateway } from "@/MuLearnServices/apiGateways";
import { dashboardRoutes } from "@/MuLearnServices/urls";
import { isEqual } from 'lodash';
import toast from "react-hot-toast";
import channelmap from "../data/channelmap";

// Utility function to strip markdown formatting for card preview
const stripMarkdown = (markdown: string): string => {
  return markdown
    .replace(/[#*_`~]/g, '') // Remove markdown characters
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Convert links to text
    .replace(/\n+/g, ' ') // Replace newlines with spaces
    .trim();
};

interface InterestGroup {
  id: string;
  name: string; 
  karma: number;
}

interface OffCanvasProps {
  isOpen: boolean;
  onClose: () => void;
  data: any;
}

export const OffCanvas: React.FC<OffCanvasProps> = ({ isOpen, onClose, data }) => {
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

        {data.locked &&

          <div className={styles.locked}>

            <div>Locked</div>

            <p>Please unlock level {Number(data.level) - 1} to unlock </p>

          </div>
        }

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
                <div className={styles.markdownContent}>
                  <ReactMarkdown>{data.brief}</ReactMarkdown>
                </div>
              </div>
            </div>

            {/* Interest Group & Skills */}
            <div className={styles.offCanvasSection}>
              <h3 className={styles.offCanvasSectionTitle}>Interest Group</h3>
              <div className={styles.offCanvasSectionContent}>
                <p>{data.ig}</p>
                {data.hashtag && (
                  <div style={{ marginBottom: "10px" }}>
                    <strong>Hashtag:</strong>{" "}
                    <span
                      className={styles.skillPill}
                      style={{
                        backgroundColor: "#F3F4F6",
                        color: "#374151",
                      }}
                    >
                      {data.hashtag}
                    </span>
                  </div>
                )}
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
            {data.resources && data.resources.length > 0 && ( 
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
            )}

            <div className={styles.offCanvasSection}>
              
              {data.hashtag === "#ge-self-intro" ? <button className={styles.proofOfWorkButton}><a href="https://discord.com/channels/832894680290809354/771680366590689330" target="_blank"> Submit self introduction</a></button> : <button className={styles.proofOfWorkButton}><a href={data.discord_link} target="_blank"> Submit proof of work</a></button>}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

interface TaskCardProps {
  task?: Task;
  onClickCTA: (task: Task) => void;
  custom?: Boolean;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, onClickCTA, custom }) => {
  if (!task) return null;

  const skillColors = [
    "#FFB6C1",
    "#87CEFA", 
    "#90EE90",
    "#F5DEB3",
    "#FFDAB9",
    "#DDA0DD",
  ];

  return (
    <div className={`${styles.card} ${task.completed ? styles.completedCard : styles.pendingCard}`} 
         style={custom ? { minHeight: 'auto' } : {}} 
         onClick={() => onClickCTA(task)}>
      <div className={styles.cardContent}>
        {!custom && (
          <div className={styles.cardIcon}>
            {task.completed ? (
              <span
                className={styles.skillPill}
                style={{
                  backgroundColor: "#bbf7d0",
                  margin: 0,
                }}
              >
                completed
              </span>
            ) : (
              <span
                className={styles.skillPill}
                style={{
                  color: "black",
                  backgroundColor: "#fde68a",
                  margin: 0,
                }}
              >
                pending
              </span>
            )}
          </div>
        )}
        <div className={styles.cardTitle} style={custom ? { textAlign: "left" } : {}}>
          {task.task_name || task.title}
        </div>
        <div className={styles.cardDesc} style={custom ? { textAlign: "left" } : {}}>
          {task.task_description ? stripMarkdown(task.task_description).slice(0, 40) + "..." : `Earn ${task.karma} Karma Points`}
        </div>
        <div className={styles.cardIg} style={custom ? { textAlign: "left" } : {}}>
          <strong>IG:</strong> {task.ig || getIgDisplayName(task.hashtag)}
        </div>
        {task.hashtag && (
          <div className={styles.cardHashtag} style={custom ? { textAlign: "left" } : {}}>
            <strong>Hashtag:</strong>{" "}
            <span
              className={styles.skillPill}
              style={{
                backgroundColor: "#F3F4F6",
                color: "#374151",
              }}
            >
              {task.hashtag}
            </span>
          </div>
        )}
        <div className={styles.cardSkills}>
          <strong>Skills:</strong>{" "}
          <span
            className={styles.skillPill}
            style={{
              backgroundColor: "#EEF2FF",
            }}
          >
            Skill Development
          </span>
        </div>
      </div>
      <button className={styles.viewButton} onClick={(e) => {
        e.stopPropagation();
        onClickCTA(task);
      }}>
        View
      </button>
    </div>
  );
};

const LearningPathPage: React.FC = () => {
  const { userProfile, userInfo, setUserProfile } = useUserStore();
  const [activeTab, setActiveTab] = useState<"startLearning" | "becomeExpert">("startLearning");
  const [basicLevelData, setBasicLevelData] = useState<Level[] | null>(null);
  const [intermediateLevelData, setIntermediateLevelData] = useState<Level[] | null>(null);
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

  const [filter, setFilter] = useState<"all" | "completed" | "incomplete">("all");

  const fetchUserIGs = useCallback(async () => {
    if (userProfile && "interest_groups" in userProfile) {
      const userIGsData = (userProfile as { interest_groups: any[] }).interest_groups || [];
      return;
    }
    setIsLoading(true);
    let userIGsData = useUserStore.getState().userProfile.interest_groups || [];
    const currentLevel = Number(useUserStore.getState().userProfile.level?.replace("lvl", "")) || 0;

    try {
      if (currentLevel < 4) {
        userIGsData = [];
        setIsLoading(false);
        return userIGsData;

      }else if(userProfile as { interest_groups: any[] }){
        userIGsData = (userProfile as { interest_groups: any[] }).interest_groups || [];
        return;
      }
    } catch (error) {
      console.error("Failed to refetch user profile:", error);
      userIGsData = [];
    } finally {
      setIsLoading(false);
    }

    return userIGsData;
  }, []);

  const unlockedLevel = Number(userProfile.level?.replace("lvl", "")) || 0;

  const fetchIntermediateTasks = useCallback(async () => {
    setIsLoading(true);
    const currentLevel = unlockedLevel;

    if (currentLevel < 4 || !userIGs.length) {
      setIntermediateLevelData([]);
      setIsLoading(false);
      return;
    }
    if (unlockedLevel >= 4 && userIGs.length === 0) {
      toast.error("You need to join an interest group to access these tasks");
      setIntermediateLevelData([]);
      setIsLoading(false);
      return;
    }

    try {
      const response = await getBecomeExpertTasks(userIGs, selectedIg.id || undefined);
      setIntermediateLevelData(response);
    } catch (error) {
      console.error("Error fetching intermediate tasks:", error);
      setIntermediateLevelData([]);
    } finally {
      setIsLoading(false);
    }
  }, [userIGs, selectedIg, unlockedLevel]);

  useEffect(() => {
    fetchIntermediateTasks();
  }, [fetchIntermediateTasks]);

  useEffect(() => {
    setIsLoading(true);
    const fetchBasicLevels = async () => {
      try {
        const response = await getStartLearningTasks(); // Get tasks without #cl- hashtags
        setBasicLevelData(response);
      } catch (error) {
        console.error("Error fetching basic levels:", error);
        setBasicLevelData([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBasicLevels();
  }, []);

  useEffect(() => {
    setIsLoading(true);
    const fetchUserData = async () => {
      try {
        await Promise.all([
          fetchUserIGs(), // Fetch IG data here
        ]);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUserData();
  }, []);

  useEffect(() => {
    const activeElement = tabRefs.current[activeTab];
    if (activeElement) {
      setIndicatorStyle({
        left: activeElement.offsetLeft,
        width: activeElement.offsetWidth,
      });
    }
  }, [activeTab]);

  const handleOpenOffCanvas = (data: Task, levelNum?: number) => {
    const isLocked = levelNum ? levelNum > unlockedLevel : false;
    
    // Transform task data for OffCanvas component
    const formattedData = {
      title: data.task_name || data.title,
      brief: data.task_description || `Complete the ${data.task_name || data.title} task and share your progress with ${data.hashtag} to earn ${data.karma} Karma Points.`,
      ig: data.ig || getIgDisplayName(data.hashtag), 
      skills: ["Skill Development"],
      publishedBy: "µLearn Foundation",
      prerequisites: ["Basic knowledge"],
      resources: data.discord_link ? [data.discord_link] : [],
      hashtag: data.hashtag,
      discord_link: channelmap[data.ig as keyof typeof channelmap] || channelmap["taskdrop-box"] || "https://discord.com/channels/771670169691881483/",
      completed: data.completed,
      karma: data.karma,
      locked: isLocked,
      level: levelNum
    };
    
    setSelectedData(formattedData);
    setOffCanvasOpen(true);
  };

  const handleCloseOffCanvas = () => {
    setOffCanvasOpen(false);
    setSelectedData(null);
  };

  if (basicLevelData === null && intermediateLevelData === null) {
    return <MuLoader />;
  }

  // Helper function to filter tasks based on completion status
  const filterTasks = (tasks: Task[]) => {
    return tasks.filter((task) => {
      if (filter === "all") return true;
      if (filter === "completed") return task.completed;
      if (filter === "incomplete") return !task.completed;
      return true;
    });
  };

  // Get level metadata
  const getLevelMetadata = (levelKey: string) => {
    const levelNum = parseInt(levelKey.replace("lvl", ""));
    const metadata: Record<string, { title: string; subtitle: string }> = {
      "lvl1": { title: "Level 1", subtitle: "Fundamentals and OnBoarding" },
      "lvl2": { title: "Level 2", subtitle: "Practice GRIT and Keep Going" }, 
      "lvl3": { title: "Level 3", subtitle: "Advanced Skills" },
      "lvl4": { title: "Level 4", subtitle: "Master UI Fundamentals with Figma" },
      "lvl5": { title: "Level 5", subtitle: "Build Complex UI Components" },
      "lvl6": { title: "Level 6", subtitle: "Create Advanced Prototypes and Interactions" },
      "lvl7": { title: "Level 7", subtitle: "Advanced Projects" },
    };
    return metadata[levelKey] || { title: `Level ${levelNum}`, subtitle: `Level ${levelNum} Tasks` };
  };

  return (
    <div className={styles.container} >
      <div className={styles.topBar}>
        {unlockedLevel >= 4 ? (
          <div className={styles.topBarPart}>
            <button
              className={`${styles.topBarButton} ${
                activeTab === "startLearning" ? styles.activeTab : ""
              }`}
              onClick={() => setActiveTab("startLearning")}
            >
              Start Journey
            </button>
            <button
              className={`${styles.topBarButton} ${
                activeTab === "becomeExpert" ? styles.activeTab : ""
              }`}
              onClick={() => setActiveTab("becomeExpert")}
            >
              Become Expert
            </button>
          </div>
        ) : (
          <div></div>
        )}
        <div className={styles.filterContainer}>
          <label htmlFor="filter">Filter by:</label>  
          <select
            id="filter"
            value={filter}
            onChange={(e) => setFilter(e.target.value as "all" | "completed" | "incomplete")}
            className={styles.filterSelect}
          >
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="incomplete">Incomplete</option>
          </select>
        </div>
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
        <div>
          <MuLoader />
        </div>
      ) : (
        <>
          {activeTab === "startLearning" && basicLevelData && basicLevelData.map((level) => {
            const metadata = getLevelMetadata(level.name);
            const levelNum = parseInt(level.name.replace("lvl", ""));
            const filteredTasks = filterTasks(level.tasks);
            
            if (filteredTasks.length === 0) return null;

            return (
              <div key={level.name} className={styles.levelSection}>
                <h2>{metadata.title}</h2>
                <h4 className={styles.levelSubtitle}>{metadata.subtitle}</h4>
                <div className={`${styles.cardsContainer}`}>
                  <CardCarousel>
                    {filteredTasks.map((task, index) => (
                      <div key={`${task.hashtag}-${index}`}>
                        <TaskCard 
                          task={task} 
                          onClickCTA={() => handleOpenOffCanvas(task, levelNum)} 
                        />
                      </div>
                    ))}
                  </CardCarousel>
                </div>
              </div>
            );
          })}

          {activeTab === "becomeExpert" && intermediateLevelData && (
            <>
              {intermediateLevelData.map((level) => {
                const metadata = getLevelMetadata(level.name);
                const levelNum = parseInt(level.name.replace("lvl", ""));
                const filteredTasks = filterTasks(level.tasks);
                
                if (filteredTasks.length === 0) return null;

                return (
                  <div key={level.name} className={styles.levelSection}>
                    <h2>{metadata.title}</h2>
                    <h4 className={styles.levelSubtitle}>{metadata.subtitle}</h4>
                    <div className={`${styles.cardsContainer}`}>
                      <CardCarousel>
                        {filteredTasks.map((task, index) => (
                          <div key={`${task.hashtag}-${index}`}>
                            <TaskCard 
                              task={task} 
                              onClickCTA={() => handleOpenOffCanvas(task, levelNum)} 
                            />
                          </div>
                        ))}
                      </CardCarousel>
                    </div>
                  </div>
                );
              })}
            </>
          )}

          {((activeTab === "startLearning" && (!basicLevelData || basicLevelData.length === 0)) ||
            (activeTab === "becomeExpert" && (!intermediateLevelData || intermediateLevelData.length === 0))) && (
            <div className="text-center">No tasks available</div>
          )}
        </>
      )}

      <OffCanvas isOpen={offCanvasOpen} onClose={handleCloseOffCanvas} data={selectedData} />
    </div>
  );
};

export default LearningPathPage;