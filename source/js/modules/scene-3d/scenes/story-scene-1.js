import * as THREE from 'three';
import ExtrudedSVG from '../extruded-svg';
import ShapesLoader from "../shapes-loader";
import ModelSaturn from "../models/saturn";

export default class StoryScene1 extends THREE.Group {
  constructor() {
    super();

    this.constructChildren();
  }

  constructChildren() {
    this.addFlower();
    this.addSaturn();
  }

  async addFlower() {
    const loader = new ShapesLoader();
    const shape = await loader.getShape(`flower`);
    const model = new ExtrudedSVG(shape).get3DModel();

    model.position.set(-100, 150, 50);
    model.rotateY(THREE.MathUtils.degToRad(-45));
    model.rotateX(THREE.MathUtils.degToRad(-180));

    this.add(model);
  }

  addSaturn() {
    const model = new ModelSaturn();
    model.position.set(-250, 80, 100);

    this.add(model);
  }
}
