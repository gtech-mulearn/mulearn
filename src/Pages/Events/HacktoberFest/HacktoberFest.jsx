import React from "react";
import Footer from "../../../Components/Footer/Footer";
import Navbar from "../../../Components/Navbar/Navbar";
import styles from "./HacktoberFest.module.css";

const HacktoberFest = () => {
  return (
    <>
      <Navbar />
      <div className={styles.main_container}>
        <div className={styles.first_view_container}>
          <div className={styles.first_view}>
            <div className={styles.fv_texts}>
              <p className={styles.header}>
                µLearn <span> HactoberFest</span>
              </p>
              <p className={styles.tagline}>
                Hacktoberfest is Digital Ocean’s annual event that seeks to
                encourage people to make open-source contributions throughout
                the month of October.It wouldn’t be wrong to say that the
                Hacktoberfest has played an integral role in building the
                open-source community over the years.
              </p>
              <a
                href="http://mulearn.org/hacktoberfest-form"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className={styles.primary_btn}>Contribute Now!</button>
              </a>
              <a
                href="https://hacktoberfest.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className={styles.signup}>Join Hacktoberfest</button>
              </a>
            </div>
            <img
              alt="Illustration"
              src="/assets/events/hacktoberfest/fvimgd.gif"
            />
          </div>
        </div>

        <div className={styles.second_view_container}>
          <div className={styles.second_view}>
            <div className={styles.sv_texts}>
              <p className={styles.svheader}>
                About <span>HacktoberFest</span>
              </p>
              <p className={styles.svtagline}></p>
            </div>
            <div className={styles.sv_points}>
              <div className={styles.sv_point}>
                <img
                  src="/assets/events/hacktoberfest/season.png"
                  alt=""
                  className={styles.sv_image}
                />
                <div className={styles.svp_heading}>New Season</div>
                <div className={styles.svp_text}>
                  This time around, Hacktoberfest isn’t just about code!For the
                  first time in its history, Hacktoberfest has opened its doors
                  to no-code or low-code contributions.
                </div>
              </div>
              <div className={styles.sv_point}>
                <img
                  src="/assets/events/hacktoberfest/participate.png"
                  alt=""
                  className={styles.sv_image}
                />
                <div className={styles.svp_heading}>To Participate</div>
                <div className={styles.svp_text}>
                  To register authorize access to your GitHub or GitLab account,
                  before 31st October.To successfully complete Hacktoberfest,
                  one has to have 4 pull/merge requests accepted between October
                  1 and October 31.
                </div>
              </div>

              <div className={styles.sv_point}>
                <img
                  src="/assets/events/hacktoberfest/surprises.png"
                  alt=""
                  className={styles.sv_image}
                />
                <div className={styles.svp_heading}>New Surprises</div>
                <div className={styles.svp_text}>
                  Stay tuned to our social media handles for some cool updates.
                  We know you’re excited to get started on this journey. So are
                  we!
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.orange_bg}>
          <div className={styles.second_view_container}>
            <div className={styles.second_view}>
              <div className={styles.sv_texts}>
                <p style={{ color: "white" }} className={styles.svheader}>
                  About Project Awesome!
                </p>
                <p className={styles.svtagline}>
                  Project Awesome aka Bring Every Buissness Onine is an Open
                  Source Initative to make an open source collection of webpages
                  for every business out there. To contribute to the project all
                  you have to do is build a website for a store or buiness
                  online.
                </p>
              </div>
              <div className={styles.sv_points}>
                <div className={styles.sv_point}>
                  <img
                    src="/assets/events/hacktoberfest/github.png"
                    alt=""
                    className={styles.sv_image}
                  />
                  <div
                    style={{ color: "white" }}
                    className={styles.svp_heading}
                  >
                    Fork
                  </div>
                  <div className={styles.svp_text}>
                    To start contributing to the <span>Awesome project</span>.
                    Your first step would be to <span>Fork</span> the repository
                    to your own github account.
                  </div>
                </div>

                <div className={styles.sv_point}>
                  <img
                    src="/assets/events/hacktoberfest/create.png"
                    alt=""
                    className={styles.sv_image}
                  />
                  <div
                    style={{ color: "white" }}
                    className={styles.svp_heading}
                  >
                    Create
                  </div>
                  <div className={styles.svp_text}>
                    For the Next step in the challenge. You have to create a
                    website for a buissness nearby by following the requirements
                    which are specified below.
                  </div>
                </div>

                <div className={styles.sv_point}>
                  <img
                    src="/assets/events/hacktoberfest/contribute.png"
                    alt=""
                    className={styles.sv_image}
                  />
                  <div
                    style={{ color: "white" }}
                    className={styles.svp_heading}
                  >
                    Contribute
                  </div>
                  <div className={styles.svp_text}>
                    Since you have created a website for a buissness nearby you
                    are ready to contribute to the project. For that all you
                    have to do is make Pull request to our repository.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.events_view_container}>
          <div className={styles.events_view}>
            <div className={styles.ev_texts}>
              <p className={styles.ev_header}>
                {" "}
                <span>HacktoberFest</span> Events
              </p>

              <p className={styles.ev_tagline}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa
                maxime beatae repellendus saepe incidunt cupiditate.
              </p>
            </div>
            <div className={styles.events_container}>
              <div className={styles.event}>
                <img
                  src="https://media.discordapp.net/attachments/771679365124718612/1030081742180204544/hactober_fest.png?width=640&height=640"
                  alt="Rohit Event Poster"
                  className={styles.event_img}
                />
                <p className={styles.event_header}>Git and GitHub Session</p>
                <p className={styles.event_text}>
                  Woohoo! It's time to kick off our Hacktoberfest journey.
                  Really excited to start your journey but wary if you have the
                  required skills? Join us for this exciting session on Git and
                  GitHub to learn all you need to get started with your
                  Hacktoberfest journey.{" "}
                </p>
              </div>
              <div className={styles.event}>
                <img
                  src="/assets/events/hacktoberfest/soon.png"
                  alt="Coming Soon"
                  className={styles.event_img}
                />
                <p className={styles.event_headerb}></p>
                <p className={styles.event_textb}></p>
              </div>
            </div>
          </div>
        </div>

        {/* <div className={styles.steps_view_container}>
          <div className={styles.steps_view}>
            <div className={styles.stv_texts}>
              <p className={styles.stv_heading}>
                Steps for <span>Contributing.</span>
              </p>
              <p className={styles.stv_tagline}>
                Below given is the step by step breakdown of how you can
                contribute to the project and create an online presence for a
                buisness nearby.
              </p>
            </div>
            <div className={styles.steps_container}>
              <div className={styles.step}>
                <p className={styles.step_heading}>Step 1</p>
                <p className={styles.step_text}>
                  Before starting you would have to signup for hacktoberfest
                  using the link which is provided above.Once that is done you
                  can{" "}
                  <a
                    href="https://github.com/gtech-mulearn/mulearn/"
                    className={styles.link}
                  >
                    fork
                  </a>{" "}
                  the repository from github.
                </p>
              </div>
              <div className={styles.step}>
                <p className={styles.step_heading}>Step 2</p>
                <p className={styles.step_text}>
                  There is folder inside the public folder named as India,
                  inside which there is folder called kerala having sub-folders
                  of each district. You can contribute to the disctrict in which
                  the buisness belongs to.
                </p>
              </div>
              <div className={styles.step}>
                <p className={styles.step_heading}>Step 3</p>
                <p className={styles.step_text}>
                  Make sure that the website that you are making for the
                  buisness satisfies all the basic requirements which are
                  specified below.
                </p>
              </div>
              <div className={styles.step}>
                <p className={styles.step_heading}>Step 4</p>
                <p className={styles.step_text}>
                  Once you have completed making the website. You can create a
                  pull request mentioning the sufficient details and create a
                  pull request.
                </p>
              </div>
              <div className={styles.step}>
                <p className={styles.step_heading}>Step 5</p>
                <p className={styles.step_text}>
                  Soon, our team will be quality checking the pull request and
                  will be merging it with the parent repository. Which ensures
                  and completes your participation.
                </p>
              </div>
            </div>
          </div>
        </div> */}

        <div className={styles.third_view_container}>
          <div className={styles.third_view}>
            <div className={styles.tv_texts}>
              <p className={styles.tvheader}>
                Minimum <span>Requirements</span>
              </p>
              <p className={styles.tvtagline}>
                Please make sure that you upload the shop's consent letter in
                the PR comments. It could even be a screenshot of a consent mail
                from the store.Please try to include as much info you can
                collect about the shop in the website that you are building.
              </p>
            </div>

            <div className={styles.tvpoints}>
              <ol>
                <li className={styles.listitem}>
                  The webpage should have images of the buisness
                </li>
                <li className={styles.listitem}>
                  Basic Details such as location, working hours etc.. should be
                  present.
                </li>
                <li className={styles.listitem}>
                  Contact Details of the buissness should be added.
                </li>
                <li className={styles.listitem}>
                  Make the webpage as creative as possible.
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default HacktoberFest;
