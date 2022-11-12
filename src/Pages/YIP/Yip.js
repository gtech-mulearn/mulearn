// import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "../../Components/Footer/Footer";
import Navbar from "../../Components/Navbar/Navbar";
import "./steps.css";
import  "./yip.css";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap-icons/font/bootstrap-icons.css";
// import MenuIcon from "@material-ui/icons/Menu";
// import swal from 'sweetalert';

function Yip() {
  // //Get the button
  // var mybutton = document.getElementById("myBtn");

  // // When the user scrolls down 20px from the top of the document, show the button
  // window.onscroll = function () { scrollFunction() };

  // function scrollFunction() {
  //   if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
  //     mybutton.style.display = "block";
  //   } else {
  //     mybutton.style.display = "none";
  //   }
  // }

  // // When the user clicks on the button, scroll to the top of the document
  // function topFunction() {
  //   document.body.scrollTop = 0;
  //   document.documentElement.scrollTop = 0;
  // }

  // const scriptURL = 'https://script.google.com/macros/s/AKfycbw7IC0kJuSOOrWFhz30TJg5MVwr--BMJZRVH-P7zjRSVAWQMnQJmyXYOep2t31cCuGJ/exec'
  // const form = document.forms['gform']

  // form.addEventListener('submit', e => {
  //   e.preventDefault()
  //   console.log(form);
  //   fetch(scriptURL, { method: 'POST', body: new FormData(form) })
  //     .then(response => swal("Good job!", "You have successfully submitted !", "success").then(() => window.location.reload()))
  //     .catch(error => console.error('Error!', error.message))
  // })

  return (
    <div className="App">
      <body>
        {/* <button onClick="topFunction()" id="myBtn" title="Go to top">
          <span className="iconify upbtn" data-icon="mdi:arrow-up-bold"></span>
        </button> */}

        <Navbar />

        <main>
          <div className="first-section">
            <div className="left-section">
              <p className="main-header">ഐഡിയ ആണ് മെയിൻ!</p>
              <p className="tagline">
                Young Innovators Programme (YIP) is a specially designed
                programme under Kerala Development and Innovation Strategic
                Council (K-DISC). The programme aims to empower future
                innovators to innovate new products, services or models to meet
                emerging requirements, unarticulated needs, or existing market
                needs of the society more effectively through an innovative
                challenge.
              </p>

              <form name="gform" method="post">
                <p
                  className="stext"
                  style={{ color: "#f6832a", fontWeight: "600" }}
                >
                  Registrations for YIP'21 is Closed!
                </p>
                <input
                  placeholder="Email Address"
                  className="inputfield"
                  type="email"
                  name="email"
                  id="email"
                />

                <button className="submit-btn" id="submit" type="submit">
                  Notify Me!
                </button>

                <p className="stext">
                  Enter in your Email Id to get notified for YIP'22.
                </p>
              </form>
            </div>

            <div className="right-section">
              <img
                src={require("./assets/Illustration.png")}
                alt=""
                className="illustration"
              />
            </div>
          </div>

          <div className="second-section">
            <div className="bulb-container">
              <img
                className="paper-bulb"
                src={require("./assets/Paper Bulb.png")}
                alt=""
              />
            </div>

            <div className="image-container">
              <div className="s1s2">
                <div className="s1">
                  <p className="sheader">Who all can Participate</p>
                  <p className="stext">
                    Students studying in 8th Standard, College Students and
                    working Professionals who are interested in innovation upto
                    the age of 35 can participate.
                  </p>
                </div>
                <div className="s2">
                  <p className="sheader">Funding of 30Cr</p>
                  <p className="stext">
                    The most important thing in the development of an Idea is
                    the availability of funding at the correct time. If funding
                    is your issue, don't worry we have you covered.
                  </p>
                </div>
              </div>

              <iframe
                className="yt-video"
                src="https://www.youtube.com/embed/cHK16ItlY3w"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
              <div className="s3s4">
                <div className="s3">
                  <p className="sheader">Amazing Prizes</p>
                  <p className="stext">
                    YIP is offering financial support of Rs.25000 to 8000 teams
                    getting selected in the District level and Rs.50000 to 2000
                    teams getting selected in the state level.
                  </p>
                </div>
                <div className="s4">
                  <p className="sheader">How to Register</p>
                  <p className="stext">
                    You can join in and submit your ideas as a team consisting
                    minimum two and maximum five members before February 15th
                    2022. Each Ideator can exist in 2 teams at a time.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="third-section" id="timeline">
            <p className="tsheading">YIP Idea Registration Procedure</p>
            <div className="timeline-container">
              <div className="timeline">
                <div className="timeline__event animated fadeInUp delay-3s timeline__event--type1">
                  <div className="timeline__event__icon">
                    <img
                      src={require("./assets/procedure/prereg.png")}
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
                        OTP Verification. By Now you would have recived an email
                        with login credentials, you can now login with that.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="timeline__event animated fadeInUp delay-2s timeline__event--type2">
                  <div className="timeline__event__icon">
                    <img
                      src={require("./assets/procedure/studentreg.png")}
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
                        <b>&nbsp;Profile Completion</b> option. Fill in all your
                        details correctly and according to the mentioned
                        specifications. Finally Submit the form and click OK.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="timeline__event animated fadeInUp delay-1s timeline__event--type3">
                  <div className="timeline__event__icon">
                    <img
                      src={require("./assets/procedure/yip-voc.png")}
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
                        After completing your Profile and submitting it, You can
                        check the left navbar again to find the &nbsp;
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
                      src={require("./assets/procedure/team.png")}
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
                          Formation Button from the left navbar. Only one person
                          from a group is required to form the group
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
                      src={require("./assets/procedure/ideafind.png")}
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
                        After forming a team and finding an idea which suits the
                        given themes, the <b>person who formed the team</b> can
                        submit the idea by going to the
                        <b>&nbsp;Idea Submission Option</b> from his/her Navbar.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="timeline__event animated fadeInUp delay-2s timeline__event--type2">
                  <div className="timeline__event__icon">
                    <img
                      src={require("./assets/procedure/approved.png")}
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
                        contact the concerned authority for the approval of your
                        idea.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="timeline__event animated fadeInUp delay-1s timeline__event--type3">
                  <div className="timeline__event__icon">
                    <img
                      src={require("./assets/procedure/evaluation.png")}
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
                        Once your Idea is approved by the institution, it is put
                        forward for a preliminary evaluation and
                        <b>&nbsp;8000 teams</b> are selected from District Level
                        and
                        <b>&nbsp;2000 teams</b> are selected from State Level
                        and are awarded prizes upto <b>Rs.50000</b>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="timeline__event animated fadeInUp timeline__event--type1">
                  <div className="timeline__event__icon">
                    <img
                      src={require("./assets/procedure/winner annoucement.png")}
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
        </main>

        <Footer />
      </body>
    </div>
  );
}

export default Yip;
