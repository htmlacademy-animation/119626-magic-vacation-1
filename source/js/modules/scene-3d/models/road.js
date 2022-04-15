import * as THREE from "three";
import Model from "./model";


export default class ModelRoad extends Model {
  constructor() {
    super();

    this.constructChildren();
  }

  constructChildren() {
    this.addRoad();
  }

  addRoad() {
    const points = this.getLathePoints(160, 3, 732);
    const {start, length} = this.getLatheDegrees(0, 90);

    const geometry = new THREE.LatheGeometry(points, 50, start, length);
    const material = new THREE.MeshBasicMaterial({color: 0X585F6D});
    const mesh = new THREE.Mesh(geometry, material);

    this.add(mesh);
  }
}
