const SECOND = 1000;
const INITIAL_TIME = 5 * 60 * SECOND;
const FPS_INTERVAL = SECOND;
const counter = document.querySelector(`.game__counter`);
let time = INITIAL_TIME;
let now;
let then = Date.now();
let elapsed;

const formatTime = (t) => {
  return t.toString().length < 2 ? `0${t}` : t;
};

const draw = () => {
  const currentTime = new Date(time);
  const m = currentTime.getMinutes();
  const s = currentTime.getSeconds();

  counter.innerHTML = `${formatTime(m)}:${formatTime(s)}`;
};

const tick = () => {
  if (time <= 0) {
    cancelAnimationFrame(tick);

    return;
  }

  requestAnimationFrame(tick);

  now = Date.now();
  elapsed = now - then;


  if (elapsed > FPS_INTERVAL) {
    then = now - (elapsed % 1000);
    time -= SECOND;

    draw();
  }
};

const startGameCounter = () => {
  time = INITIAL_TIME;
  tick();
};

export default () => {
  startGameCounter();
};
