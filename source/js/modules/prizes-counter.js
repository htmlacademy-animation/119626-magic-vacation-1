const prize1 = document.querySelector(`.prizes__desc--1 b`);
const prize2 = document.querySelector(`.prizes__desc--2 b`);
const prize3 = document.querySelector(`.prizes__desc--3 b`);

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
  const currentValue = +prize.el.innerHTML;

  now = Date.now();
  elapsed = now - then;

  if (currentValue > prize.value) {
    prize.el.innerHTML = prize.value;
    return;
  }

  requestAnimationFrame(() => tick(prize));

  if (elapsed > fpsInterval) {
    const inc = prize.value === 900 ? Math.ceil(prize.value / iterationCount) : 1;

    then = now - (elapsed % SECOND);
    prize.el.innerHTML = currentValue + inc;
  }
};

export default () => {
  prizes.forEach((prize) => {
    setTimeout(() => {
      tick(prize);
    }, prize.delay);
  });
};
