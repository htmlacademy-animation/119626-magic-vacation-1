import Swiper from "swiper";

export default () => {
  let storySlider;

  const setSlider = function () {
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
              // TODO: render bg
            } else if (storySlider.activeIndex === 2 || storySlider.activeIndex === 3) {
              // TODO: render bg
            } else if (storySlider.activeIndex === 4 || storySlider.activeIndex === 5) {
              // TODO: render bg
            } else if (storySlider.activeIndex === 6 || storySlider.activeIndex === 7) {
              // TODO: render bg
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
              // TODO: render bg
            } else if (storySlider.activeIndex === 2) {
              // TODO: render bg
            } else if (storySlider.activeIndex === 4) {
              // TODO: render bg
            } else if (storySlider.activeIndex === 6) {
              // TODO: render bg
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
    }
    setSlider();
  });

  setSlider();
};
