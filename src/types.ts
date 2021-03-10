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

/**
 * A velocity settings for facility sprite movement
 *
 * @type {Interface}
 * @property {boolean} movement - `true` allows movement sprite
 * @property {boolean} x - velocity in x axis
 * @property {boolean} y - velocity in y axis
 * @property {function} setVelocity - set value in velocity.x and velocity.y
 * @property {function} setMovement - switch boolean value for velocity.movement
 */
export interface PIXISpriteVelocity {
  movement: boolean;
  x: number;
  y: number;
  setVelocity: (sprite: PIXISprite, value: number) => void;
  setMovement: (sprite: PIXISprite) => void;
}

/**
 * A options settings for create generic Factory.Sprite
 *
 * @type {Interface}
 * @property {boolean} bump - `true` allows bump properties
 * @property {boolean} velocity - `true` allows velocity properties
 * @property {boolean} d20rpg - `true` allows generic d20 system properties
 */
export interface PIXISpriteOptions {
  bump?: boolean;
  velocity?: boolean;
  d20rpg?: boolean;
}

/**
 * A content for generic d20 system
 *
 * @type {Interface}
 */
export interface PIXISpriteOpenRPG {
  life: PIXISpriteOpenRPGLife;
  armor: PIXISpriteOpenRPGArmor;
  resistance: PIXISpriteOpenRPGResistance;
  action: PIXISpriteOpenRPGAction;
  inventory: Array<any>;
}

export interface PIXISpriteOpenRPGLife {
  HP: number;
  minHP: number;
  maxHP: number;
  temporaryHP: number;
}

export interface PIXISpriteOpenRPGArmor {
  CA: number;
  minCA: number;
  maxCA: number;
  temporaryCA: number;
}

export interface PIXISpriteOpenRPGResistance {
  poisoning: boolean;
  bleeding: boolean;
  freezing: boolean;
  burning: boolean;
  charmed: boolean;
  stunned: boolean;
  bruised: boolean;
  imortal: boolean;
  poisoning_value: number;
  bleeding_value: number;
  freezing_value: number;
  burning_value: number;
  charmed_value: number;
  stunned_value: number;
  bruised_value: number;
  imortal_value: number;
}

export interface PIXISpriteOpenRPGAction {
  attack: boolean;
  attack_time: number;
  attack_hit: boolean;
  attack_velocity: number;
  distance: boolean;
  distance_time: number;
  distance_hit: boolean;
  interactive_inventory: boolean;
  interactive_ui: boolean;
  interactive_item: boolean;
  position: PIXISpriteOpenRPGActionPosition;
  magic: PIXISpriteOpenRPGActionMagic;
}

export interface PIXISpriteOpenRPGActionPosition {
  x: string | number;
  y: string | number;
  area: boolean;
}

export interface PIXISpriteOpenRPGActionMagic {
  magic: boolean;
  magic_hit: boolean;
  magic_velocity: number;
  magic_slot_max: number;
  magic_slot: number;
}
