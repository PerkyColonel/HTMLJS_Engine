import { Background } from "./Background";
import { Game } from "./Game";

export class GameObject
{
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
  )
  {
    this.Game = game;
    this.Position = position;
    this.Rotation = rotation;
    this.Scale = scale;
  }
  public AddToObjects ()
  {
    Game.Objects.add( this );
  }
  public DeleteObject ()
  {
    Game.Objects.delete( this );
  }

  public Update () { }
  public Render () { }
}

export class VisibleObject extends GameObject
{
  Html: {
    Parent: string;
    Id: string;
    Element?: string;
    ClassList?: Array<string>;
  };

  RenderedHtml?: HTMLElement;

  Sprite?: HTMLElement;

  SetSprite ( spriteUrl: {
    url: string;
    offset: { x: number; y: number; };
    maxSteps: { X: number; Y: number; };
  } )
  {
    if ( this.RenderedHtml )
    {
      if ( this.Sprite == null )
      {
        this.RenderedHtml.style.background = "none";
        this.RenderedHtml.style.overflow = "hidden";
        let img = document.createElement( "img" );
        img.src = `${ spriteUrl.url }`;
        img.width = this.Scale.X * spriteUrl.maxSteps.X;
        img.style.transform = `translate(${ spriteUrl.offset.x }px, ${ spriteUrl.offset.y }px)`;
        this.RenderedHtml.innerHTML = "";
        this.RenderedHtml.appendChild( img );
        this.Sprite = img;
      } else
      {
        console.log( spriteUrl.offset.y );
        this.Sprite.style.transform = `translate(${ spriteUrl.offset.x * this.Scale.X * -1 }px, ${ spriteUrl.offset.y * this.Scale.Y * -1 })`;
      }
    }
  }
  AddClass ( css: string )
  {
    if ( !this.Html.ClassList )
    {
      this.Html.ClassList = [];
    }

    if ( this.Html.ClassList.includes( css ) )
    {
      return;
    }

    if ( this.Html.Id == undefined )
    {
      this.Html.Id = "id" + Math.random().toString( 36 );
    }
    this.Html.ClassList.push( css );
  }
  RemoveClass: ( css: string ) => void;

  public RenderElement ()
  {
    let RenderElement = document.createElement( this.Html.Element ?? "div" );
    RenderElement.setAttribute( "id", this.Html.Id );
    RenderElement.className = this.Html.ClassList?.join( " " ) ?? "empty";
    document.getElementById( this.Html.Parent )?.appendChild( RenderElement );
    this.RenderedHtml = RenderElement;
  }

  public Render ()
  {
    if ( this.RenderedHtml == null )
    {
      console.log( "stopRENDER" );
      return;
    }
    this.RenderedHtml.style.transform = `translate(${ this.Position.X }px, ${ this.Position.Y }px)`;
    this.RenderedHtml.style.width = this.Scale.X + "px";
    this.RenderedHtml.style.height = this.Scale.Y + "px";

  }
  DeleteObject: () => void;
}

export interface MovableObject extends VisibleObject
{
  IsMoving: boolean;
  MoveSpeed: number;
  Velocity: {
    X: number;
    Y: number;
  };
  UpdatePosition: ( delta: number ) => void;
}

export class CollidableObject extends VisibleObject
{
  HasCollision: boolean;
  IsMovable: boolean;
  Weight: number;
  IsColliding: Boolean = false;

  // CollideWith: (obj: CollidableObject) => void;

  AddToCollObjects ()
  {
    Game.CollidableObjects.add( this );
  }

  public GetSides ()
  {
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

  public CollideWith ( obj: CollidableObject )
  {
    console.log( "Colliding with object" + obj );

    if ( this.HasCollision )
    {
    }
  }

  public HandleCollision ()
  {
    for ( let object of Game.CollidableObjects )
    {
      if ( object == this )
      {
        continue;
      }

      let sides = this.GetSides();
      let objectSides = object.GetSides();

      if (
        sides.LeftSide < objectSides.RightSide &&
        sides.RightSide > objectSides.LeftSide &&
        sides.TopSide < objectSides.BotSide &&
        sides.BotSide > objectSides.TopSide
      )
      {
        this.CollideWith( object );
      }
    }
  }
}

export class Entity extends CollidableObject implements MovableObject
{
  IsMoving: boolean;
  MoveSpeed: number;
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

    weight: number
  )
  {
    super( game, position, rotation, scale );
    this.IsMoving = false;
    this.IsMovable = true;
    this.Weight = weight;

    this.Scale = scale;

    this.Velocity = {
      X: 0,
      Y: 0,
    };

    this.Setup();
  }

  public Setup ()
  {
    this.SetupHtml( this.Html );
    this.RenderElement();
    this.AddToObjects();
    this.AddToCollObjects();
  }

  public SetupHtml (
    data: {
      Parent: string;
      Id: string;
      Element?: string;
      ClassList?: Array<string>;
    } | null
  )
  {
    this.Html = {
      Parent: "canvas",
      Id: Math.random().toString( 36 ).substring( 7 ),
      Element: "div",
      ClassList: [ "entity" ],
    };
    this.Html.Parent = data?.Parent ?? "canvas";
    this.Html.Id = data?.Id ?? Math.random().toString( 36 ).substring( 7 );
    this.Html.Element = data?.Element ?? "div";
    this.Html.ClassList = data?.ClassList ?? [ "entity" ];
  }

  public UpdatePosition ( delta: number ) { }
}
