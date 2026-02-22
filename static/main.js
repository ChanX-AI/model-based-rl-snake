import { Player } from "./player.js"
import { Snake } from "./snake.js"
import { Food } from "./food.js"

const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

const WIDTH = canvas.width = 500
const HEIGHT = canvas.height = 500
const CELL_SIZE = 100

const ROWS = HEIGHT / CELL_SIZE
const COLS = WIDTH / CELL_SIZE

canvas.style.backgroundColor = 'grey'

const player = new Snake(CELL_SIZE)
const food = new Food(HEIGHT, WIDTH, CELL_SIZE)


let lastTime = 1
let direction = "R"
let gameOver = false
let policy = 0

food.draw(ctx)
player.draw(ctx)
drawGrid()


fetch("/send", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        size: [ROWS, COLS],
        start: [player.body[0].x / CELL_SIZE - 1, player.body[0].y / CELL_SIZE - 1],
        goal: [food.y / CELL_SIZE - 1, food.x / CELL_SIZE - 1]
    })
}).then(response => response.json()).then(data => {
    policy = data["policy"]
})

function animate(currentTime) {
    ctx.clearRect(0, 0, WIDTH, HEIGHT)
    const deltaTime = currentTime - lastTime
    lastTime = currentTime
    let r = Math.min(player.body[0].y / CELL_SIZE - 1, ROWS - 1)
    let c = Math.min(player.body[0].x / CELL_SIZE - 1, COLS - 1)
    r = Math.max(player.body[0].y / CELL_SIZE - 1, 0)
    c = Math.max(player.body[0].x / CELL_SIZE - 1, 0)
    console.log(r, c)
    direction = policy[r][c]
    console.log(direction, r, c)
    if (direction == undefined) console.log(policy)
    player.draw(ctx)
    food.draw(ctx)
    if (foodCollision(player.body[0], {x: food.x, y: food.y})) {
        food.update()
        const n = player.body.length - 1
        player.body.push({x: player.body[n], y: player.body[n].y})
        updatePolicy()
    }
    if (!gameOver) player.move(deltaTime, direction)
    //gameOver = boundaryCheck(player.body[0]) //|| tailCollision(player.body)
    drawGrid()
    requestAnimationFrame(animate)

}

function updatePolicy() {
    fetch("/send", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        size: [ROWS, COLS],
        start: [player.body[0].y / CELL_SIZE - 1, player.body[0].x / CELL_SIZE - 1],
        goal: [food.y / CELL_SIZE - 1, food.x / CELL_SIZE - 1]
    })
    }).then(response => response.json()).then(data => {
        policy = data["policy"]
    })
}

function drawGrid() {
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

function boundaryCheck(head) {
    return (head.x < 0 || head.x >= WIDTH) || (head.y < 0 || head.y >= HEIGHT)

}

function foodCollision(head, food) {
    return head.x == food.x && head.y == food.y
}

function tailCollision(body) {
    const head = body[0]

    for (let i = 1; i < body.length; i++) {
        if (body[i].x == head.x && body[i].y == head.y)
            return true
    }

    return false
}

// window.addEventListener("keydown", function(e) {
//     if (e.key == "ArrowUp" && direction != "DOWN") {
//         direction = "UP"
//     }
//     else if (e.key == "ArrowRight" && direction != "LEFT") {
//         direction = "RIGHT"
//     }
//     else if (e.key == "ArrowDown" && direction != "UP") {
//         direction = "DOWN"
//     }
//     else if (e.key == "ArrowLeft" && direction != "RIGHT") {
//         direction = "LEFT"
//     }
//     animate(0)
// })

window.addEventListener("keydown", (e) => {
    animate(0)
})