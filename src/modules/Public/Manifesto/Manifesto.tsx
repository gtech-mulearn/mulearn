import React from "react";
import styles from "./Manifesto.module.css";
import { cdnUrl } from "@/modules/utils/cdn";

import HomeNav from "@/modules/Common/HomeNav/HomeNav";
import Footer from "@/modules/Common/Footer/Footer";  

export default function Manifesto() {
  return (
    <>
      <HomeNav />
      <div className={styles.main}>
        <div className={styles.head}>
          <img src={cdnUrl("src/modules/Public/Manifesto/assets/µ.png")} alt="µLearn background logo" className={styles.muLogoBg} />
          <div className={styles.textContainer}>
            <div className={styles.logoContainer}>
              <div className={styles.ourManifestoText}>Our Manifesto</div>
            </div>
            <h1>We,The Unbound, The Unbowed</h1>
          </div>
          <div className={styles.imgContainer}>
            <img src={cdnUrl("src/modules/Public/Manifesto/assets/hand.png")} alt="Hand illustration" />
          </div>
        </div>
        <div className={styles.firstPara}>
          <p>
            <span>We, the Unbound, the Unbowed</span>, a tribe of relentless
            learners, rise from the ashes of a broken education system.{" "}
            <span>
              We are the mavericks who dared to question the status quo
            </span>
            , the misfits who refused to be cogs in the machine of rote
            memorization. For far too long, we've navigated the labyrinthine
            corridors of standardized curriculums,{" "}
            <span>our creativity stifled</span> by the stale{" "}
            <span>air of conformity. Not anymore!</span>
          </p>
        </div>
        <div className={styles.secondPara}>
          <p>
            <span> µLearn is our revolution.</span> Here, curiosity{" "}
            <span>reigns</span>, and collaboration is our weapon. We{" "}
            <span>transform</span> failures into stepping stones, and together
            we <span>redefine</span> learning.
          </p>
        </div>
        <div className={styles.joinRevolution}>
          <h2>
            <span style={{ fontWeight: 400 }}>
              Welcome to the <span className={styles.highlight}>µLearn.</span>
            </span>
            <br />
            <span style={{ fontWeight: 400 }}>
              Welcome to the <span className={styles.highlight}>Revolution.</span>
            </span>
          </h2>
          <a href="https://app.mulearn.org" target="_blank" rel="noreferrer">
            <button>Join µLearn</button>
          </a>
        </div>
      </div>
      <Footer />
    </>
  );
}