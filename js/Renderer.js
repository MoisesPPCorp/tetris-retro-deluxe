export class Renderer {

    constructor(canvas, arena, player) {

        this.canvas = canvas;
        this.context = canvas.getContext('2d');

        this.arena = arena;
        this.player = player;

        this.blockSize = 20;

        this.canvas.width = this.arena.matrix[0].length * this.blockSize;
        this.canvas.height = this.arena.matrix.length * this.blockSize;

        // Preview
        this.preview = document.getElementById("preview");

        if (this.preview) {
            this.previewCtx = this.preview.getContext("2d");
        }
    }

    drawMatrix(matrix, offset) {

        if (!matrix) return;

        const colors = [
            null,
            '#00FFFF',
            '#FFFF00',
            '#AA00FF',
            '#FFA500',
            '#0000FF',
            '#00FF00',
            '#FF0000'
        ];

        for (let y = 0; y < matrix.length; y++) {
            for (let x = 0; x < matrix[y].length; x++) {

                if (matrix[y][x] !== 0) {

                    this.context.fillStyle = colors[matrix[y][x]];

                    this.context.fillRect(
                        (x + offset.x) * this.blockSize,
                        (y + offset.y) * this.blockSize,
                        this.blockSize,
                        this.blockSize
                    );

                    this.context.strokeStyle = "#000";
                    this.context.strokeRect(
                        (x + offset.x) * this.blockSize,
                        (y + offset.y) * this.blockSize,
                        this.blockSize,
                        this.blockSize
                    );
                }
            }
        }
    }

    drawPreview() {

    if (!this.previewCtx || !this.player.nextMatrix) return;

    const matrix = this.player.nextMatrix;

    this.previewCtx.fillStyle = "#111";
    this.previewCtx.fillRect(0,0,120,120);

    const size = 20;

    // Centralização perfeita
    const offsetX = (120 - matrix[0].length * size) / 2;
    const offsetY = (120 - matrix.length * size) / 2;

    matrix.forEach((row,y)=>{
        row.forEach((value,x)=>{

            if(value !== 0){

                this.previewCtx.fillStyle = "#00FFFF";

                this.previewCtx.fillRect(
                    x * size + offsetX,
                    y * size + offsetY,
                    size,
                    size
                );

                // ⭐ Bordas dos blocos
                this.previewCtx.strokeStyle = "#000";
                this.previewCtx.strokeRect(
                    x * size + offsetX,
                    y * size + offsetY,
                    size,
                    size
                );
            }

        });
    });
}

    draw() {

        // Fundo
        this.context.fillStyle = "#111";
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // ⭐ Arena + Player
        this.drawMatrix(this.arena.matrix, { x: 0, y: 0 });
        this.drawMatrix(this.player.matrix, this.player.pos);

        // ⭐ Preview
        this.drawPreview();

        // ⭐ Bordas da arena (extremidades visuais)
        this.context.strokeStyle = "#555";
        this.context.strokeRect(
            0,
            0,
            this.canvas.width,
            this.canvas.height
        );
    }
}