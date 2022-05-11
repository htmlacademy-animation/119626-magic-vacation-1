import * as THREE from 'three';
import _ from '../../timing-functions';
import Animation from '../../animation';
import ModelsLoader from '../models-loader';

export default class StorySuitcase extends THREE.Group {
  constructor() {
    super();

    this.modelsLoader = new ModelsLoader();
    this.objects = {};
    this.animationClip = [];

    this.constructChildren();
    this.setAnimations();
  }

  addSuitcaseAnimations() {
    const scale = 0.8;
    const multiplier = 0.2;

    this.animationClip.push(new Animation({
      func: (t) => {
        this.objects.suitcase.position.y = this.objects.suitcase.position.y - this.objects.suitcase.position.y * t;
      },
      duration: 1500,
      easing: _.easeInCubic,
    }));

    this.animationClip.push(new Animation({
      func: (t) => {
        this.objects.suitcase.scale.set(scale + multiplier * t, scale - multiplier * t, scale + multiplier * t);
      },
      delay: 1500,
      duration: 200,
      easing: _.easeOutCubic,
    }));

    this.animationClip.push(new Animation({
      func: (t) => {
        this.objects.suitcase.scale.set(
            scale + multiplier - multiplier * t,
            scale - multiplier + multiplier * t,
            scale + multiplier - multiplier * t,
        );
      },
      delay: 1700,
      duration: 200,
      easing: _.easeInCubic,
    }));
  }

  async addSuitcase() {
    const scale = 0.8;

    this.position.set(-350, 100, 780);
    this.rotateY(THREE.MathUtils.degToRad(20));
    this.scale.set(scale, scale, scale);

    this.objects.suitcase = this;

    const callback = (mesh) => {
      this.add(mesh);
    };

    await this.modelsLoader.getModel({
      key: `suitcase`,
      material: null,
      callback,
    });
  }

  constructChildren() {
    this.addSuitcase();
  }

  setAnimations() {
    this.addSuitcaseAnimations();
  }

  addAnimations(mixer) {
    this.animationClip.forEach((track) => {
      mixer.push(track);
    });
  }
}
