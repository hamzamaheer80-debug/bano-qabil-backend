
 // JAVASCRIPT ARRAY METHODS - 20 Practice & Interview Questions
  // Based on: Basit Hussain | Bano Qabil - Anjuman Campus
// ============================================================
// ============================================================
// Q1. [Basic] push()
// Add 'Mango' and 'Orange' to the end of the same array.
// ============================================================
console.log("--- Q1: push() ---");
const fruits = ["Apple", "Banana"];
fruits.push("Mango", "Orange"); // mutates the original array
console.log(fruits); // ['Apple', 'Banana', 'Mango', 'Orange']

// ============================================================
// Q2. [Basic] pop()
// Remove the last task and store the removed value.
// ============================================================
console.log("\n--- Q2: pop() ---");
const tasks = ["Login", "Dashboard", "Logout"];
const removedTask = tasks.pop(); // changes array AND returns removed element
console.log("Removed:", removedTask); // 'Logout'
console.log("Remaining:", tasks); // ['Login', 'Dashboard']

// ============================================================
// Q3. [Basic] unshift() + shift()
// Queue: add 'Student A' to the start, then serve (remove) the first.
// ============================================================
console.log("\n--- Q3: unshift() + shift() ---");
const queue = ["Student B", "Student C"];
queue.unshift("Student A"); // add to start
console.log("After unshift:", queue); // ['Student A', 'Student B', 'Student C']
const served = queue.shift(); // remove from start
console.log("Served:", served); // 'Student A'
console.log("Queue now:", queue); // ['Student B', 'Student C']

// ============================================================
// Q4. [Basic] slice()
// Get ['CSS', 'JS', 'React'] without changing `topics`.
// ============================================================
console.log("\n--- Q4: slice() ---");
const topics = ["HTML", "CSS", "JS", "React", "Node"];
const middleTopics = topics.slice(1, 4); // start index 1, end index 4 (end NOT included)
console.log(middleTopics); // ['CSS', 'JS', 'React']
console.log("Original:", topics); // unchanged

// ============================================================
// Q5. [Basic] splice()
// Remove 'jQuery' from its current position.
// ============================================================
console.log("\n--- Q5: splice() ---");
const technologies = ["HTML", "CSS", "jQuery", "React"];
const jqueryIndex = technologies.indexOf("jQuery");
if (jqueryIndex !== -1) {
  technologies.splice(jqueryIndex, 1); // (startIndex, deleteCount) - mutates original
}
console.log(technologies); // ['HTML', 'CSS', 'React']

// ============================================================
// Q6. [Basic] includes()
// Check whether 'student@gmail.com' is already registered.
// ============================================================
console.log("\n--- Q6: includes() ---");
const registeredEmails = [
  "ali@gmail.com",
  "sara@gmail.com",
  "student@gmail.com",
];
const isRegistered = registeredEmails.includes("student@gmail.com");
console.log("Is registered?", isRegistered); // true

// ============================================================
// Q7. [Basic-Medium] indexOf()
// Find the index of the first 'Karachi'. Handle a missing city.
// ============================================================
console.log("\n--- Q7: indexOf() ---");
const cities = ["Karachi", "Lahore", "Islamabad", "Karachi"];

function findCity(city) {
  const index = cities.indexOf(city); // returns FIRST match, or -1 if not found
  if (index === -1) {
    return `${city} not found in the list`;
  }
  return `${city} found at index ${index}`;
}

console.log(findCity("Karachi")); // index 0 (first match only)
console.log(findCity("Peshawar")); // not found (-1)

// ============================================================
// Q8. [Basic-Medium] slice() vs splice() - INTERVIEW
// ============================================================
console.log("\n--- Q8: slice() vs splice() ---");
/*
 * slice(start, end)
 *   - Returns a NEW array with a copy of the selected portion.
 *   - Does NOT change the original array.
 *   - 'end' index is not included.
 *
 * splice(start, deleteCount, ...itemsToAdd)
 *   - Removes / inserts / replaces items at a given index.
 *   - Returns an array of the REMOVED items.
 *   - CHANGES (mutates) the original array.
 */
const sliceDemo = [10, 20, 30, 40, 50];
const sliced = sliceDemo.slice(1, 3);
console.log("slice result:", sliced); // [20, 30]
console.log("after slice (original):", sliceDemo); // [10, 20, 30, 40, 50] - unchanged

const spliceDemo = [10, 20, 30, 40, 50];
const spliced = spliceDemo.splice(1, 2);
console.log("splice result (removed):", spliced); // [20, 30]
console.log("after splice (original):", spliceDemo); // [10, 40, 50] - CHANGED

// ============================================================
// Q9. [Basic-Medium] map()
// Add 10% tax to every price.
// ============================================================
console.log("\n--- Q9: map() ---");
const prices = [1000, 2500, 800, 1500];
// Math.round(... * 100) / 100 avoids floating-point noise like 880.0000000000001
const pricesWithTax = prices.map((price) => Math.round(price * 1.1 * 100) / 100);
console.log(pricesWithTax); // [1100, 2750, 880, 1650]

// ============================================================
// Q10. [Basic-Medium] map()
// Create an array of full names from student objects.
// ============================================================
console.log("\n--- Q10: map() with objects ---");
const students = [
  { firstName: "Ali", lastName: "Khan" },
  { firstName: "Sara", lastName: "Ahmed" },
  { firstName: "Hamza", lastName: "Sheikh" },
];
const fullNames = students.map((s) => `${s.firstName} ${s.lastName}`);
console.log(fullNames); // ['Ali Khan', 'Sara Ahmed', 'Hamza Sheikh']
console.log("Source unchanged:", students[0]); // { firstName: 'Ali', lastName: 'Khan' }

// ============================================================
// Q11. [Medium] filter()
// Keep only passing marks (>= 50).
// ============================================================
console.log("\n--- Q11: filter() ---");
const marks = [35, 76, 49, 90, 50, 20];
const passingMarks = marks.filter((mark) => mark >= 50);
console.log(passingMarks); // [76, 90, 50]

// ============================================================
// Q12. [Medium] filter() + map()
// Names of users who are 18 or older.
// ============================================================
console.log("\n--- Q12: filter() + map() ---");
const users = [
  { name: "Ali", age: 17 },
  { name: "Sara", age: 22 },
  { name: "Ahmed", age: 18 },
  { name: "Zainab", age: 15 },
];
const adultNames = users
  .filter((user) => user.age >= 18) // step 1: keep adults
  .map((user) => user.name); // step 2: take only names
console.log(adultNames); // ['Sara', 'Ahmed']

// ============================================================
// Q13. [Medium] find()
// Get the user with id 103. Handle "not found".
// ============================================================
console.log("\n--- Q13: find() ---");
const accounts = [
  { id: 101, name: "Ali" },
  { id: 102, name: "Sara" },
  { id: 103, name: "Ahmed" },
];

function getUserById(id) {
  const user = accounts.find((u) => u.id === id); // returns object or undefined
  if (user === undefined) {
    return `No user found with id ${id}`;
  }
  return user;
}

console.log(getUserById(103)); // { id: 103, name: 'Ahmed' }
console.log(getUserById(999)); // 'No user found with id 999'

// ============================================================
// Q14. [Medium] find() vs filter() - INTERVIEW
// ============================================================
console.log("\n--- Q14: find() vs filter() ---");
/*
 * find()   -> returns the FIRST matching ELEMENT (or undefined). Stops early.
 * filter() -> returns an ARRAY of ALL matching elements (or [] if none).
 *
 * Use find()   when you expect ONE match, e.g. get a user by unique id
 *              to show their profile page.
 * Use filter() when you expect MANY matches, e.g. show all products
 *              under Rs. 1000 in a shop listing.
 */
const people = [
  { id: 1, city: "Karachi" },
  { id: 2, city: "Lahore" },
  { id: 3, city: "Karachi" },
];
console.log("find:", people.find((p) => p.city === "Karachi")); // { id: 1, city: 'Karachi' }
console.log("filter:", people.filter((p) => p.city === "Karachi")); // [ {id:1...}, {id:3...} ]
console.log("find (no match):", people.find((p) => p.city === "Quetta")); // undefined
console.log("filter (no match):", people.filter((p) => p.city === "Quetta")); // []

// ============================================================
// Q15. [Medium] reduce()
// Total bill from cart prices.
// ============================================================
console.log("\n--- Q15: reduce() ---");
const cartPrices = [1200, 350, 999, 450];
const totalBill = cartPrices.reduce((sum, price) => sum + price, 0); // 0 = initial value
console.log("Total bill:", totalBill); // 2999

// ============================================================
// Q16. [Medium] reduce()
// Count how many times each technology appears.
// ============================================================
console.log("\n--- Q16: reduce() frequency count ---");
const techList = ["JS", "React", "JS", "Node", "React", "JS"];
const techCount = techList.reduce((acc, tech) => {
  acc[tech] = (acc[tech] || 0) + 1; // if key doesn't exist yet, start from 0
  return acc;
}, {}); // initial value is an empty object
console.log(techCount); // { JS: 3, React: 2, Node: 1 }

// ============================================================
// Q17. [Medium] sort()
// Sort numbers ascending + explain the default sort problem.
// ============================================================
console.log("\n--- Q17: sort() ---");
const numbers = [25, 3, 100, 12, 8];

// Default sort converts items to STRINGS and compares them character by character.
const wrongSort = [...numbers].sort();
console.log("Default sort (wrong):", wrongSort); // [100, 12, 25, 3, 8]  ('100' < '12' < '25' < '3' < '8')

// Correct numeric sort using a compare function:
const ascending = [...numbers].sort((a, b) => a - b);
console.log("Ascending:", ascending); // [3, 8, 12, 25, 100]

const descending = [...numbers].sort((a, b) => b - a);
console.log("Descending:", descending); // [100, 25, 12, 8, 3]
/*
 * Why: without a compare function, sort() turns numbers into strings,
 * so "100" comes before "25" because "1" < "2" in text order.
 * (a, b) => a - b: negative -> a first, positive -> b first, 0 -> keep order.
 */

// ============================================================
// Q18. [Medium] sort() + immutability - INTERVIEW
// Sort without changing the original (e.g. React state) array.
// ============================================================
console.log("\n--- Q18: sort() + immutability ---");
const stateArray = [50, 10, 40, 20];

// RISKY: sort() mutates the original array in place.
// const sorted = stateArray.sort((a, b) => a - b);  // stateArray is now changed!

// SAFE: copy first, then sort the copy.
const safeSorted1 = [...stateArray].sort((a, b) => a - b); // spread copy
const safeSorted2 = stateArray.slice().sort((a, b) => a - b); // slice copy
// Modern option (newer runtimes, Node 20+): const safeSorted3 = stateArray.toSorted((a, b) => a - b);

console.log("Sorted copy:", safeSorted1); // [10, 20, 40, 50]
console.log("Sorted copy 2:", safeSorted2); // [10, 20, 40, 50]
console.log("Original state:", stateArray); // [50, 10, 40, 20] - untouched
/*
 * Why it matters in React: state must never be mutated directly.
 * React compares references to detect changes; mutating in place can
 * cause missed re-renders and hard-to-find bugs.
 */

// ============================================================
// Q19. [Medium] some()
// Is at least one product out of stock?
// ============================================================
console.log("\n--- Q19: some() ---");
const stock = [5, 0, 7, 2];
const hasOutOfStock = stock.some((qty) => qty === 0);
console.log("Any out of stock?", hasOutOfStock); // true (stops at the 2nd item)

// ============================================================
// Q20. [Medium] every() + some() - INTERVIEW
// (a) Did every student pass?  (b) Did anyone score 90 or above?
// ============================================================
console.log("\n--- Q20: every() + some() ---");
const studentMarks = [72, 55, 91, 64, 80];

const allPassed = studentMarks.every((m) => m >= 50); // (a)
const hasTopper = studentMarks.some((m) => m >= 90); // (b)
console.log("(a) Everyone passed?", allPassed); // true
console.log("(b) Anyone scored 90+?", hasTopper); // true

// Edge cases on empty arrays:
console.log("every on []:", [].every((m) => m >= 50)); // true  (nothing fails)
console.log("some on []:", [].some((m) => m >= 90)); // false (nothing matches)
/*
 * every(): true only if ALL items pass. Stops at the FIRST failing item.
 * some():  true if AT LEAST ONE item passes. Stops at the FIRST passing item.
 * Both short-circuit, so they don't always loop through the whole array.
 */

// ============================================================
// BONUS: Final Challenge - Method Recognition
// ============================================================
console.log("\n--- Bonus: Method Recognition ---");
/*
 * "Every product name in uppercase"      -> map()
 * "Only active users"                    -> filter()
 * "The user with email X"                -> find()
 * "The total salary"                     -> reduce()
 * "Whether any field is empty"           -> some()
 * "Confirm all terms are accepted"       -> every()
 * "Products ordered by price"            -> sort() (on a copy)
 */
const products = [
  { name: "mouse", price: 1500, active: true },
  { name: "keyboard", price: 3000, active: false },
  { name: "monitor", price: 25000, active: true },
];
console.log(products.map((p) => p.name.toUpperCase()));
console.log(products.filter((p) => p.active));
console.log(products.find((p) => p.name === "keyboard"));
console.log(products.reduce((sum, p) => sum + p.price, 0));
console.log(products.some((p) => p.name === ""));
console.log(products.every((p) => p.price > 0));
console.log([...products].sort((a, b) => a.price - b.price));