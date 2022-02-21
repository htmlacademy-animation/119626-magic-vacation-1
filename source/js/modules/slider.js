import Swiper from "swiper";

const CN_BLUE = `body-theme-blue`;
const CN_LIGHT_BLUE = `body-theme-light-blue`;
const CN_PURPLE = `body-theme-purple`;
const CN_DARK = `body-theme-dark`;

const bodyThemeClasses = [
  CN_BLUE,
  CN_LIGHT_BLUE,
  CN_PURPLE,
  CN_DARK,
];

export default class Slider {
  constructor(scene) {
    this.scene = scene;

    this.addEventListener = this.addEventListener.bind(this);

    this.addEventListener();
  }

  setSlider() {
    document.body.classList.add(CN_DARK);

    if (((window.innerWidth / window.innerHeight) < 1) || window.innerWidth < 769) {
      this.storySlider = new Swiper(`.js-slider`, {
        pagination: {
          el: `.swiper-pagination`,
          type: `bullets`
        },
        keyboard: {
          enabled: true
        },
        on: {
          slideChange: () => {
            if (this.storySlider.activeIndex === 0 || this.storySlider.activeIndex === 1) {
              this.scene.setSceneBackground(0);
            } else if (this.storySlider.activeIndex === 2 || this.storySlider.activeIndex === 3) {
              this.scene.setSceneBackground(1);
            } else if (this.storySlider.activeIndex === 4 || this.storySlider.activeIndex === 5) {
              this.scene.setSceneBackground(2);
            } else if (this.storySlider.activeIndex === 6 || this.storySlider.activeIndex === 7) {
              this.scene.setSceneBackground(3);
            }
          },
          resize: () => {
            this.storySlider.update();
          }
        },
        observer: true,
        observeParents: true
      });
    } else {
      this.storySlider = new Swiper(`.js-slider`, {
        slidesPerView: 2,
        slidesPerGroup: 2,
        pagination: {
          el: `.swiper-pagination`,
          type: `fraction`
        },
        navigation: {
          nextEl: `.js-control-next`,
          prevEl: `.js-control-prev`,
        },
        keyboard: {
          enabled: true
        },
        on: {
          slideChange: () => {
            this.removeTheme();

            if (this.storySlider.activeIndex === 0) {
              document.body.classList.add(CN_PURPLE);
              this.scene.setSceneBackground(0);
            } else if (this.storySlider.activeIndex === 2) {
              document.body.classList.add(CN_BLUE);
              this.scene.setSceneBackground(1);
            } else if (this.storySlider.activeIndex === 4) {
              document.body.classList.add(CN_LIGHT_BLUE);
              this.scene.setSceneBackground(2);
            } else if (this.storySlider.activeIndex === 6) {
              document.body.classList.add(CN_DARK);
              this.scene.setSceneBackground(3);
            }
          },
          resize: () => {
            this.storySlider.update();
          }
        },
        observer: true,
        observeParents: true
      });
    }
  }

  init() {
    this.relaunchSlider();
  }

  removeTheme() {
    bodyThemeClasses.forEach((cn) => {
      document.body.classList.remove(cn);
    });
  }

  relaunchSlider() {
    if (this.storySlider) {
      this.storySlider.destroy();
      this.removeTheme();
    }

    if (this.setSlider) {
      this.setSlider();
    }
  }

  addEventListener() {
    window.addEventListener(`resize`, this.relaunchSlider);
  }
}
