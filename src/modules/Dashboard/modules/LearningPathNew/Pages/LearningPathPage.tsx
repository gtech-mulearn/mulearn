import React, { useState, useEffect, useRef, useCallback } from "react";
import ReactMarkdown from 'react-markdown';
import styles from "./LearningPathPage.module.css";
import CardCarousel from "../modules/CardCarousal";
import IGSelector from "../../InterestGroups/components/IGSelection/IGSelector";
import MuLoader from "@/MuLearnComponents/MuLoader/MuLoader";
import { useUserStore } from "/src/ZustandProvider";
import { Task, Level, getStartLearningTasks, getBecomeExpertTasks, getIgDisplayName, getEventTasks, checkAndClearStaleCache } from "../services/api";
import ConnectDiscord from "../../ConnectDiscord/pages/ConnectDiscord";
import toast from "react-hot-toast";
import channelmap from "../data/channelmap";
import { decodeUnicodeFromStorage } from "../../../utils/unicodeUtils";

// Utility function to strip markdown formatting for card preview
const stripMarkdown = (markdownText: string): string => {
  return markdownText
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
  const { userInfo } = useUserStore();
  const offCanvasClass = isOpen
    ? `${styles.offCanvas} ${styles.offCanvasOpen}`
    : styles.offCanvas;

  if (!data) return null;

  const isSpecialLevel = data.interestGroups;

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
              {!data.completed && (
                !userInfo.exist_in_guild ? (
                  <div>
                    <p style={{ marginBottom: "1rem", textAlign: "center" }}>
                      Connect to our Discord server to submit your work!
                    </p>
                    <ConnectDiscord />
                  </div>
                ) : (
                  data.hashtag === "#ge-self-intro" ? (
                    <button className={styles.proofOfWorkButton}>
                      <a href="https://discord.com/channels/832894680290809354/771680366590689330" target="_blank"> Submit self introduction</a>
                    </button>
                  ) : (
                    <button className={styles.proofOfWorkButton}>
                      <a href={data.discord_link} target="_blank"> Submit proof of Work </a>
                    </button>
                  )
                )
              )}
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
          {task.task_description ? stripMarkdown(decodeUnicodeFromStorage(task.task_description)).slice(0, 40) + "..." : `Earn ${task.karma} Karma Points`}
        </div>
        <div className={styles.cardIg} style={{ fontSize: "14px" }}>
          <strong>Interest Group:</strong> {task.ig || getIgDisplayName(task)}
        </div>
        {task.karma && (
          <div className={styles.cardKarma} style={{ fontSize: "14px" }}>
            <strong>Karma:</strong> {task.karma}
          </div>
        )}
        {task.hashtag && (
          <div className={styles.cardHashtag} style={{ fontSize: "14px" }}>
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
  const [activeTab, setActiveTab] = useState<"startLearning" | "becomeExpert" | "event">("startLearning");
  const [basicLevelData, setBasicLevelData] = useState<Level[] | null>(null);
  const [intermediateLevelData, setIntermediateLevelData] = useState<Level[] | null>(null);
  const [eventData, setEventData] = useState<Level[] | null>(null);
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
      // Always fetch user IGs regardless of level
      if (userProfile as { interest_groups: any[] }) {
        userIGsData = (userProfile as { interest_groups: any[] }).interest_groups || [];
        return;
      }
    } catch (error) {
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

    // Check if user has reached level 4 and has no interest groups
    if (currentLevel >= 4 && !userIGs.length) {
      // Don't show toast error for level 4+ users - they can see the message in UI instead
      setIntermediateLevelData([]);
      setIsLoading(false);
      return;
    } else if (currentLevel < 4) {
      // For users below level 4, set empty data but don't show error
      setIntermediateLevelData([]);
      setIsLoading(false);
      return;
    }

    try {
      const response = await getBecomeExpertTasks(userIGs, selectedIg.id || undefined);
      setIntermediateLevelData(response);
    } catch (error) {
      setIntermediateLevelData([]);
    } finally {
      setIsLoading(false);
    }
  }, [userIGs, selectedIg, unlockedLevel]);

  useEffect(() => {
    fetchIntermediateTasks();
  }, [fetchIntermediateTasks]);

  // Add effect to watch for user level changes and refresh data
  useEffect(() => {
    const refreshDataOnLevelChange = async () => {
      // Check if cache needs to be cleared due to level change
      const cacheWasCleared = checkAndClearStaleCache();
      
      // Only refresh if cache was cleared (level changed) and we have existing data
      if (cacheWasCleared && (basicLevelData !== null || intermediateLevelData !== null)) {
        setIsLoading(true);
        try {
          // Refresh basic level data
          const basicResponse = await getStartLearningTasks();
          setBasicLevelData(basicResponse);
          
          // Refresh intermediate data if user has IGs
          if (userIGs.length > 0) {
            await fetchIntermediateTasks();
          }
        } catch (error) {
          // Handle error silently
        } finally {
          setIsLoading(false);
        }
      }
    };

    refreshDataOnLevelChange();
  }, [userProfile.level]); // Only watch for changes in user level

  useEffect(() => {
    setIsLoading(true);
    const fetchBasicLevels = async () => {
      try {
        const response = await getStartLearningTasks(); // Get tasks without #cl- hashtags
        setBasicLevelData(response);
      } catch (error) {
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

  const handleOpenOffCanvas = (task: Task, levelNum?: number) => {
    const isLocked = levelNum ? levelNum > unlockedLevel : false;
    
    let discordLink = "";
    
    // Use the submission channel discord_id from API response
    if (task.submission_channel?.discord_id) {
      discordLink = `https://discord.com/channels/771670169691881483/${task.submission_channel.discord_id}`;
    } else {
      // Fallback to task-dropbox if no discord_id
      discordLink = channelmap["taskdrop-box"] || "https://discord.com/channels/771670169691881483/1409243188195102850";
    }

    // Transform task data for OffCanvas component
    const formattedData = {
      title: task.task_name || task.title,
      brief: task.task_description ? decodeUnicodeFromStorage(task.task_description) : `Complete the ${task.task_name || task.title} task and share your progress with ${task.hashtag} to earn ${task.karma} Karma Points.`,
      ig: task.interest_group?.name || "General Tasks",
      skills: ["Skill Development"],
      publishedBy: "µLearn Foundation",
      prerequisites: ["Basic knowledge"],
      resources: task.discord_link ? [task.discord_link] : [],
      hashtag: task.hashtag,
      discord_link: discordLink,
      completed: task.completed,
      karma: task.karma,
      locked: isLocked,
      level: levelNum,
    };

    setSelectedData(formattedData);
    setOffCanvasOpen(true);
  };

  const handleCloseOffCanvas = () => {
    setOffCanvasOpen(false);
    setSelectedData(null);
  };

  useEffect(() => {
    if (activeTab === "event") {
      const fetchEventTasks = async () => {
        try {
          const eventTasks = await getEventTasks();
          setEventData(eventTasks);
        } catch (error) {
        }
      };
      fetchEventTasks();
    }
  }, [activeTab]);

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
      "lvl1": { "title": "Level 1", "subtitle": "Fundamentals and OnBoarding" },
      "lvl2": { "title": "Level 2", "subtitle": "Practice GRIT and Keep Going" },
      "lvl3": { "title": "Level 3", "subtitle": "Advanced Skills" },
      "lvl4": { "title": "Level 4", "subtitle": "Sharpen Your Skills" },
      "lvl5": { "title": "Level 5", "subtitle": "Keep Building and Improving" },
      "lvl6": { "title": "Level 6", "subtitle": "Push Beyond Your Limits" },
      "lvl7": { "title": "Level 7", "subtitle": "Achieve Mastery" }

    };
    return metadata[levelKey] || { title: `Level ${levelNum}`, subtitle: `Level ${levelNum} Tasks` };
  };

  return (
    <div className={styles.container} >
      <div className={styles.topBar}>
        <div className={styles.topBarPart}>
          <button
            className={`${styles.topBarButton} ${activeTab === "startLearning" ? styles.activeTab : ""
              }`}
            onClick={() => setActiveTab("startLearning")}
          >
            Start Journey
          </button>
          <button
            className={`${styles.topBarButton} ${activeTab === "becomeExpert" ? styles.activeTab : ""
              }`}
            onClick={() => setActiveTab("becomeExpert")}
          >
            Become Expert
          </button>
          <button
            className={`${styles.topBarButton} ${activeTab === "event" ? styles.activeTab : ""
              }`}
            onClick={() => setActiveTab("event")}
          >
            Event
          </button>
        </div>
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

      {isLoading ? (
        <div>
          <MuLoader />
        </div>
      ) : (
        <>
          {activeTab === "startLearning" && (
            basicLevelData === null || basicLevelData.length === 0 ? (
              <div className="text-center">No tasks available</div>
            ) : (() => {
              // Check if any levels have tasks after filtering
              const hasAnyTasks = basicLevelData.some(level =>
                filterTasks(level.tasks).length > 0
              );

              if (!hasAnyTasks) {
                return (
                  <div className="text-center">
                    {`No ${filter === "all" ? "" : filter + " "}tasks available`}
                  </div>
                );
              }

              return basicLevelData.map((level) => {
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
              });
            })()
          )}

          {activeTab === "becomeExpert" && (
            intermediateLevelData === null || intermediateLevelData.length === 0 ? (
              <div className="text-center">
                {unlockedLevel >= 4  ? (
                  userIGs.length > 0 ? (
                    selectedIg.id && selectedIg.name 
                      ? `No tasks available for ${selectedIg.name}`
                      : "Please select an interest group to view tasks"
                  ) : (
                    ""
                  )
                ) : (
                  <div>
                    <h3>Reach Level 4 to Unlock Expert Tasks</h3>
                    <p>Complete tasks in the "Start Journey" tab to reach Level 4 and unlock advanced learning paths.</p>
                  </div>
                )}
              </div>
            ) : (() => {
              // Check if any levels have tasks after filtering
              const hasAnyTasks = intermediateLevelData.some(level =>
                filterTasks(level.tasks).length > 0
              );

              if (!hasAnyTasks) {
                return (
                  <div className="text-center">
                    {selectedIg.id && selectedIg.name
                      ? `No ${filter === "all" ? "" : filter + " "}tasks available for ${selectedIg.name}`
                      : `No ${filter === "all" ? "" : filter + " "}tasks available`}
                  </div>
                );
              }

              return intermediateLevelData.map((level) => {
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
              });
            })()
          )}

          {activeTab === "event" && (
            <div className={styles.eventContainer}>
              {(() => {
                const nasaHashtags = [
                  "#cl-sp-webdev",
                  "#cl-sp-comicstrip",
                  "#cl-sp-hardware",
                  "#cl-sp-earthsc",
                  "#cl-sp-gamedev",
                  "#cl-sp-missiondesign",
                  "#cl-sp-education",
                  "#cl-sp-nasa"
                ];
                
                // Check if any NASA tasks exist
                const hasNasaTasks = eventData?.some(level => 
                  level.tasks.some(task => nasaHashtags.includes(task.hashtag))
                );
                
                // Check if there are any event tasks at all
                const hasAnyEventTasks = eventData && eventData.length > 0 && 
                  eventData.some(level => level.tasks.length > 0);
                
                if (!hasAnyEventTasks) {
                  return (
                    <div className="text-center" style={{ 
                      padding: "2rem", 
                      textAlign: "center",
                      color: "#6B7280"
                    }}>
                      <h3>No Active Events</h3>
                      <p>There are currently no event-based tasks available. Check back later for upcoming challenges and events!</p>
                    </div>
                  );
                }
                
                return (
                  <>
                    {hasNasaTasks && <h2><strong>NASA Space Challenge</strong></h2>}
                    <div className={styles.taskRow} style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", gap: "16px" }}>
                      {eventData.flatMap(level => level.tasks).map(task => (
                        <TaskCard
                          key={task.id}
                          task={task}
                          onClickCTA={(task) => handleOpenOffCanvas(task)}
                        />
                      ))}
                    </div>
                  </>
                );
              })()}
            </div>
          )}
        </>
      )}

      <OffCanvas isOpen={offCanvasOpen} onClose={handleCloseOffCanvas} data={selectedData} />
    </div>
  );
};

export default LearningPathPage;