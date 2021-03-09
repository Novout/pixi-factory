import { PSprite } from './sprite';
import { PIXISprite } from './types';

/**
 * The Factory for creation general objects
 *
 * ```js
 * import * as PIXI from 'pixi.js';
 * import Factory from 'pixi-factory';
 * // ...
 * function setup() {
 *   const sprite = Factory.Sprite.createSprite(new PIXI.Sprite(resources.example.texture));
 *   // ...
 * }
 * ```
 *
 * @class
 */
export default class Factory {
  public readonly Sprite: PIXISprite;

  constructor() {
    this.Sprite = new PSprite();
  }
}
