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
  __KNOCKBACK_HIT?: boolean;
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
  setVelocity: (__sprite: PIXISprite, value: number) => void;

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
  setMovement: (__sprite: PIXISprite) => void;

  /**
   * Action: Sprite receive hit movement
   *
   * ```ts
   * sprite.velocity.A_knockbackHit(sprite, {
   *  value: 50, // quantity for movement value move
   *  time: 0.5, // time to execute value
   *  direction: 'right' // direction to sprite move
   * })
   * ```
   *
   * @param __sprite Actually object referal
   * @param content Definitions for knockback effect
   */
  A_knockbackHit: (__sprite: PIXISprite, content: KnockbackOptions) => void;
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
 */
export interface PIXISpriteOpenRPG {
  level: number;
  levelMax: number;
  life: PIXISpriteOpenRPGLife;
  armor: PIXISpriteOpenRPGArmor;
  resistance: PIXISpriteOpenRPGResistance;
  damage: PIXISpriteOpenRPGDamage;
  action: PIXISpriteOpenRPGAction;
  inventory: PIXISpriteOpenRPGInventory;

  /** Level up sprite with random content */
  A_levelUP: (__sprite: PIXISprite) => void;

  /** Roll base attack */
  A_rollAttack: (__sprite: PIXISprite) => number;

  /** Roll base damage */
  A_rollDamage: (__sprite: PIXISprite) => number;

  /** `true` that means the target's AC value is less than the opponent's attack roll */
  A_receiveAttack: (__sprite: PIXISprite, bonus?: number) => boolean;
}

/**
 * A life implement
 *
 * @type {Interface}
 */
export interface PIXISpriteOpenRPGLife {
  HP: number;
  minHP: number;
  maxHP: number;

  /** based on d&d 5e implement */
  diceHP: number;
  temporaryHP: number;
}

/**
 * A CA implement
 *
 * @type {Interface}
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
 */
export interface PIXISpriteOpenRPGInventory {
  /** A generic array with items for render/interactive */
  base: Array<any>;
}

/**
 * A damage attack content implement
 *
 * @type {Interface}
 */
export interface PIXISpriteOpenRPGDamage {
  /** bonus in d20 roll attack */
  rollAttack: number;
  /** Array with two options: roll[0] is dice numbers and roll[1] is type for dice: [1, 8]: 1d8 */
  roll: Array<number>;

  /** Adicional bônus damage */
  bonus: number;

  /** Attack type  */
  type: string;
}

/**
 * Options for effect knockback in target
 *
 * @type {Interface}
 */
export interface KnockbackOptions {
  /** base value for all time duration in absolute values (x/y) */
  value: number;

  /** duration for value in seconds */
  time: number;

  /** Direction with enemy hit receive 'left', 'right', 'up', 'down' */
  direction: string;

  /** `true` hability velocity.movement in animation knockback */
  movement?: boolean;
}
