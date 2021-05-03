import { hitTestRectangle } from './contain';
import {
  PIXISprite,
  PIXISimpleGroupOptions,
  PIXISpriteGroup,
  PIXIGroupKey,
  PIXISpriteGroupKey,
  Maybe,
  PIXIGroupArea,
} from './types';

/**
 * The default group generate for create function.
 *
 * It is recommended to use the group using as keys to facilitate the handling of removing / adding new sprites in the group.
 *
 * ```ts
 * import * as PIXI from 'pixi.js';
 * import Factory, { Utils, Group } from 'pixi-factory';
 * // ...
 * function setup() {
 *  const sprite: Utils.PIXISprite = Factory.Sprite.create(new PIXI.Sprite(resources.example.texture));
 *  const group: Group = Factory.Group.create([ sprite ], { container: app.stage });
 *  // ...
 * }
 * ```
 *
 * @class
 */
export class SimpleGroup {
  /** A sprite list belonging in group
   * @ignore
   */
  private list: Array<PIXISprite>;

  /** A `PIXI.Container` required
   * @ignore
   */
  private container: any;

  /** A define group search based in key members
   * @ignore
   */
  private __GROUP_KEY = false;

  /** A define group search based in array position member
   * @ignore
   */
  private __NUMBER_KEY = false;

  /** define a debugger border
   * @ignore
   */
  private __DEBUGGER_LINE = false;

  /** a min-max for area active effects. default is min a actually width/height and max is a multiple by 2
   * @ignore
   */
  private area: PIXIGroupArea;

  /**
   * @param {Array<PIXISpriteGroup>} [_list] A `PIXI.Sprite` or a `Factory.Sprite` array.
   * @param {PIXISimpleGroupOptions} [options] Options for create a group sprite.
   */
  constructor(_list: Array<PIXISpriteGroup>, options: PIXISimpleGroupOptions) {
    this.area = { min: { height: 0, width: 0 }, max: { height: 0, width: 0 } };

    if (options.key) {
      this.keySetter(_list as Array<PIXISpriteGroupKey>, options);
    } else {
      this.defaultSetter(_list as Array<PIXISprite>, options);
    }
  }

  /**
   *
   * @param _list A `PIXI.Sprite` or a `Factory.Sprite` array.
   * @param options Options for create a group sprite.
   * @ignore
   */
  private keySetter(_list: Array<PIXISpriteGroupKey>, options: PIXISimpleGroupOptions): void {
    this.list = [];
    this.__GROUP_KEY = true;

    _list.forEach((item: PIXISpriteGroupKey) => {
      (item[1] as PIXISprite).__GROUP_KEY = item[0] as string;
      this.list.push(item[1] as PIXISprite);
    });

    this.setGroup(_list, options);
  }

  /**
   *
   * @param _list A `PIXI.Sprite` or a `Factory.Sprite` array.
   * @param options Options for create a group sprite.
   * @ignore
   */
  private defaultSetter(_list: Array<PIXISprite>, options: PIXISimpleGroupOptions): void {
    this.list = _list;
    this.__NUMBER_KEY = true;

    this.setGroup(_list, options);
  }

  /**
   *
   * @param _list A `PIXI.Sprite` or a `Factory.Sprite` array.
   * @param options Options for create a group sprite.
   * @ignore
   */
  private setGroup(_list: Array<PIXISprite>, options: PIXISimpleGroupOptions): void {
    this.container = options.container;

    if (!options.cleanControl) {
      this.setGroupInSprite();
    }

    if (options.position) {
      if (options.position.length === 2) {
        this.container.position.set(options.position[0], options.position[1]);
      } else {
        throw new Error('pixi-factory: options.position is wrong array, correct example: position = [50, 50]');
      }
    }

    this.list.forEach((sprite: PIXISprite) => {
      this.container.addChild(sprite);
    });

    if (options.size) {
      this.container.width = options.size.width;
      this.container.height = options.size.height;
    }

    if (!options.area) {
      this.area.min = { width: this.container.width, height: this.container.height };
      this.area.max = { width: this.container.width * 2, height: this.container.height * 2 };
    } else {
      this.area = options.area;
    }

    if (options.random) {
      this.generateRandom();
    }
  }

  /**
   * Set a `_simpleGroupAdded` in a sprite object.
   * @ignore
   */
  private setGroupInSprite(): void {
    this.list.map((sprite: PIXISprite) => (sprite._simpleGroupAdded = true));
  }

  /**
   * @ignore
   */
  private generateRandom() {
    this.list.map((sprite: PIXISprite) => {
      const max = {
        x: this.area.min.width - sprite.width,
        y: this.area.min.height - sprite.height,
      };

      sprite.x = Math.random() * max.x;
      sprite.y = Math.random() * max.y;
    });
  }

  /**
   *
   * @param stage A `PIXI.Container` for addChild
   * @returns this
   */
  public append(stage: any): this {
    stage.addChild(this.container);

    return this;
  }

  /**
   *
   * @returns A `Factory.Sprite` array
   */
  public gets(): Array<PIXISprite> {
    return this.list;
  }

  /**
   *
   * @param _list A `PIXI.Sprite` or a `Factory.Sprite` array.
   * @param options Options for create a group sprite.
   */
  public setSprites(_list: Array<PIXISprite>, options: PIXISimpleGroupOptions): void {
    this.defaultSetter(_list, options);
  }

  /**
   *
   * @returns A `PIXI.Container`
   */
  public getContainer(): any {
    return this.container;
  }

  /**
   *
   * @param stage Set a new `PIXI.Container`
   */
  public setContainer(stage: any): void {
    this.container = stage;
  }

  /**
   *
   * @returns A area property
   */
  public getArea(): PIXIGroupArea {
    return this.area;
  }

  /**
   *
   * @param area Set a new area property
   */
  public setArea(area: PIXIGroupArea): void {
    this.area = area;
  }

  /**
   *
   * @param key A key for search `Factory.Sprite`
   * @returns A `Factory.Sprite` in group list
   */
  public get(key: PIXIGroupKey): PIXISprite {
    let item: Maybe<PIXISprite>;

    if (typeof key === 'string' && !this.__GROUP_KEY) {
      throw new Error('pixi-sprite: key as not enable, in this group, go through the options key: true');
    }

    if (typeof key === 'number' && this.__GROUP_KEY) {
      throw new Error('pixi-sprite: not to search for the number while is key enabled.');
    }

    if (this.__GROUP_KEY) {
      const _item = this.list.filter((sprite: PIXISprite) => sprite.__GROUP_KEY === (key as string));
      if (_item.length === 1) {
        item = _item[0];
      } else {
        throw new Error('pixi-factory: not exists element or a duplicated element in a array');
      }
    } else {
      item = this.list[key as number];
    }

    if (!item) throw new Error('pixi-factory: sprite not exists in group');

    return item;
  }

  /**
   * Insert a new sprite in a group
   *
   * @param sprite A new `Factory.Sprite` insert in a group array
   */
  public add(sprite: PIXISpriteGroup) {
    if (this.__GROUP_KEY) {
      const _sprite = sprite as PIXISpriteGroupKey;
      (_sprite[1] as PIXISprite).__GROUP_KEY = _sprite[0] as string;
      this.list.push(_sprite[1] as PIXISprite);
    } else {
      (sprite as PIXISprite).__NUMBER_KEY = this.list.length - 1;
      this.list.push(sprite as PIXISprite);
    }

    this.container.addChild(sprite)
  }

  /**
   * Delete stage element and remove in group
   *
   * ```ts
   * // ...
   * group.add(sprite);
   *
   * setTimeout(() => {
   *   group.delete(0);
   * }, 2000);
   * // ...
   * ```
   *
   * @param key A key for search in group
   */
  public delete(key: PIXIGroupKey) {
    if (this.__GROUP_KEY) {
      const _sprite = this.get(key as string);

      this.list = this.list.filter((sprite: PIXISprite) => sprite.__GROUP_KEY !== (key as string));
      this.container.removeChild(_sprite);

      _sprite.visible = false;
      _sprite?.destroy();
    } else {
      const _sprite = this.get(key as number);

      this.list.splice(key as number, 1);
      this.container.removeChild(_sprite);

      _sprite.visible = false;
      _sprite?.destroy();
    }
  }

  /**
   * Remove element in a track group events and actions (for delete render, use delete function instead).
   *
   * ```ts
   * // ...
   * group.add(sprite);
   *
   * setTimeout(() => {
   *   group.remove(0);
   * }, 2000);
   * // ...
   * ```
   *
   * @param key A key for search in group
   */
  public remove(key: PIXIGroupKey) {
    if (this.__GROUP_KEY) {
      this.list = this.list.filter((sprite: PIXISprite) => sprite.__GROUP_KEY !== (key as string));
    } else {
      this.list.splice(key as number, 1);
    }
  }

  /**
   * Execute a multiple callback's if the target is collided with a group member.
   *
   * Callbacks are called in order of position in the past array.
   *
   * Callback return a `PIXISprite` that was hit.
   *
   * ```ts
   * group.E_hitEffect(player_sprite, [
   *    (enemy_sprite: Utils.PIXISprite) => {
   *      console.log(enemy_sprite)
   *    },
   *    () => {
   *      console.log('hello world');
   *    },
   * ]);
   *```
   *
   * @param target A target compare in hit a group sprites
   * @param execute A list for callback execute in a hit effect
   */
  public E_hitEffect(target: PIXISprite, execute: Array<(sprite: PIXISprite) => void>): void {
    this.list.forEach((sprite: PIXISprite) => {
      if (!sprite._bumpPropertiesAdded || !sprite._d20RPGPropertiesAdded)
        throw new Error('pixi-factory: bump or d20 properties not added in E_hitEffect sprites');

      if (
        !(
          (sprite.__GROUP_KEY === target.__GROUP_KEY && this.__GROUP_KEY) ||
          (sprite.__NUMBER_KEY === target.__NUMBER_KEY && this.__NUMBER_KEY)
        )
      ) {
        if (sprite.base.E_hit(sprite, target, { type: 'rectangle' })) {
          execute.forEach((cb: (sprite: PIXISprite) => void) => {
            cb && cb(sprite);
          });
        }
      }
    });
  }

  /**
   *
   * Execute a callback target pertencent a min group area
   *
   * ```ts
   * group.E_inMinArea(player_sprite, [
   *    () => {
   *      console.log('hello', player_sprite.__TARGET_IN_GROUP_MIN_AREA)
   *    }
   * ]);
   *```
   *
   * @param target A target compare in hit a group sprites
   * @param execute A list for callback execute in a hit effect
   */
  public E_inMinArea(target: PIXISprite, execute: Array<() => void>): void {
    if (!target._bumpPropertiesAdded) throw new Error('pixi-factory: bump not added in E_inMinArea sprite');

    if (!((target.__GROUP_KEY && this.__GROUP_KEY) || (target.__NUMBER_KEY && this.__NUMBER_KEY))) {
      if (
        hitTestRectangle(
          {
            _bumpPropertiesAdded: true,
            x: this.container.x,
            y: this.container.y,
            width: this.area.min.width,
            height: this.area.min.height,
          },
          target,
        )
      ) {
        target.__TARGET_IN_GROUP_MIN_AREA = true;

        execute.forEach((cb: () => void) => {
          cb && cb();
        });
      } else {
        target.__TARGET_IN_GROUP_MIN_AREA = false;
      }
    }
  }

  /**
   *
   * Execute a callback target pertencent a max group area
   *
   * ```ts
   * group.E_inMaxArea(player_sprite, [
   *    () => {
   *      console.log('hello', player_sprite.__TARGET_IN_GROUP_MAX_AREA)
   *    }
   * ]);
   *```
   *
   * @param target A target compare in hit a group sprites
   * @param execute A list for callback execute in a hit effect
   */
  public E_inMaxArea(target: PIXISprite, execute: Array<() => void>): void {
    if (!target._bumpPropertiesAdded) throw new Error('pixi-factory: bump not added in E_inMaxArea sprites');

    if (!((target.__GROUP_KEY && this.__GROUP_KEY) || (target.__NUMBER_KEY && this.__NUMBER_KEY))) {
      if (
        hitTestRectangle(
          {
            _bumpPropertiesAdded: true,
            x: this.container.x - this.area.max.width / 4,
            y: this.container.y - this.area.max.height / 4,
            width: this.area.max.width,
            height: this.area.max.height,
          },
          target,
        )
      ) {
        target.__TARGET_IN_GROUP_MAX_AREA = true;

        execute.forEach((cb: () => void) => {
          cb && cb();
        });
      } else {
        target.__TARGET_IN_GROUP_MAX_AREA = false;
      }
    }
  }

  /**
   * Create a debugger size for actually container render
   *
   * ```ts
   * group.A_debugger(PIXI);
   * ```
   *
   * @param PIXI A `pixi.js` importer
   */
  public A_debugger(PIXI: any) {
    const _min = new PIXI.Graphics();
    _min.clear();
    _min.lineStyle(5, 0x0095c1, 1);
    _min.beginFill(0x000000, 0);
    _min.drawRect(0, 0, this.area.min.width, this.area.min.height);
    _min.endFill();

    const _max = new PIXI.Graphics();
    _max.clear();
    _max.lineStyle(5, 0xc10000, 1);
    _max.beginFill(0x000000, 0);
    _max.drawRect(-this.area.max.width / 4, -this.area.max.height / 4, this.area.max.width, this.area.max.height);
    _max.endFill();

    const _style_min = new PIXI.TextStyle({
      fill: 0x0095c1,
      fontWeight: 'bold',
      fontSize: 16,
    });
    const _style_max = new PIXI.TextStyle({
      fill: 0xc10000,
      fontWeight: 'bold',
      fontSize: 16,
    });
    const _min_text = new PIXI.Text('Min Area', _style_min);
    const _max_text = new PIXI.Text('Max Area', _style_max);

    if (!this.__DEBUGGER_LINE) {
      this.container.debuggerMin = _min;
      this.container.debuggerMax = _max;
      this.container.debuggerMinText = _min_text;
      this.container.debuggerMaxText = _max_text;

      this.container.addChild(_min);
      this.container.addChild(_min_text);
      this.container.addChild(_max);
      this.container.addChild(_max_text);

      _min_text.y += this.area.min.height;
      _max_text.y += this.area.min.height + this.area.min.height / 2;
    }

    this.__DEBUGGER_LINE = true;
  }
}

/**
 * The Factory.Group for create and control groups of sprite
 *
 * ```js
 * import * as PIXI from 'pixi.js';
 * import Factory from 'pixi-factory';
import { hitTestRectangle } from './contain';
 * // ...
 * function setup() {
 *  const sprite = Factory.Sprite.create(new PIXI.Sprite(resources.example.texture));
 *  const group = Factory.Group.create([ sprite ], { container: app.stage });
 *
 *  // or
 *
 *  const sprite = Factory.Sprite.create(new PIXI.Sprite(resources.example.texture));
 *  const group = Factory.Group.create([['foo', sprite]], { container: app.stage, key: true });
 * }
 * ```
 *
 * @class
 */
export class PGroup {
  /**
   *
   * The Factory.Group for create and control groups of sprite
   *
   * ```js
   * import * as PIXI from 'pixi.js';
   * import Factory from 'pixi-factory';
   * // ...
   * function setup() {
   *  const sprite = Factory.Sprite.create(new PIXI.Sprite(resources.example.texture));
   *  const group = Factory.Group.create([ sprite ], { container: app.stage });
   *
   *  // or
   *
   *  const sprite = Factory.Sprite.create(new PIXI.Sprite(resources.example.texture));
   *  const group = Factory.Group.create([['foo', sprite]], { container: app.stage, key: true });
   * }
   * ```
   * @param sprites A `PIXI.Sprite` or a `Factory.Sprite` array.
   * @param options Options for create a group sprite.
   * @returns A `Factory.Group` instance.
   */
  public create(sprites: Array<PIXISpriteGroup>, options: PIXISimpleGroupOptions): SimpleGroup {
    return new SimpleGroup(sprites, options);
  }
}
