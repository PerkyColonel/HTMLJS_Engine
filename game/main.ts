import { Background } from "./Background";
import { Game } from "./Game";
import { Playable } from "./Playable";

const game: Game = new Game();

new Background(game);
new Playable(game, { X: 0, Y: 100, Z: 0 }, 0, { X: 10, Y: 10 });
new Playable(
	game,
	{ X: 1000, Y: 100, Z: 0 },
	0,
	{ X: 10, Y: 10 },
	{ Up: "ArrowUp", Down: "ArrowDown", Left: "ArrowLeft", Right: "ArrowRight" },
	{
		Parent: "canvas",
		Id: "player2",
		Element: "div",
		ClassList: ["player"],
	}
);
Game.Start();
