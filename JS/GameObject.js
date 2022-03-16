class GameObject {
    constructor(config) {
        this.x = config.x || 0;
        this.y = config.y || 0;
        this.collision = config.collision || true;
        this.direction = config.direction || "down";

        this.map;
        
        this.color = config.color || null;
        
        this.sprite = new Sprite({
            gameObject: this,
            images: config.images,
        });
        this.isRendered = true;
    }

    mapInit(map) {
        this.map = map;
    }
    
    update() {
        
    }
}
