class Ship {
  constructor(config) {
    this.image = new Image();
    this.image.src = "grid.png";
    this.image.onload = () => {
      this.levelLoaded = true;
    };
    //alert('hias');
  }
  
  draw(ctx) {
    //alert('drawing');
    setTimeout(() => {
      ctx.drawImage(this.image, 0, 0); 
    },100);
  }
  
  init() {
    
  }
} 
