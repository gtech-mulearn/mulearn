import { useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import SidebarBannerSlider, {
    Event
} from "../../InterestGroups/components/SideBannerSlider/SideBannerSlider";
import InterestGroups from "../Components/InterestGroups";
import KarmaEarners from "../Components/KarmaEarners";
import LearningCirclesSection from "../Components/LearningCirclesSection";
import styles from "./DashboardPage.module.css";
import { fetchLocalStorage } from "@/MuLearnServices/common_functions";
import {
    getDomainBasedInterestGroups,
    getKarmaFeed,
    KarmaFeedItem
} from "../services/api";
import { useUserStore } from "/src/ZustandProvider";
import LearningCircleLanding from "../../LearningCircleV2/pages/landing/LearningCircleLanding2";

interface InterestGroup {
    title: string;
    id: string;
    link: string;
    image: string;
}

const imageMap: { [key: string]: { src: string; alt: string } } = {
    coder: { src: "/assets/landing/coder2.webp", alt: "Coding illustration" },
    maker: { src: "/assets/landing/maker.webp", alt: "Maker illustration" },
    creative: {
        src: "/assets/landing/creative.webp",
        alt: "Designer illustration"
    },
    manager: {
        src: "/assets/landing/manager.webp",
        alt: "Manager illustration"
    }
};

const DashboardPage = () => {
    const navigate = useNavigate();
    const [interestGroups, setInterestGroups] = useState<InterestGroup[]>([]);
    const [events, setEvents] = useState<Event[]>([]);
    const [karmaFeed, setKarmaFeed] = useState<KarmaFeedItem[]>([]);
    let userName = useUserStore(
        state => state.userProfile.full_name.split(" ")[0]
    );
    const storedUserInfo = JSON.parse(localStorage.getItem("userInfo") ?? "{}");
    const userDomains: string[] =
        fetchLocalStorage<UserInfo>("userInfo")?.user_domains || [];

    if (!userName) {
        userName = storedUserInfo
            ? storedUserInfo?.full_name.split(" ")?.[0]
            : null;
    }

    useEffect(() => {
        const fetchInterestGroups = async () => {
            try {
                const response = await getDomainBasedInterestGroups(
                    userDomains[0]
                );
                if (response) {
                    const newGroups = response.map(group => ({
                        title: group.name,
                        id: group.id,
                        link: `interestgroups/${group.id}`,
                        image: "/assets/IG/mobile_dev.jpg"
                    }));
                    setInterestGroups(prev =>
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
        navigate("/dashboard/mujourney");
    }, [navigate]);

    const handleJoinLearning = useCallback(() => {
        navigate("/dashboard/learningcircle");
    }, [navigate]);

    useEffect(() => {
        async function fetchKarmaFeed() {
            try {
                const response = await getKarmaFeed();
                if (!response) return;
                setKarmaFeed(response);
            } catch (error) {
                console.error("Failed to fetch karma feed:", error);
            }
        }
        fetchKarmaFeed();
    }, []);

    const fetchEvents = useCallback(async () => {
        try {
            const proxyUrl = "https://proxy.cors.sh/";
            const notionApiUrl =
                "https://api.notion.com/v1/databases/1b759e69b1bf80a3853afd0b09ef93ad/query";
            const response = await fetch(proxyUrl + notionApiUrl, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${
                        import.meta.env.VITE_NOTION_API_KEY
                    }`,
                    "Notion-Version": "2022-06-28",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    filter: {
                        property: "IG Based",
                        select: {
                            equals: "False"
                        }
                    }
                })
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            const newEvents = data.results.map((event: any) => ({
                name:
                    event.properties.Name?.title?.[0]?.plain_text || "No Name",
                description:
                    event.properties.Description?.rich_text?.[0]?.plain_text ||
                    "No Description",
                poster: event.properties.Poster?.files?.[0]?.file?.url || "",
                link: event.properties.URL?.url || "#",
                date: event.properties.Date?.date?.start || "No Date"
            }));

            // Store events in localStorage with a timestamp
            const eventsData = {
                data: newEvents,
                timestamp: Date.now()
            };
            localStorage.setItem("cachedEvents", JSON.stringify(eventsData));
            setEvents(newEvents);
        } catch (error) {
            console.error("Error fetching data from Notion:", error);
        }
    }, []);

    useEffect(() => {
        const loadEvents = () => {
            // Check if events are cached in localStorage
            const cachedEvents = localStorage.getItem("cachedEvents");
            if (cachedEvents) {
                const { data, timestamp } = JSON.parse(cachedEvents);
                const cacheAge = (Date.now() - timestamp) / (1000 * 60); // Age in minutes

                // Use cached data if it's less than 60 minutes old (adjust as needed)
                if (cacheAge < 60) {
                    setEvents(data);
                    return;
                }
            }
            // Fetch new events if no cache or cache is stale
            fetchEvents();
        };

        loadEvents();
    }, [fetchEvents]);

    const defaultImage = {
        src: "/assets/landing/others.png",
        alt: "General illustration"
    };
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
                <motion.div
                    className={styles.leftColumn}
                    initial={{ x: -50 }}
                    animate={{ x: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <motion.section
                        className={styles.welcomeSection}
                        data-tour="dashboard-welcome"
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className={styles.welcomeText}>
                            <h1 className={styles.welcomeTitle}>
                                {storedUserInfo.exist_in_guild
                                    ? "Welcome"
                                    : "Welcome"}{" "}
                                <span>{userName}</span> 👋
                            </h1>
                            <p className={styles.welcomeMessage}>
                                This dashboard is being updated. Expect
                                improvements and possible bugs. Thanks for your
                                patience!
                            </p>
                            <div className={styles.buttons}>
                                <motion.button
                                    className={styles.button}
                                    data-tour="start-learning"
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
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                        />
                    </motion.section>
                    {/* <div style={{width: '50%'}}> */}
                    {/* <LearningCircleLanding/> */}
                    {/* </div> */}
                    <LearningCirclesSection />
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
                            <h2 className={styles.happeningTitle}>
                                Happening Now
                            </h2>
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
                    {karmaFeed.length > 1 &&
                        karmaFeed[0].user &&
                        karmaFeed[1].user && (
                            <KarmaEarners
                                highestStudent={karmaFeed[0]}
                                highestCollege={karmaFeed[1]}
                            />
                        )}
                    <InterestGroups
                        title={userDomains[0]}
                        groups={interestGroups}
                    />
                </motion.aside>
            </motion.div>
        </motion.div>
    );
};

DashboardPage.displayName = "DashboardPage";

export default DashboardPage;
