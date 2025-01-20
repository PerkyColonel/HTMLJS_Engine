import { Game } from "./Game";
import { GameObject } from "./GameObject";
import { Playable } from "./Playable";
import { Spritesheet } from "./Spritesheet";

export class Player extends Playable {

  Spritesheet : Spritesheet
  Character : string
  LocalParts: Set<GameObject>
  HitBoxes: Set<GameObject>
  HurtBoxes: Set<GameObject>



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

    character: string,
    
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
		},

    
  ) {
    super(game, position, rotation, scale, InputMap, Html);

    this.LocalParts = new Set<GameObject>();
    this.HitBoxes = new Set<GameObject>();
    this.HurtBoxes = new Set<GameObject>();
    this.Character = character;
    this.Spritesheet = new Spritesheet(this.Character);
    this.Spritesheet.SetIdle();
    
  }

  public Render()
  {
    super.Render();
    this.Spritesheet.NextSprite(this);
  }


}
