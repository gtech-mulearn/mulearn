import axios from "axios";
import React, { useState } from "react";
import Footer from "../../../Components/Footer/Footer";
import Navbar from "../../../Components/Navbar/Navbar";
import styles from "./HacktoberFest.module.css";

const HacktoberFest = () => {
  const [profiles,setProfiles] = useState([])
  const [pyProfiles,setpyProfiles] = useState([])
  axios.get("https://opensheet.elk.sh/1r5Pav8TlUEao_9GuMcFasKUEPSDIJOPB9PXKbt4KlTQ/hacktoberfest").then(
  (response)=>{
    setProfiles(response.data)
  })
  axios.get("https://opensheet.elk.sh/1r5Pav8TlUEao_9GuMcFasKUEPSDIJOPB9PXKbt4KlTQ/info").then(
  (response)=>{
    setpyProfiles(response.data)
  })

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
                  src="/assets/events/hacktoberfest/season.webp"
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
                  src="/assets/events/hacktoberfest/participate.webp"
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
                  src="/assets/events/hacktoberfest/surprises.webp"
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
              <div className={styles.sv_points}>
                <div className={styles.sv_point}>
                  <img
                    src="/assets/events/hacktoberfest/github.webp"
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
                    src="/assets/events/hacktoberfest/create.webp"
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
                    src="/assets/events/hacktoberfest/contribute.webp"
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
            <div className={styles.yt_vids_grid}>
              <div className={styles.yt_vid_container}>
                <iframe
                  src="https://www.youtube-nocookie.com/embed/eu2ydNGlsLk"
                  title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                ></iframe>
              </div>
              <div className={styles.yt_vid_container}>
                <iframe
                  src="https://www.youtube-nocookie.com/embed/B_cfyfShw3I"
                  title="Github Expert Advice"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                ></iframe>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.expert_advice_container}>
          <div className={styles.expert_advice}>
            <p className={styles.tvheader}>
              µLearn <span> Expert Advice</span> Completed
            </p>
            <p className={styles.tvtagline}>
              Below showcased are the list of people who have maintained their
              profiles and have updated their readme.md and try out completing
              HacktoberFest 2022.
            </p>
            <div className={styles.profile_container}>
              {profiles &&
                profiles.map((profile) => {
                  return (
                    <div className={styles.profile}>
                      <img
                        src={`/assets/events/hacktoberfest/ExpertAdvice/${profile.github}.webp`}
                        alt=""
                        className={styles.profile_picture}
                      />
                      <p className={styles.name}>{profile.name}</p>
                      <a
                        href={`https://github.com/${profile.github}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <p className={styles.username}>{profile.github}</p>
                        {profile.hacktoberfest && (
                          <p className={styles.hacktoberfest}>
                            HacktoberFest Completed
                          </p>
                        )}
                        {profile.profilecompletion && (
                          <span className={styles.profile_completed}>
                            Profile Completed
                          </span>
                        )}
                      </a>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>

        <div className={styles.third_view_container}>
          <div className={styles.third_view}>
            {/* <div className={styles.tv_texts}>
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
            </div> */}
          </div>
        </div>
        <div className={styles.third_view_container}>
          <div className={styles.third_view}>
            <div className={styles.road_to_oss_container}>
              <div className={styles.road_to_oss}>
                <p className={styles.tvheader}>
                  <span>Road to OSS</span> Contributors
                </p>
                <p className={styles.tvtagline}>
                  Below showcased are the list of people who have contributed to
                  the Opensource initative by Pygrammers during HacktoberFest
                  2022.
                </p>
                <div className={styles.profile_container}>
                  {pyProfiles &&
                    pyProfiles.map((profile) => {
                      return (
                        <div className={styles.py_profile}>
                          <img
                            src={`/assets/events/hacktoberfest/py_profile/${profile.image}`}
                            alt=""
                            className={styles.profile_picture}
                          />
                          <p className={styles.name}>{profile.name}</p>
                          <a
                            href={`https://github.com/${profile.gh_username}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <p className={styles.username}>
                              {profile.gh_username}
                            </p>
                          </a>
                        </div>
                      );
                    })}
                </div>
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
