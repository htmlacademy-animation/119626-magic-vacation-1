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
import AnimateAccentTypography from './modules/animate-accent-typography';

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

const mainTitle = document.querySelector(`.intro__title`);
const animateMainTitle = new AnimateAccentTypography(mainTitle);
animateMainTitle.init();
