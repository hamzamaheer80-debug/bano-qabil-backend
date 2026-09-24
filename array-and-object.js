// ============================================
//   ARRAYS & OBJECTS ASSIGNMENT - SOLUTIONS
// ============================================
//          🔹 ARRAY QUESTIONS
// ── Q1: Print array elements ──────────────
const fruits = ["apple", "banana", "cherry", "mango", "grape"];

console.log("Q1 – Print all elements:");
for (let i = 0; i < fruits.length; i++) {
  console.log(fruits[i]);
}


// ── Q2: Find array length without .length ──
function getArrayLength(arr) {
  let count = 0;
  for (let item of arr) {
    count++;
  }
  return count;
}

console.log("\nQ2 – Array length without .length:");
console.log(getArrayLength(fruits)); // 5


// ── Q3: Reverse array without .reverse() ──
function reverseArray(arr) {
  let reversed = [];
  for (let i = arr.length - 1; i >= 0; i--) {
    reversed.push(arr[i]);
  }
  return reversed;
}

console.log("\nQ3 – Reversed array:");
console.log(reverseArray(fruits)); // ["grape", "mango", "cherry", "banana", "apple"]


// ── Q4: Sum of all numbers in array ────────
const numbers = [10, 20, 30, 40, 50];

function sumArray(arr) {
  let total = 0;
  for (let num of arr) {
    total += num;
  }
  return total;
}

console.log("\nQ4 – Sum of array:");
console.log(sumArray(numbers)); // 150


// ── Q5: Filter even numbers ────────────────
const mixedNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

function filterEvens(arr) {
  let evens = [];
  for (let num of arr) {
    if (num % 2 === 0) {
      evens.push(num);
    }
  }
  return evens;
}

console.log("\nQ5 – Even numbers only:");
console.log(filterEvens(mixedNumbers)); // [2, 4, 6, 8, 10]


// ==========================================
//          🔹 OBJECT QUESTIONS
// ==========================================

// ── Q6: Access object properties ──────────
const student = {
  name: "Sara",
  age: 20,
  grade: "A",
};

console.log("\nQ6 – Student properties:");
console.log("Name:", student.name);
console.log("Age:", student.age);
console.log("Grade:", student.grade);


// ── Q7: Loop through object (for...in) ────
console.log("\nQ7 – Loop through student object:");
for (let key in student) {
  console.log(key + ":", student[key]);
}


// ── Q8: Object methods (calculator) ────────
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
      return "Cannot divide by zero!";
    }
    return a / b;
  },
};

console.log("\nQ8 – Calculator methods:");
console.log("Add(10, 5):", calculator.add(10, 5));           // 15
console.log("Subtract(10, 5):", calculator.subtract(10, 5)); // 5
console.log("Multiply(10, 5):", calculator.multiply(10, 5)); // 50
console.log("Divide(10, 5):", calculator.divide(10, 5));     // 2
console.log("Divide(10, 0):", calculator.divide(10, 0));     // Error message


// ── Q9: Nested objects ─────────────────────
const studentFull = {
  name: "Ali",
  age: 22,
  address: {
    city: "Karachi",
    country: "Pakistan",
    zip: "75500",
  },
};

console.log("\nQ9 – Nested object values:");
console.log("Name:", studentFull.name);
console.log("City:", studentFull.address.city);
console.log("Country:", studentFull.address.country);
console.log("Zip:", studentFull.address.zip);


// ── Q10: Convert object to arrays ──────────
const person = {
  name: "Ahmed",
  age: 25,
  city: "Lahore",
};

function getKeys(obj) {

  let keys = [];
  for (let key in obj) {
    keys.push(key);
  }
  return keys;
}

function getValues(obj) {
  let values = [];
  for (let key in obj) {
    values.push(obj[key]);
  }
  return values;
}

console.log("\nQ10 – Keys and values as arrays:");
console.log("Keys:", getKeys(person));     // ["name", "age", "city"]
console.log("Values:", getValues(person)); // ["Ahmed", 25, "Lahore"]
