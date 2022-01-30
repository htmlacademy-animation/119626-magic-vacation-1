import * as THREE from 'three';

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

    const color = new THREE.Color(0xEEEEEE);
    const alpha = 0.6;

    this.renderer.setClearColor(color, alpha);
    this.renderer.setPixelRatio(this.devicePixelRatio);
    this.renderer.setSize(this.width, this.height);

    this.render();
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }
}
