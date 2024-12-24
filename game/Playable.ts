import { Game } from "./Game";
import { Entity } from "./GameObject";

export class Playable extends Entity {
	InputMap: {
		Up: string;
		Down: string;
		Left: string;
		Right: string;
	};

	MoveSpeed = 5;
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
		},

		InputMap: {
			Up: string;
			Down: string;
			Left: string;
			Right: string;
		} = {
			Up: "w",
			Down: "s",
			Left: "a",
			Right: "d",
		},

		Html: {
			Parent: string;
			Id: string;
			Element: string;
			ClassList: Array<string>;
		} = {
			Parent: "canvas",
			Id: "player",
			Element: "div",
			ClassList: ["player"],
		}
	) {
		super(game, position, rotation, scale, 10);

		this.Html = Html;

		this.InputMap = InputMap;

		this.Setup();
	}

	public Setup() {
		super.Setup();

		Game.Inputs;

		this.Scale = {
			X: 40,
			Y: 40,
		};
	}

	public SetupHtml(
		data: {
			Parent: string;
			Id: string;
			Element?: string;
			ClassList?: Array<string>;
		} | null
	): void {
		if (data) {
			this.Html = data;
		}

		super.SetupHtml(this.Html);
	}

	public Update(): void {
		this.UpdatePosition(Game.Time);
		this.HandleInputs();
	}

	public HandleInputs() {
		if (Game.Inputs.has(this.InputMap.Up)) {
			this.Velocity.Y = -1;
		} else if (Game.Inputs.has(this.InputMap.Down)) {
			this.Velocity.Y = 1;
		} else {
			this.Velocity.Y = 0;
		}

		if (Game.Inputs.has(this.InputMap.Left)) {
			this.Velocity.X = -1;
		} else if (Game.Inputs.has(this.InputMap.Right)) {
			this.Velocity.X = 1;
		} else {
			this.Velocity.X = 0;
		}
	}

	public UpdatePosition(delta: number) {
		this.Position.X += this.Velocity.X * this.MoveSpeed;
		this.Position.Y += this.Velocity.Y * this.MoveSpeed;
	}
}
