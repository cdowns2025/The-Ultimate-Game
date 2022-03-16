window.Maps = {
    "TestingRoom": {
        lowerSrc: "grid2.png",
        upperSrc: null,
        gameObjects: {
            allies: {
                player: new Person({
                    isPlayerControlled: true,
                    x: utils.asGrid(0),
                    y: utils.asGrid(0),
                    color: "blue",
                    images: ["standF.PNG", "standB.PNG", "standL.PNG", "standR.PNG", "attackF.PNG", "attackB.PNG", "attackL.PNG", "attackR.PNG", "damageF.PNG", "damageB.PNG", "damageL.PNG", "damageR.PNG"],
                }),
            }, 
            enemies: {
                /*enemy1: new Enemy({
                    x: utils.asGrid(5),
                    y: utils.asGrid(5),
                    color: "purple",
                    images: ["squidF.PNG", "squidB.PNG", "squidL.PNG", "squidR.PNG"],
                }),
                enemy2: new Enemy({
                    x: utils.asGrid(10),
                    y: utils.asGrid(5),
                    color: "purple",
                }),
                enemy3: new Enemy({
                    x: utils.asGrid(5),
                    y: utils.asGrid(10),
                    color: "purple",
                }),
                enemy4: new Enemy({
                    x: utils.asGrid(10),
                    y: utils.asGrid(10),
                    color: "purple",
                }),*/
            }
        },
        gridWalls: [
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,9,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        ],
        waves: {
            "1": {
                basic: 2,
                hearts: 3,
                spawners: {
                    "1": {
                        basic: 2,
                        intervalTime: 5000,
                    },
                },
            },
            "2": {
                spawners:  {
                    "1": {
                        basic: 2,
                        intervalTime: 5000,
                    },
                    "2": {
                        basic: 4,
                        intervalTime: 2500,
                    }
                },
                hearts: 4,
            },
            "3": {
                spawners: {
                    "1": {
                        basic: 1,
                        intervalTime: 1000,
                    },
                    "2": {
                        basic: 5,
                        intervalTime: 5000,
                    }
                },
                hearts: 4,
            },
            "4": {
                spawners: {
                    "1": {
                        basic: 2,
                        intervalTime: 10000,
                    },
                    "2": {
                        basic: 10,
                        intervalTime: 500,
                    },
                    "3": {
                        basic: 5,
                        intervalTime: 5000,
                    }
                },
                hearts: 5,
            }
        }
    }
}
