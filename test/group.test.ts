/**
 * @jest-environment jsdom
 */

//@ts-ignore
import * as PIXI from 'pixi.js';
import Factory, { Utils } from '../src/index';

describe('Factory.Group', () => {
  beforeEach(() => {
    PIXI.utils.skipHello();
  });

  it('should create a empty group', () => {
    const stage = { addChild: (_: any) => {} };

    const group = Factory.Group.createGroup([], { container: stage });

    expect(group).toBeTruthy();
  });

  it('should create a group with a unique sprite', () => {
    const sprite: Utils.PIXISprite = Factory.Sprite.createGenericSprite({ foo: 'bar' });

    const stage = { addChild: (_: any) => {} };

    const group = Factory.Group.createGroup([sprite], { container: stage });

    expect(group.getSprite(0)).toBeTruthy();
  });

  it('should not create a group with a two sprites', () => {
    const sprite: Utils.PIXISprite = Factory.Sprite.createGenericSprite({ foo: 'bar' });

    const stage = { addChild: (_: any) => {} };

    try {
      const group = Factory.Group.createGroup([sprite], { container: stage });

      group.getSprite(1);
    } catch (e) {
      expect(e.message).toBe('pixi-factory: sprite not exists in SimpleGroup');
    }
  });

  it('should create a group with a multiple sprite', () => {
    const foo: Utils.PIXISprite = Factory.Sprite.createGenericSprite({ foo: 'foo' });
    const bar: Utils.PIXISprite = Factory.Sprite.createGenericSprite({ bar: 'bar' });
    const lett: Utils.PIXISprite = Factory.Sprite.createGenericSprite({ lett: 'lett' });

    const stage = { addChild: (_: any) => {} };

    const group = Factory.Group.createGroup([foo, bar, lett], { container: stage });

    expect(group.getSprites().length).toBe(3);
  });

  it('should create a group with a key unique sprite', () => {
    const sprite: Utils.PIXISprite = Factory.Sprite.createGenericSprite({ foo: 'bar' });

    const stage = { addChild: (_: any) => {} };

    const group = Factory.Group.createGroup([['test', sprite]], { container: stage, key: true });

    expect(group.getSprite('test')).toBeTruthy();
  });

  it('should create a group with a key multiple sprite', () => {
    const foo: Utils.PIXISprite = Factory.Sprite.createGenericSprite({ foo: 'foo' });
    const bar: Utils.PIXISprite = Factory.Sprite.createGenericSprite({ bar: 'bar' });
    const lett: Utils.PIXISprite = Factory.Sprite.createGenericSprite({ lett: 'lett' });

    const stage = { addChild: (_: any) => {} };

    const group = Factory.Group.createGroup(
      [
        ['foo', foo],
        ['bar', bar],
        ['lett', lett],
      ],
      { container: stage, key: true },
    );

    expect(group.getSprites().length).toBe(3);
  });

  it('should not create a group with a duplicated key', () => {
    const foo: Utils.PIXISprite = Factory.Sprite.createGenericSprite({ foo: 'foo' });
    const bar: Utils.PIXISprite = Factory.Sprite.createGenericSprite({ bar: 'bar' });

    const stage = { addChild: (_: any) => {} };

    try {
      Factory.Group.createGroup(
        [
          ['foo', foo],
          ['foo', bar],
        ],
        { container: stage, key: true },
      ).getSprite('foo');
    } catch (e) {
      expect(e.message).toBe('pixi-factory: not exists element or a duplicated element in a array');
    }
  });

  it('should create a group with a control hability', () => {
    const sprite: Utils.PIXISprite = Factory.Sprite.createGenericSprite({ foo: 'bar' });

    const stage = { addChild: (_: any) => {} };

    const group = Factory.Group.createGroup([['test', sprite]], { container: stage, key: true, cleanControl: false });

    expect(group.getSprite('test')._simpleGroupAdded).toBeTruthy();
  });

  it('should not create a group with a control hability', () => {
    const sprite: Utils.PIXISprite = Factory.Sprite.createGenericSprite({ foo: 'bar' });

    const stage = { addChild: (_: any) => {} };

    const group = Factory.Group.createGroup([['test', sprite]], { container: stage, key: true, cleanControl: true });

    expect(group.getSprite('test')._simpleGroupAdded).toBeUndefined();
  });
});
