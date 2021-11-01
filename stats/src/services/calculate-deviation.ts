// Age model
type Age = {
  age: number
}

// Calculate standard deviation
// Needs all ages of that species and the average
export function calculate(ages: Age[], average: number): Number {
  let sumDistance = 0;
  let counter = 0;

  // Standard deviation formula
  for (let age of ages) {
    sumDistance += Math.pow(Math.abs(age.age - average), 2);
    counter += 1;
  }

  return Math.sqrt(sumDistance / counter);
}
