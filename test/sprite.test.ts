/**
 * @jest-environment jsdom
 */

//@ts-ignore
import * as PIXI from 'pixi.js';
import Factory, { Sprite, Utils } from '../src/index';

describe('Factory.Sprite', () => {
  beforeEach(() => {
    PIXI.utils.skipHello();
  });

  it('should exists factory sprite', () => {
    const sprite: Utils.PIXISprite = Factory.Sprite.create(
      { foo: 'bar' },
      {
        bump: true,
        velocity: true,
        d20rpg: true,
      },
    );

    expect(sprite).toBeTruthy();
  });

  it('should exists factory sprite with PIXI.Sprite', () => {
    const app = new PIXI.Application();
    document.body.appendChild(app.view);

    app.loader.add('example', '_.jpg').load((loader, resources) => {
      const example = new PIXI.Sprite(resources['example']!.texture);

      const sprite: Utils.PIXISprite = Factory.Sprite.create(example, {
        bump: true,
        velocity: true,
        d20rpg: true,
      });

      expect(sprite).toBeTruthy();
    });
  });

  it('should exists factory sprite with Sprite instance', () => {
    const sprite: Utils.PIXISprite = new Sprite().create(
      { foo: 'bar' },
      {
        bump: true,
        velocity: false,
        d20rpg: false,
      },
    );

    expect(sprite).toHaveProperty('_bumpPropertiesAdded');
  });

  it('should exists factory sprite with PIXI.Sprite and Sprite instance', () => {
    const app = new PIXI.Application();
    document.body.appendChild(app.view);

    app.loader.add('example', '_.jpg').load((loader, resources) => {
      const example = new PIXI.Sprite(resources['example']!.texture);

      const sprite: Utils.PIXISprite = new Sprite().create(example, {
        bump: true,
        velocity: true,
        d20rpg: true,
      });

      expect(sprite).toBeTruthy();
    });
  });

  it('should exists bump properties in new sprite', () => {
    const app = new PIXI.Application();
    document.body.appendChild(app.view);

    let _sprite: Utils.Maybe<Utils.PIXISprite>;

    app.loader.add('example', '_.jpg').load((loader, resources) => {
      const example = new PIXI.Sprite(resources['example']!.texture);

      app.stage.addChild(example);

      const sprite: Utils.PIXISprite = Factory.Sprite.create(example, {
        bump: true,
        velocity: false,
        d20rpg: false,
      });

      _sprite = sprite;

      expect(_sprite as Utils.PIXISprite).toHaveProperty('_bumpPropertiesAdded');
    });
  });

  it('should exists velocity properties in new sprite', () => {
    const app = new PIXI.Application();
    document.body.appendChild(app.view);

    let _sprite: Utils.Maybe<Utils.PIXISprite>;

    app.loader.add('example', '_.jpg').load((loader, resources) => {
      const example = new PIXI.Sprite(resources['example']!.texture);

      app.stage.addChild(example);

      const sprite: Utils.PIXISprite = Factory.Sprite.create(example, {
        bump: false,
        velocity: true,
        d20rpg: false,
      });

      _sprite = sprite;

      expect(_sprite as Utils.PIXISprite).toHaveProperty('_velocityPropertiesAdded');
    });
  });

  it('should exists d20 rpg properties in new sprite', () => {
    const app = new PIXI.Application();
    document.body.appendChild(app.view);

    let _sprite: Utils.Maybe<Utils.PIXISprite>;

    app.loader.add('example', '_.jpg').load((loader, resources) => {
      const example = new PIXI.Sprite(resources['example']!.texture);

      app.stage.addChild(example);

      const sprite = Factory.Sprite.create(example, {
        bump: false,
        velocity: false,
        d20rpg: true,
      });

      _sprite = sprite;

      expect(_sprite as Utils.PIXISprite).toHaveProperty('_d20RPGPropertiesAdded');
    });
  });

  it('should player level up', () => {
    const sprite: Utils.PIXISprite = Factory.Sprite.create(
      { foo: 'bar' },
      {
        bump: false,
        velocity: false,
        d20rpg: true,
      },
    );
    sprite.base.A_levelUP(sprite);

    expect(sprite.base.level).toBe(2);
  });

  it('should player max level up', () => {
    const sprite: Utils.PIXISprite = Factory.Sprite.create(
      { foo: 'bar' },
      {
        bump: false,
        velocity: false,
        d20rpg: true,
      },
    );
    try {
      sprite.base.A_levelUP(sprite);
      sprite.base.A_levelUP(sprite);
      sprite.base.A_levelUP(sprite);
      sprite.base.A_levelUP(sprite);
      sprite.base.A_levelUP(sprite);
      sprite.base.A_levelUP(sprite);
      sprite.base.A_levelUP(sprite);
      sprite.base.A_levelUP(sprite);
      sprite.base.A_levelUP(sprite);
    } catch (e) {
      expect(e.message).toBe('pixi-factory: sprite overflow max level');
    }
  });

  it('should player roll damage', () => {
    const sprite: Utils.PIXISprite = Factory.Sprite.create(
      { foo: 'bar' },
      {
        bump: false,
        velocity: false,
        d20rpg: true,
      },
    );
    const _value = sprite.base.A_rollDamage(sprite);

    expect(_value).toBeGreaterThanOrEqual(1);
    expect(_value).toBeLessThanOrEqual(8);
  });

  it('should player roll attack with default settings', () => {
    const sprite: Utils.PIXISprite = Factory.Sprite.create(
      { foo: 'bar' },
      {
        bump: false,
        velocity: false,
        d20rpg: true,
      },
    );
    const _value = sprite.base.A_rollAttack(sprite);

    expect(_value).toBeGreaterThanOrEqual(1);
    expect(_value).toBeLessThanOrEqual(20);
  });

  it('should player roll attack with new roll attack settings', () => {
    const sprite: Utils.PIXISprite = Factory.Sprite.create(
      { foo: 'bar' },
      {
        bump: false,
        velocity: false,
        d20rpg: true,
      },
    );
    sprite.base.damage.rollAttack = 5;
    const _value = sprite.base.A_rollAttack(sprite);

    expect(_value).toBeGreaterThanOrEqual(5);
    expect(_value).toBeLessThanOrEqual(25);
  });

  it('should player roll attack greater than the targets AC value', () => {
    const sprite: Utils.PIXISprite = Factory.Sprite.create(
      { foo: 'bar' },
      {
        bump: false,
        velocity: false,
        d20rpg: true,
      },
    );

    expect(sprite.base.A_receiveAttack(sprite, 20)).toBeTruthy();
  });

  it('should player roll attack less than the targets AC value', () => {
    const sprite: Utils.PIXISprite = Factory.Sprite.create(
      { foo: 'bar' },
      {
        bump: false,
        velocity: false,
        d20rpg: true,
      },
    );

    expect(sprite.base.A_receiveAttack(sprite, -20)).toBeFalsy();
  });

  it('should set new velocity in generic sprite', () => {
    const sprite: Utils.PIXISprite = Factory.Sprite.create(
      { foo: 'bar' },
      {
        bump: false,
        velocity: true,
        d20rpg: false,
      },
    );
    sprite.velocity.setVelocity(sprite, 5);

    expect(sprite.velocity.x).toBe(5);
    expect(sprite.velocity.y).toBe(5);
  });

  it('should set wrong new velocity in generic sprite', () => {
    const sprite: Utils.PIXISprite = Factory.Sprite.create(
      { foo: 'bar' },
      {
        bump: false,
        velocity: true,
        d20rpg: false,
      },
    );
    sprite.velocity.setVelocity(sprite, 5);

    expect(sprite.velocity.x).not.toBe(1);
    expect(sprite.velocity.y).not.toBe(1);
  });

  it('should set new movement in generic sprite', () => {
    const sprite: Utils.PIXISprite = Factory.Sprite.create(
      { foo: 'bar' },
      {
        bump: false,
        velocity: true,
        d20rpg: false,
      },
    );
    sprite.velocity.setMovement(sprite);

    expect(sprite.velocity.movement).toBe(false);
  });

  it('should set wrong new movement in generic sprite', () => {
    const sprite: Utils.PIXISprite = Factory.Sprite.create(
      { foo: 'bar' },
      {
        bump: false,
        velocity: true,
        d20rpg: false,
      },
    );
    sprite.velocity.setMovement(sprite);

    expect(sprite.velocity.movement).not.toBe(true);
  });

  it('should velocity effect knockback with up options', () => {
    const sprite: Utils.PIXISprite = Factory.Sprite.create(
      { foo: 'bar' },
      {
        bump: false,
        velocity: true,
        d20rpg: false,
      },
    );

    sprite.velocity.A_knockbackHit(sprite, {
      value: 50,
      time: 0.5,
      direction: 'up',
    });

    /* 1 default + 4 for GSAP internal timeout */
    expect(setTimeout).toHaveBeenCalledTimes(5);
  });

  it('should velocity effect knockback with down options', () => {
    const sprite: Utils.PIXISprite = Factory.Sprite.create(
      { foo: 'bar' },
      {
        bump: false,
        velocity: true,
        d20rpg: false,
      },
    );

    sprite.velocity.A_knockbackHit(sprite, {
      value: 50,
      time: 0.5,
      direction: 'down',
    });

    /* 1 default + 4 for GSAP internal timeout */
    expect(setTimeout).toHaveBeenCalledTimes(5);
  });

  it('should velocity effect knockback with default options', () => {
    const sprite: Utils.PIXISprite = Factory.Sprite.create(
      { foo: 'bar' },
      {
        bump: false,
        velocity: true,
        d20rpg: false,
      },
    );

    sprite.velocity.A_knockbackHit(sprite, {
      value: 50,
      time: 0.5,
      direction: 'right',
    });

    /* 1 default + 4 for GSAP internal timeout */
    expect(setTimeout).toHaveBeenCalledTimes(5);
  });

  it('should velocity effect knockback with new options', () => {
    const sprite: Utils.PIXISprite = Factory.Sprite.create(
      { foo: 'bar' },
      {
        bump: false,
        velocity: true,
        d20rpg: false,
      },
    );

    sprite.velocity.A_knockbackHit(sprite, {
      value: 100,
      time: 2,
      direction: 'left',
    });

    /* 1 default + 4 for GSAP internal timeout */
    expect(setTimeout).toHaveBeenCalledTimes(5);
  });

  it('should velocity with error direction option to throw error', () => {
    const sprite: Utils.PIXISprite = Factory.Sprite.create(
      { foo: 'bar' },
      {
        bump: false,
        velocity: true,
        d20rpg: false,
      },
    );

    try {
      sprite.velocity.A_knockbackHit(sprite, {
        value: 100,
        time: 2,
        direction: 'upp',
      });
    } catch (e) {
      expect(e.message).toBe('pixi-factory: knockback receive unknown direction parameter');
    }
  });

  it('should set content in generic sprite', () => {
    const sprite: Utils.PIXISprite = Factory.Sprite.create(
      { foo: 'bar' },
      {
        bump: false,
        velocity: false,
        d20rpg: false,
        content: {
          test: 'test',
        },
      },
    );

    expect(sprite.test).toBe('test');
  });

  it('should override content in generic sprite', () => {
    const sprite: Utils.PIXISprite = Factory.Sprite.create(
      { foo: 'bar' },
      {
        bump: false,
        velocity: false,
        d20rpg: false,
        content: {
          foo: 'bar',
        },
      },
    );

    expect(sprite.foo).toBe('bar');
  });
});
