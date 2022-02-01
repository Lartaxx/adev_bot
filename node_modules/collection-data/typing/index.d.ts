/**
 * This module is an utility for managing data in the form of Map.
 * github.com/Smaug6739/collection
 */
import type { IMap, IArray } from './typescript/interfaces';
export interface CollectionConstructor {
    new (): Collection<unknown, unknown>;
    new <K, V>(entries?: ReadonlyArray<readonly [K, V]> | null): Collection<K, V>;
    new <K, V>(iterable: Iterable<readonly [K, V]>): Collection<K, V>;
    readonly prototype: Collection<unknown, unknown>;
    readonly [Symbol.species]: CollectionConstructor;
}
declare class Collection<K, V> extends Map<K, V> {
    static readonly default: typeof Collection;
    ['constructor']: CollectionConstructor;
    constructor(data?: any);
    get(key: K): V | undefined;
    set(key: K, value: V): this;
    has(key: K): boolean;
    hasAllKeys(keys: K[]): boolean;
    hasAnyKey(keys: K[]): boolean;
    delete(key: K): boolean;
    clear(): void;
    updateIf(data: IMap, filter: Function): this | null;
    deleteIf(key: K, filter: Function): this | null;
    isUnique(key: K): boolean;
    firstKey(): K | null;
    first(): V | null;
    lastKey(): K | null;
    last(): V | null;
    randomKey(): K | null;
    random(): V | null;
    find(fn: (value: V, key: K, collection: this) => boolean, thisArg?: unknown): V | null;
    isEmpty(): boolean;
    copy(): Collection<K, V>;
    filter(f: Function): Collection<K, V>;
    keysList(): K[] | null;
    valuesList(): V[] | null;
    merge(...maps: Array<Collection<K, V> | Map<K, V>>): Collection<K, V>;
    concat(...maps: Array<Collection<K, V> | Map<K, V>>): Collection<K, V>;
    toArray(): Array<IArray> | null;
    toJSON(): any;
    each(fn: (value: V, key: K, collection: this) => void, thisArg?: unknown): this;
}
export { Collection };
