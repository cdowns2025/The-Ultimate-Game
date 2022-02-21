class Player {// the player class global attributes
    constructor(config) {
        this.x = config.x || 0;
        this.y = config.y || 0;
        this.width = config.width || 5;
        this.height = config.height || 5;
        this.movingProgressConstant = config.gridSize || 5;
        
        
        this.movingProgressRemaining = 0;
        this.direction = config.direction || "right";
        
        this.directionUpdate = {
            "down": ["y", 1],
            "up": ["y", -1],
            "left": ["x", -1],
            "right": ["x", 1],
        }
        
    }
    
    update(state) {
        if (this.movingProgressRemaining > 0) {
            this.updatePosition(); //updates the player's position
        } else {
            if (state.arrow) {
                this.direction = state.arrow;
                this.movingProgressRemaining = this.movingProgressConstant;
            }
        }
    } 
    
    updatePosition(state) {        
        const [ property, change ] = this.directionUpdate[this.direction];
        this[property] += change;
        this.movingProgressRemaining -= 1;
    }
    
    draw(ctx) {
        ctx.fillStyle = 'blue';
        ctx.fillRect(this.x + this.width, this.y + this.height, this.width, this.height);
    }
}
