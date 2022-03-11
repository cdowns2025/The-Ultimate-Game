class StartScreen {
    constructor(game) {
        this.game = game;
    }
    
    createElement(resolve) {
        this.element = document.createElement("div");
        this.element.classList.add("StartScreen");
        this.element.innerHTML = (`
            <button>Start</button>
        `);
        
        this.element.querySelectorAll("button").forEach(button => {
            button.addEventListener("click", () => {
                resolve();
            });
        });
    }
    
    init(container) {
        return new Promise(resolve => {
            this.createElement(resolve);
            container.appendChild(this.element);
        });
    }
}
