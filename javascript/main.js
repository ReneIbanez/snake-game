var myCanvas = document.getElementById('myCanvas');
var ctx = myCanvas.getContext('2d');
var snakeSize = 10;
var peachSize =10;
var w = 350;
var h = 350;
var score = 0;
var snake;
var food;






// game starts when start button is clicked on
$("#btn").on("click",function(e){
 alert("Are!!!! You!!!!! Ready!!!!!");
});


// Module pattern
//when game starts, food and snake will appear on the screen

// (function () its a constructor function
let drawModule = (function () {
let bodySnake = function(x, y) {
      // This is the three square'd snake
      // ctx.fillStyle sets color
      // // ctx.fillRect sets Height and Width
      // ctx.fillStyle = '#26d836';
      // ctx.fillRect(x*snakeSize, y*snakeSize, snakeSize, snakeSize);
     ctx.beginPath();
     ctx.arc(x*snakeSize, y*snakeSize, 5, 0, 2 * Math.PI, false);
     ctx.fillStyle = '#26d836';
     ctx.fill()
     ctx.lineWidth = 1;
     ctx.strokeStyle = 'yellow';
     ctx.stroke();
      // This is the border of the square
      // ctx.strokeStyle = 'yellow';
      // ctx.strokeRect(x*snakeSize, y*snakeSize, snakeSize, snakeSize);


  }
let peach = function(x, y) {
      // This is the border of the peach
      // ctx.fillStyle sets color
      // ctx.fillRect sets Height and Width
      // ctx.fillStyle = '#d29e1d';
      // ctx.fillRect(x*snakeSize, y*snakeSize, snakeSize, snakeSize);
      // // This is the single square
      // ctx.fillStyle = '#d29e1d';
      // ctx.fillRect(x*snakeSize+1, y*snakeSize+1, snakeSize-2, snakeSize-2);
      ctx.beginPath();
      ctx.arc(x*snakeSize, y*snakeSize, 5, 0, 2 * Math.PI, false);
      ctx.fillStyle = '#d29e1d';
      ctx.fill()
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'orange';
      ctx.stroke();
  }

let scoreText = function() {
      // How many peachs did the snake eat
      var score_text = "Score: " + score;
      ctx.fillStyle = 'blue';
      ctx.fillText(score_text, 145, h-5);
  }

// Initially the body of the snake will be formed by 2 squares.
let drawSnake = function() {
let length = 1;
snake = [];
  // Using a for loop we push the 3rd elements inside the array(squares).
  // Every element will have x = 0 and the y will take the value of the index.
for (var i = length; i>=0; i--) {
  snake.push({x:i, y:0});
       }
   }


// user will press a directional and the snake will move
$(document).on("keydown",function(e){
if (e.keyCode == 37) { // left directional
       console.log( "left pressed" );
       return false;
    }
  else if(e.which == 39 ){ // right directional
      console.log( "right pressed" );
      return false;
    }
  else if(e.which == 38 ){ // up directional
      console.log( "up pressed" );
      return false;
    }
  else if(e.which == 40 ){ // down directional
      console.log( "down pressed" );
      return false;

    }
});
let createFood = function() {
      food = {
    //Generate random numbers. peach appers in random spots on the canvas
      x: Math.floor((Math.random() * 30) + 1),
      y: Math.floor((Math.random() * 30) + 1)
    }

    //Look at the position of the snake's body.
      for (var i=0; i>snake.length; i++) {
         var snakeX = snake[i].x;
         var snakeY = snake[i].y;

            if (food.x===snakeX || food.y === snakeY || food.y === snakeY && food.x===snakeX) {
              food.x = Math.floor((Math.random() * 30) + 1);
              food.y = Math.floor((Math.random() * 30) + 1);
            }
        }
    }
    var checkCollision = function(x, y, array) {
       for(var i = 0; i < array.length; i++) {
           if(array[i].x === x && array[i].y === y)
           return true;
       }
       return false;
   }


   var paint = function () {
    //var's draw the space in which the snake will move.
    ctx.fillStyle = 'darkgreen';
    ctx.fillRect(0, 0, w, h);

    //Give it a border.
    ctx.strokeStyle = 'black';
    ctx.strokeRect(0, 0, w, h);

    //Disable the start button while you're playing.
    btn.setAttribute('disabled', true);

    var snakeX = snake[0].x;
    var snakeY = snake[0].y;

    /*
    Make the snake move.
    Use a variable ('direction') to control the movement.
    To move the snake, pop out the last element of the array and shift it on the top as first element.
    */
    if (direction == 'right') {
        snakeX++;
    } else if (direction == 'left') {
        snakeX--;
    } else if (direction == 'up') {
        snakeY--;
    } else if (direction == 'down') {
        snakeY++;
    }

    /*
    If the snake touches the canvas path or itself, it will die!
    Therefore if x or y of an element of the snake, don't fit inside the canvas, the game will be stopped.
    If the check_collision is true, it means the the snake has crashed on its body itself, then the game will be stopped again.
    */
if (snakeX == -1 || snakeX == w / snakeSize || snakeY == -1 || snakeY == h / snakeSize || checkCollision(snakeX, snakeY, snake)) {
    //Stop the game.
    alert("Game Over")
    //Make the start button enabled again.
    btn.removeAttribute('disabled', true);

    //Clean up the canvas.
    ctx.clearRect(0, 0, w, h);
    gameloop = clearInterval(gameloop);
    return;
    }

    //If the snake eats food it becomes longer and this means that,  you shouldn't pop out the last element of the array.
    if (snakeX == food.x && snakeY == food.y) {
    //Create a new square instead of moving the tail.
    var tail = {
          x: snakeX,
          y: snakeY
        };
        score ++;

        //Create new food.
        createFood();
    } else {

        //Pop out the last cell.
        var tail = snake.pop();
        tail.x = snakeX;
        tail.y = snakeY;
    }

  //Puts the tail as the first cell.
  snake.unshift(tail);

  //For each element of the array create a square using the bodySnake function we created before.
  for (let i = 0; i < snake.length; i++) {
      bodySnake(snake[i].x, snake[i].y);
    }

  //Create food using the _peach_ function.
  peach(food.x, food.y);

    //Put the score text.
    scoreText();
}
// Snake Speed
let init = function () {
      direction = 'down';
      drawSnake();
      createFood();
      gameloop = setInterval(paint, 37);
  }

  //You need to return only the _init_ function at the end of the Module.
  return {
      init: init
  };

  //Close the Module.
}());

(function (window, document, drawModule, undefined) {

  //Connect the button in the html with the _init_ function.
  let btn = document.getElementById('btn');
  btn.addEventListener("click", function () {
    drawModule.init();
    });
// prevents you from going Backword
document.onkeydown = function (event) {
    keyCode = window.event.keyCode;
    keyCode = event.keyCode;
      switch (keyCode) {
// if direction is left you cant go right
        case 37:
            if (direction != 'right') {
                direction = 'left';
            }
            console.log('left');
            break;
// if direction is right you cant go left
        case 39:
            if (direction != 'left') {
                direction = 'right';
                console.log('right');
            }
            break;
// if direction is up you cant go down
        case 38:
            if (direction != 'down') {
                direction = 'up';
                console.log('up');
            }
            break;
// if direction is down you cant go up
        case 40:
            if (direction != 'up') {
                direction = 'down';
                console.log('down');
            }
            break;
        }
    }
})(window, document, drawModule);
