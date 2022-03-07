class GameObject {
    constructor(config) {
        this.x = config.x || 0;
        this.y = config.y || 0;
        this.direction = config.direction || "down";

        this.map;
        
        this.color = config.color || null;
        
        this.sprite = new Sprite({
            gameObject: this,
            src: config.src,
        });
        this.isRendered = true;
    }

    mapInit(map) {
        this.map = map;
    }
    
    update() {
        
    }
}
