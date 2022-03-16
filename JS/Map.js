class Map {
    constructor(config) {
        this.gameObjects = config.gameObjects;
        this.waves = config.waves;
        
        this.walls = {};
        this.parseMapData(config.gridWalls);

        this.gridWalls = config.gridWalls;

        this.lowerImage = new Image();
        this.lowerImage.src = config.lowerSrc;
        this.lowerImage.onload = () => {
            this.lowerImageLoaded = true;
        }

        this.upperImage = new Image();
        this.upperImage.src = config.upperSrc;
    }
    
    initiateWave(waveNumber, ui) {

        for (let i = 0; i < this.waves["1"].hearts + waveNumber; i++) {
            this.gameObjects.allies["hearts" + i] = new HeartItem({
                x: utils.asGrid(Math.floor(Math.random() * 20)),
                y: utils.asGrid(Math.floor(Math.random() * 15)),
                color: "#ff4d4d",
                images: ["health.png"],
            });
        }

        for (let i = 0; i < this.waves["1"].basic + waveNumber; i++) {
            this.gameObjects.enemies["enemy" + i] = new Enemy({
                x: utils.asGrid(Math.floor(Math.random() * 20)),
                y: utils.asGrid(Math.floor(Math.random() * 15)),
                color: "purple",
                images: ["squidF.PNG", "squidB.PNG", "squidL.PNG", "squidR.PNG"],
            });
        }
        
        /*
            spawners: {
                "1": {
                    basic: 5
                }
            }
        */
        
        for (let i = 0; i < Object.keys(this.waves["1"].spawners).length * waveNumber; i++) {
            this.gameObjects.enemies["spawner" + i] = new Spawner({
                x: utils.asGrid(Math.floor(Math.random() * 20)),
                y: utils.asGrid(Math.floor(Math.random() * 15)),
                enemyCapacity: this.waves["1"].spawners["1"].basic * Math.ceil(waveNumber / 4) + (Math.floor(Math.random() * 10) - 5),
                intervalTime: this.waves["1"].spawners["1"].intervalTime / (waveNumber / 4) + 300,
                color: "#4d2600",
                images: ["floor_hole.png"],
            });
        }

        for (let i = 0; i < Object.keys(this.waves["1"].spawners).length * waveNumber; i++) {
            this.gameObjects.allies["scrapPile" + i] = new ScrapPile({
                x: utils.asGrid(Math.floor(Math.random() * 20)),
                y: utils.asGrid(Math.floor(Math.random() * 15)),
                color:"#cc6600",
                images: [null],                             // CARTER, ADD IMAGE FOR SCRAPPILE HERE
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

    colliderUpdate() {
        for (let r = 0; r < this.gridWalls.length; r++) {
            for (let c = 0; c < this.gridWalls[r].length; c++) {
                Object.values(this.gameObjects.allies).forEach(object => {
                    if (object.collision && object.x == (c - 1) * 16 && object.y == (r - 1) * 16) {
                        this.addWall(object.x, object.y);
                    } else {
                        if (this.gridWalls[r][c] === 1) {
                            this.addWall((c - 1) * 16, (r - 1) * 16);
                        } else if (this.gridWalls[r][c] !== 1) {
                            this.removeWall((c - 1) * 16, (r - 1) * 16)
                        }
                    }
                });
                
                Object.values(this.gameObjects.enemies).forEach(object => {
                    if (object.collision && object.x / 16 == Math.floor(object.x / 16) && object.y / 16 == Math.floor(object.y / 16)) {
                        this.addWall(object.x, object.y);
                    } else {
                        if (this.gridWalls[r][c] === 1) {
                            this.addWall((c - 1) * 16, (r - 1) * 16);
                        } else if (this.gridWalls[r][c] !== 1) {
                            this.removeWall((c - 1) * 16, (r - 1) * 16)
                        }
                    }
                });
            }
        }
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

    /*resetWall(x, y) {
        if (this.gridWalls[y / 16][x / 16] == 1) {
            this.walls[`${x},${y}`] = true;
        } else if (this.gridWalls[y / 16][x / 16] !== 1) {
            this.walls[`${x},${y}`] = false;
        }
    }*/
    
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
        this.lowerImageLoaded && ctx.drawImage(this.lowerImage, utils.asGrid(7.5) - player.x, utils.asGrid(4.5) - player.y);
    }
    
    
    drawUpperLayer(ctx, player) { 
        ctx.drawImage(this.upperImage, 0, 0);
    }
}
