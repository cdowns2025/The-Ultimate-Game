class StartScreen {
    constructor(game) {
        this.game = game;
    }
    
    createElement(resolve) {
        this.element = document.createElement("div");
        this.element.classList.add("StartScreen");
        this.element.innerHTML = (`
            <img src="logo.png" />
            <button>Start</button>
        `);
        
        this.element.querySelectorAll("button").forEach(button => {
            button.addEventListener("click", () => {
                this.element.remove();
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
