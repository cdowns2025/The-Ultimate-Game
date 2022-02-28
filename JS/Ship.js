/*
Class name: Ship

Description: An object for the primary environment and its management throughout the game.

Arguments: image, level number

Functions:
draw() {
  draws the ship
}
*/
class Ship {
  constructor(config) {
    
    this.canvas = config.canvas;
    
    this.levelLoaded = false;
    this.image = new Image();
    this.image.src = "Ship1_RoughDraft.png";
    this.image.onload = () => {
      this.levelLoaded = true;
    };
    
    //draws the ship in a centered and relative position to the players position and size.
    this.x = 0;
    this.y = 0;
    this.level1 = [ //level 1 array to store cell values
      [1,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0],
      [0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0],
      [0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0],
      [0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0],
      [0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0],
      [0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0],
      [0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0],
      [0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0],
      [0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0],
      [0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0],
      [0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0],
    ];
  }
  
  draw(ctx) {
    if (this.levelLoaded) {
      //updates ship drawing position based on player coordinates
      

      ctx.drawImage(this.image, this.x, this.y); 

      /*ctx.fillStyle = "black";
      for (let c = 0; c < this.level1.length; c++) {
        for (let r = 0; r < this.level1[c].length; r++) {
          if (this.level1[c][r] == 1) {
            ctx.fillRect(this.x + r * this.game.gridSize + 56, this.y + c * this.game.gridSize + 32, this.game.gridSize, this.game.gridSize);
          }
        }
      }*/
    }
  }
  
  update(player) {
    this.x = (this.canvas.width / 2) - player.x - player.width / 2 - 1;// - 56 - this.game.player.width / 2 - 1;
    this.y = (this.canvas.height / 2) - player.y - player.height / 2 - 1;// - 32 - this.game.player.height / 2 - 1;
  }
  
  init() {
    
  }
} 
