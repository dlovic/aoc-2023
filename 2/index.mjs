import fs from "fs";
import { fileURLToPath } from "url";
import path from "path";

class Hand {
  constructor(red, green, blue) {
    this.red = red;
    this.blue = blue;
    this.green = green;
  }
}

class Game {
  constructor(id) {
    this.id = id;
    this.hands = [];
  }

  isPossible(bag) {
    return this.hands.every((hand) => hand.red <= bag.red && hand.blue <= bag.blue && hand.green <= bag.green);
  }
}

const dataRows = fs.readFileSync(`${path.dirname(fileURLToPath(import.meta.url))}/input.txt`, "utf8").split("\r\n");

const games = [];

dataRows.forEach((row) => {
  const id = Number(row.split(":")[0].split(" ")[1]);
  const handsData = row
    .split(":")[1]
    .split(";")
    .map((x) => x.trim());

  const game = new Game(id);

  handsData.forEach((handData) => {
    const colors = handData.split(", ");
    const red = Number(colors.find((x) => x.includes("red"))?.split(" ")[0] ?? 0);
    const green = Number(colors.find((x) => x.includes("green"))?.split(" ")[0] ?? 0);
    const blue = Number(colors.find((x) => x.includes("blue"))?.split(" ")[0] ?? 0);

    game.hands.push(new Hand(red, green, blue));
  });

  games.push(game);
});

const bag = new Hand(12, 13, 14);

console.log(
  games
    .filter((game) => game.isPossible(bag))
    .reduce((sum, game) => {
      return sum + game.id;
    }, 0)
);
