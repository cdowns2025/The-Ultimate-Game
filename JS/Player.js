class Player {
    constructor(config) {
        //Referencing the orginal Game object
        this.game = config.game || null;
        
        //Assign all of the predefined arguments
        this.x = config.x || 0;
        this.y = config.y || 0;
        this.width = config.width || 5;
        this.height = config.height || 5;
        this.movingProgressConstant = this.game.gridSize || 5;
        this.isPlayerControlled = config.isPlayerControlled || false;
        this.direction = config.direction || "right";
        
        //Setting up a counter to aid in cell-based movement
        this.movingProgressRemaining = 0;
        
        //Defining a map to help convert the input from a direction to actual movement
        this.directionUpdate = {
            "down": ["y", 1],
            "up": ["y", -1],
            "left": ["x", -1],
            "right": ["x", 1],
        }
        
    }
    
    update(state) {
        //If we are moving, then we just want to update the position
        if (this.movingProgressRemaining > 0) {
            this.updatePosition(); //updates the player's position
        } else {
            //If we are player controlled and there is a new direction to move, update our direction and start our counter over
            if (this.isPlayerControlled && state.arrow) {
                this.direction = state.arrow;
                this.movingProgressRemaining = this.movingProgressConstant;
            }
        }
    } 
    
    updatePosition(state) {        
        //Take the direction and amount to move from our direction map
        const [ property, change ] = this.directionUpdate[this.direction];
        this[property] += change;
        this.movingProgressRemaining -= 1;
    }
    
    draw(ctx) {
        ctx.fillStyle = 'blue';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}
