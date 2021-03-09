/**
 * @jest-environment jsdom
 */

//@ts-ignore
import * as PIXI from 'pixi.js';
import Factory, { PSprite } from '../src/index';
import { PIXISprite } from '../src/types';
import { Maybe } from '../src/types';

describe("Factory.Sprite", () => {
  beforeEach(() => {
    PIXI.utils.skipHello();
  });

  it("should exists factory sprite", () => {
    const sprite = Factory.Sprite.createSprite({ foo: 'bar' }, {
      bump: true,
      velocity: true,
      d20rpg: true
    });

    expect(sprite).toBeTruthy();
  });

  it("should exists factory sprite with PIXI.Sprite", () => {
    const app = new PIXI.Application();
    document.body.appendChild(app.view);

    app.loader.add('example', '_.jpg').load((loader, resources) => {
      const example = new PIXI.Sprite(resources['example']!.texture);

      const sprite = Factory.Sprite.createSprite(example, {
        bump: true,
        velocity: true,
        d20rpg: true
      });
  
      expect(sprite).toBeTruthy();
    })
  })

  it("should exists factory sprite with PSprite instance", () => {
    const sprite = new PSprite().createSprite({ foo: 'bar' }, {
      bump: true,
      velocity: false,
      d20rpg: false
    });

    expect(sprite).toHaveProperty('_bumpPropertiesAdded');
  });

  it("should exists factory sprite with PIXI.Sprite and PSprite instance", () => {
    const app = new PIXI.Application();
    document.body.appendChild(app.view);

    app.loader.add('example', '_.jpg').load((loader, resources) => {
      const example = new PIXI.Sprite(resources['example']!.texture);

      const sprite = new PSprite().createSprite(example, {
        bump: true,
        velocity: true,
        d20rpg: true
      });
  
      expect(sprite).toBeTruthy();
    })
  })

  it("should exists bump properties in new sprite", () => {
    const app = new PIXI.Application();
    document.body.appendChild(app.view);

    let _sprite: Maybe<PIXISprite>;

    Promise.resolve(app.loader.add('example', '_.jpg').load((loader, resources) => {
      const example = new PIXI.Sprite(resources['example']!.texture);

      app.stage.addChild(example);

      const sprite = Factory.Sprite.createSprite(example, {
        bump: true,
        velocity: false,
        d20rpg: false
      });

      _sprite = sprite;
    })).then(() => { 
      expect(_sprite as PIXISprite).toHaveProperty('_bumpPropertiesAdded')
    })
  })

  it("should exists velocity properties in new sprite", () => {
    const app = new PIXI.Application();
    document.body.appendChild(app.view);

    let _sprite: Maybe<PIXISprite>;

    Promise.resolve(app.loader.add('example', '_.jpg').load((loader, resources) => {
      const example = new PIXI.Sprite(resources['example']!.texture);

      app.stage.addChild(example);

      const sprite = Factory.Sprite.createSprite(example, {
        bump: false,
        velocity: true,
        d20rpg: false
      });

      _sprite = sprite;
    })).then(() => { 
      expect(_sprite as PIXISprite).toHaveProperty('_velocityPropertiesAdded')
    })
  })

  it("should exists d20 rpg properties in new sprite", () => {
    const app = new PIXI.Application();
    document.body.appendChild(app.view);

    let _sprite: Maybe<PIXISprite>;

    Promise.resolve(app.loader.add('example', '_.jpg').load((loader, resources) => {
      const example = new PIXI.Sprite(resources['example']!.texture);

      app.stage.addChild(example);

      const sprite = Factory.Sprite.createSprite(example, {
        bump: false,
        velocity: false,
        d20rpg: true
      });

      _sprite = sprite;
    })).then(() => { 
      expect(_sprite as PIXISprite).toHaveProperty('_d20RPGPropertiesAdded')
    })
  })
})
