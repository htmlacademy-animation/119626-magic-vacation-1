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
    ctx.drawImage(snowflake2ImgDom, 760, 400, 130, 130);
  };

  snowflake2ImgDom.onload = () => {
    drawSnowflake2();
  };

  snowflake2ImgDom.src = `/img/module-4/win-primary-images/snowflake-2.png`;

  // airplane
  const airplaneImgDom = new Image();

  const drawAirplane = () => {
    ctx.drawImage(airplaneImgDom, 950, 230, 100, 100);
  };

  airplaneImgDom.onload = () => {
    drawAirplane();
  };

  airplaneImgDom.src = `/img/module-4/win-primary-images/airplane.png`;

  // back
  const backImgDom = new Image();

  const drawBack = () => {
    ctx.drawImage(backImgDom, 388, 204, 586, 324);
  };

  backImgDom.onload = () => {
    drawBack();
  };

  backImgDom.src = `/img/module-4/win-primary-images/back.png`;

  // tree 1
  const tree1ImgDom = new Image();

  const drawTree1 = () => {
    ctx.drawImage(tree1ImgDom, 740, 370, 38, 111);
  };

  tree1ImgDom.onload = () => {
    drawTree1();
  };

  tree1ImgDom.src = `/img/module-4/win-primary-images/tree-1.png`;

  // tree 2
  const tree2ImgDom = new Image();

  const drawTree2 = () => {
    ctx.drawImage(tree2ImgDom, 690, 300, 50, 159);
  };

  tree2ImgDom.onload = () => {
    drawTree2();
  };

  tree2ImgDom.src = `/img/module-4/win-primary-images/tree-2.png`;

  // ice
  const iceImgDom = new Image();

  const drawIce = () => {
    ctx.drawImage(iceImgDom, 460, 430, 370, 150);
  };

  iceImgDom.onload = () => {
    drawIce();
  };

  iceImgDom.src = `/img/module-4/win-primary-images/ice.png`;

  // sea calf
  const seaCalfImgDom = new Image();

  const drawSeaCalf = () => {
    ctx.drawImage(seaCalfImgDom, 390, 210, 450, 450);
  };

  seaCalfImgDom.onload = () => {
    drawSeaCalf();
  };

  seaCalfImgDom.src = `/img/module-4/win-primary-images/sea-calf-2.png`;
};
