import { Background } from "./Background";
import { Game } from "./Game";
import { Playable } from "./Playable";

const game: Game = new Game();

new Background(game);
new Playable(game, { X: 0, Y: 0, Z: 0 }, 0, { X: 10, Y: 10 });
Game.Start();
