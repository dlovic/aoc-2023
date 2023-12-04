import fs from "fs";
import { fileURLToPath } from "url";
import path from "path";

const dataRows = fs.readFileSync(`${path.dirname(fileURLToPath(import.meta.url))}/input.txt`, "utf8").split("\r\n");
const numbers = [];
const symbols = [];

let numberToStore = "";

dataRows.forEach((row, y) => {
  row.split("").forEach((char, x) => {
    switch (true) {
      case !isNaN(char):
        numberToStore += char;

        if (x === row.length - 1 && numberToStore !== "") {
          numbers.push({ number: Number(numberToStore), x: x - numberToStore.length, y });
          numberToStore = "";
        }

        break;
      case isNaN(char):
        if (char !== ".") symbols.push({ x, y, symbol: char });
        if (numberToStore !== "") numbers.push({ number: Number(numberToStore), x: x - numberToStore.length, y });
        numberToStore = "";
    }
  });
});

const lonelyNumbers = [];

numbers.forEach((number) => {
  const hasAdjacentSymbol = symbols.some((symbol) => {
    for (let i = 0; i < number.number.toString().length; i++) {
      const a = symbol.x - (number.x + i);
      const b = symbol.y - number.y;
      const c = Math.hypot(a, b);

      if (c === 1 || c === Math.hypot(1, 1)) return true;
    }
  });

  if (!hasAdjacentSymbol) {
    lonelyNumbers.push(number);
  }
});

console.log(numbers.filter((number) => !lonelyNumbers.includes(number)).reduce((acc, curr) => acc + curr.number, 0));
