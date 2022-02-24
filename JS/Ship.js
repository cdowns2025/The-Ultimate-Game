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
    this.levelLoaded = false;
    this.image = new Image();
    this.image.src = "Ship1_RoughDraft.png";
    this.image.onload = () => {
      this.levelLoaded = true;
    };
  }
  
  draw(ctx) {
    if (this.levelLoaded) {
      ctx.drawImage(this.image, 48, 40); 
    }
  }
  
  init() {
    
  }
} 
