import Scene3D from "./scene-3d";
import IntroScene from "./scenes/intro-scene";

export default class Scene3DIntro extends Scene3D {
  constructor() {
    const canvas = document.getElementById(`intro-scene`);

    super({canvas});

  }

  start() {
    this.addScene();

    super.start();
  }

  addScene() {
    const group = new IntroScene();

    group.addAnimations(this.animations);

    this.scene.add(group);
  }
}
