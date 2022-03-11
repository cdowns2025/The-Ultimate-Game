class StartScreen {
    constructor(game) {
        this.game = game;
    }
    
    createElement() {
        this.element = document.createElement("div");
        this.element.classList.add("StartScreen");
    }
    
    init(container) {
        this.createElement();
        container.appendChild(this.element);
    }
}
