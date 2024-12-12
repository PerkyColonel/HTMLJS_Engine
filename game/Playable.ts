import { Game } from "./Game";
import { CollidableObject, MovableObject } from "./GameObject";

class Playable extends CollidableObject implements MovableObject {
	Inputs: Set<string> = new Set();

	IsMoving: boolean;
	Velocity: {
		X: number;
		Y: number;
	};

	constructor(
		game: Game,

		position: {
			X: number;
			Y: number;
			Z: number;
		},

		rotation: number,

		scale: {
			X: number;
			Y: number;
		}
	) {
		super(game, position, rotation, scale);
		this.IsMoving = false;
		this.IsMovable = true;
		this.Weight = 10;
	}

	public UpdatePosition(delta: number) {
		console.log(this.Inputs);
	}
}
