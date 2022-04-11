import * as THREE from 'three';
import ModelStreetLamp from '../models/street-lamp';

export default class SceneWithPyramid extends THREE.Group {
  constructor(defaultMaterial) {
    super();

    this.defaultMaterial = defaultMaterial;
    this.constructChildren();
  }

  constructChildren() {
    this.addStreetLamp();
  }

  addStreetLamp() {
    const streetLamp = new ModelStreetLamp(this.defaultMaterial);
    streetLamp.position.set(150, -250, 0);

    this.add(streetLamp);
  }
}
