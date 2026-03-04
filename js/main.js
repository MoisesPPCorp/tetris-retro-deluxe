import { Arena } from './Arena.js';
import { Player } from './Player.js';
import { Renderer } from './Renderer.js';

const canvas = document.getElementById('tetris');
const scoreElement = document.getElementById('score');

const startBtn = document.getElementById('startBtn');
const restartBtn = document.getElementById('restartBtn');

const arena = new Arena(12, 20);
const player = new Player(arena);

const renderer = new Renderer(canvas, arena, player);

let lastTime = 0;
let dropCounter = 0;
let dropInterval = 1000;

let gameRunning = false;

// ⭐ Loop principal
function update(time = 0) {

    if (gameRunning) {

        const deltaTime = time - lastTime;
        lastTime = time;

        dropCounter += deltaTime;

        if (dropCounter > dropInterval) {
            player.drop();
            dropCounter = 0;
        }

        if (scoreElement) {
            scoreElement.textContent = player.score;
        }
    }

    renderer.draw();

    requestAnimationFrame(update);
}

// ⭐ Botão iniciar
if (startBtn) {
    startBtn.addEventListener("click", () => {
        gameRunning = true;
        player.reset();
    });
}

// ⭐ Botão reiniciar
if (restartBtn) {
    restartBtn.addEventListener("click", () => {
        gameRunning = true;
        player.reset();
    });
}

// ⭐ Controles teclado
document.addEventListener('keydown', event => {

    if (!gameRunning) return;

    if (event.key === 'ArrowLeft') player.move(-1);
    if (event.key === 'ArrowRight') player.move(1);
    if (event.key === 'ArrowDown') player.drop();
    if (event.key === 'ArrowUp') player.rotate(1);
    if (event.key === 'z') player.rotate(-1);

    // Hard drop
    if (event.key === ' ') {
        while (!player.collide()) player.pos.y++;
        player.pos.y--;
        player.drop();
    }

});

update();