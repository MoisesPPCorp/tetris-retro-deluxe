export class Arena {

    constructor(w, h) {

        this.matrix = this.createMatrix(w, h)

    }

    createMatrix(w, h) {

        const matrix = []

        while (h--) {

            matrix.push(new Array(w).fill(0))

        }

        return matrix

    }

    merge(player) {

        player.matrix.forEach((row, y) => {

            row.forEach((value, x) => {

                if (value !== 0) {

                    this.matrix[y + player.pos.y][x + player.pos.x] = value

                }

            })

        })

    }

    clearLines(player) {

        outer: for (let y = this.matrix.length - 1; y >= 0; --y) {

            for (let x = 0; x < this.matrix[y].length; ++x) {

                if (this.matrix[y][x] === 0) {

                    continue outer

                }

            }

            this.matrix.splice(y, 1)

            this.matrix.unshift(new Array(12).fill(0))

            player.score += 10

            ++y

        }

    }

}