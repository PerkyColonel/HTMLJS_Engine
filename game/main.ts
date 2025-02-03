import { Background } from "./Background";
import { Game } from "./Game";
import { Playable } from "./Playable";
import { Player } from "./Player";


const game: Game = new Game();

new Background(game);
let Player1 = new Player(game, { X: 0, Y: 100, Z: 0 }, 0, { X: 360, Y: 240 }, "knight");


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
// setTimeout(Game.Pauze, 10000)