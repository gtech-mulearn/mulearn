import React from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";

import styles from "./ArtOfTeaching.module.css";
import "./ArtOfTeaching.scss";

import Faq from "react-faq-component";

import fvimg from "./assets/fvimg.gif";

import MentorCard from "../../Components/MentorCard/MentorCard";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import { Pagination, Navigation } from "swiper"




const ArtOfTeaching = () => {

  const timelineStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginLeft: '20px'
  };

  const timelineItemStyle = {
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    marginBottom: '20px'
  };

  const circleStyle = {
    width: '20px',
    height: '20px',
    backgroundColor: '#555',
    borderRadius: '50%',
    position: 'relative',
    zIndex: '1'
  };

  const lineStyle = {
    width: '2px',
    height: '40px',
    backgroundColor: '#555',
    position: 'absolute',
    top: '20px',
    left: '9px',
    zIndex: '0'
  };
  const mobilelineStyle = {
    width: '2px',
    height: '40px',
    backgroundColor: '#555',
    position: 'absolute',
    top: '42px',
    left: '9px',
    zIndex: '0'
  };

  const contentStyle = {
    marginLeft: '40px',
    
  };


  const data = {
    title: "Frequently Asked Questions",
    rows: [
      {
        title: "What are the Judgement Criteria?",
        content:
          " There will be 2 levels, judging is done by evaluating creativity, clarity, effectiveness and delivery of teaching. Ensure all information is fact-checked.",
      },
      {
        title: "What all are the event Guidelines?",
        content:
          "Submit a 5-minute video on a specific topic. Then provide a detailed course design document based on your video. All submissions should be made on Discord.",
      },
      {
        title: "What is the Registration Process?",
        content:
          "Complete the registration form available on the μLearn website and social media handles. After registering, upload your video submission by the specified deadline. If selected for the second level, you will need to submit your detailed course design document by the given deadline.",
      },
      {
        title: "Can I submit multiple videos?",
        content:
          "For a unified and seamless judging, multiple entries are not allowed.",
      },
      {
        title: "Can I resubmit my video?",
        content:
          "Yes, you may resubmit your video if you feel the previous one lacked a certain element that you aimed for.",
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
                <span>µLearn Art</span> of Teaching 3.0
              </p>

              <p className={styles.fv_tagline}>
              µLearn is returning with Art of Teaching to pay tribute to educators who shape the next generation. 
              </p>
              {/*<div className={styles.event_partners}>
                <div className={styles.partners}>
                  <p className={styles.event_partners_heading}>
                    Event Partners
                  </p>
                  <div className={styles.partner}>
                    <img
                      src="assets/artofteaching/ktu.webp"
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
              </div> */}
              
           
              <div className="flex flex-col lg:flex-row justify-center items-center lg:justify-start text-center lg:items-start gap-2 mt-2">
               
                <a href="https://mulearn.org/r/artofteaching" className="no-underline">
               <button className="px-6 py-2 bg-muorange text-center text-white rounded-md lg:w-[150px] w-[300px] lg:mr-0 ">
               Register Now
               </button>
               </a>
             

    <div className="flex flex-row justify-center items-center gap-1" >  
   <a href="https://mulearn.org/enablers"><button className="border-2 border-muorange text-muorange px-6 py-2 rounded-md w-[150px] lg:w-auto">
    Enablers
    </button></a> 
    <a href="https://mulearn.org"><button className="border-2 border-muorange text-muorange px-6 py-2 rounded-md w-[150px] lg:w-auto">
     µlearn
  </button></a>
    </div>
  
  
</div>
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
                What is <span>Art of Teaching???</span>
              </p>

              <p className={styles.sv_tagline}>
                {/* Teaching is an art and teachers are the artists, calling all the
                artists to present their masterpieces of teaching to the world. */}
                The 'Art of Teaching' is a contest that celebrates educators who creatively simplify complex 
                topics for better student understanding and retention.
                <br />
                <br />
                {/* Art of Teaching is a 3-minute video contest, where the teachers
                can send in a video of them teaching any of the following topic
                in a creative manner. */}
                To participate in the "Art of Teaching" contest, submit a 5-minute video for Level 1 showcasing your innovative approach to a selected topic.
                 After which for Level 2, provide a detailed course design document based on your video presentation to further develop your ideas.
              </p>
            </div>

            <div className={styles.cards_container_desktop}>
              <Swiper
                // pagination={true}
                // navigation={true}
                // modules={[Pagination, Navigation]}
                className="aswiper"
              >
               <SwiperSlide>
                
                 {/* <div className={styles.topic_card_android}>
                    <div className={styles.topic_card}>
                      <p className={styles.card_heading}>
                        <span>Android Development with Kotlin</span> by Google.
                      </p>
                      <p className={styles.card_description}>
                        If you choose Android Development as the content you
                        would have to learn the Android Development with Kotlin
                        and have to create a 3 minute video summary of the
                        course.
                      </p>
                      <a
                        href="https://developer.android.com/courses/android-basics-compose/course"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <button
                          style={{ fontSize: "1rem" }}
                          className={styles.detailsbtn}
                          type="submit"
                        >
                          View Course
                        </button>
                      </a>
                    </div>
                  </div>*/}

                  <div className={styles.topic_card_android}>
                  <p className={styles.card_heading}>
                     <span> Guidlines</span>
                    </p>
                  <div style={timelineStyle}>
                  <div>
                  <h3 className={"styles.sv_tagline mt-2 mb-2"} style={{fontSize:'18px'}}>Level1</h3>
      </div>
      <div className=" pl-4" style={timelineItemStyle}>
        <div className=" pl-4" style={circleStyle}></div>
        <div className=" ml-4" style={lineStyle}></div>
        <div style={contentStyle} ><p style={{fontSize:'17px'}}>Task 1 - Self introduction with welcome ticket.</p></div>
      </div>
      <div className=" pl-4" style={timelineItemStyle}>
        <div className=" pl-4" style={circleStyle}></div>
        <div className=" ml-4"style={lineStyle}></div>
        <div style={contentStyle}><p style={{fontSize:'17px'}}>Task 2 - Video submission explaining a selected topic.</p></div>
      </div>
      <div>
        <h3 className={"styles.sv_tagline mt-2 pt-3 pb-1"} style={{fontSize:'18px'}}>Level2</h3>
      </div>
      <div  className=" pl-4"style={timelineItemStyle}>
        <div className=" pl-4"style={circleStyle}></div>
        <div className="ml-4" style={lineStyle}></div>
        <div style={contentStyle}><p style={{fontSize:'17px'}}>Task 1 - Detailed document submission of the designed course curriculam.</p></div>
        
      </div>
      <div className="mt-2">
          <a href="https://docs.google.com/document/d/1wnzN2rwKfS3Y4t_A6KMxyCm3mSNWMvGhzqjNaZ-hYGk/edit?usp=drivesdk">
          <button style={{font:'bold', fontSize:'16px',width:'180px'}} className={styles.create }>Download Pdf</button></a> 
        </div>
    </div>
                  </div>
                </SwiperSlide>
                
          
              </Swiper>
            </div>

            <div className={styles.cards_container_mobile} style={{marginTop:'45px',marginBottom:'30px'}}>
            <div className={styles.topic_card_android} style={{marginTop:'45px',marginBottom:'30px'}}>
                  <p className={styles.card_heading}>
                     <span className="pt-5"> Guidlines</span>
                    </p>
                  <div style={timelineStyle}>
                  <div>
                  <h3 className={styles.sv_tagline} style={{fontSize:'18px'}}>Level1</h3>
      </div>
      <div className=" pl-4" style={timelineItemStyle}>
        <div className=" pl-4" style={circleStyle}></div>
        <div className=" ml-4" style={mobilelineStyle}></div>
        <div style={contentStyle}  className={styles.sv_tagline}>Task 1 - Self introduction with welcome ticket.</div>
      </div>
      <div className=" pl-4" style={timelineItemStyle}>
        <div className=" pl-4" style={circleStyle}></div>
        <div className=" ml-4"style={mobilelineStyle}></div>
        <div style={contentStyle}  className={styles.sv_tagline}>Task 2 - Video submission explaining a selected topic.</div>
      </div>
      <div className="mt-3 pt-2">
        <h3 className={styles.sv_tagline} style={{fontSize:'18px'}}>Level2</h3>
      </div>
      <div  className=" pl-4"style={timelineItemStyle}>
        <div className=" pl-4 pb-5"style={circleStyle}></div>
        <div className="ml-4" style={mobilelineStyle}></div>
        <div style={contentStyle} className={styles.sv_tagline} ><p className="pt-3">Task 1 - Detailed document submission of the designed course curriculam.</p></div>
      </div>
      
      <div className="mt-5">
      <a href="https://docs.google.com/document/d/1wnzN2rwKfS3Y4t_A6KMxyCm3mSNWMvGhzqjNaZ-hYGk/edit?usp=drivesdk">
      <button style={{font:'bold', fontSize:'16px',width:'180px'}} className={styles.create }>Download Pdf</button></a> 
        </div>
    </div>
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
                  src="https://www.youtube-nocookie.com/embed/vPLuA5kXoBI"
                  title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                  loading="lazy"
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
                We needed some really creative people with amazing mentoring
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
                    image={"assets/artofteaching/j1.webp"}
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
                    image={"assets/artofteaching/j2.webp"}
                    linkedIn={"https://www.linkedin.com/in/annandrews/"}
                  />
                </div>
                <div className={styles.judges_card}>
                  <MentorCard
                    name={"Rajeev J Sebastian"}
                    designation={"CEO Alokin Software Private Limited"}
                    image={"assets/artofteaching/j3.webp"}
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
                first edition of The Art of Teaching.
              </p>
            </div>
            <div className={styles.videos_container}>
              <div className={styles.video}>
                <iframe
                  className={styles.ytvideo}
                  src="https://www.youtube-nocookie.com/embed/Wmo0StqW9Kc"
                  title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                  loading="lazy"
                ></iframe>
              </div>
              <div className={styles.video}>
                <iframe
                  className={styles.ytvideo}
                  src="https://www.youtube-nocookie.com/embed/TEylubYDzhQ"
                  title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                  loading="lazy"
                ></iframe>
              </div>
              <div className={styles.video}>
                <iframe
                  className={styles.ytvideo}
                  src="https://www.youtube-nocookie.com/embed/jRcseEVk2sk"
                  title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                  loading="lazy"
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
