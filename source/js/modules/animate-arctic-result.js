export default () => {
  const ww = window.innerWidth;
  const wh = window.innerHeight;

  const resultCanvasDom = document.getElementById(`result-1`);
  resultCanvasDom.width = ww;
  resultCanvasDom.height = wh;

  const ctx = resultCanvasDom.getContext(`2d`);
  ctx.width = ww;
  ctx.height = wh;

  // snowflake
  const snowflake1ImgDom = new Image();

  const drawSnowflake1 = () => {
    ctx.drawImage(snowflake1ImgDom, 340, 310, 200, 200);
  };

  snowflake1ImgDom.onload = () => {
    drawSnowflake1();
  };

  snowflake1ImgDom.src = `/img/module-4/win-primary-images/snowflake-1.png`;

  // snowflake 2
  const snowflake2ImgDom = new Image();

  const drawSnowflake2 = () => {
    ctx.drawImage(snowflake2ImgDom, 790, 380, 120, 120);
  };

  snowflake2ImgDom.onload = () => {
    drawSnowflake2();
  };

  snowflake2ImgDom.src = `/img/module-4/win-primary-images/snowflake-2.png`;
};
