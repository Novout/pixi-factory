/**
 * @module Factory
 */
export * from './factory';

/**
 * @module Sprite
 */
export { PSprite as Sprite } from './sprite';

/**
 * @module Group
 */
export { SimpleGroup as Group } from './group';
export { PGroup as FactoryGroup } from './group';

/**
 * @module Utils
 */
export * as Utils from './types';
export { PIXISprite as SpriteInstance } from './types';

import Factory from './factory';
export default new Factory();
