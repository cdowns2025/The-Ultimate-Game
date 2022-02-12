class Game {
  constructor(config) {
    this.canvas = config.element.querySelector(".game-canvas");
    this.ctx = this.canvas.getContext("2d");
    
  }
  
  startGameLoop() {
    const step = () => {
      //Clear the screen
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      this.player.update();
      this.player.draw(this.ctx);  



      requestAnimationFrame(() => {
        this.step();
      });
    };
    step();
  }
  
  init() {
    this.player = new Player({
      x: 10,
      y: 10,
      width: 5,
      height: 5,
    });
    
    this.startGameLoop();
  }
}
