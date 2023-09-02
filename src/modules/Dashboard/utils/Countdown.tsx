import React, { useState, useEffect, Dispatch, SetStateAction } from "react";

interface CountdownProps {
    targetDateTime: Date;
    remainingTime: {
        days: number;
        hours: number;
        minutes: number;
        seconds: number;
    };
    setRemainingTime: Dispatch<
        SetStateAction<{
            days: number;
            hours: number;
            minutes: number;
            seconds: number;
        }>
    >;
}

const Countdown: React.FC<CountdownProps> = ({
    targetDateTime,
    remainingTime,
	setRemainingTime
}) => {
    useEffect(() => {
        const calculateRemainingTime = () => {
            const now = new Date().getTime();
            const targetTime = targetDateTime.getTime();
            const timeDifference = targetTime - now;

            if (timeDifference > 0) {
                const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
                const hours = Math.floor(
                    (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
                );
                const minutes = Math.floor(
                    (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
                );
                const seconds = Math.floor(
                    (timeDifference % (1000 * 60)) / 1000
                );

                setRemainingTime({
                    days,
                    hours,
                    minutes,
                    seconds
                });
            }
        };

        const intervalId = setInterval(calculateRemainingTime, 1000);

        calculateRemainingTime(); // Calculate initial time difference immediately

        return () => {
            clearInterval(intervalId);
        };
    }, [targetDateTime]);

    return (
        <div>
            <div>
                <span>{remainingTime.days}</span> days
            </div>
            <div>
                <span>{remainingTime.hours}</span> hours
            </div>
            <div>
                <span>{remainingTime.minutes}</span> minutes
            </div>
            <div>
                <span>{remainingTime.seconds}</span> seconds
            </div>
        </div>
    );
};

export default Countdown;
