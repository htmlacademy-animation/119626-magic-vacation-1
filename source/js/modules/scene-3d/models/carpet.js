import * as THREE from "three";
import Model from "./model";


export default class ModelCarpet extends Model {
  constructor() {
    super();

    this.constructChildren();
  }

  constructChildren() {
    this.addCarpet();
  }

  addCarpet() {
    const points = this.getLathePoints(180, 3, 763);
    const {start, length} = this.getLatheDegrees(16, 74);

    const geometry = new THREE.LatheGeometry(points, 50, start, length);
    const material = new THREE.MeshBasicMaterial({color: 0X5B3EA5});
    const mesh = new THREE.Mesh(geometry, material);

    this.add(mesh);
  }
}
