class Ship {
  constructor(config) {
    this.image = new Image();
    this.image.src = "grid.png";
    this.image.onload = () => {
      alert('loaded');
      this.levelLoaded = true;
      alert(this.levelLoaded);
    };
    //alert('hias');
  }
  
  draw(ctx) {
    //alert('drawing');
    if (this.levelLoaded) {
      alert('we are drawing')
      ctx.drawImage(this.image, 0, 0); 
    }
  }
  
  init() {
    
  }
} 
