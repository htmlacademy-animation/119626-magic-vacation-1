import * as THREE from 'three';
import ExtrudedSVG from '../extruded-svg';
import ShapesLoader from "../shapes-loader";

export default class StoryScene1 extends THREE.Group {
  constructor() {
    super();

    this.constructChildren();
  }

  constructChildren() {
    this.addFlower();
  }

  async addFlower() {
    const loader = new ShapesLoader();
    const shape = await loader.getShape(`flower`);
    const model = new ExtrudedSVG(shape).get3DModel();

    model.position.set(-100, 150, 50); // TODO: change
    model.rotateY(THREE.MathUtils.degToRad(-45)); // TODO: change
    model.rotateX(THREE.MathUtils.degToRad(-180)); // TODO: change

    this.add(model);
  }
}
