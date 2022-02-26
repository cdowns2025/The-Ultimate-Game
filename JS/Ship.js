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
    this.game = config.game;

    this.levelLoaded = false;
    this.image = new Image();
    this.image.src = "Ship1_RoughDraft.png";
    this.image.onload = () => {
      this.levelLoaded = true;
    };
    //draws the ship in a centered and relative position to the players position and size.
    this.x = 0;
    this.y = 0;
  }
  
  draw(ctx) {
    if (this.levelLoaded) {
      //updates ship drawing position based on player coordinates
      this.x = (this.game.canvas.width / 2) - this.game.player.x - 48 - this.game.player.width / 2 - 1;
      this.y = (this.game.canvas.height / 2) - this.game.player.y - 40 - this.game.player.height / 2 - 1;

      ctx.drawImage(this.image, this.x, this.y); 
    }
  }
  
  init() {
    
  }
} 
