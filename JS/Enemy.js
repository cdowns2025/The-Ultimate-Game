class Enemy extends GameObject {
  constructor(config) {
    super(config);
    
    this.movingProgressRemaining = 0;
    this.directionUpdate = {
      "down": ["y", 1],
      "up": ["y", -1],
      "right": ["x", -1],
      "left": ["x", 1],
    }
    
  }
  
  update(state) {
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
}
