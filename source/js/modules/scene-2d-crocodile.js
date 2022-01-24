import Animation from './animation.js';
import Scene2D from './scene-2d.js';
import _ from './timing-functions.js';
import {CANVAS_IMG_URI} from './constants';

const SCENE_IMG_FOLDER = `module-4/lose-images`;

const KEY_FADE_IN_DURATION = 300;

const THING_INITIAL_PARAM = {
  x: 50,
  y: 50,
  size: 0,
  opacity: 1,
  transforms: {}
};

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
  DELAY: THINGS_IN_PARAMS.DELAY + THINGS_IN_PARAMS.DURATION - 100,
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
    transforms: {
      translateX: 50,
      translateY: -10,
    }
  },
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
  }

  initKeyAnimations() {
    this.animations.push(new Animation({
      func: (progress) => {
        this.objects.key.opacity = progress;
        this.objects.key.size = OBJECTS[`key`].size / 2 * progress * 2;
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
        this.objects.crocodile.transforms.translateX = (1 - progress) * 50;
        this.objects.crocodile.transforms.translateY = (1 - progress) * -10;
      },
      duration: CROCODILE_PARAMS.DURATION,
      delay: CROCODILE_PARAMS.DELAY,
      easing: _.easeOutCubic
    }));
  }
}
