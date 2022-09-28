import React from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";

import styles from "./ArtOfTeaching.module.css";

import Faq from "react-faq-component";

import fvimg from "./assets/fvimg.gif";

import MentorCard from "../../Components/MentorCard/MentorCard";

const ArtOfTeaching = () => {
  const data = {
    title: "Frequently Asked Questions",
    rows: [
      {
        title: "What are the Judgement Criteria?",
        content:
          "The maximum length of the video can be 3 minutes. Fact check of the information provided in the video. Clarity of the topic taught. Way of Presentation etc..",
      },
      {
        title: "What all are the event Guidelines?",
        content:
          "The maximum length of the video can be 3 minutes. It is not necessary that you send a 'lecture' video, you can also send in a screen recording of you teaching a concept in a creative manner.",
      },
      {
        title: "What is the Registration Process",
        content:
          "Register using the airtable form given above. Upon registration you'll receive a ticket of participation. Which ensures your slot in the contest. You'll then receive another link to submit your video within a day. When submitting the video you are supposed to upload the ticket of participation. You will then receive an acknowledgement of submission.",
      },
      {
        title: "Can I submit multiple videos?",
        content:
          "For a unified and seamless judging, multiple entries are not allowed.",
      },
      {
        title: "Can I resubmit my video?",
        content:
          "Yes, you can resubmit your entry if you think your previous submission lacked a certain element that you aimed for.",
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
                <span>µLearn Art</span> of Teaching 2.0
              </p>
              <p className={styles.fv_tagline}>
                µLearn is back with Art of Teaching to honor teachers who are
                the one who mould our future generation. GTech µLearn is
                partnering with Google developers, KTU and Kerala University for
                Art of Teaching 2.0.
              </p>
              <a
                href="https://airtable.com/shrC6h0CFSAZLaZUk"
                target="_blank"
                rel="noopener noreferrer"
              >
                {/* <button
                  style={{ fontSize: "1rem" }}
                  className={styles.detailsbtn}
                  type="submit"
                >
                  Register Now!
                </button> */}
              </a>
            </div>
            <div className={styles.fv_images}>
              <img src={fvimg} alt="" className={styles.fv_img} />
            </div>
          </div>
        </div>
        <div className={styles.second_view_container}>
          <div className={styles.second_view}>
            <div className={styles.sv_texts}>
              <p className={styles.theme}>Theme: Lessons of The Future.</p>
              <p className={styles.sv_heading}>
                What is <span>The Contest?</span>
              </p>

              <p className={styles.sv_tagline}>
                A 3-minute video contest, where the teachers can send in a video
                of them teaching any of the following topic in a creative
                manner.
              </p>
            </div>

            <div className={styles.cards_container}>
              <div className={styles.topic_card}>
                <p className={styles.card_heading}>
                  Android Development with Kotlin by Google.
                </p>
                <p className={styles.card_description}>
                  The participants have to learn the Android Development with
                  Kotlin course and they have to create a 3 minute video summary
                  of the course.
                </p>
                <a
                  href="https://mulearn.notion.site/Art-of-Teaching-2-0-Lessons-of-Future-96eed1e8cf524d4c88d996e6fbed7fe7"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className={styles.detailsbtn} type="submit">
                    View More Details
                  </button>
                </a>
              </div>

              <div className={styles.topic_card}>
                <p className={styles.card_heading}>Own Topic</p>
                <p className={styles.card_description}>
                  The participants can choose any topic which is related to
                  emerging topics in their field and they can create video on
                  that topic.Click view more button to see more details.
                </p>
                <a
                  href="https://mulearn.notion.site/Art-of-Teaching-2-0-Lessons-of-Future-96eed1e8cf524d4c88d996e6fbed7fe7"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className={styles.detailsbtn} type="submit">
                    View More Details
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* <div className={styles.third_view_container}>
          <div className={styles.third_view}>
            <div className={styles.tv_texts}>
              <div className={styles.tv_text}>
                <p className={styles.tv_heading}>
                  <span>Contest</span> Guidelines
                </p>
                <ul className={styles.tv_lists}>
                  <li className={styles.tv_list_item}>
                    The maximum length of the video can be 3 minutes.
                  </li>
                  <li className={styles.tv_list_item}>
                    It is not necessary that you send a 'lecture' video, you can
                    also send in a screen recording of you teaching a concept in
                    a creative manner.
                  </li>
                  <li className={styles.tv_list_item}>
                    The submission closes on 30th September midnight
                  </li>
                </ul>
              </div>
              <div className={styles.tv_text}>
                <p className={styles.tv_heading}>
                  <span>Registration</span> Process
                </p>
                <ul className={styles.tv_lists}>
                  <li className={styles.tv_list_item}>
                    Register using airtable form
                  </li>
                  <li className={styles.tv_list_item}>
                    Upon registration you'll receive a ticket of participation.
                    Which ensures your slot in the contest.
                  </li>
                  <li className={styles.tv_list_item}>
                    You'll then receive another link to submit your video within
                    a day.
                  </li>
                  <li className={styles.tv_list_item}>
                    When submitting the video you are supposed to upload the
                    ticket of participation.
                  </li>
                  <li className={styles.tv_list_item}>
                    You'll then receive an acknowledgement of submission.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div> */}

        <div className={styles.fourth_view_container}>
          <div className={styles.fourth_view}>
            <div className={styles.left_side}>
              <p className={styles.fr_heading}>
                Art of Teaching <span>First Edition</span>
              </p>
              <p className={styles.fr_tagline}>
                The First Edition of Art of Teaching was a huge success, with
                more than 100 distinct entries, all of which used creative
                teaching methods to simplify a topic for better understanding by
                a student.
              </p>
            </div>
            <div className={styles.right_side}>
              <div className={styles.ytplayer}>
                <iframe
                  className={styles.yt_video}
                  src="https://www.youtube.com/embed/vPLuA5kXoBI"
                  title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                ></iframe>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.judge_view_container}>
          <div className={styles.judge_view}>
            <div className={styles.jv_texts}>
              <p className={styles.jv_heading}>
                The Former <span> Judging Panel</span>
              </p>
              <p className={styles.jv_text}>
                We had some really creative and people with amazing
                mentoring skills to judge all your submissions. Listed below
                were our judges for the first edition of Art of Teaching.
              </p>
              <div className={styles.judges_card_container}>
                <div className={styles.judges_card}>
                  <MentorCard
                    name={"Dr T M George"}
                    designation={
                      "Former Principal at Mar Baselios College of Engineering and Technology"
                    }
                    image={"assets/artofteaching/j2.jpeg"}
                    linkedIn={
                      "https://www.linkedin.com/in/dr-t-m-george-87b86028/?originalSubdomain=in"
                    }
                  />
                </div>

                <div className={styles.judges_card}>
                  <MentorCard
                    name={"Deepu S Nath"}
                    designation={"Managing Director at FAYA"}
                    image={
                      "assets/artofteaching/deepu.jpeg"
                    }
                    linkedIn={"https://www.linkedin.com/in/deepusnath/"}
                  />
                </div>
                <div className={styles.judges_card}>
                  <MentorCard
                    name={"Rajeev J Sebastian"}
                    designation={"CEO Alokin Software Private Limited"}
                    image={"assets/artofteaching/j1.jpeg"}
                    linkedIn={"https://www.linkedin.com/in/rajeevjs"}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.videos_view_container}>
          <div className={styles.videos_view}>
            <div className={styles.vvtexts}>
              <p className={styles.vv_heading}>
                Art of Teaching <span>Archives</span>
              </p>
              <p className={styles.vv_tagline}>
                Take a look at the top submissions by the teachers from the
                first edition of the Art of Teaching.
              </p>
            </div>
            <div className={styles.videos_container}>
              <div className={styles.video}>
                <iframe
                  className={styles.ytvideo}
                  src="https://www.youtube.com/embed/Wmo0StqW9Kc"
                  title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                ></iframe>
              </div>
              <div className={styles.video}>
                <iframe
                  className={styles.ytvideo}
                  src="https://www.youtube.com/embed/TEylubYDzhQ"
                  title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                ></iframe>
              </div>
              <div className={styles.video}>
                <iframe
                  className={styles.ytvideo}
                  src="https://www.youtube.com/embed/jRcseEVk2sk"
                  title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                ></iframe>
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

export default ArtOfTeaching;
