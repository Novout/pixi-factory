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

  it('should not get a element in a empty group', () => {
    const stage = { addChild: (_: any) => {} };

    try {
      Factory.Group.createGroup([], { container: stage }).getSprite(0);
    } catch (e) {
      expect(e.message).toBe('pixi-factory: sprite not exists in SimpleGroup');
    }
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

  it('should not create a new sprite with key false', () => {
    const sprite: Utils.PIXISprite = Factory.Sprite.createGenericSprite({ foo: 'bar' });

    const stage = { addChild: (_: any) => {} };

    const group = Factory.Group.createGroup([], { container: stage, key: false });

    try {
      group.newSprite(['foo', sprite]);
    } catch (e) {
      expect(e.message).toBe('pixi-factory: sprite not exists in SimpleGroup');
    }
  });

  it('should define a size container in default group', () => {
    const sprite: Utils.PIXISprite = Factory.Sprite.createGenericSprite({ foo: 'bar' });

    const stage = { width: 0, height: 0, addChild: (_: any) => {} };

    const group = Factory.Group.createGroup([sprite], { container: stage, size: { width: 100, height: 100 } });

    expect(group.getContainer().width).toBe(100);
    expect(group.getContainer().height).toBe(100);
  });

  it('should define a size container', () => {
    const sprite: Utils.PIXISprite = Factory.Sprite.createGenericSprite({ foo: 'bar' });

    const stage = { width: 0, height: 0, addChild: (_: any) => {} };

    const group = Factory.Group.createGroup([['test', sprite]], {
      container: stage,
      key: true,
      size: { width: 100, height: 100 },
    });

    expect(group.getContainer().width).toBe(100);
    expect(group.getContainer().height).toBe(100);
  });

  it('should define a positional container', () => {
    const sprite: Utils.PIXISprite = Factory.Sprite.createGenericSprite({ foo: 'bar' });

    const stage = { addChild: (_: any) => {}, position: { set: (...args: any) => {} } };

    const group = Factory.Group.createGroup([['test', sprite]], { container: stage, key: true, position: [20, 20] });

    expect(group).toBeTruthy();
  });

  it('should not define a positional container with a error parameters', () => {
    const sprite: Utils.PIXISprite = Factory.Sprite.createGenericSprite({ foo: 'bar' });

    const stage = { width: 0, height: 0, addChild: (_: any) => {} };

    try {
      Factory.Group.createGroup([['test', sprite]], { container: stage, key: true, position: [20, 20, 20] });
    } catch (e) {
      expect(e.message).toBe('pixi-factory: options.position is wrong array, correct example: position = [50, 50]');
    }
  });

  it('should not define a positional container with a error parameters dont key', () => {
    const sprite: Utils.PIXISprite = Factory.Sprite.createGenericSprite({ foo: 'bar' });

    const stage = { width: 0, height: 0, addChild: (_: any) => {} };

    try {
      Factory.Group.createGroup([sprite], { container: stage, position: [20, 20, 20] });
    } catch (e) {
      expect(e.message).toBe('pixi-factory: options.position is wrong array, correct example: position = [50, 50]');
    }
  });

  it('should not define a positional container with a empty parameters', () => {
    const sprite: Utils.PIXISprite = Factory.Sprite.createGenericSprite({ foo: 'bar' });

    const stage = { width: 0, height: 0, addChild: (_: any) => {} };

    try {
      Factory.Group.createGroup([['test', sprite]], { container: stage, key: true, position: [] });
    } catch (e) {
      expect(e.message).toBe('pixi-factory: options.position is wrong array, correct example: position = [50, 50]');
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

  it('should create a new sprite after initialize', () => {
    const sprite: Utils.PIXISprite = Factory.Sprite.createGenericSprite({ foo: 'bar' });

    const stage = { addChild: (_: any) => {} };

    const group = Factory.Group.createGroup([], { container: stage });

    group.newSprite(sprite);

    expect(group.getSprite(0)).toBeTruthy();
  });

  it('should create a new sprite with key after initialize', () => {
    const sprite: Utils.PIXISprite = Factory.Sprite.createGenericSprite({ foo: 'bar' });

    const stage = { addChild: (_: any) => {} };

    const group = Factory.Group.createGroup([], { container: stage, key: true });

    group.newSprite(['foo', sprite]);

    expect(group.getSprite('foo')).toBeTruthy();
  });
});