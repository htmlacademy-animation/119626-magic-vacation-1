import * as THREE from 'three';

export default class ExtrudedSVG extends THREE.Group {
  constructor(shape) {
    super();

    this.setShape(shape);
    this.constructChildren();
  }

  constructChildren() {
    this.addExtrudedShape();
  }

  setShape(shape) {
    this.depth = shape.depth;
    this.cap = shape.cap;
    this.color = shape.color;
    this.shape = shape.shape;
  }

  addExtrudedShape() {
    const geometry = new THREE.ExtrudeBufferGeometry(this.shape, {
      depth: this.depth,
      bevelThickness: this.cap,
      bevelEnabled: true,
    });

    const material = new THREE.MeshStandardMaterial({
      color: this.color,
    });

    const mesh = new THREE.Mesh(geometry, material);

    this.add(mesh);
  }
}
