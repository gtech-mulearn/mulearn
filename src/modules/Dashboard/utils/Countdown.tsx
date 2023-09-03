import React, { useState, useEffect, Dispatch, SetStateAction } from "react";

interface CountdownProps {
    targetDateTime: string;
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
    const [eventOver, setEventOver] = useState(false);

    useEffect(() => {
        const calculateRemainingTime = () => {
            const now = new Date().getTime();
            const targetTime = new Date(targetDateTime).getTime();
            const timeDifference = targetTime - now;

            if (timeDifference <= 0) {
                // Event is over
                setEventOver(true);
                setRemainingTime({
                    days: 0,
                    hours: 0,
                    minutes: 0,
                    seconds: 0
                });
            } else {
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
        <div
            style={{
                display: "flex",
                justifyContent: "start",
                alignItems: "center"
            }}
        >
            {eventOver ? (
                <div>Event Over</div>
            ) : (
                <>
                    <div>{remainingTime.days} D&nbsp;</div>
                    <div>&nbsp;{remainingTime.hours} H&nbsp;</div>
                    <div>&nbsp;{remainingTime.minutes} M&nbsp;</div>
                    <div>&nbsp;{remainingTime.seconds} S&nbsp;</div>
                </>
            )}
        </div>
    );
};

export default Countdown;