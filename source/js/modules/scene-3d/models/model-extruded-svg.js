import * as THREE from 'three';
import Model from './model';

export default class ModelExtrudedSVG extends Model {
  constructor({shape, castShadow}) {
    super();

    this.group = new THREE.Group();
    this.paths = shape.paths;
    this.castShadow = Boolean(castShadow);
  }

  get3DModel(material) {
    for (let i = 0; i < this.paths.length; i++) {
      const path = this.paths[i];
      const shapes = path.toShapes(false);

      for (let j = 0; j < shapes.length; j++) {
        const shape = shapes[j];
        const geometry = new THREE.ExtrudeGeometry(shape, {
          depth: this.depth,
          bevelThickness: this.cap
        });
        const mesh = new THREE.Mesh(geometry, material);

        mesh.castShadow = this.castShadow;

        this.group.add(mesh);
      }
    }

    return this.group;
  }
}
