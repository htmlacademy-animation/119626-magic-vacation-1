import {relaunchImgAnimate} from './relaunch-img-animate';

const prizes = [
  {
    el: document.querySelector(`.prizes__item--journeys`),
    delay: 0,
    imgAnimationDelay: 0,
    value: 3,
  },
  {
    el: document.querySelector(`.prizes__item--cases`),
    delay: 3400,
    imgAnimationDelay: 1800,
    value: 7,
  },
  {
    el: document.querySelector(`.prizes__item--codes`),
    delay: 4000,
    imgAnimationDelay: 3200,
    value: 900,
  }
];

const DUR = 500;
const SECOND = 1000;
const FPS = 12;
const fpsInterval = SECOND / FPS;
const iterationCount = Math.round(DUR / FPS);
let now;
let then = Date.now();
let elapsed;

const tick = (prize) => {
  const currentValue = +prize.el.querySelector(`.prizes__desc b`).innerHTML;

  now = Date.now();
  elapsed = now - then;

  if (currentValue > prize.value) {
    prize.el.querySelector(`.prizes__desc b`).innerHTML = prize.value;
    return;
  }

  requestAnimationFrame(() => tick(prize));

  if (elapsed > fpsInterval) {
    const inc = prize.value > 100 ? Math.ceil(prize.value / iterationCount) : 1;

    then = now - (elapsed % SECOND);
    prize.el.querySelector(`.prizes__desc b`).innerHTML = currentValue + inc;
  }
};

export default () => {
  prizes.forEach((prize) => {
    setTimeout(() => {
      tick(prize);
    }, prize.delay);

    setTimeout(() => {
      const img = prize.el.querySelector(`.relaunch-img-animate`);
      relaunchImgAnimate(img);
    }, prize.imgAnimationDelay);
  });
};
