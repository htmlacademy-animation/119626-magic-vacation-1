import * as THREE from 'three';
import fragmentShader from '../webGL/shaders/fragmentShader.glsl';
import fragmentShaderBubbles from '../webGL/shaders/fragmentShaderBubbles.glsl';
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

    this.requestAnimationFrameId = null;

    this.init();
  }

  getShader(scene) {
    return {
      uniforms: {
        map: {
          value: scene.texture,
        },
        hue: {
          value: scene.hue || 0.0,
        },
        canvasSize: {
          value: [this.width, this.height]
        },
      },
      vertexShader: vertexShader.sourceCode,
      fragmentShader: scene.shouldRenderBubbles ? fragmentShaderBubbles.sourceCode : fragmentShader.sourceCode,
    };
  }

  updateBackground(texture) {
    const shader = this.getShader(texture);
    const geometry = new THREE.PlaneGeometry(this.width, this.height);
    const material = new THREE.RawShaderMaterial(shader);
    const mesh = new THREE.Mesh(geometry, material);

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

  render() {
    this.renderer.render(this.scene, this.camera);

    setInterval(() => {
      this.renderer.render(this.scene, this.camera);
    }, 50);
  }
}
