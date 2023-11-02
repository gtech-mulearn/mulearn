import { Dispatch, SetStateAction } from "react";
import styles from "../LcDashboard.module.css";

type Props = {
    setTemp: Dispatch<SetStateAction<LcDashboardTempData>>;
    temp: LcDashboardTempData;
};

const LcTeam = (props: Props) => {
    const getNextMeetingDate = (meetingDays: string, meetTime: string) => {
        // Parse the meeting days from the string and split them into an array
        const meetingDayList = meetingDays.split(",").map(Number);

        // Get the current date and time
        const currentDate = new Date();
        const currentTime = currentDate.getTime();

        // Calculate the time until the next meeting for each meeting day
        const nextMeetingTimes = meetingDayList.map(day => {
            const nextMeetingDate = new Date(currentDate);
            nextMeetingDate.setHours(Number(meetTime.split(":")[0]));
            nextMeetingDate.setMinutes(Number(meetTime.split(":")[1]));
            nextMeetingDate.setSeconds(0);
            nextMeetingDate.setMilliseconds(0);

            // Calculate the days until the next meeting
            const daysUntilMeeting = (day - currentDate.getDay() + 7) % 7;

            // Calculate the time until the next meeting in milliseconds
            const timeUntilMeeting =
                nextMeetingDate.getTime() +
                daysUntilMeeting * 24 * 60 * 60 * 1000 -
                currentTime;

            return {
                day,
                timeUntilMeeting
            };
        });

        // Find the next meeting with the shortest time until it
        const closestMeeting = nextMeetingTimes.reduce(
            (
                closest: null | { day: number; timeUntilMeeting: number },
                current
            ) => {
                if (
                    closest === null ||
                    current.timeUntilMeeting < closest.timeUntilMeeting
                ) {
                    return current;
                }
                return closest;
            },
            null
        );

        if (closestMeeting) {
            // Calculate the next meeting date
            const nextMeetingDate = new Date(
                currentDate.getTime() + closestMeeting.timeUntilMeeting
            );

            // Get the name of the day of the week
            const daysOfWeek = [
                "Sunday",
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday"
            ];
            const nextMeetingDayName = daysOfWeek[closestMeeting.day];

            // Format the date as "Day Month Year" (e.g., "22 June 2023")
            const options: Intl.DateTimeFormatOptions = {
                day: "numeric",
                month: "long",
                year: "numeric"
            };
            const formattedDate = nextMeetingDate.toLocaleDateString(
                "en-US",
                options
            );

            return {
                nextMeetingDate, // Keep it as a Date object
                nextMeetingDayName,
                formattedDate // Include the formatted date in the result
            };
        } else {
            return null; // No next meeting found
        }
    };

    const meetingData = {
        day: "0,2",
        meetTime: "13:30"
    };

    const nextMeeting = getNextMeetingDate(
        meetingData.day,
        meetingData.meetTime
    );

    return (
        <div className={styles.ContainerWrapper}>
            <div className={styles.SwitchNav}>
                <button
                    className={styles.items}
                    onClick={() =>
                        props.setTemp({
                            ...props.temp,
                            isReport: false,
                            isHistory: false,
                            isTeam: false,
                            isSchedule: false
                        })
                    }
                >
                    Meet
                </button>
                <button
                    className={styles.items + " " + styles.active}
                    onClick={() =>
                        props.setTemp({
                            ...props.temp,
                            isTeam: true
                        })
                    }
                >
                    Team
                </button>
            </div>
            <div className={styles.ContentWrapper}>
                <div className={styles.TopContainer}>
                    <div>
                        {nextMeeting ? (
                            <div>
                                Next Meeting: {nextMeeting.nextMeetingDayName},{" "}
                                {nextMeeting.formattedDate} at{" "}
                                {nextMeeting.nextMeetingDate.toLocaleTimeString()}
                            </div>
                        ) : (
                            <div>No upcoming meetings</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LcTeam;
