const utils = {
  asGrid(coord, measurement, gridSize) {
    console.log(coord)
    return (coord * gridSize) + (gridSize / 2) - (measurement / 2);
  }
}
