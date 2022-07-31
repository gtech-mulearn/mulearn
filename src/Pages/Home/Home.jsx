import React from "react";
import styles from "../Home/Home.module.css";
import illustration from "./assets/illustration.png";

import involvement from "./assets/involvement.png";
import interactive from "./assets/interactive.png";
import innovation from "./assets/innovation.png";
import join from "./assets/join.png";
import Footer from "../../Components/Footer/Footer";
import Navbar from "../../Components/Navbar/Navbar";

import asap from "./assets/partners/asap.png";
import blockchain from "./assets/partners/blockchain.png";
import fof from "./assets/partners/fof.png";
import foxlab from "./assets/partners/foxlab.png";
import ieee from "./assets/partners/ieee.png";
import kites from "./assets/partners/kites.png";
import pygrammers from "./assets/partners/pygrammers.png";
import xtrudar from "./assets/partners/xtrudar.png";

import CountUp from "react-countup";

const Home = () => {
  return (
    <>
      <Navbar />
      <div className={styles.firstviewmain_container}>
        <div className={styles.firstview_container}>
          <div className={styles.first_view}>
            <div className={styles.fv_texts}>
              <p className={styles.fv_heading}>
                Let's <span>break the Echo Chambers</span> Together.
              </p>
              <p className={styles.fv_tagline}>
                µLearn is a synergic philosophy of education, with a culture of
                mutual learning through micro peer groups. We are here to assist
                you in breaking through the echo chambers and free you from the
                shackles you have grounded yourself in.
              </p>
            </div>
            <button className={styles.primary}>Join Us</button>
          </div>
          <img className={styles.fv_image} src={illustration} alt="" />
        </div>
      </div>

      <div className={styles.supportsviewmain_container}>
        <div className={styles.supportersview_container}>
          <p className={styles.supporter_heading}>
            Community Partners at <span>µLearn.</span>{" "}
          </p>
          <div className={styles.supporters}>
            <img src={asap} alt="" className={styles.supporter} />
            <img src={blockchain} alt="" className={styles.supporter} />
            <img src={fof} alt="" className={styles.supporter} />
            <img src={foxlab} alt="" className={styles.supporter} />
            <img src={ieee} alt="" className={styles.supporter} />
            <img src={kites} alt="" className={styles.supporter} />
            <img src={pygrammers} alt="" className={styles.supporter} />
            <img src={xtrudar} alt="" className={styles.supporter} />
          </div>
        </div>
      </div>

      <div className={styles.thirdviewmain_container}>
        <div className={styles.thirdview_container}>
          <div className={styles.third_view}>
            <div className={styles.tv_texts}>
              <p className={styles.tv_mainheading}>
                Exloring the Events at <span>µLearn.</span>{" "}
              </p>

              <p className={styles.tv_tagline}>
                Each week multiple events are conducted at µLearn. Events full
                of stories, learning experience, inspirations and much more
                awaits you there. Events are key to opening the doors of
                Interactions.{" "}
              </p>
            </div>
            <div className={styles.tv_points}>
              <div className={styles.tv_point}>
                <p className={styles.tvp_heading}>Inspiration Station Radio</p>
                <p className={styles.tvp_text}>
                  ISR is an event conducted at µLearn weekly. Here students come
                  in and share their stories and inspirations for listeners who
                  like to learn.
                </p>
              </div>
              <div className={styles.tv_point}>
                <p className={styles.tvp_heading}>Let's Chill</p>
                <p className={styles.tvp_text}>
                  A 30 minutes chill-out spot. Join the lobby voice channel in
                  our discord server every day at 6.30 pm to unwind, connect,
                  and socialize with our community members. Take part in
                  conversations and other enjoyable activities. Connect and
                  progress.
                </p>
              </div>
              <div className={styles.tv_point}>
                <p className={styles.tvp_heading}>Learning Circles</p>
                <p className={styles.tvp_text}>
                  An informal mechanism for bringing together learners who have
                  interests in similar topics across different fields and
                  disciplines. A fantastic way to spend your limited time
                  learning and exploring with a group of people with the same
                  interests!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.secondviewmain_container}>
        <div className={styles.secondview_container}>
          <div className={styles.second_view}>
            <p className={styles.sv_mainheading}>
              Knowing more about <span>µLearn!</span>{" "}
            </p>
            <p className={styles.sv_tagline}>
              Curious to know more about µLearn? Wanna explore what all wonders
              we can do as a team? Come, witness it by yourself!
            </p>
            <div className={styles.sv_points}>
              <div className={styles.sv_point}>
                <img src={involvement} alt="" className={styles.svp_image} />
                <div className={styles.svp_heading}>Involve</div>
                <div className={styles.svp_text}>
                  µLearn is a place for everyone. A place where one could
                  involve and evolve the most. Be a part of our intriguing
                  events like <span>Inspiration Radio</span>,{" "}
                  <span>Let's Chill</span> and make the most out of it.
                </div>
              </div>
              <div className={styles.sv_point}>
                <img src={innovation} alt="" className={styles.svp_image} />
                <div className={styles.svp_heading}>Innovate</div>
                <div className={styles.svp_text}>
                  A place brimming with possibilities for innovation and
                  astonishing creations. A perfect spot to display your works.
                  Here you always advance and invent yourself!
                </div>
              </div>
              <div className={styles.sv_point}>
                <img src={interactive} alt="" className={styles.svp_image} />
                <div className={styles.svp_heading}>Interact</div>
                <div className={styles.svp_text}>
                  An Interactive setting where each one of you could connect
                  with folks and mentors having a remarkable mindset. Your
                  involvements, and dedication to the community can even get you
                  an internship opportunity.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.countviewmain_container}>
        <div className={styles.countview_container}>
          <div className={styles.count_view}>
            <div className={styles.left_side}>
              <div className={styles.iframevideodesk}>
                <iframe
                  src="https://drive.google.com/file/d/1jlJ1BCSZ8yGQkcGcSCqsMZkd5sjlXOY8/preview"
                  width="420"
                  height="240"
                  allow="autoplay"
                ></iframe>
              </div>
              <div className={styles.iframevideomob}>
                <iframe
                  src="https://drive.google.com/file/d/1jlJ1BCSZ8yGQkcGcSCqsMZkd5sjlXOY8/preview"
                  width="320"
                  height="220"
                  allow="autoplay"
                ></iframe>
              </div>
              <p className={styles.cv_heading}>
                {" "}
                The <span>Impact</span> of <span>µLearn.</span>
              </p>
              <p className={styles.cv_text}>
                Over the span of the last one year we as a community has
                impacted a large number of students, mentors and Enablers
                allowing them to gain more knowledge about the ecosystem and
                upskill themselves.
              </p>
            </div>
            <div className={styles.rightside}>
              <div className={styles.countcontainer}>
                <div className={styles.count}>
                  <p className={styles.cvc_heading}>
                    <CountUp end={16000} duration={10} />+
                  </p>
                  <p className={styles.cvc_text}>Members</p>
                </div>

                <div className={styles.count}>
                  <p className={styles.cvc_heading}>
                    <CountUp end={120} duration={10} />+
                  </p>
                  <p className={styles.cvc_text}>Enablers</p>
                </div>
                <div className={styles.count}>
                  <p className={styles.cvc_heading}>
                    <CountUp end={100} duration={10} />+
                  </p>
                  <p className={styles.cvc_text}>Mentors</p>
                </div>
                <div className={styles.count}>
                  <p className={styles.cvc_heading}>
                    <CountUp end={10} duration={10} />+
                  </p>
                  <p className={styles.cvc_text}>Companies</p>
                </div>

                <div className={styles.count}>
                  <p className={styles.cvc_heading}>
                    <CountUp end={10} duration={10} />+
                  </p>
                  <p className={styles.cvc_text}>Communities</p>
                </div>

                <div className={styles.count}>
                  <p className={styles.cvc_heading}>
                    <CountUp end={2} duration={3} />+
                  </p>
                  <p className={styles.cvc_text}>Companies</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.joinviewmain_container}>
        <div className={styles.joinview_container}>
          <div className={styles.join_view}>
            <div className={styles.jv_texts}>
              <p className={styles.jv_heading}>
                {" "}
                Learn and Grow <span> Together</span> as a{" "}
                <span>Community</span>
              </p>
              <p className={styles.jv_content}>
                Are you ready to learn, grow and upskill yourself to the next
                level? Come, be a part of the community, and let's start
                learning in a new better way. Call in your friends as well,
                because things are going to change once you experience it and it
                is more effective when done with a group.
              </p>
              <div className={styles.highlights}>
                <p className={styles.highlight_text}>
                  Karma Points • Interest Groups • Learning Circles • Enablement
                  Tasks. <span> and to know more..</span>
                </p>
              </div>
              <button className={styles.primary}>Join Discord Server</button>
            </div>
            <img src={join} alt="" className={styles.join_img} />
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Home;
