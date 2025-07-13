import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Navbar from "../../Home/components/Navbar/Navbar";
import Footer from "../../Home/components/Footer/Footer";
import styles from "./Team.module.css";

import Execom from "../components/Teams/Execom";
import Year2024 from "../components/Teams/Year2024";
import Year2023 from "../components/Teams/Year2023";
import Year2022 from "../components/Teams/Year2022";
import HomeNav from "@/modules/Common/HomeNav/HomeNav";

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

const Teams = () => {
  const [selection, setSelection] = useState("all");
  const handleFilterChange = (e: any) => {
    setSelection(e.target.value);
  };
  return (
    <>
      <motion.div
        className={styles.container}
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
       <HomeNav/>

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
                been possible without the team's soul and heart. Our team has a
                big impact on how well we do our work. Here is the team to which
                we are addressing.
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
                src="assets/team/illustration.webp"
                alt=""
              />
            </motion.div>
          </div>
        </div>

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className={styles.select_wrapper}
        >
          <select
            className={styles.select}
            value={selection}
            onChange={handleFilterChange}
          >
            <option value="all" selected>
              All
            </option>
            <option value="2024">2024 Year</option>
            <option value="2023">2023 Year</option>
            <option value="2022">2022 Year</option>
          </select>
        </motion.div>

        <Execom />

        {(selection === "all" || selection === "2024") && <Year2024 />}
        {(selection === "all" || selection === "2023") && <Year2023 />}
        {(selection === "all" || selection === "2022") && <Year2022 />}

        <Footer />

      </motion.div>
    </>
  );
};

export default Teams;