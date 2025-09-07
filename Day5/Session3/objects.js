// objects.js

// --- Creating an Object ---
const person = {
  name: "Sanket",
  age: 23,
  job: "Data Analyst",
  greet: function () {
    return `Hi, I'm ${this.name}, a ${this.job}.`;
  }
};

console.log(person.greet());

// --- Adding a new property dynamically ---
person.location = "Pune";
console.log(person);

// --- Iterating over object properties ---
console.log("Using for...in loop:");
for (let key in person) {
  console.log(`${key}: ${person[key]}`);
}

// --- Object.keys ---
console.log("Using Object.keys:");
Object.keys(person).forEach(key => {
  console.log(`${key}: ${person[key]}`);
});

// --- Object.entries ---
console.log("Using Object.entries:");
for (const [key, value] of Object.entries(person)) {
  console.log(`${key}: ${value}`);
}

// --- Nested Objects ---
const company = {
  name: "Tenerity",
  employees: {
    sanket: { role: "Analyst", exp: "1 year" },
    priya: { role: "Developer", exp: "2 years" }
  }
};

console.log(company.employees.sanket.role); // Analyst
