import { useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import SidebarBannerSlider, { Event } from "../../InterestGroups/components/SideBannerSlider/SideBannerSlider";
import InterestGroups from "../Components/InterestGroups";
import KarmaEarners from "../Components/KarmaEarners";
import LearningCirclesSection from "../Components/LearningCirclesSection";
import styles from "./DashboardPage.module.css";
import { fetchLocalStorage } from "@/MuLearnServices/common_functions";
import { getDomainBasedInterestGroups, getInterestGroups, KarmaFeedItem } from "../services/api";
import { useUserStore, useStatStore } from "/src/ZustandProvider";
import axios from "axios";

interface InterestGroup {
  title: string;
  id: string;
  link: string;
  image: string;
}

const imageMap: { [key: string]: { src: string; alt: string } } = {
  coder: { src: "/assets/landing/coder2.webp", alt: "Coding illustration" },
  maker: { src: "/assets/landing/maker.webp", alt: "Maker illustration" },
  creative: { src: "/assets/landing/creative.webp", alt: "Designer illustration" },
  manager: { src: "/assets/landing/manager.webp", alt: "Manager illustration" },
};

const DashboardPage = () => {
  const navigate = useNavigate();
  const [interestGroups, setInterestGroups] = useState<InterestGroup[]>([]);
  const [events, setEvents] = useState<Event[]>([]);

  // Access karmaFeed and fetchKarmaFeed from Zustand
  const { karmaFeed, isKarmaFeedLoading, fetchKarmaFeed } = useStatStore();
  const { userProfile } = useUserStore();
  let userName = useUserStore((state) => state.userProfile.full_name.split(" ")[0]);
  const storedUserInfo = JSON.parse(localStorage.getItem("userInfo") ?? "{}");
  const userDomains: string[] = fetchLocalStorage<UserInfo>("userInfo")?.user_domains || [];

  if (!userName && storedUserInfo) {
    userName = storedUserInfo ? storedUserInfo?.full_name?.split(" ")?.[0] : null;
  }

  useEffect(() => {
    const fetchInterestGroups = async () => {
      try {
        const response = await getInterestGroups();
        if (response) {
          const newGroups = response.map((group) => ({
            title: group.name,
            id: group.id,
            link: `interestgroups/${group.id}`,
            image: "/assets/IG/mobile_dev.jpg",
          }));
          // setInterestGroups((prev) =>
          //   JSON.stringify(prev) === JSON.stringify(newGroups) ? prev : newGroups.slice(0, 5)
          // );
          setInterestGroups(newGroups);
        }
      } catch (error) {
        console.error("Failed to fetch interest groups:", error);
      }
    };
    fetchInterestGroups();
  }, []);

  useEffect(() => {
    // Fetch karma feed only if it doesn't exist in the store
    if (!karmaFeed) {
      fetchKarmaFeed();
    }
  }, [karmaFeed, fetchKarmaFeed]);

  const handleStartLearning = useCallback(() => {
    navigate("/dashboard/mujourney");
  }, [navigate]);

  const handleJoinLearning = useCallback(() => {
    navigate("/dashboard/learningcircle");
  }, [navigate]);

  const fetchEvents = async () => {
    try {
      const response = await axios.get("https://opensheet.elk.sh/19Os47FI_fAgpMk7lnhFWz9aRwyd72cB-4PKz7W8rF9g/1");

      if (!response) {
        throw new Error(`HTTP error! Status: ${response}`);
      }
      const data = await response.data;
      const newEvents = data
      .map((event: any) => ({
        name: event.Name || "No Name",
        description: event.Description || "No Description",
        poster: event.Poster || "",
        link: event.Links || "#",
        date: event.Date || "No Date",
        status: event.Status || "",
      }))
      .filter((event: any) => event.status !== "Expired");

      setEvents(newEvents);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const defaultImage = { src: "/assets/landing/others.png", alt: "General illustration" };
  const { src, alt } = imageMap[userDomains[0]] || defaultImage;

  return (
    <motion.div
      className={styles.container}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className={styles.wrapper}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
      >
        <motion.div className={styles.leftColumn} initial={{ x: -50 }} animate={{ x: 0 }} transition={{ duration: 0.6 }}>
          <motion.section
            className={styles.welcomeSection}
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className={styles.welcomeText}>
              <h1 className={styles.welcomeTitle}>
                {storedUserInfo.exist_in_guild ? "Welcome" : "Welcome"} <span>{userName}</span> 👋
              </h1>
              <p className={styles.welcomeMessage}>
                This dashboard is being updated. Expect improvements and possible bugs. Thanks for your patience!
              </p>
              <div className={styles.buttons}>
                <motion.button
                  className={styles.button}
                  onClick={handleStartLearning}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Start Learning
                </motion.button>
                <motion.button
                  className={styles.button2}
                  onClick={handleJoinLearning}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Join Learning
                </motion.button>
              </div>
            </div>
            <motion.img
              src={src}
              alt={alt}
              loading="lazy"
              className={styles.dashboardImage}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            />
          </motion.section>
          <LearningCirclesSection domain={userDomains[0]} />
        </motion.div>

        <motion.aside
          className={styles.rightWrapper}
          initial={{ x: 50 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.6 }}
        >
          {events.length !== 0 && (
            <motion.section
              className={styles.slider}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className={styles.happeningTitle}>Happening Now</h2>
              <motion.div
                className={styles.happeningCardsContainer}
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6 }}
              >
                <SidebarBannerSlider events={events} />
              </motion.div>
            </motion.section>
          )}
          {isKarmaFeedLoading ? (
            <div>Loading Karma Feed...</div>
          ) : (
            karmaFeed && karmaFeed.length > 1 && (
              <KarmaEarners highestStudent={karmaFeed[0]} highestCollege={karmaFeed[1]} />
            )
          )}
          <InterestGroups title={userDomains[0]} groups={interestGroups} />
        </motion.aside>
      </motion.div>
    </motion.div>
  );
};

export default DashboardPage;