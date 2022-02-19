import Scene3D from "./scene-3d";

const SCENE_IMG_FOLDER = `./img/module-5/scenes-textures`

const SCENE_BGS = [
  {
    src: `${SCENE_IMG_FOLDER}/scene-1.png`, // #a0ceff
    texture: null,
  },
  {
    src: `${SCENE_IMG_FOLDER}/scene-2.png`, // #3e72ee
    texture: null,
    hue: -0.2,
    shouldRenderBubbles: true,
    bubble1: [0.95, 1.8, 0.1],
    bubble2: [0.65, 0.65, 0.15],
    bubble3: [1.25, 0.75, 0.25],
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

    this.setSceneBackground = this.setSceneBackground.bind(this);
  }

  start() {
    super.start();
    this.setSceneBackground(0);
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
  }
}
