import * as THREE from 'three';

export default class ExtrudedSVG extends THREE.Group {
  constructor(shape) {
    super();

    this.group = new THREE.Group();
    this.depth = shape.depth;
    this.cap = shape.cap;
    this.color = shape.color;
    this.paths = shape.paths;
  }

  get3DModel() {
    for (let i = 0; i < this.paths.length; i++) {
      const path = this.paths[i];
      const material = new THREE.MeshBasicMaterial({
        color: new THREE.Color(this.color),
      });

      const shapes = path.toShapes(false);

      for (let j = 0; j < shapes.length; j++) {
        const shape = shapes[j];
        const geometry = new THREE.ExtrudeBufferGeometry(shape, {
          depth: this.depth,
          bevelThickness: this.cap
        });
        const mesh = new THREE.Mesh(geometry, material);

        this.group.add(mesh);
      }
    }

    return this.group;
  }
}
