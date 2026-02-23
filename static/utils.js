export function drawGrid(ctx, HEIGHT, WIDTH, CELL_SIZE) {
    for (let i = 0; i < HEIGHT; i += CELL_SIZE) {
        ctx.beginPath()
        ctx.moveTo(0, i)
        ctx.lineTo(WIDTH, i)
        ctx.stroke()
    }

    for (let i = 0; i < WIDTH; i += CELL_SIZE) {
        ctx.beginPath()
        ctx.moveTo(i, 0)
        ctx.lineTo(i, HEIGHT)
        ctx.stroke()
    }
}

export function boundaryCheck(head, ROWS, COLS) {
    return (head.x < 0 || head.x >= COLS) || (head.y < 0 || head.y >= ROWS)

}

export function foodCollision(head, food) {
    return head.x == food.x && head.y == food.y
}

export function tailCollision(body) {
    const head = body[0]

    for (let i = 1; i < body.length; i++) {
        if (body[i].x == head.x && body[i].y == head.y)
            return true
    }

    return false
}

export async function updatePolicy(ROWS, COLS, player, food) {
    const response = await fetch("/send", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            size: [ROWS, COLS],
            start: [player.body[0].y, player.body[0].x],
            goal: [food.y, food.x],
            blocks: player.body
        })
    })

    const data = await response.json()
    const policy = data["policy"]
    
    return policy
}

