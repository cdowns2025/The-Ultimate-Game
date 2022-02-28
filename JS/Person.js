class Person extends GameObject {
    constructor(config) {
        super(config);
        
        this.movingProgressRemaining = 0;
        
        this.isPlayerControlled = config.isPlayerControlled || false;
        
        this.directionUpdate = {
            "down": ["y", 1],
            "up": ["y", -1],
            "right": ["x", 1],
            "left": ["x", -1],
        }
    }
    
    update(state) {
        console.log("update");
        if (this.movingProgressRemaining > 0) {
            this.updatePosition();
        } else {
            if (this.isPlayerControlled && state.arrow) {
                this.direction = state.direction;
            }
        }
    }
    
    updatePosition() {
        const [property, change] = this.directionUpdate[this.direction];
        this[property] += change;
        this.movingProgressRemaining--;
    }
}
