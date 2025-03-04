"use client";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import styles from "./LandingPage.module.css";
import LearningPathList from "../../LearningPaths/services/LearningPathList";
import { FaLinkedin, FaInstagram, FaYoutube, FaFacebook } from "react-icons/fa";
import LearningPathCard from "../../LearningPaths/components/LearningPathCard";
import MulearnBrand from "../../../assets/MulearnBrand";
import RolesSection from "../components/RolesSection";

// Images for the special events cards
import top100coders from "../../SpecialEvents/assets/top-100.webp";
import launchpad from "../../SpecialEvents/assets/launchpad.webp";
import trivialideas from "../../SpecialEvents/assets/trivialideas.webp";
import SpecialEventCardLanding from "../components/SpecialEventCardLanding/SpecialEventCardLanding";

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
    date: "2025-04-09",
    participants: 100,
    link: "https://top100coders.com/",
    image: top100coders,
    isLive: true,
  },
  {
    id: 2,
    title: "Launchpad",
    description:
      "Launchpad Kerala 2024 is a premier job fair that brings together talented individuals and innovative companies in the technical and engineering fields.",
    date: "2024-06-02",
    participants: 200,
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
    date: "2025-02-02",
    participants: 500,
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

const MuLearnLanding = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const refreshToken = localStorage.getItem("refreshToken");

  function NavLinks() {
    return (
      <>
        <li onClick={() => navigate("/dashboard/home")}>Home</li>
        <li onClick={() => navigate("/dashboard/mentors")}>Mentorship</li>
        <li onClick={() => navigate("/dashboard/learning-paths")}>Learning Paths</li>
        <li onClick={() => navigate("/dashboard/learningcircle")}>Learning Circles</li>
        <li onClick={() => navigate("/")}>Why μLearn</li>
        <li onClick={() => navigate("/")}>How to Collaborate</li>
      </>
    );
  }

  return (
    <motion.div
      className={styles.landingContainer}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Navbar */}
      <motion.nav
        className={styles.navbar}
        variants={fadeInUp}
        viewport={{ once: true, amount: 0.5 }}
      >
        <div className={styles.logo}>
          <MulearnBrand />
        </div>
        <ul className={styles.navLinks}>
          <NavLinks />
        </ul>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div className={styles.navButtons}>
            {refreshToken ? (
              <button
                className={`${styles.loginBtn} ${styles.logInDesktop}`}
                onClick={() => navigate("/dashboard/home")}
              >
                Dashboard
              </button>
            ) : (
              <button
                className={`${styles.loginBtn} ${styles.logInDesktop}`}
                onClick={() => navigate("/login")}
              >
                Login
              </button>
            )}
          </div>
          {isMenuOpen && (
            <motion.div
              className={`${styles.mobileNavLinks} ${isMenuOpen ? styles.sh : ""}`}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
            >
              <button
                className={styles.closeBtn}
                onClick={() => setIsMenuOpen(false)}
              >
                ×
              </button>
              <ul>
                <NavLinks />
              </ul>
              <div className={styles.navButtons}>
                {refreshToken ? (
                  <button
                    className={styles.loginBtn}
                    onClick={() => navigate("/dashboard/home")}
                  >
                    Dashboard
                  </button>
                ) : (
                  <button
                    className={styles.loginBtn}
                    onClick={() => navigate("/login")}
                  >
                    Login
                  </button>
                )}
              </div>
            </motion.div>
          )}
          <div
            className={styles.hamburger}
            onClick={() => setIsMenuOpen(true)}
          >
            ☰
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <motion.header
        className={styles.heroSection}
        variants={fadeInUp}
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className={styles.heroLeft}>
          <motion.h1
            custom={1}
            variants={textVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            Your Ultimate Gateway to{" "}
            <span className={styles.highlight}>Peer-Led Growth</span>
          </motion.h1>
          <motion.span
            className="dot"
            custom={2}
            variants={textVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {" "}
          </motion.span>
          <motion.p
            custom={3}
            variants={textVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            An open community for learners, makers, and innovators
          </motion.p>
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
              Join for Free
            </button>
            <button
              className={styles.downloadBtn}
              onClick={() => navigate("/dashboard/learning-path")}
            >
              Explore Learning Paths
            </button>
          </motion.div>
        </div>

        <motion.div
          className={styles.featuresGrid}
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {[
            {
              title: "Community",
              description: "Join 40,000+ learners & innovators.",
              image: "/assets/landing/College Project Concept Illustration.png",
              bgColor: "rgb(220 250 230)",
            },
            {
              title: "Mentors",
              description: "Learn from those ahead of you, mentor those behind you.",
              image: "/assets/landing/searching.png",
              bgColor: "rgb(235 200 205)",
            },
            {
              title: "Interest Groups",
              description: "Connect with like-minded people who share your interests",
              image: "/assets/landing/Content Team Concept Illustration.png",
              bgColor: "rgb(255 200 205)",
            },
            {
              title: "Roadmaps",
              description: "Structured learning paths for skill mastery.",
              image: "/assets/landing/Roadmap.png",
              bgColor: "rgb(155 138 228)",
            },
            {
              title: "Challenges",
              description: "Engage in real-world problem-solving.",
              image: "/assets/landing/collab.png",
              bgColor: "rgb(215 225 255)",
            },
            {
              title: "Opportunities",
              description: "Discover Gigs, Jobs, and best opportunities around you",
              image: "https://www.propeers.in/images/cuate.svg",
              bgColor: "rgb(180 190 200)",
            },
          ].map((feature, i) => (
            <motion.div
              className={styles.featureCard}
              key={i}
              style={{ backgroundColor: feature.bgColor }}
              variants={fadeInUp}
              custom={i}
            >
              <div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
              <img
                src={feature.image}
                width={
                  feature.title === "Community"
                    ? "140px"
                    : feature.title === "Mentors"
                      ? "120px"
                      : feature.title === "Interest Groups"
                        ? "90px"
                        : feature.title === "Roadmaps"
                          ? "110px"
                          : feature.title === "Challenges"
                            ? "130px"
                            : "90px"
                }
                alt={feature.title}
              />
            </motion.div>
          ))}
        </motion.div>
      </motion.header>

      {/* Structured Learning Paths Section */}
      {/* <motion.section
        className={styles.topBottomGrid}
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.div className={styles.roadMaps} variants={fadeInUp}>
          <h1>
            Structured learning paths, <span className={styles.highlight} style={{ fontWeight: "800" }}>Crafted by experts</span>
          </h1>
          <p style={{ textAlign: "center" }}>
            Expert-approved, structured learning paths designed to help you master key skills efficiently and advance in your career with guidance from industry professionals.
          </p>
        </motion.div>
        <motion.div
          className={styles.hackathonBox}
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {LearningPathList.slice(0, 6).map((lp, i) => (
            <LearningPathCard key={i} learningPath={lp} />
          ))}
        </motion.div>
        <motion.button
          className={styles.loginBtn}
          style={{ marginTop: "2rem", borderRadius: "10px" }}
          onClick={() => navigate("/dashboard/learning-paths")}
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          Explore Learning Paths
        </button>
      </motion.section> */}

      {/* Story Section */}
      <motion.section
        className={styles.leftRightGrid}
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.div className={styles.storyTitle} variants={fadeInUp}>
          <h1>
            Understand μLearn with a <span className={styles.highlight}>Story</span>
          </h1>
          <p>
            Meet Aami, an eager learner hungry for growth! Join her voyage through the captivating µVerse, where she seizes opportunities, builds learning circles, and immerses herself in events, emerging industry-ready with newfound skills and confidence.
          </p>
        </motion.div>
        <motion.div
          className={styles.iframeContainer}
          variants={fadeInUp}
        >
          <iframe
            src="https://www.youtube.com/embed/M9serw-CLU0"
            title="YouTube video on M9serw-CLU0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          ></iframe>
        </motion.div>
      </motion.section>

      {/* Special Events Section */}
      <motion.section
        className={styles.specialEventsSection}
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.div className={styles.specialEvents} variants={fadeInUp}>
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

      {/* Comparison Table Section */}
      <motion.section
        className={styles.topBottomGrid}
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.div className={styles.camparison} variants={fadeInUp}>
          <h1>μLearn is here to solve all your learning problems</h1>
          <table className={styles.comparisonTable}>
            <tr>
              <th>Problems with Existing Systems</th>
              <th>How μLearn Works</th>
            </tr>
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
          </table>
        </motion.div>
      </motion.section>

      {/* Opportunities Section */}
      <motion.section
        className={`${styles.topBottomGrid} ${styles.opportunitiesSection}`}
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.div className={styles.oppurtunitiesTitle} variants={fadeInUp}>
          <h1>At The End Of a μLearners Journey</h1>
          <h6>They are offered</h6>
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
                  width={"120px"}
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
                  width={"90px"}
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
                  width={"90px"}
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
                  width={"90px"}
                  alt="Entrepreneurship"
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

      <RolesSection />

      {/* Impact Section */}
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
          <p>
            Over the last year, we as a community have made an impact on a significant number of students, mentors, and facilitators, enabling them to gain more knowledge about the ecosystem of learning and upskill themselves.
          </p>
        </motion.div>
        <motion.div className={styles.dataGrid} variants={fadeInUp}>
          {data.map((d, i) => (
            <motion.div className={styles.dataCard} key={i} variants={fadeInUp}>
              <h1>{d.value}</h1>
              <p>{d.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* Community Section */}
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
          <h6>
            Are you ready to learn, grow, and upskill yourself to the next level? Come, be a part of the community, and let’s start learning in a new, better way. Call your friends as well because things are going to change once you experience it, and it is more effective when done in a group.
          </h6>
          <button>
            <a href="https://discord.com/invite/gtech-mulearn-771670169691881483" target="_blank">
              Join The Community
            </a>
          </button>
        </motion.div>
        <motion.div variants={fadeInUp} className={styles.joinCommunity}>
          <img src="https://mulearn.org/assets/home/join.webp" alt="Join community" width="400px" />
        </motion.div>
      </motion.section>

      {/* Footer */}
      <motion.footer
        className={styles.footer}
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className={styles.footerContainer}>
          <div className={styles.footerSection}>
            <h3>Quick Links</h3>
            <ul>
              <li><a href="#">Career Labs</a></li>
              <li><a href="#">Blog</a></li>
              <li><a href="#">Interest Groups</a></li>
            </ul>
          </div>
          <div className={styles.footerSection}>
            <h3>Legal</h3>
            <ul>
              <li><a href="#">Terms and Conditions</a></li>
              <li><a href="#">Privacy Policy</a></li>
            </ul>
          </div>
          <div className={styles.footerSection}>
            <h3>Follow Us</h3>
            <div className={styles.socialIcons}>
              <a href="#"><FaLinkedin /></a>
              <a href="#"><FaInstagram /></a>
              <a href="#"><FaYoutube /></a>
              <a href="#"><FaFacebook /></a>
            </div>
          </div>
          <div className={styles.footerSection}>
            <h3>Contact</h3>
            <p>Technopark Trivandrum, Kazhakkoottam,</p>
            <p>Trivandrum - 695581, Kerala, India</p>
          </div>
        </div>
      </motion.footer>
    </motion.div>
  );
};

export default MuLearnLanding;