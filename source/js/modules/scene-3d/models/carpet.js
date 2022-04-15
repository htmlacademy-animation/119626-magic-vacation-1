import * as THREE from "three";
import Model from "./model";


export default class ModelCarpet extends Model {
  constructor() {
    super();

    this.degStart = 16;
    this.degEnd = 74;

    this.constructChildren();
  }

  constructChildren() {
    this.addCarpet();
  }

  addCarpet() {
    const points = this.getLathePoints(180, 3, 763);
    const start = THREE.MathUtils.degToRad(this.degStart);
    const length = this.getLatheLength(this.degStart, this.degEnd);

    const geometry = new THREE.LatheGeometry(points, 50, start, length);
    const material = new THREE.MeshBasicMaterial({color: 0X5B3EA5});
    const mesh = new THREE.Mesh(geometry, material);

    this.add(mesh);
  }
}
