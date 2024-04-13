export const getNextMeetingDate = (meetingDays: number[], meetTime: string) => {
    // Parse the meeting days from the string and split them into an array
    const meetingDayList = meetingDays.join(",").split(",").map(Number);

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

        // Format the time in 12-hour format
        const formattedTime = nextMeetingDate.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true
        });

        const formattedDate =
            nextMeetingDate.getDate() +
            " " +
            getMonthName(nextMeetingDate.getMonth()) +
            " " +
            nextMeetingDate.getFullYear();

        function getMonthName(monthIndex: number) {
            const months = [
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December"
            ];
            return months[monthIndex];
        }

        return {
            nextMeetingDate, // Keep it as a Date object
            nextMeetingDayName,
            formattedDate,
            formattedTime // Include the formatted time in 12-hour format
        };
    } else {
        return null; // No next meeting found
    }
};
