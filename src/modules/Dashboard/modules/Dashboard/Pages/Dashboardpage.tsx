import { useNavigate, useLocation } from "react-router-dom";
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
import { useMuShepherdTour } from "@/components/MuComponents/MuTour/MuShepherdTour";
import MuShepherdTourButton from "@/components/MuComponents/MuTour/MuShepherdTourButton";
import { getDashboardShepherdTourSteps } from "@/components/MuComponents/MuTour/dashboardShepherdTourSteps";
import "@/components/MuComponents/MuTour/MuShepherdTour.css";

interface InterestGroup {
  title: string;
  id: string;
  link: string;
  image: string;
}

const imageMap: { [key: string]: { src: string; alt: string } } = {
  coder: { src: "/assets/landing/coder2.webp", alt: "Coding illustration" },
  maker: { src: "/assets/landing/maker.webp", alt: "Maker illustration" },
  creative: { src: "/assets/landing/creative.webp", alt: "Creative illustration" },
  manager: { src: "/assets/landing/manager.webp", alt: "Manager illustration" },
};

const DashboardPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [interestGroups, setInterestGroups] = useState<InterestGroup[]>([]);
  const [events, setEvents] = useState<Event[]>([]);

  // Check if user is logged in
  const refreshToken = localStorage.getItem("refreshToken");
  const isLoggedIn = !!refreshToken;

  // Access karmaFeed and fetchKarmaFeed from Zustand
  const { karmaFeed, isKarmaFeedLoading, fetchKarmaFeed } = useStatStore();
  const { userProfile } = useUserStore();
  let userName = useUserStore((state) => state.userProfile.full_name?.split(" ")[0]);
  const storedUserInfo = JSON.parse(localStorage.getItem("userInfo") ?? "{}");
  const userDomains: string[] = isLoggedIn ? (fetchLocalStorage<UserInfo>("userInfo")?.user_domains || []) : [];

  if (!userName && storedUserInfo && isLoggedIn) {
    userName = storedUserInfo ? storedUserInfo?.full_name?.split(" ")?.[0] : null;
  }

  // Set default name for non-logged-in users
  if (!isLoggedIn) {
    userName = "Guest";
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
    // Fetch karma feed only if user is logged in and karma feed doesn't exist in the store
    if (isLoggedIn && !karmaFeed) {
      fetchKarmaFeed();
    }
  }, [karmaFeed, fetchKarmaFeed, isLoggedIn]);

  const handleStartLearning = useCallback(() => {
    navigate("/dashboard/mujourney");
  }, [navigate]);

  const handleJoinLearning = useCallback(() => {
    navigate("/dashboard/learningcircle");
  }, [navigate]);

  // Shepherd.js tour for improved scroll handling and positioning
  const shepherdTour = useMuShepherdTour({
    steps: getDashboardShepherdTourSteps('dashboard'),
    onComplete: () => {
      localStorage.setItem('hasSeenDashboardTour', 'true');
    },
    onSkip: () => {
      localStorage.setItem('hasSeenDashboardTour', 'true');
    }
  });

  // First-time Shepherd tour with welcome steps
  const firstTimeShepherdTour = useMuShepherdTour({
    steps: getDashboardShepherdTourSteps('first-time'),
    onComplete: () => {
      localStorage.setItem('hasSeenDashboardTour', 'true');
    },
    onSkip: () => {
      localStorage.setItem('hasSeenDashboardTour', 'true');
    }
  });

  const handleStartTour = () => {
    shepherdTour.startTour();
  };

  const handleStartFirstTimeShepherdTour = () => {
    firstTimeShepherdTour.startTour();
  };

  // Start Shepherd.js tour only on dashboard page for first-time users
  useEffect(() => {
    // Check if we're on the dashboard home page
    const isDashboardPage = location.pathname === '/dashboard/home';
    
    // Check if user has already seen the dashboard tour
    const hasSeenDashboardTour = localStorage.getItem('hasSeenDashboardTour');
    
    if (isLoggedIn && userName !== "Guest" && isDashboardPage && !hasSeenDashboardTour) {
      const timer = setTimeout(() => {
        // Check if all dashboard tour elements are present
        const requiredElements = [
          '.mu-tour-welcome', 
          '.mu-tour-start-learning', 
          '.mu-tour-join-learning',
          '.mu-tour-learning-circles',
          '.mu-tour-karma-earners',
          '.mu-tour-interest-groups'
        ];
        const elementsReady = requiredElements.every(selector => {
          const element = document.querySelector(selector);
          return !!element;
        });
        
        if (elementsReady) {
          // Mark that the user has seen the dashboard tour
          localStorage.setItem('hasSeenDashboardTour', 'true');
          handleStartFirstTimeShepherdTour();
        } else {
          // Retry after elements are loaded
          setTimeout(() => {
            handleStartFirstTimeShepherdTour();
          }, 1000);
        }
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isLoggedIn, userName, location.pathname]);

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

  const defaultImage = { src: "/assets/landing/creative.webp", alt: "General illustration" };
  const { src, alt } = isLoggedIn && userDomains.length > 0 
    ? (imageMap[userDomains[0]] || defaultImage)
    : defaultImage;

  return (
    <motion.div
      className={styles.container}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className={isLoggedIn? styles.wrapper: styles.noAuthWrapper}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
      >
        <motion.div className={styles.leftColumn} initial={{ x: -50 }} animate={{ x: 0 }} transition={{ duration: 0.6 }}>
          <motion.section
            className={`${styles.welcomeSection} mu-tour-welcome`}
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className={styles.welcomeText}>
              <h1 className={styles.welcomeTitle}>
                {isLoggedIn ? (
                  storedUserInfo.exist_in_guild ? "Welcome" : "Welcome"
                ) : "Welcome"} <span>{userName}</span> 👋
              </h1>
              <p className={styles.welcomeMessage}>
                {isLoggedIn ? (
                  "This dashboard is being updated. Expect improvements and possible bugs. Thanks for your patience!"
                ) : (
                  "Explore our learning platform! Sign in to access personalized features and track your progress."
                )}
              </p>
              <div className={styles.buttons}>
                <motion.button
                  className={`${styles.button} mu-tour-start-learning`}
                  onClick={handleStartLearning}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Start Learning
                </motion.button>
                <motion.button
                  className={`${styles.button2} mu-tour-join-learning`}
                  onClick={handleJoinLearning}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Join Learning
                </motion.button>
              </div>
              {/* Tour Button - always show for manual tour triggering */}
              <motion.div 
                className={styles.tourButtonContainer}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
              >
                <MuShepherdTourButton onClick={handleStartTour} size="sm">
                  Take a Quick Tour
                </MuShepherdTourButton>
                {' '}
                <MuShepherdTourButton onClick={handleStartFirstTimeShepherdTour} size="sm">
                  First-Time Tour
                </MuShepherdTourButton>
                </motion.div>
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
          <div className="mu-tour-learning-circles">
            <LearningCirclesSection domain={isLoggedIn && userDomains.length > 0 ? userDomains[0] : "general"} />
          </div>
        </motion.div>

        <motion.aside
          className={styles.rightWrapper}
          initial={{ x: 50 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.6 }}
        >
          {events.length !== 0 && (
            <motion.section
              className={`${styles.slider} mu-tour-events`}
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
          {isLoggedIn && (
            isKarmaFeedLoading ? (
              <div>Loading Karma Feed...</div>
            ) : (
              karmaFeed && karmaFeed.length > 1 && (
                <div className="mu-tour-karma-earners">
                  <KarmaEarners highestStudent={karmaFeed[0]} highestCollege={karmaFeed[1]} />
                </div>
              )
            )
          )}
          {isLoggedIn && (
            <div className="mu-tour-interest-groups">
              <InterestGroups title={isLoggedIn && userDomains.length > 0 ? userDomains[0] : "general"} groups={interestGroups} />
            </div>
          )}
        
        </motion.aside>
      </motion.div>
    </motion.div>
  );
};

export default DashboardPage;