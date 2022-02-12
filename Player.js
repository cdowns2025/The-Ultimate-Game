class Player {// the player class global attributes
    constructor(config) {
        this.x = config.x || 0;
        this.y = config.y || 0;
        this.width = config.width || 5;
        this.height = config.height || 5;
        
        
        this.movingProgressRemaining = 64;
        this.direction = config.direction || "down";
        
        this.directionUpdate = {
            "down": ["y", 1],
            "up": ["y", -1],
            "left": ["x", -1],
            "right": ["x", 1],
        }
        
    }
    
    update(state) {
        this.updatePosition();
    } 
    
    updatePosition(state) {
        if (this.movingProgressRemaining > 0) {
            const [property, change] = this.directionUpdate[this.direction];
            this[property] += change;
            this.movingProgressRemaining -= 1;
        }
    }
    
    draw(ctx) {
        ctx.fillStyle = 'blue';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}
