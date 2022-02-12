class Ship {
  constructor(config) {
    this.levelLoaded = false;
    this.image = new Image();
    this.image.src = "grid.png";
    this.image.onload = () => {
      this.isLoaded = true;
    };
    //alert('hias');
  }
  
  draw(ctx) {
    //alert('drawing');
    alert(this.isLoaded);
    if (this.isLoaded) {
      alert('we are drawing')
      ctx.drawImage(this.image, 0, 0); 
    }
    
    return;
  }
  
  init() {
    
  }
} 
