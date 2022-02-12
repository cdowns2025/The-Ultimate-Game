class Ship {
  constructor(config) {
    this.levelLoaded = false;
    this.image = new Image();
    this.image.src = "grid.png";
    this.image.onload = () => {
      this.isLoaded = true;
    };
  }
  
  draw(ctx) {
    alert(this.isLoaded);
    if (this.isLoaded) {
      ctx.drawImage(this.image, 0, 0); 
    }
    return;
  }
  init() {
    
  }
} 
