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

  updateBackground(texture) {
    const geometry = new THREE.PlaneGeometry(this.width, this.height);
    const material = new THREE.RawShaderMaterial(this.getShader(texture));
    const mesh = new THREE.Mesh(geometry, material);

    this.scene.add(mesh);
    this.render();
    this.render();
  }

  setSceneBackground(slideCount) {
    if (SCENE_BGS[slideCount].texture) {
      this.updateBackground(SCENE_BGS[slideCount].texture);
    } else {
      this.textureLoader.load(SCENE_BGS[slideCount].src, (texture) => {
        SCENE_BGS[slideCount].texture = texture;
        this.updateBackground(SCENE_BGS[slideCount].texture);
      });
    }
  }
}
