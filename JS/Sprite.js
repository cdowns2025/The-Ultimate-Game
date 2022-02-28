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
        const x = this.gameObject.x;
        const y = this.gameObject.y;
        
        ctx.fillStyle = "red";
        ctx.fillRect(x, y, 8, 8);
        //this.isLoaded && ctx.drawImage(this.image, x, y);
    }
}
