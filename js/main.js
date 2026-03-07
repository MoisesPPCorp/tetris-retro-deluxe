import { Arena } from "./Arena.js"
import { Player } from "./Player.js"
import { Renderer } from "./Renderer.js"
import { saveScore, loadRanking, isHighScore } from "./ranking.js"

const arena = new Arena(12, 20)
const player = new Player(arena)

const canvas = document.getElementById("tetris")
const renderer = new Renderer(canvas, arena, player)

let lastTime = 0
let dropCounter = 0
let running = false

function update(time = 0) {

    if (!running) return

    const delta = time - lastTime
    lastTime = time

    dropCounter += delta

    if (dropCounter > 1000) {

        const gameOver = player.drop()

        dropCounter = 0

        if (gameOver) {
            showGameOver()
            return
        }

    }

    renderer.draw()

    document.getElementById("score").textContent = player.score
    document.getElementById("level").textContent = player.level

    requestAnimationFrame(update)

}

function startGame() {

    arena.matrix = arena.createMatrix(12, 20)

    player.score = 0
    player.level = 1

    player.reset()

    running = true

    lastTime = 0
    dropCounter = 0

    update()

}

function showGameOver() {

    running = false

    const screen = document.getElementById("gameOverScreen")

    if (!screen) return

    screen.classList.remove("hidden")

    document.getElementById("finalScore").textContent = player.score

    if (isHighScore(player.score)) {
        document.getElementById("newRecord").classList.remove("hidden")
    }

}

function restartGame() {

    document.getElementById("gameOverScreen").classList.add("hidden")

    startGame()

}

function savePlayerScore() {

    const name = document.getElementById("playerNameInput").value || "Player"

    saveScore(name, player.score)

    loadRanking()

    document.getElementById("newRecord").classList.add("hidden")

}

document.getElementById("startBtn")?.addEventListener("click", startGame)

document.getElementById("restartBtn")?.addEventListener("click", restartGame)

document.getElementById("restartGameBtn")?.addEventListener("click", restartGame)

document.getElementById("saveScoreBtn")?.addEventListener("click", savePlayerScore)

document.addEventListener("keydown", event => {

    if (!running) return

    if (event.key === "ArrowLeft") player.move(-1)

    if (event.key === "ArrowRight") player.move(1)

    if (event.key === "ArrowDown") player.drop()

    if (event.key === "ArrowUp") player.rotate()

})

loadRanking()