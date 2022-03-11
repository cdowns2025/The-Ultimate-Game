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
      this.searchAlgorithm();
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

  searchAlgorithm() { //testing for now, soon to be the A* algorithm (maybe)
    if (this.idleTime >= 60) {
      let r = Math.random();
      if (r < 0.25) {
        this.direction = "left"
      } else if (r < 0.5) {
        this.direction = "up";
      } else if (r < 0.75) {
        this.direction = "right";
      } else {
        this.direction = "down";
      }
      this.idleTime = 0;
    } else {
      this.direction = null;
    }
    this.idleTime++;

//this one doesn't work right now, very primitive
    /*if (r < 0.5) { //used to have some randomness for enemy direction, so that it wouldn't be constantly biased to match the player on a certain axis first
      if (this.map.player.x < this.x) {
        this.direction = "left";
      }
      if (this.map.player.x > this.x) {
        this.direction = "right";
      }
    } else if (r >= 0.5) {
      if (this.map.player.y < this.y) {
        this.direction = "up";
      }
      if (this.map.player.y > this.y) {
        this.direction = "down";
      }
    } else {
      this.direction = null;
    }*/
  }

  onInteracted() {
    this.hit = true;
    this.hitInterval = 10;
  }
}
