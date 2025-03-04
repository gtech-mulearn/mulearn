import React from "react";
import MuModal from "@/MuLearnComponents/MuModal/MuModal";
import styles from "./EventDetailsModal.module.css";
import { CircleMeetupInfo } from "../../services/LearningCircleInterface";

interface EventDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  meetup?: CircleMeetupInfo;
}

const EventDetailsModal: React.FC<EventDetailsModalProps> = ({ isOpen, onClose, meetup }) => {
  return (
    <MuModal
      type="success"
      onDone={onClose}
      onClose={onClose}
      title="Event Details"
      isOpen={isOpen}
    >
      <div className={`${styles.eventDetails} ${styles.modalAnimation}`}>
        <h3>{meetup?.title}</h3>
        <p>
          <strong>Location:</strong> {meetup?.meet_place}
        </p>
        {meetup?.meet_time && (
          <p>
            <strong>Date:</strong>{" "}
            {new Date(meetup.meet_time).toLocaleDateString()}
          </p>
        )}
        {meetup?.meet_time && (
          <p>
            <strong>Time:</strong>{" "}
            {new Date(meetup.meet_time).toLocaleTimeString()}
          </p>
        )}
        {meetup?.attendee && (
          <p>
            <strong>Attendees:</strong> {Number(meetup.attendee) || 10}
          </p>
        )}
        {meetup?.meet_place === "Google Meet" && meetup?.meet_link && (
          <div className={styles.joiningUrlSection}>
            <p>
              <strong>Joining URL:</strong>
            </p>
            <div className={styles.urlContainer}>
              <a
                href={meetup.meet_link || ""}
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
      </div>
    </MuModal>
  );
};

export default EventDetailsModal;
