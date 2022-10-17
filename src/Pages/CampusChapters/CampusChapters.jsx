import React from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";

import styles from "./CampusChapters.module.css";
import { Link } from "react-router-dom";

import Faq from "react-faq-component";

const CampusChapters = () => {
  const data = {
    title: "Frequently Asked Questions",
    rows: [
      {
        title: "Why the µLearn chapter?",
        content:
          "The world is evolving at a quicker rate than it has ever been in human history. The employment economy is continuously changing, and learning tools are expanding as well. All we have to do now is adjust to these tremendous waves of change. We must also guarantee that no one is left behind as the world becomes more digital. As a result, we established the club to ensure that our youth have access to the tools they need to engage in and contribute to 21st-century technological breakthroughs. To be flag bearers of a change of this scale, we need our students to innovate, learn to learn, solve problems and collaborate on a massive scale. We have built programs, projects and resources that revolve around these core areas.",
      },
      {
        title: "What is the µLearn Chapter?",
        content:
          "The Campus community is key to ensuring μLearn’s activities and initiatives properly reaches its desired audience. This vertical is crucial to taking μLearn forward and plays an in-express-able role in the future of our community.",
      },
      {
        title: "What’s the chapter’s focus and why?",
        content:
          "µLearn, is an industry-enabled digital platform for peer learning to nurture students with the necessary expertise in industry from their college days.Through Mu Learn, students will get the opportunity to network, acquire and demonstrate their skills with the help of mentors and industry leaders, along with internships and training.Tech communities have had an unprecedented impact on student development in these last couple of years. These communities have helped students to think together with industry leaders, find their tech niches, and participate in boot camps to perfect their crafts.",
      },
      {
        title: "How to start a µLearn Chapter?",
        content:
          "To start a new chapter, the college must have 100k Karma Points in µLearn community, with minimum 100 chapter members. It must have a core team with an enabler. To be leads of the chapter, student must acquire 1k karma points and previous experience in conducting events.",
      },
      {
        title: "Who is a chapter member?",
        content:
          "In addition to the student ambassadors, chapters must consist of chapter members. Chapter Members are µLearn membership owners who are in the chapter college, can participate in other chapter events.",
      },
    ],
  };

  const fstyles = {
    // bgColor: 'white',
    titleTextColor: "#f78c40",
    rowTitleColor: "#404040",
    rowContentColor: "#373737",
    arrowColor: "#f78c40",
  };
  return (
    <>
      <Navbar />
      <div className={styles.main_container}>
        <div className={styles.first_view_container}>
          <div className={styles.first_view}>
            <div className={styles.fv_texts}>
              <p className={styles.fv_heading}>
                Welcome to <span>µLearn</span> Campus Chapters
              </p>
              <p className={styles.fv_tagline}>
                Each campus has its own culture, with students having their
                specific interests and liking. Campus chapters seek to bring
                together students within a college, developing the μLearn
                culture from within. Campus Chapters thus act as a body that
                allows μLearn to reach out to its members with their specific
                needs and provide them with all necessary resources to help them
                venture into their interests.
              </p>
              <Link to="welcome">
                <button className={styles.leadcampus}>Lead a Campus</button>
              </Link>
              <Link to="findcampus">
                <button className={styles.leadcampus}>Find Campus</button>
              </Link>
            </div>
            <div className={styles.fv_image}>
              <img
                src="/assets/campuscommunity/fvimg.gif"
                alt=""
                className={styles.fv_img}
              />
            </div>
          </div>
        </div>

        <div className={styles.second_view_container}>
          <div className={styles.second_view}>
            <div className={styles.sv_texts}>
              {/* <p className={styles.sv_pheading}>Lorem, ipsum dolor.</p> */}
              <p className={styles.sv_heading}>Why µLearn for Campuses?</p>
            </div>
            <div className={styles.d_main_container}>
              <div style={{ marginTop: 0 }} className={styles.d_container}>
                <div className={styles.d_heading}>
                  <div className={styles.d_number}>1</div>
                  <span>Echo Chambers</span>
                </div>
                <p className={styles.d_text}>
                  Regular Communities teach us upskilling and knowledge at a
                  limited resource, post which they all tend to fall into the
                  echo chamber and leave students with the belief that they are
                  well versed while just being at an average level.
                </p>
              </div>
            </div>
            <div className={styles.d_video_container}>
              <div className={styles.d_video}>
                <iframe
                  src="https://www.youtube.com/embed/pEwJhL9A7xc"
                  title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                ></iframe>
              </div>

              <div className={styles.d_main_container}>
                <div className={styles.d_container}>
                  <div className={styles.d_heading}>
                    <div className={styles.d_number}>2</div>
                    <span>Quality Resources</span>
                  </div>
                  <p className={styles.d_text}>
                    Students get privileged access to core and relevant courses,
                    such as those provided by our community partner Google.
                  </p>
                </div>
                <div className={styles.d_container}>
                  <div className={styles.d_heading}>
                    <div className={styles.d_number}>3</div>
                    <span>The Real World</span>
                  </div>
                  <p className={styles.d_text}>
                    µLearn campus chapters help to break the echo chambers and
                    move out and experience the real world.Get mentored by
                    experienced company professionals from various domains.
                  </p>
                </div>
                <div className={styles.d_container}>
                  <div className={styles.d_heading}>
                    <div className={styles.d_number}>4</div>
                    <span>Infinite Opportunties.</span>
                  </div>
                  <p className={styles.d_text}>
                    At µLearn, the students get connected with the rest of the
                    community chapters, so they are in an infinite loop of
                    upskilling and connecting with new opportunities.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.generator_view_container}>
          <div className={styles.generator_view}>
            <div className={styles.gv_texts}>
              <p className={styles.gv_heading}>The Campus Logo Generator</p>
              <p className={styles.gv_tagline}>
                Interations are much more interesting when you are interacting
                face-to-face with each other.
              </p>

              <div className={styles.redirection_container}>
                <div className={styles.redirection_text}>
                  <p className={styles.redirection_heading}>
                    Looking for a Campus Logo?
                  </p>
                  <p className={styles.redirection_tagline}>
                    Checkout out our Campus Logo Generator to create a face for
                    your campus
                  </p>
                </div>
                <a
                  href="http://mulearn.org/campus-logo-generator"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className={styles.redirection_button}>
                    Create Now
                  </button>
                </a>
              </div>
            </div>
            {/* 
            <img
              src="/assets/campuscommunity/logogen.png"
              alt=""
              className={styles.gv_img}
            /> */}
          </div>
        </div>

        <div className={styles.third_view_container}>
          <div className={styles.third_view}>
            <div className={styles.tv_texts}>
              <p className={styles.tv_heading}>
                <span>Campus</span> Success Stories
              </p>
              <p className={styles.tv_tagline}>
                Get insights into how μLearn Campus Chapters have collaborated
                with Student heroes to build a vibrant campus community and
                share best practices.
              </p>
            </div>
            <div className={styles.tv_story_container}>
              <div className={styles.tv_story}>
                <img
                  src="/assets/campuscommunity/amritha.jpeg"
                  alt=""
                  className={styles.story_img}
                />
                <p className={styles.story_name}>Amritha G S</p>
                <p className={styles.story_text}>
                  Read the Story of a Graduate in Electrial and Electronics and
                  the way she steered her college as one of the top-performing
                  colleges among the 200+ onboarded across the state.
                </p>
                <Link to="/blog/amirthags">
                  <p className={styles.read_more}>Read More...</p>
                </Link>
              </div>
              <div className={styles.tv_story}>
                <img
                  src="/assets/campuscommunity/jessno.jpg"
                  alt=""
                  className={styles.story_img}
                />
                <p className={styles.story_name}>Jessno Oommen Jose</p>
                <p className={styles.story_text}>
                  Read the Story of a Graduate in Electronics and Communication
                  Engineering and how she placed her college in the first
                  position in the state and became the Kerala state lead of
                  𝝁Learn.
                </p>
                <Link to="/blog/jessno">
                  <p className={styles.read_more}>Read More...</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.faq_view_container}>
          <div className={styles.faq_view}>
            <Faq data={data} styles={fstyles} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CampusChapters;
