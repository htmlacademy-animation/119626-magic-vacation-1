export const CN_BLUE = `body-theme-blue`;
export const CN_LIGHT_BLUE = `body-theme-light-blue`;
export const CN_PURPLE = `body-theme-purple`;
export const CN_LIGHT_PURPLE = `body-theme-light-purple`;

const bodyThemeClasses = [
  CN_BLUE,
  CN_LIGHT_BLUE,
  CN_LIGHT_PURPLE,
];

export default () => {
  bodyThemeClasses.forEach((cn) => {
    document.body.classList.remove(cn);
  });
};
