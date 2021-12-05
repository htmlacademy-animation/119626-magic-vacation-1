export default () => {
  const imgs = document.querySelectorAll(`.relaunch-img-animate`);

  imgs.forEach((img) => {
    const currentSrc = img.getAttribute(`src`);

    const newSrc = `${currentSrc}?cache=${Date.now()}`;

    img.setAttribute(`src`, newSrc);
  });
};
