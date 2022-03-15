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
            <img id="credits" src="Credits.png" />
        `);
        
        this.element.querySelector("#credits").addEventListener("click", () => {
            this.element.remove();
            this.element = document.createElement("div");
            this.element.classList.add("Credits");
            
            this.element.innerHTML = (`
                <h1>The team</h1>
                <p>Carver Snyder: Music Creator and Logistics Manager</p>
                <p>Tyler Wiggins: Game Art Creator</p>
                <p>Carter Downs: Programmer, Music Creator, and Icon Creator</p>
                <p>Have Gee: Programmer</p>
                <p>Jimmy Giannasi: Concept Designer and Recorder</p>
            `);
        });
        
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
