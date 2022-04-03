import * as THREE from 'three';
import vertexShader from '../webGL/shaders/vertexShader.glsl';
import fragmentShader from '../webGL/shaders/fragmentShader.glsl';

export default class Scene3D {
  constructor(options) {
    this.canvas = options.canvas;
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.devicePixelRatio = window.devicePixelRatio;
    this.aspectRatio = this.width / this.height;
    this.perspectiveAngle = 45;
    this.zCoordinateMin = 0.1;
    this.zCoordinateMax = 1000;

    this.animationId = null;
    this.animations = [];
    this.material = null;

    this.init();

    this.tick = this.tick.bind(this);
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
        uProgress: {
          value: 0,
        }
      },
      vertexShader: vertexShader.sourceCode,
      fragmentShader: fragmentShader.sourceCode,
    });
  }

  updateBackground(texture) {
    this.setMaterial(texture);

    const geometry = new THREE.PlaneGeometry(this.width, this.height);
    const mesh = new THREE.Mesh(geometry, this.material);

    this.scene.add(mesh);
  }

  init() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
        this.perspectiveAngle,
        this.aspectRatio,
        this.zCoordinateMin,
        this.zCoordinateMax
    );

    this.camera.position.z = 1000;

    this.textureLoader = new THREE.TextureLoader();

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas
    });

    const color = new THREE.Color(`#5f458c`);
    const alpha = 1;

    this.renderer.setClearColor(color, alpha);
    this.renderer.setPixelRatio(this.devicePixelRatio);
    this.renderer.setSize(this.width, this.height);
  }

  tick() {
    this.renderer.render(this.scene, this.camera);

    this.animationId = requestAnimationFrame(this.tick);
  }

  stopAnimation() {
    if (this.animations && this.animations.length) {
      this.animations.forEach((animation) => {
        animation.stop();
      });
    }
  }

  startAnimation() {
    this.stopAnimation();

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
}
