import moment from "npm:moment";

/**
 * Formats a given time in milliseconds into a human-readable string.
 *
 * @param ms - The time in milliseconds to be formatted.
 * @returns A human-readable string representation of the time. */
export const CurrentFormattedTime = (ms: number | string | Date): string => {
    const timestamp = (ms instanceof Date) ? Date.now() : Number(ms);

    return moment(timestamp).format("Do [of] MMMM YYYY [@] h:mm:ss A");
};

export const Dayify = (day: number | string | Date) => {
    const timestamp = (day instanceof Date) ? Date.now() : Number(day);
    let dayStr = "";
    
    for (let i = 0; i < 32; i++) {
        if ([1, 21, 31].includes(timestamp)) {
            dayStr = `${timestamp}st`;
            break;
        }

        dayStr = `${timestamp}th`;
    }

    return dayStr;
};