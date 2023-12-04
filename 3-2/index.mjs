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
        if (char !== ".") symbols.push({ x, y, symbol: char, numbers: new Set() });
        if (numberToStore !== "") numbers.push({ number: Number(numberToStore), x: x - numberToStore.length, y });
        numberToStore = "";
    }
  });
});

numbers.forEach((number) => {
  symbols.forEach((symbol, si) => {
    for (let i = 0; i < number.number.toString().length; i++) {
      const a = symbol.x - (number.x + i);
      const b = symbol.y - number.y;
      const c = Math.hypot(a, b);

      if (c === 1 || c === Math.hypot(1, 1)) {
        symbols[si].numbers.add(`${number.x + i},${number.y},${number.number}`);
        break;
      }
    }
  });
});

const gears = symbols.filter((symbol) => symbol.symbol === "*" && symbol.numbers.size === 2);

console.log(
  gears.reduce((sum, gear) => {
    const [a, b] = Array.from(gear.numbers).map((number) => number.split(",")[2]);
    return sum + Number(a) * Number(b);
  }, 0)
);
