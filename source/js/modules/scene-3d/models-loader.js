import {OBJLoader} from "three/examples/jsm/loaders/OBJLoader";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";

const MODEL_FOLDER = `./img/module-6/models`;

const MODELS = {
  airplane: {
    path: `${MODEL_FOLDER}/airplane.obj`,
    model: null,
  },
  suitcase: {
    path: `${MODEL_FOLDER}/suitcase.gltf`,
    model: null,
  },
  watermelon: {
    path: `${MODEL_FOLDER}/watermelon.gltf`,
    model: null,
  },
  wall: {
    path: `${MODEL_FOLDER}/WallCornerUnit.obj`,
    model: null,
  },
  scene1Static: {
    path: `${MODEL_FOLDER}/scene1-static-output-1.gltf`,
    model: null,
  },
  scene2Static: {
    path: `${MODEL_FOLDER}/scene2-static-output-1.gltf`,
    model: null,
  },
  scene3Static: {
    path: `${MODEL_FOLDER}/scene3-static-output-1.gltf`,
    model: null,
  },
  scene4Static: {
    path: `${MODEL_FOLDER}/scene4-static-output-1.gltf`,
    model: null,
  },
  dog: {
    path: `${MODEL_FOLDER}/dog.gltf`,
    model: null,
  },
  compass: {
    path: `${MODEL_FOLDER}/compass.gltf`,
    model: null,
  },
  sonya: {
    path: `${MODEL_FOLDER}/sonya.gltf`,
    model: null,
  },
};

export default class ModelsLoader {
  async loadObj(path, onComplete) {
    const loaderObj = new OBJLoader();

    await loaderObj.load(path, onComplete);
  }

  async loadGltf(path, onComplete) {
    const loaderGltf = new GLTFLoader();

    await loaderGltf.load(path, onComplete);
  }

  onComplete({obj3d, material, callback, castShadow, receiveShadow}) {
    if (material) {
      obj3d.traverse((child) => {
        if (child.isMesh) {
          child.material = material;
          child.castShadow = Boolean(castShadow);
          child.receiveShadow = Boolean(receiveShadow);
        }
      });
    }

    if (typeof callback === `function`) {
      callback.call(null, obj3d);
    }
  }

  setModel(key, model) {
    if (!MODELS[key].model) {
      MODELS[key].model = model;
    }
  }

  async getModel({key, material, callback, castShadow, receiveShadow}) {
    if (!key || !MODELS[key]) {
      throw new Error(`Wrong key! Check ModelsLoader.setModel argument`);
    }

    if (!MODELS[key].model) {
      await this.loadModel({key, material, callback, castShadow, receiveShadow});
    }

    return MODELS[key].model;
  }

  getFileExt(path) {
    const splittedPath = path.split(`/`);
    const filename = splittedPath.pop();

    return filename.split(`.`).pop();
  }

  async loadModel({key, material, callback, castShadow, receiveShadow}) {
    const model = MODELS[key];

    if (!model) {
      return;
    }

    const onGltfComplete = (gltf) => {
      if (!gltf.scene) {
        return;
      }

      this.setModel(key, gltf.scene);
      this.onComplete({obj3d: gltf.scene, material, callback, castShadow, receiveShadow});
    };

    const onObjectComplete = (obj) => {
      if (!obj) {
        return;
      }

      this.setModel(key, obj);
      this.onComplete({obj3d: obj, material, callback, castShadow, receiveShadow});
    };

    if (this.getFileExt(model.path) === `gltf`) {
      await this.loadGltf(model.path, onGltfComplete);
    } else {
      await this.loadObj(model.path, onObjectComplete);
    }
  }
}
