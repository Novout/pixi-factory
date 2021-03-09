export type Maybe<T> = T | undefined | null;

export interface PIXIDefaultSprite {
  [index: string]: any;
}

export interface PIXISprite extends PIXIDefaultSprite {
  gx?: number;
  gy?: number;
  centerX?: number;
  centerY?: number;
  halfWidth?: number;
  halfHeight?: number;
  xAnchorOffset?: number;
  yAnchorOffset?: number;
  circular?: number;
  radius?: number;
  velocity?: PIXISpriteVelocity;
  base?: PIXISpriteOpenRPG;
  _bumpPropertiesAdded?: boolean;
  _velocityPropertiesAdded?: boolean;
  _d20RPGPropertiesAdded?: boolean;
}

export interface PIXISpriteVelocity {
  movement: boolean;
  x: number;
  y: number;
}

export interface PIXISpriteOptions {
  bump?: boolean;
  velocity?: boolean;
  d20rpg?: boolean;
}

export interface PIXISpriteOpenRPG {
  [index: string]:
    | Record<string, Record<any, any> | string | boolean | number>
    | string
    | boolean
    | Array<any>
    | number;
}
