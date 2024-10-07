// deno-lint-ignore no-explicit-any
export type KeyOfType<T> = T extends any ? keyof T : never;

/** The time state of the timer. */
export interface ITime {
    /** The status of the timer. */
	state: "Completed" | "In Progress";
    /** The change which happened to the timer. */
	changed: "lowered" | "none" | "raised";
    /** The current time of the timer. */
	current_time: number;
}