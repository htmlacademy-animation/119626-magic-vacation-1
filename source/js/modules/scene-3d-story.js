import * as THREE from 'three';
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

    this.setAnimations();
  }

  setAnimations() {
    this.animations.push(new Animation({
      func: (progress) => {
        if (this.material) {
          this.material.uniforms.uProgressHue = {value: progress};
        }
      },
      duration: 2000,
    }));

    this.animations.push(new Animation({
      func: (progress) => {
        if (this.material) {
          this.material.uniforms.uProgressBubble1 = {value: progress};
        }
      },
      duration: 1300,
    }));

    this.animations.push(new Animation({
      func: (progress) => {
        if (this.material) {
          this.material.uniforms.uProgressBubble2 = {value: progress};
        }
      },
      duration: 1200,
      delay: 700,
    }));

    this.animations.push(new Animation({
      func: (progress) => {
        if (this.material) {
          this.material.uniforms.uProgressBubble3 = {value: progress};
        }
      },
      duration: 1100,
      delay: 1200,
    }));
  }

  start() {
    this.setSceneBackground(0);
    this.scene.add(this.getSphere());
    this.scene.add(this.getLight());
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

    if (slideCount === 1) {
      super.startAnimation();
    } else {
      super.stopAnimation();
    }
  }

  getSphere() {
    const geometry = new THREE.SphereGeometry(100, 200, 32);

    const material = new THREE.MeshStandardMaterial({
      color: 0x000000,
      metalness: 0.05,
      emissive: 0x0,
      roughness: 0.5
    });

    return new THREE.Mesh(geometry, material);
  }


  getLight() {
    const light = new THREE.Group();

    // Light 1
    const lightUnit1 = new THREE.DirectionalLight(new THREE.Color(`rgb(255,255,255)`), 0.84);

    lightUnit1.position.set(0, this.camera.position.z * Math.tan(15 * THREE.Math.DEG2RAD), 0);

    light.add(lightUnit1);

    // Light 2
    const lightUnit2 = new THREE.PointLight(new THREE.Color(`rgb(246,242,255)`), 0.6, 0, 2);

    lightUnit2.position.set(-785, -350, -710);

    light.add(lightUnit2);

    // Light 3
    const lightUnit3 = new THREE.PointLight(new THREE.Color(`rgb(245,254,255)`), 0.95, 0, 2);

    lightUnit3.position.set(730, 800, -985);

    light.add(lightUnit3);

    return light;
  }
}
