class Sprite {
    constructor(config) {
        this.imageSources = config.images;
        
        this.images = [];
        for (let i = 0; i < this.imageSources.length; i++) {
            this.images[i] = {
                image: new Image(),
                isLoaded: false,
            }   
            this.images[i].image.src = this.imageSources[i];
            this.images[i].image.onload = () => {
                this.images[i].isLoaded = true;
            };
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
        
        if (this.imageSources[this.imageFrame] === "floor_hole.png") {
            x += 1;
            y += 1;
        } else if (this.imageSources[this.imageFrame] === "health.png") {
            y += 4;
            x += 4;
        } else {
            x += 2;
            y -= 1;
        }
        
        if (this.gameObject.isRendered == true) {
            
            this.images[this.imageFrame].isLoaded && ctx.drawImage(this.images[this.imageFrame].image, x, y);
        }
    }
}
