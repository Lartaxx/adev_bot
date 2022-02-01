# Collection

This module is an utility for managing data in the form of Map.

## Getting Started

Prerequisites :

Node.js 12.0.0 or newer is required.

### Instalation

With npm :

```sh-session
npm install collection-data
```

With yarn :

```sh-session
yarn add collection-data
```

## Usage

Import the module from node_modules :

With CommonJS syntax :

```js
const { Collection } = require("collection-data");
```

With module syntax :

```js
import { Collection } = from 'collection-data';
```

Create a new Collection with optional data has a parameter.

Parameters :

- data : Array of data to be added to the collection.
  - type : Array\<Array\<any, data>>
  - optional : Yes

```js
const collection = new Collection([
  ["key1", value1],
  ["key2", value2],
  ["key3", value3],
]);
```

## Collection#get(key)

Get a value from the collection by name of key.

Parameters :

- key : The name of the key to get value from the collection (any).

Returns :

The value of the key in the collection (type : `any` | `undefined`).

```js
collection.get("key1");
```

## Collection#set(key, value)

Set a value in the collection.

Parameters :

- key : The name of the key to add (any).
- value : The value to set (any).

Returns :

The Collection (type : `Collection`).

```js
collection.set("key2", value2);
```

## Collection#has(key)

Check if a key exists in the collection.

Parameters :

- key : The key to check (any).

Returns :

True if the key exists in the collection (type : `boolean`).

```js
collection.has("key1"); // true
```

## Collection#hasAllKeys(keys)

Check if all keys exists in the collection.

Parameters :

- keys : The name of the keys to check (Array\<any>).

Returns :

True if the keys exists in the collection (type : `boolean`).

```js
collection.hasAllKeys(["key1", "key2"]);
```

## Collection#hasAnyKey(key)

Check if at least one key exists in the collection.

Parameters :

- keys : The name of the keys to check (Array\<any>).

Returns :

True if one key exists in the collection (type : `boolean`).

```js
collection.hasAnyKey(["key1", "key2"]);
```

## Collection#delete(key)

Delete a value from the collection by name of key.

Parameters :

- key : The name of the key to delete from the collection (any).

Returns :

True if the key was deleted (type : `boolean`).

```js
collection.delete("key1");
```

## Collection#clear()

Clear all values from the collection.

Parameters :

None

Returns :

Void (type : `void`).

```js
collection.clear();
```

## Collection#updateIf(data, filter)

Update value from the collection if the filter returns true for at least one item of collection.

Parameters :

- data : Object with a key and value keys (key of item and newValue).
- filter : Function with in parameters key and value.

Returns :

The collection if it was updated and null otherwise (type : `Collection`| `null`).

```js
const filter = (k, v) => k === "key1";
collection.updateIf({ key: "key1", value: newValue }, filter);
```

## Collection#deleteIf(key, filter)

Delete value from the collection if the filter returns true for at least one item of collection.

Parameters :

- key : Object with a key and value keys (key of item and newValue) (any).
- filter : Function with in parameters key and value (Function).

Returns :

The collection if data was deleted and null otherwise (type : `Collection`| `null`).

```js
const filter = (k, v) => k === "key1";
collection.deleteIf("key1", filter);
```

## Collection#isUnique(key)

Check if in the collection an othen element have the value of item of key.

Parameters :

- key : The name of the key to check (any).

Returns :

True if value of this item is unique in the collection (type : `boolean`).

```js
collection.isUnique("key1");
```

## Collection#firstKey()

Get the key of first element of the collection.

Parameters :

None

Returns :

The key of the first element in the collection (type : `any` | `null`).

```js
collection.firstKey();
```

## Collection#first()

Get the first element of the collection.

Parameters :

None

Returns :

The value of the first element in the collection (type : `any` | `null`).

```js
collection.first();
```

## Collection#lastKey()

Get the key of last element of the collection.

Parameters :

None

Returns :

The key of the last element in the collection (type : `any` | `null`).

```js
collection.lastKey();
```

## Collection#last()

Get the last element of the collection.

Parameters :

None

Returns :

The value of the last element in the collection (type : `any` | `null`).

```js
collection.last();
```

## Collection#randomKey()

Get a random key from the collection.

Parameters :

None

Returns :

The random key of the collection (type : `any` | `null`).

```js
collection.randomKey();
```

## Collection#random()

Get a random value from the collection.

Parameters :

None

Returns :

The random value of the collection (type : `any` | `null`).

```js
collection.random();
```

## Collection#find(function)

Search value in collection.

Parameters :

- function : The function to search with value and key as a parameter.

Returns :

The value found (type : `any` | `null`).

```js
collection.find((v) => v.property == value);
```

## Collection#isEmpty()

Check if the collection is empty.

Parameters :

None

Returns :

True if the collection is empty (type : `boolean`).

```js
collection.isEmpty();
```

## Collection#copy()

Get a copie of the collection.

Parameters :

None

Returns :

The collection copied (type : `Collection`).

```js
collection.copy();
```

## Collection#filter(function)

Return the values where the function returns true in the collection.

Parameters :

- function : Function with in parameters the value and the key.

Returns :

A collection with the items filtered (type : `Collection`).

```js
collection.filter((v, k) => {
  return v.property === other;
});
```

## Collection#keysList()

Get a list of keys in the collection.

Parameters :

None

Returns :

An arrays of keys of the collection (type : `Array<K>` | `null`).

```js
collection.keysList();
```

## Collection#valuesList()

Get a list of values in the collection.

Parameters :

None

Returns :

An arrays of values of the collection (type : `Array<V>` | `null`).

```js
collection.valuesList();
```

## Collection#merge(other)

Merge an other collection or Map with this collection.

Parameters :

- other : A collection or a Map

Returns :

The new collection merged (type : `Collection`).

```js
collection.merge(other);
```

## Collection#concat(other)

Concat map or collection to this collection.

Parameters :

- other : A collection or a Map

None

Returns :

The collection (type : `Collection`)

```js
collection.concat(other);
```

## Collection#toArray()

Convert the collection to an array.

Parameters :

None

Returns :

An arrays of the collection (type : `Array<{key:string, value:any}>` | `null`).

```js
collection.toArray();
```

## Collection#toJSON()

Convert the collection to json.

Parameters :

None

Returns :

The collection as json (type : `Object`).

```js
collection.toJSON();
```

## Collection#each(function)

Convert the collection to json.

Parameters :

- function : Function to execute for each element (Function).

Returns :

The collection (type : `Collection`).

```js
collection.each((v) => console.log(v));
```
