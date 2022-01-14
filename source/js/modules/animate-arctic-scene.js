import {bezierEasing} from '../helpers/cubic-bezier';
import {animateDuration, animateEasing} from '../helpers/animate';
// import {runSerial, runSerialLoop} from '../helpers/promise';
// import {animateDuration} from '../helpers/animate';
import {runSerial} from '../helpers/promise';

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
    this.isAnimated = false;

    this.startAnimations = [];

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

    // tree left
    this.treeLeftImg = new Image();
    this.treeLeftT = 300;
    this.treeLeftL = 690;
    this.treeLeftHeight = 159;
    this.treeLeftWidth = 50;

    // tree right
    this.treeRightImg = new Image();
    this.treeRightT = 370;
    this.treeRightL = 740;
    this.treeRightHeight = 111;
    this.treeRightWidth = 38;

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

    // snowflake left
    this.snowflakeLeftImg = new Image();
    this.snowflakeLeftT = 340;
    this.snowflakeLeftL = 310;
    this.snowflakeLeftHeight = 200;
    this.snowflakeLeftWidth = 200;

    // snowflake right
    this.snowflakeRightImg = new Image();
    this.snowflakeRightT = 400;
    this.snowflakeRightL = 760;
    this.snowflakeRightHeight = 130;
    this.snowflakeRightWidth = 130;

    this.snowflakeOpacity = 0;

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

  drawTreeLeft() {
    this.ctx.drawImage(
        this.treeLeftImg,
        this.treeLeftL,
        this.treeLeftT,
        this.treeLeftWidth,
        this.treeLeftHeight
    );
  }

  drawTreeRight() {
    this.ctx.drawImage(
        this.treeRightImg,
        this.treeRightL,
        this.treeRightT,
        this.treeRightWidth,
        this.treeRightHeight
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

  drawSnowflakeLeft() {
    this.ctx.drawImage(
        this.snowflakeLeftImg,
        this.snowflakeLeftL,
        this.snowflakeLeftT,
        this.snowflakeLeftWidth,
        this.snowflakeLeftHeight
    );
  }

  drawSnowflakeRight() {
    this.ctx.drawImage(
        this.snowflakeRightImg,
        this.snowflakeRightL,
        this.snowflakeRightT,
        this.snowflakeRightWidth,
        this.snowflakeRightHeight
    );
  }

  drawScene() {
    this.canvas.width = winW;
    this.canvas.height = winH;

    this.ctx.clearRect(0, 0, winW, winH);

    if (this.isAnimated) {
      this.drawAirplane();
      this.drawCloud();
      this.drawTreeLeft();
      this.drawTreeRight();
      this.drawIce();
      this.drawSeaCalf();
      this.drawSnowflakeLeft();
      this.drawSnowflakeRight();
    }
  }

  increaseLoadingCounter() {
    this.loadingCounter++;

    if (this.loadingCounter === 8) {
      this.drawScene();
    }
  }

  initEventListeners() {
    this.snowflakeLeftImg.onload = () => {
      this.increaseLoadingCounter();
    };

    this.snowflakeRightImg.onload = () => {
      this.increaseLoadingCounter();
    };

    this.airplaneImg.onload = () => {
      this.increaseLoadingCounter();
    };

    this.cloudImg.onload = () => {
      this.increaseLoadingCounter();
    };

    this.treeLeftImg.onload = () => {
      this.increaseLoadingCounter();
    };

    this.treeRightImg.onload = () => {
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
    this.snowflakeLeftImg.src = `/img/module-4/win-primary-images/snowflake-left.png`;
    this.snowflakeRightImg.src = `/img/module-4/win-primary-images/snowflake-right.png`;
    this.airplaneImg.src = `/img/module-4/win-primary-images/airplane.png`;
    this.cloudImg.src = `/img/module-4/win-primary-images/cloud.png`;
    this.treeLeftImg.src = `/img/module-4/win-primary-images/tree-left.png`;
    this.treeRightImg.src = `/img/module-4/win-primary-images/tree-right.png`;
    this.iceImg.src = `/img/module-4/win-primary-images/ice.png`;
    this.seaCalfImg.src = `/img/module-4/win-primary-images/sea-calf.png`;
  }

  // getSnowflakeLeftAnimationTick() {
  //   return (from, to) => (progress) => {
  //     this.snowflakeLeftTranslateY = from + progress * (to - from);
  //   };
  // }

  // getSnowflakeRightAnimationTick() {
  //   return (from, to) => (progress) => {
  //     this.snowflakeRightTranslateY = from + progress * (to - from);
  //   };
  // }

  // animateSnowflakes() {
  //   const snowflakeLeftYTick = (from, to) => (progress) => {
  //     this.cloudLeftL = from + progress * (to - from);
  //   };

  //   const snowflakeRightYTick = (from, to) => (progress) => {
  //     this.cloudRightL = from + progress * (to - from);
  //   };

  //   const snowflakeLeftYTo = 350;
  //   const cloudLeftAnimations = [
  //     () => animateEasing(snowflakeLeftYTick(this.snowflakeLeftT, snowflakeLeftYTo), 1000, bezierEasing(0.11, 0, 0, 1)),
  //   ];

  //   const snowflakeRightYTo = 300;
  //   const cloudRightAnimations = [
  //     () => animateEasing(snowflakeRightYTick(this.snowflakeRightT, snowflakeRightYTo), 1000, bezierEasing(0.11, 0, 0, 1)),
  //   ];

  //   runSerial(cloudLeftAnimations);
  //   runSerial(cloudRightAnimations);

  //   // const snowflakeOpacityTick = (progress) => {
  //   //   this.snowflakeOpacity = progress;
  //   // };

  //   // animateEasing(snowflakeOpacityTick, 250, bezierEasing(0, 0, 1, 1));
  // }

  animateSnowflakesInfinite() {
    const snowflakeLeftYTick = (from, to) => (progress) => {
      this.cloudLeftT = from + progress * (to - from);
    };
    const snowflakeRightYTick = (from, to) => (progress) => {
      this.cloudRightT = from + progress * (to - from);
    };
    const symmetricalEase = bezierEasing(0.33, 0, 0.67, 1);

    const snowflakeLeftYTo = 300;
    const snowflakeLeftAnimations = [
      () => animateEasing(snowflakeLeftYTick(this.snowflakeLeftT, snowflakeLeftYTo), 4883, symmetricalEase),
      () => animateEasing(snowflakeLeftYTick(snowflakeLeftYTo, this.snowflakeLeftT), 4317, symmetricalEase),
    ];

    const snowflakeRightYTo = 350;
    const snowflakeRightAnimations = [
      () => animateEasing(snowflakeRightYTick(this.snowflakeRightT, snowflakeRightYTo), 4883, symmetricalEase),
      () => animateEasing(snowflakeRightYTick(snowflakeRightYTo, this.snowflakeRightT), 4317, symmetricalEase),
    ];

    runSerial(snowflakeLeftAnimations);
    runSerial(snowflakeRightAnimations);
  }

  // startSnowflakesAnimationInfinite() {
  //   const globalAnimationTick = (globalProgress) => {
  //     if (globalProgress === 0) {
  //       this.animateSnowflakes();
  //     }
  //   };

  //   const animations = [
  //     () => animateDuration(globalAnimationTick, 1000)
  //   ];

  //   runSerial(animations).then(this.startSnowflakesAnimationInfinite);
  // }


  startAnimateSnowflakesInfinite() {
    const globalAnimationTick = (globalProgress) => {
      if (globalProgress === 0) {
        this.animateSnowflakesInfinite();
      }
    };

    const animations = [
      () => animateDuration(globalAnimationTick, 2000)
    ];

    runSerial(animations).then(this.startAnimateSnowflakesInfinite.bind(this));
  }

  startAnimationInfinite() {
    const globalAnimationTick = () => {
      this.drawScene();
    };

    const animations = [
      () => animateDuration(globalAnimationTick, 6000)
    ];

    runSerial(animations).then(this.startAnimationInfinite.bind(this));
  }

  startAnimation() {
    // this.posterT = options.posterT;
    // this.posterL = options.posterL;
    // this.posterHeight = options.posterHeight;
    // this.posterWidth = options.posterWidth;

    // this.moonRadius = (this.posterHeight / 8.7);
    // this.moonDx = (this.posterWidth / 20);
    // this.moonEndX = (this.posterL + this.posterWidth + 1.2 * this.moonRadius) / wFactor;
    // this.moonY = (this.posterT + this.posterHeight / 6) / hFactor;
    // this.moonRotateAngle = -550 / wFactor;

    // this.reset();
    if (!this.isAnimated) {
      this.isAnimated = true;

      const globalAnimationTick = () => {
        // const showWhaleAnimationDelay = 0;
        // const cloudsAnimationDelay = 233;
        // const starsAndMoonAnimationDelay = 350;

        // if (globalProgress >= showWhaleAnimationDelay && this.startAnimations.indexOf(showWhaleAnimationDelay) < 0) {
        //   this.startAnimations.push(showWhaleAnimationDelay);

        // this.animateWhaleShow();
        this.startAnimateSnowflakesInfinite();
        // }
      };

      animateDuration(globalAnimationTick, 2000);
    }
  }
}
