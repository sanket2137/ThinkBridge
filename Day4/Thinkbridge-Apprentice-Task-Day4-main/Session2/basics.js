// ===============================
// Session 2 - JavaScript Basics
// Step by Step Practice
// ===============================

// 1. Variables
let myName = "Sanket";     // variable with text
let myAge = 23;            // variable with number
console.log("Name:", myName);
console.log("Age:", myAge);

// 2. Strings
let hello = "Hello " + myName;   // join text
console.log(hello);

let template = `Hi ${myName}, your age is ${myAge}`; // template string
console.log(template);

// 3. Arrays
let colors = ["Red", "Green", "Blue"];   // list of values
console.log("First color:", colors[0]);  // show first item
console.log("All colors:", colors);

// 4. Loops
console.log("Using for loop:");
for (let i = 0; i < colors.length; i++) {
  console.log("Color", i, "=", colors[i]);
}

console.log("Using for...of loop:");
for (let c of colors) {
  console.log(c);
}

// 5. Conditionals
if (myAge >= 18) {
  console.log("You are an adult.");
} else {
  console.log("You are a minor.");
}

// 6. Functions
function multiply(x, y) {
  return x * y;
}
console.log("2 * 5 =", multiply(2, 5));

// 7. Extra Practice - Changing Values
myName = "Ajay";   // change variable value
console.log("New Name:", myName);

colors.push("Yellow");   // add new item to array
console.log("Updated colors:", colors);
