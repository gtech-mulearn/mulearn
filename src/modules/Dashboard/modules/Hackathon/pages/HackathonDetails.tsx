import "./styles.css"
import banner from "../Assets/sampleBanner.png"

type Props = {};

const HackathonDetails = (props: Props) => {
    return (
        <div className="content">
            <div className="profileDash">
                <div className="banner">
                    <img src={banner} alt="" />
                </div>
                <div className="event__card">
                    <div className="apply__Card">
                        <div className="date">
                            <span></span>
                            <div className="event__Date">
                                <div>
                                    <p>EVENT DATES</p>
                                    <h3>Dec 29 & 30 2022</h3>
                                </div>
                                <div>
                                    <p>HAPPENING AT</p>
                                    <h3>Kerala, India</h3>
                                </div>
                            </div>
                        </div>
                        <div className="close">
                            <p>APPLICATION CLOSING DATE</p>
                            <h4>15 December 2022</h4>
                        </div>
                        <button className="apply__Now">Apply Now</button>
                    </div>
                    <div className="social__links">
                        <a href="#">
                            <i className="fab fa-facebook-f"></i>
                        </a>
                        <a href="#">
                            <i className="fab fa-linkedin-in"></i>
                        </a>
                        <a href="#">
                            <i className="fab fa-instagram"></i>
                        </a>
                        <a href="#">
                            <i className="fab fa-instagram"></i>
                        </a>
                    </div>
                </div>
            </div>

            <div className="desc">
                <div className="description">
                    <span className="hackprofile"></span>
                    <div>
                        <h1>Beach Hack 5</h1>
                        <div>
                            <span>203 Interested</span>
                            &nbsp;
                            <span> 250+ participants</span>
                        </div>
                    </div>
                    <span className="love"></span>
                </div>

                <p>
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum."Duis aute irure dolor
                    in reprehenderit in voluptate velit esse cillum dolore eu
                    fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                    proident, sunt in culpa qui officia deserunt mollit anim id
                    est laborum.
                </p>
            </div>
        </div>
    );
};

export default HackathonDetails;
