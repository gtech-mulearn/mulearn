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
                µLearn <span> HacktoberFest</span>
              </p>
              <p className={styles.tagline}>
                Hacktoberfest is Digital Ocean’s annual event that seeks to
                encourage people to make open-source contributions throughout
                the month of October.It wouldn’t be wrong to say that the
                Hacktoberfest has played an integral role in building the
                open-source community over the years.
              </p>
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
              {/* <div className={styles.sv_texts}>
                <p style={{ color: "white" }} className={styles.svheader}>
                  About Project Awesome!
                </p>
                <p className={styles.svtagline}>
                  Project Awesome aka Bring Every Buisness Onine is an Open
                  Source Initative to make an open source collection of webpages
                  for every business out there. To contribute to the project all
                  you have to do is build a website for a store or buiness
                  online.
                </p>
              </div> */}
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
                    To start contributing to the{" "}
                    <span>The Awesome Project </span>. Your first step would be
                    to <span>Fork</span> the repository to your own github
                    account.
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

              <p className={styles.ev_tagline}></p>
            </div>
            <div className={styles.events_container}>
              <div className={styles.event}>
                <div className={styles.event}>
                  <img
                    src="/assets/events/hacktoberfest/Alwin.jpg"
                    alt="Alwin Event Poster"
                    className={styles.event_img}
                  />
                  <p className={styles.event_header}>Github Expert Advice</p>
                  <p className={styles.event_text}>
                    Contributions to Hacktoberfest have started pouring in!
                    Don’t want to be left behind? It's never too late to start.
                    Join us for “Expert Advice”, a series of sessions to help
                    you ace your Hacktoberfest journey.
                  </p>
                </div>
              </div>
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
            </div>
          </div>
        </div>

        <div className={styles.third_view_container}>
          <div className={styles.third_view}>
            <div className={styles.tv_texts}>
              <p className={styles.tvheader}>
                µLearn <span> Supported</span> Repositories
              </p>
              <p className={styles.tvtagline}>
                These are the open-source repositories which are supported by
                µLearn. Happy Contributing.
              </p>
            </div>
            <div className={styles.supporting_container}>
              <div className={styles.supporters}>
                <p className={styles.projectname}>Project Awesome</p>
                <p className={styles.projectorganiser}>Organiser: µLearn</p>
                <p className={styles.projectdecription}>
                  An Open Source Initiative to make an open source collection of
                  web-pages for every business out there. To contribute to the
                  project, all you have to do is build a website for a store or
                  business.
                </p>
                <a
                  href="http://awesome.mulearn.org"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className={styles.primary_btn}>Contribute Now</button>
                </a>
              </div>
              <div className={styles.supporters}>
                <p className={styles.projectname}>Road-to-OSS</p>
                <p className={styles.projectorganiser}>Organiser: Pygrammers</p>
                <p className={styles.projectdecription}>
                  Learn some basic workflow of git and GitHub in a few steps.
                  Afterward, let's start contributing to several open-source
                  projects. And be a part of hackctober fest also.
                </p>
                <a
                  href="https://github.com/pygrammers-org/Road-to-OSS"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className={styles.primary_btn}>Contribute Now</button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default HacktoberFest;
