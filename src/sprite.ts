import {
  Maybe,
  PIXIDefaultSprite,
  PIXISprite,
  PIXISpriteOptions,
  PIXISpriteOpenRPG,
  PIXISpriteVelocity,
  KnockbackOptions,
} from './types';
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
 *   const sprite = Factory.Sprite.createGenericSprite(new PIXI.Sprite(resources.example.texture));
 *   // ...
 * }
 *
 * // or
 *
 * import * as PIXI from 'pixi.js';
 * import { PSprite } from 'pixi-factory';
 * // ...
 * function setup() {
 *   const sprite = new PSprite().createGenericSprite(new PIXI.Sprite(resources.example.texture));
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
   */
  private _sprite: Maybe<PIXISprite>;

  constructor() {}

  /**
   * Inserts new content into the object according to the your options. This method serves only to facilitate an attachment of content to the object.
   *
   * This function does NOT create a new PIXI.Sprite, it just takes the source object and returns a new one with the requested contents.
   *
   * ```js
   * const player = Factory.Sprite.createSpecificSprite(new PIXI.Sprite(resources.example.texture), { name: 'guest001' });
   * console.log(player.name) // guest001
   * ```
   *
   * @public
   * @param {PIXIDefaultSprite} [sprite] The default pixi.js sprite.
   * @param {Record<string, any>} [content] A Object with options for create new sprite.
   * @return A new object sprites
   */
  public createSpecificSprite(sprite: PIXIDefaultSprite, content: Record<string, any>): PIXISprite {
    this._sprite = sprite;

    // Insert contents and overload a existent properties.
    Object.entries(content).forEach((tuple) => {
      (this._sprite as PIXISprite)[tuple[0]] = tuple[1];
    });

    return this._sprite as PIXISprite;
  }

  /**
   * Inserts new content into the object according to the preset options.
   *
   * This function does NOT create a new PIXI.Sprite, it just takes the source object and returns a new one with the requested contents.
   *
   * ```js
   * Factory.Sprite.createGenericSprite(new PIXI.Sprite(resources.example.texture), {
   *   bump: true, // hability a collision properties
   *   velocity: true, // hability a velocity base content
   *   d20rpg: true // hability a standard d20 rpg
   * });
   * ```
   *
   * @public
   * @param {PIXIDefaultSprite} [sprite] The default pixi.js sprite.
   * @param {PIXISpriteOptions} [options] The options for create new sprite.
   * @return A new object sprites
   */
  public createGenericSprite(
    sprite: PIXIDefaultSprite,
    { bump, velocity, d20rpg }: PIXISpriteOptions = {
      bump: true,
      velocity: true,
    } as PIXISpriteOptions,
  ): PIXISprite {
    this._sprite = sprite;

    if (bump) this.addCollisionProperties();
    if (velocity) this.addVelocityProperties();
    if (d20rpg) this.addOpenRPGProperties();

    return this._sprite as PIXISprite;
  }

  /**
   * Add colision in local pixi-sprite based on pixi-bump
   *
   * @private
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
   */
  private addOpenRPGProperties(): this {
    if (!this._sprite) throw new Error('pixi-factory: sprite as null or undefined.');

    if (!this._sprite.base) {
      this._sprite.base = {
        life: {
          HP: 0,
          minHP: 0,
          maxHP: 0,
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
      } as PIXISpriteOpenRPG;

      this._sprite._d20RPGPropertiesAdded = true;
    }

    return this;
  }
}
