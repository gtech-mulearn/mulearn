import React, { useEffect } from "react";
import { Step } from "react-joyride";
import { useJoyride } from "./JoyrideProvider";

// Tour types
export type TourType = "dashboard" | "learningCircle";

interface TourGuideProps {
    onboardingComplete?: boolean;
}

const TourGuide: React.FC<TourGuideProps> = ({
    onboardingComplete = false
}) => {
    const { addSteps, startTour } = useJoyride();

    useEffect(() => {
        // Define dashboard tour steps
        const dashboardTourSteps: Step[] = [
            {
                target: "#top_nav",
                content:
                    "This is the top navigation bar. It contains your profile info and important navigation controls.",
                disableBeacon: true,
                placement: "bottom",
                spotlightClicks: true
            },
            {
                target: 'div[data-tour="mode-selector"]', // We'll add this data attribute to the mode selector
                content:
                    "Switch between different modes based on your interests and skills.",
                disableBeacon: true,
                spotlightClicks: true
            },
            {
                target: 'div[data-tour="progress-bar"]', // We'll add this data attribute to the progress bar
                content:
                    "This is your progress bar. It shows your current level and achievements.",
                disableBeacon: true,
                spotlightClicks: true
            },
            {
                target: 'div[data-tour="dashboard-welcome"]', // We'll add this data attribute to the welcome section
                content:
                    "Welcome to your dashboard! This is your personalized home where you can track your progress and access learning resources.",
                disableBeacon: true,
                spotlightClicks: true
            },
            {
                target: 'button[data-tour="start-learning"]', // We'll add this data attribute to the start learning button
                content:
                    "Click here to start your learning journey with µLearn.",
                disableBeacon: true,
                spotlightClicks: true
            }
        ];

        // Define learning circle tour steps
        const learningCircleTourSteps: Step[] = [
            {
                target: 'div[data-tour="learning-circle-header"]',
                content:
                    "Welcome to Learning Circles! Here you can find and join peer learning groups.",
                disableBeacon: true,
                spotlightClicks: true
            },
            {
                target: 'div[data-tour="learning-circle-list"]',
                content:
                    "This is the list of available learning circles. Join one that matches your interests!",
                disableBeacon: true,
                spotlightClicks: true
            },
            {
                target: 'button[data-tour="create-circle-button"]',
                content:
                    "You can also create your own learning circle to lead a group of peers.",
                disableBeacon: true,
                spotlightClicks: true
            }
        ];

        // Add the tours to the provider
        addSteps("dashboard", dashboardTourSteps);
        addSteps("learningCircle", learningCircleTourSteps);

        // Start the tour automatically for first-time users
        if (!onboardingComplete) {
            // We can disable this in production or make it conditional based on user preferences
            // startTour('dashboard');
        }
    }, [addSteps, onboardingComplete, startTour]);

    return null; // This component doesn't render anything
};

export default TourGuide;
