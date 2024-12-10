import { Game } from "./Game";
import { CollidableObject } from "./GameObject";

export class HitBox extends CollidableObject {
	ShowBox: boolean;

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
	}

	public GetDetection(other: CollidableObject) {
		let T = this.GetSides();
		let O = other.GetSides();
	}
}
