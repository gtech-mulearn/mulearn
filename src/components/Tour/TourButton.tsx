import React from "react";
import { useJoyride } from "./JoyrideProvider";
import { TourType } from "./TourGuide";

interface TourButtonProps {
    tourType: TourType;
    className?: string;
    buttonText?: string;
}

const TourButton: React.FC<TourButtonProps> = ({
    tourType,
    className = "",
    buttonText = "Start Tour"
}) => {
    const { startTour, isRunning, stopTour } = useJoyride();

    const handleClick = () => {
        if (isRunning) {
            stopTour();
        } else {
            startTour(tourType);
        }
    };

    return (
        <button
            onClick={handleClick}
            className={`tour-button ${className}`}
            style={{
                backgroundColor: "#2563EB",
                color: "#fff",
                border: "none",
                padding: "8px 16px",
                borderRadius: "4px",
                cursor: "pointer",
                fontWeight: "bold",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
            }}
        >
            <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M8 1.33334C4.32 1.33334 1.33333 4.32001 1.33333 8.00001C1.33333 11.68 4.32 14.6667 8 14.6667C11.68 14.6667 14.6667 11.68 14.6667 8.00001C14.6667 4.32001 11.68 1.33334 8 1.33334ZM8 13.3333C5.06 13.3333 2.66667 10.94 2.66667 8.00001C2.66667 5.06001 5.06 2.66667 8 2.66667C10.94 2.66667 13.3333 5.06001 13.3333 8.00001C13.3333 10.94 10.94 13.3333 8 13.3333Z"
                    fill="currentColor"
                />
                <path
                    d="M8.00004 6.00001C8.36671 6.00001 8.66671 5.70001 8.66671 5.33334C8.66671 4.96667 8.36671 4.66667 8.00004 4.66667C7.63337 4.66667 7.33337 4.96667 7.33337 5.33334C7.33337 5.70001 7.63337 6.00001 8.00004 6.00001Z"
                    fill="currentColor"
                />
                <path
                    d="M8 7.33334C7.63333 7.33334 7.33333 7.63334 7.33333 8.00001V10.6667C7.33333 11.0333 7.63333 11.3333 8 11.3333C8.36667 11.3333 8.66667 11.0333 8.66667 10.6667V8.00001C8.66667 7.63334 8.36667 7.33334 8 7.33334Z"
                    fill="currentColor"
                />
            </svg>
            {isRunning ? "Stop Tour" : buttonText}
        </button>
    );
};

export default TourButton;
