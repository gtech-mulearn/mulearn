import React from "react";
import MuModal from "@/MuLearnComponents/MuModal/MuModal";
import styles from "./EventDetailsModal.module.css";
import { CircleMeetupInfo } from "../../services/LearningCircleInterface";
import { useUserStore } from "/src/ZustandProvider";

interface EventDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  meetup?: CircleMeetupInfo;
  onEdit: (meetup: CircleMeetupInfo) => void;  // ✅ Edit function
  onDelete: (meetupId: string) => void;        // ✅ Delete function
}

const EventDetailsModal: React.FC<EventDetailsModalProps> = ({
  isOpen,
  onClose,
  meetup,
  onEdit,
  onDelete
}) => {
  const { userInfo } = useUserStore();
  const currentUser = userInfo.full_name;

  if (!meetup) return null;

  return (
    <MuModal
      type="success"
      onDone={onClose}
      onClose={onClose}
      title="Event Details"
      isOpen={isOpen}
      showButton={false}
    >
      <div className={`${styles.eventDetails} ${styles.modalAnimation}`}>
        <h3>{meetup.title}</h3>
        <p>
          <strong>Location:</strong> {meetup.meet_place}
        </p>
        {meetup.meet_time && (
          <>
            <p>
              <strong>Date:</strong> {new Date(meetup.meet_time).toLocaleDateString()}
            </p>
            <p>
              <strong>Time:</strong> {new Date(meetup.meet_time).toLocaleTimeString()}
            </p>
          </>
        )}
        {meetup.attendee && (
          <p>
            <strong>Attendees:</strong> {Number(meetup.attendee) || 10}
          </p>
        )}
        {meetup.meet_place === "Google Meet" && meetup.meet_link && (
          <div className={styles.joiningUrlSection}>
            <p>
              <strong>Joining URL:</strong>
            </p>
            <div className={styles.urlContainer}>
              <a
                href={meetup.meet_link}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.copyButton}
              >
                Open URL
              </a>
              <button
                className={styles.copyButton}
                onClick={() => {
                  navigator.clipboard.writeText(meetup.meet_link || "");
                  alert("URL copied to clipboard!");
                }}
              >
                Copy URL
              </button>
            </div>
          </div>
        )}

        <div className={styles.buttonContainer}>
          {/* {
            meetup.created_by === currentUser && (
              <>
                <button className={styles.editButton} onClick={() => onEdit(meetup)}>
                  Edit
                </button>
                <button className={styles.deleteButton} onClick={() => onDelete(meetup.id)}>
                  Delete
                </button>
              </>
            )
          } */}
          <button className={styles.doneButton} onClick={onClose}>
            Done
          </button>
        </div>
      </div>
    </MuModal>
  );
};

export default EventDetailsModal;
