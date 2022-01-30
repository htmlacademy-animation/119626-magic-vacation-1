import Scene3DIntro from "./scene-3d-intro";

export default class AnimationLauncher {
  constructor() {
    if (window.location.hash === `#top`) {
      this.launchIntroAnimation();
    }
  }

  launchIntroAnimation() {
    const sceneIntro = new Scene3DIntro();

    sceneIntro.start();
  }

  addScreenChangedListener() {
    document.body.addEventListener(`screenChanged`, (event) => {
      if (event.detail.screenName === `top`) {
        this.launchIntroAnimation();
      }
    });
  }

  init() {
    this.addScreenChangedListener();
  }
}
