export default class Rocket {
  constructor(canvas, ctx, x, y, w, h, n) {
    this.canvas = canvas;
    this.ctx = ctx;

    this.width = 100;
    this.height = 60;

    this.x = x + w - this.width / 2;
    this.y = y + h / 1.5 - this.height / 2;

    this.velocity = 6;
    this.damage = 10;
    this.number = n;

    this.init();
  }

  init() {
    this.img = new Image();
    this.img.src = "./images/cartoonmissle.png";
    
    this.img.onload = () => {
      this.draw();
    };
  }

  draw(destroy, enemys) {
    let x = this.x;
    let y = this.y;

    this.ctx.drawImage(this.img, x, y, this.width, this.height);
    this.x += this.velocity;

    if ((this.x + this.width) > this.canvas.width) {
      destroy();
    }

    if (enemys) {
      for (let i = 0; i < enemys.length; i++) {
        if (x >= enemys[i].x && x <= enemys[i].x + enemys[i].width) {
          if (y >= enemys[i].y && y <= enemys[i].y + enemys[i].height) {
            let explode = new Audio("audio/explosion.wav");
            explode.play();
            destroy();

            enemys[i].takeDamage(this.damage)
            return;
          }
        }
      }
    }
  }
}
