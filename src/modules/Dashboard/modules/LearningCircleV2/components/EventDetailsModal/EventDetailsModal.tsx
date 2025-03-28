import React from "react";
import MuModal from "@/MuLearnComponents/MuModal/MuModal";
import styles from "./EventDetailsModal.module.css";
import { CircleMeetupInfo } from "../../services/LearningCircleInterface";
import { useUserStore } from "/src/ZustandProvider";
import { deleteMeeting, submitRSVP } from "../../services/LearningCircleAPIs";
import toast from "react-hot-toast";

interface EventDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  meetup?: CircleMeetupInfo;
  onEdit: (meetup: CircleMeetupInfo) => void; // ✅ Edit function
  onDelete: (meetupId: string) => void; // ✅ Delete function
  onCloseRefresh: () => void
}

const EventDetailsModal: React.FC<EventDetailsModalProps> = ({
  isOpen,
  onClose,
  meetup,
  onEdit,
  onDelete,
  onCloseRefresh
}) => {
  const { userInfo } = useUserStore();
  const currentUser = userInfo.full_name;

  if (!meetup) return null;

  const handleConfirmRSVP = (learningCircleId: string) => {
    if (learningCircleId) {
      submitRSVP(learningCircleId).then(status => {
        if (status) {
          toast.success("RSVP confirmed successfully!", {
            id: "RSVP-success"
          });
        } else {
          toast.error("Failed to confirm RSVP. Please try again.");
        }
      });
    }
  };


  const handleDelete = async (learningCircleId: string) => {
    if (!learningCircleId) return;

    const confirmDelete = window.confirm(
        "Are you sure you want to delete this Learning Circle?"
    );

    if (!confirmDelete) return;

    try {
        await deleteMeeting(learningCircleId);
        onCloseRefresh();
    } catch (error) {
        console.error("Error deleting Learning Circle:", error);
        toast.error("An unexpected error occurred. Please try again.");
    }
};


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
              <strong>Date:</strong>{" "}
              {new Date(meetup.meet_time).toLocaleDateString()}
            </p>
            <p>
              <strong>Time:</strong>{" "}
              {new Date(meetup.meet_time).toLocaleTimeString()}
            </p>
          </>
        )}
        {meetup.attendees && (
          <p>
            <strong>Attendees:</strong>{" "}
            {Number(meetup.attendees.length) || 10}
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
                  navigator.clipboard.writeText(
                    meetup.meet_link || ""
                  );
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
          {currentUser === meetup?.created_by ? (
            <>
            
            <button className={styles.doneButton} onClick={onClose}>
              Done
            </button>

            <button className={styles.deleteButton} onClick={()=> {
              handleDelete(meetup?.id)
            }}>
              Delete
            </button>
            
            </>
          ) : (
            <button
              className={styles.doneButton}
              onClick={() => {
                handleConfirmRSVP(meetup?.id);
              }}
            >
              Confirm RSVP
            </button>
          )}
        </div>
      </div>
    </MuModal>
  );
};

export default EventDetailsModal;
