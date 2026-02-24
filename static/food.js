export class Food {
    constructor(ROWS, COLS, size) {
        this.ROWS = ROWS
        this.COLS = COLS
        this.size = size
        this.x = ROWS / 2
        this.y = COLS / 2
    }

    draw(ctx) {
        ctx.fillStyle = 'red'
        ctx.fillRect(this.x * this.size, this.y * this.size, this.size, this.size)
    }

    update() {
        this.x = Math.floor(Math.random() * (this.COLS))
        this.y = Math.floor(Math.random() * (this.ROWS))
    }
}