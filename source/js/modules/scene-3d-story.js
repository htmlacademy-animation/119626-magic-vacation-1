import Scene3D from "./scene-3d";
import Animation from './animation';

const SCENE_IMG_FOLDER = `./img/module-5/scenes-textures`;

const SCENE_BGS = [
  {
    src: `${SCENE_IMG_FOLDER}/scene-1.png`, // #a0ceff
    texture: null,
  },
  {
    src: `${SCENE_IMG_FOLDER}/scene-2.png`, // #3e72ee
    texture: null,
    shouldRenderBubbles: true,
  },
  {
    src: `${SCENE_IMG_FOLDER}/scene-3.png`, // #5f458c
    texture: null,
  },
  {
    src: `${SCENE_IMG_FOLDER}/scene-4.png`, // #a67ee5
    texture: null,
  },
];

export default class Scene3DStory extends Scene3D {
  constructor() {
    const canvas = document.getElementById(`story-scene`);

    super({canvas});

    this.start = this.start.bind(this);
    this.setSceneBackground = this.setSceneBackground.bind(this);

    this.setAnimations();
  }

  setAnimations() {
    this.animations.push(new Animation({
      func: (progress) => {
        if (this.material) {
          this.material.uniforms.uProgress = {value: progress};
        }
      },
      duration: 2000,
    }));
  }

  start() {
    this.setSceneBackground(0);
    super.start();
  }

  setSceneBackground(slideCount) {
    if (SCENE_BGS[slideCount].texture) {
      this.updateBackground(SCENE_BGS[slideCount]);
    } else {
      this.textureLoader.load(SCENE_BGS[slideCount].src, (texture) => {
        SCENE_BGS[slideCount].texture = texture;

        this.updateBackground(SCENE_BGS[slideCount]);
      });
    }

    this.startAnimation();
  }
}
