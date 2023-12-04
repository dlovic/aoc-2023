import fs from "fs";
import { fileURLToPath } from "url";
import path from "path";

const dataRows = fs.readFileSync(`${path.dirname(fileURLToPath(import.meta.url))}/input.txt`, "utf8").split("\r\n");

const cardScores = [];

dataRows.forEach((row) => {
  let [winners, currentCard] = row.split(": ")[1].split(" | ");

  winners = winners
    .split(" ")
    .filter((x) => x !== "")
    .map((w) => Number(w.trim()));
  currentCard = currentCard
    .split(" ")
    .filter((x) => x !== "")
    .map((w) => Number(w.trim()));

  const winnersInCurrentCard = currentCard.filter((n) => winners.includes(n));

  let score = 0;

  console.log(winners, "|", currentCard);

  winnersInCurrentCard.forEach((winner) => {
    if (score === 0) score = 1;
    else score *= 2;
  });

  cardScores.push(score);
});

console.log(cardScores.reduce((acc, curr) => acc + curr, 0));
