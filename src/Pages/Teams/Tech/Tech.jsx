import Navbar from "../../../Components/Navbar/Navbar";
import Footer from "../../../Components/Footer/Footer";
import styles from "./Tech.module.css";
// import yipTeam from "./data/yip-team.js";s
import MentorCard from "../../../Components/MentorCard/MentorCard";
import { useState } from "react";

const Tech = () => {
  const [filter, setfilter] = useState(0);

  const handleFilterChange = (e) => {
    setfilter(e.target.value);
  };

  const filters = ["", "µ-Web", "µ-300", "µ-JSON", "µ-Bot"];

  return (
    <>
      <Navbar />
      <div className={styles.firstviewmain_container}>
        <div className={styles.firstview_container}>
          <div className={styles.first_view}>
            <div className={styles.fv_texts}>
              <p className={styles.fv_heading}>
                <span>Tech</span> Team
              </p>
              <p className={styles.fv_tagline}>
                Here are the members of the crew who contributed developing the
                website and bot, collected resources and gave suggestions about
                UX.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.team_collection}>
        <select
          className={`${styles.select} form-select form-select-lg mb-3`}
          value={filter}
          onChange={handleFilterChange}
        >
          <option value="0" selected>
            Filter by Domain
          </option>
          <option value="1">µ-Web</option>
          <option value="2">µ-300</option>
          <option value="3">µ-JSON</option>
          <option value="4">µ-Bot</option>
        </select>
        {/* <div className={styles.team_list}>
          {yipTeam.map((member) => {
            console.log(member.domain);
            console.log(filters[filter]);
            if (filter === 0 || member.domain === filters[filter]) {
              return (
                <MentorCard
                  key={member.name}
                  name={member.name}
                  designation={member.designation}
                  image={member.image}
                  interest={member.domain ? member.domain : ""}
                  linkedIn={member.linkedin}
                />
              );
            } else return <></>;
          })}
        </div> */}
      </div>
      <Footer />
    </>
  );
};

export default Tech;
