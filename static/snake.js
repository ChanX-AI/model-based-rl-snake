export class Snake {
    constructor(size) {
        this.size = size
        this.timer = 0
        this.interval = 10
        this.body = [
            {x: 1, y: 1},
        ]
    }

    draw(ctx) {
        ctx.fillStyle = 'blue'
        for (let i = 0; i < this.body.length; i++) {
            ctx.strokeStyle = 'black'
            ctx.strokeRect(this.body[i].x * this.size, this.body[i].y * this.size, this.size, this.size)
            ctx.fillStyle = (i == 0) ? 'lime' : 'green'
            ctx.fillRect(this.body[i].x * this.size, this.body[i].y * this.size, this.size, this.size)
        }
    }

    move(deltaTime, direction) {
        this.update(direction)
        if (this.timer > this.interval) {
            //this.update(direction)
            this.timer = 0
        } else this.timer += deltaTime
    }

    update(direction) {
        let headX = this.body[0].x
        let headY = this.body[0].y

        if (direction == "R") headX += 1
        else if (direction == "L") headX -= 1
        else if (direction == "U") headY -= 1
        else if (direction == "D") headY += 1

        this.body.unshift({x: headX, y: headY})
        this.body.pop()
    }
}