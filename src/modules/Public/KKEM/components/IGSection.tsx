import Card from "./Card";
import styles from "./IGSection.module.css";
import assets from "../assets/IGS";
import { useState } from "react";
import MuIDModal from "./MuIDModal";
import { Props as cardProps } from "../components/Card";

type Props = {
    cards: cardProps[];
    heading?: string;
    headerFlag?: boolean; //set to true to disable header
    largeImg?: boolean;
};

const IGSection = (props: Props) => {
    const [modalOpen, setModalOpen] = useState(false);
    console.log("ss");
    return (
        <>
            {!props.headerFlag && (
                <MuIDModal open={modalOpen} setOpen={setModalOpen} />
            )}
            <div className={styles.main_container}>
                {!props.headerFlag && (
                    <div className={styles.first_view_container}>
                        <div className={styles.first_view}>
                            <div className={styles.image_container}>
                                <img
                                    src={assets.fvimg}
                                    alt="myrmidon"
                                    className={styles.fvimage}
                                />
                            </div>
                            <div className={styles.fv_texts}>
                                <p className={styles.fv_heading}>
                                    Introducing Learning Circles
                                </p>
                                <p className={styles.fv_tagline}>
                                    An informal mechanism for bringing together
                                    learners who are interested in the same
                                    topic from across different fields and
                                    disciplines. A fantastic way to spend a
                                    small amount of time learning about new
                                    things with a group of people with same
                                    interests!
                                </p>

                                <span
                                    onClick={() => setModalOpen(true)}
                                    className={styles.get_started}
                                >
                                    Get Started{" "}
                                </span>
                            </div>
                        </div>
                    </div>
                )}

                <div className={styles.explore_view_container}>
                    <div className={styles.explore_view}>
                        <p className={styles.ev_heading}>
                            {props.heading
                                ? props.heading
                                : "Existing Interest Groups"}
                        </p>

                        {/* <button className={styles.search_button}>Search Now</button> */}
                    </div>
                </div>

                <div className={styles.cards_view_container}>
                    <div id="cards" className={styles.cards_view}>
                        {props.cards.map(card => (
                            <Card
                                {...card}
                                key={card.name}
                                largeImg={props.largeImg}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default IGSection;