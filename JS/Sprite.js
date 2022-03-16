class Sprite {
    constructor(config) {
        this.images = config.images;
        console.log(this.images);
        
        this.image = new Image();
        this.image.src = this.images[0];
        this.image.onload = () => {
            this.isLoaded = true;
        }
        
        this.gameObject = config.gameObject;
        
        this.imageFrame = 0;
    }
    
    updateSrc() {
        this.isLoaded = false;
        this.image.src = this.images[this.imageFrame];
        this.image.onload = () => {
            this.isLoaded = true;
        }
    }
    
    draw(ctx, player) {
        const x = this.gameObject.x + utils.asGrid(7.5) - player.x + 2;
        const y = this.gameObject.y + utils.asGrid(4.5) - player.y - 1;
        
        if (this.gameObject.isRendered == true) {
            
            this.isLoaded && ctx.drawImage(this.image, x, y);
        }
    }
}
