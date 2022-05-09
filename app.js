console.log("Testing Typescript Setup");
function combine(n1, n2) {
    if (typeof n1 === "number" && typeof n2 === "number") {
        return n1 + n2;
    }
    else {
        return n1.toString() + n2.toString();
    }
}
var combineAges = combine(30, 56);
console.log("Value: " + combineAges);
var combineAges2 = combine("30", "56");
console.log("Value: " + combineAges2);
