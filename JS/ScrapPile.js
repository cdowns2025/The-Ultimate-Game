class ScrapPile extends GameObject {
    constructor(config) {
        super(config);

        this.alive = false;//change this to true if we want to have the scrapPile in the game.
        this.collision = true; 
        this.color = "#cc6600";
        this.gathered = false;
    }

    update(state) {
        if (this.alive) {
            state.map.addWall(this.x, this.y);
        }
        if (this.gathered) {
            state.map.removeWall(this.x, this.y);
            this.gathered = false;
        }
    }

    onInteracted(hitInfo) {
        if (this.alive) {
            this.alive = false;
            this.isRendered = false;
            this.collision = false;
            this.gathered = true;
            hitInfo.source.scrapPileInventory++;
        }
    }
}