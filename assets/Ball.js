class Ball{
    static UP_RIGHT = "up-right";
    static UP_LEFT = "up-left";
    static DOWN_RIGHT = "down-right";
    static DOWN_LEFT = "down-left";

    move_step = 1;
    direction = Ball.UP_RIGHT;

    constructor(ctx, canvas, x, y, radius){
        this.ctx = ctx;
        this.canvas = canvas;
        this.x = x;
        this.y = y;
        this.radius = radius;
    }

    draw(){
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        this.ctx.stroke();
    }

    changeX(x){
        if(x >= this.radius && x <= this.canvas.width - this.radius){
            this.x = x;
            return x;
        }
        return false;
    }

    changeY(y){
        if(y >= this.radius && y <= this.canvas.height - this.radius){
            this.y = y;
            return y;
        }
        return false;
    }


    move(){
        //logic move
        const result = (() => {
            switch(this.direction){
                case Ball.UP_RIGHT:
                    return this.changeX(this.x + this.move_step) && this.changeY(this.y - this.move_step);
                case Ball.UP_LEFT:
                    return this.changeX(this.x - this.move_step) && this.changeY(this.y - this.move_step);
                case Ball.DOWN_LEFT:
                    return this.changeX(this.x - this.move_step) && this.changeY(this.y + this.move_step);
                case Ball.DOWN_RIGHT:
                    return this.changeX(this.x + this.move_step) && this.changeY(this.y + this.move_step);
            }
        })();
        if(result === false){
            this.changeDirection();
        }
    }

    changeDirection(){
        const is_top = this.y - this.radius <= 0;
        const is_left = this.x - this.radius <= 0;
        const is_right = this.x + this.radius >= this.canvas.width;
        switch(this.direction){
            case Ball.UP_RIGHT:
                if(is_top){
                    this.direction = Ball.DOWN_RIGHT;
                } else {
                    this.direction = Ball.UP_LEFT;
                }
                break;
            case Ball.UP_LEFT:
                if(is_left){
                    this.direction = Ball.UP_RIGHT;
                } else {
                    this.direction = Ball.DOWN_LEFT;
                }
                break;
            case Ball.DOWN_LEFT:
                this.direction = Ball.DOWN_RIGHT;
                break;
            case Ball.DOWN_RIGHT:
                if(is_right){
                    this.direction = Ball.DOWN_LEFT;
                } else {
                    this.direction = Ball.UP_RIGHT;
                }
                break;
        }
    }
}

export default Ball