import {relaunchImgAnimate} from './relaunch-img-animate';

const prizes = [
  {
    el: document.querySelector(`.prizes__item--journeys`),
    counterDelay: 0,
    imgAnimationDelay: 0,
    value: 3,
  },
  {
    el: document.querySelector(`.prizes__item--cases`),
    counterDelay: 3800,
    imgAnimationDelay: 1800,
    value: 7,
  },
  {
    el: document.querySelector(`.prizes__item--codes`),
    counterDelay: 4200,
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

const tick = (counter, value) => {
  const currentValue = Number(counter.innerHTML);

  now = Date.now();
  elapsed = now - then;

  if (currentValue > value) {
    counter.innerHTML = value;
    return;
  }

  requestAnimationFrame(() => tick(counter, value));

  if (elapsed > fpsInterval) {
    const inc = value > 100 ? Math.ceil(value / iterationCount) : 1;

    then = now - (elapsed % SECOND);
    counter.innerHTML = currentValue + inc;
  }
};

export default () => {
  prizes.forEach((prize) => {
    const counter = prize.el.querySelector(`.prizes__desc b`);

    setTimeout(() => {
      tick(counter, prize.value);
    }, prize.counterDelay);

    setTimeout(() => {
      const img = prize.el.querySelector(`.js-prize-svg`);
      relaunchImgAnimate(img);
    }, prize.imgAnimationDelay);
  });
};
