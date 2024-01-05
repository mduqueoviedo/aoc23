const fs = require("fs");
const input = fs.readFileSync("./input.txt", "utf-8").trim().split("\n\n");

const START = "AAA";
const GOAL = "ZZZ";

const instructions = input[0];
const rawMap = input[1].split("\n");
const mappedMap = {};

rawMap.forEach((mapLine) => {
  const splittedLine = mapLine.split("=").map((item) => item.trim());
  const left = splittedLine[1].substring(splittedLine[1].indexOf("(") + 1, 4);
  const right = splittedLine[1].substring(splittedLine[1].indexOf(", ") + 2, 9);

  mappedMap[splittedLine[0]] = [left, right];
});

let totalSteps = 0;
let currentPoint = START;

while (currentPoint !== GOAL) {
  const step = [...instructions].at(totalSteps % instructions.length);
  currentPoint = mappedMap[currentPoint][step === "L" ? 0 : 1];
  totalSteps++;
}

console.log("Steps", totalSteps);
