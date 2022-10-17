import { Link } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";
import Navbar from "../../Components/Navbar/Navbar";
import styles from "./Teams.module.css";
import MentorCard from "../../Components/MentorCard/MentorCard";

import execom from "./data/execom";
import yipteam from "./data/yip-team";
import communitycoreTeam from "./data/community/core.js";
import zonalHeads from "./data/community/zonal.js";
import campusAmbassadors from "./data/community/ca.js";
import districtHeads from "./data/community/district.js";
import techTeam from "./data/tech-contributors.js";

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

      <section id={styles.execom} className={styles.team_group}>
        <p className={styles.team_title}>Executive Committee</p>
        <p className={styles.team_desc}>The Executive Members are those who serve as the community's skeleton and propel it forward from the rear.</p>
        <div className={styles.members_list}>
          {execom.map((member) => {
            return (
              <MentorCard
                key={member.name}
                name={member.name}
                designation={member.designation}
                image={member.image}
                linkedIn={member.linkedin ? member.linkedin : ""}
              />
            );
          })}
        </div>
      </section>

      <section className={styles.team_group}>
        <p className={styles.team_title}>YIP Organization Team</p>
        <p className={styles.team_desc}>Here are the members of the crew and interns who helped to make the Yip a big success.</p>
        <div className={styles.members_list}>
          {yipteam.map((member) => {
            return (
              <MentorCard
                key={member.name}
                name={member.name}
                designation={member.designation}
                image={member.image}
                linkedIn={member.linkedin ? member.linkedin : ""}
              />
            );
          })}
        </div>
      </section>

      <section className={styles.team_group}>
        <p className={styles.team_title}>Community Team</p>
        <p className={styles.team_desc}>The Community Team was the one who brought the achievements at the most; it links industry and academia and forges connections between students, faculty, mentors, and others.</p>
        <p className={styles.sub_team_title}>Core Team</p>
        <div className={styles.members_list}>
          {communitycoreTeam.map((member) => {
            return (
              <MentorCard
                key={member.name}
                name={member.name}
                designation={member.designation}
                image={member.image}
                linkedIn={member.linkedin ? member.linkedin : ""}
              />
            );
          })}
        </div>
        <p className={styles.sub_team_title}>Zonal Heads</p>
        <div className={styles.members_list}>
          {zonalHeads.map((member) => {
            return (
              <MentorCard
                key={member.name}
                name={member.name}
                designation={member.designation}
                image={member.image}
                linkedIn={member.linkedin ? member.linkedin : ""}
              />
            );
          })}
        </div>
        <p className={styles.sub_team_title}>District Heads</p>
        <div className={styles.members_list}>
          {districtHeads.map((member) => {
            return (
              <MentorCard
                key={member.name}
                name={member.name}
                designation={member.designation}
                image={member.image}
                linkedIn={member.linkedin ? member.linkedin : ""}
              />
            );
          })}
        </div>
        <p className={styles.sub_team_title}>Campus Ambassadors</p>
        <div className={styles.members_list}>
          {campusAmbassadors.map((member) => {
            return (
              <MentorCard
                key={member.name}
                name={member.name}
                designation={member.designation}
                image={member.image}
                linkedIn={member.linkedin ? member.linkedin : ""}
              />
            );
          })}
        </div>
      </section>

      <section className={styles.team_group}>
        <p className={styles.team_title}>Tech Team</p>
        <p className={styles.team_desc}>Here are the members of the crew who contributed developing the website and bot, collected resources and gave suggestions about UX.</p>
        <div className={styles.members_list}>
          {techTeam.map((member) => {
            return (
              <MentorCard
                key={member.name}
                name={member.name}
                image={member.image}
                interest={member.team ? member.team : ""}
                linkedIn={member.linkedin ? member.linkedin : ""}
              />
            );
          })}
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Teams;
