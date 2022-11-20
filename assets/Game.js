import Ball from "./Ball";
import Platform from "./Platform";

class Game{

    width = 500;
    height = 500;

    constructor(canvas){
        //init canvas
        this.canvas = canvas;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.canvas.style.border = "1px black solid";

        //init context
        this.ctx = this.canvas.getContext("2d");

        //init platform
        this.platform = new Platform(this.ctx, this.canvas, this.width / 2 - 50, this.height - 50, 100, 25);

        //init ball
        this.ball = new Ball(this.ctx, this.canvas, this.width / 2, this.height - 65, 10);

        //init mouse
        this.canvas.addEventListener('mousemove', event => {
            this.platform.changeX(event.offsetX - this.platform.width / 2)
        });
    }

    start(){
        this.timerId = setInterval(() => {
            this.clear();
            this.platform.draw();
            this.ball.draw();
        }, 10);

        this.timeGameId = setInterval(() => {
            this.ball.move();
            if(
                this.ball.x >= this.platform.x && 
                this.ball.x <= this.platform.x + this.platform.width && 
                this.ball.y >= this.platform.y - this.ball.radius &&
                this.ball.y <= this.platform.y + this.platform.height
            ){
                this.ball.changeDirection();
            }
        }, 15);
    }

    clear(){
        this.ctx.clearRect(0, 0, this.width, this.height);
    }
}

export default Game;