import * as THREE from 'three';
import ShapesLoader from "../shapes-loader";
import ModelSaturn from "../models/saturn";
import ModelFlower from "../models/flower";
import ModelCarpet from "../models/carpet";
import ModelFloor from "../models/floor";

export default class StoryScene1 extends THREE.Group {
  constructor() {
    super();

    this.constructChildren();
  }

  constructChildren() {
    this.addFlower();
    this.addSaturn();
    this.addCarpet();
    this.addFloor();
  }

  async addFlower() {
    const loader = new ShapesLoader();
    const shape = await loader.getShape(`flower`);
    const model = new ModelFlower(shape);

    model.position.set(0, 420, 8);
    model.rotateX(THREE.MathUtils.degToRad(180));
    model.rotateY(THREE.MathUtils.degToRad(90));

    this.add(model);
  }

  addSaturn() {
    const model = new ModelSaturn({
      colorBase: `dominantRed`,
      colorAdditional: `brightPurple`,
    });

    model.position.set(300, 550, 200);

    this.add(model);
  }

  addCarpet() {
    const model = new ModelCarpet({
      colorBase: `lightPurple`,
      colorAdditional: `additionalPurple`,
    });

    model.position.set(0, 0, 0);

    this.add(model);
  }

  addFloor() {
    const model = new ModelFloor({
      colorBase: `darkPurple`,
    });

    model.position.set(0, 0, 0);
    model.rotateX(THREE.MathUtils.degToRad(90));

    this.add(model);
  }

  // async addAirplane() {
  //   const scale = 1;
  //   const modelName = `airplane`;
  //   const model = new Model();
  //   const material = model.getMaterial(`soft`, {color: model.getColor(`white`)});

  //   const callback = (mesh) => {
  //     mesh.name = modelName;

  //     mesh.position.set(200, 100, Z_POS);
  //     mesh.scale.set(scale, scale, scale);

  //     mesh.rotateX(THREE.MathUtils.degToRad(55));
  //     mesh.rotateY(THREE.MathUtils.degToRad(140));

  //     this.add(mesh);
  //   };

  //   await this.modelsLoader.getModel(modelName, material, callback);
  // }
}
