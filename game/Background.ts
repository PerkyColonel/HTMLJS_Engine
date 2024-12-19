import { Game } from "./Game";
import { GameObject, VisibleObject } from "./GameObject";

export class Background extends VisibleObject {
  Sprite?: string;

  constructor(
    game: Game,
    data?: { sprite?: string; classlist?: Array<string> }
  ) {
    super(game, { X: 0, Y: 0, Z: 0 }, 0, { X: 0, Y: 0 });
    this.Html = {
      Parent: "canvas",
      Id: "background",
      Element: "div",
    };
    this.Sprite = data?.sprite;

    this.RenderElement();
  }

  AddClass: (css: string) => void;
  RemoveClass: (css: string) => void;

  DeleteObject: () => void;
}
