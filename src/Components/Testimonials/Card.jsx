import React from "react";
import Styles from "./card.module.css";

const Card = ({ person }) => {
  return (
    <>
      <div className={Styles.video}>
        <iframe
          className={Styles.ytvideo}
          src={person.video}
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
    </>
  );
};
export default Card;
