# PIXI.JS Factory (WIP)

![License Badge](https://img.shields.io/github/license/Novout/pixi-factory)

A superset for creating and handling Pixi.js resources

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
  const example = Factory.Sprite.create(new PIXI.Sprite(resources.example.texture), {
    bump: true, // hability a collision properties
    velocity: true, // hability a velocity base content
    d20rpg: true, // hability a standard d20 rpg
    content: {
      // append or override content in a base sprite properties
      x: 100,
      y: 100,
    },
  });

  console.log(example.velocity); // a velocity content
  console.log(example.centerY); // a bump property
  console.log(example.base); // a d20 rpg contents

  app.stage.addChild(example);
  // ...
});
```

##### Generic Sprites

The creation functions expect only a generic object with a key in `string`, so that the methods are not directly dependent on PIXI, being able to create external objects.

```ts
import Factory from 'pixi-factory';

const sprite = Factory.Sprite.create({ name: 'guest001' }, { foo: 'bar' });
```

The internal methods are also generic, waiting to receive the sprite that is being instantiated, modifying the internal methods. It is not a directly safe approach because it is changeable, but it makes it easy to handle objects without the need for an ECS.

```js
import * as PIXI from 'pixi.js';
import Factory from 'pixi-factory';

const example = Factory.Sprite.create(new PIXI.Sprite(resources.example.texture), {
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

##### Actions and Events

All methods starts with `A_**` (Actions) is called only once to execute effect, while those starting with the prefix `E_**` (Events) need to be called constantly on the same tick such as tracking motion events that are specific to each tick.

##### Action

```ts
/* By default, this function takes 1 second to be fully generated, but it only needs to be called once to take effect. */
sprite.velocity.A_knockbackHit(sprite);
```

##### Events

```ts
import * as PIXI from 'pixi.js';
import Factory from 'pixi-factory';

const app = new PIXI.Application();
document.body.appendChild(app.view);

app.loader.add('example', 'example.jpg').load((loader, resources) => {
  const a = Factory.Sprite.create(new PIXI.Sprite(resources.example.texture), {
    bump: true,
    velocity: true,
    d20rpg: true,
  });

  const b = Factory.Sprite.create(new PIXI.Sprite(resources.example.texture), {
    bump: true,
    velocity: true,
    d20rpg: true,
  });

  app.stage.addChild(a);
  app.stage.addChild(b);

  app.ticker.add(() => {
    /* Return a boolean */
    console.log(a.base.E_hit(a, b, { type: 'rectangle' }));
  });
});
```

### Group

With `Factory.Group.*` create and handle groups in a more coherent way and with new features.

#### Basic Usage

```js
import * as PIXI from 'pixi.js';
import Factory from 'pixi-factory';
// ...
function setup() {
  const sprite = Factory.Sprite.create(new PIXI.Sprite(resources.example.texture));
  const group = Factory.Group.create([sprite], { container: app.stage });

  // or

  const wolfs = Factory.Group.create(
    [
      ['wolf1', Factory.Sprite.create(new PIXI.Sprite(resources.wolf.texture))],
      ['wolf2', Factory.Sprite.create(new PIXI.Sprite(resources.wolf.texture))],
      ['wolf3', Factory.Sprite.create(new PIXI.Sprite(resources.wolf.texture))],
    ],
    { container: app.stage, key: true },
  );

  console.log(wolfs.getSprite('wolf1'));
}
```

##### Sprites Reference

It is possible to mutate objects in all ways to maintain coherent handling and not restrict sprites to the `Factory`

```js
// example utilizing a pixi-controller package
import * as PIXI from 'pixi.js';
import Controller, { BUTTON, PLAYER } from 'pixi-controller';
import Factory from 'pixi-factory';

const app = new PIXI.Application();
document.body.appendChild(app.view);

app.loader.add('example', 'example.jpg').load((loader, resources) => {
  const _example = Factory.Sprite.create(new PIXI.Sprite(resources.example.texture), {
    bump: true,
    velocity: true,
  });
  const group = Factory.Group.create([['example', _example]], { container: app.stage, key: true });
  Controller.Mouse.prevent(BUTTON.RIGHT);

  app.ticker.add(() => {
    if (Controller.Keyboard.isKeyDown(...PLAYER.LEFT)) group.getSprite('example').x -= 1;
    if (Controller.Keyboard.isKeyDown(...PLAYER.RIGHT)) _example.x += 1;
    if (Controller.Keyboard.isKeyDown(...PLAYER.UP)) group.getSprite('example').y -= 1;
    if (Controller.Keyboard.isKeyDown(...PLAYER.DOWN)) _example.y += 1;

    Controller.update();
  });
});
```

## TypeScript

All interfaces and types are exported with the `Utils` namespace, thus being able to directly use the internal typing for your objects.

```ts
import Factory, { Utils } from 'pixi-factory';

const sprite: Utils.PIXISprite = Factory.Sprite.create(example, {
  bump: true,
  velocity: true,
  d20rpg: true,
});
```

> We recommend that you use `"strictNullChecks": false` in `tsconfig.json` if you are using `Typescript` in your project.

## FAQ

### Why not instantiate directly from classes?

It would be necessary to extend directly from `PIXI.DisplayObject` in addition to injecting some resources by default, polluting objects.

### Why not just use CDN, requiring installation of the package?

Standardizing the packages and the way to use pixi.js can bring future benefits, especially while using webpack/snowpack. If necessary, clone this project and run `npm i && npm run build`, this generating a `index.js` module and other extensions in the `/lib` folder. Consulting `rollup.config.js` for other options.
