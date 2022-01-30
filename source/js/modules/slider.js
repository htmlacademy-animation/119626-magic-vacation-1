import Swiper from "swiper";
import Scene3DStory from "./scene-3d-story";

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

const removeTheme = () => {
  bodyThemeClasses.forEach((cn) => {
    document.body.classList.remove(cn);
  });
};

export default () => {
  let storySlider;

  const scene = new Scene3DStory();

  const setSlider = function () {
    document.body.classList.add(CN_DARK);
    scene.setSceneBackground(0);

    if (((window.innerWidth / window.innerHeight) < 1) || window.innerWidth < 769) {
      storySlider = new Swiper(`.js-slider`, {
        pagination: {
          el: `.swiper-pagination`,
          type: `bullets`
        },
        keyboard: {
          enabled: true
        },
        on: {
          slideChange: () => {
            if (storySlider.activeIndex === 0 || storySlider.activeIndex === 1) {
              scene.setSceneBackground(0);
            } else if (storySlider.activeIndex === 2 || storySlider.activeIndex === 3) {
              scene.setSceneBackground(1);
            } else if (storySlider.activeIndex === 4 || storySlider.activeIndex === 5) {
              scene.setSceneBackground(2);
            } else if (storySlider.activeIndex === 6 || storySlider.activeIndex === 7) {
              scene.setSceneBackground(3);
            }
          },
          resize: () => {
            storySlider.update();
          }
        },
        observer: true,
        observeParents: true
      });
    } else {
      removeTheme();

      storySlider = new Swiper(`.js-slider`, {
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
            if (storySlider.activeIndex === 0) {
              document.body.classList.add(CN_PURPLE);
              scene.setSceneBackground(0);
            } else if (storySlider.activeIndex === 2) {
              document.body.classList.add(CN_BLUE);
              scene.setSceneBackground(1);
            } else if (storySlider.activeIndex === 4) {
              document.body.classList.add(CN_LIGHT_BLUE);
              scene.setSceneBackground(2);
            } else if (storySlider.activeIndex === 6) {
              document.body.classList.add(CN_DARK);
              scene.setSceneBackground(3);
            }
          },
          resize: () => {
            storySlider.update();
          }
        },
        observer: true,
        observeParents: true
      });
    }
  };

  window.addEventListener(`resize`, function () {
    if (storySlider) {
      storySlider.destroy();
      removeTheme();
    }
    setSlider();
  });

  setSlider();
};
