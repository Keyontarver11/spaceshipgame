import { Player, Enemy } from "./entities";

export default class Game {
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;

    this.enemys = [new Enemy(this.canvas, this.ctx)];
    this.player = new Player(this.canvas, this.ctx);

    this.running = false;
    this.score = 0;
    this.lives = 10;
  }

  init() {
    this.player.init();

    this.enemys.forEach(enemy => {
      enemy.init();
    });
  }

  start() {
    this.running = true;
    this.init();
    this.draw();
  }

  stop() {
    this.running = false;
  }

  draw() {
    if (!this.running) {
      console.log("stopped");
      return;
    }

    console.log("running");

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Draw rockets
    for (var n in this.player.weapon.shooting) {
        this.player.weapon.shooting[n].draw(
        () => {
          this.player.weapon.destroyRocket(n);
        }, this.enemys);
    }

    // Draw enemys
    this.enemys.forEach(enemy => {
        if (enemy.health <= 0) {
            this.destroyEnemy(enemy);
        }
        else {
            enemy.draw();
        }
    });

    this.player.draw();

    this.ctx.font = "60px Arial";
    this.ctx.fillStyle = "#fff";
    this.ctx.fillText("R" + this.player.weapon.ammo, 10, 60);
    this.ctx.fillText("H" + this.player.health, this.canvas.width - 180, 60);

    this.ctx.save();
    this.ctx.restore();

    window.requestAnimationFrame(() => this.draw());
  }

  destroyEnemy(id) {
    this.enemys = this.enemys.filter(enemy => enemy.id === id);
  }
}
