import Scene3DIntro from "./scene-3d/scene-3d-intro";
import Scene3DStory from "./scene-3d/scene-3d-story";
import Slider from "./slider";

export default class AnimationLauncher {
  constructor() {
    this.sceneIntro = new Scene3DIntro();
    this.sceneStory = new Scene3DStory();
    this.sceneStorySlider = new Slider(this.sceneStory);

    if (window.location.hash === `#top`) {
      this.startIntro();
    }

    if (window.location.hash === `#story`) {
      this.startStory();
    }
  }

  stopAll() {
    this.sceneIntro.stop();
    this.sceneStory.stop();
  }

  startIntro() {
    this.sceneIntro.start();
  }

  startStory() {
    this.sceneStorySlider.init();
    this.sceneStory.start();
  }

  addScreenChangedListener() {
    document.body.addEventListener(`screenChanged`, (event) => {
      this.stopAll();

      if (event.detail.screenName === `top`) {
        this.startIntro();
      }

      if (event.detail.screenName === `story`) {
        this.startStory();
      }
    });
  }

  init() {
    this.addScreenChangedListener();
  }
}
