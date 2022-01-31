import * as THREE from 'three';
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

  updateBackground(texture) {
    const geometry = new THREE.PlaneGeometry(this.width, this.height);
    const material = new THREE.RawShaderMaterial(this.getShader(texture));
    const mesh = new THREE.Mesh(geometry, material);

    this.scene.add(mesh);

    this.render();
  }

  start() {
    if (SCENE_BG.texture) {
      this.updateBackground(SCENE_BG.texture);
    } else {
      this.textureLoader.load(SCENE_BG.src, (texture) => {
        SCENE_BG.texture = texture;
        this.updateBackground(SCENE_BG.texture);
      });
    }
  }
}
