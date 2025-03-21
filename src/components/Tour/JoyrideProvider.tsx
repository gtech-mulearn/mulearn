import React, {
    createContext,
    useContext,
    useState,
    useCallback,
    ReactNode
} from "react";
import Joyride, { CallBackProps, Step, STATUS } from "react-joyride";

interface JoyrideContextProps {
    startTour: (tourName: string) => void;
    steps: Record<string, Step[]>;
    setSteps: React.Dispatch<React.SetStateAction<Record<string, Step[]>>>;
    addSteps: (tourName: string, stepsToAdd: Step[]) => void;
    isRunning: boolean;
    stopTour: () => void;
}

const JoyrideContext = createContext<JoyrideContextProps | undefined>(
    undefined
);

interface JoyrideProviderProps {
    children: ReactNode;
}

export const JoyrideProvider: React.FC<JoyrideProviderProps> = ({
    children
}) => {
    const [steps, setSteps] = useState<Record<string, Step[]>>({});
    const [stepIndex, setStepIndex] = useState(0);
    const [run, setRun] = useState(false);
    const [currentTour, setCurrentTour] = useState<string>("");

    const addSteps = useCallback((tourName: string, stepsToAdd: Step[]) => {
        setSteps(prevSteps => ({
            ...prevSteps,
            [tourName]: stepsToAdd
        }));
    }, []);

    const startTour = useCallback(
        (tourName: string) => {
            if (steps[tourName] && steps[tourName].length > 0) {
                setCurrentTour(tourName);
                setStepIndex(0);
                setRun(true);
            } else {
                console.warn(`Tour "${tourName}" not found or has no steps.`);
            }
        },
        [steps]
    );

    const stopTour = useCallback(() => {
        setRun(false);
        setStepIndex(0);
    }, []);

    const handleJoyrideCallback = useCallback(
        (data: CallBackProps) => {
            const { action, index, status, type } = data;

            if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
                // Tour is complete or skipped
                setRun(false);
                setStepIndex(0);
            } else if (type === "step:after") {
                // Move to the next step
                if (action === "next") {
                    setStepIndex(index + 1);
                } else if (action === "prev") {
                    // Move to the previous step
                    setStepIndex(Math.max(0, index - 1));
                }
            } else if (type === "error:target_not_found") {
                // Handle case where target element is not found
                console.warn(`Tour target not found at step ${index}`);

                // Skip to the next step if possible
                const maxIndex = (steps[currentTour]?.length || 1) - 1;
                if (index < maxIndex) {
                    setStepIndex(index + 1);
                } else {
                    // End tour if we're at the last step
                    setRun(false);
                    setStepIndex(0);
                }
            }
        },
        [currentTour, steps]
    );

    const value = {
        startTour,
        steps,
        setSteps,
        addSteps,
        isRunning: run,
        stopTour
    };

    return (
        <JoyrideContext.Provider value={value}>
            {children}
            <Joyride
                callback={handleJoyrideCallback}
                continuous
                hideCloseButton={false}
                run={run}
                scrollToFirstStep
                showProgress
                showSkipButton
                stepIndex={stepIndex}
                steps={currentTour ? steps[currentTour] : []}
                styles={{
                    options: {
                        zIndex: 10000,
                        arrowColor: "#fff",
                        backgroundColor: "#fff",
                        overlayColor: "rgba(0, 0, 0, 0.5)",
                        primaryColor: "#2563EB",
                        textColor: "#333"
                    },
                    spotlight: {
                        borderRadius: 4,
                        backgroundColor: "transparent"
                    }
                }}
                disableOverlayClose
                spotlightClicks
                floaterProps={{
                    disableAnimation: false,
                    styles: {
                        floater: {
                            filter: "drop-shadow(0 2px 8px rgba(0, 0, 0, 0.15))"
                        }
                    }
                }}
            />
        </JoyrideContext.Provider>
    );
};

export const useJoyride = (): JoyrideContextProps => {
    const context = useContext(JoyrideContext);
    if (context === undefined) {
        throw new Error("useJoyride must be used within a JoyrideProvider");
    }
    return context;
};
