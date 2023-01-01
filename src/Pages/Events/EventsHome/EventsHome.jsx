import React from "react";
import styles from "./EventsHome.module.css";

import Navbar from "../../../Components/Navbar/Navbar";
import Footer from "../../../Components/Footer/Footer";
import { Link } from "react-router-dom";

const EventsHome = () => {
  return (
    <>
      <Navbar />
      <div className={styles.main_container}>
        <div className={styles.first_view_container}>
          <div className={styles.first_view}>
            <div className={styles.fv_texts}>
              <p className={styles.fv_heading}>
                <span>µLearn</span> Events
              </p>
              <p className={styles.fv_tagline}>
                Several recurring activities are conducted at µLearn each week.
                There will be events filled with stories, learning experiences,
                inspirations, and much more. Join in and let's learn something
                new.
              </p>
            </div>
            <div className={styles.fv_images}>
              <img
                src="/assets/events/fvimg.gif"
                alt=""
                className={styles.fv_img}
              />
            </div>
          </div>
        </div>
        <div className={styles.second_view_container}>
          <div className={styles.second_view}>
            <div className={styles.sv_texts}>
              <p className={styles.sv_heading}>
                Weekly <span> Twitch Events</span>
              </p>
              <p className={styles.sv_tagline}></p>
            </div>
            <div className={styles.bootcamps}>
              <div className={styles.bootcamp}>
                <p className={styles.b_heading}>Inspiration Station Radio</p>
                <p className={styles.b_tagline}>
                  Everyone has a story to tell, the story about finding their
                  passion, the story of learning new things and much more. Often
                  times these stories are filled with fun and inspirations which
                  fuel others to start their own journey. Join in every
                  Tuesday@8:00PM to get Inspired.
                </p>
                <Link to="/isr">
                  <button className={styles.b_button}>Check It Out!</button>
                </Link>
              </div>
              <div className={styles.bootcamp}>
                <p className={styles.b_heading}>Open Mic</p>
                <p className={styles.b_tagline}>
                  Already too exhausted by your weekly chores? Insert Open Mic
                  🎤 into the equation and your weak becomes much more fun! Open
                  Mic is an original initiative by µLearn held every Thursday at
                  8:00 PM as part of Weekly Twitch. The event aims to provide
                  members an open stage to exhibit their skills and talents to
                  the community.
                </p>
                <Link to="/events/openmic">
                  <button className={styles.b_button}>Check It Out!</button>
                </Link>
              </div>
              <div className={styles.bootcamp}>
                <p className={styles.b_heading}>µLearn Mentor Connect</p>
                <p className={styles.b_tagline}>
                  GTech μLearn presents Mentor Connect 👨🏽‍🏫, an original
                  initiative as part of Weekly Twitch. Occurring every Friday at
                  7pm, this initiative will give members an opportunity to
                  interact, learn, and explore their interests with mentors from
                  the Industry.
                </p>
                <Link to="/events/mentorconnect">
                  <button className={styles.b_button}>Check It Out!</button>
                </Link>
              </div>
              <div className={styles.bootcamp}>
                <p className={styles.b_heading}>Salt Mango Tree</p>
                <p className={styles.b_tagline}>
                  English! English! English! I avoid I don't like it, but
                  English likes me, I can't avoid! Well since avoiding English
                  isn't an option, let's try to work towards improving our
                  knowledge of English, by practicing, together.
                </p>
                <Link to="/events/saltmangotree">
                  <button className={styles.b_button}>Check It Out!</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default EventsHome;
