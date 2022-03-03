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
    
    mountObjects() {
        Object.values(this.gameObjects.allies).forEach(object => {
            this.addWall(object.x, object.y, true);
        });
        
        Object.values(this.gameObjects.enemies).forEach(object => {
            this.addWall(object.x, object.y, true);
        });
    }
      
    parseMapData(mapArray) {
        for (let r = 0; r < mapArray.length; r++) {
            for (let c = 0; c < mapArray[r].length; c++) {
                if (mapArray[r][c] === 1) {
                    this.addWall((c - 1) * 16, (r - 1) * 16);
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
    
    addWall(x, y, pixel=false) {
        this.walls[`${x},${y}`] = true;
    }
    
    
    removeWall(x, y, pixel=false) {
        this.walls[`${x},${y}`] = false;
    }
    
    moveWall(currentX, currentY, direction) {
        this.removeWall(currentX, currentY, pixel);
        const {x, y} = utils.getNextCoord(currentX, currentY, direction)
        this.addWall(x, y);
    }

    drawLowerLayer(ctx, player) { 
        ctx.drawImage(this.lowerImage, utils.asGrid(7.5) - player.x, utils.asGrid(4.5) - player.y);
    }
    
    
    drawUpperLayer(ctx, player) { 
        ctx.drawImage(this.upperImage, 0, 0);
    }
}
