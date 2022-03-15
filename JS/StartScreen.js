class StartScreen {
    constructor(game) {
        this.game = game;
    }
    
    createElements(resolve, container) {
        
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
                <h1>The Team:</h1>
                <p>Carver Snyder: Music Creator and Logistics Manager</p>
                <p>Tyler Wiggins: Game Art Creator</p>
                <p>Carter Downs: Programmer, Music Creator, and Icon Creator</p>
                <p>Haven Gee: Programmer</p>
                <p>Jimmy Giannasi: Concept Designer, Logo Creator, and Recorder</p>
                <p>©PIPE</p>
                <img id="return" src="Return.png" />
            `);
            
            this.element.querySelector("#return").addEventListener("click", () => {
                this.element.remove();
                this.createElements(resolve, container);
                container.appendChild(this.element);
            });
            
            container.appendChild(this.element);
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
            this.createElements(resolve, container);
            container.appendChild(this.element);
        });
    }
}
