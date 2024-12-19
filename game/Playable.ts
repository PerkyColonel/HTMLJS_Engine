import { Game } from "./Game";
import { Entity } from "./GameObject";

export class Playable extends Entity {
	Inputs: Set<string>;

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
		}
	) {
		super(game, position, rotation, scale);

		this.Html = {
			Parent: "canvas",
			Id: "player",
			Element: "div",
			ClassList: ["player"],
		};

		this.Setup();
	}

	public Setup() {
		super.Setup();

		this.IsMoving = false;
		this.IsMovable = true;
		this.Weight = 10;
		this.Inputs = new Set();

		this.Scale = {
			X: 40,
			Y: 40,
		};

		this.SetupInputs();
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
		if (this.Inputs.has("w")) {
			this.Velocity.Y = -1;
		} else if (this.Inputs.has("s")) {
			this.Velocity.Y = 1;
		} else {
			this.Velocity.Y = 0;
		}

		if (this.Inputs.has("a")) {
			this.Velocity.X = -1;
		} else if (this.Inputs.has("d")) {
			this.Velocity.X = 1;
		} else {
			this.Velocity.X = 0;
		}
	}

	public UpdatePosition(delta: number) {
		this.Position.X += this.Velocity.X * this.MoveSpeed;
		this.Position.Y += this.Velocity.Y * this.MoveSpeed;
	}

	public SetupInputs() {
		document.addEventListener("keydown", (e) => {
			this.Inputs.add(e.key);
		});

		document.addEventListener("keyup", (e) => {
			this.Inputs.delete(e.key);
		});
	}
}
