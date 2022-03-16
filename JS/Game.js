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
        this.score = 0;
        this.lastTime = 0;
        this.muted = false;
        this.wave = 1;
     
        this.scoreCounter = 0;

    }

    startGameLoop() {
        //Start the official "game loop"
        const step = (timeStamp) => {
            const deltaTime = timeStamp - this.lastTime;
            this.lastTime = timeStamp;
         
            if (deltaTime < 22) {
               this.scoreCounter += deltaTime
            } else {
               this.scoreCounter += 22;
            }
         
            //Update score
            if (this.scoreCounter > 1000) {
               this.scoreCounter -= 1000;
               this.score++;
            }
         
            //Check to see if next wave should start
            let nextWave = true;
            Object.keys(this.map.gameObjects.enemies).forEach(key => {
                if (this.map.gameObjects.enemies[key].alive) {
                    nextWave = false;
                    console.log(key);
                } 
            });
            
            if (nextWave) {
                if (this.map.gameObjects.allies["player"].health <=4) this.map.gameObjects.allies["player"].health += 2;
                else if (this.map.gameObjects.allies["player"].health === 5) this.map.gameObjects.allies["player"].health++;
             
                this.givePointsBasedOnWave();
                this.wave++;
                this.map.gameObjects.enemies = {};
                this.map.initiateWave(this.wave, this.UI);
            }
         
            //Clear the screen
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
         
            this.UI.update(this);
         
            if (this.muted) this.mainTheme.volume = 0;
            else this.mainTheme.volume = 0.5;
            
            const player = this.map.gameObjects.allies.player; 
            
            //Checks to see if player is dead
            if (player.health === 0) {
                this.mainTheme.volume = 0;
                cancelAnimationFrame((timeStamp) => {
                    step(timeStamp);
                });
                
                this.UI.endGame(document.querySelector(".game-container"));
                alert("hey");
                return;
            }

            //update the colliders
            this.map.colliderUpdate();

            //Update the allies
            Object.values(this.map.gameObjects.allies).forEach(object => {
                object.update({
                    player: this.map.gameObjects.allies.player, //for the hearts
                    arrow: this.directionInput.direction,
                    map: this.map,
                    deltaTime: deltaTime,
                    game: this,
                })
            });
           
            //Update the enemies
            Object.values(this.map.gameObjects.enemies).forEach(object => {
                object.update({
                    player: this.map.gameObjects.allies.player,
                    direction: null,
                    map: this.map,
                    deltaTime: deltaTime,
                    game: this,
                })
            });
         
            this.map.drawLowerLayer(this.ctx, player);
            
            //Draw the enemies
            Object.values(this.map.gameObjects.enemies).forEach(object => {
                object.sprite.draw(this.ctx, player);
            });
         
            //Draw the allies
            Object.values(this.map.gameObjects.allies).forEach(object => {
                object.sprite.draw(this.ctx, player);
            });

            //this.map.drawUpperLayer(this.ctx);

            //Call this function again at earliest convience / how fast your computer can run it
            requestAnimationFrame((timeStamp) => {
              step(timeStamp);
            });
        };

        //Actually starting the loop
        step(0);
    }
 
    givePointsBasedOnWave() {
       let enemies = Object.keys(this.map.gameObjects.enemies).length;
     
       this.score += 10 + enemies;
    }

    async init() {
     
        this.map = null;
        this.score = 0;
        this.lastTime = 0;
        this.muted = false;
        this.wave = 1;
        this.UI = null;
        this.mainTheme = null;
     
        this.scoreCounter = 0;
     
        this.startScreen = new StartScreen();
        await this.startScreen.init(document.querySelector(".game-container"));

        this.map = new Map(window.Maps["TestingRoom"]);
        this.map.mountObjects();
                 
        this.grid = new Grid({
            canvas: this.canvas,
            gridSize: 16,
            gridLineWidth: 2,
            gridColor: "white",
        }); 

        //sets up map object for all gameObjects
        Object.values(this.map.gameObjects.allies).forEach(object => {
            object.mapInit(this.map);
        });
        Object.values(this.map.gameObjects.enemies).forEach(object => {
            object.mapInit(this.map);
        });

        //Setting up direction input for the player character
        this.directionInput = new DirectionInput();
        this.directionInput.init();
     
        //Setting up the UI
        this.UI = new UI({
           game: this,
        });
        this.UI.init(document.querySelector(".game-container"));
     
        this.map.initiateWave(this.wave, this.UI);
     
        this.mainTheme = document.createElement("audio");
        this.mainTheme.setAttribute("src", "main-song.wav");
        this.mainTheme.loop = true;
        this.mainTheme.play();

        //Start the game loop
        this.startGameLoop();
    }
}
