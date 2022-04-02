
//Union types
console.log("Testing Typescript Setup");

function combine(n1: number | string, n2: number | string) {
  if (typeof n1 === "number" && typeof n2 === "number") {
    return +n1 + +n2;
  } else {
    return n1.toString() + n2.toString();
  }
}

const combineAges = combine(30, 56);
console.log("Value: " + combineAges);

const combineAges2 = combine("30", "56");
console.log("Value: " + combineAges2);



//literal types
