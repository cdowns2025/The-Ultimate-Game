class ScrapPile extends GameObject {
    constructor(config) {
        super(config);

        this.alive = true;
        this.collision = true;
        this.color = "#cc6600";
        this.gathered = false;
    }

    update(state) {
        if (this.alive) {
            state.map.addWall(this.x, this.y);
        }
        if (this.gathered) {
            state.map.resetWall(this.x, this.y);
            this.gathered = false;
        }
    }

    onInteracted(hitInfo) {
        if (this.alive) {
            this.alive = false;
            this.isRendered = false;
            this.collision = false;
            //alert("interacted");
            this.gathered = true;
            hitInfo.source.scrapPileInventory++;
        }
    }
}