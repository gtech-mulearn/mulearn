import React from "react";
import Footer from "../../../Components/Footer/Footer";
import Navbar from "../../../Components/Navbar/Navbar";
import styles from "./BlogPage.module.css";

const BlogPage = () => {
  return (
    <>
      <Navbar />
      <div className={styles.main_container}>
        <div className={styles.first_view_container}>
          <div className={styles.first_view}>
            <div className={styles.about}>
              <img
                src="/assets/campuscommunity/amritha.jpeg"
                alt=""
                className={styles.story_img}
              />
              <p className={styles.name}>Amritha G S</p>
              <p className={styles.details}>
                {" "}
                Graduate in Electrical and Electronics Engineering from Trinity
                College of Engineering Thiruvananthapuram
              </p>
            </div>
            <p className={styles.heading}>
              Read the Story of a Graduate in Electrial and Electronics and the
              way she steered her college as one of the top-performing colleges
              among the 200+ onboarded across the state.{" "}
            </p>
          </div>
        </div>

        <div className={styles.second_view_container}>
          <div className={styles.second_view}>
            <div className={styles.blog_container}>
              <p className={styles.blog_text}>
                A graduate in Electrical and Electronics Engineering from
                Trinity College of Engineering Thiruvananthapuram, Amritha
                joined the GTech 𝝁Learn platform through the college placement
                cell, with the intent of receiving a good opportunity to develop
                excellent leadership and team management skills. Interestingly
                this platform was also her first time interacting with her
                co-campus ambassadors from the same college.
                <br />
                <br />
                She, along with her co-campus ambassadors, utilized the online
                meeting platforms that became widely popular with the advent of
                the COVID-19 lockdown to connect with their collegemates. Via
                online sessions, they were able to discuss what 𝝁Learn stood for
                and what they could gain by being a part of this community, and
                get them onboarded on to the 𝝁Learn Discord platform.
                <br />
                <br />
                She and her team were able to pique the interest of the majority
                in a college consisting of approximately 400 students. Although
                they noticed that the activity had reduced post the onboarding
                stage, her team was successful in motivating their peers to
                actively participate, steering them to the top position in the
                college leaderboard. Her college still stands as one of the
                top-performing colleges among the 200+ onboarded across the
                state.
                <br />
                <br />
                Amritha joined the platform as a learner and was shortly
                nominated as one of the student ambassadors of her college. She
                has then gone ahead to take up roles of a district lead and a
                moderator and also grabbed an internship opportunity with
                𝝁Learn. Her contributions to the community helped her attain the
                top performer award of the GTech 𝝁Learn community during the
                kick-start of 𝝁Learn 2.0.
                <br />
                <br />
                She believes that to create an impact, all you need to do is
                take initiative, step out of your comfort zone and have faith in
                yourself. With her having completed over a year of the student
                ambassador journey and currently pursuing higher education, she
                still intends to continue contributing to the community and help
                every individual who struggles in their professional journey.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BlogPage;
