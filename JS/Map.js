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
        Object.values(this.gameObjects).forEach(object => {
            console.log("Mounting", object);
            this.addWall(object.x / 16, object.y / 16);
        });
    }
      
    parseMapData(mapArray) {
        for (let r = 0; r < mapArray.length; r++) {
            for (let c = 0; c < mapArray[r].length; c++) {
                if (mapArray[r][c] === 1) {
                    this.addWall(c - 1,r - 1);
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
