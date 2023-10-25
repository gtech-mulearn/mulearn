import React from "react";
import styles from "./WhoShouldAttend.module.css";
import line from "../../assets/line.webp";

const content = [
  {
    id: 1,
    title: "Students interested in AI and machine learning.",
    desc: "You can build your skills up and learn about the latest technologies to boost up your resume with the help of Pathway.",
  },
  {
    id: 2,
    title: "Professionals seeking to upskill in AI.",
    desc: "With Pathway, you can stay updated on the latest technologies and upskill your AI knowledge.",
  },
  {
    id: 3,
    title: "Enthusiasts eager to explore LLMs and AI frameworks.",
    desc: "You can build highly efficient LLM apps by implementing the most effective AI frameworks with the help of Pathway.",
  },
  {
    id: 4,
    title: "Anyone looking to break into the exciting world of AI",
    desc: "If you're someone curious to learn about AI and related fields, Pathway lets you grab a complete hold of the concepts without any prerequisite knowledge.",
  },
];

export default function WhoShouldAttend() {
  return (
    <section id="who" className={styles.WhoShouldAttend}>
      <div className={styles.Overview_container_head}>
        <hr />
        <p>Who should Attend?</p>
      </div>
      <div className={styles.section}>
        {content.map((item, index) => {
          return (
            <div key={index} className={styles.container}>
              <div className={styles.box}>
                <b className={styles.box_top}>{item.title}</b>
                <div className={styles.box_mid}>
                  <img src={line} alt="line" />
                </div>
              </div>
              <div className={styles.box_bottom}>
                <p>{item.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
