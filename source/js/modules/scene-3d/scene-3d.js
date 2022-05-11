import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'; // TODO: remove. for devs only
import * as THREE from 'three';
import Stats from 'stats.js';
import vertexShader from '../../shaders/vertex-shader-base.glsl';
import fragmentShader from '../../shaders/fragment-shader-scene-2.glsl';

// TODO: remove. for devs only
const stats = new Stats();
stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild(stats.dom);

export default class Scene3D {
  constructor(options) {
    this.canvas = options.canvas;
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.devicePixelRatio = window.devicePixelRatio;
    this.aspectRatio = this.width / this.height;
    this.perspectiveAngle = 35;
    this.cameraZCoordinateMin = 0.1;
    this.cameraZCoordinateMax = 3000; // TODO: change

    this.shadowMapSizeWidth = 512;
    this.shadowMapSizeHeight = 512;
    this.shadowCameraFar = 3000;

    this.animationId = null;
    this.material = null;
    this.animations = [];
    this.objects = {};

    this.tick = this.tick.bind(this);

    this.init();
  }

  getRandomHue() {
    const HUE_MIN = 0.2;
    const HUE_MAX = 0.5;
    const randomHue = Math.random();

    if (randomHue > HUE_MAX) {
      return HUE_MAX;
    }

    if (randomHue < HUE_MIN) {
      return HUE_MIN;
    }

    return randomHue;
  }

  setMaterial(scene) {
    this.material = new THREE.RawShaderMaterial({
      uniforms: {
        uMap: {
          value: scene.texture,
        },
        uHue: {
          value: this.getRandomHue(),
        },
        uCanvasSize: {
          value: [this.width, this.height],
        },
        uShouldRenderBubbles: {
          value: scene.shouldRenderBubbles,
        },
        uProgressHue: {
          value: 0,
        },
        uProgressBubble1: {
          value: 0.5,
        },
        uProgressBubble2: {
          value: 0,
        },
        uProgressBubble3: {
          value: 0,
        }
      },
      vertexShader: vertexShader.sourceCode,
      fragmentShader: fragmentShader.sourceCode,
    });
  }

  updateBackground(texture) {
    this.setMaterial(texture);
  }

  init() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
        this.perspectiveAngle,
        this.aspectRatio,
        this.cameraZCoordinateMin,
        this.cameraZCoordinateMax
    );

    this.camera.position.y = 800;
    this.camera.position.z = 2550;

    this.textureLoader = new THREE.TextureLoader();

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas
    });

    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    const color = new THREE.Color(`#5f458c`);
    const alpha = 1;

    this.renderer.setClearColor(color, alpha);
    this.renderer.setPixelRatio(this.devicePixelRatio);
    this.renderer.setSize(this.width, this.height);

    this.scene.add(this.getLights());

    this.controls = new OrbitControls(this.camera, this.renderer.domElement); // TODO: remove. for devs only
  }

  renderScene() {
    this.renderer.render(this.scene, this.camera);
  }

  tick() {
    this.renderScene();

    this.animationId = requestAnimationFrame(this.tick);
    stats.update();
  }

  stopAnimation() {
    if (this.animations && this.animations.length) {
      this.animations.forEach((animation) => {
        animation.stop();
      });
    }
  }

  startAnimation() {
    if (this.animations && this.animations.length) {
      this.animations.forEach((animation) => {
        animation.start();
      });
    }
  }

  stop() {
    this.stopAnimation();

    cancelAnimationFrame(this.animationId);
    this.animationId = null;
  }

  start() {
    this.stop();
    this.startAnimation();

    this.animationId = requestAnimationFrame(this.tick);
  }

  getLights() {
    const light = new THREE.Group();

    // Light 1
    const lightUnit1 = new THREE.DirectionalLight(new THREE.Color(`rgb(255,255,255)`), 0.84);

    lightUnit1.position.set(0, this.camera.position.z * Math.tan(15 * THREE.Math.DEG2RAD), 0);

    light.add(lightUnit1);

    // Light 2
    const lightUnit2 = new THREE.PointLight(new THREE.Color(`rgb(246,242,255)`), 0.6, 0, 2);

    lightUnit2.position.set(-800, -350, 710);

    lightUnit2.castShadow = true;
    lightUnit2.shadow.mapSize.width = this.shadowMapSizeWidth;
    lightUnit2.shadow.mapSize.height = this.shadowMapSizeHeight;
    lightUnit2.shadow.camera.far = this.shadowCameraFar;

    light.add(lightUnit2);

    // Light 3
    const lightUnit3 = new THREE.PointLight(new THREE.Color(`rgb(245,254,255)`), 0.95, 0, 2);

    lightUnit3.position.set(730, 800, 985);

    lightUnit3.castShadow = true;
    lightUnit3.shadow.mapSize.width = this.shadowMapSizeWidth;
    lightUnit3.shadow.mapSize.height = this.shadowMapSizeHeight;
    lightUnit3.shadow.camera.far = this.shadowCameraFar;

    light.add(lightUnit3);

    return light;
  }
}
