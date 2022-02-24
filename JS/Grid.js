/*
  Class Name: Grid
  
  Description: A class that will help with displaying a test grid to the screen
  
  Arguments:
    Config:
      canvas,
      gridSize,
      gridLineWidth,
      gridColor
      
  Functions:
    Draw():
      Description: A funcion that will draw the grid to the screen
      Arguments:
        ctx
    Update():
      Description: N/A
      Arguments: N/A
*/

class Grid {
  constructor(config) {
    //Bringing in predefined variables
    this.canvas = config.canvas;
    this.gridSize = config.gridSize
    this.gridLineWidth = config.gridLineWidth;
    this.gridColor = config.gridColor;
    
    //Position
    this.x = 0;
    this.y = 0;
  }
  
  draw(ctx) {
    
    //Draw the columns
    for (let c = 0; c < Math.floor(this.canvas.width / this.gridSize) + 1; c++) {
      ctx.fillStyle = this.gridColor;
      ctx.fillRect((c * this.gridSize) - (this.gridLineWidth / 2) + this.x, this.y, this.gridLineWidth, this.canvas.height);
    } 
    
    //Draw the rows
    for (let r = 0; r < Math.floor(this.canvas.height / this.gridSize) + 1; r++) {
      ctx.fillStyle = this.gridColor;
      ctx.fillRect(this.x, (r * this.gridSize) - (this.gridLineWidth / 2) + this.y, this.canvas.width, this.gridLineWidth);
    } 
  }
  
  update() {
    
  }
}
