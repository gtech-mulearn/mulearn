import React from "react";
import styles from "./UserCard.module.css";

interface CardData {
  id?: number | string;
  name: string;
  muid?: string; // Specific to regular users
  role?: string; // Specific to mentors and think tank members
  interest_groups?: { id: string; name: string }[]; // Regular users
  expertise?: string[]; // Mentors and think tank members
  organizations?: { id: string; title: string; code: string; org_type: string }[]; // Regular users
  profile_pic?: string | null; // Regular users
  image?: string; // Mentors and think tank members (alias for profile_pic)
  karma?: string; // Specific to regular users
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
        src={data.profile_pic || data.image || "/placeholder.svg"}
        alt={data.name}
        className={styles.userImage}
        onError={(e) => {
          (e.target as HTMLImageElement).src = "/placeholder.svg";
        }}
      />
      <div className={styles.userDetails}>
        <div className={styles.userHeader}>
          <h2 className={styles.userName}>{data.name.trim() || "Unknown"}</h2>
          {isRegularUser && data.muid && <h3 className={styles.userMUID}>{data.muid}</h3>}
          {/* <h3 className={styles.userRole}>{getPrimaryOrganization()}</h3> */}
          {isRegularUser && data.karma && (
            <p className={styles.userKarma}>Karma: {formatKarma(data.karma)}</p>
          )}
        </div>
        <div className={styles.interestGroups}>
          {getInterests().length > 0 ? (
            getInterests().map((item, index) => (
              <span key={index} className={styles.interestTag}>
                {item}
              </span>
            ))
          ) : (
            <span className={styles.noInterestTag}>{noInterestsText}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserCard;