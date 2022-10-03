import React from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";

import styles from "./ArtOfTeaching.module.css";

import Faq from "react-faq-component";

import fvimg from "./assets/fvimg.gif";

import MentorCard from "../../Components/MentorCard/MentorCard";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import { Pagination } from "swiper";

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
              <div className={styles.event_partners}>
                <div className={styles.partners}>
                  <p className={styles.event_partners_heading}>
                    Event Partners
                  </p>
                  <div className={styles.partner}>
                    <img
                      src="assets/artofteaching/ktu.png"
                      alt=""
                      className={styles.partner_image}
                    />
                  </div>
                  <div className={styles.partner}>
                    <img
                      src="assets/artofteaching/google_android.webp"
                      alt=""
                      className={styles.partner_image}
                    />
                  </div>
                </div>
              </div>
              <a
                href="https://airtable.com/shrC6h0CFSAZLaZUk"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button
                  style={{ fontSize: "1rem" }}
                  className={styles.detailsbtn}
                  type="submit"
                >
                  Pre-Register Now!
                </button>
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
                Teaching is an art and teachers are the artists, calling all the
                artists to present their masterpieces of teaching to the world.
                <br />
                <br />
                Art of Teaching is a 3-minute video contest, where the teachers
                can send in a video of them teaching any of the following topic
                in a creative manner.
              </p>
            </div>

            <div className={styles.cards_container_desktop}>
              <Swiper
                pagination={true} modules={[Pagination]}
                className={styles.swiper}
              >
                <SwiperSlide>
                  <div className={styles.topic_card_android}>
                    <div className={styles.topic_card}>
                      <p className={styles.card_heading}>
                        <span>Android Development with Kotlin</span> by Google.
                      </p>
                      <p className={styles.card_description}>
                        The participants have to learn the Android Development
                        with Kotlin course and they have to create a 3 minute
                        video summary of the course.
                        
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className={styles.topic_card}>
                    <p className={styles.card_heading}><span>Lessons of</span> Future</p>
                    <p className={styles.card_description}>
                      The participants can choose any topic which is related to
                      emerging topics in their field and they can create video
                      on that topic. Some sample topics are given below.
                    </p>
                    <ul className={styles.examples}>
                      <li>
                        <span>Civil Engineering</span> : BIM, Smart city
                        planning. etc..
                      </li>
                      <li>
                        <span>Mechanical Engineering</span>: 3D Printing,
                        Friction Stir Welding etc..
                      </li>
                      <li>
                        <span>Electronics Engineering</span>: IoT, Quantum
                        Computing, Bioelectronics etc..
                      </li>
                      <li>
                        <span>Electrical Engineering</span>: Battery Technology,
                        Fast Charging, wireless charging, smart grid etc..
                      </li>
                      <li>
                        <span>Chemical Engineering</span>: Nanomaterials, Water
                        Purification etc ..
                      </li>
                      <li>
                        <span>Arts & Sciences</span>: Impact of Artificial
                        Intelligence and Machine Learning in their respective
                        fields like driverless tractor in Agriculture to
                        Election Campaign strategies for Social Media. etc..
                      </li>
                    </ul>
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>

            <div className={styles.cards_container_mobile}>
              <div className={styles.topic_card}>
                <p className={styles.card_heading}>
                  <span>Android Development with Kotlin</span> by Google.
                </p>
                <p className={styles.card_description}>
                  The participants have to learn the Android Development with
                  Kotlin course and they have to create a 3 minute video summary
                  of the course.
                </p>
              </div>

              <div className={styles.topic_card}>
                <p className={styles.card_heading}><span>Lessons of</span> Future</p>
                <p className={styles.card_description}>
                  The participants can choose any topic which is related to
                  emerging topics in their field and they can create video on
                  that topic. Some sample topics are given below.
                </p>
                <ul className={styles.examples}>
                  <li>
                    <span>Civil Engineering</span> : BIM, Smart city planning.
                    etc..
                  </li>
                  <li>
                    <span>Mechanical Engineering</span>: 3D Printing, Friction
                    Stir Welding etc..
                  </li>
                  <li>
                    <span>Electronics Engineering</span>: IoT, Quantum
                    Computing, Bioelectronics etc..
                  </li>
                  <li>
                    <span>Electrical Engineering</span>: Battery Technology,
                    Fast Charging, wireless charging, smart grid etc..
                  </li>
                  <li>
                    <span>Chemical Engineering</span>: Nanomaterials, Water
                    Purification etc ..
                  </li>
                  <li>
                    <span>Arts & Sciences</span>: Impact of Artificial
                    Intelligence and Machine Learning in their respective fields
                    like driverless tractor in Agriculture to Election Campaign
                    strategies for Social Media. etc..
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.fourth_view_container}>
          <div className={styles.fourth_view}>
            <div className={styles.left_side}>
              <p className={styles.fr_heading}>
                Art of Teaching <span>First Edition</span>
              </p>
              <p className={styles.fr_tagline}>
                The First Edition of Art of Teaching was a huge success with
                more than 100 distinct entries,all of which used creative
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
                We do needed some really creative people with amazing mentoring
                skills to judge all your submissions. Listed below were our
                judges for the first edition of Art of Teaching.
              </p>
              <div className={styles.judges_card_container}>
                <div className={styles.judges_card}>
                  <MentorCard
                    name={"Dr T M George"}
                    designation={
                      "Former Principal at Mar Baselios College of Engineering and Technology"
                    }
                    image={"assets/artofteaching/j1.jpeg"}
                    linkedIn={
                      "https://www.linkedin.com/in/dr-t-m-george-87b86028/?originalSubdomain=in"
                    }
                  />
                </div>

                <div className={styles.judges_card}>
                  <MentorCard
                    name={"Ann Andrews"}
                    designation={
                      "Product | Technology & Data Strategy | NYU & Columbia Fellow"
                    }
                    image={"assets/artofteaching/j2.jpeg"}
                    linkedIn={"https://www.linkedin.com/in/deepusnath/"}
                  />
                </div>
                <div className={styles.judges_card}>
                  <MentorCard
                    name={"Rajeev J Sebastian"}
                    designation={"CEO Alokin Software Private Limited"}
                    image={"assets/artofteaching/j3.png"}
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
                Take a look at the top submissions by the teachers from the the
                first edition of The Art of Teaching.
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
