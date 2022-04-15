import * as THREE from 'three';
import ExtrudedSVG from '../extruded-svg';
import ShapesLoader from "../shapes-loader";

export default class IntroScene extends THREE.Group {
  constructor() {
    super();

    this.constructChildren();
  }

  constructChildren() {
    this.addQuestion();
    this.addFlamingo();
    this.addSnowflake();
    this.addLeaf();
    this.addKeyhole();
  }

  async addQuestion() {
    const loader = new ShapesLoader();
    const shape = await loader.getShape(`question`);
    const model = new ExtrudedSVG(shape).get3DModel();

    model.position.set(0, 0, 20); // TODO: change
    model.rotateX(THREE.MathUtils.degToRad(-220)); // TODO: change
    model.scale.set(2, 2, 2); // TODO: change

    this.add(model);
  }

  async addFlamingo() {
    const loader = new ShapesLoader();
    const shape = await loader.getShape(`flamingo`);
    const model = new ExtrudedSVG(shape).get3DModel();

    model.position.set(-250, 200, 50); // TODO: change
    model.rotateX(THREE.MathUtils.degToRad(-215)); // TODO: change
    model.rotateY(THREE.MathUtils.degToRad(-205)); // TODO: change
    model.scale.set(2, 2, 1); // TODO: change

    this.add(model);
  }

  async addSnowflake() {
    const loader = new ShapesLoader();
    const shape = await loader.getShape(`snowflake`);
    const model = new ExtrudedSVG(shape).get3DModel();

    model.position.set(-200, 0, 40); // TODO: change
    model.rotateX(THREE.MathUtils.degToRad(-15)); // TODO: change
    model.rotateY(THREE.MathUtils.degToRad(25)); // TODO: change

    this.add(model);
  }

  async addLeaf() {
    const loader = new ShapesLoader();
    const shape = await loader.getShape(`leaf1`);
    const model = new ExtrudedSVG(shape).get3DModel();

    model.position.set(200, 100, 70); // TODO: change
    model.rotateX(THREE.MathUtils.degToRad(180)); // TODO: change
    model.rotateY(THREE.MathUtils.degToRad(0)); // TODO: change

    this.add(model);
  }

  async addKeyhole() {
    const loader = new ShapesLoader();
    const shape = await loader.getShape(`keyhole`);
    const model = new ExtrudedSVG(shape).get3DModel();

    model.position.set(-1000, 1000, 20); // TODO: change
    model.rotateX(THREE.MathUtils.degToRad(180)); // TODO: change

    this.add(model);
  }
}
