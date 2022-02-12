class Ship {
  constructor(config) {
    this.level = new Image();
    this.level.src = "grid.png";
    this.level.onload = () => {
      this.levelLoaded = true;
    };
  }
  
  draw(ctx) {
    ctx.drawImage(this.level, 0, 0);
  }
  
  init() {
    
  }
} 
