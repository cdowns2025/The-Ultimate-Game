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

        this.map = null;

    }

    startGameLoop() {
    //Start the official "game loop"
    const step = () => {
        //Clear the screen
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        //this.map.drawLowerLayer(this.ctx);

        Object.values(this.map.gameObjects).forEach(object => {
            object.update({
                arrow: this.directionInput.direction,
            })
        });

        Object.values(this.map.gameObjects).forEach(object => {
            object.sprite.draw(this.ctx);
        });

        //this.map.drawUpperLayer(this.ctx);

        //Call this function again at earliest convience / how fast your computer can run it
        requestAnimationFrame(() => {
          step();
        });
    };

    //Actually starting the loop
    step();
    }

    init() {

        this.map = new Map(window.Maps["Level1"]);

        //Setting up direction input for the player character
        this.directionInput = new DirectionInput();
        this.directionInput.init();

        //Start the game loop
        this.startGameLoop();
    }
}
