class StartScreen {
    constructor(game) {
        this.game = game;
    }
    
    createElement(resolve) {
        this.musicElement = document.createElement("audio");
        this.musicElement.setAttribute("src", "Title-Theme.wav");
        this.musicElement.loop = true;
        setTimeout(() => {
            this.musicElement.play();
        }, 500);
        
        this.element = document.createElement("div");
        this.element.classList.add("StartScreen");
        this.element.innerHTML = (`
            <img src="logo.png" />
            <button>Start</button>
            <h1>Ship Defenders</h1>
        `);
        
        this.element.querySelectorAll("button").forEach(button => {
            button.addEventListener("click", () => {
                this.musicElement.remove();
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
