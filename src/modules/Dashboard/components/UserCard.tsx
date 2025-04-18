import React from "react";
import styles from "./UserCard.module.css";
import { FiLinkedin } from "react-icons/fi";

interface CardData {
  id?: number | string;
  name: string;
  institution?: string;
  muid?: string; // Specific to regular users
  role?: string; // Specific to mentors and think tank members
  interest_groups?: { id: string; name: string }[]; // Regular users
  expertise?: string[]; // Mentors and think tank members
  organizations?: { id: string; title: string; code: string; org_type: string }[]; // Regular users
  profile_pic?: string | null; // Regular users
  image?: string; // Mentors and think tank members (alias for profile_pic)
  karma?: string; // Specific to regular users
  linkedin?: string;
}

interface UserCardProps {
  data: CardData;
  onSelect: (data: CardData) => void;
}

const UserCard: React.FC<UserCardProps> = ({ data, onSelect }) => {
  const getPrimaryOrganization = () => {
    if (data.role) return data.role.split(",")[0] || "N/A"; // For mentors and think tank
    if (data.organizations) {
      const college = data.organizations.find((org) => org.org_type === "College");
      return college ? college.title : "N/A"; // For regular users
    }
    return "N/A";
  };

  const getInterests = () => {
    if (data.expertise) return data.expertise; // For mentors and think tank
    if (data.interest_groups) return data.interest_groups.map((ig) => ig.name); // For regular users
    return [];
  };

  const formatKarma = (karma: string) => {
    const karmaNum = parseInt(karma, 10);
    return isNaN(karmaNum) ? "0" : karmaNum.toLocaleString();
  };

  // Determine user type
  const isThinkTank = !data.muid && !data.karma && data.role && data.expertise; // Think tank member
  const isRegularUser = data.muid || data.karma; // Regular user with muid or karma
  const isMentor = data.role && !isThinkTank && !isRegularUser; // Mentor (role but not think tank)
  const noInterestsText = isThinkTank || isMentor ? "No expertise listed" : "No interest groups";

  return (
    <div className={styles.userCard} onClick={() => onSelect(data)}>
      <img
        src={data.profile_pic || data.image || "/assets/dpm.webp"}
        alt={data.name}
        className={styles.userImage}
        onError={(e) => {
          (e.target as HTMLImageElement).src = "/assets/dpm.webp";
        }}
      />
      <div className={styles.userDetails}>
        <div className={styles.userHeader}>
          <div className="flex flex-col">

          <h2 className={styles.userName}>{data.name.trim() || "Unknown"}</h2>
          {data.institution && <h3 className={styles.userRole}>{data.institution}</h3>}
          {data.role && <h3 className={styles.userRole}>{data.role}</h3>}
          {data.linkedin && <a href={data.linkedin} target="_blank" rel="noreferrer" className={styles.userLinkedin}><FiLinkedin /></a>}

          </div>
          {isRegularUser && data.muid && <h3 className={styles.userMUID}>{data.muid}</h3>}

          {/* <h3 className={styles.userRole}>{getPrimaryOrganization()}</h3> */}
          {data.karma && (
            <p className={styles.userKarma}>Karma: {formatKarma(data.karma)}</p>
          )}
        </div>
        {data.interest_groups && data.interest_groups.length > 0 && (
          <div className={styles.interestGroups}>
            {getInterests().map((item, index) => (
              <span key={index} className={styles.interestTag}>
                {item}
              </span>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default UserCard;