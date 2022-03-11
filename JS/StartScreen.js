class StartScreen {
    constructor(game) {
        this.game = game;
    }
    
    createElement() {
        this.element = document.createElement("div");
        this.element.classList.add("StartScreen");
    }
    
    init(container) {
        return new Promise(resolve => {
            this.createElement();
            container.appendChild(this.element);
        });
    }
}
