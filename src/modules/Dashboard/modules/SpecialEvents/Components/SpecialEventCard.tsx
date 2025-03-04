import type React from "react";
import { useEffect, useState } from "react";
import styles from "./SpecialEventCard.module.css";
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

const SpecialEventCard: React.FC<{ specialevent: SpecialEvent }> = ({ specialevent }) => {
    const [processedEvent, setProcessedEvent] = useState(specialevent);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        const currentDate = new Date();
        const eventDate = specialevent.date ? new Date(specialevent.date) : null;
        let isRecurring = false;
    
        // Process recurrence: Modify eventDate if applicable
        if (specialevent.recurrence && eventDate) {
            while (eventDate < currentDate) {
                if (specialevent.recurrence.toLowerCase() === "monthly") {
                    eventDate.setMonth(eventDate.getMonth() + 1);
                } else if (specialevent.recurrence.toLowerCase() === "weekly") {
                    eventDate.setDate(eventDate.getDate() + 7);
                }
                
                isRecurring = true;
            }
        }
    
        const updatedEvent = {
            ...specialevent,
            date: eventDate?.toDateString() || "TBA", 
            isExpired: !isRecurring && eventDate && eventDate < currentDate,
            isComingSoon: !isRecurring && eventDate && eventDate > currentDate,
            isRecurring
        };
    
        setProcessedEvent(updatedEvent);
    }, [specialevent]);
    

    if (!processedEvent) return null;

    return (
        <div 
            className={styles.card}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <img
                src={specialevent.image || "/placeholder.svg"}
                alt={specialevent.title}
                className={styles.image}
            />
            <div className={styles.content}>
                <h2 className={styles.title}>
                    {specialevent.title}{" "}
                    {processedEvent.isExpired && <span className={styles.expiredTag}>Expired</span>}
                    {processedEvent.isComingSoon && !processedEvent.recurrence && (
                        <span className={styles.comingSoonTag}>Coming Soon</span>
                    )}
                    {processedEvent.recurrence && (
                        <span className={styles.recurringTag}>{specialevent.recurrence}</span>
                    )}
                </h2>
                <div className={styles.eventStats}>

                <div className={styles.participantsContainer}>
                    <AvatarGroup>
                        <Avatar size="xs" name="Sage" src="https://bit.ly/dan-abramov" />
                        <Avatar size="xs" name="Sage" src="https://bit.ly/sage-adebayo" />
                        <Avatar size="xs" name="Sage" src="https://bit.ly/dan-abramov" />
                        <Avatar size="xs" name="Sage" src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04" />
                    </AvatarGroup>
                    <span className={styles.participants}>
                        {processedEvent.isExpired
                            ? `${specialevent.participants}+ peers participated`
                            : `${specialevent.participants}+ participating`}
                    </span>
                </div>
                {specialevent.date && (
                    <p className={styles.date}>{processedEvent.date}</p>
                )}
                </div>

                <p className={`${styles.description} ${isHovered ? styles.fullText : ""}`}>
                    {isHovered ? specialevent.description : 
                        specialevent.description.length > 100 ? specialevent.description.slice(0, 100) + "..." : specialevent.description}
                    {!isHovered && specialevent.description.length > 100 && (
                        <span className={styles.readMore}> Read more</span>
                    )}
                </p>

                

              

                <button className={styles.cta}  onClick={() => window.open(processedEvent.link, "_blank", "noopener,noreferrer")} >
                    <span>Explore</span>
                    <svg className={styles.arrow} viewBox="0 0 24 24">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default SpecialEventCard;
