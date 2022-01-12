export default class Animation {
  constructor({
    canvasDomId,
    draw,
    fps = 60,
    context = `2d`
  }) {
    this.ctx = document.getElementById(canvasDomId).getContext(context);
    this.draw = draw;
    this.fpsInterval = 1000 / fps;
    this.then = Date.now();
    this.id = null;

    this.tick = this.tick.bind(this);

  }

  tick() {
    requestAnimationFrame(this.tick);

    this.now = Date.now();
    this.elapsed = this.now - this.then;

    if (this.elapsed > this.fpsInterval) {
      this.then = this.now - (this.elapsed % 1000);

      this.ctx.clearRect(0, 0, this.ctx.width, this.ctx.height);
      this.ctx.save();
      this.draw();
      this.ctx.restore();
    }
  }

  start() {
    requestAnimationFrame(this.tick);
  }
}
