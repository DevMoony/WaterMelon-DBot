import { Message, User, GuildMember, ThreadMember } from "discord.js";

export interface IEmbedTypes {
    Success: { icon: string; color: number };

    Cancel: { icon: string; color: number };
    Pushing: { icon: string; color: number };
    Blocked: { icon: string; color: number };
    Failed: { icon: string; color: number };

    LowLatency: { icon: string; color: number };
    NormalLatency: { icon: string; color: number };
    HighLatency: { icon: string; color: number };

    LowRisk: { icon: string; color: number };
    MediumRisk: { icon: string; color: number };
    HighRisk: { icon: string; color: number };

    ToggleOff: { icon: string; color: number };
    ToggleOn: { icon: string; color: number };

    Settings: { icon: string; color: number };
    Guilds: { icon: string; color: number };
    Bugs: { icon: string; color: number };
}

export interface IPaginator<T> {
    /** Returns the current page including the items provided from the array. */
    current: T[];
    /** Return the amount of pages. */
    amount: number;
    /**
     * Displays the current page to the end page,examples:
     * - 1/5
     * - 7/20 */
    display: string;
}

export type EmbedTypes =
    | "Success"
    | "Cancel"
    | "Pushing"
    | "Blocked"
    | "Failed"
    | "LowLatency"
    | "NormalLatency"
    | "HighLatency"
    | "LowRisk"
    | "MediumRisk"
    | "HighRisk"
    | "ToggleOff"
    | "ToggleOn"
    | "Settings"
    | "Guilds"
    | "Bugs";

type KeyofType<T> = keyof T;

/** A type used to Omit a property from a provided type but searches it strict instead of loose, which might error on normal Omit<T, K> */
export type StrictOmit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>> &
    Omit<T, K>;

/** This type is used to find `P` in `T` and return it as a type. */
export type FindProperty<T, P extends KeyofType<T>> = T[P] extends undefined
    ? unknown
    : T[P];

/** A type used to Extract a property from a provided type but searches it strict instead of loose, which might error on normal Extract<T, K> */
export type StrictExtract<T, K extends KeyofType<T>> = Extract<
    T,
    FindProperty<T, K>
>;

/** A type which creates a new object and omits the types that aren't defined */
export type PartialPick<T, K extends KeyofType<T>> = T[K] extends undefined
    ? never
    : Pick<T, K>;

export type UserResolvable =
    | string
    | Message
    | User
    | GuildMember
    | ThreadMember;

export interface UpdateCommandOptions {
    guildId?: string;
    clear?: boolean;
}