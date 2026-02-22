import { Player } from "./player.js"
import { Snake } from "./snake.js"
import { Food } from "./food.js"

const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

const WIDTH = canvas.width = 500
const HEIGHT = canvas.height = 500
const CELL_SIZE = 25

const ROWS = HEIGHT / CELL_SIZE
const COLS = WIDTH / CELL_SIZE

canvas.style.backgroundColor = 'grey'


const player = new Snake(CELL_SIZE)
const food = new Food(ROWS, COLS, CELL_SIZE)


let lastTime = 1
let direction = "R"
let gameOver = false
let policy = 0

fetch("/send", {
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
    }).then(response => response.json()).then(data => {
        policy = data["policy"]
    })



food.draw(ctx)
player.draw(ctx)
//drawGrid()


async function animate(currentTime) {
    const deltaTime = currentTime - lastTime
    lastTime = currentTime
    await updatePolicy()
    direction = policy[player.body[0].y][player.body[0].x]
    player.move(deltaTime, direction)
    gameOver = boundaryCheck(player.body[0]) || tailCollision(player.body)
    if (!gameOver) {
        ctx.clearRect(0, 0, WIDTH, HEIGHT)
        if (foodCollision(player.body[0], {x: food.x, y: food.y})) {
            food.update()
            const n = player.body.length - 1
            player.body.push({x: player.body[n], y: player.body[n].y})
        }
        player.draw(ctx)
        food.draw(ctx)
        //drawGrid()
    }
    requestAnimationFrame(animate)
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

async function updatePolicy() {
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
    policy = data["policy"]
}

function boundaryCheck(head) {
    return (head.x < 0 || head.x >= COLS) || (head.y < 0 || head.y >= ROWS)

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

window.addEventListener("keydown", function(e) {
    if (e.key == "ArrowUp" && direction != "D") {
        direction = "U"
    }
    else if (e.key == "ArrowRight" && direction != "L") {
        direction = "R"
    }
    else if (e.key == "ArrowDown" && direction != "U") {
        direction = "D"
    }
    else if (e.key == "ArrowLeft" && direction != "R") {
        direction = "L"
    }
    animate(0)
})

