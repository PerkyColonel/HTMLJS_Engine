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

	// AABB Detection
	public GetDetection(other: CollidableObject) {
		let T = this.GetSides();
		let O = other.GetSides();

		let otherToLeft = T.LeftSide < O.RightSide;
		let otherToRight = T.RightSide < O.LeftSide;
		let otherToTop = T.TopSide > O.BotSide;
		let otherToBot = T.BotSide < O.TopSide;

		if (otherToLeft && otherToRight && otherToTop && otherToBot) {
			this.IsColliding = true;
			return true;
		}
		this.IsColliding = false;
		return false;
	}
}
