class Ship {
  constructor(config) {
    this.levelLoaded = false;
    this.image = new Image();
    this.image.src = "grid.png";
    this.image.onload = () => {
      this.levelLoaded = true;
    };
    //alert('hias');
  }
  
  draw(ctx) {
    //alert('drawing');
    alert(this.levelLoaded);
    if (this.levelLoaded) {
      alert('we are drawing')
      ctx.drawImage(this.image, 0, 0); 
    }
  }
  
  init() {
    
  }
} 
