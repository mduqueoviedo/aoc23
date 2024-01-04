const fs = require("fs");
const input = fs.readFileSync("./input.txt", "utf-8").trim().split("\n");

const cardStrength = "AKQJT98765432";
const handStrength = [
  "Five",
  "Four",
  "Full",
  "Three",
  "TwoPair",
  "OnePair",
  "High",
];

const handTypes = {
  FIVE: "Five",
  FOUR: "Four",
  FULL: "Full",
  THREE: "Three",
  TWOPAIR: "TwoPair",
  ONEPAIR: "OnePair",
  HIGH: "High",
};

const getHandType = (hand) => {
  const arrayedHand = hand.split("");
  const setHand = new Set(arrayedHand);

  switch (setHand.size) {
    case 1:
      return handTypes.FIVE;
    case 2:
      return arrayedHand.filter((item) => item === [...setHand][0]).length ===
        4 || arrayedHand.filter((item) => item === [...setHand][1]).length === 4
        ? handTypes.FOUR
        : handTypes.FULL;
    case 3:
      return arrayedHand.filter((item) => item === [...setHand][0]).length ===
        2 ||
        arrayedHand.filter((item) => item === [...setHand][1]).length === 2 ||
        arrayedHand.filter((item) => item === [...setHand][2]).length === 2
        ? handTypes.TWOPAIR
        : handTypes.THREE;
    case 4:
      return handTypes.ONEPAIR;
    case 5:
    default:
      return handTypes.HIGH;
  }
};

const getBetterHand = (hand1, hand2) => {
  const handType1 = getHandType(hand1);
  const handType2 = getHandType(hand2);

  if (handType1 !== handType2) {
    return handStrength.indexOf(handType1) < handStrength.indexOf(handType2)
      ? hand1
      : hand2;
  } else {
    return compareSameTypeHand(hand1, hand2);
  }
};

const compareSameTypeHand = (hand1, hand2) => {
  flag = false;
  let winner;

  for (let i = 0; i < 5; i++) {
    if (!flag && hand1[i] !== hand2[i]) {
      winner =
        cardStrength.indexOf(hand1[i]) < cardStrength.indexOf(hand2[i])
          ? hand1
          : hand2;
      flag = true;
    }
  }

  return winner;
};

const rankedHands = [];

input.forEach((singleHand) => {
  if (rankedHands.length === 0) {
    rankedHands.push(singleHand);
  } else {
    let i = 0;
    let flag = false;

    const realSingleHand = singleHand.split(" ")[0];

    while (i < rankedHands.length && !flag) {
      const rankedHand = rankedHands[i];
      const realRankedHand = rankedHand.split(" ")[0];

      if (getBetterHand(realSingleHand, realRankedHand) === realSingleHand) {
        flag = true;
        rankedHands.splice(i, 0, singleHand);
      }

      i++;
    }

    if (!flag) {
      rankedHands.push(singleHand);
    }
  }
});

let totalWin = 0;

rankedHands.reverse().forEach((rankedHand, index) => {
  totalWin += (index + 1) * Number(rankedHand.split(" ")[1]);
});

console.log("Total win", totalWin);
