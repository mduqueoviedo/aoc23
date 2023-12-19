const fs = require("fs");
const input = fs.readFileSync("./input.txt", "utf-8").trim().split("\n");

const RED_LIMIT = 12;
const GREEN_LIMIT = 13;
const BLUE_LIMIT = 14;

let total = 0;

input.forEach((line) => {
  const gameId = Number(
    line.substring(line.indexOf("Game ") + 5, line.indexOf(":")).trim()
  );
  const games = line
    .substring(line.indexOf(":") + 1)
    .split(";")
    .map((i) => i.trim());

  flag = true;
  games.forEach((singleTry) => {
    const points = { green: 0, red: 0, blue: 0 };
    const colors = singleTry.split(",").map((i) => i.trim());
    colors.forEach((singleColor) => {
      const val = Number(singleColor.split(" ")[0]);
      const color = singleColor.split(" ")[1].trim();

      points[color] = val;
    });

    if (
      points.blue > BLUE_LIMIT ||
      points.green > GREEN_LIMIT ||
      points.red > RED_LIMIT
    ) {
      flag = false;
    }
  });

  if (flag) {
    total += gameId;
  }
});

console.log("Points", total);
