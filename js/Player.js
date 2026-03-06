export class Player {

    constructor(arena) {

        this.arena = arena

        this.pos = { x: 0, y: 0 }

        this.matrix = null
        this.nextMatrix = null

        this.score = 0
        this.level = 1

        this.pieces = "TJLOSZI"

        this.reset()

    }

    createPiece(type) {

        if (type === "T") return [
            [0, 1, 0],
            [1, 1, 1],
            [0, 0, 0]
        ]

        if (type === "O") return [
            [2, 2],
            [2, 2]
        ]

        if (type === "L") return [
            [0, 3, 0],
            [0, 3, 0],
            [0, 3, 3]
        ]

        if (type === "J") return [
            [0, 4, 0],
            [0, 4, 0],
            [4, 4, 0]
        ]

        if (type === "I") return [
            [0, 0, 0, 0],
            [5, 5, 5, 5],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ]

        if (type === "S") return [
            [0, 6, 6],
            [6, 6, 0],
            [0, 0, 0]
        ]

        if (type === "Z") return [
            [7, 7, 0],
            [0, 7, 7],
            [0, 0, 0]
        ]

    }

    reset() {

        if (!this.nextMatrix) {

            const type = this.pieces[
                this.pieces.length * Math.random() | 0
            ]

            this.matrix = this.createPiece(type)

        } else {

            this.matrix = this.nextMatrix

        }

        const nextType = this.pieces[
            this.pieces.length * Math.random() | 0
        ]

        this.nextMatrix = this.createPiece(nextType)

        this.pos.y = 0

        this.pos.x =
            (this.arena.matrix[0].length / 2 | 0) -
            (this.matrix[0].length / 2 | 0)

        if (this.collide()) {

            // GAME OVER
            alert("GAME OVER")

            this.arena.matrix.forEach(row => row.fill(0))

            this.score = 0

        }

    }

    collide() {

        const m = this.matrix
        const o = this.pos

        for (let y = 0; y < m.length; y++) {

            for (let x = 0; x < m[y].length; x++) {

                if (
                    m[y][x] !== 0 &&
                    (
                        this.arena.matrix[y + o.y] &&
                        this.arena.matrix[y + o.y][x + o.x]
                    ) !== 0
                ) {

                    return true

                }

            }

        }

        return false

    }

    drop() {

        this.pos.y++

        if (this.collide()) {

            this.pos.y--

            this.arena.merge(this)

            this.reset()

            this.arena.clearLines(this)

        }

    }

    move(dir) {

        this.pos.x += dir

        if (this.collide()) {

            this.pos.x -= dir

        }

    }

    rotate() {

        const pos = this.pos.x

        let offset = 1

        this.rotateMatrix(this.matrix)

        while (this.collide()) {

            this.pos.x += offset

            offset = -(offset + (offset > 0 ? 1 : -1))

            if (offset > this.matrix[0].length) {

                this.rotateMatrix(this.matrix, -1)

                this.pos.x = pos

                return

            }

        }

    }

    rotateMatrix(matrix, dir = 1) {

        for (let y = 0; y < matrix.length; y++) {

            for (let x = 0; x < y; x++) {

                [
                    matrix[x][y],
                    matrix[y][x]
                ] = [
                        matrix[y][x],
                        matrix[x][y]
                    ]

            }

        }

        if (dir > 0) {

            matrix.forEach(row => row.reverse())

        } else {

            matrix.reverse()

        }

    }

}