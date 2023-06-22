import React from "react";
import styles from "../Home/Home.module.css";

import Footer from "../../Components/Footer/Footer";
import Navbar from "../../Components/Navbar/Navbar";
import Testimonials from "../../Components/Testimonials/Testimonials";
import CountUp from "react-countup";

import "./Home.scss";

const Home = () => {
  return (
    <>
      <Navbar />
      <div className={styles.firstviewmain_container}>
        <div className={styles.firstview_container}>
          <div className={styles.first_view}>
            <div className={styles.fv_texts}>
              <p className={styles.fv_heading}>
                Let's <span>break the Echo Chambers</span> Together.
              </p>

              <p className={styles.fv_tagline}>
                µLearn is a synergic philosophy of education, with a culture of
                mutual learning through micro peer groups. We are here to assist
                you in breaking through the echo chambers and free you from the
                shackles you have grounded yourself in.
              </p>
            </div>
            <div className={styles.buttons}>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://app.mulearn.org/register"
              >
                <button className={styles.primary}>Join Us</button>
              </a>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://mulearn.org/journey"
              >
                <button className={styles.secondary}>Get Started</button>
              </a>
            </div>
          </div>
          <img
            className={styles.fv_image}
            src="/assets/home/illustration.webp"
            alt="illustration"
          />
        </div>
      </div>

      <div className={styles.supportsviewmain_container}>
        <div className={styles.supportersview_container}>
          <p className={styles.supporter_heading}>
            Community Partners at <span>µLearn.</span>{" "}
          </p>
          <div className={styles.supporters}>
            <a
              href="https://kdisc.kerala.gov.in/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="/assets/home/partners/kdisc.webp"
                alt=""
                className={styles.supporter}
              />
            </a>
            <a
              href="https://iedc.startupmission.in/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="/assets/home/partners/ksum.webp"
                alt=""
                className={styles.supporter}
              />
            </a>
            <a
              href="https://asapkerala.gov.in/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="/assets/home/partners/asap.webp"
                alt=""
                className={styles.supporter}
              />
            </a>
            <a
              href="https://ieeekerala.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="/assets/home/partners/ieee.webp"
                alt=""
                className={styles.supporter}
              />
            </a>
            <a href="https://kba.ai/" target="_blank" rel="noopener noreferrer">
              <img
                src="/assets/home/partners/blockchain.webp"
                alt=""
                className={styles.supporter}
              />
            </a>
            <a
              href="https://kitesfoundation.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="/assets/home/partners/kites.webp"
                alt=""
                className={styles.supporter}
              />
            </a>
            <a
              href="https://www.linkedin.com/company/foxlab-makerspace/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="/assets/home/partners/foxlab.webp"
                alt=""
                className={styles.supporter}
              />
            </a>

            <a
              href="https://etherindia.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="/assets/home/partners/ether_logo.webp"
                alt="ether"
                className={styles.supporter}
              />
            </a>
            <a
              href="http://pygrammers.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="/assets/home/partners/pygrammers.webp"
                alt=""
                className={styles.supporter}
              />
            </a>
            <a
              href="https://www.riglabs.co/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="/assets/home/partners/riglabs.webp"
                alt=""
                className={styles.supporter}
              />
            </a>
            <a
              href="https://kuttycoders.in/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="/assets/home/partners/kuttycoders.webp"
                alt="Kutty Coders"
                className={styles.supporter}
              />
            </a>

            <a
              href="https://gdg.community.dev/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="/assets/home/partners/gdsc.webp"
                alt="Google Developer Groups"
                className={styles.gsupporter}
              />
            </a>
            <a
              href="https://developer.android.com/teach"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="/assets/home/partners/google_android.webp"
                alt="Google Android Educators"
                className={styles.gsupporter}
              />
            </a>
            <a
              href="https://duk.ac.in/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="/assets/home/partners/duk.webp"
                alt="Digital University Kerala"
                className={styles.gsupporter}
              />
            </a>
            <a
              href="https://icfoss.in/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="/assets/home/partners/icfoss.webp"
                alt="International Centre For Free and Open Source Software"
                className={styles.gsupporter}
              />
            </a>
          </div>
        </div>
      </div>

      <div className={styles.thirdviewmain_container}>
        <div className={styles.thirdview_container}>
          <div className={styles.third_view}>
            <div className={styles.tv_texts}>
              <p className={styles.tv_mainheading}>
                Exploring the Events at <span>µLearn.</span>{" "}
              </p>

              <p className={styles.tv_tagline}>
                Each week multiple events are conducted at µLearn. Events full
                of stories, learning experience, inspirations and much more
                awaits you there. Events are key to opening the doors of
                Interactions.{" "}
              </p>
            </div>
            <div className={styles.tv_points}>
              <div className={styles.tv_point}>
                <p className={styles.tvp_heading}>Inspiration Station Radio</p>
                <p className={styles.tvp_text}>
                  ISR is an event conducted at µLearn weekly. Here students come
                  in and share their stories and inspirations for listeners who
                  like to learn.
                </p>
              </div>
              <div className={styles.tv_point}>
                <p className={styles.tvp_heading}>Office Hours</p>
                <p className={styles.tvp_text}>
                  Office Hours, an hour-long weekly virtual meet-up hosted by
                  the respective interest groups will review project , discuss
                  new activities, and brainstrom on specific topics, udner the
                  guidance of mentors.
                </p>
              </div>
              <div className={styles.tv_point}>
                <p className={styles.tvp_heading}>Learning Circles</p>
                <p className={styles.tvp_text}>
                  An informal mechanism for bringing together learners who have
                  interests in similar topics across different fields and
                  disciplines. A fantastic way to spend your limited time
                  learning and exploring with a group of people with the same
                  interests!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.secondviewmain_container}>
        <div className={styles.secondview_container}>
          <div className={styles.second_view}>
            <p className={styles.sv_mainheading}>
              Knowing more about <span>µLearn!</span>{" "}
            </p>
            <p className={styles.sv_tagline}>
              Curious to know more about µLearn? Wanna explore what all wonders
              we can do as a team? Come, witness it by yourself!
            </p>
            <div className={styles.sv_points}>
              <div className={styles.sv_point}>
                <img
                  src="/assets/home/involvement.webp"
                  alt=""
                  className={styles.svp_image}
                />
                <div className={styles.svp_heading}>Involve</div>
                <div className={styles.svp_text}>
                  µLearn is a place for everyone. A place where one could
                  involve and evolve the most. Be a part of our intriguing
                  events like <span>Inspiration Radio</span>,{" "}
                  <span>Let's Chill</span> and make the most out of it.
                </div>
              </div>

              <div className={styles.sv_point}>
                <img
                  src="/assets/home/interactive.webp"
                  alt=""
                  className={styles.svp_image}
                />
                <div className={styles.svp_heading}>Interact</div>
                <div className={styles.svp_text}>
                  An Interactive setting where each one of you could connect
                  with folks and mentors having a remarkable mindset. Your
                  involvements, and dedication to the community can even get you
                  an internship opportunity.
                </div>
              </div>

              <div className={styles.sv_point}>
                <img
                  src="/assets/home/innovation.webp"
                  alt=""
                  className={styles.svp_image}
                />
                <div className={styles.svp_heading}>Innovate</div>
                <div className={styles.svp_text}>
                  A place brimming with possibilities for innovation and
                  astonishing creations. A perfect spot to display your works.
                  Here you always advance and invent yourself!
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.countviewmain_container}>
        <div className={styles.countview_container}>
          <div className={styles.count_view}>
            <div className={styles.left_side}>
              <p className={styles.cv_heading}>
                {" "}
                The <span>Impact</span> of <span>µLearn.</span>
              </p>
              <p className={styles.cv_text}>
                Over the last year, we as a community have made an impact on a
                significant number of students, mentors, and facilitators
                enabling them to gain more knowledge about the ecosystem of
                learning and was able to upskill themselves.
              </p>
            </div>
            <div className={styles.rightside}>
              <div className={styles.countcontainer}>
                <div className={styles.count}>
                  <p className={styles.cvc_heading}>
                    <CountUp end={18000} duration={10} />+
                  </p>
                  <p className={styles.cvc_text}>Members</p>
                </div>
                <div className={styles.count}>
                  <p className={styles.cvc_heading}>
                    <CountUp end={550} duration={10} />+
                  </p>
                  <p className={styles.cvc_text}>Institutions</p>
                </div>
                <div className={styles.count}>
                  <p className={styles.cvc_heading}>
                    <CountUp end={1000} duration={10} />+
                  </p>
                  <p className={styles.cvc_text}>Learning Circles</p>
                </div>
                <div className={styles.count}>
                  <p className={styles.cvc_heading}>
                    <CountUp end={200} duration={10} />+
                  </p>
                  <p className={styles.cvc_text}>Events</p>
                </div>
                <div className={styles.count}>
                  <p className={styles.cvc_heading}>
                    <CountUp end={200} duration={10} />+
                  </p>
                  <p className={styles.cvc_text}>Companies</p>
                </div>
                <div className={styles.count}>
                  <p className={styles.cvc_heading}>
                    <CountUp end={100} duration={10} />+
                  </p>
                  <p className={styles.cvc_text}>Enablers</p>
                </div>
                <div className={styles.count}>
                  <p className={styles.cvc_heading}>
                    <CountUp end={100} duration={10} />+
                  </p>
                  <p className={styles.cvc_text}>Mentors</p>
                </div>

                <div className={styles.count}>
                  <p className={styles.cvc_heading}>
                    <CountUp end={20} duration={10} />+
                  </p>
                  <p className={styles.cvc_text}>Communities</p>
                </div>
                <div className={styles.count}>
                  <p className={styles.cvc_heading}>
                    <CountUp end={15} duration={10} />+
                  </p>
                  <p className={styles.cvc_text}>Interest Groups</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.joinviewmain_container}>
        <div className={styles.joinview_container}>
          <div className={styles.join_view}>
            <div className={styles.jv_texts}>
              <p className={styles.jv_heading}>
                {" "}
                Learn and Grow <span> Together</span> as a{" "}
                <span>Community</span>
              </p>
              <p className={styles.jv_content}>
                Are you ready to learn, grow and upskill yourself to the next
                level? Come, be a part of the community, and let's start
                learning in a new better way. Call in your friends as well,
                because things are going to change once you experience it and it
                is more effective when done with a group.
              </p>
              <div className={styles.highlights}>
                <p className={styles.highlight_text}>
                  Karma Points • Interest Groups • Learning Circles • Enablement
                  Tasks. <span> and to know more..</span>
                </p>
              </div>
              <a
                className={styles.joinbutton}
                target="_blank"
                rel="noopener noreferrer"
                href="https://discord.com/invite/Jt7sv3chZP"
              >
                <button className={styles.primary}>Join Discord Server</button>
              </a>
            </div>
            <img
              src="/assets/home/join.webp"
              alt="join"
              className={styles.join_img}
            />
          </div>
        </div>
      </div>
      <br />
      <div className={styles.joinviewmain_container}>
        <div className={styles.joinview_container}>
          <div className={styles.join_view}>
            <div className={styles.jv_texts}>
              <p className={styles.jv_heading}>
                Let's Learn & Gain <span>Karma Points</span>
              </p>
              <p className={styles.jv_content}>
                Karma points are points earned by completing tasks, challenges,
                and boot camps in the uLearn platform Points serve as proof of
                the work done by the students and can be used to obtain various
                benefits, such as invitations to exclusive events and promotions
                in the local community. The more Karma points a student has, the
                more accomplished they are seen in the community.
              </p>
            </div>
            <img
              src="/assets/home/karma.png"
              alt="join"
              className={styles.karma_img}
            />
          </div>
        </div>
      </div>

      <div className={styles.chart_view_container}>
        <div className={styles.chart_view}>
          <div className={styles.cv_texts}>
            <p className={styles.cv_heading}>
              Working Ecosystem of <span>µLearn.</span>
            </p>
            <p className={styles.cv_text}>
              The Academia and Technology Focus Group (ATFG) framework was
              created and maintained to assist students in becoming industry
              ready. µLearn, associated with this ATFG framework, is a synergic
              philosophy of education with a culture of mutual learning through
              micro peer groups. This ecosystem, harbouring a network of
              participants such as universities, online communities, nodal
              agencies and the industry, integrates its participants and their
              contributions into a holistic system, providing mutual benefits to
              all.
            </p>
          </div>
          <div>
            <img
              src="assets/home/Chart.webp"
              alt="Chart"
              className={styles.chart_img}
            />
          </div>
        </div>
      </div>
      <Testimonials />

      <Footer />
    </>
  );
};

export default Home;
