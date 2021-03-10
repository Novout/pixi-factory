# PIXI.JS Factory (WIP)

![License Badge](https://img.shields.io/github/license/Novout/pixi-factory)

A superset for creating and handling Pixi.js resources

- `pixi-factory` does not yet have an npm package, if you already want to use this library, see the FAQ at the end of this markdown.
- [Documentation is here](https://pixi-factory.vercel.app/)

## Usage

We recommend that you use `Factory.*` To avoid new method intentions, in addition to already containing everything that the library has.

### Sprite

With `Factory.Sprite.*` or `new PSprite().*` create and handle sprites in a more coherent way and with new features.

#### Creating a Generic Sprite

```js
import * as PIXI from 'pixi.js';
import Factory from 'pixi-factory';

const app = new PIXI.Application();
document.body.appendChild(app.view);

app.loader.add('example', 'example.jpg').load((loader, resources) => {
  const example = Factory.Sprite.createSprite(new PIXI.Sprite(resources.example.texture), {
    bump: true, // hability a collision properties
    velocity: true, // hability a velocity base content
    d20rpg: true, // hability a standard d20 rpg
  });

  console.log(example.velocity); // a velocity content
  console.log(example.centerY); // a bump property
  console.log(example.base); // a d20 rpg contents

  app.stage.addChild(example);
  // ...
});
```

#### Creating a Specific Sprite

This way you will attach the entire object passed in the options at the root of the desired object.

```ts
import * as PIXI from 'pixi.js';
import Factory from 'pixi-factory';

const sprite = Factory.Sprite.createSpecificSprite(new PIXI.Sprite(resources.example.texture), { foo: 'bar' });
```

##### Generic Sprites

The creation functions expect only a generic object with a key in `string`, so that the methods are not directly dependent on PIXI, being able to create external objects.

```ts
import Factory from 'pixi-factory';

const sprite = Factory.Sprite.createSpecificSprite({ name: 'guest001' }, { foo: 'bar' });
```

The internal methods are also generic, waiting to receive the sprite that is being instantiated, modifying the internal methods. It is not a directly safe approach because it is changeable, but it makes it easy to handle objects without the need for an ECS.

```js
import * as PIXI from 'pixi.js';
import Factory, { Utils } from 'pixi-factory';

const example = Factory.Sprite.createSprite(new PIXI.Sprite(resources.example.texture), {
  bump: true,
  velocity: true,
  d20rpg: true,
});

example.velocity.setVelocity(example, 10);
console.log(example.velocity.x); // 10

// or

example.velocity.x = 10;
example.velocity.y = 10;
```

> All methods are available in the documentation

## TypeScript

All interfaces and types are exported with the `Utils` namespace, thus being able to directly use the internal typing for your objects.

```ts
import Factory, { Utils } from 'pixi-factory';

const sprite: Utils.PIXISprite = Factory.Sprite.createGenericSprite(example, {
  bump: true,
  velocity: true,
  d20rpg: true
});

> We recommend that you use `"strictNullChecks": false` in `tsconfig.json` if you are using `Typescript` in your project.
```

## FAQ

### Why not instantiate directly from classes?

It would be necessary to extend directly from `PIXI.DisplayObject` in addition to injecting some resources by default, polluting objects.

### Why not just use CDN, requiring installation of the package?

Standardizing the packages and the way to use pixi.js can bring future benefits, especially while using webpack/snowpack. If necessary, clone this project and run `npm i && npm run build`, this generating a `index.js` module and other extensions in the `/lib` folder. Consulting `rollup.config.js` for other options.
