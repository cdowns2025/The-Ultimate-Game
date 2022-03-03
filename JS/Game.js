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

        //Whenever we add cutscenes, this will help us know if one is going on
        this.isCutscenePlaying = false;

        this.map = null;

    }

    startGameLoop() {
        //Start the official "game loop"
        const step = () => {
            //Clear the screen
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            
            const player = this.map.gameObjects.allies.player; 

            //Update the allies
            Object.values(this.map.gameObjects.allies).forEach(object => {
                object.update({
                    arrow: this.directionInput.direction,
                    map: this.map,
                })
            });
           
            //Update the enemies
            Object.values(this.map.gameObjects.enemies).forEach(object => {
                object.update({
                    direction: null,
                    map: this.map
                })
            });
         
            this.map.drawLowerLayer(this.ctx, player);

            //Draw the allies
            Object.values(this.map.gameObjects.allies).forEach(object => {
                object.sprite.draw(this.ctx, player);
            });
            
            //Draw the enemies
            Object.values(this.map.gameObjects.enemies).forEach(object => {
                object.sprite.draw(this.ctx, player);
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

        this.map = new Map(window.Maps["TestingRoom"]);
        this.map.mountObjects();
                 
        this.grid = new Grid({
            canvas: this.canvas,
            gridSize: 16,
            gridLineWidth: 2,
            gridColor: "white",
        }); 

        //Setting up direction input for the player character
        this.directionInput = new DirectionInput();
        this.directionInput.init();

        //Start the game loop
        this.startGameLoop();
    }
}
