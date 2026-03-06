import { Arena } from "./Arena.js"
import { Player } from "./Player.js"
import { Renderer } from "./Renderer.js"
import { saveScore, loadRanking } from "./ranking.js"

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

        player.drop()

        dropCounter = 0

    }

    renderer.draw()

    document.getElementById("score").textContent = player.score

    requestAnimationFrame(update)

}

function startGame() {

    arena.matrix = arena.createMatrix(12, 20)

    player.score = 0

    player.reset()

    running = true

    update()

}

function restartGame() {

    const name = document.getElementById("playerName").value || "Player"

    saveScore(name, player.score)

    loadRanking()

    startGame()

}

document.getElementById("startBtn").onclick = startGame
document.getElementById("restartBtn").onclick = restartGame

document.addEventListener("keydown", e => {

    if (!running) return

    if (e.key === "ArrowLeft") player.move(-1)
    if (e.key === "ArrowRight") player.move(1)
    if (e.key === "ArrowDown") player.drop()
    if (e.key === "ArrowUp") player.rotate()

})

loadRanking()