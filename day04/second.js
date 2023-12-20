const fs = require("fs");
const input = fs.readFileSync("./input.txt", "utf-8").trim().split("\n");

const cardsList = Array(input.length).fill(1);

input.forEach((gameLine, gameIndex) => {
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
  ).length;

  if (matches > 0) {
    for (let i = 1; i <= matches; i++) {
      cardsList[gameIndex + i] += cardsList[gameIndex];
    }
  }
  // console.log("After line", gameIndex, "we have", cardsList);
});

console.log(
  "Total cards",
  cardsList.reduce((prev, curr) => prev + curr, 0)
);
