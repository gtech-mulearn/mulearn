import React from "react";
import styles from "./YIP2023.module.css";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import boxoneimg from "./assets/boxoneimg.png";
import lines from "./assets/lines.png";
import oglines from "./assets/oglines.png";
import bthimg from "./assets/bthimg.png";
import qrcode from "./assets/qrcode.png";
import cat from "./assets/cat.png";
import box_fourimg from "./assets/box_fourimg.png";

const YIP2023 = () => {
  return (
    <>
      <Navbar />
      <div className={styles.main_container}>
        <div className={styles.first_view_container}>
          <div className={styles.first_view}>
            <div className={styles.box_one}>
              <div className={styles.upper_box}>
                <div className={styles.ub_texts}>
                  <p className={styles.ub_heading}>
                    The Kerala's Biggest Innovation Celebration is Here!
                  </p>
                  <img src={lines} alt="" className={styles.lines} />
                  <p className={styles.ub_text}>
                    Young Innovators Programme 5.0
                  </p>
                </div>

                <div className={styles.ub_img}>
                  <img src={boxoneimg} alt="" className={styles.boxoneimg} />
                </div>
              </div>
              <a
                href="https://yip.kerala.gov.in/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className={styles.apply_now}>Apply Now</button>
              </a>
              <div className={styles.lower_box}>
                <p className={styles.lb_texts}>
                  YIP 5.0 is here and{" "}
                  <b>it's bigger and more impactful than ever before!</b> Backed
                  by the Kerala government.
                  <br />
                  <br />
                  This year's initiative is set to provide an incredible
                  opportunity for <b>college and university students</b> to
                  showcase their innovation skills and create
                  <b>real-world impact</b>.
                </p>
              </div>
            </div>
            <div className={styles.right_side}>
              <div className={styles.box_two}>
                <p className={styles.bt_header}>Download the YIP App Now!</p>
                <div className={styles.box_two_bottom_section}>
                  <img src={qrcode} alt="" className={styles.bt_qrcode} />
                  <img src={cat} alt="" className={styles.bt_img} />
                </div>
              </div>
              <div className={styles.box_three}>
                <p className={styles.bth_header}>
                  Brainstorm, Collaborate, And Create
                </p>
                <img src={oglines} alt="" className={styles.oglines} />
                {/* <p className={styles.bth_text}>
                  Join forces with your{" "}
                  <b>
                    friends and other young innovators from across the state to
                    brainstorm, collaborate, and create innovative
                  </b>{" "}
                  solutions to real-world problems.
                </p> */}
                <img src={bthimg} alt="" className={styles.bth_img} />
              </div>
            </div>
            <div className={styles.box_four}>
              <div className={styles.bfr_texts}>
                Pitch your{" "}
                <b>
                  ideas and work alongside industry experts to solve real-life
                  problems.
                </b>{" "}
                <br />
                <br />
                Get valuable{" "}
                <b>
                  feedback and mentorship to refine your solutions and make a
                  meaningful impact.
                </b>
              </div>
              <img src={box_fourimg} alt="" className={styles.box_fourimg} />
            </div>
          </div>
        </div>

        <div className={styles.second_view_container}>
          <div className={styles.second_view}>
            <div className="third-section" id="timeline">
              <p className="tsheading">YIP Idea Registration Procedure</p>
              <div className="timeline-container">
                <div className="timeline">
                  <div className="timeline__event animated fadeInUp delay-3s timeline__event--type1">
                    <div className="timeline__event__icon">
                      <img
                        src={require("./assets/procedure/prereg.webp")}
                        alt=""
                        className="lni-cake"
                      />
                    </div>
                    <div className="timeline__event__date">
                      Pre
                      <br />
                      Registration
                    </div>
                    <div className="timeline__event__content">
                      <div className="timeline__event__title">Step One</div>
                      <div className="timeline__event__description">
                        <p>
                          <a href="https://yip.kerala.gov.in/yipapp/index.php/Idea2021/?utm_source=mulearn&utm_medium=link&utm_campaign=mulearn_directv1&utm_id=yip21v1&utm_term=new_reg">
                            <span>
                              <b>Click Here</b>{" "}
                            </span>
                          </a>
                          to go to the Pre-Registration page. Enter all your
                          details in the Pre-Registration Form and Complete the
                          OTP Verification. By Now you would have recived an
                          email with login credentials, you can now login with
                          that.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="timeline__event animated fadeInUp delay-2s timeline__event--type2">
                    <div className="timeline__event__icon">
                      <img
                        src={require("./assets/procedure/studentreg.webp")}
                        alt=""
                        className="lni-cake"
                      />
                    </div>
                    <div className="timeline__event__date">
                      Ideator <br />
                      Registration
                    </div>
                    <div className="timeline__event__content">
                      <div className="timeline__event__title">Step Two</div>
                      <div className="timeline__event__description">
                        <p>
                          <a href="https://yip.kerala.gov.in/yipapp/index.php/Init/">
                            <span>
                              {" "}
                              <b>Click Here to Login</b>
                            </span>
                          </a>
                          ,&nbsp;After Logging in Click the Open the left navbar
                          option and from the options listed there click the
                          <b>&nbsp;Profile Completion</b> option. Fill in all
                          your details correctly and according to the mentioned
                          specifications. Finally Submit the form and click OK.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="timeline__event animated fadeInUp delay-1s timeline__event--type3">
                    <div className="timeline__event__icon">
                      <img
                        src={require("./assets/procedure/yip-voc.webp")}
                        alt=""
                        className="lni-cake"
                      />
                    </div>
                    <div className="timeline__event__date">
                      Voice of <br />
                      Customer
                    </div>
                    <div className="timeline__event__content">
                      <div className="timeline__event__title">Step Three</div>
                      <div className="timeline__event__description">
                        <p>
                          After completing your Profile and submitting it, You
                          can check the left navbar again to find the &nbsp;
                          <b>Voice of Customer(VOC)</b> option. By clicking that
                          you will be directed to the course page where you can
                          complete it.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="timeline__event animated fadeInUp timeline__event--type1">
                    <div className="timeline__event__icon">
                      <img
                        src={require("./assets/procedure/team.webp")}
                        alt=""
                        className="lni-cake"
                      />
                    </div>
                    <div className="timeline__event__date">
                      Team
                      <br />
                      Formation
                    </div>
                    <div className="timeline__event__content">
                      <div className="timeline__event__title">Step Four</div>
                      <div className="timeline__event__description">
                        <p>
                          After completing the VOC Course and attending the quiz
                          there.
                          <b>
                            &nbsp;You can form a team consisting of minimum 2
                            members and maximum 5 members by clicking the Group
                            Formation Button from the left navbar. Only one
                            person from a group is required to form the group
                          </b>
                          &nbsp;while the other members can join it using the
                          team's name and password.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="timeline__event animated fadeInUp delay-3s timeline__event--type1">
                    <div className="timeline__event__icon">
                      <img
                        src={require("./assets/procedure/ideafind.webp")}
                        alt=""
                        className="lni-cake"
                      />
                    </div>
                    <div className="timeline__event__date">
                      Idea <br />
                      Submission
                    </div>
                    <div className="timeline__event__content">
                      <div className="timeline__event__title">Step Five</div>
                      <div className="timeline__event__description">
                        <p>
                          After forming a team and finding an idea which suits
                          the given themes, the{" "}
                          <b>person who formed the team</b> can submit the idea
                          by going to the
                          <b>&nbsp;Idea Submission Option</b> from his/her
                          Navbar.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="timeline__event animated fadeInUp delay-2s timeline__event--type2">
                    <div className="timeline__event__icon">
                      <img
                        src={require("./assets/procedure/approved.webp")}
                        alt=""
                        className="lni-cake"
                      />
                    </div>
                    <div className="timeline__event__date">
                      Institutional <br />
                      Approval
                    </div>
                    <div className="timeline__event__content">
                      <div className="timeline__event__title">Step Six</div>
                      <div className="timeline__event__description">
                        <p>
                          After the submission of the idea, it requires the
                          approval of the repective Institution and you may
                          contact the concerned authority for the approval of
                          your idea.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="timeline__event animated fadeInUp delay-1s timeline__event--type3">
                    <div className="timeline__event__icon">
                      <img
                        src={require("./assets/procedure/evaluation.webp")}
                        alt=""
                        className="lni-cake"
                      />
                    </div>
                    <div className="timeline__event__date">
                      Preliminary <br />
                      Evaluation
                    </div>
                    <div className="timeline__event__content">
                      <div className="timeline__event__title">Step Seven</div>
                      <div className="timeline__event__description">
                        <p>
                          Once your Idea is approved by the institution, it is
                          put forward for a preliminary evaluation and
                          <b>&nbsp;8000 teams</b> are selected from District
                          Level and
                          <b>&nbsp;2000 teams</b> are selected from State Level
                          and are awarded prizes upto <b>Rs.50000</b>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="timeline__event animated fadeInUp timeline__event--type1">
                    <div className="timeline__event__icon">
                      <img
                        src={require("./assets/procedure/winner annoucement.webp")}
                        alt=""
                        className="lni-cake"
                      />
                    </div>
                    <div className="timeline__event__date">
                      Winner
                      <br />
                      Annoucement
                    </div>
                    <div className="timeline__event__content">
                      <div className="timeline__event__title">Step Eight</div>
                      <div className="timeline__event__description">
                        <p>
                          Finally the winners are annouced and out of the 2000
                          teams selected at state level
                          <b>
                            &nbsp;900 teams are provided financial and mentoring
                            support for the next 3 years.
                          </b>
                        </p>
                      </div>
                    </div>
                  </div>
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

export default YIP2023;
