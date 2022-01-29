import Scene3D from "./scene-3d";

export default class Scene3DStory extends Scene3D {
  constructor() {
    const canvas = document.getElementById(`story-scene`);

    super({canvas});
  }
}
