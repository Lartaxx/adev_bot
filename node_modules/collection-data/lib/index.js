"use strict";
/**
 * This module is an utility for managing data in the form of Map.
 * github.com/Smaug6739/collection
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Collection = void 0;
class Collection extends Map {
    constructor(data) {
        super(data);
    }
    get(key) {
        return super.get(key);
    }
    set(key, value) {
        return super.set(key, value);
    }
    has(key) {
        return super.has(key);
    }
    hasAllKeys(keys) {
        return keys.every(k => this.has(k));
    }
    hasAnyKey(keys) {
        return keys.some((k) => this.has(k));
    }
    delete(key) {
        return super.delete(key);
    }
    clear() {
        return super.clear();
    }
    updateIf(data, filter) {
        if (!data.key || !data.value)
            throw new TypeError('[MISSING_PARAMETER] The data parameter must be specified with key and value property.');
        if (!filter)
            throw new TypeError('[MISSING_PARAMETER] The filter parameter must be specified.');
        for (const [k, v] of this) {
            if (filter(k, v)) {
                return this.set(data.key, data.value);
            }
        }
        return null;
    }
    deleteIf(key, filter) {
        if (!key)
            throw new TypeError('[MISSING_PARAMETER] The key parameter must be specified with key and value property.');
        if (!filter)
            throw new TypeError('[MISSING_PARAMETER] The filter parameter must be specified.');
        for (const [k, v] of this) {
            if (filter(k, v)) {
                if (this.delete(key))
                    return this;
            }
        }
        return null;
    }
    isUnique(key) {
        const valOne = this.get(key);
        if (!valOne)
            throw new TypeError('Cannot find value for key: ' + key);
        // for (const val of this.filter()) {
        // 	if (val === valOne) return false;
        // }
        if (this.filter((v) => v === valOne).size <= 1)
            return true;
        return false;
    }
    firstKey() {
        const firstKey = this.keys().next().value;
        if (firstKey)
            return firstKey;
        return null;
    }
    first() {
        if (this.values().next().value)
            return this.values().next().value;
        return null;
    }
    lastKey() {
        const arr = [...this.keys()];
        if (arr[arr.length - 1])
            return arr[arr.length - 1];
        return null;
    }
    last() {
        const arr = [...this.values()];
        if (arr[arr.length - 1])
            return arr[arr.length - 1];
        return null;
    }
    randomKey() {
        const keys = [...this.keys()];
        if (!keys.length)
            return null;
        const random = Math.floor(Math.random() * keys.length);
        const key = keys[random];
        return key;
    }
    random() {
        const keys = [...this.keys()];
        if (!keys.length)
            return null;
        const random = Math.floor(Math.random() * keys.length);
        const key = keys[random];
        return this.get(key) || null;
    }
    find(fn, thisArg) {
        if (typeof thisArg !== 'undefined')
            fn = fn.bind(thisArg);
        for (const [key, val] of this) {
            if (fn(val, key, this))
                return val;
        }
        return null;
    }
    isEmpty() {
        const first = this.first();
        if (!first)
            return true;
        return false;
    }
    copy() {
        return new this.constructor[Symbol.species](this);
    }
    filter(f) {
        const newCollection = new this.constructor[Symbol.species]();
        for (const [k, v] of this) {
            if (f(v, k))
                newCollection.set(k, v);
        }
        return newCollection;
    }
    keysList() {
        const list = [];
        for (const k of this.keys()) {
            list.push(k);
        }
        if (list)
            return list;
        return null;
    }
    valuesList() {
        const list = [];
        for (const v of this.values()) {
            list.push(v);
        }
        if (list)
            return list;
        return null;
    }
    merge(...maps) {
        for (const map of maps) {
            for (const [k, v] of map) {
                this.set(k, v);
            }
        }
        return this;
    }
    concat(...maps) {
        const newCollection = this.copy();
        for (const map of maps) {
            for (const [k, v] of map) {
                newCollection.set(k, v);
            }
        }
        return newCollection;
    }
    toArray() {
        const that = this;
        if (that == null)
            return that;
        const newArray = [];
        for (const [k, v] of that) {
            newArray.push({
                key: k,
                value: v
            });
        }
        return newArray;
    }
    toJSON() {
        const obj = Object.fromEntries(this);
        return obj;
    }
    each(fn, thisArg) {
        this.forEach(fn, thisArg);
        return this;
    }
}
exports.Collection = Collection;
Collection.default = Collection;
