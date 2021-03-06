import * as THREE from 'three';
import Animation from '../../animation';
import _ from "../../timing-functions";
import ShapesLoader from "../shapes-loader";
import ModelsLoader from '../models-loader';
import ModelKeyhole from '../models/keyhole';
import ModelFlamingo from '../models/flamingo';
import ModelSnowflake from '../models/snowflake';
import ModelQuestion from '../models/question';
import ModelSaturn from '../models/saturn';
import ModelLeaf1 from '../models/leaf-1';
import Model from '../models/model';

export default class IntroScene extends THREE.Group {
  constructor() {
    super();

    this.modelsLoader = new ModelsLoader();
    this.objects = {};
    this.animationClip = [];


    this.objectZPosition = 200;

    this.animationDelay = 1500; // duration of css animations
    this.animationDelayInfinite = this.animationDelay + 1500;
    this.animationDuration = 1500;

    this.constructChildren();
    this.setAnimations();
  }

  getUpdatedYPositionForInfiniteAnimation(position, amplutide, current, start, period) {
    return position + amplutide * Math.sin(2 * Math.PI * (current - start) / period);
  }

  addQuestionAnimations() {
    const scale = 1;

    const animations = [
      new Animation({
        func: (t) => {
          this.objects.question.position.set(100 * t, -250 * t, this.objectZPosition);
          this.objects.question.scale.set(scale * t, scale * t, scale * t);
        },
        delay: this.animationDelay,
        duration: this.animationDuration,
        easing: _.easeOutCubic,
      }),
      new Animation({
        func: (t, details) => {
          const amplitude = 0.25;
          const period = 3500;

          this.objects.question.position.y = this.getUpdatedYPositionForInfiniteAnimation(
              this.objects.question.position.y,
              amplitude,
              details.currentTime,
              details.startTime,
              period
          );
        },
        delay: this.animationDelayInfinite,
        duration: `infinite`,
        easing: _.easeOutCubic,
      }),
    ];

    animations.forEach((animation) => {
      this.animationClip.push(animation);
    });
  }

  async addQuestion() {
    const group = new THREE.Group();
    const loader = new ShapesLoader();
    const shape = await loader.getShape(`question`);
    const model = new ModelQuestion({shape});

    model.rotateX(THREE.MathUtils.degToRad(140));
    model.rotateZ(THREE.MathUtils.degToRad(-20));

    group.add(model);

    this.objects.question = group;

    this.add(group);
  }

  addFlamingoAnimations() {
    const scale = 2;

    const animations = [
      new Animation({
        func: (t) => {
          this.objects.flamingo.position.set(-400 * t, 300 * t, this.objectZPosition);
          this.objects.flamingo.scale.set(scale * t, scale * t, scale * t);
        },
        delay: this.animationDelay,
        duration: this.animationDuration,
        easing: _.easeOutCubic,
      }),
      new Animation({
        func: (t, details) => {
          const amplitude = 0.2;
          const period = 5000;

          this.objects.flamingo.position.y = this.getUpdatedYPositionForInfiniteAnimation(
              this.objects.flamingo.position.y,
              amplitude,
              details.currentTime,
              details.startTime,
              period
          );
        },
        delay: this.animationDelayInfinite,
        duration: `infinite`,
        easing: _.easeOutCubic,
      }),
    ];

    animations.forEach((animation) => {
      this.animationClip.push(animation);
    });
  }

  async addFlamingo() {
    const group = new THREE.Group();
    const loader = new ShapesLoader();
    const shape = await loader.getShape(`flamingo`);
    const model = new ModelFlamingo({shape});

    model.rotateX(THREE.MathUtils.degToRad(180));
    model.rotateY(THREE.MathUtils.degToRad(160));
    model.rotateZ(THREE.MathUtils.degToRad(15));

    group.add(model);

    this.objects.flamingo = group;

    this.add(group);
  }

  addSnowflakeAnimations() {
    const scale = 0.85;

    const animations = [
      new Animation({
        func: (t) => {
          this.objects.snowflake.position.set(-350 * t, 0, this.objectZPosition);
          this.objects.snowflake.scale.set(scale * t, scale * t, scale * t);
        },
        delay: this.animationDelay,
        duration: this.animationDuration,
        easing: _.easeOutCubic,
      }),
      new Animation({
        func: (t, details) => {
          const amplitude = 0.2;
          const period = 4000;

          this.objects.snowflake.position.y = this.getUpdatedYPositionForInfiniteAnimation(
              this.objects.snowflake.position.y,
              amplitude,
              details.currentTime,
              details.startTime,
              period
          );
        },
        delay: this.animationDelayInfinite,
        duration: `infinite`,
        easing: _.easeOutCubic,
      }),
    ];

    animations.forEach((animation) => {
      this.animationClip.push(animation);
    });
  }

  async addSnowflake() {
    const group = new THREE.Group();
    const loader = new ShapesLoader();
    const shape = await loader.getShape(`snowflake`);
    const model = new ModelSnowflake({shape});

    model.rotateX(THREE.MathUtils.degToRad(-20));
    model.rotateY(THREE.MathUtils.degToRad(35));

    group.add(model);

    this.objects.snowflake = group;

    this.add(group);
  }

  addLeafAnimations() {
    const scale = 1.5;

    const animations = [
      new Animation({
        func: (t) => {
          this.objects.leaf.position.set(500 * t, 300 * t, this.objectZPosition);
          this.objects.leaf.scale.set(scale * t, scale * t, scale * t);
        },
        delay: this.animationDelay,
        duration: this.animationDuration,
        easing: _.easeOutCubic,
      }),
      new Animation({
        func: (t, details) => {
          const amplitude = 0.15;
          const period = 4500;

          this.objects.leaf.position.y = this.getUpdatedYPositionForInfiniteAnimation(
              this.objects.leaf.position.y,
              amplitude,
              details.currentTime,
              details.startTime,
              period
          );
        },
        delay: this.animationDelayInfinite,
        duration: `infinite`,
        easing: _.easeOutCubic,
      }),
    ];

    animations.forEach((animation) => {
      this.animationClip.push(animation);
    });
  }

  async addLeaf() {
    const group = new THREE.Group();
    const loader = new ShapesLoader();
    const shape = await loader.getShape(`leaf1`);
    const model = new ModelLeaf1({shape});

    model.rotateX(THREE.MathUtils.degToRad(180));
    model.rotateY(THREE.MathUtils.degToRad(55));
    model.rotateZ(THREE.MathUtils.degToRad(85));

    group.add(model);

    this.objects.leaf = group;

    this.add(group);
  }

  async addKeyhole() {
    const loader = new ShapesLoader();
    const shape = await loader.getShape(`keyhole`);
    const model = new ModelKeyhole({shape});

    model.position.set(-1000, 1000, 0);
    model.rotateX(THREE.MathUtils.degToRad(180));

    this.add(model);
  }

  async addSuitcase() {
    const scale = 0.4;
    const modelName = `suitcase`;

    const callback = (mesh) => {
      mesh.name = modelName;

      mesh.position.set(-50, -125, this.objectZPosition);
      mesh.scale.set(scale, scale, scale);

      mesh.rotateX(THREE.MathUtils.degToRad(35));
      mesh.rotateY(THREE.MathUtils.degToRad(-140));
      mesh.rotateZ(THREE.MathUtils.degToRad(15));

      this.add(mesh);
    };

    await this.modelsLoader.getModel({
      key: modelName,
      material: null,
      callback,
    });
  }

  addWatermelonAnimations() {
    const scale = 1.5;

    const animations = [
      new Animation({
        func: (t) => {
          this.objects.watermelon.position.set(-600 * t, -250 * t, this.objectZPosition);
          this.objects.watermelon.scale.set(scale * t, scale * t, scale * t);
        },
        delay: this.animationDelay,
        duration: this.animationDuration,
        easing: _.easeOutCubic,
      }),
      new Animation({
        func: (t, details) => {
          const amplitude = 0.27;
          const period = 3500;

          this.objects.watermelon.position.y = this.getUpdatedYPositionForInfiniteAnimation(
              this.objects.watermelon.position.y,
              amplitude,
              details.currentTime,
              details.startTime,
              period
          );
        },
        delay: this.animationDelayInfinite,
        duration: `infinite`,
        easing: _.easeOutCubic,
      }),
    ];

    animations.forEach((animation) => {
      this.animationClip.push(animation);
    });
  }

  async addWatermelon() {
    const modelName = `watermelon`;
    const group = new THREE.Group();

    group.rotateZ(THREE.MathUtils.degToRad(140));

    this.objects.watermelon = group;

    this.add(group);

    const callback = (mesh) => {
      mesh.name = modelName;

      group.add(mesh);
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

      mesh.position.set(200, 100, this.objectZPosition);
      mesh.scale.set(scale, scale, scale);

      mesh.rotateX(THREE.MathUtils.degToRad(55));
      mesh.rotateY(THREE.MathUtils.degToRad(140));

      this.add(mesh);
    };

    await this.modelsLoader.getModel({
      key: modelName,
      material,
      callback,
    });
  }

  addSaturnAnimations() {
    const scale = 0.5;

    const animations = [
      new Animation({
        func: (t) => {
          this.objects.saturn.position.set(350 * t, -100 * t, this.objectZPosition);
          this.objects.saturn.scale.set(scale * t, scale * t, scale * t);
        },
        delay: this.animationDelay,
        duration: this.animationDuration,
        easing: _.easeOutCubic,
      }),
      new Animation({
        func: (t, details) => {
          const amplitude = 0.19;
          const period = 5500;

          this.objects.saturn.position.y = this.getUpdatedYPositionForInfiniteAnimation(
              this.objects.saturn.position.y,
              amplitude,
              details.currentTime,
              details.startTime,
              period
          );
        },
        delay: this.animationDelayInfinite,
        duration: `infinite`,
        easing: _.easeOutCubic,
      }),
    ];

    animations.forEach((animation) => {
      this.animationClip.push(animation);
    });
  }

  addSaturn() {
    const group = new THREE.Group();

    const model = new ModelSaturn({
      colorBase: `dominantRed`,
      colorAdditional: `brightPurple`,
      shouldRenderSattelite: false,
    });

    group.add(model);

    this.add(group);

    this.objects.saturn = group;
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
    this.addQuestionAnimations();
    this.addFlamingoAnimations();
    this.addSnowflakeAnimations();
    this.addLeafAnimations();
    this.addWatermelonAnimations();
    this.addSaturnAnimations();
  }

  addAnimations(mixer) {
    this.animationClip.forEach((track) => {
      mixer.push(track);
    });
  }
}
