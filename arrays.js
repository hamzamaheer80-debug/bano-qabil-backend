// ============================================================
//  ARRAY QUESTIONS — JavaScript Solutions
// ============================================================


// ─────────────────────────────────────────────────────────────
// Q1. Print all elements of an array using a for loop
// ─────────────────────────────────────────────────────────────
const fruits = ["Apple", "Banana", "Cherry", "Mango", "Grapes"];

console.log("Q1 — Print Array Elements:");
for (let i = 0; i < fruits.length; i++) {
  console.log(fruits[i]);
}


// ─────────────────────────────────────────────────────────────
// Q2. Find array length WITHOUT using .length
// ─────────────────────────────────────────────────────────────
function getArrayLength(arr) {
  let count = 0;
  for (let element of arr) {
    count++;
  }
  return count;
}

console.log("\nQ2 — Array Length Without .length:");
console.log("Length:", getArrayLength(fruits)); // 5


// ─────────────────────────────────────────────────────────────
// Q3. Reverse an array WITHOUT using .reverse()
// ─────────────────────────────────────────────────────────────
function reverseArray(arr) {
  let reversed = [];
  for (let i = arr.length - 1; i >= 0; i--) {
    reversed.push(arr[i]);
  }
  return reversed;
}

const numbers = [1, 2, 3, 4, 5];
console.log("\nQ3 — Reverse Array Without .reverse():");
console.log("Original :", numbers);
console.log("Reversed :", reverseArray(numbers)); // [5, 4, 3, 2, 1]


// ─────────────────────────────────────────────────────────────
// Q4. Calculate the sum of all numbers in an array
// ─────────────────────────────────────────────────────────────
function sumArray(arr) {
  let total = 0;
  for (let i = 0; i < arr.length; i++) {
    total += arr[i];
  }
  return total;
}

const nums = [10, 20, 30, 40, 50];
console.log("\nQ4 — Sum of Array Elements:");
console.log("Array :", nums);
console.log("Sum   :", sumArray(nums)); // 150


// ─────────────────────────────────────────────────────────────
// Q5. Filter only even numbers from an array
// ─────────────────────────────────────────────────────────────
function filterEvenNumbers(arr) {
  let evens = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] % 2 === 0) {
      evens.push(arr[i]);
    }
  }
  return evens;
}

const mixed = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
console.log("\nQ5 — Filter Even Numbers:");
console.log("Original    :", mixed);
console.log("Even Numbers:", filterEvenNumbers(mixed)); // [2, 4, 6, 8, 10]
