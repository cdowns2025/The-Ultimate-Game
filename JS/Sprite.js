class Sprite {
    constructor(config) {
        this.imageSources = config.images;
        
        this.images = [];
        for (let i = 0; i < this.imageSources.length; i++) {
            this.images[i] = new Image();
            this.images[i].src = this.imageSources[i];
            setTimeout(() => {}, 10);
        }
        
        this.gameObject = config.gameObject;
        
        this.imageFrame = 0;
    }
    
    updateSrc() {
       /* this.isLoaded = false;
        this.image.src = this.images[this.imageFrame];
        this.image.onload = () => {
            this.isLoaded = true;
        }*/
    }
    
    draw(ctx, player) {
        let x = this.gameObject.x + utils.asGrid(7.5) - player.x;
        let y = this.gameObject.y + utils.asGrid(4.5) - player.y;
        
        if (this.images[this.imageFrame] === "floor_hole.png") {
            y += 1;
        } else if (this.images[this.imageFrame] === "health.png") {
            y += 4;
            x += 4;
        } else {
            x += 2;
            y -= 1;
        }
        
        if (this.gameObject.isRendered == true) {
            
            ctx.drawImage(this.images[this.imageFrame], x, y);
        }
    }
}
