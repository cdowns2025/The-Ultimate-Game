const utils = {
  //A function that takes a grid coordinate, like 5 and transfers it into a pixel value, like 85.5
  asGrid(n) {
    return n * 16;
  }, 
  getNextCoord(x, y, direction) {
    let newX = x;
    let newY = y;
    if (direction === "right") {
      newX += 16;
    } else if (direction === "left") {
      newX -= 16;
    } else if (direction === "down") {
      newY += 16;
    } else if (direction === "up") {
      newY -= 16; //HOLD UP HERE!!!!!!!!!!!!!!!!!!!!!!!!!!
    }
    
    console.log("Newx:" + newX + " NewY:" + newY);
    
    let b =5;
    let c =5;
    
    return {b, c};
  },
  asGridCoord(x, y) {
    return `${x*16},${y*16}`;
  }
}
