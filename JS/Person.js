class Person extends GameObject {
    constructor(config) {
        super(config);
        
        this.isDashing = false;
        this.dashingDistance = 0;
        this.speed = 1;
        
        this.movingProgressRemaining = 0;
        
        this.isPlayerControlled = config.isPlayerControlled || false;
        
        this.directionUpdate = {
            "down": ["y", 1],
            "up": ["y", -1],
            "right": ["x", 1],
            "left": ["x", -1],
        }
        
        this.dashKey = new KeyPressListener("Space", () => {
            if (this.movingProgressRemaining > 0) {
                this.dash();
            }
        });
        this.dashKey.init();
    }
    
    dash() {
        if (!this.isDashing) {
            this.isDashing = true;
            this.dashingDistance = 16 * 3;
            this.speed = 3;
        }
    }
    
    update(state) {
        if (this.movingProgressRemaining > 0) {
            this.updatePosition(state.map); //updates the player's position
        } else {
            if (this.isPlayerControlled && state.arrow && !this.isDashing && !state.map.isNextSpaceTaken(this.x, this.y, state.arrow)) { //function that makes the player move normally, only happens if space isn't pressed
                this.direction = state.arrow;
                this.speed = 1;
                this.movingProgressRemaining = 16;
                
                const { x=0,y=0 } = this.directionUpdate[this.direction];
                state.map.moveWall(this.x, this.y, this.x + (x * 16), this.y + (y * 16), true)
            }
        }
    }
    
    updatePosition(map) {
        //Take the direction and amount to move from our direction map
        const [ property, change ] = this.directionUpdate[this.direction]; // maps the movement direction and magnitude to the table and the current direction set in the movement functions
        
        if (this.isDashing) {
            this[property] += change * this.speed;
            this.dashingDistance -= Math.abs(change * this.speed);
            
            if (this.dashingDistance === 0) {
                this.isDashing = false;
                this.speed = 1;
            }
            
            return;
        }

        this[property] += change * this.speed;
        this.movingProgressRemaining -= Math.abs(change * this.speed); // subtracts the movement change from the moving progress remaining
    }
}
