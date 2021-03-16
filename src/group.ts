import { PIXISprite, PIXISimpleGroupOptions, PIXISpriteGroup, PIXIGroupKey, PIXISpriteGroupKey } from './types';

/**
 * The default group generate for createGroup function
 *
 * ```js
 * import * as PIXI from 'pixi.js';
 * import Factory from 'pixi-factory';
 * // ...
 * function setup() {
 *  const sprite = Factory.Sprite.createSprite(new PIXI.Sprite(resources.example.texture));
 *  const group = Factory.Group.createGroup([ sprite ], { container: app.stage });
 *   // ...
 * }
 * ```
 *
 * @class
 */
class SimpleGroup {
  /** A sprite list belonging in group */
  private list: Array<PIXISprite>;

  /** A `PIXI.Container` required */
  private container: any;

  /** A define group search based in key members */
  private __GROUP_KEY = false;

  /**
   * @param {Array<PIXISpriteGroup>} [_list] A `PIXI.Sprite` or a `Factory.Sprite` array.
   * @param {PIXISimpleGroupOptions} [options] Options for create a group sprite.
   */
  constructor(_list: Array<PIXISpriteGroup>, options: PIXISimpleGroupOptions) {
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
   */
  private keySetter(_list: Array<PIXISpriteGroupKey>, options: PIXISimpleGroupOptions): void {
    this.list = [];
    this.__GROUP_KEY = true;
    _list.forEach((item: PIXISpriteGroupKey) => {
      (item[1] as PIXISprite).__GROUP_KEY = item[0] as string;
      this.list.push(item[1] as PIXISprite);
    });

    this.container = options.container;
    if (!options.cleanControl) {
      this.setGroupInSprite();
    }

    if (options.size) {
      this.container.width = options.size.width;
      this.container.height = options.size.height;
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
  }

  /**
   *
   * @param _list A `PIXI.Sprite` or a `Factory.Sprite` array.
   * @param options Options for create a group sprite.
   */
  private defaultSetter(_list: Array<PIXISprite>, options: PIXISimpleGroupOptions): void {
    this.list = _list;
    this.container = options.container;
    if (!options.cleanControl) {
      this.setGroupInSprite();
    }

    if (options.size) {
      this.container.width = options.size.width;
      this.container.height = options.size.height;
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
  }

  /**
   * Set a `_simpleGroupAdded` in a sprite object.
   */
  private setGroupInSprite(): void {
    this.list.map((sprite: PIXISprite) => (sprite._simpleGroupAdded = true));
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
  public getSprites(): Array<PIXISprite> {
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
   * @param key A key for search `Factory.Sprite`
   * @returns A `Factory.Sprite` in group list
   */
  public getSprite(key: PIXIGroupKey): PIXISprite {
    let item;

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

    if (!item) throw new Error('pixi-factory: sprite not exists in SimpleGroup');

    return item;
  }

  /**
   *
   * @param sprite A new `Factory.Sprite` insert in a group array
   */
  public newSprite(sprite: PIXISpriteGroup) {
    if (this.__GROUP_KEY) {
      const _sprite = sprite as PIXISpriteGroupKey;
      (_sprite[1] as PIXISprite).__GROUP_KEY = _sprite[0] as string;
      this.list.push(_sprite[1] as PIXISprite);
    } else {
      this.list.push(sprite as PIXISprite);
    }
  }
}

/**
 * The Factory.Group for create and control groups of sprite
 *
 * ```js
 * import * as PIXI from 'pixi.js';
 * import Factory from 'pixi-factory';
 * // ...
 * function setup() {
 *  const sprite = Factory.Sprite.createSprite(new PIXI.Sprite(resources.example.texture));
 *  const group = Factory.Group.createGroup([ sprite ], { container: app.stage });
 *
 *  // or
 *
 *  const sprite = Factory.Sprite.createSprite(new PIXI.Sprite(resources.example.texture));
 *  const group = Factory.Group.createGroup([['foo', sprite]], { container: app.stage, key: true });
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
   *  const sprite = Factory.Sprite.createSprite(new PIXI.Sprite(resources.example.texture));
   *  const group = Factory.Group.createGroup([ sprite ], { container: app.stage });
   *
   *  // or
   *
   *  const sprite = Factory.Sprite.createSprite(new PIXI.Sprite(resources.example.texture));
   *  const group = Factory.Group.createGroup([['foo', sprite]], { container: app.stage, key: true });
   * }
   * ```
   * @param sprites A `PIXI.Sprite` or a `Factory.Sprite` array.
   * @param options Options for create a group sprite.
   * @returns A `Factory.Group` instance.
   */
  public createGroup(sprites: Array<PIXISpriteGroup>, options: PIXISimpleGroupOptions): SimpleGroup {
    return new SimpleGroup(sprites, options);
  }
}
