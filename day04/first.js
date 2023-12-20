const fs = require("fs");
const input = fs.readFileSync("./input.txt", "utf-8").trim().split("\n");

let totalPoints = 0;

input.forEach((gameLine) => {
  const numbers = gameLine
    .substring(gameLine.indexOf(":") + 1)
    .trim()
    .split("|");
  const winningNumbers = numbers[0]
    .trim()
    .split(" ")
    .map(Number)
    .filter((item) => item);
  const myNumbers = numbers[1]
    .trim()
    .split(" ")
    .map(Number)
    .filter((item) => item);

  const matches = winningNumbers.filter((winningNumber) =>
    myNumbers.includes(winningNumber)
  );

  if (matches.length > 0) {
    totalPoints += Math.pow(2, matches.length - 1);
  }
});

console.log("Total points", totalPoints);
