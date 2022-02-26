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
  }
  
  draw(ctx) {
    if (this.levelLoaded) {
      ctx.drawImage(this.image, (this.game.canvas.width / 2) - this.game.player.x - 48 - this.game.player.width / 2 - 1, (this.game.canvas.height / 2) - this.game.player.y - 40 - this.game.player.height / 2 - 1); 
    }
  }
  
  init() {
    
  }
} 
