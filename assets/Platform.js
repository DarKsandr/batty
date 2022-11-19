class Platform{
    constructor(ctx, canvas, x, y, width, height){
        this.ctx = ctx;
        this.canvas = canvas;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    draw(){
        this.ctx.beginPath();
        this.ctx.stokeStyle = "black";
        this.ctx.roundRect(this.x, this.y, this.width, this.height, 10);
        this.ctx.stroke();
    }

    changeX(x){
        if(x > 0 && x < this.canvas.width - this.width){
            this.x = x;
        }
    }
}

export default Platform;