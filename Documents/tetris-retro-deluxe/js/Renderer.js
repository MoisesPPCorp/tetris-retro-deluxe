
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
            '#FF0D72',
            '#0DC2FF',
            '#0DFF72',
            '#F538FF'
        ];

        matrix.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value !== 0) {
                    this.context.fillStyle = colors[value];
                    this.context.fillRect(x + offset.x,
                        y + offset.y,
                        1, 1);

                    this.context.strokeStyle = '#000';
                    this.context.strokeRect(x + offset.x,
                        y + offset.y,
                        1, 1);
                }
            });
        });

    }

    draw() {
        this.context.fillStyle = '#000';
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.drawMatrix(this.arena.matrix, { x: 0, y: 0 });
        this.drawMatrix(this.player.matrix, this.player.pos);
    }
}