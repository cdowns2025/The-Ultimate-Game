alert('It is working');
class Player {// the player class global attributes
    constructor(x, y, width, height, src) {
        alert('playuer');
        this.x = x;
        this.y = y;
        //this.cx = Math.floor(this.x / globalRatio);
        //this.cy = Math.floor(this.y / globalRatio);
        this.width = width;
        this.height = height;
        this.src = src;
        this.dir = 1;
        this.vAxis = 0;
        this.hAxis = 0;
    }
    move() {

    }
    draw(ctx) {
        alert('hi');
        ctx.fillStyle = 'blue';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}
