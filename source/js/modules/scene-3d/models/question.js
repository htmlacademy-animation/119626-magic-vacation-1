import ModelExtrudedSVG from './model-extruded-svg';

export default class ModelQuestion extends ModelExtrudedSVG {
  constructor({shape, castShadow}) {
    super({shape, castShadow});

    this.depth = 8;
    this.cap = 2;

    this.materialParams = {color: this.getColor(`blue`)};
    this.material = this.getMaterial(`basic`, this.materialParams);

    this.constructChildren();
  }

  constructChildren() {
    this.addQuestion();
  }

  addQuestion() {
    const mesh = this.get3DModel(this.material);

    mesh.castShadow = this.castShadow;

    this.add(mesh);
  }
}
