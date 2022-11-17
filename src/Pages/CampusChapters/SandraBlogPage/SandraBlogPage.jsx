import React,{useEffect} from "react";
import Navbar from "../../../Components/Navbar/Navbar";
import Footer from "../../../Components/Footer/Footer";
import styles from "./SandraBlogPage.module.css";

const SandraBlogPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <>
      <Navbar />
      <div className={styles.main_container}>
        <div className={styles.first_view_container}>
          <div className={styles.first_view}>
            <div className={styles.about}>
              <img
                src="/assets/campuscommunity/sandra.jpg"
                alt=""
                className={styles.story_img}
              />
              <p className={styles.name}>Sandra Pramod</p>
              <p className={styles.details}>
                {" "}
                Graduate in Computer Science and Engineering from St. Joseph’s
                College of Engineering and Technology, Palai
              </p>
            </div>
            <p className={styles.heading}>
              Read the Story of a graduate of Computer Science and Engineering
              from St. Joseph’s College of Engineering and Technology and how she
              transformed her college to the top-performing college for the
              academic year 2021–2022
            </p>
          </div>
        </div>

        <div className={styles.second_view_container}>
          <div className={styles.second_view}>
            <div className={styles.blog_container}>
              <p className={styles.blog_text}>
                A graduate of Computer Science and Engineering from St. Joseph’s
                College of Engineering and Technology, Palai, Sandra currently
                works at South Indian Bank's digital and technology division.
                Being an enthusiast about community involvement and also being
                part of a couple of communities, it was only natural that Sandra
                took a step ahead into the µLearn community as well, to see what
                it offered her. She took the stride in her fourth year of
                college to join µLearn as a campus ambassador. Right from the
                first interaction she had with this community, Sandra realised
                the importance of the µLearn platform and believed it to be a
                place where she could acquire more learning than a college could
                offer.
                <br />
                <br />
                Sandra’s active involvement in several meetings and the
                community in general, along with her strong communication skills
                earned her the confidence of the people she worked with, which
                led to her appointment as the µLearn Kottayam district head. She
                gained a lot of knowledge, developed her organisational skills,
                and made connections with many wonderful members of the
                community while serving as the district head.
                <br />
                <br />
                With her college harbouring multiple communities already, it was
                not easy to introduce them to yet another community and present
                its unique value. But she succeeded to get through the
                challenges with the help of her team, the placement cell and
                college mentors, and a campus chapter of µLearn was established
                in her college. An introductory class for each year and MCA was
                initially created, which greatly aided in the growth of the
                community.
                <br />
                <br />
                Her efforts helped the students bridge their skill gaps,
                identify their actual potential and interests, and understand
                the value of going beyond the boundaries of the college
                curriculum. Due to the enrollment of a large number of students
                in the µLearn Discord platform and their active engagement, her
                institution was awarded the position of the top-performing
                college for the academic year 2021–2022 by Sri K N Balagopal,
                Kerala's honourable finance minister.
                <br />
                <br />
                Alongside the district head stint, she also worked as an intern
                for the YIP Program organized by K-DISC and was given the
                responsibility of serving as the program's state lead. Now
                exposed to a broader avenue, she had the opportunity to teach
                students at various colleges and introduce them to new things
                while being an intern. This boosted her confidence, enhancing
                her organisational, communication, and leadership skills which
                helped her thrive in her job interviews. Working with µLearn
                made her well-equipped to handle challenging questions in
                interviews.
                <br />
                <br />
                <i>
                  "What we will face in the workplace is very different from
                  what we learn in college. Theory and application are
                  definitely two, and joining learning communities gives you a
                  head start in being industry-ready. µLearn is one such
                  community which definitely helps you become industry-ready and
                  land your dream job.”
                </i>{" "}
                - Sandra Pramod
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SandraBlogPage;
