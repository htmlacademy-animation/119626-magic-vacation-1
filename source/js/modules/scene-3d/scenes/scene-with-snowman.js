import * as THREE from 'three';
import ModelSnowman from '../models/snowman';

export default class SceneWithSnowman extends THREE.Group {
  constructor() {
    super();

    this.constructChildren();
  }

  constructChildren() {
    this.addSnowman();
  }

  addSnowman() {
    const model = new ModelSnowman();

    model.position.set(-150, -250, 150);
    model.rotateY(THREE.MathUtils.degToRad(-45));

    this.add(model);
  }
}
