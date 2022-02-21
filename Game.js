class Game {
  constructor(config) {
    this.canvas = config.element.querySelector(".game-canvas");
    this.ctx = this.canvas.getContext("2d");
    
  }
  
  startGameLoop() {
    const step = () => {
      //Clear the screen
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      this.player.update({
        //arrow: this.directionInput.direction(),
      });
      this.player.draw(this.ctx);  

      //input checking
      

      requestAnimationFrame(() => {
        step();
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
    
    this.directionInput = new DirectionInput();
    this.directionInput.init();
    console.log(this.directionInput);
    console.log(this.directionInput.direction());
    
    this.startGameLoop();
  }
}
