window.Maps = {
    "Level1": {
        lowerSrc: "grid2.png",
        upperSrc: null,
        gameObjects: {
            allies: {
                player: new Person({
                    isPlayerControlled: true,
                    x: utils.asGrid(0),
                    y: utils.asGrid(0),
                    color: "blue",
                }),
            }, 
            enemies: {
                enemy1: new Enemy({
                    x: utils.asGrid(5),
                    y: utils.asGrid(5),
                    color: "purple",
                })
            }
        }
    }
}
