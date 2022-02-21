const utils = {
  //A function that takes a grid coordinate, like 5 and transfers it into a pixel value, like 85.5
  asGrid(coord, measurement, gridSize) {
    return (coord * gridSize) + (gridSize / 2) - (measurement / 2);
  }
}
