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
      expect(e.message).toBe('pixi-factory: sprite not exists in group');
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
      expect(e.message).toBe('pixi-factory: sprite not exists in group');
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
      group.add(['foo', sprite]);
    } catch (e) {
      expect(e.message).toBe('pixi-factory: sprite not exists in group');
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

    group.add(sprite);

    expect(group.getSprite(0)).toBeTruthy();
  });

  it('should create a new sprite with key after initialize', () => {
    const sprite: Utils.PIXISprite = Factory.Sprite.createGenericSprite({ foo: 'bar' });

    const stage = { addChild: (_: any) => {} };

    const group = Factory.Group.createGroup([], { container: stage, key: true });

    group.add(['foo', sprite]);

    expect(group.getSprite('foo')).toBeTruthy();
  });

  it('should not search a sprite with a string parameter', () => {
    const sprite: Utils.PIXISprite = Factory.Sprite.createGenericSprite({ foo: 'bar' });

    const stage = { addChild: (_: any) => {} };

    const group = Factory.Group.createGroup([], { container: stage, key: false });

    group.add([sprite]);

    try {
      group.getSprite('foo');
    } catch (e) {
      expect(e.message).toBe('pixi-sprite: key as not enable, in this group, go through the options key: true');
    }
  });

  it('should not search a sprite with a number parameter', () => {
    const sprite: Utils.PIXISprite = Factory.Sprite.createGenericSprite({ foo: 'bar' });

    const stage = { addChild: (_: any) => {} };

    const group = Factory.Group.createGroup([], { container: stage, key: true });

    group.add(['foo', sprite]);

    try {
      group.getSprite(0);
    } catch (e) {
      expect(e.message).toBe('pixi-sprite: not to search for the number while is key enabled.');
    }
  });

  it('should execute callback in a group hit effect', () => {
    const foo: Utils.PIXISprite = Factory.Sprite.createGenericSprite(
      { foo: 'foo' },
      {
        bump: true,
        velocity: true,
        d20rpg: true,
      },
    );
    const bar: Utils.PIXISprite = Factory.Sprite.createGenericSprite(
      { bar: 'bar' },
      {
        bump: true,
        velocity: true,
        d20rpg: true,
      },
    );

    const stage = { addChild: (_: any) => {} };

    const group = Factory.Group.createGroup([], { container: stage, key: true });

    group.add(['foo', foo]);

    try {
      group.E_hitEffect(bar, [
        () => {
          throw new Error('it is');
        },
      ]);
    } catch (e) {
      expect(e.message).toBe('it is');
    }
  });

  it('should not execute a callback with a specific sprite', () => {
    const foo: Utils.PIXISprite = Factory.Sprite.createGenericSprite({ foo: 'foo' });
    const bar: Utils.PIXISprite = Factory.Sprite.createGenericSprite({ bar: 'bar' });

    const stage = { addChild: (_: any) => {} };

    const group = Factory.Group.createGroup([], { container: stage, key: false });

    group.add(foo);
    group.add(bar);

    try {
      group.E_hitEffect(bar, [
        () => {
          throw new Error('not execute this');
        },
      ]);
    } catch (e) {
      expect(e.message).toBe('pixi-factory: bump or d20 properties not added in E_hitEffect sprites');
    }
  });

  it('should execute callback in a sprite group member hit effect', () => {
    const foo: Utils.PIXISprite = Factory.Sprite.createGenericSprite(
      { foo: 'foo' },
      {
        bump: true,
        velocity: true,
        d20rpg: true,
      },
    );
    const bar: Utils.PIXISprite = Factory.Sprite.createGenericSprite(
      { bar: 'bar' },
      {
        bump: true,
        velocity: true,
        d20rpg: true,
      },
    );

    const stage = { addChild: (_: any) => {} };

    const group = Factory.Group.createGroup([], { container: stage, key: true });

    group.add(['foo', foo]);
    group.add(['bar', bar]);

    try {
      group.E_hitEffect(bar, [
        () => {
          throw new Error('it is');
        },
      ]);
    } catch (e) {
      expect(e.message).toBe('it is');
    }
  });

  it('should execute callback in a sprite group member hit effect in a priority order', () => {
    const foo: Utils.PIXISprite = Factory.Sprite.createGenericSprite(
      { foo: 'foo' },
      {
        bump: true,
        velocity: true,
        d20rpg: true,
      },
    );
    const bar: Utils.PIXISprite = Factory.Sprite.createGenericSprite(
      { bar: 'bar' },
      {
        bump: true,
        velocity: true,
        d20rpg: true,
      },
    );

    const stage = { addChild: (_: any) => {} };

    const group = Factory.Group.createGroup([], { container: stage, key: true });

    group.add(['foo', foo]);
    group.add(['bar', bar]);

    try {
      group.E_hitEffect(bar, [
        () => {
          throw new Error('it is');
        },
        () => {
          throw new Error('not is');
        },
      ]);
    } catch (e) {
      expect(e.message).toBe('it is');
    }
  });

  it('should execute callback parameter sprite and your effect', () => {
    const foo: Utils.PIXISprite = Factory.Sprite.createGenericSprite(
      { foo: 'foo', x: 0, y: 0, width: 50, height: 50 },
      {
        bump: true,
        velocity: true,
        d20rpg: true,
      },
    );
    const bar: Utils.PIXISprite = Factory.Sprite.createGenericSprite(
      { bar: 'bar', x: 0, y: 0, width: 50, height: 50 },
      {
        bump: true,
        velocity: true,
        d20rpg: true,
      },
    );

    const stage = { addChild: (_: any) => {} };

    const group = Factory.Group.createGroup([], { container: stage, key: true });

    group.add(['foo', foo]);
    group.add(['bar', bar]);

    group.E_hitEffect(foo, [
      (_bar: Utils.PIXISprite) => {
        _bar.x = 5000;
      },
    ]);

    expect(bar.x).toBe(5000);
    expect(group.getSprite('bar').x).toBe(5000);
  });

  it('should set base area without options', () => {
    const stage = { width: 100, height: 100 };

    const group = Factory.Group.createGroup([], { container: stage });

    expect(group.getArea().min.height).toBe(100);
    expect(group.getArea().min.width).toBe(100);

    expect(group.getArea().max.height).toBe(200);
    expect(group.getArea().max.width).toBe(200);
  });

  it('should set base area with options', () => {
    const stage = { width: 100, height: 100 };

    const group = Factory.Group.createGroup([], {
      container: stage,
      area: { min: { height: 500, width: 500 }, max: { height: 1000, width: 1000 } },
    });

    expect(group.getArea().min.height).toBe(500);
    expect(group.getArea().min.width).toBe(500);

    expect(group.getArea().max.height).toBe(1000);
    expect(group.getArea().max.width).toBe(1000);
  });

  it('should set base area in a setter method', () => {
    const stage = { width: 100, height: 100 };

    const group = Factory.Group.createGroup([], {
      container: stage,
      area: { min: { height: 500, width: 500 }, max: { height: 1000, width: 1000 } },
    });

    group.setArea({ min: { height: 1000, width: 1000 }, max: { height: 2500, width: 2500 } });

    expect(group.getArea().min.height).toBe(1000);
    expect(group.getArea().min.width).toBe(1000);

    expect(group.getArea().max.height).toBe(2500);
    expect(group.getArea().max.width).toBe(2500);
  });

  it('should set a debugger active', () => {
    const stage = { width: 100, height: 100, addChild: (_: any) => {} };

    const group = Factory.Group.createGroup([], {
      container: stage,
      area: { min: { height: 500, width: 500 }, max: { height: 1000, width: 1000 } },
    });

    group.A_debugger(PIXI);

    expect(group.getContainer().debuggerMin).toBeTruthy();
    expect(group.getContainer().debuggerMax).toBeTruthy();
  });

  it('should remove a member in group with a number key', () => {
    const sprite: Utils.PIXISprite = Factory.Sprite.createGenericSprite(
      { foo: 'bar' },
      {
        bump: false,
        velocity: false,
        d20rpg: false,
        content: {
          test: 'test',
          destroy: () => {},
        },
      },
    );

    const stage = { addChild: (_: any) => {}, removeChild: (_: any) => {} };

    const group = Factory.Group.createGroup([], {
      container: stage,
    });

    group.add(sprite);

    group.remove(0);

    try {
      group.getSprite(0);
    } catch (e) {
      expect(e.message).toBe('pixi-factory: sprite not exists in group');
    }
  });

  it('should remove a member in group with a string key', () => {
    const sprite: Utils.PIXISprite = Factory.Sprite.createGenericSprite(
      { foo: 'bar' },
      {
        bump: false,
        velocity: false,
        d20rpg: false,
        content: {
          test: 'test',
          destroy: () => {},
        },
      },
    );

    const stage = { addChild: (_: any) => {}, removeChild: (_: any) => {} };

    const group = Factory.Group.createGroup([], {
      container: stage,
      key: true,
    });

    group.add(['foo', sprite]);

    group.remove('foo');

    try {
      group.getSprite('foo');
    } catch (e) {
      expect(e.message).toBe('pixi-factory: not exists element or a duplicated element in a array');
    }
  });

  it('should not exists a empty member in group in remove method', () => {
    const sprite: Utils.PIXISprite = Factory.Sprite.createGenericSprite(
      { foo: 'bar' },
      {
        bump: true,
        velocity: false,
        d20rpg: false,
      },
    );

    const stage = { addChild: (_: any) => {} };

    const group = Factory.Group.createGroup([], {
      container: stage,
      key: true,
    });

    group.add(['foo', sprite]);

    try {
      group.remove('bar');
    } catch (e) {
      expect(e.message).toBe('pixi-factory: not exists element or a duplicated element in a array');
    }
  });

  it('should random sprite position in a group', () => {
    const sprite: Utils.PIXISprite = Factory.Sprite.createGenericSprite(
      { foo: 'bar' },
      {
        bump: true,
        velocity: false,
        d20rpg: false,
        content: {
          x: 0,
          y: 0,
          width: 50,
          height: 50,
        },
      },
    );

    const stage = { width: 100, height: 100, x: 0, y: 0, addChild: (_: any) => {} };

    const group = Factory.Group.createGroup([], {
      container: stage,
      key: true,
      random: true,
    });

    group.add(['foo', sprite]);

    expect(group.getSprite('foo').x).toBe(0);
    expect(group.getSprite('foo').y).toBe(0);
  });

  it('should sprite in a min group area', () => {
    const sprite: Utils.PIXISprite = Factory.Sprite.createGenericSprite(
      { foo: 'bar' },
      {
        bump: true,
        velocity: false,
        d20rpg: false,
      },
    );

    const stage = { addChild: (_: any) => {} };

    const group = Factory.Group.createGroup([sprite], {
      container: stage,
      key: false,
    });

    try {
      group.E_inMinArea(sprite, [
        () => {
          throw new Error('here');
        },
      ]);
    } catch (e) {
      expect(e.message).toBe('here');
    }
  });

  it('should sprite in a max group area', () => {
    const sprite: Utils.PIXISprite = Factory.Sprite.createGenericSprite(
      { foo: 'bar' },
      {
        bump: true,
        velocity: false,
        d20rpg: false,
        content: {
          test: 'test',
          destroy: () => {},
        },
      },
    );

    const stage = { addChild: (_: any) => {} };

    const group = Factory.Group.createGroup([sprite], {
      container: stage,
      key: false,
    });

    try {
      group.E_inMaxArea(sprite, [
        () => {
          throw new Error('here');
        },
      ]);
    } catch (e) {
      expect(e.message).toBe('here');
    }
  });

  it('should not bump sprite in a min group area', () => {
    const sprite: Utils.PIXISprite = Factory.Sprite.createGenericSprite(
      { foo: 'bar' },
      {
        bump: false,
        velocity: false,
        d20rpg: false,
        content: {
          test: 'test',
          destroy: () => {},
        },
      },
    );

    const stage = { addChild: (_: any) => {} };

    const group = Factory.Group.createGroup([sprite], {
      container: stage,
      key: false,
    });

    try {
      group.E_inMinArea(sprite, [
        () => {
          throw new Error('here');
        },
      ]);
    } catch (e) {
      expect(e.message).toBe('pixi-factory: bump not added in E_inMinArea sprite');
    }
  });

  it('should not bump sprite in a max group area', () => {
    const sprite: Utils.PIXISprite = Factory.Sprite.createGenericSprite(
      { foo: 'bar' },
      {
        bump: false,
        velocity: false,
        d20rpg: false,
        content: {
          test: 'test',
          destroy: () => {},
        },
      },
    );

    const stage = { addChild: (_: any) => {} };

    const group = Factory.Group.createGroup([sprite], {
      container: stage,
      key: false,
    });

    try {
      group.E_inMaxArea(sprite, [
        () => {
          throw new Error('here');
        },
      ]);
    } catch (e) {
      expect(e.message).toBe('pixi-factory: bump not added in E_inMaxArea sprites');
    }
  });
});
