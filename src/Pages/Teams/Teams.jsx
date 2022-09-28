import { Link } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";
import Navbar from "../../Components/Navbar/Navbar";
import styles from "./Teams.module.css";

const Teams = () => {
  return (
    <>
      <Navbar />
      <div className={styles.firstviewmain_container}>
        <div className={styles.firstview_container}>
          <div className={styles.first_view}>
            <div className={styles.fv_texts}>
              <p className={styles.fv_heading}>
                The <span>Gears</span> Behind The Machine.
              </p>
              <p className={styles.fv_tagline}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed dou
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam.
              </p>
            </div>
            <div className={styles.fv_illustration}>
              <img
                className={styles.fv_image}
                src="assets/team/illustration.gif"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.team_collection}>
        <h2 className={styles.team_heading}>
          View The <span>Team Members</span>
        </h2>
        <div className={styles.team_list}>
          <span className={styles.team_card}>
            <h5>Executive Committee</h5>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <Link to="/team/execom">
              <button className={styles.join_button}>View</button>
            </Link>
          </span>
          <span className={styles.team_card}>
            <h5>YIP Team</h5>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <Link to="/team/yip">
              <button className={styles.join_button}>View</button>
            </Link>
          </span>
          <span className={styles.team_card}>
            <h5>Community Team</h5>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <Link to="/team/community">
              <button className={styles.join_button}>View</button>
            </Link>
          </span>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Teams;
