const fs = require("fs");
const input = fs.readFileSync("./input.txt", "utf-8").trim().split("\n\n");

const instructions = input[0];
const rawMap = input[1].split("\n");
const mappedMap = {};

rawMap.forEach((mapLine) => {
  const splittedLine = mapLine.split("=").map((item) => item.trim());
  const left = splittedLine[1].substring(splittedLine[1].indexOf("(") + 1, 4);
  const right = splittedLine[1].substring(splittedLine[1].indexOf(", ") + 2, 9);

  mappedMap[splittedLine[0]] = [left, right];
});

const isInGoal = (point) => point.endsWith("Z");

const currentPoints = Object.keys(mappedMap).filter((mapPoint) =>
  mapPoint.endsWith("A")
);
let stepGoals = [];

currentPoints.forEach((singlePoint) => {
  let stepCount = 0;
  let currentPoint = singlePoint;

  while (!isInGoal(currentPoint)) {
    const step = [...instructions].at(stepCount % instructions.length);
    currentPoint = mappedMap[currentPoint][step === "L" ? 0 : 1];

    stepCount++;

    if (currentPoint.endsWith("Z")) {
      stepGoals.push(stepCount);
    }
  }
});

const gcd = (a, b) => (a ? gcd(b % a, a) : b);
const lcm = (a, b) => (a * b) / gcd(a, b);

console.log("Steps:", stepGoals.reduce(lcm));
