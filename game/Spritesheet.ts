import { VisibleObject } from "./GameObject";
import KnightIdle from '../assets/spritesheets/knight/idle.png';

export class Spritesheet
{
    Character: string

    currentSprite: string

    SpritesheetFolder: string

    MaxSteps: number

    CurrStep: number


    constructor(character: string)
    {
        this.Character = character;
        this.CurrStep = 0;
        
    }

    public SetIdle()
    {
        if (this.Character == "knight")
        {
            this.currentSprite = KnightIdle;
        }
        return "a";
    }

    public NextSprite(obj: VisibleObject)
    {
        obj.SetSprite({url: this.currentSprite, offset: {x: this.CurrStep, y: 0}})
    }
}