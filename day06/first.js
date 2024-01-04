const fs = require("fs");
const input = fs.readFileSync("./input.txt", "utf-8").trim().split("\n");

const raceTimes = input[0]
  .split(" ")
  .filter((item) => !!item)
  .map(Number)
  .slice(1);
const raceDistances = input[1]
  .split(" ")
  .filter((item) => !!item)
  .map(Number)
  .slice(1);

const totals = [];
for (let i = 0; i < raceTimes.length; i++) {
  let validOptions = 0;

  for (let timePushing = 1; timePushing < raceTimes[i]; timePushing++) {
    if (timePushing * (raceTimes[i] - timePushing) > raceDistances[i]) {
      // console.log("We have a valid:", timePushing);
      validOptions++;
    }
  }

  totals.push(validOptions);
}

console.log(
  "Total:",
  totals.reduce((prev, curr) => prev * curr, 1)
);
