let startButton = document.querySelector(".menu__button")
startButton.addEventListener("click", startGame)


class Game {

    static DELAY = 500

    constructor(button1, button2, button3, button4, level, levelIndicator) {
        this.buttons = [button1, button2, button3, button4]
        this.level = level
        this.levelIndicator = levelIndicator
    }

    start() {
        this.sequence = this.generateSequence()
        this.levelIndicator.innerHTML = this.level
        setTimeout(() => this.showSequence(), Game.DELAY)
    }

    generateSequence() {
        let pattern = []
        for (let i = 0; i < 10; i++) pattern.push(Math.floor(Math.random() * 4))
        return pattern
    }

    showSequence() {
        for (let i = 0; i < this.level; i++) {
            const button = this.buttons[this.sequence[i]]

            setTimeout(() => {
                button.classList.add("light")
                setTimeout(() => button.classList.remove("light"), Game.DELAY)
            }, Game.DELAY * i * 2)
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
    window.game = new Game(button1, button2, button3, button4, 10, levelIndicator)
    window.game.start()
}