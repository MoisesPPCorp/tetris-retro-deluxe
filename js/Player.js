export class Player {

    constructor(arena) {
        this.arena = arena;
        this.pos = { x: 4, y: 0 };

        this.matrix = null;
        this.nextMatrix = this.createPiece(this.randomPiece());

        this.score = 0;
        this.level = 1;
    }

    createPiece(type) {

        if (type === 'T')
            return [
                [0, 1, 0],
                [1, 1, 1],
                [0, 0, 0]
            ];

        if (type === 'O')
            return [
                [2, 2],
                [2, 2]
            ];

        if (type === 'L')
            return [
                [0, 0, 3],
                [3, 3, 3],
                [0, 0, 0]
            ];

        if (type === 'I')
            return [
                [4, 4, 4, 4]
            ];
    }

    randomPiece() {
        const pieces = 'TOLI';
        return pieces[Math.floor(Math.random() * pieces.length)];
    }

    reset() {
        this.matrix = this.nextMatrix;
        this.nextMatrix = this.createPiece(this.randomPiece());

        this.pos.y = 0;
        this.pos.x = 4;

        if (this.collide()) {
            this.arena.matrix.forEach(row => row.fill(0));
            this.score = 0;
            this.level = 1;
            alert("GAME OVER");
        }
    }

    rotate(dir = 1) {

        const original = this.matrix;

        let rotated = original[0].map((_, i) =>
            original.map(row => row[i])
        );

        if (dir > 0)
            rotated.forEach(row => row.reverse());
        else
            rotated.reverse();

        const kicks = [
            { x: 0, y: 0 },
            { x: 1, y: 0 },
            { x: -1, y: 0 },
            { x: 2, y: 0 },
            { x: -2, y: 0 },
            { x: 0, y: -1 }
        ];

        for (let kick of kicks) {

            this.pos.x += kick.x;
            this.pos.y += kick.y;

            if (!this.collideMatrix(rotated)) {
                this.matrix = rotated;
                return;
            }

            this.pos.x -= kick.x;
            this.pos.y -= kick.y;
        }
    }

    drop() {

        this.pos.y++;

        if (this.collide()) {

            this.pos.y--;
            this.arena.merge(this);

            const rows = this.arena.sweep();
            this.score += rows * 10;
            this.level = Math.floor(this.score / 100) + 1;

            this.reset();
        }
    }

    move(dir) {
        this.pos.x += dir;

        if (this.collide())
            this.pos.x -= dir;
    }

    collideMatrix(matrix) {

        for (let y = 0; y < matrix.length; y++) {
            for (let x = 0; x < matrix[y].length; x++) {

                if (matrix[y][x] !== 0) {

                    const newX = x + this.pos.x;
                    const newY = y + this.pos.y;

                    if (
                        newX < 0 ||
                        newX >= this.arena.matrix[0].length ||
                        newY >= this.arena.matrix.length ||
                        (this.arena.matrix[newY] &&
                            this.arena.matrix[newY][newX] !== 0)
                    ) {
                        return true;
                    }
                }
            }
        }

        return false;
    }

    collide() {
        return this.collideMatrix(this.matrix);
    }
}