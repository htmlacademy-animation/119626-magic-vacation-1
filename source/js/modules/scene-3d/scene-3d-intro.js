import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'; // TODO: remove. for devs only
import Animation from '../animation';
import _ from "../timing-functions";
import ModelsLoader from './models-loader';
import ModelKeyhole from './models/keyhole';
import ModelFlamingo from './models/flamingo';
import ModelSnowflake from './models/snowflake';
import ModelQuestion from './models/question';
import ModelSaturn from './models/saturn';
import ModelLeaf1 from './models/leaf-1';
import Model from './models/model';
import ShapesLoader from "./shapes-loader";
import Scene3D from "./scene-3d";

// import IntroScene from "./scenes/intro-scene";

const Z_POS = 200;
const ANIMATION_DELAY = 1500;
const ANIMATION_DURATION = 1500;

export default class Scene3DIntro extends Scene3D {
  constructor() {
    const canvas = document.getElementById(`intro-scene`);

    super({canvas});

    this.modelsLoader = new ModelsLoader();
  }

  async addQuestion() {
    const loader = new ShapesLoader();
    const shape = await loader.getShape(`question`);
    const model = new ModelQuestion({shape});

    model.position.set(100, -250, Z_POS);

    model.rotateX(THREE.MathUtils.degToRad(140));
    model.rotateZ(THREE.MathUtils.degToRad(-20));

    this.scene.add(model);
  }

  addFlamingoAnimations() {
    const scale = 2;

    const animations = [
      new Animation({
        func: (t) => {
          this.objects.flamingo.position.set(-400 * t, 300 * t, Z_POS);
          this.objects.flamingo.scale.set(scale * t, scale * t, scale * t);
        },
        delay: ANIMATION_DELAY,
        duration: ANIMATION_DURATION,
        easing: _.easeOutCubic,
      }),
      new Animation({
        func: (t, details) => {
          const ampY = 0.3;
          const period = 4000;

          this.objects.flamingo.position.y = this.objects.flamingo.position.y + ampY * Math.sin(2 * Math.PI * (details.currentTime - details.startTime) / period);
        },
        delay: ANIMATION_DELAY + 1500,
        duration: `infinite`,
        easing: _.easeOutCubic,
      }),
    ];

    animations.forEach((animation) => {
      this.animations.push(animation);
    });
  }

  async addFlamingo() {
    const loader = new ShapesLoader();
    const shape = await loader.getShape(`flamingo`);
    const model = new ModelFlamingo({shape});

    model.rotateX(THREE.MathUtils.degToRad(180));
    model.rotateY(THREE.MathUtils.degToRad(160));
    model.rotateZ(THREE.MathUtils.degToRad(15));

    this.scene.add(model);
    this.objects.flamingo = model;
  }

  async addSnowflake() {
    const scale = 0.85;
    const loader = new ShapesLoader();
    const shape = await loader.getShape(`snowflake`);
    const model = new ModelSnowflake({shape});

    model.position.set(-350, 0, Z_POS);
    model.scale.set(scale, scale, scale);

    model.rotateX(THREE.MathUtils.degToRad(-20));
    model.rotateY(THREE.MathUtils.degToRad(35));

    this.scene.add(model);
  }

  async addLeaf() {
    const scale = 1.5;
    const loader = new ShapesLoader();
    const shape = await loader.getShape(`leaf1`);
    const model = new ModelLeaf1({shape});

    model.position.set(500, 300, Z_POS);
    model.scale.set(scale, scale, scale);

    model.rotateX(THREE.MathUtils.degToRad(180));
    model.rotateY(THREE.MathUtils.degToRad(55));
    model.rotateZ(THREE.MathUtils.degToRad(85));

    this.scene.add(model);
  }

  async addKeyhole() {
    const loader = new ShapesLoader();
    const shape = await loader.getShape(`keyhole`);
    const model = new ModelKeyhole({shape});

    model.position.set(-1000, 1000, 0);
    model.rotateX(THREE.MathUtils.degToRad(180));

    this.scene.add(model);
  }

  async addSuitcase() {
    const scale = 0.4;
    const modelName = `suitcase`;

    const callback = (mesh) => {
      mesh.name = modelName;

      mesh.position.set(-50, -125, Z_POS);
      mesh.scale.set(scale, scale, scale);

      mesh.rotateX(THREE.MathUtils.degToRad(35));
      mesh.rotateY(THREE.MathUtils.degToRad(-140));
      mesh.rotateZ(THREE.MathUtils.degToRad(15));

      this.scene.add(mesh);
    };

    await this.modelsLoader.getModel({
      key: modelName,
      material: null,
      callback,
    });
  }

  async addWatermelon() {
    const scale = 1.5;
    const modelName = `watermelon`;

    const callback = (mesh) => {
      mesh.name = modelName;

      mesh.position.set(-600, -250, Z_POS);
      mesh.scale.set(scale, scale, scale);

      mesh.rotateZ(THREE.MathUtils.degToRad(140));

      this.scene.add(mesh);
    };

    await this.modelsLoader.getModel({
      key: modelName,
      material: null,
      callback,
    });
  }

  async addAirplane() {
    const scale = 1;
    const modelName = `airplane`;
    const model = new Model();
    const material = model.getMaterial(`soft`, {color: model.getColor(`white`)});

    const callback = (mesh) => {
      mesh.name = modelName;

      mesh.position.set(200, 100, Z_POS);
      mesh.scale.set(scale, scale, scale);

      mesh.rotateX(THREE.MathUtils.degToRad(55));
      mesh.rotateY(THREE.MathUtils.degToRad(140));

      this.scene.add(mesh);
    };

    await this.modelsLoader.getModel({
      key: modelName,
      material,
      callback,
    });
  }

  addSaturn() {
    const scale = 0.5;
    const model = new ModelSaturn({
      colorBase: `dominantRed`,
      colorAdditional: `brightPurple`,
      shouldRenderSattelite: false,
    });

    model.position.set(350, -100, Z_POS);
    model.scale.set(scale, scale, scale);

    this.scene.add(model);
  }

  constructChildren() {
    this.addKeyhole();
    this.addQuestion();
    this.addFlamingo();
    this.addSnowflake();
    this.addLeaf();

    this.addSuitcase();
    this.addWatermelon();
    this.addAirplane();

    this.addSaturn();
  }

  setAnimations() {
    this.addFlamingoAnimations();
    // TODO: implement
  }

  start() {
    this.constructChildren();
    this.setAnimations();

    this.controls = new OrbitControls(this.camera, this.renderer.domElement); // TODO: remove. for devs only

    super.start();
  }
}
