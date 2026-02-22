export class Player {
    constructor(x, y, size) {
        this.x = x
        this.y = y
        this.size = size
        this.timer = 0
        this.interval = 50
    }

    draw(ctx) {
        ctx.fillStyle = 'blue'
        ctx.fillRect(this.x, this.y, this.size, this.size)
    }

    update(deltaTime) {
        if (this.timer > this.interval) {
            this.timer = 0
        }
        else this.timer += deltaTime

        if (this.x > 500) this.x = 0
    }
}