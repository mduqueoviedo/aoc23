const fs = require("fs");
const input = fs.readFileSync("./input.txt", "utf-8").trim().split("\n");

let totalVal = 0;

input.forEach((inputLine) => {
  const currentLine = inputLine.split(" ").map(Number);
  const sequences = [currentLine];

  let currentSequence = currentLine;

  while (!currentSequence.every((item) => item === 0)) {
    const newLine = [];
    for (let i = 1; i < currentSequence.length; i++) {
      newLine.push(currentSequence[i] - currentSequence[i - 1]);
    }
    sequences.push(newLine);
    currentSequence = newLine;
  }

  const newSequences = [];

  sequences.reverse().forEach((currentSequence, index) => {
    if (index === 0) {
      newSequences.push([0, ...currentSequence]);
    } else {
      newSequences.push([
        currentSequence.at(0) - newSequences[index - 1].at(0),
        ...currentSequence,
      ]);
    }
  });

  totalVal += newSequences.at(-1).at(0);
});

console.log("Total is", totalVal);
