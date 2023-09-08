import { ReactElement, useState } from "react";

export function useHackathonForm(steps: ReactElement[]) {
    const [stepIndex, setStepIndex] = useState(0);

    const nextStep = () => {
        if (stepIndex < steps.length - 1) {
            setStepIndex(prev => prev + 1);
        }
    };

    const prevStep = () => {
        if (stepIndex > 0) {
            setStepIndex(prev => prev - 1);
        }
    };

    const gotoStep = (step: number) => {
        setStepIndex(step);
    };

    return {
        stepIndex,
        step: steps[stepIndex],
        nextStep,
        prevStep,
        gotoStep,
        isFirstStep: stepIndex === 0,
        isLastStep: stepIndex === steps.length - 1
    };
}
