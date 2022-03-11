class Enemy extends GameObject {
  constructor(config) {
    super(config);

    this.health = 3;
    this.alive = true;

    this.hit = false;
    this.hitInterval = 0;
    this.idleTime = 0;
    
    this.movingProgressRemaining = 0;
    this.directionUpdate = {
      "down": ["y", 1],
      "up": ["y", -1],
      "right": ["x", 1],
      "left": ["x", -1],
    }
    
  }
  
  update(state) {
    if (this.hit) { // decreases health when the enemy is hit
      this.color = "red";
      if (this.hitInterval == 0) {
        this.hit = false;
        this.health--;
      }
      this.hitInterval--;
    } else {
      this.color = "purple";
    }

    if (this.health <= 0) {
      this.isRendered = false;
      this.map.removeWall(this.x, this.y);
      this.alive = false;
    }

    if (this.movingProgressRemaining > 0) {
      this.updatePosition();
    } else {
      this.searchAlgorithm(state);
      if (this.direction !== null && !this.map.isNextSpaceTaken(this.x, this.y, this.direction, 16)) {
        this.movingProgressRemaining = 16;
        this.map.moveWall(this.x, this.y, this.direction);
      }
    }
  }
  
  updatePosition() {
    const [property, change] = this.directionUpdate[this.direction];
    this[property] += change;
    
    this.movingProgressRemaining--;
  }

  searchAlgorithm(state) { //testing for now, soon to be the A* algorithm (maybe)
    if (this.idleTime >= 30) { //checks if enough idle time has passed

      if (utils.distanceFormula(this.x, state.player.x, this.y, state.player.y) > 16) { //checks if the player is more than one cell away, then runs the rest of the function if they are
        let r = Math.random();
        if (r < 0.5) { //used to have some randomness for enemy direction, so that it wouldn't be constantly biased to match the player on a certain axis first
          if (state.player.x < this.x) {
            this.direction = "left";
          } else if (state.player.x > this.x) {
            this.direction = "right";
          } else {
            this.direction = null;
          }
        } else if (r >= 0.5) {
          if (state.player.y < this.y) {
            this.direction = "up";
          } else if (state.player.y > this.y) {
            this.direction = "down";
          } else {
            this.direction = null;
          }
        }
        this.idleTime = 0;
      }
    } else {
      this.direction = null;
    }
    this.idleTime++;
  }

  onInteracted() {
    this.hit = true;
    this.hitInterval = 10;
  }
}
