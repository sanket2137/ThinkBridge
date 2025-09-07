// functions.js

// --- Function Declaration ---
function greet(name) {
  return `Hello, ${name}!`;
}

console.log(greet("Sanket")); // Hello, Sanket!

// --- Function Expression ---
const add = function (a, b) {
  return a + b;
};

console.log(add(5, 3)); // 8

// --- Arrow Function Expression ---
const multiply = (a, b) => a * b;

console.log(multiply(4, 2)); // 8

// --- Block Scope Example ---
function testScope() {
  let x = 10;
  if (true) {
    let x = 20; // block-scoped variable
    console.log("Inside block:", x); // 20
  }
  console.log("Outside block:", x); // 10
}

testScope();

// --- Default Parameters ---
function power(base, exponent = 2) {
  return base ** exponent;
}

console.log(power(3));    // 9
console.log(power(3, 3)); // 27
