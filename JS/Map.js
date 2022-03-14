class Map {
    constructor(config) {
        this.gameObjects = config.gameObjects;
        this.waves = config.waves;
        
        this.walls = {};
        this.parseMapData(config.gridWalls);

        this.lowerImage = new Image();
        this.lowerImage.src = config.lowerSrc;

        this.upperImage = new Image();
        this.upperImage.src = config.upperSrc;
    }
    
    initiateWave(waveNumber, ui) {
        for (let i = 0; i < this.waves[waveNumber].basic; i++) {
            this.gameObjects.enemies["enemy" + i] = new Enemy({
                x: utils.asGrid(Math.floor(Math.random() * 20)),
                y: utils.asGrid(Math.floor(Math.random() * 15)),
                color: "purple",
            });
        }

        for (let i = 0; i < this.waves[waveNumber].spawners; i++) {
            this.gameObjects.enemies["spawner" + i] = new Spawner({
                x: utils.asGrid(Math.floor(Math.random() * 20)),
                y: utils.asGrid(Math.floor(Math.random() * 15)),
                enemyCapacity: 10,
                intervalTime: 500,
                color: "brown",
            });
        }
        
        ui.newWave(waveNumber, document.querySelector(".game-container"));
    }
    
    mountObjects() {
        Object.values(this.gameObjects.allies).forEach(object => {
            if (object.collision) {
                this.addWall(object.x, object.y);
            }
        });
        
        Object.values(this.gameObjects.enemies).forEach(object => {
            if (object.collision) {
                this.addWall(object.x, object.y);
            }
        });
    }
      
    parseMapData(mapArray) {
        for (let r = 0; r < mapArray.length; r++) {
            for (let c = 0; c < mapArray[r].length; c++) {
                if (mapArray[r][c] === 1) {
                    this.addWall((c - 1) * 16, (r - 1) * 16);
                } else if (mapArray[r][c] === 9) {
                    this.gameObjects.allies["player"].x = utils.asGrid(c - 1);
                    this.gameObjects.allies["player"].y = utils.asGrid(r - 1);
                }
            }
        }
    }
    
    isNextSpaceTaken(initialX, initialY, direction, distance) {
        let x = initialX;
        let y = initialY;
        if (direction === "right") {
            x += distance;
        } else if (direction === "left") {
            x -= distance;
        } else if (direction === "down") {
            y += distance;
        } else if (direction === "up") {
            y -= distance;
        }
        if (this.walls[`${x},${y}`] !== undefined) {
            return this.walls[`${x},${y}`] || false;
        } else {
            return false;
        }
    }
    
    addWall(x, y) {
        this.walls[`${x},${y}`] = true;
    }
    
    
    removeWall(x, y) {
        this.walls[`${x},${y}`] = false;
    }
    
    moveWall(currentX, currentY, direction) {
        this.removeWall(currentX, currentY);
            
        let x = currentX;
        let y = currentY;
        if (direction === "right") {
            x += 16;
        } else if (direction === "left") {
            x -= 16;
        } else if (direction === "down") {
            y += 16;
        } else if (direction === "up") {
            y -= 15;
        }
        
        this.addWall(x, y);
    }

    drawLowerLayer(ctx, player) { 
        ctx.drawImage(this.lowerImage, utils.asGrid(7.5) - player.x, utils.asGrid(4.5) - player.y);
    }
    
    
    drawUpperLayer(ctx, player) { 
        ctx.drawImage(this.upperImage, 0, 0);
    }
}
