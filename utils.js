const utils = {
  asGrid(coord, measurement, gridSize) {
    return coord + (gridSize / 2) - (measurement / 2);
  }
}
