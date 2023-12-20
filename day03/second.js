const fs = require("fs");
const input = fs.readFileSync("./input.txt", "utf-8").trim().split("\n");

let total = 0;

const mapGrid = [];
const gearList = {};

input.forEach((inputLine) => {
  mapGrid.push(inputLine);
});

const isNumeric = (str) => /^\d+$/.test(str);

const checkGearAdjacent = (posY, posX) => {
  let starPos = 0;

  for (const y of [-1, 0, 1]) {
    for (const x of [-1, 0, 1]) {
      if (
        y + posY >= 0 &&
        x + posX >= 0 &&
        y + posY <= mapGrid.length - 1 &&
        x + posX <= mapGrid[0].length - 1
      ) {
        if (mapGrid[y + posY][x + posX] === "*") {
          // console.log("Found star in ", `${y + posY},${x + posX}`);
          starPos = `${y + posY},${x + posX}`;
        }
      }
    }
  }

  return starPos;
};

mapGrid.forEach((mapLine, lineIndex) => {
  let currentNum = "";
  let partFlag = false;
  let starPos = 0;

  [...mapLine].forEach((lineChar, charIndex) => {
    if (isNumeric(lineChar)) {
      currentNum += lineChar;
      const adjGear = checkGearAdjacent(lineIndex, charIndex);
      if (adjGear) {
        starPos = adjGear;
      }
      partFlag = !!partFlag || !!checkGearAdjacent(lineIndex, charIndex);
    } else {
      if (partFlag) {
        if (!gearList[starPos]) {
          gearList[starPos] = [];
        }
        // console.log("Assigning number to", currentNum, starPos);
        gearList[starPos].push(Number(currentNum));
      }
      currentNum = "";
      partFlag = false;
    }

    if (partFlag && charIndex === mapGrid[lineIndex].length - 1) {
      if (!gearList[starPos]) {
        gearList[starPos] = [];
      }

      gearList[starPos].push(Number(currentNum));
    }
  });
});

for (const item in gearList) {
  if (gearList[item].length === 2) {
    total += gearList[item][0] * gearList[item][1];
  }
}
// console.log(gearList);

console.log("Gear factor", total);
