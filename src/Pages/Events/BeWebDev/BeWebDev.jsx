import React from "react";
import styles from "./BeWebDev.module.css";
import Footer from "../../../Components/Footer/Footer";
import Navbar from "../../../Components/Navbar/Navbar";
import fv_img from "./assets/fv_img.gif";
import pygrammers from "./assets/pygrammers.webp";

const BeWebDev = () => {
  return (
    <>
      <Navbar />
      <div className={styles.main_view_container}>
        <div className={styles.first_view_container}>
          <div className={styles.first_view}>
            <div className={styles.fv_texts}>
              <p className={styles.fv_heading}>
                Introducing <br /> <span>Beweb.Dev</span>
              </p>
              <p className={styles.fv_tagline}>
                UNLOCK THE FULL-STACKER IN YOU!
              </p>
              <p className={styles.fv_subheading}>
                Unlock your fullstacker potential with BeWeb.Dev. From HTML to
                React.js and Django, our event guides beginners to experts. With
                mentor support and real-world projects, you'll gain the skills
                to succeed. Join now and amaze yourself!
              </p>
              <div className={styles.fv_supporters}>
                <span>Supported By</span>
                <img className={styles.pygrammers} src={pygrammers} alt="" />
              </div>
              <button className={styles.register_now}>Register Now</button>
            </div>
            <img src={fv_img} alt="" className={styles.fv_image} />
          </div>
        </div>
        <div className={styles.second_view_container}>
          <div className={styles.second_view}>
            <p className={styles.sv_heading}>
              Let's <span>Level-Up!</span>
            </p>
            <p className={styles.sv_subheading}>
              Unlock your potential by completing each level of the event and
              learn the skills to succeed.
            </p>
            <div className={styles.level_boxes}>
              <div className={styles.level_box}>
                <p className={styles.level_box_heading}>Level 1</p>
                <p className={styles.level_box_subheading}>
                  Basics of Web Development
                </p>
                <p className={styles.level_description}>
                  In Level 1, you'll learn the basics of web development,
                  including HTML, CSS, and JavaScript. You'll also learn how to
                  use Bootstrap to create responsive web pages.
                </p>
              </div>
              <div className={styles.level_box}>
                <p className={styles.level_box_heading}>Level 2</p>
                <p className={styles.level_box_subheading}>Python and Flask</p>
                <p className={styles.level_description}>
                  In Level 2, you'll learn the Python programming language and
                  the basics of Flask, a popular Python web framework.
                </p>
              </div>
              <div className={styles.level_box}>
                <p className={styles.level_box_heading}>Level 3</p>
                <p className={styles.level_box_subheading}>Django Framework</p>
                <p className={styles.level_description}>
                  In Level 3, you'll learn how to build web applications using
                  the Django framework, a high-level Python web framework used
                  for rapid development.
                </p>
              </div>
              <div className={styles.level_box}>
                <p className={styles.level_box_heading}>Level 4</p>
                <p className={styles.level_box_subheading}>
                  React.js Framework
                </p>
                <p className={styles.level_description}>
                  In Level 4, you'll learn how to build web applications using
                  the React.js framework, a JavaScript library used for building
                  user interfaces.
                </p>
              </div>
              <div className={styles.level_box}>
                <p className={styles.level_box_heading}>Level 5</p>
                <p className={styles.level_box_subheading}>
                  Combining Everything Learned
                </p>
                <p className={styles.level_description}>
                  In Level 5, you'll bring everything you've learned together
                  and work on projects that integrate all the technologies
                  you've learned. This level provides participants with
                  real-world experience working on web applications.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.second_view_container}>
          <div className={styles.second_view}>
            <p className={styles.sv_heading}>
              Register <span>Now</span>
            </p>
            <p className={styles.sv_subheading}>
              So, what are you waiting for? Register now and unlock your full
              stacker potential!
            </p>
            <button className={styles.register_now}>Register Now</button>
          </div>
        </div>
        <div className={styles.third_view_container}>
          <div className={styles.third_view}>
            <p className={styles.tv_texts}>
              <p className={styles.sv_heading}>Knowing More</p>
              <p className={styles.sv_subheading}>
                So, aren't you excited to know more about this event? Here are
                some more details to make you more excited.
              </p>
            </p>
            <div className={styles.tv_details}>
              <div className={styles.tv_detail}>
                <p className={styles.tv_detail_heading}>
                  Mentor Support and Tasks
                </p>
                <p className={styles.tv_detail_content}>
                  Throughout the event, you'll have access to mentor support.
                  Mentors will be available to help you with any questions you
                  have and provide guidance and feedback on your projects. Each
                  level will have specific tasks for you to complete, building
                  on the knowledge gained in the previous level.
                </p>
              </div>
              <div className={styles.tv_detail}>
                <p className={styles.tv_detail_heading}>
                  Our Program's Approach
                </p>
                <p className={styles.tv_detail_content}>
                  At BeWeb.Dev, we take a comprehensive approach to learning.
                  Our program is designed to provide participants with a strong
                  foundation in web development and gradually build upon that
                  knowledge until they become proficient in all aspects of web
                  development. We believe that this approach provides
                  participants with the tools and skills they need to succeed in
                  the real world.
                </p>
              </div>

              <div className={styles.tv_detail}>
                <p className={styles.tv_detail_heading}>
                  Our Mentorship Program
                </p>
                <p className={styles.tv_detail_content}>
                  Mentors support 10 students each, with a Whatsapp group for
                  quick queries. Daily follow-ups ensure tasks are completed on
                  time. Inactive students are terminated. Mentors hold events to
                  improve group interaction. The main coordinator monitors
                  mentors daily.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BeWebDev;
