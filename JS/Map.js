class Map {
    constructor(config) {
        this.gameObjects = config.gameObjects;

        this.lowerImage = new Image();
        this.lowerImage.src = config.lowerSrc;

        this.upperImage = new Image();
        this.upperImage.src = config.upperSrc;
    }

    drawLowerImage(ctx, player) { 
        ctx.drawImage(this.lowerImage, 0, 0);
    }
    
    
    drawUpperImage(ctx, player) { 
        ctx.drawImage(this.upperImage, 0, 0);
    }
}

window.Maps = {
    "Level1": {
        lowerSrc: null,
        upperSrc: null,
        gameObjects: {
            player: new Person({
                isPlayerControlled: true,
                x: utils.asGrid(0),
                y: utils.asGrid(0),
            })
        }
    }
}
