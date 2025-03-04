import React from "react";
import styles from "./InterestGroups.module.css";
import { FaChevronRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

type InterestGroup = {
  title: string;
  image?: string;
  link: string;
};

interface InterestGroupsProps {
  title: string;
  groups: InterestGroup[];
}

const InterestGroups: React.FC<InterestGroupsProps> = ({ title, groups }) => {
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <div className={styles.IgTitleContainer}>
        <h3 className={styles.header}>Interest groups in {title}</h3>
        <button onClick={()=> navigate('/dashboard/interestgroups')}>Show more &gt; </button>
      </div>
      <div className={styles.list}>
        {groups.map((group, index) => (
          <div key={index} className={styles.groupItem} onClick={() => navigate(`/dashboard/${group.link}`)}>
            <img
              src={"/assets/IG/mobile_dev.jpg"}
              alt={group.title}
              className={styles.groupImage}
            />
            <span className={styles.groupTitle}>{group.title}</span>
            <a href={group.link} className={styles.arrowLink}>
              <FaChevronRight className={styles.arrowIcon} />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InterestGroups;
