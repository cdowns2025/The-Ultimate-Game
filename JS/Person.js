class Person extends GameObject {
    constructor(config) {
        super(config);
        
        this.isDashing = false;
        this.isInteracting = false;
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
                this.dash(config.game);
            }
        });
        this.dashKey.init();

        this.interactKey = new KeyPressListener("Enter", () => {
            this.interact();
        });
        this.interactKey.init();
    }
    
    dash() {
        if (!this.isDashing) {
            //here is where we need to check the next couple of spaces with a loop and figure out how far the player can dash before he bumps into something. For this, we need to figure out a way to reference the overall game object to the player so he can access the isNextSpaceTaken function.
            //Note to self: create a separate function called map init for each gameobject, then have the game.js assign its this.map object from Map.js as an argument to that function. then we can access the isNextSpaceTaken function.
            for (let i = 0; i < 3; i++) {
                if (this.map.isNextSpaceTaken(this.x, this.y, this.direction, ((i + 1) * 16) + this.movingProgressRemaining)) {
                    if (i > 0) {
                        this.isDashing = true;
                        this.dashingDistance = i * 16;
                        this.speed = 3;
                    }
                    break;
                } else if (i == 2) {
                    this.isDashing = true;
                    this.dashingDistance = 3 * 16;
                    this.speed = 3;
                }
            }
        }
    }

    interact() {
        this.isInteracting = true;
    }
    
    update(state) {
        if (this.movingProgressRemaining > 0) {
            this.updatePosition(); //updates the player's position
        } else {
            if (state.arrow) {
                this.direction = state.arrow;
            }
            if (this.isPlayerControlled && state.arrow && !this.isDashing && !this.map.isNextSpaceTaken(this.x, this.y, state.arrow, 16)) { //function that makes the player move normally, only happens if space isn't pressed
                this.speed = 1;
                this.movingProgressRemaining = 16;                
                
                this.map.moveWall(this.x, this.y, this.direction)
            }
        }
        if (this.isInteracting && !this.isDashing) { //Checks the cell in the players direction and activates the object's on-interact script function
            Object.values(this.map.gameObjects.enemies).forEach(object => {
                if (object.x === Object.values(utils.getNextCoord(this.x, this.y, this.direction))[0] && object.y === Object.values(utils.getNextCoord(this.x, this.y, this.direction))[1]) {
                    object.onInteracted();
                }
            });
            this.isInteracting = false;
        }
    }
    
    updatePosition() {
        //Take the direction and amount to move from our direction map
        const [ property, change ] = this.directionUpdate[this.direction]; // maps the movement direction and magnitude to the table and the current direction set in the movement functions
        if (this.isDashing) {
            this[property] += change * this.speed;
            this.dashingDistance -= Math.abs(change * this.speed);
            
            if (this.dashingDistance - Math.abs(change * this.speed) <= 0) { //minor corrections involved: sometimes the dashing distance is not a multiple of three to to the colliding method in the dash function, and if it isn't, it takes its offset and adds it to movingProgressRemaining before setting speed back to one.
                //alert("hey");
                this.isDashing = false;
                this.movingProgressRemaining += this.dashingDistance;
                this.speed = 1;
            }
            
            return;
        }

        this[property] += change * this.speed;
        this.movingProgressRemaining -= Math.abs(change * this.speed); // subtracts the movement change from the moving progress remaining
    }
}
