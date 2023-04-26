import React, { useState } from "react";
import styles from "./Onboarding.module.css";

type Props = {
  questions: string;
  answers: string[];
};

const PopUpQuestions = ({ questions ,answers}: Props) => {
  const [display, setDisplay] = useState("flex");
  const [opacity, setOpacity] = useState(1);
  return (
    <div
      style={{ display: display, opacity: opacity }}
      className={styles.question_container}
    >
      <div className={styles.question_box}>
        <div className={styles.question}>
          <h3>{questions}</h3>
          <div className={styles.answers}>
            {answers.map((answer, index) => {
              return (
                 <>
                 <button
                    onClick={() => {
                      setOpacity(0);
                      // setSecondQuesion(true);
                      setTimeout(() => {
                        setDisplay("none");
                      }, 1000);
                    }}
                  >
                    {answer}
                  </button></>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopUpQuestions;
