/**
 * @jest-environment jsdom
 */

//@ts-ignore
import * as PIXI from 'pixi.js';
import Factory, { PSprite } from '../src/index';
import { PIXISprite, Maybe } from '../src/types';

describe('Factory.Sprite', () => {
  beforeEach(() => {
    PIXI.utils.skipHello();
  });

  it('should exists factory sprite', () => {
    const sprite = Factory.Sprite.createGenericSprite(
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

      const sprite = Factory.Sprite.createGenericSprite(example, {
        bump: true,
        velocity: true,
        d20rpg: true,
      });

      expect(sprite).toBeTruthy();
    });
  });

  it('should exists factory sprite with PSprite instance', () => {
    const sprite = new PSprite().createGenericSprite(
      { foo: 'bar' },
      {
        bump: true,
        velocity: false,
        d20rpg: false,
      },
    );

    expect(sprite).toHaveProperty('_bumpPropertiesAdded');
  });

  it('should exists factory sprite with PIXI.Sprite and PSprite instance', () => {
    const app = new PIXI.Application();
    document.body.appendChild(app.view);

    app.loader.add('example', '_.jpg').load((loader, resources) => {
      const example = new PIXI.Sprite(resources['example']!.texture);

      const sprite = new PSprite().createGenericSprite(example, {
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

    let _sprite: Maybe<PIXISprite>;

    Promise.resolve(
      app.loader.add('example', '_.jpg').load((loader, resources) => {
        const example = new PIXI.Sprite(resources['example']!.texture);

        app.stage.addChild(example);

        const sprite = Factory.Sprite.createGenericSprite(example, {
          bump: true,
          velocity: false,
          d20rpg: false,
        });

        _sprite = sprite;
      }),
    ).then(() => {
      expect(_sprite as PIXISprite).toHaveProperty('_bumpPropertiesAdded');
    });
  });

  it('should exists velocity properties in new sprite', () => {
    const app = new PIXI.Application();
    document.body.appendChild(app.view);

    let _sprite: Maybe<PIXISprite>;

    Promise.resolve(
      app.loader.add('example', '_.jpg').load((loader, resources) => {
        const example = new PIXI.Sprite(resources['example']!.texture);

        app.stage.addChild(example);

        const sprite = Factory.Sprite.createGenericSprite(example, {
          bump: false,
          velocity: true,
          d20rpg: false,
        });

        _sprite = sprite;
      }),
    ).then(() => {
      expect(_sprite as PIXISprite).toHaveProperty('_velocityPropertiesAdded');
    });
  });

  it('should exists d20 rpg properties in new sprite', () => {
    const app = new PIXI.Application();
    document.body.appendChild(app.view);

    let _sprite: Maybe<PIXISprite>;

    Promise.resolve(
      app.loader.add('example', '_.jpg').load((loader, resources) => {
        const example = new PIXI.Sprite(resources['example']!.texture);

        app.stage.addChild(example);

        const sprite = Factory.Sprite.createGenericSprite(example, {
          bump: false,
          velocity: false,
          d20rpg: true,
        });

        _sprite = sprite;
      }),
    ).then(() => {
      expect(_sprite as PIXISprite).toHaveProperty('_d20RPGPropertiesAdded');
    });
  });

  it('should set new velocity in generic sprite', () => {
    const sprite = Factory.Sprite.createGenericSprite(
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
    const sprite = Factory.Sprite.createGenericSprite(
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
    const sprite = Factory.Sprite.createGenericSprite(
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
    const sprite = Factory.Sprite.createGenericSprite(
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

  it('should exists factory specific sprite with PSprite instance', () => {
    const sprite = new PSprite().createSpecificSprite({ name: 'guest001' }, { foo: 'bar' });

    expect(sprite).toHaveProperty('foo', 'bar');
  });

  it('should overload sprite definitions in specific create sprite in a PSprite instance', () => {
    const sprite = new PSprite().createSpecificSprite({ name: 'guest001' }, { name: 'guest002' });

    expect(sprite).toHaveProperty('name', 'guest002');
  });

  it('should exists factory specific sprite in a Factory', () => {
    const sprite = Factory.Sprite.createSpecificSprite({ name: 'guest001' }, { foo: 'bar' });

    expect(sprite).toHaveProperty('foo', 'bar');
  });

  it('should overload sprite definitions in specific create sprite in a Factory', () => {
    const sprite = Factory.Sprite.createSpecificSprite({ name: 'guest001' }, { name: 'guest002' });

    expect(sprite).toHaveProperty('name', 'guest002');
  });
});
