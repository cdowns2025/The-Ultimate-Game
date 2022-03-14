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
            <h1>Ship Defenders</h1>
        `);
        
        this.element.querySelectorAll("button").forEach(button => {
            button.addEventListener("click", () => {
                this.element.remove();
                
                const instructions = new Instructions();
                instructions.init(document.querySelector(".game-container"), resolve);
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
