import React, { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { Users2 } from "lucide-react"; // Example icon import
import styles from "./IGCard.module.css";
import { FiStar, FiEdit, FiCode } from "react-icons/fi";
import { IconType } from "react-icons";

const imageUrls = [
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&q=80",
    "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=40&h=40&q=80",
    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&q=80",
    "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=40&h=40&q=80",
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&q=80",
  ];




const GroupCard = ({ group, categories }: { group: {id: string, members: number, icon: ReactNode, name: string, category: string}, categories: {id: string, name: string}[] }) => {
  const navigate = useNavigate();
  const randomIndex = Math.floor(Math.random() * imageUrls.length);
  const randomImageUrl = imageUrls[randomIndex];

  return (
    <div
      key={group.id}
      className={styles.GroupCard}
      onClick={() => navigate(`/dashboard/interestgroups/${group.id}`)}
    >
      <div className={styles.Icon}>
        {group.icon ? (
            <FiCode/>
        //   group.icon
        ) : (
            <FiCode/>
        )}
      </div>
          <h3 className={styles.GroupTitle}>{group.name}</h3>
        <div className={styles.GroupOverlay}>
          <span className={styles.GroupParticipantsBadge}>
            <Users2 className={styles.GroupParticipantsIcon} />
            {group.members || "0"}
          </span>
        </div>
      <div className={styles.GroupDetails}>
        {group.category && (
          <span className={styles.GroupCategory}>
            {categories.find((c) => c.id === group.category)?.name}
          </span>
        )}
      </div>
    </div>
  );
};

export default GroupCard;
