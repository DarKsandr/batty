class Ball{
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
        this.x = x;
    }

    changeY(y){
        this.y = y;
    }


    move(){
        //logic move
    }
}

export default Ball