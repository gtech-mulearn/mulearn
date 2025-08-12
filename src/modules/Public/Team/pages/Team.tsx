import { useState } from "react";
import { motion } from "framer-motion";
import styles from "./Team.module.css";
import { cdnUrl } from "@/modules/utils/cdn";
import Execom from "../components/Teams/Execom";
import Year2025 from "../components/Teams/Year2025";
import Year2024 from "../components/Teams/Year2024";
import Year2023 from "../components/Teams/Year2023";
import Year2022 from "../components/Teams/Year2022";
import HomeNav from "@/modules/Common/HomeNav/HomeNav";
import Footer from "@/modules/Common/Footer/Footer";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, when: "beforeChildren" },
  },
};

const textVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.7 },
  }),
};

const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

type YearType = "2025" | "2024" | "2023" | "2022";
const yearComponents: Record<YearType, JSX.Element> = {
  "2025": <Year2025 />,
  "2024": <Year2024 />,
  "2023": <Year2023 />,
  "2022": <Year2022 />,
};

const yearData: YearType[] = ["2025", "2024", "2023", "2022"];

const Teams = () => {
  // First year open by default
  const [activeYear, setActiveYear] = useState<YearType>("2025");

  const toggleYear = (year: YearType) => {
    setActiveYear((prev) => (prev === year ? (null as any) : year));
  };

  return (
    <motion.div
      className={styles.container}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <HomeNav />

      {/* Hero Section */}
      <div className={styles.first_view_container}>
        <div className={styles.first_view}>
          <div className={styles.fv_texts}>
            <motion.p
              variants={textVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className={styles.fv_heading}
            >
              The <span>Gears</span> Behind The Machine.
            </motion.p>
            <motion.p
              variants={textVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className={styles.fv_tagline}
            >
              The 'µLearn' community's growth to this moment would not have
              been possible without the team's soul and heart...
            </motion.p>
          </div>
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className={styles.fv_illustration}
          >
            <img
              className={styles.fv_image}
              src={cdnUrl("public/assets/team/illustration.webp")}
              alt=""
            />
          </motion.div>
        </div>
      </div>

      {/* Executive Committee */}
      <Execom />

      {/* Collapsible Timeline */}
<div className={styles.timeline_wrapper}>
  <div className={styles.timeline}>
    {yearData.map((year) => (
      <div key={year} className={styles.timeline_item}>
        
        {/* Marker & Year */}
        <div className={styles.timeline_marker} />
        <div
          className={`${styles.timeline_year} ${
            activeYear === year ? styles.active_year : ""
          }`}
          onClick={() => toggleYear(year)}
        >
          {year}
        </div>

        {/* Cards Content */}
        {activeYear === year && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.4 }}
            className={styles.timeline_cards}
          >
            <div className={styles.timeline_card}>
              {yearComponents[year]}
            </div>
          </motion.div>
        )}
      </div>
    ))}
  </div>
</div>


      <Footer />
    </motion.div>
  );
};

export default Teams;
