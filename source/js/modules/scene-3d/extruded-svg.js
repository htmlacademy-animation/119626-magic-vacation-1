import * as THREE from 'three';
import ShapesLoader from "./shapes-loader";

export default class ExtrudedSVG extends THREE.Group {
  constructor(name) {
    super();

    this.setShape(name);
    this.constructChildren();
  }

  async setShape(name) {
    const loader = new ShapesLoader();
    const shape = await loader.getShape(name);

    this.params = {
      depth: shape.depth,
      cap: shape.cap,
      color: shape.color,
      shape: shape.shape,
    };
  }

  constructChildren() {
    this.addShape();
  }

  addShape() {
    const geometry = new THREE.ExtrudeBufferGeometry(this.params.shape, {
      depth: this.params.depth,
      bevelThickness: this.params.cap,
      bevelEnabled: true,
    });

    const material = new THREE.MeshStandardMaterial({
      color: this.color,
    });

    const mesh = new THREE.Mesh(geometry, material);

    this.add(mesh);
  }
}
