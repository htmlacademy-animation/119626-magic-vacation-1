const CN = `animated-typography`;
const CN_WORD = `${CN}__word`;
const CN_CHAR = `${CN}__char`;
const CN_ACTIVE = `active`;
const SPAN = `span`;

export default class AnimateTypography {
  constructor({node, duration, delay}) {
    this._node = node;
    this._duration = duration;
    this._delay = delay;
  }

  _animate() {
    setTimeout(() => {
      this._node.classList.add(CN_ACTIVE);
    }, this._delay);
  }

  _replaceNode() {
    this._node.classList.add(CN);
    const fragment = document.createDocumentFragment();
    const words = this._node.textContent.split(` `).map((word) => word.split(``));

    words.forEach((word) => {
      const spanWord = document.createElement(SPAN);
      spanWord.classList.add(CN_WORD);

      word.forEach((char) => {
        const spanChar = document.createElement(SPAN);
        spanChar.classList.add(CN_CHAR);

        spanChar.textContent = char;
        spanChar.style.animationDuration = `${this._duration}ms`;
        spanChar.style.animationTimingFunction = `ease-in`;
        spanChar.style.animationDelay = `${this._delay * Math.random()}ms`;

        spanWord.appendChild(spanChar);
      });

      fragment.appendChild(spanWord);
    });

    this._node.innerHTML = null;
    this._node.appendChild(fragment);
  }

  init() {
    this._replaceNode();
    this._animate();
  }
}
