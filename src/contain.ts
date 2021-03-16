import { PIXISprite } from './types';

export const hitTestRectangle = (r1: PIXISprite, r2: PIXISprite) => {
  if (!r1._bumpPropertiesAdded && !r2._bumpPropertiesAdded) throw new Error('pixi-factory: bump properties not exists');

  r1.centerX = r1.x + r1.width / 2;
  r1.centerY = r1.y + r1.height / 2;
  r2.centerX = r2.x + r2.width / 2;
  r2.centerY = r2.y + r2.height / 2;

  r1.halfWidth = r1.width / 2;
  r1.halfHeight = r1.height / 2;
  r2.halfWidth = r2.width / 2;
  r2.halfHeight = r2.height / 2;

  const vx = r1.centerX - r2.centerX;
  const vy = r1.centerY - r2.centerY;

  const combinedHalfWidths = r1.halfWidth + r2.halfWidth;
  const combinedHalfHeights = r1.halfHeight + r2.halfHeight;

  return Math.abs(vx) < combinedHalfWidths && Math.abs(vy) < combinedHalfHeights;
};

export const hitTestCircle = (c1: PIXISprite, c2: PIXISprite, global = false) => {
  if (!c1._bumpPropertiesAdded && !c2._bumpPropertiesAdded) throw new Error('pixi-factory: bump properties not exists');

  let vx, vy;

  if (global) {
    vx = c2.gx + c2.width / 2 - c2.xAnchorOffset - (c1.gx + c1.width / 2 - c1.xAnchorOffset);
    vy = c2.gy + c2.width / 2 - c2.yAnchorOffset - (c1.gy + c1.width / 2 - c1.yAnchorOffset);
  } else {
    vx = c2.x + c2.width / 2 - c2.xAnchorOffset - (c1.x + c1.width / 2 - c1.xAnchorOffset);
    vy = c2.y + c2.width / 2 - c2.yAnchorOffset - (c1.y + c1.width / 2 - c1.yAnchorOffset);
  }

  const magnitude = Math.sqrt(vx * vx + vy * vy);

  const combinedRadii = c1.radius + c2.radius;

  return magnitude < combinedRadii;
};

export const hitTestCircleRectangle = (c1: PIXISprite, r1: PIXISprite, global = false) => {
  if (!r1._bumpPropertiesAdded && !c1._bumpPropertiesAdded) throw new Error('pixi-factory: bump properties not exists');

  let region, collision, c1x, c1y, r1x, r1y;

  if (global) {
    c1x = c1.gx;
    c1y = c1.gy;
    r1x = r1.gx;
    r1y = r1.gy;
  } else {
    c1x = c1.x;
    c1y = c1.y;
    r1x = r1.x;
    r1y = r1.y;
  }

  if (c1y - c1.yAnchorOffset < r1y - Math.abs(r1.halfHeight) - r1.yAnchorOffset) {
    if (c1x - c1.xAnchorOffset < r1x - 1 - Math.abs(r1.halfWidth) - r1.xAnchorOffset) {
      region = 'topLeft';
    } else if (c1x - c1.xAnchorOffset > r1x + 1 + Math.abs(r1.halfWidth) - r1.xAnchorOffset) {
      region = 'topRight';
    } else {
      region = 'topMiddle';
    }
  } else if (c1y - c1.yAnchorOffset > r1y + Math.abs(r1.halfHeight) - r1.yAnchorOffset) {
    if (c1x - c1.xAnchorOffset < r1x - 1 - Math.abs(r1.halfWidth) - r1.xAnchorOffset) {
      region = 'bottomLeft';
    } else if (c1x - c1.xAnchorOffset > r1x + 1 + Math.abs(r1.halfWidth) - r1.xAnchorOffset) {
      region = 'bottomRight';
    } else {
      region = 'bottomMiddle';
    }
  } else {
    if (c1x - c1.xAnchorOffset < r1x - Math.abs(r1.halfWidth) - r1.xAnchorOffset) {
      region = 'leftMiddle';
    } else {
      region = 'rightMiddle';
    }
  }

  if (region === 'topMiddle' || region === 'bottomMiddle' || region === 'leftMiddle' || region === 'rightMiddle') {
    collision = hitTestRectangle(c1, r1);
  } else {
    const point: any = {};

    switch (region) {
      case 'topLeft':
        point.x = r1x - r1.xAnchorOffset;
        point.y = r1y - r1.yAnchorOffset;
        break;

      case 'topRight':
        point.x = r1x + r1.width - r1.xAnchorOffset;
        point.y = r1y - r1.yAnchorOffset;
        break;

      case 'bottomLeft':
        point.x = r1x - r1.xAnchorOffset;
        point.y = r1y + r1.height - r1.yAnchorOffset;
        break;

      case 'bottomRight':
        point.x = r1x + r1.width - r1.xAnchorOffset;
        point.y = r1y + r1.height - r1.yAnchorOffset;
    }

    collision = hitTestCirclePoint(c1, point, global);
  }

  return collision ? region : collision;
};

export const hitTestCirclePoint = (c1: PIXISprite, point: any, global = false) => {
  if (!c1._bumpPropertiesAdded) throw new Error('pixi-factory: bump properties not exists');

  point.diameter = 1;
  point.width = point.diameter;
  point.radius = 0.5;
  point.centerX = point.x;
  point.centerY = point.y;
  point.gx = point.x;
  point.gy = point.y;
  point.xAnchorOffset = 0;
  point.yAnchorOffset = 0;
  point._bumpPropertiesAdded = true;
  return hitTestCircle(c1, point);
};
