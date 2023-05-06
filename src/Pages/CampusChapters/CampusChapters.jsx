import React, { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import styles from "./CampusChapters.module.css";
import { Link } from "react-router-dom";
import Faq from "react-faq-component";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import campusJsonData from "./data.json";
import Levels from "./Levels/Levels";

const CampusChapters = () => {
  const campusData = campusJsonData;
  const [selectedZone, setSelectedZone] = useState("all");
  const [districts, setDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("all");

  //iternate through the campusData and form a array with the unique districts and sort it in alphabetical order
  useEffect(() => {
    const districts = campusData.reduce((acc, campus) => {
      if (!acc.includes(campus.district)) {
        acc.push(campus.district);
      }
      return acc;
    }, []);
    console.log(districts);
    districts.sort();
    setDistricts(districts);
  }, [campusData]);

  const data = {
    title: "Frequently Asked Questions",
    rows: [
      {
        title: "Why the µLearn chapter?",
        content:
          "Campus Chapters are a concept that are to be implemented in-house by the Students for the Students. Campus chapters seek to bring together students within a college, developing the μLearn culture from within.",
      },
      {
        title: "What is the µLearn Chapter?",
        content:
          "Each campus has its own culture, with students having their specific interests and liking. Campus chapters seek to bring together students within a college, developing the μLearn culture from within.",
      },
      {
        title: "What’s the chapter’s focus and why?",
        content:
          "µLearn, is an industry-enabled digital platform for peer learning to nurture students with the necessary expertise in industry from their college days. Through Mu Learn, students will get the opportunity to network, acquire and demonstrate their skills with the help of mentors and industry leaders, along with internships and training.Tech communities have had an unprecedented impact on student development in these last couple of years. These communities have helped students to think together with industry leaders, find their tech niches, and participate in boot camps to perfect their crafts.",
      },
      {
        title: "How to start a µLearn Chapter?",
        content:
          "To start a new chapter, the college must have 100k Karma Points in the µLearn community, with minimum 100 chapter members. It must have a core team with an enabler. To be leads of the chapter, student must acquire 1k karma points and previous experience in conducting events would be an added advantage. In addition to these , each applying campus should have a minimum of 3 Learning Circles.",
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
                Campus cultures vary based on student interests. μLearn campus
                chapters unite students, offer tailored resources, and meet
                individual needs, promoting the μLearn culture.
              </p>
              <a
                href="https://airtable.com/shrmtngt3zopg8eVh"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className={styles.leadcampus}>Lead a Campus</button>
              </a>
              {/* <Link to="findcampus">
                <button className={styles.leadcampus}>Find Campus</button>
              </Link> */}
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
        {/*Added updated contents from levels component*/}
        <Levels />
        <div className={styles.search_view_container}>
          <div className={styles.search_view}>
            <div className={styles.sv_texts}>
              <p className={styles.sv_heading}>
                Find a<span> Campus Chapter </span>
              </p>
              <p className={styles.gv_tagline}>
                Select your zone and district to find the campus chapters near
                you. µLearn Campus Chapters are a concept that are to be
                implemented in-house by the Students for the Students.
              </p>
            </div>
            <div className={styles.dropdowns}>
              <div className={styles.select_wrapper}>
                <select
                  className={styles.select}
                  value={selectedZone}
                  onChange={(event) => {
                    setSelectedZone(event.target.value);
                  }}
                >
                  <option value="all" selected>
                    Select Zone
                  </option>
                  <option value="North">North</option>
                  <option value="Central">Central</option>
                  <option value="South">South</option>
                </select>
              </div>
              <div className={styles.select_wrapper}>
                <select
                  className={styles.select}
                  value={selectedDistrict}
                  onChange={(event) => {
                    setSelectedDistrict(event.target.value);
                  }}
                >
                  <option value="all" selected>
                    Select District
                  </option>
                  {
                    //iterate through the districts array and return the option element
                    districts.map((district) => {
                      return <option value={district}>{district}</option>;
                    })
                  }
                </select>
              </div>
            </div>
            <div className={styles.sv_search_container}>
              <div className={styles.colleges}>
                {campusData.map((campus) => {
                  // return the campuses that match the selected zone
                  if (
                    campus.zone === selectedZone &&
                    selectedDistrict === "all"
                  ) {
                    return (
                      <div className={styles.college}>
                        <div className={styles.college_name}>{campus.name}</div>
                        <div className={styles.college_district}>
                          {campus.district}
                        </div>
                        <div className={styles.college_zone}>
                          Zone: {campus.zone}
                        </div>
                        <div className={styles.college_lead}>
                          Campus Lead: {campus.lead}
                        </div>
                        {campus.email && (
                          <div className={styles.college_email}>
                            Email Address: {campus.email}
                          </div>
                        )}
                      </div>
                    );
                  }
                  //return the campuses that match the selected zone and district
                  else if (
                    campus.zone === selectedZone &&
                    campus.district === selectedDistrict
                  ) {
                    return (
                      <div className={styles.college}>
                        <div className={styles.college_name}>{campus.name}</div>
                        <div className={styles.college_district}>
                          {campus.district}
                        </div>
                        <div className={styles.college_zone}>
                          Zone: {campus.zone}
                        </div>
                        <div className={styles.college_lead}>
                          Campus Lead: {campus.lead}
                        </div>
                        {campus.email && (
                          <div className={styles.college_email}>
                            Email Address: {campus.email}
                          </div>
                        )}
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
            </div>
          </div>
        </div>

        <div className={styles.onboarding_view_container}>
          <div className={styles.onboarding_view}>
            <div>
              <p className={styles.gv_heading}>
                {" "}
                <span>Apply today</span> to start your µLearn Campus Chapter
              </p>
              <p className={styles.gv_tagline}>
                Changes always starts from within! Want to establish a Campus
                Chapter at your Institution? The Application Process is as
                simple as the three steps mentioned below. Take that 1st step
                today and create a difference
              </p>
            </div>
            <div className={styles.onboarding_steps_container}>
              <div className={styles.step}>
                <img
                  src="/assets/campuscommunity/application.webp"
                  alt=""
                  className={styles.step_image}
                />
                <p className={styles.step_heading}>1). Application</p>
                <p className={styles.step_text}>
                  Start by telling us about your campus chapter and who's
                  leading it
                </p>
              </div>
              <div className={styles.step}>
                <img
                  src="/assets/campuscommunity/onboarding.webp"
                  alt=""
                  className={styles.step_image}
                />
                <p className={styles.step_heading}>2). Onboarding Call</p>
                <p className={styles.step_text}>
                  Hop on to an onboarding call with someone from the µLearn Core
                  Team
                </p>
              </div>
              <div className={styles.step}>
                <img
                  src="/assets/campuscommunity/meeting.webp"
                  alt=""
                  className={styles.step_image}
                />
                <p className={styles.step_heading}>3). First Meeting</p>
                <p className={styles.step_text}>
                  Schedule your campus chapter's first meeting and get going.
                </p>
              </div>
              <div className={styles.step}>
                <img
                  src="/assets/campuscommunity/Badge.svg"
                  alt=""
                  className={styles.step_image}
                />
                <p className={styles.step_heading}>4). µLearn Chaptership</p>
                <p className={styles.step_text}>
                  Impliment chaptership to unlocks benefits from µLearn
                  Foundation .
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.second_view_container}>
          <div className={styles.second_view}>
            <div className={styles.sv_texts}>
              {/* <p className={styles.sv_pheading}>Lorem, ipsum dolor.</p> */}
              <p className={styles.sv_heading}>Why µLearn for Campuses?</p>
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
                    <div className={styles.d_number}>1</div>
                    <span>Echo Chambers</span>
                  </div>
                  <p className={styles.d_text}>
                    Regular Communities teach us upskilling and knowledge at a
                    limited resource, post which they all tend to fall into the
                    echo chamber and leave students with the belief that they
                    are well versed while just being at an average level.
                  </p>
                </div>

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

        <div className={styles.generator_view_container} id="logo-generator">
          <div className={styles.generator_view}>
            <div className={styles.gv_texts}>
              <p className={styles.gv_heading}>The Campus Logo Generator</p>

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
                  href="/campus-logo-generator"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className={styles.redirection_button}>
                    Create Now
                  </button>
                </a>
              </div>
            </div>
            <img
              src="/assets/campuscommunity/logogen.webp"
              alt=""
              className={styles.logoimage}
            />
          </div>
        </div>

        <div className={styles.third_view_container} id="success-stories">
          <div className={styles.third_view}>
            <div className={styles.tv_texts}>
              <p className={styles.tv_heading}>
                <span>Campus</span> Success Stories
              </p>
              <p className={styles.tv_tagline}>
                Get insights into how μLearn Campus Chapters have collaborated
                with Student heroes to build a vibrant campus community.
              </p>
            </div>

            <div className={styles.tv_story_container}>
              <div className={styles.tv_story}>
                <Card sx={{ maxWidth: 345, height: 500 }}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="30"
                      image="/assets/campuscommunity/amirtha.webp"
                      alt="Amritha G S"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        Amritha G S
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Read the Story of a Graduate in Electrical and
                        Electronics Engineering and the way she steered her
                        college as one of the top-performing colleges among the
                        200+ onboarded across the state.
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Link to="/blogs/amirtha-gs">
                      <Button size="small">
                        <span>Read More...</span>
                      </Button>
                    </Link>
                  </CardActions>
                </Card>
              </div>
              <div className={styles.tv_story}>
                <Card sx={{ maxWidth: 345, height: 500 }}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="30"
                      image="/assets/campuscommunity/jessno.webp"
                      alt="Jessno Oommen Jose"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        Jessno Oommen Jose
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Read the Story of a Graduate in Electronics and
                        Communication Engineering and how she placed her college
                        in the first position in the state and became the Kerala
                        state lead of 𝝁Learn.
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Link to="/blogs/jessno-oomen">
                      <Button size="small">
                        <span>Read More...</span>
                      </Button>
                    </Link>
                  </CardActions>
                </Card>
              </div>

              <div className={styles.tv_story}>
                <Card sx={{ maxWidth: 345, height: 500 }}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="10"
                      image="/assets/campuscommunity/sandra.webp"
                      alt="Jessno Oommen Jose"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        Sandra Pramod
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Read the Story of a graduate of Computer Science and
                        Engineering who transformed her college to the
                        top-performing college for the academic year 2021–2022
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Link to="/blogs/sandra-pramod">
                      <Button size="small">
                        <span>Read More...</span>
                      </Button>
                    </Link>
                  </CardActions>
                </Card>
              </div>
            </div>
          </div>
        </div>
        {/* <div className={styles.share_story_container}>
          <div className={styles.share_story}>
            <div className={styles.tv_texts}>
              <p className={styles.tv_heading}>
                <span>Share</span> Your Success Stories
              </p>
              <p className={styles.tv_tagline}>
                Share your experience to get featured on the μLearn Website
              </p>
              <button className={styles.share_btn}>Share Story</button>
            </div>
          </div>
        </div> */}
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
