"use strict";

const assert = require("assert"),
	path = require("path");

require(path.join(__dirname, "..", "Math.js"));
require(path.join(__dirname, "..", "Number.js"));
require(path.join(__dirname, "..", "Object.js"));
require(path.join(__dirname, "..", "Array.js"));


// Arrays to use below
let a=null, b=null, c=null, x=null, r=null, r2=null, r3=null, TESTNAME=null;

TESTNAME = "includes";
a = [1, 2, 3, 4, 5];
assert.ok(a.includes(3), TESTNAME);
assert.ok(!a.includes(7), TESTNAME);

TESTNAME = "isArray";
a = [1, 2, 3, 4, 5];
x = {notArray : true};
assert.ok(Array.isArray(a), TESTNAME);
assert.ok(!Array.isArray(x), TESTNAME);

TESTNAME = "find";
a = [1, 2, 3, 4, 5];
assert.strictEqual(3, a.find(v => v>2 && v<4), TESTNAME);
assert.strictEqual(3, a.find((v, i) => i===2), TESTNAME);

TESTNAME = "pickRandom";
a = [1];
assert.ok([1].equals(a.pickRandom(1, [7])), TESTNAME);
assert.ok(a.equals(a.pickRandom(1)), TESTNAME);
a = [].pushSequence(0, 1000);
r = [].pushSequence(0, 1000);
assert.ok(!r.equals(a.pickRandom(1000)), TESTNAME);	// In theory this could shuffle all 10,000 elements the same, but highly unlikely.
assert.ok(r.equals(a), TESTNAME);
a = [1, 2, 3, 4, 5];
assert.ok(Number.isNumber(a.pickRandom()[0]), TESTNAME);
assert.ok(a.includes(a.pickRandom()[0]), TESTNAME);
assert.ok(Number.isNumber(a.pickRandom(1)[0]), TESTNAME);
assert.ok(a.includes(a.pickRandom(1)[0]), TESTNAME);
assert.strictEqual(3, a.pickRandom(3).length, TESTNAME);
assert.ok(a.includesAll(a.pickRandom(3)), TESTNAME);
r = a.pickRandom(2, [1, 3, 5]);
assert.ok(r.includes(2), TESTNAME);
assert.ok(r.includes(4), TESTNAME);
assert.strictEqual(2, r.length, TESTNAME);
for(let i=0;i<10000;i++)
{
	assert.ok(!a.pickRandom(4, [3]).includes(3), TESTNAME);
	assert.ok(!a.pickRandom(3, [1, 5]).includesAny([1, 5]), TESTNAME);
}

TESTNAME = "equals";
a = [1, 2, 3, 4, 5];
b = [1, 2, 3, 4, 5];
x = [1, 2, 3];
assert.ok(a.equals(b), TESTNAME);
assert.ok(!a.equals(x), TESTNAME);

TESTNAME = "clone";
a = [1, 2, 3, 4, 5];
r = [1, 2, 3, 4, 5];
r2 = [1, 2, 3, 4, 5, 6];
assert.ok(r.equals(a.clone()), TESTNAME);
a.push(6);
assert.ok(r2.equals(a), TESTNAME);

TESTNAME = "includesAll";
a = [1, 2, 3, 4, 5];
b = [2, 4];
c = [3];
x = [1, 2, 3, 4, 5, 7];
assert.ok(a.includesAll(b), TESTNAME);
assert.ok(a.includesAll(c), TESTNAME);
assert.ok(!a.includesAll(x), TESTNAME);

TESTNAME = "includesAny";
a = [1, 2, 3, 4, 5];
b = [2, 4];
c = [3];
x = [7, 8, 9];
assert.ok(a.includesAny(b), TESTNAME);
assert.ok(a.includesAny(c), TESTNAME);
assert.ok(!a.includesAny(x), TESTNAME);

TESTNAME = "removeOnce";
a = [1, 2, 3, 3, 3, 4, 5];
b = 3;
c = 7;
r = [1, 2, 3, 3, 4, 5];
assert.ok(r.equals(a.removeOnce(b)), TESTNAME);
a = [1, 2, 3, 3, 3, 4, 5];
assert.ok(a.equals(a.removeOnce(c)), TESTNAME);

TESTNAME = "removeAll";
a = [1, 2, 3, 3, 3, 4, 5];
b = 3;
r = [1, 2, 4, 5];
assert.ok(r.equals(a.removeAll(b)), TESTNAME);
assert.ok(r.equals(a), TESTNAME);
a = [1, 2, 3, 3, 3, 4, 5];
c = [3, 4];
r = [1, 2, 5];
c.forEach(v => a.removeAll(v));
assert.ok(r.equals(a), TESTNAME);
a = [1, 2, 3, 3, 3, 4, 5];
assert.ok(a.equals(a.removeAll(7)), TESTNAME);

TESTNAME = "sum";
a = [1, 2, 3, 4, 5];
r = 15;
assert.strictEqual(r, a.sum(), TESTNAME);

TESTNAME = "average";
a = [1, 2, 4, 4, 5];
r = 3.2;
assert.strictEqual(r, a.average(), TESTNAME);

TESTNAME = "median";
a = [1, 3, 4, 4, 5];
r = 4;
assert.strictEqual(r, a.median(), TESTNAME);

TESTNAME = "variance";
a = [1, 2, 3, 4, 5];
r = 2;
assert.strictEqual(r, a.variance(), TESTNAME);
r = 2.5;
assert.strictEqual(r, a.variance(true), TESTNAME);

TESTNAME = "standardDeviation";
a = [1, 2, 3, 4, 5];
r = 1.4142135623730951;
assert.strictEqual(r, a.standardDeviation(), TESTNAME);
r = 1.5811388300841898;
assert.strictEqual(r, a.standardDeviation(true), TESTNAME);

TESTNAME = "min";
a = [1, 2, 3, 4, 5];
r = 1;
assert.strictEqual(r, a.min(), TESTNAME);

TESTNAME = "max";
a = [1, 2, 3, 4, 5];
r = 5;
assert.strictEqual(r, a.max(), TESTNAME);

TESTNAME = "clear";
a = [1, 2, 3, 4, 5];
r = [];
assert.ok(r.equals(a.clear()), TESTNAME);
assert.ok(r.equals(a), TESTNAME);

TESTNAME = "last";
a = [1, 2, 3, 4, 5];
r = 5;
assert.strictEqual(r, a.last(), TESTNAME);

TESTNAME = "flatten";
a = [1, 2, 3, [4, 5], 6, [7, 8, [9, 10, [11, 12]]], 13, 14];
r = [1, 2, 3, 4, 5, 6, 7, 8, [9, 10, [11, 12]], 13, 14];
r2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, [11, 12], 13, 14];
r3 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
assert.ok(r.equals(a.flatten()), TESTNAME);
assert.ok(!r.equals(a), TESTNAME);
assert.ok(r2.equals(a.flatten(2)), TESTNAME);
assert.ok(r3.equals(a.flatten(3)), TESTNAME);

TESTNAME = "multiSort";
a = [{name : "d", value : 999}, {name : "a", value : 7}, {name : "b", value : 10}, {name : "a", value : 9}];
r = [{name : "a", value : 9}, {name : "a", value : 7}, {name : "b", value : 10}, {name : "d", value : 999}];
assert.ok(r.equals(a.multiSort([v => v.name, v => v.value], [false, true])), TESTNAME);
assert.ok(r.equals(a), TESTNAME);
a = [{name : "d", value : 999}, {name : "a", value : 7}, {name : "b", value : 10}, {name : "a", value : 9}];
r = [{name : "d", value : 999}, {name : "b", value : 10}, {name : "a", value : 9}, {name : "a", value : 7}];
assert.ok(r.equals(a.multiSort([v => v.name, v => v.value], true)), TESTNAME);
assert.ok(r.equals(a), TESTNAME);

TESTNAME = "shuffle";
a = [].pushSequence(0, 10000);
r = [].pushSequence(0, 10000);
assert.ok(!r.equals(a.shuffle()), TESTNAME);	// In theory this could shuffle all 10,000 elements the same, but highly unlikely.
assert.ok(!r.equals(a), TESTNAME);

TESTNAME = "unique";
a = [1, 2, 2, 3, 3, 3, 4, 5, 5];
b = [1, 2, 2, 3, 3, 3, 4, 5, 5];
r = [1, 2, 3, 4, 5];
assert.ok(r.equals(a.unique()), TESTNAME);
assert.ok(a.equals(b), TESTNAME);

TESTNAME = "filterEmpty";
a = [1, 0, 0, 2, undefined, undefined, 3, null, null, 4, "", "", 5, NaN];
r = [1, 2, 3, 4, 5];
assert.ok(r.equals(a.filterEmpty()), TESTNAME);

TESTNAME = "reduceOnce";
a = {a : "apple", b : "banana", c : "cocktail"};
b = ["x", "y", "b", "z"];
r = "banana";
assert.strictEqual(r, b.reduceOnce(v => (a.hasOwnProperty(v) ? a[v] : undefined)), TESTNAME);
assert.strictEqual(r, b.reduce((res, v) => (!r && a.hasOwnProperty(v) ? a[v] : r), null), TESTNAME);

TESTNAME = "filter && filterInPlace";
a = [1, 2, 3, 4, 5];
b = [1, 2, 3, 4, 5];
assert.ok(a.filter(v => v>=3).equals(b.filterInPlace(v => v>=3)), TESTNAME);
assert.ok(a.filter(v => v>=3).equals(b), TESTNAME);

TESTNAME = "map && mapInPlace";
a = [1, 2, 3, 4, 5];
b = [1, 2, 3, 4, 5];
r = [2, 4, 6, 8, 10];
assert.ok(Object.equals(a.map(v => v*2), b.mapInPlace(v => v*2)), TESTNAME);
assert.ok(Object.equals(a.map(v => v*2), b), TESTNAME);
assert.ok(Object.equals(b, r), TESTNAME);

TESTNAME = "rotate";
a = [1, 2, 3, 4, 5];
b = [1, 2, 3, 4, 5];
r = [4, 5, 1, 2, 3];
assert.ok(r.equals(a.rotate(3)), TESTNAME);
assert.ok(a.equals(b), TESTNAME);

TESTNAME = "rotateInPlace";
a = [1, 2, 3, 4, 5];
r = [4, 5, 1, 2, 3];
assert.ok(r.equals(a.rotateInPlace(3)), TESTNAME);
assert.ok(r.equals(a), TESTNAME);

TESTNAME = "subtract";
a = [1, 2, 3, 4, 5];
b = [2, 4];
r = [1, 3, 5];
r2 = [1, 2, 3, 4, 5];
assert.ok(r.equals(a.subtract(b)), TESTNAME);
assert.ok(r2.equals(a), TESTNAME);
a = [1, 2, 2, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 5];
b = [1, 3, 4];
r = [2, 2, 5, 5, 5, 5, 5];
assert.ok(r.equals(a.subtract(b)), TESTNAME);

TESTNAME = "batch";
a = [1, 2, 3, 4, 5, 6, 7];
r = [[1, 2], [3, 4], [5, 6], [7]];
assert.ok(r.equals(a.batch(2)), TESTNAME);
assert.ok(!r.equals(a), TESTNAME);

TESTNAME = "replaceAt";
a = [1, 2, 3, 4, 5];
r = [1, 2, 7, 4, 5];
assert.ok(r.equals(a.replaceAt(2, 7)), TESTNAME);
assert.ok(r.equals(a), TESTNAME);

TESTNAME = "mapToObject";
a = ["red", "green", "yellow"];
r = {red : 3, green : 5, yellow : 6};
assert.ok(Object.equals(a.mapToObject(v => v.length), r), TESTNAME);

TESTNAME = "replaceAll";
a = [1, 2, 3, 3, 3, 4, 5];
r = [1, 2, 7, 7, 7, 4, 5];
assert.ok(r.equals(a.replaceAll(3, 7)), TESTNAME);
assert.ok(r.equals(a), TESTNAME);

TESTNAME = "pushUnique";
a = [1, 2, 3, 4, 5];
r = [1, 2, 3, 4, 5, 7, 9];
assert.ok(r.equals(a.pushUnique(1, 7, 9)), TESTNAME);
assert.ok(r.equals(a), TESTNAME);

TESTNAME = "pushSequence";
a = [1, 2, 3];
r = [1, 2, 3, 4, 5, 6];
assert.ok(r.equals(a.pushSequence(4, 6)), TESTNAME);
assert.ok(r.equals(a), TESTNAME);
a = [];
r = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
assert.ok(r.equals(a.pushSequence(0, 9)), TESTNAME);
assert.ok(r.equals(a), TESTNAME);
a = [1, 2, 3];
r = [1, 2, 3, 2, 1, 0];
assert.ok(r.equals(a.pushSequence(2, 0)), TESTNAME);
assert.ok(r.equals(a), TESTNAME);

TESTNAME = "pushMany";
a = [1, 2, 3, 4, 5, 6];
r = [1, 2, 3, 4, 5, 6, 7, 7, 7];
assert.ok(r.equals(a.pushMany(7, 3)), TESTNAME);
assert.ok(r.equals(a), TESTNAME);

TESTNAME = "pushCopyInPlace";
a = [7];
r = [7, 7, 7];
assert.ok(r.equals(a.pushCopyInPlace(2)), TESTNAME);

TESTNAME = "serialForEach";
a = [1, 2, 3, 4, 5];
r = [1, 3, 6, 10, 15];
r2=0;
a.serialForEach((v, cb, i) =>
{
	r2 += v;
	assert.strictEqual(r[i], r2, TESTNAME);
	cb();
}, () => assert.strictEqual(r2, 15, TESTNAME));

TESTNAME = "parallelForEach";
a = [1, 2, 3, 4, 5];
r2=0;
a.parallelForEach((v, cb) =>
{
	r2 += v;
	cb();
}, () => assert.strictEqual(r2, 15, TESTNAME), 3);

console.log("ALL TESTS PASSED");
