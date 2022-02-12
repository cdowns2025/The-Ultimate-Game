class Game {
  constructor(config) {
    this.canvas = config.element.querySelector(".game-canvas");
    this.ctx = this.canvas.getContext("2d");
    
  }
  
  step() {
    this.player.update();
    this.player.draw(this.ctx);    
    
    requestAnimationFrame(() => {
      this.step();
    });
  }
  
  init() {
    this.player = new Player({
      x: 10,
      y: 10,
      width: 5,
      height: 5,
    });
    
    this.step();
  }
}
