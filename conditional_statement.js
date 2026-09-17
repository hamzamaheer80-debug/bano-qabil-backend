
// ============================================================
//              CONDITIONAL STATEMENTS — JavaScript
// ============================================================

// ─────────────────────────────────────────────────────────────
// Q1: Write a program that checks if a number is positive,
//     negative, or zero.
// ─────────────────────────────────────────────────────────────
console.log("─── Q1: Positive / Negative / Zero ───");

let num = -5;

if (num > 0) {
  console.log(`${num} → Positive`);
} else if (num < 0) {
  console.log(`${num} → Negative`);
} else {
  console.log(`${num} → Zero`);
}

// ─────────────────────────────────────────────────────────────
// Q2: Using an if-else statement, determine whether a given
//     integer is even or odd.
// ─────────────────────────────────────────────────────────────
console.log("\n─── Q2: Even or Odd ───");

let number = 14;

if (number % 2 === 0) {
  console.log(`${number} → Even`);
} else {
  console.log(`${number} → Odd`);
}

// ─────────────────────────────────────────────────────────────
// Q3: Write a program that takes two numbers and prints the
//     larger one using conditional statements.
// ─────────────────────────────────────────────────────────────
console.log("\n─── Q3: Largest of Two Numbers ───");

let a = 25;
let b = 40;

if (a > b) {
  console.log(`${a} is greater than ${b}`);
} else if (b > a) {
  console.log(`${b} is greater than ${a}`);
} else {
  console.log(`${a} and ${b} are equal`);
}

// ─────────────────────────────────────────────────────────────
// Q4: Using if-else-if, assign grades (A, B, C, D, F) based
//     on a student's percentage score.
// ─────────────────────────────────────────────────────────────
console.log("\n─── Q4: Grade Evaluation ───");

let percentage = 85;

if (percentage >= 90) {
  console.log(`Score: ${percentage}% → Grade: A`);
} else if (percentage >= 80) {
  console.log(`Score: ${percentage}% → Grade: B`);
} else if (percentage >= 70) {
  console.log(`Score: ${percentage}% → Grade: C`);
} else if (percentage >= 60) {
  console.log(`Score: ${percentage}% → Grade: D`);
} else {
  console.log(`Score: ${percentage}% → Grade: F`);
}

// ─────────────────────────────────────────────────────────────
// Q5: Write a program that checks if a given year is a leap
//     year using conditional statements.
// ─────────────────────────────────────────────────────────────
console.log("\n─── Q5: Leap Year Check ───");

let year = 2024;

// A year is a leap year if:
//   → divisible by 4 AND not a century year
//   → OR divisible by 400 (century leap year)
if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
  console.log(`${year} → Leap Year ✓`);
} else {
  console.log(`${year} → Not a Leap Year ✗`);
}

// ─────────────────────────────────────────────────────────────
// Q6: Use a switch-case to print the name of the day when
//     given a number (1 = Monday … 7 = Sunday).
// ─────────────────────────────────────────────────────────────
console.log("\n─── Q6: Day of the Week ───");

let dayNumber = 5;

switch (dayNumber) {
  case 1:
    console.log(`Day ${dayNumber} → Monday`);
    break;
  case 2:
    console.log(`Day ${dayNumber} → Tuesday`);
    break;
  case 3:
    console.log(`Day ${dayNumber} → Wednesday`);
    break;
  case 4:
    console.log(`Day ${dayNumber} → Thursday`);
    break;
  case 5:
    console.log(`Day ${dayNumber} → Friday`);
    break;
  case 6:
    console.log(`Day ${dayNumber} → Saturday`);
    break;
  case 7:
    console.log(`Day ${dayNumber} → Sunday`);
    break;
  default:
    console.log("Invalid day number. Enter 1–7.");
}

// ─────────────────────────────────────────────────────────────
// Q7: Create a simple calculator using switch-case that
//     performs +, -, *, / based on user input.
// ─────────────────────────────────────────────────────────────
console.log("\n─── Q7: Calculator (switch-case) ───");

// Demo values — change these to test different operations
let num1 = 10;
let num2 = 3;
let operator = "/";

switch (operator) {
  case "+":
    console.log(`${num1} + ${num2} = ${num1 + num2}`);
    break;
  case "-":
    console.log(`${num1} - ${num2} = ${num1 - num2}`);
    break;
  case "*":
    console.log(`${num1} * ${num2} = ${num1 * num2}`);
    break;
  case "/":
    if (num2 === 0) {
      console.log("Error: Cannot divide by zero.");
    } else {
      console.log(`${num1} / ${num2} = ${num1 / num2}`);
    }
    break;
  default:
    console.log(`"${operator}" is not a valid operator. Use +, -, *, /`);
}

// ─────────────────────────────────────────────────────────────
// Q8: Write a program that checks whether a given character
//     is a vowel or consonant using switch-case.
// ─────────────────────────────────────────────────────────────
console.log("\n─── Q8: Vowel or Consonant ───");

let char = "E";
let lowerChar = char.toLowerCase();

switch (lowerChar) {
  case "a":
  case "e":
  case "i":
  case "o":
  case "u":
    console.log(`'${char}' → Vowel`);
    break;
  default:
    if (lowerChar >= "a" && lowerChar <= "z") {
      console.log(`'${char}' → Consonant`);
    } else {
      console.log(`'${char}' → Not a letter`);
    }
}

// ─────────────────────────────────────────────────────────────
// Q9: Using switch-case, print instructions based on traffic
//     light color (Red, Yellow, Green).
// ─────────────────────────────────────────────────────────────
console.log("\n─── Q9: Traffic Light System ───");

let lightColor = "Green";

switch (lightColor) {
  case "Red":
    console.log("🔴 Red   → STOP");
    break;
  case "Yellow":
    console.log("🟡 Yellow → WAIT");
    break;
  case "Green":
    console.log("🟢 Green → GO");
    break;
  default:
    console.log(`"${lightColor}" is not a valid traffic light color.`);
}

// ─────────────────────────────────────────────────────────────
// Q10: Write a menu-driven program using switch-case where
//      the user selects: 1=Check Balance, 2=Deposit,
//      3=Withdraw, 4=Exit.
// ─────────────────────────────────────────────────────────────
console.log("\n─── Q10: Menu-Driven Bank Program ───");

let balance = 5000;
let choice = 2;      // Demo: change 1–4 to test each option
let amount = 1500;

console.log("Menu: 1=Check Balance | 2=Deposit | 3=Withdraw | 4=Exit");
console.log(`User selected option: ${choice} | Amount: $${amount}`);

switch (choice) {
  case 1:
    console.log(`→ Current Balance: $${balance}`);
    break;
  case 2:
    balance += amount;
    console.log(`→ Deposited $${amount}. New Balance: $${balance}`);
    break;
  case 3:
    if (amount > balance) {
      console.log("→ Insufficient balance. Transaction failed.");
    } else {
      balance -= amount;
      console.log(`→ Withdrawn $${amount}. Remaining Balance: $${balance}`);
    }
    break;
  case 4:
    console.log("→ Thank you for banking with us. Goodbye!");
    break;
  default:
    console.log("→ Invalid option. Please choose 1–4.");
}
