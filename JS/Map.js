class Map {
    constructor(config) {
        this.gameObjects = config.gameObjects;
        this.walls = config.walls || null;

        this.lowerImage = new Image();
        this.lowerImage.src = config.lowerSrc;

        this.upperImage = new Image();
        this.upperImage.src = config.upperSrc;
    }
    
    isSpaceTaken(x,y) {
        return this.walls[x,y] || false;
    }
    
    addWall(x, y) {
        this.walls[`${x},${y}`] = true;
    }
    
    
    removeWall(x, y) {
        this.walls[`${x},${y}`] = false;
    }
    
    moveWall(currentX, currentY, newX, newY) {
        this.removeWall(currentX, currentY);
        this.addWall(newX, newY);
    }

    drawLowerLayer(ctx, player) { 
        ctx.drawImage(this.lowerImage, utils.asGrid(7.5) - player.x, utils.asGrid(4.5) - player.y);
    }
    
    
    drawUpperLayer(ctx, player) { 
        ctx.drawImage(this.upperImage, 0, 0);
    }
}
