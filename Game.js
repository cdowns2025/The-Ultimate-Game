class Game {
  constructor(config) {
    this.canvas = config.element.querySelector(".game-canvas");
    this.ctx = this.canvas.getContext("2d");
    
    this.gridSize = 32;
    this.gridColor = "black";
    this.gridLineWidth = 1;
    this.toggleGrid = true; // Draws a grid to the screen for testing purposes
    
  }
  
  drawGrid() {
    //Draw the columns
    for (let c = 0; c < Math.floor(this.canvas.width / 32) + 1; c++) {
      this.ctx.fillStyle = this.gridColor;
      this.ctx.fillRect(c * 32, 0, this.gridLineWidth, this.canvas.height);
    } 
    
    //Draw the rows
    for (let r = 0; r < Math.floor(this.canvas.height / 32) + 1; r++) {
      this.ctx.fillStyle = this.gridColor;
      this.ctx.fillRect(0, r * 32, this.gridLineWidth, this.canvas.width);
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
