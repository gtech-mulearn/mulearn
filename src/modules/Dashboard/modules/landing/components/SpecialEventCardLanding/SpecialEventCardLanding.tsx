import type React from "react";
import { useState } from "react";
import styles from "./SpecialEventCardLanding.module.css";
import { Avatar, AvatarGroup } from "@chakra-ui/react";

interface SpecialEvent {
    id: number;
    title: string;
    description: string;
    date?: string;
    recurrence?: string;
    participants?: number;
    image: string;
    link: string;
    isLive: boolean;
    isExpired?: boolean | null;
    isComingSoon?: boolean | null;
}

const SpecialEventCardLanding: React.FC<{ specialevent: SpecialEvent }> = ({ specialevent }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <>
            {/* Card */}
            <div className={styles.card}>
                <img
                    src={specialevent.image || "/placeholder.svg"}
                    alt={specialevent.title}
                    className={styles.image}
                />
                <div className={styles.content}>
                    <button className={styles.readMoreButton} onClick={openModal}>
                        Read More
                    </button>
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modalContent}>
                        <button className={styles.closeButton} onClick={closeModal}>
                            &times;
                        </button>
                        <h2>{specialevent.title}</h2>
                        <img
                            src={specialevent.image || "/placeholder.svg"}
                            alt={specialevent.title}
                            className={styles.modalImage}
                        />
                        <p>{specialevent.description}</p>
                        {specialevent.date && <p>Date: {specialevent.date}</p>}
                        {specialevent.recurrence && <p>Recurrence: {specialevent.recurrence}</p>}
                        <p>Participants: {specialevent.participants}+</p>
                        <a href={specialevent.link} target="_blank" rel="noopener noreferrer">
                            Explore
                        </a>
                    </div>
                </div>
            )}
        </>
    );
};

export default SpecialEventCardLanding;