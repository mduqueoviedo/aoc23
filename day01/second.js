const fs = require("fs");
const input = fs.readFileSync("./input.txt", "utf-8").trim().split("\n");

const numbers = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
];

const numberMap = {
  1: 1,
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

let total = 0;

input.forEach((line) => {
  let firstOcc = line.length;
  let firstNumber = "";
  numbers.forEach((num) => {
    if (line.indexOf(num) !== -1 && line.indexOf(num) < firstOcc) {
      firstOcc = line.indexOf(num);
      firstNumber = num;
    }
  });

  let secondOcc = 0;
  let secondNumber = "";
  numbers.forEach((num) => {
    if (line.lastIndexOf(num) !== -1 && line.lastIndexOf(num) > secondOcc) {
      secondOcc = line.lastIndexOf(num);
      secondNumber = num;
    }
  });
  if (secondNumber === "") {
    secondNumber = firstNumber;
  }

  const calibrationValue = Number(
    `${numberMap[firstNumber]}${numberMap[secondNumber]}`
  );

  total += calibrationValue;
});

console.log("Calibration", total);
