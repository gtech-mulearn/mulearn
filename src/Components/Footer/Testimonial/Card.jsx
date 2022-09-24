import React from "react";
import Styles from "./card.module.css";

export const Card = () => {
  const RandomDp =
    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80";
  return (
    <div className={Styles.main}>
      <section className={Styles.section}>
        <img
          src={RandomDp}
          alt="a random people pic"
          className={Styles.profile}
        />
        <div className={Styles.info}>
          <h5>Vladimir putin</h5>
          <span>President of Russia</span>
        </div>
      </section>
      <div className={Styles.quote}>
        <blockquote>
          Never have I seen such bald and shameless attempts at garnering an
          audiences' approval through frosted deliciousness.
        </blockquote>
      </div>
    </div>
  );
};
