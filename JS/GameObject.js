class GameObject {
    constructor(config) {
        this.map = config.map;
        this.x = config.x || 0;
        this.y = config.y || 0;
        this.direction = config.direction || "down";
        
        this.color = config.color || null;
        
        this.sprite = new Sprite({
            gameObject: this,
            src: config.src,
        });
    }
    
    update() {
        
    }
}
