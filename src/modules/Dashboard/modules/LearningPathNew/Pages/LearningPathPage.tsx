import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import styles from "./LearningPathPage.module.css";
import levelsData from "../modules/LevelsData";
import levelsDataUIUX from "../modules/LevelsDataUIUX";
import CardCarousel from "../modules/CardCarousal";
import IGSelector from "../../InterestGroups/components/IGSelection/IGSelector";
import { getUserLog, getUserProfile } from "../../Profile/services/api";
import { SiDiscord } from "react-icons/si";

import MuLoader from "@/MuLearnComponents/MuLoader/MuLoader";

import { useUserStore } from "/src/ZustandProvider";
import { getFilteredUserTasks, getIGLevelTasks } from "../services/api";
import ConnectDiscord from "../../ConnectDiscord/pages/ConnectDiscord";

const dummyUserProfile = {
  full_name: "John Doe",
  interest_groups: [{ name: "Creative", karma: 500 }],
  level: "Level 4",
  // ... other fields
};
const dummyUserLog = [];

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
              {data.interestGroups?.length &&  data.interestGroups.map((ig: any) => (
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
                <p>
                  <strong>When:</strong> {data.publishedWhen}
                </p>
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
              <button className={styles.proofOfWorkButton}><a href={"https://discord.gg/Vg5a9RY4"}> Submit proof work</a></button>
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
    <div className={styles.card}>
      <div className={styles.cardContent}>
        <div className={styles.cardIcon}>{card.icon}</div>
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
  "#ge-snakify-6", // From leveller of Level 2
  "#ge-my-blog",
  "#ge-find-better",
  "#ge-typing-challenge-126",
  "#ge-30-days-coding15",
  "#ge-snakify-6", // From cards of Level 2
  "#dwms-muconnect",
  "#ge-game-deconstruction", // From leveller of Level 3
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
  "#ge-game-deconstruction"
]


const IGHashtagMap = [
  { id: "4ac6cca9-9157-4a07-8d71-edb62b2e5c35", igName: "Ai", hashtagIdentifier: "#cl-ai" },
  { id: "d379d82b-e116-4b67-8128-670916e6bb42", igName: "Internet Of Things (IOT) And Robotics", hashtagIdentifier: "#cl-io" },
  { id: "46fe1fb7-7b04-4ebe-837d-120bc16d0e0a", igName: "Ui Ux", hashtagIdentifier: "#cl-uiux" },
  { id: "04d29c15-4de4-4b43-ad63-0f4760c62919", igName: "Product Management", hashtagIdentifier: "#cl-pm" },
  { id: "1719d19a-0206-4161-9c6f-0a7dba44d4e5", igName: "Cloud And Devops", hashtagIdentifier: "#cl-dev" },
  { id: "1be43a3a-bcfb-4ef1-b77a-959b01bcb782", igName: "Game Dev", hashtagIdentifier: "#cl-game-dev" },
  { id: "235ccbd6-07d9-445b-9236-078d5d2903b2", igName: "No Or Low Code", hashtagIdentifier: "#cl-noc" },
  { id: "243a1bda-893c-4de3-b457-51e7cb517d83", igName: "Entrepreneurship", hashtagIdentifier: "#cl-entrepreneurship" },
  { id: "2de0ee0c-ddc3-4f02-bf93-b6bd2d0625c3", igName: "Ar Vr Mr", hashtagIdentifier: "#cl-arvrmr" },
  { id: "3a74725e-a05a-418b-a275-39d68ad9a416", igName: "Cyber Security", hashtagIdentifier: "#cl-cybersec" },
  { id: "4922b746-a71f-4aa3-869a-96a25b6072db", igName: "Mobile Development", hashtagIdentifier: "#cl-mobile" },
  { id: "4ddfca30-56ca-47c8-83fc-6944081a6260", igName: "Marketing", hashtagIdentifier: "#cl-marketing" },
  { id: "59d408b4-cfc0-4369-a147-59f00cf6670b", igName: "3D Animation and Game Development", hashtagIdentifier: "#cl-3dgamedev" },
  { id: "5bf2bdfe-5c22-48ab-9572-9e9836c70e79", igName: "Digital Marketing", hashtagIdentifier: "#cl-dm" },
  { id: "6cf3bc70-3ff8-457b-ace4-86d4a1df7f2d", igName: "Competitive Coding", hashtagIdentifier: "#cl-competitivecoding" },
  { id: "83fe6fcc-9033-4b96-a473-ba4d1e1e80a8", igName: "Human Resources", hashtagIdentifier: "#cl-hr" },
  { id: "85130a05-7dc8-4888-a486-e3e50eafc75c", igName: "Blockchain", hashtagIdentifier: "#cl-blockchain" },
  { id: "99505535-cc1c-4560-9724-72074ecd6409", igName: "Data Science", hashtagIdentifier: "#cl-datascience" },
  { id: "9b8aaf7f-16a0-4a66-ae53-79b8c25e5faa", igName: "Web Development", hashtagIdentifier: "#cl-web" },
  { id: "c78e8429-d515-450e-9528-0db6b08a5030", igName: "Strategic Leadership", hashtagIdentifier: "#cl-strategicleadership" },
  { id: "d2427189-bed5-46a2-8196-cda49ad39b56", igName: "Civil", hashtagIdentifier: "#cl-civil" },
  { id: "e36ef538-80ce-48a8-92dd-c8e9e6236fbb", igName: "Creative Design", hashtagIdentifier: "#cl-creativedesign" },
  { id: "eb2b7b9a-599f-4366-aa8e-7878624953e4", igName: "Beckn", hashtagIdentifier: "#cl-beckn" },
  { id: "f857b0d7-3c0b-4552-a2e3-109e0ac3e579", igName: "Quality Assurance", hashtagIdentifier: "#cl-qa" }
];



const LearningPathPage: React.FC = () => {
  const { userProfile, userInfo, setUserProfile } = useUserStore();
  const [activeTab, setActiveTab] = useState<"startLearning" | "becomeExpert">("startLearning");
  const [basicLevelData, setBasicLevelData] = useState<any[]>([]);
  const [intermediateLevelData, setIntermediateLevelData] = useState<any[]>([]);
  
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
  const [APILoadStatus, setAPILoadStatus] = useState(0);
  const [profileStatus, setProfileStatus] = useState<boolean>();
  const [userLog, setUserLog] = useState<any[]>([]);
  const [selectedIg, setSelectedIg] = useState<InterestGroup>({ id: '', name: "", karma: 0 });

  const unlockedLevel = Number(userProfile.level?.replace("lvl", ""));

  // Fetch beginner tasks (Levels 1-3)
  useEffect(() => {
    const fetchBasicLevels = async () => {
      try {
        const response = await getFilteredUserTasks(HASHTAGSLEVL1TO3);
        setBasicLevelData(response);
      } catch (error) {
        console.error("Error fetching basic levels:", error);
      }
    };
    fetchBasicLevels();
  }, []);

  useEffect(() => {
    setIntermediateLevelData([]);
    const fetchIntermediateLevels = async () => {
      try {
        const levels = [4, 5, 6, 7];

        // Filter IGHashtagMap based on selected IG
        const filteredIGHashtagMap = selectedIg
          ? IGHashtagMap.filter(ig => ig.id === selectedIg.id)
          : IGHashtagMap;

        const data = await getIGLevelTasks(levels, filteredIGHashtagMap);
        setIntermediateLevelData(data);
      } catch (error) {
        console.error("Error fetching intermediate levels:", error);
      }
    };

    fetchIntermediateLevels();
  }, [selectedIg]);

  // Fetch user profile and log
  useEffect(() => {
    getUserProfile(setUserProfile, setAPILoadStatus, setProfileStatus);
    getUserLog(setUserLog);
  }, [setUserProfile]);

  // Update tab indicator
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

  const handleDiscordRedirect = () => {
    window.location.href = import.meta.env.VITE_DISCORD_AUTH_URL;
};


  // Determine which levels to render based on active tab
  const levelsToRender = activeTab === "startLearning" ? basicLevelData : intermediateLevelData;

  return (
    <div className={styles.container}>
      {/* Top Bar */}
      <div className={styles.topBar}>
        <div className={styles.indicator} style={{ left: indicatorStyle.left, width: indicatorStyle.width }} />
        <button
          ref={(el) => (tabRefs.current.startLearning = el)}
          className={`${styles.topBarButton} ${activeTab === "startLearning" ? styles.activeTab : ""}`}
          onClick={() => setActiveTab("startLearning")}
        >
          Start Learning
        </button>
        <button
          ref={(el) => (tabRefs.current.becomeExpert = el)}
          className={`${styles.topBarButton} ${activeTab === "becomeExpert" ? styles.activeTab : ""}`}
          onClick={() => setActiveTab("becomeExpert")}
        >
          Become Expert
        </button>
      </div>

      {/* IG Selector for Become Expert */}
      {activeTab === "becomeExpert" && (
        <div style={{ marginBottom: '2rem', marginTop: '2rem' }}>
          <IGSelector
            userProfile={userProfile}
            selectedIg={selectedIg}
            setSelectedIg={setSelectedIg}
            userLog={userLog}
            igs={userProfile.interest_groups}
            isProfilePage={false}
          />
        </div>
      )}

      {/* ✅ LEVEL 0: Connect Discord */}
      {activeTab === "startLearning" && !userInfo.exist_in_guild && (
        <div className={styles.levelSection}>
          <h2>Level 0</h2>
          <h4 className={styles.levelSubtitle}>Connect to our Discord server to start your journey!</h4>
          {/* <button className={styles.connectDiscordButton} onClick={() => window.open("https://discord.com/invite/Jt7sv3chZP", "_blank")}>
            Connect Discord
          </button> */}
          <ConnectDiscord/>
        </div>
      )}

      {/* Render levels */}
      {levelsToRender.length > 0 ? (
        levelsToRender.map((level) => {
          const isLocked = level.level > unlockedLevel;
          return (
            <div key={level.level} className={styles.levelSection}>
              <h2>Level {level.level}</h2>
              <h4 className={styles.levelSubtitle}>{level.subtitle}</h4>
              {isLocked && (
                <div className={styles.unlockTaskSection}>
                  <p className={styles.lockedText}>
                    Complete Level {level.level - 1} to unlock
                  </p>
                  {level.leveller && (
                    <button onClick={() => handleOpenOffCanvas(level.leveller)}>
                      Unlock now
                    </button>
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
      ) : (
        <div><MuLoader /></div>
      )}

      <OffCanvas isOpen={offCanvasOpen} onClose={handleCloseOffCanvas} data={selectedData} />
    </div>
  );
};

export default LearningPathPage;
