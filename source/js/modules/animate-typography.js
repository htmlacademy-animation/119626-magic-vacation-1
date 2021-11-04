const CLASS_NAME = `animated-typography`;

export default class AnimateTypography {
  constructor(node, animation) {
    this.node = node;
    this.animation = animation;
  }

  addAnimationClass() {
    this.node.classList.add(CLASS_NAME);
  }

  wrapInSpan() {
    const fragment = document.createDocumentFragment();
    const words = this.node.textContent.split(` `).map((word) => word.split(``));

    words.forEach((word, i) => {
      const wordFragment = document.createElement(`span`);
      wordFragment.classList.add(`${CLASS_NAME}__word`);

      word.forEach((char) => {
        const charInSpan = document.createElement(`span`);
        charInSpan.classList.add(`${CLASS_NAME}__char`);
        charInSpan.textContent = char;
        wordFragment.appendChild(charInSpan);
      });

      fragment.appendChild(wordFragment);

      if (i !== words.length - 1) {
        const br = document.createElement(`br`);
        fragment.appendChild(br);
      }
    });

    this.node.innerHTML = null;
    this.node.appendChild(fragment);
  }

  init() {
    this.addAnimationClass();
    this.wrapInSpan();
  }
}
