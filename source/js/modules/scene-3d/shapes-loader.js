import * as THREE from 'three';
import {SVGLoader} from "three/examples/jsm/loaders/SVGLoader";

const SVG_IMG_FOLDER = `./img/module-6/svg-forms`;

const SVG_SHAPES = {
  flamingo: {
    src: `${SVG_IMG_FOLDER}/flamingo.svg`,
    depth: 8,
    cap: 2,
    color: `#C75762`,
    shape: null
  },
  snowflake: {
    src: `${SVG_IMG_FOLDER}/snowflake.svg`,
    depth: 8,
    cap: 2,
    color: `#224FA7`,
    shape: null
  },
  question: {
    src: `${SVG_IMG_FOLDER}/question.svg`,
    depth: 8,
    cap: 2,
    color: `#224FA7`,
    shape: null
  },
  leaf: {
    src: `${SVG_IMG_FOLDER}/leaf.svg`,
    depth: 3,
    cap: 3,
    color: `#07925D`,
    shape: null
  },
  keyhole: {
    src: `${SVG_IMG_FOLDER}/keyhole.svg`,
    depth: 20,
    cap: 2,
    color: `#4E4069`,
    shape: null
  },
  flower: {
    src: `${SVG_IMG_FOLDER}/flower.svg`,
    depth: 4,
    cap: 2,
    color: `#6649A3`,
    shape: null
  },
};

export default class ShapesLoader {
  constructor() {
    this.loader = new SVGLoader();
  }

  async getShape(key) {
    if (!SVG_SHAPES[key]) {
      throw new Error(`Wrong key! Check ShapesLoader.getShape argument`);
    }

    if (!SVG_SHAPES[key].shape) {
      await this.loadShape(key);
    }

    return SVG_SHAPES[key];
  }

  async loadShape(key) {
    this.loader.load(
        // resource URL
        SVG_SHAPES[key].src,
        // called when the resource is loaded
        function (data) {
          const paths = data.paths;
          const group = new THREE.Group();

          for (let i = 0; i < paths.length; i++) {
            const path = paths[i];
            const material = new THREE.MeshBasicMaterial({
              color: new THREE.Color(SVG_SHAPES[key].color),
            });

            const shapes = path.toShapes(false);

            for (let j = 0; j < shapes.length; j++) {
              const shape = shapes[j];
              const geometry = new THREE.ExtrudeBufferGeometry(shape, {
                depth: SVG_SHAPES[key].depth,
                bevelThickness: SVG_SHAPES[key].cap
              });
              const mesh = new THREE.Mesh(geometry, material);

              group.add(mesh);
            }
          }

          SVG_SHAPES[key].shape = group;
        },
        // called when loading is in progresses
        function (xhr) {
          // eslint-disable-next-line no-console
          console.log(key + ` ` + (xhr.loaded / xhr.total * 100) + `% loaded`);
        },
        // called when loading has errors
        function (error) {
          // eslint-disable-next-line no-console
          console.log(`An error happened`, error);
        }
    );
  }
}
