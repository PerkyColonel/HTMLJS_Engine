import { GameObject, CollidableObject, VisibleObject } from "./GameObject";

export class Game {
	static PIXEL_SIZE = 4;
	static UPDATE_RATE = 60;
	static STATE = "PLAYING";

	static Objects: Set<GameObject> = new Set();
	static CollidableObjects: Set<CollidableObject> = new Set();
	static Inputs: Set<string> = new Set();

	static Time: number = 0;
	static TimeRunning: number = 0;

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

			if (object instanceof CollidableObject) {
				object as CollidableObject;
				object.HandleCollision();
			}
		}
	}

	static async MainLoop() {
		if (Game.STATE == "PLAYING") {
			Game.KeepTime()
			await Game.Update();
		}
		if (Game.Time >= Game.UPDATE_RATE) {
			Game.Time = 0;
		}
		requestAnimationFrame(Game.MainLoop);
	}

	static Start() {
		Game.MainLoop();
		Game.KeepTime();
		Game.SetupInputs();
	}

	static SetupInputs() {
		document.addEventListener("keydown", (e) => {
			Game.Inputs.add(e.key);
		});

		document.addEventListener("keyup", (e) => {
			Game.Inputs.delete(e.key);
		});
	}

	static Pauze() {
		Game.STATE = "PAUZED";
	}

	static KeepTime() {
		Game.Time++;
		Game.TimeRunning++;
	}
}
