import { PIXISprite, PIXISimpleGroupOptions, PIXISpriteGroup, PIXIGroupKey } from './types';

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
  private list: Array<PIXISprite>;
  private container: any;
  private __GROUP_KEY = false;

  constructor(_list: Array<PIXISpriteGroup>, options: PIXISimpleGroupOptions) {
    if (options.key) {
      this.keySetter(_list as Array<Array<string | PIXISprite>>, options);
    } else {
      this.defaultSetter(_list as Array<PIXISprite>, options);
    }
  }

  private keySetter(_list: Array<Array<string | PIXISprite>>, options: PIXISimpleGroupOptions): void {
    this.list = [];
    this.__GROUP_KEY = true;
    _list.forEach((item: Array<string | PIXISprite>) => {
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

  private setGroupInSprite(): void {
    this.list.map((sprite: PIXISprite) => (sprite._simpleGroupAdded = true));
  }

  public append(stage: any): this {
    stage.addChild(this.container);

    return this;
  }

  public getSprites(): Array<PIXISprite> {
    return this.list;
  }

  public setSprites(_list: Array<PIXISprite>, options: PIXISimpleGroupOptions): void {
    this.defaultSetter(_list, options);
  }

  public getContainer(): any {
    return this.container;
  }

  public setContainer(stage: any): void {
    this.container = stage;
  }

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

  public newSprite(sprite: PIXISpriteGroup) {
    if (this.__GROUP_KEY) {
      const _sprite = sprite as Array<PIXISprite | string>;
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
 *  const group = Factory.Group.createGroup([ sprite ], { container: app.stage })
 *   // ...
 * }
 * ```
 *
 * @class
 */
export class PGroup {
  public createGroup(sprites: Array<PIXISprite>, options: PIXISimpleGroupOptions): SimpleGroup {
    return new SimpleGroup(sprites, options);
  }
}
