const SECOND = 1000;
const TIME_LIMIT = 5 * 60 * SECOND;
const FPS_INTERVAL = SECOND;
let timePassed = 0;
let now;
let then = Date.now();
let elapsed;
const trigget = document.querySelector(`.rules__link`);
const counter = document.querySelector(`.game__counter`);

const formatTime = (t) => {
  return t.toString().length < 2 ? `0${t}` : t;
};

const draw = () => {
  const currentTime = new Date(timePassed);
  const m = currentTime.getMinutes();
  const s = currentTime.getSeconds();

  counter.innerHTML = `${formatTime(m)}:${formatTime(s)}`;
};

const tick = () => {
  if (timePassed >= TIME_LIMIT) {
    cancelAnimationFrame(tick);

    return;
  }

  requestAnimationFrame(tick);

  now = Date.now();
  elapsed = now - then;


  if (elapsed > FPS_INTERVAL) {
    then = now - (elapsed % 1000);
    timePassed += SECOND;

    draw();
  }
};

const startGameCounter = () => {
  timePassed = 0;
  tick();
};

export default () => {
  trigget.addEventListener(`click`, startGameCounter);
};
