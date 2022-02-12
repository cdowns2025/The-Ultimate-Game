class Game {
  constructor(config) {
    this.canvas = config.element.querySelector(".game-canvas");
    this.ctx = this.canvas.getContext("2d");
    
  }
  
  step() {
    //this.ship.draw(this.ctx);
    this.player.draw(this.ctx);    
    
    requestAnimation(() => {
      step();
    });
  }
  
  init() {
    this.player = new Player(50, 50, 30, 30, 1);
    
    //this.ship = new Ship();
    this.image = new Image();
    this.image.src = "grid.png";
    this.image.onload = () => {
      this.ctx.drawImage(this.image, 0, 0);
    };
    
    this.step();
  }
}
