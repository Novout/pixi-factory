/**
 * A generic template for possible undefined or null.
 *
 * @typeparam T Generic type receive
 */
export type Maybe<T> = T | undefined | null;

/**
 * A any object with key string for `new PIXI.Sprite` and `new PIXI.AnimatedSprite`
 *
 * @type {Interface}
 */
export interface PIXIDefaultSprite {
  [index: string]: any;
}

/**
 * A pixi-factory sprite environment
 *
 * ```js
 * import * as PIXI from 'pixi.js';
 * import { PSprite, Utils } from 'pixi-factory';
 * // ...
 * function setup() {
 *   const sprite: Utils.PIXISprite = new PSprite().createGenericSprite(new PIXI.Sprite(resources.example.texture));
 *   // ...
 * }
 * ```
 * @type {Interface}
 */
export interface PIXISprite extends PIXIDefaultSprite {
  /** A global x position */
  gx?: number;

  /** A global y position */
  gy?: number;

  /** A center anchor sprite x */
  centerX?: number;

  /**A center anchor sprite y */
  centerY?: number;

  /** A half width sprite */
  halfWidth?: number;

  /** A half height sprite */
  halfHeight?: number;

  /** A anchor x */
  xAnchorOffset?: number;

  /** A anchor y */
  yAnchorOffset?: number;

  /** A circular sprite value */
  circular?: number;

  /** A radius for sprite */
  radius?: number;

  /** A velocity properties */
  velocity?: PIXISpriteVelocity;

  /** A base properties */
  base?: PIXISpriteOpenRPG;

  /** `true` hability pixi-bump properties */
  _bumpPropertiesAdded?: boolean;

  /** `true` hability a velocity properties */
  _velocityPropertiesAdded?: boolean;

  /** `true` hability a generic d20 properties */
  _d20RPGPropertiesAdded?: boolean;
}

/**
 * A velocity settings for facility sprite movement
 *
 * @type {Interface}
 */
export interface PIXISpriteVelocity {
  /** `true` allows movement sprite */
  movement: boolean;

  /** velocity in x axis */
  x: number;

  /** velocity in y axis */
  y: number;

  /**
   * Set value in velocity.x and velocity.y
   *
   * ```js
   * // ...
   * sprite.velocity.setVelocity(sprite, 5);
   * // ...
   * ```
   **/
  setVelocity: (sprite: PIXISprite, value: number) => void;

  /**
   *
   * Switch boolean value for velocity.movement
   *
   * ```js
   * // ...
   * sprite.velocity.setMovement(sprite);
   * // ...
   * ```
   *
   */
  setMovement: (sprite: PIXISprite) => void;
}

/**
 * A options settings for create generic Factory.Sprite
 *
 * @type {Interface}
 */
export interface PIXISpriteOptions {
  /** `true` allows bump properties */
  bump?: boolean;

  /** `true` allows velocity properties */
  velocity?: boolean;

  /** `true` allows generic d20 system properties */
  d20rpg?: boolean;
}

/**
 * A content for generic d20 system
 *
 * @type {Interface}
 * @property {PIXISpriteOpenRPGLife} life - A life contents
 * @property {PIXISpriteOpenRPGArmor} armor - A armor contents
 * @property {PIXISpriteOpenRPGResistance} resistance - A resistance contents
 * @property {PIXISpriteOpenRPGAction} action - A action contents
 * @property {PIXISpriteOpenRPGInventory} inventory - A generic inventory contents
 */
export interface PIXISpriteOpenRPG {
  life: PIXISpriteOpenRPGLife;
  armor: PIXISpriteOpenRPGArmor;
  resistance: PIXISpriteOpenRPGResistance;
  action: PIXISpriteOpenRPGAction;
  inventory: PIXISpriteOpenRPGInventory;
}

/**
 * A life implement
 *
 * @type {Interface}
 * @property {number} HP - a hp value for sprite
 * @property {number} minHP - a minimal hp value
 * @property {number} maxHP - a max hp value
 * @property {number} temporaryHP - a optional temporary hp
 */
export interface PIXISpriteOpenRPGLife {
  HP: number;
  minHP: number;
  maxHP: number;
  temporaryHP: number;
}

/**
 * A CA implement
 *
 * @type {Interface}
 * @property {number} CA - a class armor value for sprite
 * @property {number} minCA - a minimal class armor value
 * @property {number} maxCA - a max class armor value
 * @property {number} temporaryCA - a optional temporary class armor
 */
export interface PIXISpriteOpenRPGArmor {
  CA: number;
  minCA: number;
  maxCA: number;
  temporaryCA: number;
}

/**
 * A resistance and tick damage implement
 *
 * @type {Interface}
 * @property {boolean} poisoning - a poisoning status
 * @property {boolean} bleeding - a bleeding status
 * @property {boolean} freezing - a freezing status
 * @property {boolean} burning - a burning status
 * @property {boolean} charmed - a charmed status
 * @property {boolean} stunned - a stunned status
 * @property {boolean} bruised - a bruised status
 * @property {boolean} imortal - a imortal status
 * @property {number} poisoning_value - a poisoning damage value
 * @property {number} bleeding_value - a bleeding damage value
 * @property {number} freezing_value - a freezing damage value
 * @property {number} burning_value - a burning damage value
 * @property {number} charmed_value - a charmed damage value
 * @property {number} stunned_value - a stunned damage value
 * @property {number} bruised_value - a bruised damage value
 */
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
}

/**
 * A actions implement (attack, distance, interactive, magic)
 *
 * @type {Interface}
 * @property {boolean} attack - Boolean to check if the sprite is attacking (melee) or not
 * @property {number} attack_time - Increment in a tick time if a attack `true`
 * @property {boolean} attack_hit - for a colission set `true` for enemy receive damage
 * @property {number} attack_velocity - for a animated sprite time
 * @property {boolean} distance - Boolean to check if the sprite is attacking (distance) or not
 * @property {boolean} distance_time - Increment in a tick time if a distance `true`
 * @property {boolean} distance_hit - for a colission set `true` for enemy receive damage
 * @property {boolean} interactive_inventory - `true` in open inventory
 * @property {number} interactive_ui - `true` in a generic interactive ui
 * @property {number} interactive_item - `true` in a generic interactive item
 * @property {PIXISpriteOpenRPGActionPosition} position - position in center camera
 * @property {PIXISpriteOpenRPGActionMagic} magic - a magic utilities
 */
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

/**
 * A actions implement (attack, distance, interactive, magic)
 *
 * @type {Interface}
 * @property {string | number} x - A x camera direction for random utils(interactive sound, invert sprite, etc..)
 * @property {string | number} y - A y camera direction for random utils(interactive sound, invert sprite, etc..)
 * @property {boolean} area - A area specific utils for a sprite size
 */
export interface PIXISpriteOpenRPGActionPosition {
  x: string | number;
  y: string | number;
  area: boolean;
}

/**
 * A magic content implement
 *
 * @type {Interface}
 * @property {boolean} magic - Sprite is a magic conjurer
 * @property {boolean} magic_hit - A magic hit other sprite
 * @property {number} magic_velocity - A target magic with time to hit enemy
 * @property {number} magic_slot_max - A max slot magic's
 * @property {number} magic_slot - A actual magic slots
 */
export interface PIXISpriteOpenRPGActionMagic {
  magic: boolean;
  magic_hit: boolean;
  magic_velocity: number;
  magic_slot_max: number;
  magic_slot: number;
}

/**
 * A inventory content implement
 *
 * @type {Interface}
 * @property {Array<any>} base - A generic array with items for render/interactive
 */
export interface PIXISpriteOpenRPGInventory {
  base: Array<any>;
}
