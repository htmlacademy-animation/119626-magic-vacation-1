export default class AnimateAccentTypography {
  constructor(node, animation) {
    this.node = node;
    this.animation = animation;
  }

  wrapInSpan() {
    const fragment = document.createDocumentFragment();
    const words = this.node.textContent.split(` `).map((word) => word.split(``));

    words.forEach((word, i) => {
      const wordFragment = document.createElement(`span`);

      word.forEach((char) => {
        const charInSpan = document.createElement(`span`);
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
    this.wrapInSpan();
  }
}
