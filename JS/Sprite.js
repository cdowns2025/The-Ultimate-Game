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
        const x = this.gameObject.x + 2.5;
        const y = this.gameObject.y + 2.5;
        
        ctx.fillStyle = this.color;
        ctx.fillRect(x, y, 5, 5);
        //this.isLoaded && ctx.drawImage(this.image, x, y);
    }
}
