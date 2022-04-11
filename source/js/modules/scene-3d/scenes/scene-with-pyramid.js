import * as THREE from 'three';
import ModelStreetLamp from '../models/street-lamp';
import ModelPyramid from '../models/pyramid';

export default class SceneWithPyramid extends THREE.Group {
  constructor() {
    super();

    this.constructChildren();
  }

  constructChildren() {
    this.addStreetLamp();
    this.addPyramid();
  }

  addStreetLamp() {
    const model = new ModelStreetLamp();
    model.position.set(200, -250, 0);

    this.add(model);
  }

  addPyramid() {
    const model = new ModelPyramid();
    model.position.set(0, -250, 0);

    this.add(model);
  }
}
