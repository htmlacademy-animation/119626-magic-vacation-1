import * as THREE from 'three';
import fragmentSheder from '../webGL/shaders/fragmentShader.glsl';
import vertexShader from '../webGL/shaders/vertexShader.glsl';

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

    this.init();
  }

  getShader(texture, hue = 0.0) {
    return {
      uniforms: {
        map: {
          value: texture,
        },
        hue: {
          value: hue,
        },
      },
      vertexShader: vertexShader.sourceCode,
      fragmentShader: fragmentSheder.sourceCode,
    };
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

    this.render();
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }
}
