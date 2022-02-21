const utils = {
  asGrid(coord, measurement, gridSize) {
    return (coord * gridSize) + (gridSize / 2) - (measurement / 2);
  }
}
