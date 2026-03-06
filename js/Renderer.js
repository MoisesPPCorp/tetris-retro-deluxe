export class Renderer {

    constructor(canvas, arena, player) {

        this.canvas = canvas
        this.context = canvas.getContext("2d")

        this.context.scale(20, 20)

        this.arena = arena
        this.player = player

        this.colors = [
            null,
            "#FF595E",
            "#1982C4",
            "#8AC926",
            "#FFCA3A",
            "#6A4C93",
            "#FF924C",
            "#00C2A8"
        ]

        this.previewCanvas = document.getElementById("preview")
        this.previewContext = this.previewCanvas.getContext("2d")

        this.previewContext.scale(20, 20)

    }

    drawMatrix(matrix, offset, context = this.context) {

        matrix.forEach((row, y) => {

            row.forEach((value, x) => {

                if (value !== 0) {

                    context.fillStyle = this.colors[value]

                    context.fillRect(
                        x + offset.x,
                        y + offset.y,
                        1,
                        1
                    )

                    context.strokeStyle = "#000"
                    context.lineWidth = 0.05

                    context.strokeRect(
                        x + offset.x,
                        y + offset.y,
                        1,
                        1
                    )

                }

            })

        })

    }

    draw() {

        this.context.fillStyle = "#000"
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height)

        this.drawMatrix(this.arena.matrix, { x: 0, y: 0 })

        this.drawMatrix(this.player.matrix, this.player.pos)

        this.drawPreview()

    }

    drawPreview() {

        this.previewContext.fillStyle = "#000"
        this.previewContext.fillRect(0, 0, 6, 6)

        if (this.player.nextMatrix) {

            this.drawMatrix(this.player.nextMatrix, { x: 1, y: 1 }, this.previewContext)

        }

    }

}