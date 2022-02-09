import Scene3DIntro from "./scene-3d-intro";
import Scene3DStory from "./scene-3d-story";
import Slider from "./slider";

export default class AnimationLauncher {
  constructor() {
    this.sceneIntro = new Scene3DIntro();
    this.sceneStory = new Scene3DStory();
    this.sceneStorySlider = new Slider(this.sceneStory);

    if (window.location.hash === `#top`) {
      this.launchIntroAnimation();
    }

    if (window.location.hash === `#story`) {
      this.launchStoryAnimation();
    }
  }

  stopAnimations() {
    this.sceneIntro.stop();
    this.sceneStory.stop();
  }

  launchIntroAnimation() {
    this.sceneIntro.start();
  }

  launchStoryAnimation() {
    this.sceneStorySlider.init();
    this.sceneStory.start();
  }

  addScreenChangedListener() {
    document.body.addEventListener(`screenChanged`, (event) => {
      this.stopAnimations();

      if (event.detail.screenName === `top`) {
        this.launchIntroAnimation();
      }

      if (event.detail.screenName === `story`) {
        this.launchStoryAnimation();
      }
    });
  }

  init() {
    this.addScreenChangedListener();
  }
}
