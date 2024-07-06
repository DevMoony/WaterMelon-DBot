declare module "qulity" {
    import { EventEmitter } from "events";

    type Event = "set" | "delete";
    type DataModel = Function | object;

    /** An extended JavaScript Map with additional optimisations, properties and methods. */
    class Collection<key, value> extends Map<key, value> {
        constructor(
            /** Optional initial values of this {@link Collection}. */
            iterable?: any[] | object
        );

        public size: number;

        public set(key: string, value: value): Collection<key, value>;
        public delete(key: string): Collection<key, value>;
        public get(key: string): value;
        public has(key: string): boolean;
        /** Creates an ordered array of the values of this {@link Collection}. */
        public toArray(): value[];
        /** Creates an ordered array of the keys of this {@link Collection}. */
        public toKeyArray(): key[];
        /** Creates an ordered object of all the entries of this {@link Collection}. */
        public toPairObject(): object;
        /** Obtains the first value(s) from this {@link Collection}. Starting from the end if a negative amount is provided. */
        public first(amount?: number): value | Collection<key, value>;
        /** Obtains the last value(s) from this {@link Collection}. Starting from the beginning if a negative amount is provided. */
        public last(amount?: number): value | Collection<key, value>;
        public find(
            /** Function used to test iterating elements with. */
            fn: Function
        ): value | any;
        public filter(
            /** Function used to test the iterating elements with. */
            fn: Function
        ): Collection<key, value>;
        /** Removes entries that satisfy the provided filter function. */
        public sweep(
            /** Function used to test the iterating elements with. */
            fn: Function
        ): number;
        /** Partitions the {@link Collection} into two (when returning boolean values) or more {@link Collection}s. If a boolean was given, the first {@link Collection} contains the items that passed the test. */
        public partition(fn: Function, length?: number): unknown[];
        /** Applies a function to produce a single value. */
        public reduce(
            /** Function used to reduce, taking three arguments: 'accumulator', 'current value' and 'key'. */
            fn: Function,
            /** A starting value for the accumulator. */
            initial?: any
        ): value | any;
        public map(
            /** Function that produces an element of the new array. */
            fn: Function
        ): any[];
        public exists(fn: Function): boolean;
        public every(
            /** Function used to test iterating elements with. */
            fn: Function
        ): boolean;
        /** Provides an identical, deep copy of this {@link Collection}. */
        public clone(): Collection<key, value>;
        /** Merges this {@link Collection} with other instances into a new {@link Collection}. None of the source {@link Collection}s will be modified. */
        public merge(
            /** {@link Collection}s to merge into one instance. */
            ...collections: Collection<key, value>[]
        ): Collection<key, value>;
        /** Shallowly merges the given {@link Collection}s into this instance. */
        public implement(
            /** {@link Collection}s to merge into one instance. */
            ...collections: Collection<key, value>[]
        ): Collection<key, value>;
        /** Returns a new {@link Collection} containing items where the keys are present in both original structures. */
        public intersect(
            /** A {@link Collection} to filter against this instance. */
            secondary: Collection<key, value>
        ): Collection<key, value>;
        /** Returns a new {@link Collection} containing items where the key is present in one of the original structures, but not the other. */
        public difference(
            /** A {@link Collection} to filter against this instance. */
            secondary: Collection<key, value>
        ): Collection<key, value>;
        /** Passes this {@link Collection} into a function and returns the {@link Collection} itself. */
        public tap(
            /** Function used to execute on the {@link Collection}. */
            fn: Function
        ): Collection<key, value>;
        /** Synchronously iterates through this {@link Collection}'s item and returns itself. */
        public each(
            /** Function to execute on each element. */
            fn: Function
        ): Collection<key, value>;
        /** Sorts all the items in this {@link Collection} and returns itself. */
        public sort(
            /** Function that determines the sort order. */
            fn: Function
        ): Collection<key, value>;
    }

    /** Base class that manages additional utility functions and other features. */
    class Cache<key, value> extends Collection<key, value> {
        constructor(
            /** Optional initial values of this {@link Collection}. */
            iterable?: any[] | object
        );

        /** Ensures an entry being in this {@link Cache} map. */
        public default(
            /** Specifies the address for the value. */
            key: string,
            /** A value to be conditionally inserted. */
            value: value
        ): boolean;
    }

    /** Extended class that implements an events driver. */
    class ActiveCache<key, value> extends Cache<key, value> {
        constructor(
            /** Optional initial values of this {@link Collection}. */
            iterable?: any[] | object
        );

        public on(
            /** An event to handle. */
            event: Event,
            /** A handler for this registered event. */
            handler: Function
        ): ActiveCache<key, value>;
    }

    /** Manages the API methods of data models and holds its cache. */
    class Manager<key, value> implements Collection<key, value> {
        constructor(
            /** Optional initial values of this {@link Collection}. */
            iterable?: any[] | object,
            /** An optional data structure belonging to this {@link Manager}. */
            holds?: Function
        );

        /** Cached dataset entries of this {@link Manager}. */
        public readonly cache: Collection<key, value>;
        /** A structure belonging to this {@link Manager}. */
        public readonly holds: Function | null;

        /** Inserts an instance into this {@link Manager}'s cache. */
        public add(
            /** Identifier string for the address of this model. */
            id: string,
            /** A data model to add to this {@link Manager} */
            model: Function | any
        ): Manager<key, value>;
        /** Removes an instance from this {@link Manager}'s cache. */
        public remove(
            /** Identifier string of the instance */
            id: string
        ): Manager<key, value>;
        /** Resolves an instance of this {@link Manager}. */
        public resolve(
            /** Identifier to resolve from this {@link Manager}. */
            idOrInstance: string | Function | any
        ): Function | any;
    }

    /** Base class that manages the creation, retrieval and deletion of a specific data model. */
    class DataStore<key, value> extends Collection<key, value> {
        constructor(
            /** Optional initial values of this {@link Collection}. */
            iterable?: any[] | object
        );

        public set(
            key: string,
            model: Function | object | DataModel | value
        ): DataStore<key, value>;
        public resolve(key: string): DataModel | value;
    }

    export { Collection, Cache, ActiveCache, Manager, DataStore };
}
