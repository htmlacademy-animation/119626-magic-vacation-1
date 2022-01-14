
// import {bezierEasing} from '../helpers/cubic-bezier';
// import {animateDuration, animateEasing} from '../helpers/animate';
// import {runSerial, runSerialLoop} from '../helpers/promise';


let winW;
let winH;
// let wFactor;
// let hFactor;

export default class ArcticResultScene {
  constructor(options) {
    this.canvas = document.querySelector(options.canvas);
    this.ctx = this.canvas.getContext(`2d`);

    this.loadingCounter = 0;

    // this.isMobile = false;
    // this.isAnimated = false;

    // this.startAnimations = [];

    // airplane
    this.airplaneImg = new Image();
    this.airplaneT = 230;
    this.airplaneL = 950;
    this.airplaneHeight = 100;
    this.airplaneWidth = 100;

    // cloud
    this.cloudImg = new Image();
    this.cloudT = 204;
    this.cloudL = 388;
    this.cloudHeight = 324;
    this.cloudWidth = 586;

    // tree 1
    this.tree1Img = new Image();
    this.tree1T = 370;
    this.tree1L = 740;
    this.tree1Height = 111;
    this.tree1Width = 38;

    // tree 2
    this.tree2Img = new Image();
    this.tree2T = 300;
    this.tree2L = 690;
    this.tree2Height = 159;
    this.tree2Width = 50;

    // ice
    this.iceImg = new Image();
    this.iceT = 430;
    this.iceL = 460;
    this.iceHeight = 150;
    this.iceWidth = 370;

    // sea calf
    this.seaCalfImg = new Image();
    this.seaCalfT = 210;
    this.seaCalfL = 390;
    this.seaCalfHeight = 450;
    this.seaCalfWidth = 450;

    // snowflake1
    this.snowflake1Img = new Image();
    this.snowflake1T = 340;
    this.snowflake1L = 310;
    this.snowflake1Height = 200;
    this.snowflake1Width = 200;

    // snowflake2
    this.snowflake2Img = new Image();
    this.snowflake2T = 400;
    this.snowflake2L = 760;
    this.snowflake2Height = 130;
    this.snowflake2Width = 130;

    this.initEventListeners = this.initEventListeners.bind(this);
    this.updateSceneSizing = this.updateSceneSizing.bind(this);
    this.loadImages = this.loadImages.bind(this);

    this.initEventListeners();
    this.updateSceneSizing();
    this.loadImages();
  }

  updateSceneSizing() {
    winW = window.innerWidth;
    winH = window.innerHeight;

    // this.ctx.width = winW;
    // this.ctx.height = winH;
    this.canvas.width = winW; // ?
    this.canvas.height = winH; // ?
    // wFactor = window.innerWidth / 1440;
    // hFactor = window.innerHeight / 760;

    // this.isMobile = winW <= 600;
  }

  drawAirplane() {
    this.ctx.drawImage(
        this.airplaneImg,
        this.airplaneL,
        this.airplaneT,
        this.airplaneWidth,
        this.airplaneHeight
    );
  }

  drawCloud() {
    this.ctx.drawImage(
        this.cloudImg,
        this.cloudL,
        this.cloudT,
        this.cloudWidth,
        this.cloudHeight
    );
  }

  drawTree1() {
    this.ctx.drawImage(
        this.tree1Img,
        this.tree1L,
        this.tree1T,
        this.tree1Width,
        this.tree1Height
    );
  }

  drawTree2() {
    this.ctx.drawImage(
        this.tree2Img,
        this.tree2L,
        this.tree2T,
        this.tree2Width,
        this.tree2Height
    );
  }

  drawIce() {
    this.ctx.drawImage(
        this.iceImg,
        this.iceL,
        this.iceT,
        this.iceWidth,
        this.iceHeight
    );
  }

  drawSeaCalf() {
    this.ctx.drawImage(
        this.seaCalfImg,
        this.seaCalfL,
        this.seaCalfT,
        this.seaCalfWidth,
        this.seaCalfHeight
    );
  }

  drawSnowflake1() {
    this.ctx.drawImage(
        this.snowflake1Img,
        this.snowflake1L,
        this.snowflake1T,
        this.snowflake1Width,
        this.snowflake1Height
    );
  }

  drawSnowflake2() {
    this.ctx.drawImage(
        this.snowflake2Img,
        this.snowflake2L,
        this.snowflake2T,
        this.snowflake2Width,
        this.snowflake2Height
    );
  }

  drawScene() {
    this.canvas.width = winW;
    this.canvas.height = winH;

    this.ctx.clearRect(0, 0, winW, winH);

    // if (this.isAnimated) {
    this.drawAirplane();
    this.drawCloud();
    this.drawTree1();
    this.drawTree2();
    this.drawIce();
    this.drawSeaCalf();
    this.drawSnowflake1();
    this.drawSnowflake2();
    // }
  }

  increaseLoadingCounter() {
    this.loadingCounter++;

    if (this.loadingCounter === 8) {
      this.drawScene();
    }
  }

  initEventListeners() {
    this.snowflake1Img.onload = () => {
      this.increaseLoadingCounter();
    };

    this.snowflake2Img.onload = () => {
      this.increaseLoadingCounter();
    };

    this.airplaneImg.onload = () => {
      this.increaseLoadingCounter();
    };

    this.cloudImg.onload = () => {
      this.increaseLoadingCounter();
    };

    this.tree1Img.onload = () => {
      this.increaseLoadingCounter();
    };

    this.tree2Img.onload = () => {
      this.increaseLoadingCounter();
    };

    this.iceImg.onload = () => {
      this.increaseLoadingCounter();
    };

    this.seaCalfImg.onload = () => {
      this.increaseLoadingCounter();
    };
  }

  loadImages() {
    this.snowflake1Img.src = `/img/module-4/win-primary-images/snowflake-1.png`;
    this.snowflake2Img.src = `/img/module-4/win-primary-images/snowflake-2.png`;
    this.airplaneImg.src = `/img/module-4/win-primary-images/airplane.png`;
    this.cloudImg.src = `/img/module-4/win-primary-images/cloud.png`;
    this.tree1Img.src = `/img/module-4/win-primary-images/tree-1.png`;
    this.tree2Img.src = `/img/module-4/win-primary-images/tree-2.png`;
    this.iceImg.src = `/img/module-4/win-primary-images/ice.png`;
    this.seaCalfImg.src = `/img/module-4/win-primary-images/sea-calf-2.png`;
  }
}
