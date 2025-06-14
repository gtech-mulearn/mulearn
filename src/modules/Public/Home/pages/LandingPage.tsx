"use client";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import styles from "./LandingPage.module.css";
import LearningPathList from "../../../Dashboard/modules/LearningPaths/services/LearningPathList";
import LearningPathCard from "../../../Dashboard/modules/LearningPaths/components/LearningPathCard";
import MulearnBrand from "../../../Dashboard/assets/MulearnBrand";
import RolesSection from "../components/RolesSection/RolesSection";
import CountUp from "react-countup";
import { Helmet } from "react-helmet";
import Footer from "@/modules/Common/Footer/Footer";
import HomeNav from "@/modules/Common/HomeNav/HomeNav";

// Images for the special events cards
import top100coders from "../assets/top-100.webp";
import launchpad from "../assets/launchpad.webp";
import trivialideas from "../assets/trivialideas.webp";
import SpecialEventCardLanding from "../components/SpecialEventCardLanding/SpecialEventCardLanding";
import illustration from "../assets/illustration.webp"
import FeatureGrid from "../components/FeatureGrid/FeatureGrid";

// Define the SpecialEvent type
interface SpecialEvent {
  id: number;
  title: string;
  description: string;
  date?: string;
  participants?: number;
  recurrence?: string;
  link: string;
  image: string;
  isLive: boolean;
}

/**
 * @typedef {Object} Data
 * @property {number} members
 * @property {Array<{ org_type: string, org_count: number }>} org_type_counts
 * @property {Array<{ role__title: string, role_count: number }>} enablers_mentors_count
 * @property {number} ig_count
 * @property {number} learning_circle_count
 */

// Data remains the same
const data = [
  { label: "Members", value: "43,994+" },
  { label: "Learning Circles", value: "2,133+" },
  { label: "Colleges", value: "1,929+" },
  { label: "Companies", value: "213+" },
  { label: "Communities", value: "30+" },
  { label: "Events", value: "200+" },
  { label: "Interest Groups", value: "22+" },
  { label: "Total Karma Mined", value: "17,906,847" },
  { label: "Number of Proof of Works", value: "203,480+" },
  { label: "Number of Internships", value: "2,000+" },
  { label: "Jobs", value: "1,000+" },
  { label: "Products", value: "100+" },
  { label: "Worth of Gig Works", value: "1Cr+" },
  { label: "Enablers", value: "511+" },
  { label: "Mentors", value: "383+" },
];

const SpecialEventsList: SpecialEvent[] = [
  {
    id: 1,
    title: "Top 100 Coders",
    description:
      "Welcome to the Top 100 Coders initiative Recognised by Kerala Govt. We're on a mission to recognize and empower the best coders in India. If you're passionate about coding and want to make a significant impact in the tech community, you're in the right place.",
    // date: "2025-04-09",
    // participants: 100,
    link: "https://top100coders.com/",
    image: top100coders,
    isLive: true,
  },
  {
    id: 2,
    title: "Launchpad",
    description:
      "Launchpad Kerala 2024 is a premier job fair that brings together talented individuals and innovative companies in the technical and engineering fields.",
    // date: "2024-06-02",
    // participants: 200,
    link: "https://launchpadkerala.org/",
    image: launchpad,
    isLive: false,
  },
  {
    id: 3,
    title: "Trivial Ideas",
    description:
      "Have an idea that's out-of-the-box crazy? This is your chance to turn it into a real product! ",
    recurrence: "Monthly",
    // date: "2025-02-02",
    // participants: 500,
    link: "https://www.instagram.com/mulearn.official/p/C6eHEzJyMMn/",
    image: trivialideas,
    isLive: false,
  },
];

// Variants for staggered animations
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, when: "beforeChildren" },
  },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const textVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
};

const MuLiveCounter = () => {
  /**
   * @type {[Data, React.Dispatch<React.SetStateAction<Data>>]}
   */

  const [counts, setCounts] = useState<any | null>(null);

  useEffect(() => {
    const socket = new WebSocket(
      "wss://mulearn.org/ws/v1/public/landing-stats/"
    );

    socket.addEventListener("message", (event) => {
      setCounts(JSON.parse(event.data));
      //console.log("Message from server ", event.data);
    });

    socket.addEventListener("error", (event) => {
      console.error("WebSocket error: ", event);
    });

    // Cleanup function to close WebSocket connection
    return () => {
      socket.close();
    };
  }, []);

  if (!counts) {
    return <div>Loading statistics...</div>;
  }

  return (
    <div style={{}}>
      <div className={styles.countcontainer}>
        <div className={styles.count}>
          <p className={styles.cvc_heading}>
            <CountUp end={counts.members} duration={5} />+
          </p>
          <p className={styles.cvc_text}>Members</p>
        </div>
        <div className={styles.count}>
          <p className={styles.cvc_heading}>
            <CountUp end={counts.learning_circle_count} duration={5} />+
          </p>
          <p className={styles.cvc_text}>Learning Circles</p>
        </div>
        {counts &&
          counts.org_type_counts &&
          counts.org_type_counts
            .sort((a: any, b: any) => b.org_count - a.org_count)
            .map((orgTypeCount: any) => (
              <div key={orgTypeCount.org_type} className={styles.count}>
                <p className={styles.cvc_heading}>
                  <CountUp
                    end={
                      orgTypeCount.org_type === "Company"
                        ? 213
                        : orgTypeCount.org_type === "Community"
                          ? 30
                          : orgTypeCount.org_count
                    }
                    duration={5}
                  />
                  +
                </p>
                <p className={styles.cvc_text}>
                  {orgTypeCount.org_type.endsWith("y")
                    ? orgTypeCount.org_type.slice(0, -1) + "ies"
                    : orgTypeCount.org_type + "s"}
                </p>
              </div>
            ))}

        <div className={styles.count}>
          <p className={styles.cvc_heading}>
            <CountUp end={200} duration={5} />+
          </p>
          <p className={styles.cvc_text}>Events</p>
        </div>
        <div className={styles.count}>
          <p className={styles.cvc_heading}>
            <CountUp end={counts.ig_count} duration={5} />+
          </p>
          <p className={styles.cvc_text}>Interest Groups</p>
        </div>

        {counts.karma_pow_count && (
          <>
            <div className={styles.count}>
              <p className={styles.cvc_heading}>
                <CountUp end={counts.karma_pow_count.karma_count} duration={5} />
              </p>
              <p className={styles.cvc_text}>Total Karma Mined</p>
            </div>
            <div className={styles.count}>
              <p className={styles.cvc_heading}>
                <CountUp end={counts.karma_pow_count.pow_count} duration={5} />+
              </p>
              <p className={styles.cvc_text}>Number of Proof of Works </p>
            </div>
          </>
        )}
        
        <div className={styles.count}>
          <p className={styles.cvc_heading}>
            <CountUp end={2000} duration={5} />+
          </p>
          <p className={styles.cvc_text}>Number of Internships</p>
        </div>
        <div className={styles.count}>
          <p className={styles.cvc_heading}>
            <CountUp end={1000} duration={5} />+
          </p>
          <p className={styles.cvc_text}>Jobs</p>
        </div>
        <div className={styles.count}>
          <p className={styles.cvc_heading}>
            <CountUp end={100} duration={5} />+
          </p>
          <p className={styles.cvc_text}>Products</p>
        </div>
        <div className={styles.count}>
          <p className={styles.cvc_heading}>
            <CountUp end={1} duration={5} />
            Cr+
          </p>
          <p className={styles.cvc_text}>worth of Gig Works</p>
        </div>

        {counts.enablers_mentors_count &&
          counts.enablers_mentors_count
            .sort((a: any, b: any) => b.role_count - a.role_count)
            .map((roleCount: any) => (
              <div key={roleCount.role__title} className={styles.count}>
                <p className={styles.cvc_heading}>
                  <CountUp end={roleCount.role_count} duration={5} />+
                </p>
                <p className={styles.cvc_text}>{roleCount.role__title}s</p>
              </div>
            ))}
      </div>
    </div>
  );
};

const MuLearnLanding = () => {
  const navigate = useNavigate();
  const refreshToken = localStorage.getItem("refreshToken");

  return (
    <>
      <Helmet>
        <title>µLearn</title>
        <meta
          name="description"
          content="µLearn is a synergic philosophy of education, with a culture of mutual learning through micro groups of peers. µLearn is here to assist you in breaking through the echo chambers and free you from the shackles that have you grounded."
        />
        <meta property="og:title" content="µLearn" />
        <meta property="og:site_name" content="µLearn" />
        <meta property="og:url" content="https://app.mulearn.org/" />
        <meta
          property="og:description"
          content="µLearn is a synergic philosophy of education, with a culture of mutual learning through micro groups of peers. µLearn is here to assist you in breaking through the echo chambers and free you from the shackles that have you grounded."
        />
      </Helmet>
      <motion.div
        className={styles.landingContainer}
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Navbar */}
        <HomeNav />
        
        {/* Hero Section */}
        <motion.header
          className={styles.heroSection}
          variants={fadeInUp}
          viewport={{ once: true, amount: 0.3 }}
        >
          <div
            className={`${styles.landingPaddingContainer} ${styles.landingPaddingContainerCustom}`}
          >
            <div className={styles.heroLeft}>
              <motion.h1
                custom={1}
                variants={textVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                Your Ultimate Gateway to <span className={styles.highlight}>Peer-Led Growth</span>
              </motion.h1>
              <motion.span
                className="dot"
                custom={2}
                variants={textVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {""} 
              </motion.span>
              
              <motion.h6
                custom={3}
                variants={textVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className={styles.heroDescription}
              >
                An open community for learners, makers, and innovators
              </motion.h6>
              <motion.div
                className={styles.ctaButtons}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={textVariant}
              >
                <button
                  className={styles.joinBtn}
                  onClick={() => (refreshToken ? navigate("/dashboard/home") : navigate("/register"))}
                >
                  Join µLearn
                </button>
                <button
                  className={styles.downloadBtn}
                  onClick={() => navigate("/dashboard/mujourney")}
                >
                  Explore Learning Paths
                </button>
              </motion.div>
              <motion.div
                className={styles.heroImage}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={textVariant}
              >
                <img src={illustration} alt="Illustration" />
              </motion.div>
            </div>
          </div>
          <div
            className={`${styles.landingPaddingContainer} ${styles.landingPaddingContainerTextCenter}`}
          >
            <div className={styles.mulearnTopPad}><h1>What <span>µLearn</span> offers</h1></div>
            <h6 className={styles.heroDescription}>
              µLearn offers a wide range of features and opportunities that help you learn, grow, and upskill yourself
              in a fun and engaging way. Here are some of the key features that µLearn offers.
            </h6>
          </div>
          <div className={`${styles.landingPaddingContainer} ${styles.mulearnTopPad}`}>
            <FeatureGrid />
          </div>
        </motion.header>

        {/* Story Section */}
        <div className={`${styles.landingPaddingContainer} ${styles.mulearnTopPad}`}>
          <motion.section
            className={styles.leftRightGrid}
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className={styles.storyTitle}>
              <motion.div
                variants={fadeInUp}
              >
                <h1>
                  Understand μLearn with a <span className={styles.highlight}>Story</span>
                </h1>
                <h6>
                  Meet Aami, an eager learner hungry for growth! Join her voyage through the captivating µVerse, where she seizes opportunities, builds learning circles, and immerses herself in events, emerging industry-ready with newfound skills and confidence.
                </h6>
              </motion.div>
            </div>
            <div className={styles.iframeContainer}>
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 50 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
                }}
              >
                <iframe
                  src="https://www.youtube.com/embed/M9serw-CLU0"
                  title="YouTube video on M9serw-CLU0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                ></iframe>
              </motion.div>
            </div>
          </motion.section>
        </div>
        
        {/* Special Events Section */}
        <div className={styles.landingPaddingContainer}>
          <motion.section
            className={styles.specialEventsSection}
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div
              className={styles.specialEvents}
              variants={fadeInUp}
            >
              <h1>Special Events</h1>
              <h6>Discover exclusive events designed to inspire innovation, enhance skills, and foster meaningful connections across technology, management, and creativity.</h6>
              <div className={styles.specialEventsCards}>
                {SpecialEventsList.map((specialevent) => (
                  <SpecialEventCardLanding
                    key={specialevent.id}
                    specialevent={specialevent}
                  />
                ))}
              </div>
            </motion.div>
          </motion.section>
        </div>
        
        {/* Comparison Table Section */}
        <div className={styles.landingPaddingContainer}>
          <motion.section
            className={`${styles.topBottomGrid} ${styles.comparisonGridSection}`}
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div className={styles.camparison} variants={fadeInUp}>
              <h1>μLearn is here to solve all your learning problems</h1>
              <table className={styles.comparisonTable}>
                <thead>
                  <tr>
                    <th>Problems with Existing Systems</th>
                    <th>How μLearn Works</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Fragmented Resources</td>
                    <td>
                      Structured <span className={styles.highlight}>Roadmaps</span>
                    </td>
                  </tr>
                  <tr>
                    <td>Lack Of Right Advice</td>
                    <td>
                      <span className={styles.highlight}>Mentorship</span> from industry veterans
                    </td>
                  </tr>
                  <tr>
                    <td>Lack of Access to Opportunities</td>
                    <td>
                      <span className={styles.highlight}>Opportunities</span> from the best in every industry
                    </td>
                  </tr>
                  <tr>
                    <td>Limited Exposure</td>
                    <td>
                      <span className={styles.highlight}>Exposure</span> to global leaders and thinkers
                    </td>
                  </tr>
                  <tr>
                    <td>Lack of motivation to learn</td>
                    <td>
                      <span className={styles.highlight}>Gamified</span> platform working based on Karma points
                    </td>
                  </tr>
                </tbody>
              </table>
            </motion.div>
          </motion.section>
        </div>
        
        {/* Opportunities Section */}
        <div className={styles.landingPaddingContainer}>
          <motion.section
            className={`${styles.topBottomGrid} ${styles.opportunitiesSection}`}
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div className={styles.oppurtunitiesTitle} variants={fadeInUp}>
              <h1>At The End Of a μLearners Journey</h1>
              <h6>
                At the end of a μLearner's journey, they are equipped with a plethora of opportunities to choose from. They can choose to work in a job, freelance, research, start their own venture, or work for a social cause.
              </h6>
            </motion.div>
            <motion.div
              className={styles.oppurtunities}
              variants={fadeInUp}
            >
              {[
                {
                  id: 1,
                  name: "Job",
                  icon: (
                    <img
                      src={"https://www.propeers.in/images/rafiki.svg"}
                      width={"400px"}
                      alt="Job"
                    />
                  ),
                },
                {
                  id: 2,
                  name: "Freelance",
                  icon: (
                    <img
                      src={"https://www.propeers.in/images/Mentors-cuate.svg"}
                      width={"400px"}
                      alt="Freelance"
                    />
                  ),
                },
                {
                  id: 3,
                  name: "Research",
                  icon: (
                    <img
                      src={"https://www.propeers.in/images/cuate.svg"}
                      width={"400px"}
                      alt="Research"
                    />
                  ),
                },
                {
                  id: 4,
                  name: "Entrepreneurship",
                  icon: (
                    <img
                      src={"/assets/landing/College Project Concept Illustration.png"}
                      width={"400px"}
                      alt="Entrepreneurship"
                    />
                  ),
                },
                {
                  id: 5,
                  name: "Social Cause",
                  icon: (
                    <img
                      src={"/assets/landing/social-growth.webp"}
                      width={"400px"}
                      alt="Social Cause"
                    />
                  ),
                },
              ].map((e) => (
                <motion.div key={e.id} className={styles.cards} variants={fadeInUp}>
                  <span>{e.icon}</span>
                  <h6>{e.name}</h6>
                </motion.div>
              ))}
            </motion.div>
          </motion.section>
        </div>
        <div className={styles.landingPaddingContainer}>
          <RolesSection />
        </div>
        
        {/* Impact Section */}
        <div className={styles.landingPaddingContainer}>
          <motion.section
            className={styles.topBottomGrid}
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div className={styles.impact} variants={fadeInUp}>
              <h1>
                The Impact of <span className={styles.highlight}>μLearn</span>
              </h1>
              <h6>
                Over the last year, we as a community have made an impact on a significant number of students, mentors, and facilitators, enabling them to gain more knowledge about the ecosystem of learning and upskill themselves.
              </h6>
            </motion.div>
            <motion.div variants={fadeInUp}>
              <MuLiveCounter />
            </motion.div>
          </motion.section>
        </div>
        
        <div className={styles.landingPaddingContainer}>
          <motion.section
            className={`${styles.leftRightGrid} ${styles.leftRightGridCustom}`}
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div className={styles.community} variants={fadeInUp}>
              <h1>
                Learn and Grow <span className={styles.highlight}>Together</span> as a{" "}
                <span className={styles.highlight}>Community</span>
              </h1>
              <h6 className={styles.communityDescription}>
                Are you ready to learn, grow, and upskill yourself to the next level? Come, be a part of the community, and let's start learning in a new, better way. Call your friends as well because things are going to change once you experience it, and it is more effective when done in a group.
              </h6>
              <button>
                <a href="https://discord.com/invite/gtech-mulearn-771670169691881483" target="_blank" rel="noopener noreferrer">
                  Join The Community
                </a>
              </button>
            </motion.div>
            <motion.div variants={fadeInUp} className={styles.joinCommunity}>
              <img src="https://mulearn.org/assets/home/join.webp" alt="Join community" width="350px" />
            </motion.div>
          </motion.section>
        </div>
        
        {/* Footer */}
        <Footer />
      </motion.div>
    </>
  );
};

export default MuLearnLanding;