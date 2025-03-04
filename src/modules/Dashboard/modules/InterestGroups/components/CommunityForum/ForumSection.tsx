import React from 'react';
import { Bell, MoreHorizontal, Image, Film, PieChart, Smile } from 'lucide-react';
import styles from './CommunityForum.module.css';

const ForumSection = () => {
  return (
    <div className={styles.sectionContent}>
      {/* Post Creation */}
      <div className={styles.postCreation}>
        <img
          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&q=80"
          alt="User"
          className={styles.postUserAvatar}
        />
        <input
          type="text"
          placeholder="Start post in this group"
          className={styles.postInput}
        />
      </div>

      {/* Post Actions */}
      {/* <div className={styles.postActions}>
        <button className={styles.actionButton}>
          <Image className={styles.actionIcon} />
          <span>Image</span>
        </button>
        <button className={styles.actionButton}>
          <Film className={styles.actionIcon} />
          <span>Video/Gif</span>
        </button>
        <button className={styles.actionButton}>
          <PieChart className={styles.actionIcon} />
          <span>Activity/Poll</span>
        </button>
        <button className={styles.actionButton}>
          <Smile className={styles.actionIcon} />
          <span>Feelings</span>
        </button>
      </div> */}

      {/* Post Example */}
      <div className={styles.postContainer}>
        <div className={styles.postHeader}>
          <div className={styles.postHeaderLeft}>
            <img
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&q=80"
              alt="Ali Husni"
              className={styles.postAvatar}
            />
            <div className={styles.postInfo}>
              <div className={styles.postNameRow}>
                <h3 className={styles.postName}>Ali Husni</h3>
                <button className={styles.followButton}>Follow</button>
              </div>
              <p className={styles.postTime}>25 minutes ago</p>
            </div>
          </div>
          <button className={styles.postMoreButton}>
            <MoreHorizontal className={styles.postMoreIcon} />
          </button>
        </div>
        <p className={styles.postText}>
          Hi, folks 👋<br />
          This is my exploration about a creative digital agency called Booster Agency.
          Please enjoy my post and follow me, press Love to support and don't forget to give feedback. 👋
        </p>
      </div>
    </div>
  );
};

export default ForumSection;
