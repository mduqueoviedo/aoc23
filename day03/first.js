const fs = require("fs");
const input = fs.readFileSync("./input.txt", "utf-8").trim().split("\n");

let total = 0;

const mapGrid = [];

input.forEach((inputLine) => {
  mapGrid.push(inputLine);
});

const isNumeric = (str) => /^\d+$/.test(str);

const checkCharAdjacent = (posY, posX) => {
  let flag = false;

  for (const y of [-1, 0, 1]) {
    for (const x of [-1, 0, 1]) {
      if (
        y + posY >= 0 &&
        x + posX >= 0 &&
        y + posY <= mapGrid.length - 1 &&
        x + posX <= mapGrid[0].length - 1
      ) {
        flag =
          flag ||
          (mapGrid[y + posY][x + posX] !== "." &&
            !isNumeric(mapGrid[y + posY][x + posX]));
      }
    }
  }

  return flag;
};

mapGrid.forEach((mapLine, lineIndex) => {
  let currentNum = "";
  let partFlag = false;

  [...mapLine].forEach((lineChar, charIndex) => {
    if (isNumeric(lineChar)) {
      currentNum += lineChar;
      partFlag = partFlag || checkCharAdjacent(lineIndex, charIndex);
    } else {
      if (partFlag) {
        total += Number(currentNum);
        console.log("Found number", currentNum, "Current total is", total);
      }
      currentNum = "";
      partFlag = false;
    }

    if (partFlag && charIndex === mapGrid[lineIndex].length - 1) {
      total += Number(currentNum);
    }
  });
});

console.log("Points", total);
