class Game {

    static get DELAY() { return 500 }
    static get MAX_LEVEL() { return 10 }

    constructor(button1, button2, button3, button4, level, levelIndicator) {

        this.start = this.start.bind(this)
        this.addEvents = this.addEvents.bind(this)
        this.chooseColor = this.chooseColor.bind(this)
        this.removeEvents = this.removeEvents.bind(this)

        this.sequence = this.generateSequence()
        this.buttons = [button1, button2, button3, button4]
        this.levelIndicator = levelIndicator
        this.setLevel(level)
    }

    start() {
        this.showSequence()
        this.addEvents()
    }

    setLevel(level) {
        this.sublevel = 0
        this.level = level
        this.levelIndicator.innerHTML = level
    }

    generateSequence() {
        let sequence = new Array(Game.MAX_LEVEL).fill(0).map(n => Math.floor(Math.random() * 4))
        return sequence
    }

    iluminateButton(button) {
        button.classList.add("light")
        setTimeout(() => button.classList.remove("light"), Game.DELAY)
    }

    showSequence() {
        for (let i = 0; i < this.level; i++) {
            const button = this.buttons[this.sequence[i]]

            setTimeout(() => this.iluminateButton(button), Game.DELAY * i * 2)
            setTimeout(this.addEvents, Game.DELAY * (this.level - 1) * 2)
        }
    }
    
    addEvents() {
        this.buttons[0].addEventListener("click", this.chooseColor)
        this.buttons[1].addEventListener("click", this.chooseColor)
        this.buttons[2].addEventListener("click", this.chooseColor)
        this.buttons[3].addEventListener("click", this.chooseColor)
    }
    
    removeEvents() {
        this.buttons[0].removeEventListener("click", this.chooseColor)
        this.buttons[1].removeEventListener("click", this.chooseColor)
        this.buttons[2].removeEventListener("click", this.chooseColor)
        this.buttons[3].removeEventListener("click", this.chooseColor)
    }
    
    lose() {
        swal('Simon Says!','You lose', 'error').then(() => {
            this.removeEvents()
            this.setLevel(1)
            setTimeout(this.start, Game.DELAY * 2)
        })
    }

    win() {
        swal('Simon Says!', "You win", 'success').then(this.removeEvents)
    }

    chooseColor(event) {
        const button = event.target
        const buttonIndex = this.buttons.indexOf(button)

        this.iluminateButton(button)

        if (buttonIndex === this.sequence[this.sublevel]) {
            this.sublevel++
            
            if (this.sublevel === this.level) {
                
                if (this.level === Game.MAX_LEVEL) this.win()
                else {
                    this.removeEvents()
                    this.setLevel(this.level + 1)
                    setTimeout(this.start, Game.DELAY * 2)
                }
            }

        } else {
            this.lose()
        }
    }
}


function startGame() {

    let button1 = document.querySelector(".game__button.color1")
    let button2 = document.querySelector(".game__button.color2")
    let button3 = document.querySelector(".game__button.color3")
    let button4 = document.querySelector(".game__button.color4")
    let levelIndicator = document.querySelector(".footer__level")

    let menu = document.querySelector(".menu")

    menu.classList.add("invisible")
    window.game = new Game(button1, button2, button3, button4, 1, levelIndicator)
    window.game.start()
}
