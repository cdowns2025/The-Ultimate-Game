class Game {
  constructor(config) {
    this.canvas = config.element.querySelector(".game-canvas");
    this.ctx = this.canvas.getContext("2d");
    
    this.gridSize = 32;
    this.gridColor = "black";
    this.toggleGrid = true; // Draws a grid to the screen for testing purposes
    
  }
  
  drawGrid() {
    for (let c = 0; c < Math.float(this.canvas.width / 32); c++) {
      this.ctx.fillStyle = this.gridColor;
      this.ctx.fillRect(c * 32, 0, 2, this.canvas.height);
    }
  }
  
  startGameLoop() {
    const step = () => {
      //Clear the screen
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      
      //If we want a grid
      if (this.toggleGrid) {
        this.drawGrid();
      }

      this.player.update({
        arrow: this.directionInput.direction,
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
      gridSize: this.gridSize,
    });
    
    this.directionInput = new DirectionInput();
    this.directionInput.init();
    
    this.startGameLoop();
  }
}
