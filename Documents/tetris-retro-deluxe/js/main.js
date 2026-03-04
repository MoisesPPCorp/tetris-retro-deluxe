
import { Arena } from './Arena.js';
import { Player } from './Player.js';
import { Renderer } from './Renderer.js';
import { Game } from './Game.js';

const canvas = document.getElementById('tetris');
const arena = new Arena(12, 20);
const player = new Player(arena);
const renderer = new Renderer(canvas, arena, player);
const game = new Game(arena, player, renderer);

player.reset();
game.update();

document.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft') {
        player.move(-1);
    } else if (event.key === 'ArrowRight') {
        player.move(1);
    } else if (event.key === 'ArrowDown') {
        player.drop();
    } else if (event.key === 'ArrowUp') {
    player.rotate();
}
});