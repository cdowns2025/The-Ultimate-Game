class Game {
  constructor(config) {
    this.canvas = config.element.querySelector(".game-canvas");
    this.ctx = this.canvas.getContext("2d");
    
  }
  
  init() {
    this.ctx.fillStyle = "red";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }
}
