resize()
window.addEventListener("resize", resize)

function resize() {

    let gameContainer = document.getElementsByClassName("game")[0]
    let buttonContainer = document.getElementsByClassName("game__button-container")[0]

    if (gameContainer.clientWidth < gameContainer.clientHeight) {
        buttonContainer.style.height = gameContainer.clientWidth + "px"
        buttonContainer.style.width = gameContainer.clientWidth + "px"
    } else {
        buttonContainer.style.width = gameContainer.clientHeight + "px"
        buttonContainer.style.height = gameContainer.clientHeight + "px"
    }
}