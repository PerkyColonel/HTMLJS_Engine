import { GameObject, CollidableObject, VisibleObject } from "./GameObject";

export class Game {
	static PIXEL_SIZE = 4;
	static UPDATE_RATE = 1000 / 60;
	static STATE = "PLAYING";

	static Objects: Set<GameObject> = new Set();
	static CollidableObjects: Set<CollidableObject> = new Set();

	static Time: number = 0;

	static random(min: number, max: number) {
		return Math.floor(Math.random() * (max - min + 1) + min);
	}

	static css(element: VisibleObject, css: string) {
		element.AddClass(css);
	}

	static sample<T>(array: Array<T>) {
		return array[Math.floor(Math.random() * array.length)];
	}

	static Update() {
		for (let object of Game.Objects) {
			object.Update();
			object.Render();
		}
	}

	static MainLoop() {
		if (Game.STATE == "PLAYING") {
			Game.Update();
		}
		if (Game.Time > Game.UPDATE_RATE) {
			Game.Time = 0;
		}
		requestAnimationFrame(Game.MainLoop);
	}

	static Start() {
		Game.MainLoop();
		Game.KeepTime();
	}

	static Pauze() {
		Game.STATE = "PAUZED";
	}

	static KeepTime() {
		Game.Time++;
		setTimeout(Game.KeepTime, this.UPDATE_RATE);
	}
}
