const utils = {
  //A function that takes a grid coordinate, like 5 and transfers it into a pixel value, like 85.5
  asGrid(n) {
    return n * 16;
  }, 
   //A function that takes a pixel coordinate, like 85.5 and transfers it into a grid value, like 5
  asPixel(coord) {
    return Math.floor(coord / 16);
  }
}
