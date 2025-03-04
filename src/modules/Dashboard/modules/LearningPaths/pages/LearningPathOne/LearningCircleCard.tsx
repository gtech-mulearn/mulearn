import { Calendar, Clock, MapPin } from 'lucide-react';
import styles from "./LearningCircleCard.module.css";
import { getDateDifference } from '/src/modules/Dashboard/utils/utils';
import { CircleMeetupInfo } from '../../../LearningCircleV2/services/LearningCircleInterface';

// EventCard.tsx

interface EventCardProps {
  id: string
  title: string;
  institution: string;
  location: string;
  date: string;
  time: string;
  venue: string;
  karmaPoints: number;
  joinedPeople: number;
  joiningUrl: string | null;
  imageUrl?: string;
  setIsModalOpen?: (event: CircleMeetupInfo) => void
  isDisabled?: boolean;
}

export const EventCard = ({
  title,
  // institution,
  id,
  location,
  date,
  time,
  venue,
  karmaPoints,
  joinedPeople,
  joiningUrl,
  setIsModalOpen,
  imageUrl,
  isDisabled = false
}: EventCardProps) => {
  return (
    <div className={styles.card}>
      <div className={styles.content}>
        <div className={styles.contentHeader}>
          <div>
            <h2 className={styles.title}>{title}</h2>
            <p className={styles.location}>{location}</p>
            <div className={styles.detailItem}>
              <Calendar className={styles.icon} />
              <span>{getDateDifference(date)}</span>
            </div>
          </div>
          {imageUrl ? (
            <img src={imageUrl} alt={title} className={styles.image} />
          ) : (
            <div className={styles.placeholderImage} />
          )}
        </div>
        {/* Join Button */}
        <button
          className={`${styles.joinButton} ${isDisabled ? styles.disabled : ''}`}
          disabled={isDisabled}
          onClick={()=> setIsModalOpen && setIsModalOpen({
            id,
            title,
            meet_place: location,
            meet_time: date,
            is_report_needed: false,
            report_description: "",
            coord_x: 0,
            coord_y: 0,
            duration: karmaPoints,
            is_approved: false,
            is_started: false,
            is_ended: false,
            attendee: null,
            meet_link: joiningUrl,
          })}
        >
          Join Now
        </button>

        {/* Joined People */}
        <div className={styles.joinedPeople}>
          <div className={styles.avatars}>
            {[...Array(3)].map((_, i) => (
              <div key={i} className={styles.avatar} />
            ))}
          </div>
          <span>{joinedPeople} people you might know have joined</span>
        </div>
      </div>
    </div>
  );
};