import {relaunchImgAnimate} from './relaunch-img-animate';

const prize1 = document.querySelector(`.prizes__item--1`);
const prize2 = document.querySelector(`.prizes__item--2`);
const prize3 = document.querySelector(`.prizes__item--3`);

const prizes = [
  {
    el: prize1,
    delay: 2000,
    value: 3,
  },
  {
    el: prize2,
    delay: 3800,
    value: 7,
  },
  {
    el: prize3,
    delay: 6000,
    value: 900,
  }
].map((it) => ({...it, delay: it.delay + 400}));

const DUR = 600;
const SECOND = 1000;
const FPS = 12;
const fpsInterval = SECOND / FPS;
const iterationCount = Math.round(DUR / FPS);
let now;
let then = Date.now();
let elapsed;

const tick = (prize) => {
  const number = prize.el.querySelector(`.prizes__desc b`);
  const currentValue = +number.innerHTML;

  now = Date.now();
  elapsed = now - then;

  if (currentValue > prize.value) {
    number.innerHTML = prize.value;
    return;
  }

  requestAnimationFrame(() => tick(prize));

  if (elapsed > fpsInterval) {
    const inc = prize.value === 900 ? Math.ceil(prize.value / iterationCount) : 1;

    then = now - (elapsed % SECOND);
    number.innerHTML = currentValue + inc;
  }
};

export default () => {
  prizes.forEach((prize) => {
    setTimeout(() => {
      const img = prize.el.querySelector(`.relaunch-img-animate`);
      relaunchImgAnimate(img);
      tick(prize);
    }, prize.delay);
  });
};
