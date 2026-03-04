export class Arena {
    constructor(width, height) {
        this.matrix = this.createMatrix(width, height);
    }

    createMatrix(w, h) {
        const matrix = [];
        while (h--) {
            matrix.push(new Array(w).fill(0));
        }
        return matrix;
    }

    merge(player) {
        player.matrix.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value !== 0) {
                    this.matrix[y + player.pos.y][x + player.pos.x] = value;
                }
            });
        });
    }

    sweep() {
        let rowCount = 0;

        for (let y = this.matrix.length - 1; y >= 0; y--) {

            if (this.matrix[y].every(value => value !== 0)) {

                this.matrix.splice(y, 1);
                this.matrix.unshift(new Array(this.matrix[0].length).fill(0));

                rowCount++;
                y++;
            }
        }

        return rowCount;
    }

}