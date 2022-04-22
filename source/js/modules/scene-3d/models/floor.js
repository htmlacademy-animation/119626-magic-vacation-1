import * as THREE from 'three';
import Model from './model';

export default class ModelFloor extends Model {
  constructor({
    colorBase,
  }) {
    super();

    this.degStart = 0;
    this.degEnd = 90;

    this.constructChildren(colorBase);
  }

  constructChildren(colorBase) {
    this.addBase(colorBase);
  }

  addBase(colorBase) {
    const start = THREE.MathUtils.degToRad(this.degStart);
    const length = this.getDegLength(this.degStart, this.degEnd);

    const geometry = new THREE.CircleGeometry(1500, 10, start, length);
    const materialParams = {
      color: this.getColor(colorBase),
      side: THREE.DoubleSide,
    };
    const material = this.getMaterial(`soft`, materialParams);
    const mesh = new THREE.Mesh(geometry, material);

    this.add(mesh);
  }
}
