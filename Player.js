class Player {// the player class global attributes
    constructor(config) {
        this.x = config.x || 0;
        this.y = config.y || 0;
        this.width = config.width || 5;
        this.height = config.width || 5;
        //this.dir = 1;
        //this.vAxis = 0;
        //this.hAxis = 0;
        
    }
    
    update(direction) {
        this.x++;
    }
    
    draw(ctx) {
        ctx.fillStyle = 'blue';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}
