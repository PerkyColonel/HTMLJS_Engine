import { VisibleObject } from "./GameObject";
import { Game } from "./Game";

import KnightIdle from '../assets/spritesheets/knight/idle.png';

export class Spritesheet
{
    Character: string

    currentSprite: string

    SpritesheetFolder: string

    maxSteps: {X: number, Y: number}

    CurrStep: number

    Ystep: number


    constructor(character: string)
    {
        this.Character = character;
        this.CurrStep = 0;
        this.Ystep = 0;
    }

    public SetIdle()
    {
        if (this.Character == "knight")
        {
            this.currentSprite = KnightIdle;
            this.maxSteps = {X: 10, Y: 0}
        }
        return "a";
    }

    public NextSprite(obj: VisibleObject)
    {
        if ((Game.Time % 24) != 0)
            {
                return;
            }
        
        obj.SetSprite({url: this.currentSprite, offset: {x: this.CurrStep, y: this.Ystep}, maxSteps: this.maxSteps})
        this.CurrStep += 1;
        if (this.CurrStep >= this.maxSteps.X)
        {
            this.CurrStep = 0;
            if (this.Ystep >= this.maxSteps.Y)
            {
                this.Ystep = 0;
            }
            else {
                this.Ystep += 1;
            }
        }
    }
}