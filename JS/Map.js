class Map {
    constructor(config) {
        this.gameObjects = config.gameObjects;
        
        this.walls = {};
        this.parseMapData(config.gridWalls);

        this.lowerImage = new Image();
        this.lowerImage.src = config.lowerSrc;

        this.upperImage = new Image();
        this.upperImage.src = config.upperSrc;
    }
    
    parseMapData(mapArray) {
        for (let r = -1; r < mapArray.length - 1; r++) {
            for (let c = -1; c < mapArray[r].length - 1; c++) {
                if (mapArray[r][c] === 1) {
                    this.addWall(c,r);
                }
            }
        }
    }
    
    isNextSpaceTaken(initialX, initialY, direction) {
        let x = initialX;
        let y = initialY;
        if (direction === "right") {
            x += 16;
        } else if (direction === "left") {
            x -= 16;
        } else if (direction === "down") {
            y += 16;
        } else if (direction === "up") {
            y -= 16;
        }
        return this.walls[`${x},${y}`] || false;
    }
    
    addWall(x, y) {
        this.walls[`${x * 16},${y * 16}`] = true;
    }
    
    
    removeWall(x, y) {
        this.walls[`${x * 16},${y * 16}`] = false;
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
