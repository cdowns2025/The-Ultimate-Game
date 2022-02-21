class Game {
  constructor(config) {
    this.canvas = config.element.querySelector(".game-canvas");
    this.ctx = this.canvas.getContext("2d");
    this.omniObject = { //this object will store all the variables that will be transferred to separate script classes and their update functions.
      playerDirection: "right",
      playerMoving: "false",
      gameState: "start",
      currentLevel: 1,
    }
  }
  
  startGameLoop() {
    const step = () => {
      //Clear the screen
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      //direction input checking
      /*this.playerDI.init();
      if (this.playerDI.heldDirections.length > 0) {
        this.omniObject.playerDirection = this.playerDI.direction();
        this.omniObject.playerMoving = "true";
      } else if (this.playerDI.heldDirections.length <= 0) {
        this.omniObject.playerMoving = "false";
      }*/

      //update the player
      this.player.update(this.omniObject);//updates the player's position and everything about him that  -  put the omniobect here later
      this.player.draw(this.ctx);  

     
      requestAnimationFrame(() => {//calls the step function each frame
        step();
      });
    };
    step();//calls the step function the first time
  }
  
  init() {//creates the player in the Player class
    this.player = new Player({
      x: 10,
      y: 10,
      width: 5,
      height: 5,
    });
    
    //creating input objects
    this.input = new Input();
    this.playerDI = new DirectionInput(); //this stores and checks player direction inputs
    
    this.startGameLoop();
  }
}
