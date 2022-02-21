const utils = {
  asGrid(coord, measurement, gridSize) {
    console.log((coord * gridSize) + (gridSize / 2) - (measurement / 2))
    return (coord * gridSize) + (gridSize / 2) - (measurement / 2);
  }
}
