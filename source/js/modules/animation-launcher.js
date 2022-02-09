import Scene3DIntro from "./scene-3d-intro";
import Scene3DStory from "./scene-3d-story";
import Slider from "./slider";

export default class AnimationLauncher {
  constructor() {
    if (window.location.hash === `#top`) {
      this.launchIntroAnimation();
    }

    if (window.location.hash === `#story`) {
      this.launchStoryAnimation();
    }
  }

  launchIntroAnimation() {
    const sceneIntro = new Scene3DIntro();

    sceneIntro.start();
  }

  launchStoryAnimation() {
    const sceneStory = new Scene3DStory();
    const slider = new Slider(sceneStory);

    slider.init();
    sceneStory.start();
  }

  addScreenChangedListener() {
    document.body.addEventListener(`screenChanged`, (event) => {
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
