import * as THREE from 'three';
import Model from './model';

export default class ModelFloor extends Model {
  constructor({
    colorBase,
  }) {
    super();

    this.width = 1350;
    this.height = 10;
    this.degStart = 0;
    this.degEnd = 90;

    this.constructChildren(colorBase);
  }

  constructChildren(colorBase) {
    this.addFloor(colorBase);
  }

  addFloor(colorBase) {
    const start = THREE.MathUtils.degToRad(this.degStart);
    const length = this.getDegLength(this.degStart, this.degEnd);

    const geometry = new THREE.CircleGeometry(this.width, this.height, start, length);
    const materialParams = {
      color: this.getColor(colorBase),
      side: THREE.DoubleSide,
    };
    const material = this.getMaterial(`soft`, materialParams);
    const mesh = new THREE.Mesh(geometry, material);

    this.add(mesh);
  }
}
