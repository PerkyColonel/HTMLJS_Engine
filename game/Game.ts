import { GameObject, CollidableObject, VisibleObject,  } from "./GameObject";

export class Game {

    static PIXEL_SIZE = 4;
    static UPDATE_RATE = 1000 / 60;

    Objects: Set<GameObject>;
    CollidableObjects: Set<CollidableObject>

    constructor() {
        this.Objects = new Set();
    }

    static random(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    
    static css(element: VisibleObject, css: string) {
        element.AddClass(css);
    }

    static sample<T>(array: Array<T>) {
        return array[Math.floor(Math.random() * array.length)];
    }

    static count(ms: number) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
}