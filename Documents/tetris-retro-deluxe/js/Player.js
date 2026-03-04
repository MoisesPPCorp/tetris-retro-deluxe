export class Player {
    constructor(arena) {
        this.arena = arena;
        this.pos = { x: 0, y: 0 };
        this.matrix = null;
        this.score = 0;
        this.level = 1;
    }

    createPiece(type) {
        if (type === 'T') {
            return [
                [0, 1, 0],
                [1, 1, 1],
                [0, 0, 0]
            ];
        } else if (type === 'O') {
            return [
                [2, 2],
                [2, 2]
            ];
        } else if (type === 'L') {
            return [
                [0, 0, 3],
                [3, 3, 3],
                [0, 0, 0]
            ];
        } else if (type === 'I') {
            return [
                [0, 4, 0, 0],
                [0, 4, 0, 0],
                [0, 4, 0, 0],
                [0, 4, 0, 0]
            ];
        }
    }

    randomPiece() {
        const pieces = 'TOLI';
        return pieces[Math.floor(Math.random() * pieces.length)];
    }

    reset() {
        this.matrix = this.createPiece(this.randomPiece());
        this.pos.y = 0;
        this.pos.x = 4;

        if (this.collide()) {
            this.arena.matrix.forEach(row => row.fill(0));
            this.score = 0;
            this.level = 1;
            alert("GAME OVER");
        }
    }

    rotate() {
        const matrix = this.matrix;

        // Transpor
        for (let y = 0; y < matrix.length; y++) {
            for (let x = 0; x < y; x++) {
                [matrix[x][y], matrix[y][x]] =
                    [matrix[y][x], matrix[x][y]];
            }
        }

        // Inverter linhas
        matrix.forEach(row => row.reverse());

        // Se colidir após girar, desfaz
        if (this.collide()) {
            matrix.forEach(row => row.reverse());
            for (let y = 0; y < matrix.length; y++) {
                for (let x = 0; x < y; x++) {
                    [matrix[x][y], matrix[y][x]] =
                        [matrix[y][x], matrix[x][y]];
                }
            }
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
        if (this.collide()) {
            this.pos.x -= dir;
        }
    }

    collide() {
        const [m, o] = [this.matrix, this.pos];

        for (let y = 0; y < m.length; y++) {
            for (let x = 0; x < m[y].length; x++) {
                if (m[y][x] !== 0) {

                    const newX = x + o.x;
                    const newY = y + o.y;

                    // Parede esquerda
                    if (newX < 0) return true;

                    // Parede direita
                    if (newX >= this.arena.matrix[0].length) return true;

                    // Fundo
                    if (newY >= this.arena.matrix.length) return true;

                    // Colisão com blocos já fixos
                    if (
                        this.arena.matrix[newY] &&
                        this.arena.matrix[newY][newX] !== 0
                    ) {
                        return true;
                    }
                }
            }
        }
        return false;
    }
}