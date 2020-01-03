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
        game.tickNumber++;
        snake.move();
        graphics.drawGame();
        game.timer = window.setTimeout("game.tick()", 500)
    }
};

let snake = {
    parts: [
        {x:4, y:2},
        {x:3, y:2},
        {x:2, y:2},
    ],
    facing: "E",
    nextLocation: function(){
    },
    move: function(){
        let location = snake.nextLocation;
        snake.parts.unshift(location);
    }

};


//Графика
let graphics = {
    canvas: document.getElementById("canvas"),
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
        let ctx = graphics.canvas.getContext("2d");
        graphics.drawBoard(ctx);
        graphics.drawSnake(ctx);
    }
};

graphics.drawGame();


let gameControl = {
    startGame: function(){
        game.tick();
    }
};
gameControl.startGame();









