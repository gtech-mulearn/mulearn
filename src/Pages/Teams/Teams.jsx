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
                The 'µLearn' community's growth to this moment would not have
                been possible without the team's soul and heart. Our team has a
                big impact on how well we do our work. Here is the team to which
                we are addressing.
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
        <div></div>
        <div className={styles.team_list}>
          <span className={styles.team_card}>
            <h5>Executive Committee</h5>
            <p>
              The Executive Members are those who serve as the community's
              skeleton and propel it forward from the rear.
            </p>
            <Link to="/team/execom">
              <button className={styles.join_button}>View</button>
            </Link>
          </span>
          <span className={styles.team_card}>
            <h5>YIP Team</h5>
            <p>
              Here are the members of the crew and interns who helped to make
              the Yip a big success.
            </p>
            <Link to="/team/yip">
              <button className={styles.join_button}>View</button>
            </Link>
          </span>
          <span className={styles.team_card}>
            <h5>Community Team</h5>
            <p>
              The Community Team was the one who brought the achievements at the
              most; it links industry and academia and forges connections
              between students, faculty, mentors, and others.
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
