import React from "react";


import styles from "./ArtOfTeaching.module.css";
import "./ArtOfTeaching.scss";
// @ts-ignore

import fvimg from "./assets/Teaching.gif";
import Guidlines from "./assets/Guidlines1.pdf";

import MentorCard from "./components/MentorCard/MentorCard";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import HomeNav from "@/modules/Common/HomeNav/HomeNav";
import Footer from "@/modules/Common/Footer/Footer";




const ArtOfTeaching = () => {

  const timelineStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'flex-start' as const,
    marginLeft: '20px'
  };

  const timelineItemStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center' as const,
    position: 'relative',
    marginBottom: '20px'
  };

  const circleStyle: React.CSSProperties = {
    width: '20px',
    height: '20px',
    backgroundColor: '#555',
    borderRadius: '50%',
    position: 'relative',
    zIndex: 1,
    minWidth: '20px', // Prevent shrinking in mobile view
    minHeight: '20px',
  };

  const lineStyle: React.CSSProperties = {
    width: '2px',
    height: '40px',
    backgroundColor: '#555',
    position: 'absolute',
    top: '20px',
    left: '9px',
    zIndex: 0
  };
  const mobilelineStyle: React.CSSProperties = {
    width: '2px',
    height: '40px',
    backgroundColor: '#555',
    position: 'absolute',
    top: '42px',
    left: '9px',
    zIndex: 0
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
    titleTextColor: "#5570F1",
    rowTitleColor: "#404040",
    rowContentColor: "#373737",
    arrowColor: "#5570F1",
  };
  return (
    <>
      <HomeNav />
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
              
           
              <div className="flex flex-col lg:flex-col justify-center items-center lg:justify-start text-center lg:items-start gap-2 mt-2">
               
                <a href="https://mulearn.org/r/artofteaching" className="no-underline">
               <button
                 style={{
                   padding: '0.5rem 1.5rem',
                   backgroundColor: '#5570F1',
                   color: 'white',
                   borderRadius: '0.375rem',
                   width: '300px',
                   textAlign: 'center',
                   fontWeight: 'bold',
                   marginTop: '1rem',
                  }}
                  >
                 Register Now
               </button>
               </a>
             

    <div className="flex flex-row justify-center items-center gap-1" >  
   <a href="https://mulearn.org/enablers"><button style={{
     border: '2px solid #5570F1',
     color: '#5570F1',
     padding: '0.5rem 1.5rem',
     borderRadius: '0.375rem',
     width: '150px',
     fontWeight: 'bold',
    }}
    >
    Enablers
    </button></a> 
    <a href="https://mulearn.org">
      <button
        style={{
          border: '2px solid #5570F1',
          color: '#5570F1',
          padding: '0.5rem 1.5rem',
          borderRadius: '0.375rem',
          width: '150px',
          fontWeight: 'bold',
        }}
      >
        µlearn
      </button>
    </a>
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
             
                className="aswiper"
              >
               <SwiperSlide>
                

                  <div className={styles.topic_card_android}>
                  <p className={styles.card_heading}>
                     <span>Guidelines</span>
                    </p>
                  <div style={timelineStyle}>
                  <div>
                  <h3 className={"styles.sv_tagline mt-2 mb-2"} style={{fontSize:'18px'}}>Level1</h3>
      </div>
      <div className=" pl-4" style={timelineItemStyle}>
        <div className=" pl-4" style={circleStyle}></div>
        <div className=" ml-4" style={lineStyle}></div>
        <div style={contentStyle} ><p style={{fontSize:'17px'}}>Task 1 - Self introduction.</p></div>
      </div>
      <div className=" pl-4" style={timelineItemStyle}>
        <div className=" pl-4" style={circleStyle}></div>
        <div className=" ml-4"style={lineStyle}></div>
        <div style={contentStyle}><p style={{fontSize:'17px'}}>Task 2 - Video submission explaining a selected topic.</p></div>
      </div>
      <div>
        <h3 className={"styles.sv_tagline mt-2 pt-3 pb-1"} style={{fontSize:'18px', marginTop: '1rem'}}>Level2</h3>
      </div>
      <div  className=" pl-4"style={timelineItemStyle}>
        <div className=" pl-4"style={circleStyle}></div>
        <div className="ml-4" style={lineStyle}></div>
        <div style={contentStyle}><p style={{fontSize:'17px'}}>Task 1 - Detailed document submission of the designed course curriculum.</p></div>
        
      </div>
      <div className="mt-2">
          <a href={Guidlines}
         
           download="Art of Teaching Guidelines.pdf"
          >
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
      <a
          href={Guidlines}
           download="Art of Teaching Guidelines.pdf"
          className="download-button"
        >
         
       
      <button style={{font:'bold', fontSize:'16px',width:'180px'}} className={styles.create }>Download Pdf</button></a> 
        </div>
    </div>
                  </div>
                  <div className={`w-full max-w-md lg:max-w-2xl`}>
                <iframe
                  className={styles.yt_video}
                  src="https://www.youtube.com/embed/r5izRx-4j68?si=L9gHSznyZTeCI3b3" 
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                ></iframe>
              </div>
           
            </div>
          </div>
        </div>


        <div className="hidden lg:flex  items-center justify-center lg:h-[500px] lg:mb-4">
  <div className="w-full max-w-md lg:max-w-3xl xl:max-w-4xl 2xl:max-w-5xl">
    <iframe

      className="flex items-center justify-center mx-auto lg:w-[750px] h-56 lg:h-70 xl:h-96 rounded-lg"
      src="https://www.youtube.com/embed/r5izRx-4j68?si=L9gHSznyZTeCI3b3"
      title="YouTube video player"
      frameBorder="0"
     
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      loading="lazy"
    ></iframe>
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
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
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
                    designation={"Former Principal at Mar Baselios College of Engineering and Technology"}
                    image={"assets/artofteaching/j1.webp"}
                    linkedIn={"https://www.linkedin.com/in/dr-t-m-george-87b86028/?originalSubdomain=in"} interest={undefined} source={undefined} clink={undefined}                  />
                </div>

                <div className={styles.judges_card}>
                  <MentorCard
                    name={"Ann Andrews"}
                    designation={"Product | Technology & Data Strategy | NYU & Columbia Fellow"}
                    image={"./assets/artofteaching/j2.webp"}
                    linkedIn={"https://www.linkedin.com/in/annandrews/"} interest={undefined} source={undefined} clink={undefined}                  />
                </div>
                <div className={styles.judges_card}>
                  <MentorCard
                    name={"Rajeev J Sebastian"}
                    designation={"CEO Alokin Software Private Limited"}
                    image={"./assets/artofteaching/j3.webp"}
                    linkedIn={"https://www.linkedin.com/in/rajeevjs"} interest={undefined} source={undefined} clink={undefined}                  />
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
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                ></iframe>
              </div>
              <div className={styles.video}>
                <iframe
                  className={styles.ytvideo}
                  src="https://www.youtube-nocookie.com/embed/TEylubYDzhQ"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                ></iframe>
              </div>
              <div className={styles.video}>
                <iframe
                  className={styles.ytvideo}
                  src="https://www.youtube-nocookie.com/embed/jRcseEVk2sk"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.faq_view_container}>
          <div className={styles.faq_view}>
            {/* <Faq data={data} styles={fstyles} /> */}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ArtOfTeaching;
