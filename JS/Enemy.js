class Enemy extends GameObject {
  constructor(config) {
    super(config);

    this.health = 3;
    this.alive = true;

    this.hit = false; //initial hit boolean
    this.hitInterval = 0;
    this.idleTime = 0;
    this.phase = "search";
    this.isMoving = false;
    
    this.movingProgressRemaining = 0;
    this.directionUpdate = {
      "down": ["y", 1],
      "up": ["y", -1],
      "right": ["x", 1],
      "left": ["x", -1],
    }
    
    this.oldDirection = "down";
    
  }
  
  update(state) {
    if (this.alive) {

      if (this.hit) {
        //knockback on initial hit
        if (!state.map.isNextSpaceTaken(this.x, this.y, this.direction, 16)) {
          state.map.moveWall(this.x, this.y, this.direction);
          this.movingProgressRemaining = 16;
          this.isMoving = true;
        }
        //falsifies??? the initial hit
        this.hit = false;
      }
      
      if (this.hitInterval == 0) {
        this.health--;
        this.hitInterval--; //extra precaution - puts the interval under 0 so this function isn't called over and over
      } 

      //All the color (soon to be sprite) management based on phase
      if (this.hitInterval > 0) { // Keeps the invincibility frames on
        this.color = "red";
        this.hitInterval--;
      } else if (this.phase == "attackPose") { //checks if enemy is attacking, turns pink if it is
        this.color = `rgb(${128 + this.idleTime * 20}, ${this.idleTime * 20}, ${128 + this.idleTime * 20})`; //charging up purple color
      } else { //sets generic purple color during search phase
        this.color = "purple";
      }

      if (this.health <= 0) {
        this.isRendered = false;
        state.map.removeWall(utils.gridFloor(this.x + 8), utils.gridFloor(this.y + 8)); //ensures that the proper wall is removed when the enemy dies   
        this.alive = false;
        this.collision = false;
        state.game.score += 2;
      }

      if (this.movingProgressRemaining > 0) {
        this.updatePosition();
      } else {
        this.searchAlgorithm(state);
        if (this.direction !== null && this.isMoving == true && !state.map.isNextSpaceTaken(this.x, this.y, this.direction, 16)) {
          this.movingProgressRemaining = 16;
          state.map.moveWall(this.x, this.y, this.direction);
        }
      }
      
      if (this.oldDirection !== this.direction) {
            this.oldDirection = this.direction;
            if (this.direction === "down") {
                this.sprite.imageFrame = 0;
                this.sprite.updateSrc();
            } else if (this.direction === "up") {
                this.sprite.imageFrame = 1;
                this.sprite.updateSrc();
            } else if (this.direction === "left") {
                this.sprite.imageFrame = 2;
                this.sprite.updateSrc();
            } else if (this.direction === "right") {
                this.sprite.imageFrame = 3;
                this.sprite.updateSrc();
            }
        }
    }
  }
  
  updatePosition() {
    const [property, change] = this.directionUpdate[this.direction];
    this[property] += change;
    
    this.movingProgressRemaining--;
  }

  //GOVERNS ALL ACTIONS, BRAIN
  searchAlgorithm(state) { 
    let r = Math.random(); //randomized variable for multiple purposes, whether it's randomized direction or what axis to choose to match the player in.
    if (this.idleTime >= 10) { //checks if enough idle time has passed

      //SEARCHING
      if (utils.distanceFormula(this.x, state.player.x, this.y, state.player.y) > 16) { //checks if the player is more than one cell away, then runs the rest of the function if they are
        this.phase = "search"; //sets the enemies phase to search mode when the distance is more than one square
        if (r < 0.5) { //this is used to have some randomness for enemy direction, so that it wouldn't be constantly biased to match the player on a certain axis first
          if (state.player.x < this.x) {
            this.direction = "left";
            this.isMoving = true;
          } else if (state.player.x > this.x) {
            this.direction = "right";
            this.isMoving = true;
          } else {
            this.isMoving = false;
          }
        } else if (r >= 0.5) {
          if (state.player.y < this.y) {
            this.direction = "up";
            this.isMoving = true;
          } else if (state.player.y > this.y) {
            this.direction = "down";
            this.isMoving = true;
          } else {
            this.isMoving = false;
          }
        }
      }
      //ATTACKING
      if (utils.distanceFormula(this.x, state.player.x, this.y, state.player.y) < 25 && utils.distanceFormula(this.x, state.player.x, this.y, state.player.y) >= 16) { //checks if enemy is one space away from player, goes into attack phase when he is.
        if (this.phase == "attackPose") {//doesn't need to check player coords because they are already positioned
            state.player.gotHurt(1);
            this.phase = "search";
        } else if (this.phase == "search") {
          this.phase = "attackPose";
        }
      }
      this.idleTime = 0;
    } else if (utils.distanceFormula(this.x, state.player.x, this.y, state.player.y) < 16) { //checks if the enemy is on the same space as the player, then moves him away if it is.
      //randomized directions
      if (r < 0.25) {
        this.direction = "left";
        this.isMoving = true;
      } else if (r < 0.5) {
        this.direction = "up";
        this.isMoving = true;
      } else if (r < 0.75) {
        this.direction = "right";
        this.isMoving = true;
      } else {
        this.direction = "down";
        this.isMoving = true;
      }
      this.idleTime = 0; //resets the idle time so that enemy doesn't make sudden movements
    } else {
      this.isMoving = false;//if idle time not over a certain number, enemy doesn't move
    }
    this.idleTime++;
  }


  //BEING ATTACKED
  onInteracted(hitInfo) { //function called when enemy gets hit, tells that he is hit, sets his hit interval and resets his idle time, as if stunned.
    if (!this.hit && this.hitInterval < 0) {
      this.hit = true; //initial hit boolean
      this.hitInterval = 15;
      this.idleTime = 0;  
      
      this.direction = hitInfo.direction;
    }
  }
}
