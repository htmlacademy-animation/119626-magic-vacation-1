const CLASS_NAME = `animated-typography`;

export default class AnimateTypography {
  constructor({node, duration, delay}) {
    this._node = node;
    this._duration = duration;
    this._delay = delay;
  }

  _animate() {
    setTimeout(() => {
      this._node.classList.add(`${CLASS_NAME}--active`);
    }, this._delay);
  }

  _replaceNode() {
    this._node.classList.add(CLASS_NAME);
    const fragment = document.createDocumentFragment();
    const words = this._node.textContent.split(` `).map((word) => word.split(``));

    words.forEach((word) => {
      const spanWord = document.createElement(`span`);
      spanWord.classList.add(`${CLASS_NAME}__word`);

      word.forEach((char) => {
        const spanChar = document.createElement(`span`);
        spanChar.classList.add(`${CLASS_NAME}__char`);

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
