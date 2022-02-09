import Scene3D from "./scene-3d";

const SCENE_BG = {
  src: `./img/module-5/scenes-textures/scene-0.png`,
  texture: null,
};

export default class Scene3DIntro extends Scene3D {
  constructor() {
    const canvas = document.getElementById(`intro-scene`);

    super({canvas});
  }

  start() {
    if (SCENE_BG.texture) {
      this.updateBackground(SCENE_BG);
    } else {
      this.textureLoader.load(SCENE_BG.src, (texture) => {
        SCENE_BG.texture = texture;
        this.updateBackground(SCENE_BG);
      });
    }

    super.start();
  }
}
