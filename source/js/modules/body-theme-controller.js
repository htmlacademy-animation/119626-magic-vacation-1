export const CN_BLUE = `body-theme-blue`;
export const CN_LIGHT_BLUE = `body-theme-light-blue`;
export const CN_DARK_PURPLE = `body-theme-dark-purple`;

const bodyThemeClasses = [
  CN_BLUE,
  CN_LIGHT_BLUE,
  CN_DARK_PURPLE,
];

export default () => {
  bodyThemeClasses.forEach((cn) => {
    document.body.classList.remove(cn);
  });
};
