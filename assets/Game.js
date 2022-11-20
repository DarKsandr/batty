import Ball from "./Ball";
import Platform from "./Platform";
import Block from "./Block";

class Game {
  width = 500;
  height = 500;

  default_point = 20;
  point = 0;

  canvas;
  ctx;
  platform;
  ball;
  blocks;

  constructor(canvas) {
    //init canvas
    this.canvas = canvas;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.canvas.style.border = "1px black solid";

    //init context
    this.ctx = this.canvas.getContext("2d");

    this.init();

    //init mouse
    this.canvas.addEventListener("mousemove", (event) => {
      this.platform.changeX(event.offsetX - this.platform.width / 2);
    });
  }

  init() {
    this.clear();
    this.point = 0;
    //init platform
    this.platform = new Platform(
      this.ctx,
      this.canvas,
      this.width / 2 - 50,
      this.height - 70,
      100,
      25
    );

    //init ball
    this.ball = new Ball(
      this.ctx,
      this.canvas,
      this.width / 2,
      this.height - 85,
      10
    );

    //init blocks
    this.generateBlocks();
  }

  start() {
    this.timerDrawId = setInterval(() => {
      this.clear();
      this.interfaceDraw();
      this.platform.draw();
      this.ball.draw();
      this.blocks.forEach((block) => {
        block.draw();
      });
    }, 10);

    this.timeGameId = setInterval(() => {
      this.ball.move();

      //End game
      if (this.ball.is_bottom()) {
        this.end("Game over!");
      }

      if (
        this.ball.x >= this.platform.x &&
        this.ball.x <= this.platform.x + this.platform.width &&
        this.ball.y >= this.platform.y - this.ball.radius &&
        this.ball.y <= this.platform.y + this.platform.height
      ) {
        this.ball.changeDirection();
      }

      for (let i = 0; i < this.blocks.length; i++) {
        const block = this.blocks[i];
        if (
          this.ball.x >= block.x &&
          this.ball.x <= block.x + block.width &&
          this.ball.y >= block.y &&
          this.ball.y <= block.y + block.height
        ) {
          this.blocks.splice(i, 1);
          this.ball.changeDirection();
          this.point += this.default_point;
          break;
        }
      }
      if (this.blocks.length === 0) {
        this.end("You win!");
      }
    }, 10);
  }

  end(end_text) {
    clearInterval(this.timeGameId);
    clearInterval(this.timerDrawId);
    this.ctx.beginPath();
    this.ctx.font = "35px serif";
    this.ctx.fillText(end_text, this.width / 2 - 80, this.height / 2);
    this.ctx.fillText(
      `Total: ${this.point}`,
      this.width / 2 - 80,
      this.height / 2 + 40
    );
    const btn = {
        width: 100,
        height: 25,
        x: this.width / 2 - 50,
        y: this.height / 2 + 60
    };
    this.ctx.rect(
      btn.x,
      btn.y,
      btn.width,
      btn.height
    );
    this.ctx.stroke();
    this.ctx.font = "20px serif";
    this.ctx.fillText(
      `Try again`,
      this.width / 2 - btn.width / 2 + 10,
      this.height / 2 + 77
    );

    const tryAgain = (event) => {
        if(
            event.offsetX >= btn.x && 
            event.offsetX <= btn.x + btn.width && 
            event.offsetY >= btn.y &&
            event.offsetY <= btn.y + btn.height
        ){
            this.canvas.removeEventListener('click', tryAgain);
            this.init();
            this.start();
        }
    }

    this.canvas.addEventListener('click', tryAgain)
  }

  generateBlocks() {
    this.blocks = [];

    let block_x = 0,
      block_y = block_x;
    const block_width = 25,
      block_height = block_width;
    for (let i = 0; i < 40; i++) {
      this.blocks.push(
        new Block(
          this.ctx,
          this.canvas,
          block_x,
          block_y,
          block_width,
          block_height
        )
      );
      block_x += block_width;
      if (block_x >= this.width) {
        block_x = 0;
        block_y += block_height;
      }
    }
  }

  interfaceDraw() {
    this.pointDraw();
  }

  pointDraw() {
    this.ctx.font = "20px serif";
    this.ctx.fillText(`Point: ${this.point}`, 10, this.height - 10);
  }

  clear() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }
}

export default Game;
