import { Snake } from "./snake.js"
import { Food } from "./food.js"
import { drawGrid, boundaryCheck, foodCollision, tailCollision, updatePolicy } from "./utils.js"

const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")
const scoreElement = document.querySelector("h3")

const WIDTH = canvas.width = 500
const HEIGHT = canvas.height = 500
const CELL_SIZE = 25

const ROWS = HEIGHT / CELL_SIZE
const COLS = WIDTH / CELL_SIZE

canvas.style.backgroundColor = 'grey'


const player = new Snake(CELL_SIZE)
const food = new Food(ROWS, COLS, CELL_SIZE)


let score = 0
let lastTime = 1
let gameOver = false

player.draw(ctx)
food.draw(ctx)
//drawGrid(ctx, HEIGHT, WIDTH, CELL_SIZE)


async function animate(currentTime) {

    const deltaTime = currentTime - lastTime
    lastTime = currentTime

    gameOver = boundaryCheck(player.body[0], ROWS, COLS) || tailCollision(player.body)

    if (!gameOver) {

        const policy = await updatePolicy(ROWS, COLS, player, food)
        const direction = policy[player.body[0].y][player.body[0].x]

        ctx.clearRect(0, 0, WIDTH, HEIGHT)

        player.update(direction)

        if (foodCollision(player.body[0], {x: food.x, y: food.y})) {
            food.update()
            const n = player.body.length - 1
            player.body.push({x: player.body[n], y: player.body[n].y})
            score++
            scoreElement.textContent = `Score : ${score}`
        }
        
        player.draw(ctx)
        food.draw(ctx)
    }

    requestAnimationFrame(animate)
}

window.addEventListener("keydown", function(e) {
    animate(0)
})

