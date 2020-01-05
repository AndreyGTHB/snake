let game = {
    tickNumber: 0,
    timer: null,
    board: [
        "111111111111111",
        "1             1",
        "1             1",
        "1             1",
        "1    1111     1",
        "1    1111     1",
        "1             1",
        "1             1",
        "1             1",
        "111111111111111"
    ],
    tick: function(){
        window.clearTimeout(game.timer);
        game.tickNumber++;
        let result = snake.move();
        if(result == "GAMEOVER"){
            alert("GAMEOVER");
            gameControl.start = false;
            return;
        }
        graphics.drawGame();
        game.timer = window.setTimeout("game.tick()", 500);
    },
    isEmpty: function(location){
        return game.board[location.y][location.x] == ' ';
    },
    isWall: function(location){
        return game.board[location.y][location.x] == '1';
    },
    fruit: [
        {x: 1, y: 1}
    ]
};

let snake = {
    parts: [
        {x:4, y:2},
        {x:3, y:2},
        {x:2, y:2},
    ],
    facing: "R",
    nextLocation: function(){
        let snakeHead = snake.parts[0];
        let targetX = snakeHead.x;
        let targetY = snakeHead.y;
        targetY = snake.facing == "U" ? targetY - 1 : targetY;
        targetY = snake.facing == "D" ? targetY + 1 : targetY;
        targetX = snake.facing == "L" ? targetX - 1 : targetX;
        targetX = snake.facing == "R" ? targetX + 1 : targetX;
        return {x: targetX, y: targetY};
    },
    move: function(){
        let location = snake.nextLocation();
        if(game.isEmpty(location)) {
            snake.parts.unshift(location);
            snake.parts.pop();
        }
        if(game.isWall(location)) return "GAMEOVER";
    }

};


//Графика
let graphics = {
    canvas: document.getElementById("canvas"),
    ctx: canvas.getContext("2d"),
    squareSize: 30,
    drawBoard: function(ctx){
        let currentYOffset = 0;
        ctx.fillStyle = "black";
        game.board.forEach(function checkLine(line){
            line = line.split('');
            let currentXOffset = 0;
            line.forEach(function checkCharacter(character){
                if(character == "1"){
                    ctx.fillRect(currentXOffset, currentYOffset, graphics.squareSize, graphics.squareSize);
                }
                currentXOffset += graphics.squareSize;
            });
            currentYOffset += graphics.squareSize;
        });
    },
    drawSnake: function(ctx){
        ctx.fillStyle = "green";
        snake.parts.forEach(function drawPart(part){
            let partXLocation = part.x * graphics.squareSize;
            let partYLocation = part.y * graphics.squareSize;
            ctx.fillRect(partXLocation, partYLocation, graphics.squareSize, graphics.squareSize)
        })
    },
    drawGame: function(){
        graphics.ctx.clearRect(0, 0, graphics.canvas.width, graphics.canvas.height);
        graphics.drawBoard(graphics.ctx);
        graphics.drawSnake(graphics.ctx);
    }
};

graphics.drawGame();


let gameControl = {
    start: true,
    processInput: function(keyPressed){
        let key = keyPressed.key.toLowerCase();
        let targetDirection = snake.facing;
        if(key == "w") targetDirection = "U";
        if(key == "a") targetDirection = "L";
        if(key == "s") targetDirection = "D";
        if(key == "d") targetDirection = "R";
        snake.facing = targetDirection;
        if(gameControl.start) game.tick()

    },
    startGame: function(){
        if(gameControl.start){
            window.addEventListener("keypress", gameControl.processInput, false);
            game.tick();
        }
    }
};
gameControl.startGame();









