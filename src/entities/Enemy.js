export default class Enemy {
    constructor(canvas, ctx) {
      this.canvas = canvas;
      this.ctx = ctx;
  
      this.width = 200;
      this.height = 100;
  
      this.x = canvas.width - 220;
      this.y = canvas.height / 2 - this.height / 2;
  
      this.velocity = {
        x: 3 * (Math.random() > 0.5 ? 1 : -1),
        y: 3 * (Math.random() > 0.5 ? 1 : -1)
      };
  
      this.health = this.width;
      
    }
  
    init() {
      this.img = new Image();
      this.img.src = "./images/ufo.png";
      
      this.img.onload = () => {
        this.draw();
      } 
    }
  
    draw() {
      this.x += this.velocity.x;
      this.y += this.velocity.y;
  
      if (this.x <= 0 || this.x >= this.canvas.width - this.width) {
        this.velocity.x *= -1; 
      }
  
      if (this.y <= 0 || this.y >= this.canvas.height - this.height) {
        this.velocity.y *= -1;
      }
  
      // let x = Math.max(Math.min(this.x, this.canvas.width - this.width), 0);
      // let y = Math.max(Math.min(this.y, this.canvas.height - this.height), 0);
  
      this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
      this.ctx.fillStyle = 'green';
      this.ctx.fillRect(this.x, this.y - 20, 200, 7)
    }
    takeDamage(amount){
        this.health -= amount;
        if(this.health < 0){
            this.health = 0;
        }
    }
  }