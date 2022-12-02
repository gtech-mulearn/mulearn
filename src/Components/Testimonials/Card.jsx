import React from "react";
import Styles from "./card.module.css";

const Card = ({ person }) => {
    return (
        <div className={`${Styles.main} `}>
            <section className={Styles.section}>
                <div className={Styles.profile}>
                    <img
                        src={person.image_link} alt={person.name}
                    />
                </div>
                <div className={Styles.info}>
                    <h5>{person.name}</h5>
                    <span>{person.about}</span>
                </div>
            </section>
            <div className={`${Styles.quote}`}>
                <blockquote className="text">
                    {person.testimony}
                </blockquote>
            </div>
            <span className={`${person.testimony.length > 200 ? "block" : "hidden"} text-sm text-orange-500 mt-3 relative self-end pr-5`}>Read more...</span>
        </div>
    );
};
export default Card