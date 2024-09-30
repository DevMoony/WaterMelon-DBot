/** Gets the keys of a type as a type */
export type KeyofType<T extends any> = T extends any ? keyof T : never;

/** The time state of the timer. */
export interface ITime {
	state: "Completed" | "In Progress";
	changed: "lowered" | "none" | "raised";
	current_time: number;
}