class Block{
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
        this.ctx.roundRect(this.x, this.y, this.width, this.height, 2);
        this.ctx.stroke();
    }
}

export default Block;