import * as THREE from 'three';
import ExtrudedSVG from '../extruded-svg';
import ModelStreetLamp from '../models/street-lamp';
import ModelPyramid from '../models/pyramid';

export default class StoryScene2 extends THREE.Group {
  constructor() {
    super();

    this.constructChildren();
  }

  async constructChildren() {
    this.addStreetLamp();
    this.addPyramid();
    await this.addLeaf();
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

  async addLeaf() {
    const leaf = await new ExtrudedSVG(`leafPyramid`);
    // const scale = 0.8;

    // leaf.position.set(-105, 6, 10);
    // leaf.scale.set(scale, -scale, scale);
    // leaf.rotation.copy(new THREE.Euler(0, 10 * THREE.Math.DEG2RAD, -1 * THREE.Math.DEG2RAD), `XYZ`);
    this.add(leaf);
  }
}
