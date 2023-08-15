const addDaysToDate = (daysToAdd: number, timeArray: number[]) => {
    if (daysToAdd > 7) throw new Error("daysToAdd must be less than 7");

    const currentDate = new Date();

    if (timeArray) {
        currentDate.setHours(timeArray[0]);
        currentDate.setMinutes(timeArray[1]);
        currentDate.setSeconds(0);
    }

    if (daysToAdd === 0) return currentDate;

    currentDate.setDate(currentDate.getDate() + daysToAdd);
    return currentDate;
};

export const getNextDate = (dayArray: number[], time: string) => {
    if (dayArray?.length === 0 || time?.trim().length === 0)
        throw new Error("Day and Time must not be empty");

    const array = dayArray.sort();
    const now = new Date();
    now.setMinutes(now.getMinutes() - 30); // gives 30 mins cooldown after event starts

    const eventTimeArray = time?.split(":").map(x => parseInt(x));

    if (eventTimeArray?.length < 2) throw new Error("Time is wrong fromated");

    for (let i = 0; i < array.length; i++) {
        const day = array[i];
        let diff = day - now.getDay();

        if (diff > 0) return addDaysToDate(diff, eventTimeArray);
        else if (diff === 0) {
            // same day so...
            // check for time differences
            const nowTimeArray = [now.getHours(), now.getMinutes()];

            if (
                eventTimeArray &&
                nowTimeArray &&
                eventTimeArray[0] > nowTimeArray[0]
            )
                return addDaysToDate(0, eventTimeArray);
            else if (
                eventTimeArray &&
                nowTimeArray &&
                eventTimeArray[0] === nowTimeArray[0] &&
                eventTimeArray[1] > nowTimeArray[1]
            ) {
                return addDaysToDate(0, eventTimeArray);
            }
        }
    }

    return addDaysToDate(7 - now.getDay() + array[0], eventTimeArray);
};

export const AllWeeks = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
] as const;
export const monthNames = [
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
] as const;

export const convert24to12 = (time24: string): string => {
    const [hourStr, minuteStr] = time24.split(":");
    const hour = parseInt(hourStr, 10);
    const minute = parseInt(minuteStr, 10);

    if (hour < 0 || hour > 23 || minute < 0 || minute > 59) {
        throw new Error(
            "Invalid input: hour should be between 0 and 23, and minute between 0 and 59."
        );
    }

    const period = hour >= 12 ? "PM" : "AM";
    const twelveHour = hour % 12 === 0 ? 12 : hour % 12;

    const formattedTime = `${twelveHour}:${minute
        .toString()
        .padStart(2, "0")} ${period}`;
    return formattedTime;
};
