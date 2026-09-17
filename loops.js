// ============================================================
//                    LOOPS — JavaScript
// ============================================================

// ─────────────────────────────────────────────────────────────
// Q1: Write a program using a for loop to print numbers
//     from 1 to 10.
// ─────────────────────────────────────────────────────────────
console.log("─── Q1: Print Numbers 1 to 10 ───");

let output = "";
for (let i = 1; i <= 10; i++) {
  output += i + " ";
}
console.log(output.trim());

// ─────────────────────────────────────────────────────────────
// Q2: Use a while loop to calculate the sum of the first
//     N natural numbers.
// ─────────────────────────────────────────────────────────────
console.log("\n─── Q2: Sum of First N Natural Numbers ───");

let N = 10;
let sum = 0;
let i = 1;

while (i <= N) {
  sum += i;
  i++;
}

console.log(`Sum of first ${N} natural numbers = ${sum}`);

// ─────────────────────────────────────────────────────────────
// Q3: Print the multiplication table of a given number
//     using a for loop.
// ─────────────────────────────────────────────────────────────
console.log("\n─── Q3: Multiplication Table ───");

let tableOf = 7;

console.log(`Multiplication table of ${tableOf}:`);
for (let i = 1; i <= 10; i++) {
  console.log(`  ${tableOf} × ${i} = ${tableOf * i}`);
}

// ─────────────────────────────────────────────────────────────
// Q4: Write a program using a while loop to find the
//     factorial of a given number.
// ─────────────────────────────────────────────────────────────
console.log("\n─── Q4: Factorial Calculation ───");

let n = 6;
let factorial = 1;
let j = 1;

while (j <= n) {
  factorial *= j;
  j++;
}

console.log(`Factorial of ${n} (${n}!) = ${factorial}`);

// ─────────────────────────────────────────────────────────────
// Q5: Print numbers from 10 down to 1 using a for loop.
// ─────────────────────────────────────────────────────────────
console.log("\n─── Q5: Reverse Counting (10 → 1) ───");

let reverseOutput = "";
for (let i = 10; i >= 1; i--) {
  reverseOutput += i + " ";
}
console.log(reverseOutput.trim());

// ─────────────────────────────────────────────────────────────
// Q6: Use a do-while loop to print all even numbers up to N.
// ─────────────────────────────────────────────────────────────
console.log("\n─── Q6: Even Numbers up to N ───");

let limit = 20;
let k = 2;
let evenOutput = "";

// do-while ensures the loop body runs at least once
do {
  evenOutput += k + " ";
  k += 2;
} while (k <= limit);

console.log(`Even numbers up to ${limit}: ${evenOutput.trim()}`);

// ─────────────────────────────────────────────────────────────
// Q7: Write a program using a while loop to calculate the
//     sum of digits of a given number.
// ─────────────────────────────────────────────────────────────
console.log("\n─── Q7: Sum of Digits ───");

let numValue = 4579;
let digitSum = 0;
let temp = numValue;

// Extract each digit from the right using modulo 10
while (temp > 0) {
  digitSum += temp % 10;     // last digit
  temp = Math.floor(temp / 10); // remove last digit
}

console.log(`Sum of digits of ${numValue} = ${digitSum}`);

// ─────────────────────────────────────────────────────────────
// Q8: Generate the first 10 terms of the Fibonacci series
//     using a for loop.
// ─────────────────────────────────────────────────────────────
console.log("\n─── Q8: Fibonacci Series (first 10 terms) ───");

let first = 0;
let second = 1;
let fibOutput = "";

for (let i = 0; i < 10; i++) {
  fibOutput += first + " ";
  let next = first + second; // next term = sum of previous two
  first = second;
  second = next;
}

console.log(`Fibonacci: ${fibOutput.trim()}`);

// ─────────────────────────────────────────────────────────────
// Q9: Use a do-while loop to keep asking the user for a
//     number until they guess the correct one.
// ─────────────────────────────────────────────────────────────
console.log("\n─── Q9: Guessing Game ───");

const correctAnswer = 7;

// Simulated guesses (in a real app, use readline to read user input)
const simulatedGuesses = [3, 9, 1, 7];
let guessIndex = 0;
let guess;

do {
  guess = simulatedGuesses[guessIndex];
  guessIndex++;

  if (guess !== correctAnswer) {
    console.log(`Guess: ${guess} → ✗ Wrong! Try again.`);
  }
} while (guess !== correctAnswer);

console.log(`Guess: ${guess} → ✓ Correct! You got it in ${guessIndex} attempt(s).`);

// ─────────────────────────────────────────────────────────────
// Q10: Write a program using a for loop to check if a given
//      number is prime.
// ─────────────────────────────────────────────────────────────
console.log("\n─── Q10: Prime Number Check ───");

let numToCheck = 29;
let isPrime = true;

if (numToCheck < 2) {
  // 0 and 1 are not prime by definition
  isPrime = false;
} else {
  // Only check divisors up to √n — more efficient
  for (let i = 2; i <= Math.sqrt(numToCheck); i++) {
    if (numToCheck % i === 0) {
      isPrime = false;
      break; // No need to check further once a divisor is found
    }
  }
}

console.log(`${numToCheck} → ${isPrime ? "Prime ✓" : "Not Prime ✗"}`);
