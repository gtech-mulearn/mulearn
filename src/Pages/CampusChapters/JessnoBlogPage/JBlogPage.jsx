import React from "react";
import Footer from "../../../Components/Footer/Footer";
import Navbar from "../../../Components/Navbar/Navbar";
import styles from "./JBlogPage.module.css";

const JBlogPage = () => {
  return (
    <>
      <Navbar />
      <div className={styles.main_container}>
        <div className={styles.first_view_container}>
          <div className={styles.first_view}>
            <div className={styles.about}>
              <img
                src="/assets/campuscommunity/jessno.jpg"
                alt=""
                className={styles.story_img}
              />
              <p className={styles.name}>Jessno Oommen Jose</p>
              <p className={styles.details}>
                {" "}
                Graduate in Electronics and Communication Engineering from Mar
                Baselios College of Engineering and Technology
              </p>
            </div>
            <p className={styles.heading}>
              Read the Story of a Graduate in Electronics and Communication
              Engineering and how she placed her college in the first position
              in the state and became the Kerala state lead of 𝝁Learn.
            </p>
          </div>
        </div>

        <div className={styles.second_view_container}>
          <div className={styles.second_view}>
            <div className={styles.blog_container}>
              <p className={styles.blog_text}>
                She joined GTech 𝝁Learn as a campus ambassador in her third year
                of college. Her curiosity about how this community operated was
                mostly answered in a session conducted by the 𝝁Learn core team
                members. As she joined as a learner, she was able to pick up
                more on the process and have a good grasp of what 𝝁Learn
                offered. When she assumed the position of student ambassador,
                her college was ranked third out of all the onboarded colleges
                in Kerala.
                <br />
                <br />
                She was determined to make it better for her college and
                prepared towards its execution along with her co-campus
                ambassadors Raj and Gopee. After the introductory session
                provided by 𝝁Learn, she connected with Raj and Gopee and made
                plans on how they could make contributions as ambassadors and
                pitch this idea to their fellow collegemates.
                <br />
                <br />
                They conducted online sessions with the students to introduce
                them to this new GTech initiative. Everyone accomplished their
                tasks with interest, racking up more Karma Points. This
                eventually led to a significant accomplishment placing her
                college in the first position in the state.
                <br />
                <br />
                Further, she went on to assist students from other colleges as
                well, driving a positive impact. A couple of months later, she
                became the Kerala state lead where she had the opportunity to
                create a team of enthusiastic and bright people.
                <br />
                <br />
                She formed a community of friends through 𝝁Learn, which was
                beneficial for her career and helped her grow personally.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default JBlogPage;
