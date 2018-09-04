import Weapon from './Weapon';
export default class Player {
    constructor(canvas, ctx) {
      this.canvas = canvas;
      this.ctx = ctx;

      this.img = new Image();
      this.img.src = "./images/cartoonspaceship.png";
      this.weapon = new Weapon(this.canvas, this.ctx)

      this.width = 300;
      this.height = 200;
  
      this.x = 25
      this.y = 25
      this.speed = 5;
      this.velocity ={
        x:0,
        y:0
      }
  
      this.health = 100;
    }
  
    init() {
      this.img.onload = () => {
        document.addEventListener('keydown', e => {
          if (e.keyCode === 32){
            console.log('shooting');
            this.weapon.shoot(this.x, this.y, this.width, this.height);
          }
          else if (e.keyCode === 37) {
            // console.log('going left');
            if (this.x > 0) {
              this.velocity.x = this.speed * - 1
              
            }
          }
          else if (e.keyCode === 38) {
            // console.log('going up');
            if (this.y > 0) {
              this.velocity.y = this.speed * - 1
              
            }
          }
          else if (e.keyCode === 39) {
            // console.log('going right');
            if (this.x < this.canvas.width - 20) {
              this.velocity.x = this.speed 
             
              
            }
          }
          else if (e.keyCode === 40) {
            // console.log('going down');
            if (this.y < this.canvas.height - 20) {
              this.velocity.y = this.speed;
              
            }
          }
          else{
            this.velocity = {
              x:0,
              y:0
            }
          }
        });
        
      };
    }
  
    draw() {
      this.x = Math.max(Math.min(this.x + this.velocity.x,
      this.canvas.width - this.width), 0);
      this.y = Math.max(Math.min(this.y + this.velocity.y,
      this.canvas.height - this.height), 0);
      this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
}  