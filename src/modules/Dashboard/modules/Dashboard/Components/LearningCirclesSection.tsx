import React, { useState, useEffect, useCallback, memo } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./LearningCirclesSection.module.css";
import { getMeetups } from "../../LearningCircleV2/services/LearningCircleAPIs";
import { CircleMeetupInfo } from "../../LearningCircleV2/services/LearningCircleInterface";
import EventDetailsModal from "../../LearningCircleV2/components/EventDetailsModal/EventDetailsModal";

const meetupCache: { [key: string]: CircleMeetupInfo[] } = {};

const useMeetups = (category: string, limit: number = 6) => {
  const [meetups, setMeetups] = useState<CircleMeetupInfo[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchMeetups = async () => {
      // Check cache first
      if (meetupCache[category]) {
        setMeetups(meetupCache[category].slice(0, limit));
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        const res = await getMeetups(category);
        meetupCache[category] = res; // Cache the full result
        setMeetups(res.slice(0, limit));
      } catch (error) {
        console.error("Failed to fetch meetups:", error);
        setMeetups([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMeetups();
  }, [category, limit]); 

  return { meetups, isLoading };
};

const LearningCirclesSection: React.FC = () => {
  const { meetups, isLoading } = useMeetups("all"); 
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMeetup, setSelectedMeetup] = useState<CircleMeetupInfo | undefined>(undefined);

  const handleCircleClick = useCallback((meetup: CircleMeetupInfo) => {
    setSelectedMeetup(meetup);
    setIsModalOpen(true);
  }, []);

  const handleNavigate = useCallback(() => {
    navigate("/dashboard/learningcircle");
  }, [navigate]); 

  return (
    <>
      <EventDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        meetup={selectedMeetup}
      />

      <div className={styles.container}>
        <div className={styles.header}>
          <h3 className={styles.title}>Learning Circles</h3>
          <span className={styles.arrow} onClick={handleNavigate}>
            ›
          </span>
        </div>

        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div className={styles.list}>
            {meetups.map((meetup) => (
              <div
                key={meetup.id}
                className={styles.circleItem}
                onClick={() => handleCircleClick(meetup)}
              >
                <div className={styles.circleInfo}>
                  <div className={styles.circleTitle}>{meetup.title}</div>
                  <div className={styles.circleDescription}>
                    {meetup.meet_place || "No description available."}
                  </div>
                  <div className={styles.circleDetails}>
                    <span className={styles.createdBy}>Created by: Admin</span>
                    <span className={styles.happeningTime}>
                      Happening:{" "}
                      {meetup.meet_time
                        ? new Date(meetup.meet_time).toLocaleString()
                        : "TBD"}
                    </span>
                  </div>
                  <div className={styles.tagsContainer}>
                    {/* Add tags if CircleMeetupInfo includes them */}
                    {/* Example: meetup.tags?.map(tag => <span key={tag}>{tag}</span>) */}
                  </div>
                </div>
                <button className={styles.ctaButton}>View</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default memo(LearningCirclesSection);