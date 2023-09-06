import React from "react";
import styles from "./KKEMLearningFest.module.css";
import Hero from "./components/Hero/Hero";
import Journey from "./components/Journey/Journey";
import Footer from "./assets/footer.webp";
import Cards from "./components/Cards/Cards"
import Faq from "./components/FAQs/Faq";

const LearningFest = () => {
  return <div className={styles.kkemLearningFest}>
    <Hero />
    <Journey />
    <Cards/>
    <Faq />
    <img className={styles.kkemLearningFestFooter} src={Footer} alt="" />
  </div>;
};

export default LearningFest;
