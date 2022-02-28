class Sprite {
    constructor(config) {
        this.image = new Image();
        this.image.src = config.src;
        this.image.onload = () => {
            this.isLoaded = true;
        }
        
        this.gameObject = config.gameObject;
        this.color = this.gameObject.color;
    }
    
    draw(ctx, player) {
        const x = this.gameObject.x + 4;
        const y = this.gameObject.y + 4;
        
        ctx.fillStyle = this.color;
        ctx.fillRect(x, y, 8, 8);
        //this.isLoaded && ctx.drawImage(this.image, x, y);
    }
}
