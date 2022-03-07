class Sprite {
    constructor(config) {
        this.image = new Image();
        this.image.src = config.src;
        this.image.onload = () => {
            this.isLoaded = true;
        }
        
        this.gameObject = config.gameObject;
    }
    
    draw(ctx, player) {
        const x = this.gameObject.x + utils.asGrid(7.5) - player.x + 6;
        const y = this.gameObject.y + utils.asGrid(4.5) - player.y + 6;
        
        if (this.gameObject.isRendered == true) {
            ctx.fillStyle = this.gameObject.color;
            ctx.fillRect(x, y, 5, 5);
        }
        //this.isLoaded && ctx.drawImage(this.image, x, y);
    }
}
