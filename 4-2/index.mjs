import fs from "fs";
import { fileURLToPath } from "url";
import path from "path";

const dataRows = fs.readFileSync(`${path.dirname(fileURLToPath(import.meta.url))}/input.txt`, "utf8").split("\r\n");

const processedCards = [];

const processCard = (row, index) => {
  let [winners, currentCard] = row.split(": ")[1].split(" | ");

  winners = winners
    .split(" ")
    .filter((x) => x !== "")
    .map((w) => Number(w.trim()));
  currentCard = currentCard
    .split(" ")
    .filter((x) => x !== "")
    .map((w) => Number(w.trim()));

  const noCopiesToWin = currentCard.filter((c) => winners.includes(c)).length;

  const card = { winners, currentCard, noCopiesToWin };

  processedCards.push(card);

  for (let i = index + 1; i <= index + noCopiesToWin; i++) {
    processCard(dataRows[i], i);
  }

  return card;
};

dataRows.forEach((row, i) => {
  processCard(row, i);
});

console.log(processedCards.length);
