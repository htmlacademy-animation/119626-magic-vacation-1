export default () => {
  const ww = window.innerWidth;
  const wh = window.innerHeight;

  const resultCanvasDom = document.getElementById(`result-1`);
  const ctx = resultCanvasDom.getContext(`2d`);

  const snowflake1 = {
    width: 200,
    height: 200,
    top: 310,
    left: 340,
  };

  const snowflakeImgDom = new Image();

  const draw = () => {
    resultCanvasDom.width = ww;
    resultCanvasDom.height = wh;
    ctx.width = ww;
    ctx.height = wh;

    ctx.drawImage(snowflakeImgDom, snowflake1.left, snowflake1.top, snowflake1.width, snowflake1.height);
  };

  snowflakeImgDom.onload = () => {
    draw();
  };

  snowflakeImgDom.src = `/img/module-4/win-primary-images/snowflake.png`;
};
