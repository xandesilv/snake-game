// Get the canvas element
let canvas = document.getElementById('game');
let context = canvas.getContext('2d');

// Define the size of each square
let box = 32;

// Initialize the snake as an array of coordinates
let snake = [];
snake[0] = {
    x: 8 * box,
    y: 8 * box
}

// Set the initial direction of the snake
let direction = "right";

// Create the food at a random position
let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

// Function to draw the game background
function criarBG() {
    context.fillStyle = "lightgreen";
    context.fillRect(0, 0, 16 * box, 16 * box);
}

// Function to draw the snake
function criarCobrinha() {
    for(i = 0; i < snake.length; i++){
        context.fillStyle = "green";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

// Function to draw the food
function drawFood() {
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box);
}

// Event listener for the arrow keys to change the direction of the snake
document.addEventListener('keydown', update);

function update(event) {
    if(event.keyCode == 37 && direction != 'right') direction = 'left';
    if(event.keyCode == 38 && direction != 'down') direction = 'up';
    if(event.keyCode == 39 && direction != 'left') direction = 'right';
    if(event.keyCode == 40 && direction != 'up') direction = 'down';
}
// Initialize the score
let score = 0;

// Function to draw the score
function drawScore() {
    context.fillStyle = "black";
    context.font = "16px Arial";
    context.fillText("Score: " + score, box, box);
}

// Main game function
function iniciarJogo() {
    // Check if the snake hit the border and make it appear on the opposite side
    if(snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
    if(snake[0].x < 0 && direction == 'left') snake[0].x = 16 * box;
    if(snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
    if(snake[0].y < 0 && direction == 'up') snake[0].y = 16 * box;

    // Check if the snake hit itself
    for(i = 1; i < snake.length; i++) {
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
            clearInterval(jogo);
            alert('Game Over :(');
            // Reset the game
            snake = [];
            snake[0] = {
                x: 8 * box,
                y: 8 * box
            }
            direction = "right";
            food = {
                x: Math.floor(Math.random() * 15 + 1) * box,
                y: Math.floor(Math.random() * 15 + 1) * box
            }
            score = 0; // Reset the score
            jogo = setInterval(iniciarJogo, 100);
            return;
        }
    }

    // Draw the game elements
    criarBG();
    criarCobrinha();
    drawFood();
    drawScore(); // Draw the score

    // Get the current head position
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    // Check the direction and update the new head position
    if(direction == "right") snakeX += box;
    if(direction == "left") snakeX -= box;
    if(direction == "up") snakeY -= box;
    if(direction == "down") snakeY += box;

    // Check if the snake ate the food
    if(snakeX != food.x || snakeY != food.y) {
        // If not, remove the tail
        snake.pop();
    } else {
        // If yes, create new food and don't remove the tail
        food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box;
        score++; // Increase the score
    }

    // Create the new head and add it to the beginning of the snake
    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead);
}

// Start the game loop
let jogo = setInterval(iniciarJogo, 100);