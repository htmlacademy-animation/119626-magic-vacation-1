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
        spanChar.style.animationTimingFunction = `ease-in`;
        spanChar.style.animationDelay = `${this._delay * Math.random()}ms`;
      }

      spanWord.appendChild(spanChar);
    });

    this._node.innerHTML = null;
    this._node.appendChild(spanWord);
  }
}

const config = {duration: 300, delay: 200};

const targets = [{
  selector: `.intro__title-row-1`
}, {
  selector: `.intro__title-row-2`
}, {
  selector: `.intro__date`
}, {
  selector: `.slider__item-title`
}, {
  selector: `.prizes__title`
}, {
  selector: `.rules__title`
}, {
  selector: `.game__title`
}, {
  selector: `.game__counter`
}];

export default () => {
  targets.forEach((target) => {
    const node = document.querySelector(target.selector);
    const animate = new AnimateTypography({node, ...config});
    animate.init();
  });
};
