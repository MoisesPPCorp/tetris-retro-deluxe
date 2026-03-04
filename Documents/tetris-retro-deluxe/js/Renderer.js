
export class Renderer {
    constructor(canvas, arena, player) {
        this.canvas = canvas;
        this.context = canvas.getContext('2d');
        this.context.scale(20, 20);
        this.arena = arena;
        this.player = player;
    }

    drawMatrix(matrix, offset) {

        const colors = [
            null,
            '#00FFFF', // I - Ciano
            '#FFFF00', // O - Amarelo
            '#AA00FF', // T - Roxo
            '#FFA500', // L - Laranja
            '#0000FF', // J - Azul
            '#00FF00', // S - Verde
            '#FF0000'  // Z - Vermelho
        ];

        matrix.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value !== 0) {

                    this.context.fillStyle = colors[value];
                    this.context.fillRect(
                        x + offset.x,
                        y + offset.y,
                        1,
                        1
                    );

                    this.context.strokeStyle = "#000";
                    this.context.strokeRect(
                        x + offset.x,
                        y + offset.y,
                        1,
                        1
                    );
                }
            });
        });
    }

    draw() {

        // Limpa o canvas REAL em pixels
        this.context.clearRect(
            0,
            0,
            this.canvas.width,
            this.canvas.height
        );

        // Fundo do jogo
        this.context.fillStyle = "#1a1a1a";
        this.context.fillRect(0, 0, 12, 20);

        this.drawMatrix(this.arena.matrix, { x: 0, y: 0 });
        this.drawMatrix(this.player.matrix, this.player.pos);
    }
}