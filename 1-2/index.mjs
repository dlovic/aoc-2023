import fs from "fs";

const dataRows = fs.readFileSync("./1-2/input.txt", "utf8").split("\r\n");

const numberMap = {
  one: "1",
  two: "2",
  three: "3",
  four: "4",
  five: "5",
  six: "6",
  seven: "7",
  eight: "8",
  nine: "9",
};

const numbers = [];

dataRows.forEach((row) => {
  let rowNumbers = [];

  for (let i = 0; i < row.length; i++) {
    const word = row.substring(0, i + 1);
    const letter = row[i];
    let found = false;

    if (!isNaN(letter)) {
      rowNumbers.push(letter);
      break;
    }

    for (const key in numberMap) {
      if (word.includes(key)) {
        rowNumbers.push(numberMap[key]);
        found = true;
      }
    }

    if (found) break;
  }

  for (let i = row.length; i > -1; i--) {
    const word = row.substring(i);
    const letter = row[i];
    let found = false;

    if (!isNaN(letter)) {
      rowNumbers.push(letter);
      break;
    }

    for (const key in numberMap) {
      if (word.includes(key)) {
        rowNumbers.push(numberMap[key]);
        found = true;
      }
    }

    if (found) break;
  }

  console.log(rowNumbers.join(""));

  numbers.push(Number(rowNumbers.join("")));
});

console.log(numbers.reduce((a, b) => a + b, 0));
