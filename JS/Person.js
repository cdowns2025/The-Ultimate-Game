class Person extends GameObject {
    constructor(config) {
        super(config);
        
        this.isDashing = false;
        this.isInteracting = false;
        this.dashingDistance = 0;
        this.speed = 1;
        
        this.health = 6;
        this.hit = false;
        this.hitInterval = 0;
        this.scrapPileInventory = 0;
        
        this.animationCounter = 0;
        this.animationChange = 1000 / 30;
        
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
        
        this.imageDirection = "down"

        this.interactKey = new KeyPressListener("Enter", () => {
            this.interact();
            
            if (this.imageDirection === "down") {
                this.sprite.imageFrame = 4;
            } else if (this.imageDirection === "up") {
                this.sprite.imageFrame = 5;
            } else if (this.imageDirection === "left") {
                this.sprite.imageFrame = 6;
            } else if (this.imageDirection === "right") {
                this.sprite.imageFrame = 7;
            }
            
            setTimeout(() => {
                if (this.imageDirection === "down") {
                    this.sprite.imageFrame = 0;
                } else if (this.imageDirection === "up") {
                    this.sprite.imageFrame = 1;
                } else if (this.imageDirection === "left") {
                    this.sprite.imageFrame = 2;
                } else if (this.imageDirection === "right") {
                    this.sprite.imageFrame = 3;
                }
            }, 500)
        });
        this.interactKey.init();
        
        this.oldDirection = "down"
    }
    
    dash() {
        if (!this.isDashing) {
            //here is where we need to check the next couple of spaces with a loop and figure out how far the player can dash before he bumps into something. For this, we need to figure out a way to reference the overall game object to the player so he can access the isNextSpaceTaken function.
            //Note to self: create a separate function called map init for each gameobject, then have the game.js assign its this.map object from Map.js as an argument to that function. then we can access the isNextSpaceTaken function.
            this.map.removeWall(((utils.getNextCoord(this.x, this.y, this.direction).newX - this.x) * this.movingProgressRemaining / 16) + this.x, ((utils.getNextCoord(this.x, this.y, this.direction).newY - this.y) * this.movingProgressRemaining / 16) + this.y); //uses a ton of math to basically delete the wall it made when it started moving normally but then went into a dash phase
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
    
    gotHurt(damageLevel) {
        if (!this.hit) {
            if (this.imageDirection === "down") {
                this.sprite.imageFrame = 8;
            } else if (this.imageDirection === "up") {
                this.sprite.imageFrame = 9;
            } else if (this.imageDirection === "left") {
                this.sprite.imageFrame = 10;
            } else if (this.imageDirection === "right") {
                this.sprite.imageFrame = 11;
            }
            
            this.hit = true;
            this.hitInterval = 30;
            this.health -= damageLevel;
            
            if (this.imageDirection === "down") this.direction = "up";
            else if (this.imageDirection === "up") this.direction = "down";
            else if (this.imageDirection === "left") this.direction = "right";
            else this.direction = "left";
            this.movingProgressRemaining = 16;
            
            this.map.moveWall(this.x, this.y, this.direction);
        }
    }

    update(state) {
        
        this.animationCounter += state.deltaTime;
        
        if (this.hit) { // decreases health when the enemy is hit
            this.color = "red";
            if (this.hitInterval == 0) {
              this.hit = false;
              
             if (this.imageDirection === "down") {
                this.sprite.imageFrame = 0;
                this.sprite.updateSrc();
            } else if (this.imageDirection === "up") {
                this.sprite.imageFrame = 1;
                this.sprite.updateSrc();
            } else if (this.imageDirection === "left") {
                this.sprite.imageFrame = 2;
                this.sprite.updateSrc();
            } else if (this.imageDirection === "right") {
                this.sprite.imageFrame = 3;
                this.sprite.updateSrc();
            }
            }
            this.hitInterval--;
          } else {
            this.color = "blue";
          }
        
        //Animation
        if (this.movingProgressRemainging > 0 && this.animationCounter > this.animationChange) {
            this.animationCounter -= this.animationChange;
            
            if (this.imageDirection === "down") {
                if (this.sprite.imageFrame === 12) this.sprite.imageFrame = 16;
                if (this.sprite.imageFrame === 15) this.sprite.imageFrame = 12;
                else this.sprite.imageFrame = 12;
            } else if (this.imageDirection === "up") {
                if (this.sprite.imageFrame === 13) this.sprite.imageFrame = 17;
                if (this.sprite.imageFrame === 16) this.sprite.imageFrame = 13;
                else this.sprite.imageFrame = 13;
            } else if (this.imageDirection === "left") {
                if (this.sprite.imageFrame === 14) this.sprite.imageFrame = 18;
                if (this.sprite.imageFrame === 17) this.sprite.imageFrame = 14;
                else this.sprite.imageFrame = 14;
            } else if (this.imageDirection === "right") {
                if (this.sprite.imageFrame === 15) this.sprite.imageFrame = 19;
                if (this.sprite.imageFrame === 18) this.sprite.imageFrame = 15;
                else this.sprite.imageFrame = 15;
            }   
            
        }

        if (this.movingProgressRemaining > 0) {
            this.updatePosition(); //updates the player's position
        } else {            
            if (state.arrow) {
                this.direction = state.arrow;
                this.imageDirection = state.arrow;
            }
            if (this.isPlayerControlled && state.arrow && !this.isDashing && !state.map.isNextSpaceTaken(this.x, this.y, state.arrow, 16)) { //function that makes the player move normally, only happens if space isn't pressed
                this.speed = 1;
                this.movingProgressRemaining = 16;                
                
                state.map.moveWall(this.x, this.y, this.direction);
            }
        }
        if (this.isInteracting && !this.isDashing) { //Checks the cell in the players direction and activates the object's on-interact script function
            Object.values(state.map.gameObjects.enemies).forEach(object => {
                if (object.x === utils.gridFloor(Object.values(utils.getNextCoord(this.x, this.y, this.direction))[0] + 8) && object.y === utils.gridFloor(Object.values(utils.getNextCoord(this.x, this.y, this.direction))[1] + 8)) {
                    if (typeof object.onInteracted === "function") {
                        object.onInteracted({
                            damage: 1,
                            direction: this.direction,
                            source: this,
                        });
                    }
                }
            });
            Object.values(state.map.gameObjects.allies).forEach(object => {
                if (object.x === utils.gridFloor(Object.values(utils.getNextCoord(this.x, this.y, this.direction))[0] + 8) && object.y === utils.gridFloor(Object.values(utils.getNextCoord(this.x, this.y, this.direction))[1] + 8)) {
                    if (typeof object.onInteracted === "function") {
                        object.onInteracted({
                            damage: 1,
                            direction: this.direction,
                            source: this,
                        });
                    }
                }
            });
            this.isInteracting = false;
        }
        
        if (this.oldDirection !== this.direction && !this.hit) {
            this.oldDirection = this.direction;
            if (this.imageDirection === "down") {
                this.sprite.imageFrame = 0;
                this.sprite.updateSrc();
            } else if (this.imageDirection === "up") {
                this.sprite.imageFrame = 1;
                this.sprite.updateSrc();
            } else if (this.imageDirection === "left") {
                this.sprite.imageFrame = 2;
                this.sprite.updateSrc();
            } else if (this.imageDirection === "right") {
                this.sprite.imageFrame = 3;
                this.sprite.updateSrc();
            }
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
