import Animation from './animation.js';
import Scene2D from './scene-2d.js';
import _ from './timing-functions.js';
import {CANVAS_IMG_URI} from './constants';

const SCENE_IMG_FOLDER = `module-4/lose-images`;

const KEY_FADE_IN_DURATION = 300;

const THINGS_IN_PARAMS = {
  DURATION: 400,
  DELAY: KEY_FADE_IN_DURATION + 50,
};

const THINGS_OUT_PARAMS = {
  DURATION: 500,
  DELAY: THINGS_IN_PARAMS.DELAY + THINGS_IN_PARAMS.DURATION + 100,
};

const CROCODILE_PARAMS = {
  DURATION: 900,
  DELAY: 700,
};

const DROP_IN_PARAMS = {
  DURATION: 400,
  DELAY: CROCODILE_PARAMS.DELAY + CROCODILE_PARAMS.DURATION + 400,
};

const DROP_OUT_PARAMS = {
  DURATION: 400,
  DELAY: DROP_IN_PARAMS.DELAY + DROP_IN_PARAMS.DURATION + 100,
};

const IMAGES_URLS = Object.freeze({
  key: `${CANVAS_IMG_URI}/${SCENE_IMG_FOLDER}/key.png`,
  flamingo: `${CANVAS_IMG_URI}/${SCENE_IMG_FOLDER}/flamingo.png`,
  crocodile: `${CANVAS_IMG_URI}/${SCENE_IMG_FOLDER}/crocodile.png`,
  drop: `${CANVAS_IMG_URI}/${SCENE_IMG_FOLDER}/drop.png`,
  leaf: `${CANVAS_IMG_URI}/${SCENE_IMG_FOLDER}/leaf.png`,
  saturn: `${CANVAS_IMG_URI}/${SCENE_IMG_FOLDER}/saturn.png`,
  snowflake: `${CANVAS_IMG_URI}/${SCENE_IMG_FOLDER}/snowflake.png`,
  watermelon: `${CANVAS_IMG_URI}/${SCENE_IMG_FOLDER}/watermelon.png`
});

const THING_INITIAL_PARAM = {
  x: 50,
  y: 50,
  size: 0,
  opacity: 1,
  transforms: {}
};

const THINGS = {
  flamingo: {
    imageId: `flamingo`,
    ...THING_INITIAL_PARAM,
  },
  watermelon: {
    imageId: `watermelon`,
    ...THING_INITIAL_PARAM,
  },
  leaf: {
    imageId: `leaf`,
    ...THING_INITIAL_PARAM,
  },
  snowflake: {
    imageId: `snowflake`,
    ...THING_INITIAL_PARAM,
  },
  saturn: {
    imageId: `saturn`,
    ...THING_INITIAL_PARAM,
  },
};

const OBJECTS = Object.freeze({
  key: {
    imageId: `key`,
    x: 50,
    y: 50,
    size: 20,
    opacity: 0,
    transforms: {}
  },
  crocodile: {
    imageId: `crocodile`,
    x: 50,
    y: 60,
    size: 80,
    opacity: 0,
    transforms: {
      translateX: 50,
      translateY: -10,
    }
  },
  drop: {
    imageId: `drop`,
    x: 45,
    y: 65,
    size: 5,
    opacity: 0,
    transforms: {}
  },
  ...THINGS,
});

const LOCALS = Object.freeze({
  keyMask: {
    centerX: 50,
    centerY: 50,
  }
});

export default class Scene2DCrocodile extends Scene2D {
  constructor() {
    const canvas = document.getElementById(`crocodile-scene`);

    super({
      canvas,
      objects: OBJECTS,
      locals: LOCALS,
      imagesUrls: IMAGES_URLS,
    });

    this.afterInit = () => {
      this.objects.crocodile.after = this.drawKeyMask.bind(this);
    };

    this.initObjects(OBJECTS);
    this.initLocals();
    this.start();

  }

  initLocals() {
    this.locals = {
      keyMask: {
        centerX: LOCALS.keyMask.centerX,
        centerY: LOCALS.keyMask.centerY
      }
    };
  }

  initEventListeners() {
    window.addEventListener(`resize`, this.updateSize.bind(this));
  }

  initAnimations() {
    this.animations.push(new Animation({
      func: () => {
        this.drawScene();
      },
      duration: `infinite`,
      fps: 60
    }));

    this.initKeyAnimations();
    this.initFlamingoAnimations();
    this.initWatermelonAnimations();
    this.initLeafAnimations();
    this.initSnowflakeAnimations();
    this.initSaturnAnimations();
    this.initCrocodileAnimations();
    this.initDropAnimations();
  }

  initKeyAnimations() {
    this.animations.push(new Animation({
      func: (progress) => {
        this.objects.key.opacity = progress;
        this.objects.key.size = OBJECTS[`key`].size * progress;
      },
      duration: KEY_FADE_IN_DURATION,
      easing: _.easeInCubic
    }));
  }

  initFlamingoAnimations() {
    const yMultiplier = -5;

    this.animations.push(new Animation({
      func: (progress) => {
        this.objects.flamingo.size = progress * 20;
        this.objects.flamingo.transforms.rotate = (1 - progress) * 40;
        this.objects.flamingo.transforms.translateX = progress * -25;
        this.objects.flamingo.transforms.translateY = progress * yMultiplier;
      },
      duration: THINGS_IN_PARAMS.DURATION,
      delay: THINGS_IN_PARAMS.DELAY,
      easing: _.easeOutCubic,
    }));

    this.animations.push(new Animation({
      func: (progress) => {
        this.objects.flamingo.transforms.translateY = progress * 70 + yMultiplier;
      },
      duration: THINGS_OUT_PARAMS.DURATION,
      delay: THINGS_OUT_PARAMS.DELAY,
      easing: _.easeInCubic,
    }));
  }

  initWatermelonAnimations() {
    const yMultiplier = 20;

    this.animations.push(new Animation({
      func: (progress) => {
        this.objects.watermelon.size = progress * 15;
        this.objects.watermelon.transforms.rotate = progress * -10;
        this.objects.watermelon.transforms.translateX = progress * -40;
        this.objects.watermelon.transforms.translateY = progress * yMultiplier;
      },
      duration: THINGS_IN_PARAMS.DURATION,
      delay: THINGS_IN_PARAMS.DELAY,
      easing: _.easeOutCubic,
    }));

    this.animations.push(new Animation({
      func: (progress) => {
        this.objects.watermelon.transforms.translateY = progress * 40 + yMultiplier;
      },
      duration: THINGS_OUT_PARAMS.DURATION,
      delay: THINGS_OUT_PARAMS.DELAY + 150,
      easing: _.easeInCubic,
    }));
  }

  initLeafAnimations() {
    const yMultiplier = -5;

    this.animations.push(new Animation({
      func: (progress) => {
        this.objects.leaf.size = progress * 25;
        this.objects.leaf.transforms.rotate = progress * -5;
        this.objects.leaf.transforms.translateX = progress * 40;
        this.objects.leaf.transforms.translateY = progress * yMultiplier;
      },
      duration: THINGS_IN_PARAMS.DURATION,
      delay: THINGS_IN_PARAMS.DELAY,
      easing: _.easeOutCubic,
    }));

    this.animations.push(new Animation({
      func: (progress) => {
        this.objects.leaf.transforms.translateY = progress * 70 + yMultiplier;
      },
      duration: THINGS_OUT_PARAMS.DURATION,
      delay: THINGS_OUT_PARAMS.DELAY,
      easing: _.easeInCubic,
    }));
  }

  initSnowflakeAnimations() {
    const yMultiplier = 5;

    this.animations.push(new Animation({
      func: (progress) => {
        this.objects.snowflake.size = progress * 15;
        this.objects.snowflake.transforms.rotate = progress * -30;
        this.objects.snowflake.transforms.translateX = progress * 15;
        this.objects.snowflake.transforms.translateY = progress * yMultiplier;
      },
      duration: THINGS_IN_PARAMS.DURATION,
      delay: THINGS_IN_PARAMS.DELAY,
      easing: _.easeOutCubic,
    }));

    this.animations.push(new Animation({
      func: (progress) => {
        this.objects.snowflake.transforms.translateY = progress * 50 + yMultiplier;
      },
      duration: THINGS_OUT_PARAMS.DURATION,
      delay: THINGS_OUT_PARAMS.DELAY + 100,
      easing: _.easeInCubic,
    }));
  }

  initSaturnAnimations() {
    const yMultiplier = 25;

    this.animations.push(new Animation({
      func: (progress) => {
        this.objects.saturn.size = progress * 20;
        this.objects.saturn.transforms.rotate = progress * -10;
        this.objects.saturn.transforms.translateX = progress * 35;
        this.objects.saturn.transforms.translateY = progress * yMultiplier;
      },
      duration: THINGS_IN_PARAMS.DURATION,
      delay: THINGS_IN_PARAMS.DELAY,
      easing: _.easeOutCubic,
    }));

    this.animations.push(new Animation({
      func: (progress) => {
        this.objects.saturn.transforms.translateY = progress * 35 + yMultiplier;
      },
      duration: THINGS_OUT_PARAMS.DURATION,
      delay: THINGS_OUT_PARAMS.DELAY + 150,
      easing: _.easeInCubic,
    }));
  }

  initCrocodileAnimations() {
    this.animations.push(new Animation({
      func: (progress) => {
        this.objects.crocodile.opacity = progress;
        this.objects.crocodile.transforms.translateX = (1 - progress) * 50;
        this.objects.crocodile.transforms.translateY = (1 - progress) * -10;
      },
      duration: CROCODILE_PARAMS.DURATION,
      delay: CROCODILE_PARAMS.DELAY,
      easing: _.easeOutCubic,
    }));
  }

  initDropAnimations() {
    for (let i = 0; i < 3; i++) {
      const delay = i * 3000;

      this.animations.push(new Animation({
        func: (progress) => {
          this.objects.drop.opacity = progress;
          this.objects.drop.transforms.translateY = 0;
          this.objects.drop.transforms.scaleX = progress;
          this.objects.drop.transforms.scaleY = progress;
        },
        duration: DROP_IN_PARAMS.DURATION,
        delay: DROP_IN_PARAMS.DELAY + delay,
        easing: _.easeOutCubic,
      }));

      this.animations.push(new Animation({
        func: (progress) => {
          this.objects.drop.opacity = 1 - progress;
          this.objects.drop.transforms.translateY = progress * 10;
        },
        duration: DROP_OUT_PARAMS.DURATION,
        delay: DROP_OUT_PARAMS.DELAY + delay,
        easing: _.easeInCubic,
      }));
    }
  }

  drawKeyMask() {
    const scale = this.size / 100;

    const x0 = this.size;
    const y0 = this.size;

    const x1 = (this.locals.keyMask.centerX + this.objects.key.size * 0.5) * scale;
    const y1 = y0;

    const x2 = x1;
    const y2 = (this.locals.keyMask.centerY + this.objects.key.size * 0.85) * scale;

    const x3 = (this.locals.keyMask.centerX + this.objects.key.size * 0.33) * scale;
    const y3 = this.size / 2;

    const cp1x4 = (this.locals.keyMask.centerX + this.objects.key.size * 0.7) * scale;
    const cp1y4 = (this.locals.keyMask.centerY - this.objects.key.size * 0.4) * scale;
    const cp2x4 = this.locals.keyMask.centerX * 1.15 * scale;
    const cp2y4 = (this.locals.keyMask.centerY * 0.66) * scale;
    const x4 = this.locals.keyMask.centerX * scale;
    const y4 = (this.locals.keyMask.centerY * 0.66) * scale;

    const x5 = this.locals.keyMask.centerX * scale;
    const y5 = 0;

    const x6 = this.size;
    const y6 = 0;

    this.ctx.save();

    this.ctx.fillStyle = `#5f458c`;

    this.ctx.beginPath();

    this.ctx.moveTo(x0, y0);
    this.ctx.lineTo(x1, y1);
    this.ctx.lineTo(x2, y2);
    this.ctx.lineTo(x3, y3);
    this.ctx.bezierCurveTo(cp1x4, cp1y4, cp2x4, cp2y4, x4, y4);
    this.ctx.lineTo(x5, y5);
    this.ctx.lineTo(x6, y6);

    this.ctx.fill();
    this.ctx.restore();
  }
}
