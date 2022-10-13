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
              <p className={styles.header}>Bring Every Buissness Online</p>
              <p className={styles.tagline}>
                Bring Every Buissness Onine is an Open Source Initative to make
                an open source collection of webpages for every business out
                there. To contribute to this project all you have to do is build
                a website for a store or buiness online.
              </p>
              <button className={styles.primary_btn}>Contribute Now!</button>

              <a
                href="https://hacktoberfest.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className={styles.signup}>Join Hacktoberfest</button>
              </a>
            </div>
            <img src="/assets/events/hacktoberfest/fvimg.gif" />
          </div>
        </div>

        <div className={styles.second_view_container}>
          <div className={styles.second_view}>
            <div className={styles.sv_texts}>
              <p className={styles.svheader}>About HacktoberFest</p>
              <p className={styles.svtagline}>
                Put simply, Hacktoberfest is Digital Ocean’s annual event that
                seeks to encourage people to make open-source contributions
                throughout the month of October.It wouldn’t be wrong to say that
                the Hacktoberfest has played an integral role in building the
                open-source community over the years.
              </p>
            </div>
            <div className={styles.sv_points}>
              <div className={styles.sv_point}>
                <div className={styles.svp_heading}>New Season</div>
                <div className={styles.svp_text}>
                  This time around, Hacktoberfest isn’t just about code!For the
                  first time in its history, Hacktoberfest has opened its doors
                  to no-code or low-code contributions.
                </div>
              </div>
              <div className={styles.sv_point}>
                <div className={styles.svp_heading}>To Participate</div>
                <div className={styles.svp_text}>
                  To register authorize access to your GitHub or GitLab account,
                  before 31st October.To successfully complete Hacktoberfest,
                  one has to have 4 pull/merge requests accepted between October
                  1 and October 31.
                </div>
              </div>

              <div className={styles.sv_point}>
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

        <div className={styles.second_view_container}>
          <div className={styles.second_view}>
            <div className={styles.sv_texts}>
              <p className={styles.svheader}>How to Contribute?</p>
              <p className={styles.svtagline}>
                You can build a webpage for a local businees that you know, or
                you frequently visit using simple HTML, CSS and JS. It could
                even be your favourite chayakkada(Tea Shop).
              </p>
            </div>
            <div className={styles.sv_points}>
              <div className={styles.sv_point}>
                <div className={styles.svp_heading}>Fork</div>
                <div className={styles.svp_text}>
                  To start contributing to this <span>Awesome project</span>.
                  Your first step would be to <span>Fork</span> this repository
                  to your own github account.
                </div>
              </div>

              <div className={styles.sv_point}>
                <div className={styles.svp_heading}>Create</div>
                <div className={styles.svp_text}>
                  Next is the core step in this challenge. You have to create a
                  website for a buissness nearby by following the requirements
                  specified below.
                </div>
              </div>

              <div className={styles.sv_point}>
                <div className={styles.svp_heading}>Contribute</div>
                <div className={styles.svp_text}>
                  Since you have created a website for a buissness nearby you
                  are ready to contribute to this project. For that all you have
                  to do is make Pull request to our repository.
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.steps_view_container}>
          <div className={styles.steps_view}>
            <div className={styles.stv_texts}>
              <p className={styles.stv_heading}>Steps for Contributing.</p>
              <p className={styles.stv_tagline}>
                Below given is the step by step breakdown of how you can
                contribute to this project and create an online presence for a
                buisness nearby.
              </p>
            </div>
          </div>
        </div>

        <div className={styles.third_view_container}>
          <div className={styles.third_view}>
            <div className={styles.tv_texts}>
              <p className={styles.tvheader}>Minimum Requirements</p>
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
