/* 
Class Name: Game
 
Description: A game class that will declare, manage, and store instances of all other classes and run the game itself frame by frame

Arguments: html element containing the game canvas

Functions:

init() {
  initializes the game and declares instances of all the classes for the game
} 
startGameLoop() {
  initializes the step function
}
step() {
  is called every frame to update the game.
}
*/

class Game {
  constructor(config) {
    // Pulling the canvas from the DOM and getting the context of it
    this.canvas = config.element.querySelector(".game-canvas");
    this.ctx = this.canvas.getContext("2d");
    
    //Information to due with grid-based movement
    this.gridSize = 8;
    
    //Specifications for the toggleable drawable grid
    this.toggleGrid = false; 
   
    //Whenever we add cutscenes, this will help us know if one is going on
    this.isCutscenePlaying = false;
    
  }

  startGameLoop() {
    //Start the official "game loop"
    const step = () => {
      //Clear the screen
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
     
      this.ship.draw(this.ctx);

      //Update and draw the player
      this.player.update({
        //Pass in the direction from the direction input
        arrow: this.directionInput.direction,
        isDashing: this.directionInput.keysPressed.includes("Space") // Haven personal note: be sure to use the includes method for checking arrays
      });
     
      //If we want a grid
      if (this.toggleGrid) {
        this.grid.draw(this.ctx, this.player);
      }
     
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
      x: utils.asGrid(0, 7, this.gridSize),
      y: utils.asGrid(0, 7, this.gridSize),
      width: 6,
      height: 6,
      isPlayerControlled: true,
      game: this,
    });
   
   //Create the grid
   this.grid = new Grid({
      gridColor: "white",
      gridLineWidth: 1,
      gridSize: this.gridSize,
      canvas: this.canvas,
    });
   
   this.ship = new Ship();
    
    //Setting up direction input for the player character
    this.directionInput = new DirectionInput();
    this.directionInput.init();
    
    //Start the game loop
    this.startGameLoop();
  }
}
