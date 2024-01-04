const fs = require("fs");
const input = fs.readFileSync("./input.txt", "utf-8").trim().split("\n");

const raceTime = Number(
  input[0]
    .split(" ")
    .filter((item) => !!item)
    .map(Number)
    .slice(1)
    .join("")
);
const raceDistance = Number(
  input[1]
    .split(" ")
    .filter((item) => !!item)
    .map(Number)
    .slice(1)
    .join("")
);

let validOptions = 0;

for (let timePushing = 1; timePushing < raceTime; timePushing++) {
  if (timePushing * (raceTime - timePushing) > raceDistance) {
    validOptions++;
  }
}

console.log("Total:", validOptions);
