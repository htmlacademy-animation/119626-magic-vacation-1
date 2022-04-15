import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'; // TODO: remove. for devs only
import Scene3D from "./scene-3d";
import IntroScene from "./scenes/intro-scene";

const SCENE_BG = {
  src: `./img/module-5/scenes-textures/scene-0.png`,
  texture: null,
};

export default class Scene3DIntro extends Scene3D {
  constructor() {
    const canvas = document.getElementById(`intro-scene`);

    super({canvas});

    this.setAnimations();
  }

  setAnimations() {
    // TODO: implement
  }

  setSceneBackground() {
    if (SCENE_BG.texture) {
      this.updateBackground(SCENE_BG);
    } else {
      this.textureLoader.load(SCENE_BG.src, (texture) => {
        SCENE_BG.texture = texture;
        this.updateBackground(SCENE_BG);
      });
    }
  }

  start() {
    this.setSceneBackground();

    this.scene.add(new IntroScene());

    this.controls = new OrbitControls(this.camera, this.renderer.domElement); // TODO: remove. for devs only

    super.start();
  }
}
