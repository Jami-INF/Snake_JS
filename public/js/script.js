let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let score = document.getElementById("score");
let box = 40;
let snake = [];
snake[0] = {
    x: 8 * box,
    y: 8 * box
};
let direction = "right";
let food = {
    x: Math.floor(Math.random() * 20 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
};

function gameLoop() {

    // Vérification des bords
    if (snake[0].x >= canvas.width) snake[0].x = 0;
    if (snake[0].x < 0) snake[0].x = canvas.width - box;
    if (snake[0].y >= canvas.height) snake[0].y = 0;
    if (snake[0].y < 0) snake[0].y = canvas.height - box;

    // Vérification de la collision avec le corps
    for (i = 1; i < snake.length; i++) {
        if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
            clearInterval(jeu);
            alert('Perdu !');
        }
    }

    context.fillStyle = "#34495e";
    context.fillRect(0, 0, canvas.width, canvas.height);

    // Dessin du serpent
    for (i = 0; i < snake.length; i++) {
        context.fillStyle = "#000629";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }

    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box);

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    // Déplacement du serpent
    if (direction == "right") snakeX += box;
    if (direction == "left") snakeX -= box;
    if (direction == "up") snakeY -= box;
    if (direction == "down") snakeY += box;

    if (snakeX != food.x || snakeY != food.y) {
        snake.pop();
    } else {
        score.innerHTML = snake.length;
        food.x = Math.floor(Math.random() * 20 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box;
    }

    let newHead = {
        x: snakeX,
        y: snakeY
    };

    snake.unshift(newHead);
}

document.addEventListener('keydown', function(event) {
    if (event.keyCode >= 37 && event.keyCode <= 40) {
        event.preventDefault();
    }
    if (event.keyCode === 37 && direction !== 'right') direction = 'left';
    if (event.keyCode === 38 && direction !== 'down') direction = 'up';
    if (event.keyCode === 39 && direction !== 'left') direction = 'right';
    if (event.keyCode === 40 && direction !== 'up') direction = 'down';
});

document.getElementById('btn_facile').addEventListener('click', function () {
    clearInterval(jeu);
    jeu = setInterval(gameLoop, 200);
});

document.getElementById('btn_moyen').addEventListener('click', function () {
    clearInterval(jeu);
    jeu = setInterval(gameLoop, 100);
});

document.getElementById('btn_difficile').addEventListener('click', function () {
    clearInterval(jeu);
    jeu = setInterval(gameLoop, 60);
});

let jeu = setInterval(gameLoop, 100);
