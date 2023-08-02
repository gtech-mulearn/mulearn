import React from "react";
import styles from "./LandingPage.module.css";
import { Link } from "react-router-dom";

const LandingPage = () => {
    return (
        <div className={styles.LClandingPage}>
            <nav className={styles.LClandingPageNav}>
                <img src="https://i.ibb.co/vY786NX/image.png" alt="muLearn" />
                <div className={styles.navLinks}>
                    <div>
                        <Link to="#">About</Link>
                        <Link to="#">Programs</Link>
                        <Link to="#">Events</Link>
                        <Link to="#">Interest Group</Link>
                        <Link to="#">Careers</Link>
                    </div>
                    <button>Join Us</button>
                </div>
            </nav>

            <div className={styles.LClandingPageHero}>
                <div className={styles.dash}></div>
                <div className={styles.heroTitle}>
                    <span>
                        <b>Introducing</b>{" "}
                        <img src="https://i.ibb.co/FDQ2M4n/Learn.png" alt="" />
                    </span>
                    <b>Learning Circles</b>
                </div>
                <p>
                    An informal mechanism for bringing together learners who are
                    interested in the same topic from across different fields
                    and disciplines. A fantastic way to spend a small amount of
                    time learning about new things with a group of people with
                    same interests!
                </p>
                <button>Create/Join Learning Circles</button>
            </div>

            <div className={styles.LClandingPageEarth}>
                <div className={styles.totalCount}>
                    <div>
                        <div className={styles.count}>
                            <b>01</b>
                            <p>States</p>
                        </div>
                        <div className={styles.count}>
                            <b>16</b>
                            <p>Districts</p>
                        </div>
                        <div className={styles.count}>
                            <b>20+</b>
                            <p>Interest Groups</p>
                        </div>
                    </div>
                    <div>
                        <div className={styles.count}>
                            <b>500+</b>
                            <p>Campuses</p>
                        </div>
                        <div className={styles.count}>
                            <b>2500+</b>
                            <p>Learning Circles</p>
                        </div>
                    </div>
                </div>
                <img src="https://i.ibb.co/BwGShc8/planet.png" alt="globe" />
            </div>

            <div className={styles.LClandingPageExplore}>
                <div className={styles.exploreTitle}>
                    <b>Explore</b> <span>Learning Circles</span>
                </div>

                <div className={styles.selectOptions}>
                    <select name="" id="" >
                        <option value="">Kerala</option>
                    </select>
                    <select name="" id="">
                        <option value="">Select District</option>
                    </select>
                    <select name="" id="">
                        <option value="">Select Campus</option>
                    </select>
                    <select name="" id="">
                        <option value="">Select Interest Groups</option>
                    </select>
                </div>

                <div className={styles.container}>
                    <div className={styles.exploreCards}>
                        <img
                            src="https://i.ibb.co/zJkPfqB/Iot-Vector.png"
                            alt="png"
                        />
                        <h1>Internet of Things</h1>
                        <span>
                            <b>Creative Design</b> &nbsp;{" "}
                            <b>Members count: 08</b>
                        </span>
                    </div>
                    <div className={styles.exploreCards}>
                        <img
                            src="https://i.ibb.co/zJkPfqB/Iot-Vector.png"
                            alt="png"
                        />
                        <h1>Internet of Things</h1>
                        <span>
                            <b>Creative Design</b> &nbsp;{" "}
                            <b>Members count: 08</b>
                        </span>
                    </div>
                    <div className={styles.exploreCards}>
                        <img
                            src="https://i.ibb.co/zJkPfqB/Iot-Vector.png"
                            alt="png"
                        />
                        <h1>Internet of Things</h1>
                        <span>
                            <b>Creative Design</b> &nbsp;{" "}
                            <b>Members count: 08</b>
                        </span>
                    </div>
                    <div className={styles.exploreCards}>
                        <img
                            src="https://i.ibb.co/zJkPfqB/Iot-Vector.png"
                            alt="png"
                        />
                        <h1>Internet of Things</h1>
                        <span>
                            <b>Creative Design</b> &nbsp;{" "}
                            <b>Members count: 08</b>
                        </span>
                    </div>
                    <div className={styles.exploreCards}>
                        <img
                            src="https://i.ibb.co/zJkPfqB/Iot-Vector.png"
                            alt="png"
                        />
                        <h1>Internet of Things</h1>
                        <span>
                            <b>Creative Design</b> &nbsp;{" "}
                            <b>Members count: 08</b>
                        </span>
                    </div>
                    <div className={styles.exploreCards}>
                        <img
                            src="https://i.ibb.co/zJkPfqB/Iot-Vector.png"
                            alt="png"
                        />
                        <h1>Internet of Things</h1>
                        <span>
                            <b>Creative Design</b> &nbsp;{" "}
                            <b>Members count: 08</b>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
