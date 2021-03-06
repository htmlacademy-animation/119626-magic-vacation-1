const CN = `animated-typography`;
const CN_WORD = `${CN}__word`;
const CN_CHAR = `${CN}__char`;
const SPAN = `span`;

class AnimateTypography {
  constructor({node, duration, delay}) {
    this._node = node;
    this._duration = duration;
    this._delay = delay;
  }

  init() {
    this._node.classList.add(CN);
    const chars = this._node.textContent.split(``);

    const spanWord = document.createElement(SPAN);
    spanWord.classList.add(CN_WORD);

    chars.forEach((char) => {
      const isSpace = char === ` `;
      const spanChar = document.createElement(SPAN);

      if (isSpace) {
        spanChar.innerHTML = `&nbsp;`;
      } else {
        spanChar.classList.add(CN_CHAR);

        spanChar.innerHTML = char;
        spanChar.style.animationDuration = `${this._duration}ms`;
        spanChar.style.animationDelay = `${this._delay * Math.random()}ms`;
      }

      spanWord.appendChild(spanChar);
    });

    this._node.innerHTML = null;
    this._node.appendChild(spanWord);
  }
}

const DURATION = 300;
const DELAY = 200;

const targets = [{
  duration: DURATION,
  delay: DELAY,
  selector: `.intro__title-row-1`
}, {
  duration: DURATION,
  delay: DELAY * 1.5,
  selector: `.intro__title-row-2`
}, {
  duration: DURATION,
  delay: DELAY,
  selector: `.intro__date`
}, {
  duration: DURATION,
  delay: DELAY,
  selector: `.slider__item-title`
}, {
  duration: DURATION,
  delay: DELAY,
  selector: `.prizes__title`
}, {
  duration: DURATION,
  delay: DELAY,
  selector: `.rules__title`
}, {
  duration: DURATION,
  delay: DELAY,
  selector: `.game__title`
}, {
  duration: DURATION,
  delay: DELAY,
  selector: `.game__counter`
}];

export default () => {
  targets.forEach(({selector, duration, delay}) => {
    const node = document.querySelector(selector);
    const animate = new AnimateTypography({node, duration, delay});
    animate.init();
  });
};
