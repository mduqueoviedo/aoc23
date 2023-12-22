const fs = require("fs");
const input = fs.readFileSync("./input.txt", "utf-8").trim().split("\n\n");

const createMap = (mapping) => {
  const mapLines = mapping.split("\n").slice(1);

  const finalMap = [];
  mapLines.forEach((mapLine) => {
    const line = mapLine.split(" ").map(Number);

    finalMap.push({
      beg: line[1],
      end: line[1] + line[2],
      diff: line[0] - line[1],
    });
  });

  return finalMap;
};

const applyMappingToNumber = (num, mapping) => {
  const found = mapping.find(
    (mapLine) => num >= mapLine.beg && num <= mapLine.end
  );

  if (!found) {
    return num;
  } else {
    return num + found.diff;
  }
};

let lowestLocation;

const seeds = input[0].split(":")[1].trim().split(" ").map(Number);

const seedToSoil = createMap(input[1]);
const soilToFertilizer = createMap(input[2]);
const fertilizerToWater = createMap(input[3]);
const waterToLight = createMap(input[4]);
const lightToTemperature = createMap(input[5]);
const temperatureToHumidity = createMap(input[6]);
const humidityToLocation = createMap(input[7]);

// 50 98 2 --> destination, source, range

seeds.forEach((singleSeed) => {
  let finalLocation = applyMappingToNumber(singleSeed, seedToSoil);
  finalLocation = applyMappingToNumber(finalLocation, soilToFertilizer);
  finalLocation = applyMappingToNumber(finalLocation, fertilizerToWater);
  finalLocation = applyMappingToNumber(finalLocation, waterToLight);
  finalLocation = applyMappingToNumber(finalLocation, lightToTemperature);
  finalLocation = applyMappingToNumber(finalLocation, temperatureToHumidity);
  finalLocation = applyMappingToNumber(finalLocation, humidityToLocation);

  lowestLocation =
    !lowestLocation || finalLocation < lowestLocation
      ? finalLocation
      : lowestLocation;
});

console.log("Lowest location is", lowestLocation);
