import * as THREE from 'three';
import {SVGLoader} from "three/examples/jsm/loaders/SVGLoader";
import {SVG_SHAPES} from './shapes';

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

    return SVG_SHAPES[key].shape;
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
              color: path.color,
              side: THREE.DoubleSide,
              depthWrite: false
            });

            const shapes = SVGLoader.createShapes(path);

            for (let j = 0; j < shapes.length; j++) {
              const shape = shapes[j];
              const geometry = new THREE.ShapeGeometry(shape);
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
