const { Collection } = require('../lib')

const collection = new Collection([
	["key1", 'value1'],
	["key2", 'value2'],
	["key3", 'value2'],
]);


console.log(collection.clear());

// console.log(collection.get("key1"))
// console.log(collection.set("key4", 'value4'))
// console.log(collection.has("key1"))
// console.log(collection.hasAllKeys(["key1", "key2", "key3"]))
// console.log(collection.hasAnyKey(["key1", 'key2']))
// console.log(collection.delete("key1"))
// const filter1 = (k, v) => k === "key2";
// console.log(collection.updateIf({ key: "key1", value: 'newValue update if' }, filter1))
// const filter2 = (k, v) => k === "key3";
// console.log(collection.deleteIf("key3", filter2))
// console.log(collection.isUnique("key1"))
// console.log(collection.first())
// console.log(collection.firstKey())
// console.log(collection.last())
// console.log(collection.lastKey())
// console.log(collection.randomKey())
// console.log(collection.random())
// console.log(collection.find((v) => (v == 'value2')))
// console.log(collection.isEmpty())
// console.log(collection.filter((v) => {
// 	return v === 'value1';
// }))
// console.log(collection.keysList())
// console.log(collection.valuesList())
// console.log(collection.toArray())
// console.log(collection.toJSON());