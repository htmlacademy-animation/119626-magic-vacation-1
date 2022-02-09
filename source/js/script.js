// modules
import mobileHeight from './modules/mobile-height-adjust.js';
import menu from './modules/menu.js';
import footer from './modules/footer.js';
import chat from './modules/chat.js';
import result from './modules/result.js';
import form from './modules/form.js';
import social from './modules/social.js';
import FullPageScroll from './modules/full-page-scroll';
import pageLoaded from './modules/page-loaded';
import animateTypography from './modules/animate-typography';
import initGameCounter from './modules/game-counter';
import AnimationLauncher from './modules/animation-launcher';

// init modules
mobileHeight();
menu();
footer();
chat();
result();
form();
social();
pageLoaded();
animateTypography();
initGameCounter();

const fullPageScroll = new FullPageScroll();
fullPageScroll.init();

const animationLauncher = new AnimationLauncher();
animationLauncher.init();
