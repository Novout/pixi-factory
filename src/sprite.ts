import {
  Maybe,
  PIXIDefaultSprite,
  PIXISprite,
  PIXISpriteOptions,
  PIXISpriteOpenRPG,
  PIXISpriteVelocity,
  KnockbackOptions,
  PIXIHitOptions,
} from './types';
import { hitTestRectangle, hitTestCircle } from './contain';
import GSAP, { Expo } from 'gsap';

/**
 * The Sprite object is the base for all textured objects that are rendered to the screen
 *
 * A sprite can be created directly from an resource like this:
 *
 * ```js
 * import * as PIXI from 'pixi.js';
 * import Factory from 'pixi-factory';
 * // ...
 * function setup() {
 *   const sprite = Factory.Sprite.create(new PIXI.Sprite(resources.example.texture));
 *   // ...
 * }
 *
 * // or
 *
 * import * as PIXI from 'pixi.js';
 * import { Sprite } from 'pixi-factory';
 * // ...
 * function setup() {
 *   const sprite = new Sprite().create(new PIXI.Sprite(resources.example.texture));
 *   // ...
 * }
 * ```
 *
 * @class
 */
export class PSprite {
  /**
   * A return pixi-sprite environment
   *
   * @private
   * @ignore
   */
  private _sprite: Maybe<PIXISprite>;

  constructor() {}

  /**
   * Inserts new content into the object according to the preset options.
   *
   * This function does NOT create a new PIXI.Sprite, it just takes the source object and returns a new one with the requested contents.
   *
   * ```js
   * Factory.Sprite.create(new PIXI.Sprite(resources.example.texture), {
   *   bump: true, // hability a collision properties
   *   velocity: true, // hability a velocity base content
   *   d20rpg: true // hability a standard d20 rpg
   *   content: { ... } // append itens in a base sprite
   * });
   * ```
   *
   * @public
   * @param {PIXIDefaultSprite} [sprite] The default pixi.js sprite.
   * @param {PIXISpriteOptions} [options] The options for create new sprite.
   * @return A new object sprites
   */
  public create(
    sprite: PIXIDefaultSprite,
    { bump, velocity, d20rpg, critical, content }: PIXISpriteOptions = {
      bump: true,
      velocity: true,
    } as PIXISpriteOptions,
  ): PIXISprite {
    this._sprite = sprite;

    if (content) {
      Object.entries(content).forEach((tuple) => {
        (this._sprite as PIXISprite)[tuple[0]] = tuple[1];
      });
    }

    if (bump) this.addCollisionProperties();
    if (velocity) this.addVelocityProperties();
    if (d20rpg) this.addOpenRPGProperties();
    if (critical) this.addCriticalProperties();

    return this._sprite as PIXISprite;
  }

  /**
   * Add colision in local pixi-sprite based on pixi-bump
   *
   * @private
   * @ignore
   */
  private addCollisionProperties(): this {
    if (!this._sprite) throw new Error('pixi-factory: sprite as null or undefined.');

    //centerX
    if (!this._sprite.centerX) {
      this._sprite.centerX = this._sprite.x + this._sprite.width / 2;
    }

    //centerY
    if (!this._sprite.centerY) {
      this._sprite.centerX = this._sprite.y + this._sprite.height / 2;
    }

    //halfWidth
    if (!this._sprite.halfWidth) {
      this._sprite.halfWidth = this._sprite.width / 2;
    }

    //halfHeight
    if (!this._sprite.halfHeight) {
      this._sprite.halfHeight = this._sprite.height / 2;
    }

    //xAnchorOffset
    if (!this._sprite.xAnchorOffset) {
      this._sprite.xAnchorOffset = this._sprite.anchor ? this._sprite.width * this._sprite.anchor.x : 0;
    }

    //yAnchorOffset
    if (!this._sprite.yAnchorOffset) {
      this._sprite.yAnchorOffset = this._sprite.anchor ? this._sprite.height * this._sprite.anchor.y : 0;
    }

    if (this._sprite.circular && !this._sprite.radius) {
      this._sprite.radius = this._sprite.width / 2;
    }

    this._sprite._bumpPropertiesAdded = true;

    return this;
  }

  /**
   * Add velocity properties in local pixi-sprite
   *
   * @private
   * @ignore
   */
  private addVelocityProperties(): this {
    if (!this._sprite) throw new Error('pixi-factory: sprite as null or undefined.');

    // velocity x/y
    if (!this._sprite.velocity) {
      this._sprite.velocity = {
        movement: true, // boolean for lock sprite movement
        x: 1, // vx
        y: 1, // vy
        setVelocity: (__sprite: PIXISprite, value: number) => {
          __sprite!.velocity!.x = value;
          __sprite!.velocity!.y = value;
        },
        setMovement: (__sprite: PIXISprite) => {
          __sprite!.velocity!.movement = !__sprite!.velocity!.movement;
        },
        A_knockbackHit: (
          __sprite: PIXISprite,
          content: KnockbackOptions = {
            value: 50,
            time: 0.5,
            direction: 'right',
          },
        ) => {
          // @ts-ignore
          const timeline = new GSAP.timeline({
            onStart: () => {
              if (!content.movement) __sprite.velocity.movement = false;
              __sprite.velocity.__KNOCKBACK_HIT = true;
            },
            onComplete: () => {
              if (!content.movement) __sprite.velocity.movement = true;
              __sprite.velocity.__KNOCKBACK_HIT = false;
            },
          });

          const values = { x: __sprite.x, y: __sprite.y };

          const _cond: () => void =
            {
              left: () => {
                timeline.to(
                  __sprite,
                  content.time,
                  {
                    x: (values.x -= content.value),
                    ease: Expo.easeOut,
                  },
                  'default',
                );
              },
              right: () => {
                timeline.to(
                  __sprite,
                  content.time,
                  {
                    x: (values.x += content.value),
                    ease: Expo.easeOut,
                  },
                  'default',
                );
              },
              up: () => {
                timeline.to(
                  __sprite,
                  content.time,
                  {
                    y: (values.y -= content.value),
                    ease: Expo.easeOut,
                  },
                  'default',
                );
              },
              down: () => {
                timeline.to(
                  __sprite,
                  content.time,
                  {
                    y: (values.y += content.value),
                    ease: Expo.easeOut,
                  },
                  'default',
                );
              },
            }[content.direction] ||
            (() => {
              throw new Error('pixi-factory: knockback receive unknown direction parameter');
            });
          _cond && _cond();
        },
      } as PIXISpriteVelocity;

      this._sprite._velocityPropertiesAdded = true;
    }

    return this;
  }

  /**
   * Add d20 Generic System properties in local pixi-sprite
   *
   * @private
   * @ignore
   */
  private addOpenRPGProperties(): this {
    if (!this._sprite) throw new Error('pixi-factory: sprite as null or undefined.');

    if (!this._sprite.base) {
      this._sprite.base = {
        level: 1,
        levelMax: 10,
        life: {
          HP: 8,
          minHP: 0,
          maxHP: 8,
          diceHP: 8,
          temporaryHP: 0,
        },
        armor: {
          CA: 10,
          minCA: 0,
          maxCA: 10,
          temporaryCA: 0,
        },
        resistance: {
          poisoning: false,
          bleeding: false,
          freezing: false,
          burning: false,
          charmed: false,
          stunned: false,
          bruised: false,
          imortal: false,
          poisoning_value: 0,
          bleeding_value: 0,
          freezing_value: 0,
          burning_value: 0,
          charmed_value: 0,
          stunned_value: 0,
          bruised_value: 0,
        },
        damage: {
          rollAttack: 0,
          roll: [1, 8],
          bonus: 0,
          type: 'piercing',
        },
        action: {
          attack: false,
          attack_time: 0,
          attack_hit: false,
          attack_velocity: 30,
          distance: false,
          distance_time: 0,
          distance_hit: false,
          interactive_inventory: false,
          interactive_ui: false,
          interactive_item: false,
          position: {
            x: 'left',
            y: 'up',
            area: false,
          },
          magic: {
            magic: false,
            magic_hit: false,
            magic_velocity: 30,
            magic_slot_max: 4,
            magic_slot: 4,
          },
        },
        inventory: {
          base: [],
        },
        A_levelUP: (__sprite: PIXISprite) => {
          if (__sprite.base.level >= __sprite.base.levelMax) {
            throw new Error('pixi-factory: sprite overflow max level');
          } else {
            __sprite.base.level++;
          }

          const _life = Math.floor(Math.random() * __sprite.base.life.diceHP + 1);
          __sprite.base.life.HP += _life;
          __sprite.base.life.maxHP += _life;
        },
        A_rollAttack: (__sprite: PIXISprite): number => {
          return Math.floor(Math.random() * 20) + __sprite.base.damage.rollAttack + 1;
        },
        A_rollDamage: (__sprite: PIXISprite): number => {
          return Math.floor(
            Math.random() * (__sprite.base.damage.roll[0] * __sprite.base.damage.roll[1]) +
              __sprite.base.damage.bonus +
              1,
          );
        },
        A_receiveAttack: (__sprite: PIXISprite, bonus = 0): boolean => {
          const _r = Math.floor(Math.random() * 20) + 1;
          return __sprite.base.armor.CA + __sprite.base.armor.temporaryCA <= _r + bonus;
        },
        E_hit: (r1: PIXISprite, r2: PIXISprite, options: PIXIHitOptions) => {
          let _r: Maybe<boolean>;

          if (options.type === 'rectangle') {
            _r = hitTestRectangle(r1, r2);
          } else if (options.type === 'circle') {
            _r = hitTestCircle(r1, r2);
          }

          return _r as boolean;
        },
      } as PIXISpriteOpenRPG;

      this._sprite._d20RPGPropertiesAdded = true;
    }

    return this;
  }

  /**
   * Add Critical System properties in local pixi-sprite
   *
   * @private
   * @ignore
   */
  private addCriticalProperties(): this {
    if (!this._sprite.control) {
      this._sprite.control = {
        players: [],
        onlyGM: false,
      };

      this._sprite._criticalPropertiesAdded = true;
    }

    return this;
  }
}
