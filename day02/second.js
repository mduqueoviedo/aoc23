const fs = require("fs");
const input = fs.readFileSync("./input.txt", "utf-8").trim().split("\n");

let total = 0;

input.forEach((line) => {
  const games = line
    .substring(line.indexOf(":") + 1)
    .split(";")
    .map((i) => i.trim());

  const points = { green: 0, red: 0, blue: 0 };
  games.forEach((singleTry) => {
    const colors = singleTry.split(",").map((i) => i.trim());

    colors.forEach((singleColor) => {
      const val = Number(singleColor.split(" ")[0]);
      const color = singleColor.split(" ")[1].trim();

      if (val > points[color]) {
        points[color] = val;
      }
    });
  });

  total += points.green * points.blue * points.red;
});

console.log("Points", total);
