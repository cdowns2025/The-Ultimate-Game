class Game {
  constructor(config) {
    // Pulling the canvas from the DOM and getting the context of it
    this.canvas = config.element.querySelector(".game-canvas");
    this.ctx = this.canvas.getContext("2d");
    
    //Information to due with grid-based movement
    this.gridSize = 16;
    
    //Specifications for the toggleable drawable girf
    this.gridColor = "black";
    this.gridLineWidth = 1;
    this.toggleGrid = true; 
    
    //Whenever we add cutscenes, this will help us know if one is going on
    this.isCutscenePlaying = false;
    
  }
  
  drawGrid() {
    //Draw the columns
    for (let c = 0; c < Math.floor(this.canvas.width / this.gridSize) + 1; c++) {
      this.ctx.fillStyle = this.gridColor;
      this.ctx.fillRect((c * this.gridSize) - (this.gridLineWidth / 2), 0, this.gridLineWidth, this.canvas.height);
    } 
    
    //Draw the rows
    for (let r = 0; r < Math.floor(this.canvas.height / this.gridSize) + 1; r++) {
      this.ctx.fillStyle = this.gridColor;
      this.ctx.fillRect(0, (r * this.gridSize) - (this.gridLineWidth / 2), this.canvas.width, this.gridLineWidth);
    } 
  }
  
  startGameLoop() {
    //Start the official "game loop"
    const step = () => {
      //Clear the screen
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      
      //If we want a grid
      if (this.toggleGrid) {
        this.drawGrid();
      }

      //Update and draw the player
      this.player.update({
        //Pass in the direction from the direction input
        arrow: this.directionInput.direction,
      });
      this.player.draw(this.ctx);        

      //Call this function again at earliest convience / how fast your computer can run it
      requestAnimationFrame(() => {
        step();
      });
    };
    
    //Actually starting the loop
    step();
  }
  
  init() {
    //Creating a new player
    this.player = new Player({
      x: utils.asGrid(0, 4, this.gridSize),
      y: utils.asGrid(0, 4, this.gridSize),
      width: 4,
      height: 4,
      isPlayerControlled: true,
      game: this,
    });
    
    //Setting up direction input for the player character
    this.directionInput = new DirectionInput();
    this.directionInput.init();
    
    //Start the game loop
    this.startGameLoop();
  }
}
