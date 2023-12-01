const fs = require("fs");
const input = fs.readFileSync("./input.txt", "utf-8").trim().split("\n");

let total = 0;

input.forEach((line) => {
  const reg = [...line];
  const rev = [...line].reverse();

  const first = reg.find((letter) => /^\d+$/.test(letter));
  const last = rev.find((letter) => /^\d+$/.test(letter));

  total += Number(`${first}${last}`);
});

console.log("Calibration", total);
