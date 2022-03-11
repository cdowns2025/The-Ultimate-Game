class StartScreen {
    constructor(game) {
        this.game = game;
    }
    
    createElement() {
        this.element = document.createElement("div");
        this.element.classList.add("StartScreen");
        this.element.innerHTML = (`
            <h1>HELLO</h1>
        `);
    }
    
    init(container) {
        return new Promise(resolve => {
            this.createElement();
            container.appendChild(this.element);
        });
    }
}
