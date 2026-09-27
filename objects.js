// ============================================================
//  OBJECT QUESTIONS — JavaScript Solutions
// ============================================================


// ─────────────────────────────────────────────────────────────
// Q1. Create a student object and print each property
// ─────────────────────────────────────────────────────────────
const student = {
  name: "Ali Hassan",
  age: 20,
  grade: "A",
};

console.log("Q1 — Access Object Properties:");
console.log("Name :", student.name);
console.log("Age  :", student.age);
console.log("Grade:", student.grade);


// ─────────────────────────────────────────────────────────────
// Q2. Loop through all keys and values using for...in
// ─────────────────────────────────────────────────────────────
console.log("\nQ2 — Loop Through Object with for...in:");
for (let key in student) {
  console.log(key + " : " + student[key]);
}


// ─────────────────────────────────────────────────────────────
// Q3. Object with methods — calculator
// ─────────────────────────────────────────────────────────────
const calculator = {
  add: function (a, b) {
    return a + b;
  },
  subtract: function (a, b) {
    return a - b;
  },
  multiply: function (a, b) {
    return a * b;
  },
  divide: function (a, b) {
    if (b === 0) {
      return "Error: Cannot divide by zero";
    }
    return a / b;
  },
};

console.log("\nQ3 — Calculator Object Methods:");
console.log("Add      (10 + 5):", calculator.add(10, 5));       // 15
console.log("Subtract (10 - 5):", calculator.subtract(10, 5));  // 5
console.log("Multiply (10 * 5):", calculator.multiply(10, 5));  // 50
console.log("Divide   (10 / 5):", calculator.divide(10, 5));    // 2
console.log("Divide   (10 / 0):", calculator.divide(10, 0));    // Error


// ─────────────────────────────────────────────────────────────
// Q4. Access values inside a nested object
// ─────────────────────────────────────────────────────────────
const studentNested = {
  name: "Sara Ahmed",
  age: 22,
  address: {
    street: "123 Main Street",
    city: "Lahore",
    country: "Pakistan",
  },
};

console.log("\nQ4 — Nested Object Access:");
console.log("Student Name:", studentNested.name);
console.log("City        :", studentNested.address.city);
console.log("Country     :", studentNested.address.country);
console.log("Street      :", studentNested.address.street);


// ─────────────────────────────────────────────────────────────
// Q5. Convert object's keys and values into separate arrays
// ─────────────────────────────────────────────────────────────
const person = {
  name: "Usman",
  age: 25,
  city: "Karachi",
  job: "Developer",
};

let keysArray = [];
let valuesArray = [];

for (let key in person) {
  keysArray.push(key);
  valuesArray.push(person[key]);
}

console.log("\nQ5 — Convert Object to Separate Arrays:");
console.log("Original Object:", person);
console.log("Keys Array     :", keysArray);    // ['name', 'age', 'city', 'job']
console.log("Values Array   :", valuesArray);  // ['Usman', 25, 'Karachi', 'Developer']
