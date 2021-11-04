// modules
import mobileHeight from './modules/mobile-height-adjust.js';
import slider from './modules/slider.js';
import menu from './modules/menu.js';
import footer from './modules/footer.js';
import chat from './modules/chat.js';
import result from './modules/result.js';
import form from './modules/form.js';
import social from './modules/social.js';
import FullPageScroll from './modules/full-page-scroll';
import pageLoaded from './modules/page-loaded';
import AnimateTypography from './modules/animate-typography';

// init modules
mobileHeight();
slider();
menu();
footer();
chat();
result();
form();
social();
pageLoaded();

const fullPageScroll = new FullPageScroll();
fullPageScroll.init();

const config = {duration: 300, delay: 200};

const mainTitle = document.querySelector(`.intro__title`);
const animateMainTitle = new AnimateTypography({node: mainTitle, ...config});
animateMainTitle.init();

const historyTitle = document.querySelector(`.slider__item-title`);
const animateHistoryTitle = new AnimateTypography({node: historyTitle, ...config});
animateHistoryTitle.init();

const prizesTitle = document.querySelector(`.prizes__title`);
const animatePrizesTitle = new AnimateTypography({node: prizesTitle, ...config});
animatePrizesTitle.init();

const rulesTitle = document.querySelector(`.rules__title`);
const animateRulesTitle = new AnimateTypography({node: rulesTitle, ...config});
animateRulesTitle.init();

const gameTitle = document.querySelector(`.game__title`);
const animateGameTitle = new AnimateTypography({node: gameTitle, ...config});
animateGameTitle.init();
