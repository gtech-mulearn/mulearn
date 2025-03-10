import { useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import SidebarBannerSlider from "../../InterestGroups/components/SideBannerSlider/SideBannerSlider";
import InterestGroups from "../Components/InterestGroups";
import KarmaEarners from "../Components/KarmaEarners";
import LearningCirclesSection from "../Components/LearningCirclesSection";
import styles from "./DashboardPage.module.css";
import { fetchLocalStorage } from "@/MuLearnServices/common_functions";
import { getDomainBasedInterestGroups, getKarmaFeed, KarmaFeedItem } from "../services/api";
import { useUserStore } from "/src/ZustandProvider";

// Move static data outside component to prevent recreation
const DOMAIN_IMAGES = {
  coder: "https://via.placeholder.com/50?text=UIUX",
  maker: "https://via.placeholder.com/50?text=Video",
  manager: "https://via.placeholder.com/50?text=Comics",
  creative: "https://via.placeholder.com/50?text=Writing",
  others: "https://via.placeholder.com/50?text=Others",
};

const EVENTS = [
  {
    id: "evt-002",
    title: "Figma Advanced Prototyping Masterclass",
    link: "https://uiuxcommunity.com/events/figma-masterclass",
    venue: "Semarang Convention Center",
    eventType: "Offline" as const,
    date: "April 10, 2025",
    time: "09:00 - 12:00 WIB",
    image: "/assets/interestgroup_assets/Top100Desigers3.png",
  },
  {
    id: "evt-003",
    title: "User Research Techniques Webinar",
    link: "https://uiuxcommunity.com/events/user-research-webinar",
    venue: "Online via Microsoft Teams",
    eventType: "Online" as const,
    date: "May 5, 2025",
    time: "10:00 - 11:30 GMT",
    image: "/assets/interestgroup_assets/Top100Desigers2.png",
  },
  {
    id: "evt-004",
    title: "UI Design Trends 2025 Conference",
    link: "https://uiuxcommunity.com/events/ui-trends-2025",
    venue: "Jakarta Design Hub",
    eventType: "Offline" as const,
    date: "June 20, 2025",
    time: "13:00 - 17:00 WIB",
    image: "/assets/interestgroup_assets/Top100Desigers3.png",
  },
  {
    id: "evt-005",
    title: "Accessibility in UX Design Workshop",
    link: "https://uiuxcommunity.com/events/accessibility-workshop",
    venue: "Online via Google Meet",
    eventType: "Online" as const,
    date: "July 12, 2025",
    time: "15:00 - 16:30 GMT",
    image: "/assets/interestgroup_assets/Top100Desigers2.png",
  },
];

const CREATIVE_GROUPS = [
  {
    title: "Video Editing",
    image: "https://via.placeholder.com/50?text=Video",
    link: "/interest-groups/video-editing",
  },
  {
    title: "UI/UX Design",
    image: "https://via.placeholder.com/50?text=UIUX",
    link: "/interest-groups/ui-ux",
  },
  {
    title: "Comics & Illustration",
    image: "https://via.placeholder.com/50?text=Comics",
    link: "/interest-groups/comics",
  },
  {
    title: "Creative Writing",
    image: "https://via.placeholder.com/50?text=Writing",
    link: "/interest-groups/creative-writing",
  },
];

const KARMA_DATA = {
  highestStudent: {
    name: "John Doe",
    currentKarma: 1500,
    earnedYesterday: 50,
  },
  highestCollege: {
    name: "Tech University",
    currentKarma: 8000,
    earnedYesterday: 200,
  },
  longestStreak: {
    name: "Jane Smith",
    streakDays: 30,
  },
};

interface InterestGroup {
  title: string;
  id: string;
  link: string;
  image: string;
}

// Define the type expected from getDomainBasedInterestGroups
interface ApiInterestGroup {
  id: string;
  name: string;
  icon: string;
  code: string;
  category: string;
  members: number;
  updated_by: string;
  updated_at: string;
  created_by: string;
  created_at: string;
}

const DashboardPage = () => {
  const navigate = useNavigate();
  const [interestGroups, setInterestGroups] = useState<InterestGroup[]>([]);
  //   const userName = fetchLocalStorage<UserInfo>("userInfo")?.full_name || "";
  let userName = useUserStore((state) => state.userProfile.full_name.split(" ")[0]);
  const storedUserInfo = JSON.parse(localStorage.getItem("userInfo") ?? "{}");
  if(!userName){
    userName = storedUserInfo ? storedUserInfo?.full_name.split(" ")?.[0] : null;
  }
  const [karmaFeed, setKarmaFeed] = useState<KarmaFeedItem[]>([]);
  const userDomains: string[] =
    fetchLocalStorage<UserInfo>("userInfo")?.user_domains || [];

  useEffect(() => {
    const fetchInterestGroups = async () => {
      try {
        const response = await getDomainBasedInterestGroups(userDomains[0]);
        if (response) {
          const newGroups = response.map((group) => ({
            title: group.name,
            id: group.id,
            link: `interestgroups/${group.id}`,
            image: "https://via.placeholder.com/50?text=Writing",
          }));
          setInterestGroups((prev) =>
            JSON.stringify(prev) === JSON.stringify(newGroups)
              ? prev
              : newGroups.slice(0, 5)
          );
        }
      } catch (error) {
        console.error("Failed to fetch interest groups:", error);
      }
    };
    fetchInterestGroups();
  }, [userDomains[0]]);

  const handleStartLearning = useCallback(() => {
    navigate('/dashboard/learning-path');
  }, [navigate]);

  const handleJoinLearning = useCallback(() => {
    navigate("/dashboard/learningcircle");
  }, [navigate]);


  useEffect(() => {
    async function fetchKarmaFeed() {
      try {
        const response = await getKarmaFeed();
        if (!response) {
          console.error("Failed to fetch karma feed");
          return;
        }
        // console.log("Karma feed fetched successfully");
        setKarmaFeed(response);
      } catch (error) {
        console.error("Failed to fetch karma feed:", error);
      }
    }
    fetchKarmaFeed()
  }, []);





  const imageMap: { [key: string]: { src: string; alt: string } } = {
    coder: {
      src: "/assets/landing/coder2.png",
      alt: "Coding illustration",
    },
    maker: {
      src: "/assets/landing/maker.png",
      alt: "Maker illustration",
    },
    creative: {
      src: "/assets/landing/creative.png",
      alt: "Designer illustration",
    },
    manager: {
      src: "/assets/landing/manager.png",
      alt: "Manager illustration",
    },
  };

  const defaultImage = {
    src: "/assets/landing/others.png",
    alt: "General illustration",
  };
  const { src, alt } = imageMap[userDomains[0]] || defaultImage;

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.leftColumn}>
          <section className={styles.welcomeSection}>
            <div className={styles.welcomeText}>
              <h1 className={styles.welcomeTitle}>
                {!storedUserInfo.exist_in_guild ? 'Welcome' : 'Welcome back'} <span>{userName}</span> 👋
              </h1>
              <p className={styles.welcomeMessage}>
              This dashboard is being updated. Expect improvements and possible bugs. Thanks for your patience!
              </p>
              <div className={styles.buttons}>
                <button
                  className={styles.button}
                  onClick={handleStartLearning}
                  aria-label="Start Learning"
                >
                  Start Learning
                </button>
                <button
                  className={styles.button2}
                  onClick={handleJoinLearning}
                  aria-label="Join Learning"
                >
                  Join Learning
                </button>
                <button
                  className={styles.button2}
                  onClick={() => window.open("https://app.formbricks.com/s/cm7ztbf2d0000l70365noohib", "_blank")}
                  aria-label="Report Issues"
                >
                  Report Issues
                </button>

              </div>
            </div>
            <div>
              <img
                src={src}
                alt={alt}
                loading="lazy"
                className={styles.dashboardImage}
              />
            </div>
          </section>

          <LearningCirclesSection />
        </div>
        <aside className={styles.rightWrapper}>
          <section className={styles.slider}>
            <h2 className={styles.happeningTitle}>Happening Now</h2>
            <div className={styles.happeningCardsContainer}>
              <SidebarBannerSlider events={EVENTS} />
            </div>
          </section>
          {karmaFeed.length > 1 && karmaFeed[0].user && karmaFeed[1].user && (
            <KarmaEarners
              highestStudent={karmaFeed[0]}
              highestCollege={karmaFeed[1]}
            />)}
          <InterestGroups title={userDomains[0]} groups={interestGroups} />
        </aside>
      </div>
    </div>
  );
};

DashboardPage.displayName = "DashboardPage";

export default DashboardPage;