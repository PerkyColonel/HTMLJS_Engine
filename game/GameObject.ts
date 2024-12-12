import { Game } from "./Game";

export class GameObject {
	Game: Game;

	Position: {
		X: number;
		Y: number;
		Z: number;
	};

	Rotation: number;

	Scale: {
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
		this.Game = game;
		this.Position = position;
		this.Rotation = rotation;
		this.Scale = scale;
	}
	public AddToObjects() {
		this.Game.Objects.add(this);
	}
	public DeleteObject() {
		this.Game.Objects.delete(this);
	}
}

export class VisibleObject extends GameObject {
	Html: {
		parent: string;
		id: string;
		element?: string;
		ClassList?: Array<string>;
	};

	Sprite?: string;

	SetSprite: (url: string) => void;
	AddClass: (css: string) => void;
	RemoveClass: (css: string) => void;

	public RenderElement() {
		let RenderElement = document.createElement(this.Html.element ?? "div");
		RenderElement.setAttribute("id", this.Html.id);
		RenderElement.className = this.Html.ClassList?.join(" ") ?? "empty";
		document.getElementById(this.Html.parent)?.appendChild(RenderElement);
	}
	DeleteObject: () => void;
}

export interface MovableObject extends VisibleObject {
	IsMoving: boolean;
	Velocity: {
		X: number;
		Y: number;
	};
	UpdatePosition: (delta: number) => void;
}

export class CollidableObject extends VisibleObject {
	HasCollision: boolean;
	IsMovable: boolean;
	Weight: number;
	IsColliding: Boolean = false;

	CollideWith: (obj: CollidableObject) => void;
	AddToCollObjects: () => void;

	public GetSides() {
		let leftSide = this.Position.X;
		let rightSide = this.Position.X + this.Scale.X;
		let topSide = this.Position.Y;
		let botSide = this.Position.Y + this.Scale.Y;

		return {
			LeftSide: leftSide,
			RightSide: rightSide,
			TopSide: topSide,
			BotSide: botSide,
		};
	}
}

export class Entity extends CollidableObject implements MovableObject {
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
	}

	public UpdatePosition: (delta: number) => void;
}
