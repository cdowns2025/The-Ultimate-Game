class Enemy extends GameObject {
  constructor(config) {
    super(config);

    this.health = 3;
    this.alive = true;

    this.hit = false;
    this.hitInterval = 0;
    
    this.movingProgressRemaining = 0;
    this.directionUpdate = {
      "down": ["y", 1],
      "up": ["y", -1],
      "right": ["x", -1],
      "left": ["x", 1],
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
      this.alive = false;
    }

    if (!this.alive) {
      this.map.removeWall(this.x, this.y);
    }

    if (this.movingProgressRemaining > 0) {
      this.updatePosition();
    } else {
      if (state.direction) {
        this.direction = state.direction;
        this.movingProgressRemaining = 16;
      }
    }
  }
  
  updatePosition() {
    const [property, change] = this.directionUpdate[this.direction];
    this[property] += change;
    
    this.movingProgressRemaining--;
  }

  searchAlgorithm() {

  }

  onInteracted() {
    this.hit = true;
    this.hitInterval = 10;
  }
}
