import * as THREE from 'three';
import Scene3D from "./scene-3d";

const SCENE_IMG_FOLDER = `./img/module-5/scenes-textures`;

const SCENE_BGS = [
  {
    src: `${SCENE_IMG_FOLDER}/scene-1.png`, // #a0ceff
    texture: null,
  },
  {
    src: `${SCENE_IMG_FOLDER}/scene-2.png`, // #3e72ee
    texture: null,
    hue: -0.2,
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
  }

  updateBackground(texture, hue) {
    const shader = this.getShader(texture, hue);
    const geometry = new THREE.PlaneGeometry(this.width, this.height);
    const material = new THREE.RawShaderMaterial(shader);
    const mesh = new THREE.Mesh(geometry, material);

    this.scene.add(mesh);
    this.render();
    this.render();
  }

  setSceneBackground(slideCount) {
    const {src, texture, hue} = SCENE_BGS[slideCount];

    if (texture) {
      this.updateBackground(texture, hue);
    } else {
      this.textureLoader.load(src, (textureFromLoader) => {
        SCENE_BGS[slideCount].texture = textureFromLoader;
        this.updateBackground(textureFromLoader, hue);
      });
    }
  }
}
