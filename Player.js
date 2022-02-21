class Player {// the player class global attributes
    constructor(config) {
        this.x = config.x || 0;
        this.y = config.y || 0;
        this.width = config.width || 5;
        this.height = config.height || 5;
        
        
        this.movingProgressRemaining = 5;
        this.direction = config.direction || "right";
        this.playerDI = new DirectionInput(); //this is probably temporary, because it creates a direction input object in the player class. I'm only doing it right now because it seems a lot more complex to manage the input directions from Game.js
        
        this.directionUpdate = {
            "down": ["y", 1],
            "up": ["y", -1],
            "left": ["x", -1],
            "right": ["x", 1],
        }
        
    }
    
    update(state) {
        this.playerDI.init();//updates the inputs
        this.updatePosition();//updates the player's position
    } 
    
    updatePosition(state) {
        if (this.movingProgressRemaining == 0) {
            if (this.playerDI.heldDirections.length > 0) { //checks if there's any direction currently being held
                this.direction = this.playerDI.direction;//sets the player's direction to the current direction in the input
                this.movingProgressRemaining = 5;
            }
        }
        if (this.movingProgressRemaining > 0) {
            const { property, change } = this.directionUpdate[this.direction];
            this[property] += change;
            this.movingProgressRemaining -= 1;
        }
    }
    
    draw(ctx) {
        ctx.fillStyle = 'blue';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}
