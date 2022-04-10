let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
let x = canvas.width / 2;
let y = canvas.height - 30;
let dx = 2;
let dy = -2;
let ballRadius = 10;
let paddleHeight = 10;
let paddleWidth = 75;
let paddleX = (canvas.width - paddleWidth) / 2;
let rightPressed = false;
let leftPressed = false;
let brickRowCount = 3;
let brickColumnCount = 8;
let brickWidth = 75;
let brickHeight = 20;
let brickPadding = 10;
let brickOffSetTop = 30;
let brickOffSetLeft = 30;
let bricks = [];

for(let c = 0; c < brickColumnCount; c++){
    bricks[c] = [];
    for(let r = 0; r < brickRowCount; r++){
        bricks[c][r] = { x: 0, y: 0, status: 1};     
    }
}

    let score = 0;
    let lives = 3;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e){
    if(e.key == "Right" || e.key == "ArrowRight"){
        rightPressed = true;
    
    }else if(e.key == "Left" || e.key == "ArrowLeft"){
        leftPressed = true;
    }
}

function keyUpHandler(e){
    if(e.key == "Right" || e.key == "ArrowRight"){
        rightPressed = false;
    
    }else if(e.key == "Left" || e.key == "ArrowLeft"){
            leftPressed = false;

    }
}

    function collisionDetection(){
        for(let c = 0; c < brickColumnCount; c++){
            for(let r = 0; r < brickRowCount; r++ ){
            let b = bricks[c][r];
            if(b.status == 1){
                if(x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight){
                    dy = -dy;
                    b.status = 0; 
                    score++;

                    if(score == brickRowCount * brickColumnCount){
                        alert("YOU WIN, CONGRATS");
                        document.location.reload();
                    }
                }
            }
        }
    }
}

function drawScore(){
        ctx.font = '18px JetBrains Mono';
        ctx.fillStyle = '#f72585';
        ctx.fillText("Score:" + score, 8, 20); 
    }

function drawBricks(){
        for(let c = 0; c < brickColumnCount; c++){
            for( let r = 0; r < brickRowCount; r++){

                if(bricks[c][r].status == 1){

                    let brickX = (c * (brickWidth + brickPadding)) + brickOffSetLeft;
                    let brickY = (r * (brickHeight + brickPadding)) + brickOffSetTop;
                    bricks[c][r].x = brickX;
                    bricks[c][r].y = brickY;
                    ctx.beginPath();
                    ctx.rect(brickX, brickY, brickWidth, brickHeight);
                    ctx.fillStyle = "#f72585";
                    ctx.fill();
                    ctx.closePath();

                }
            }
        }
    }

function drawLives(){
    ctx.font = "18px JetBrains Mono";
    ctx.fillStyle = "#f72585";
    ctx.fillText("Lives: " + lives, canvas.width - 95, 20);
}

function drawBall(){
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, Math.PI * 2);
    ctx.fillStyle = "#f72585";    
    ctx.fill();
    ctx.closePath();
}

function drawPaddle() {  
    ctx.beginPath();  
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);  
    ctx.fillStyle = '#f72585';  
    ctx.fill();  
    ctx.closePath();  
}  

            function draw(){
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                drawBricks();
                drawBall();
                drawPaddle();
                drawScore();
                drawLives();
                collisionDetection();
                x += dx;
                y += dy;

                if(x + dx > canvas.width - ballRadius || x + dx < ballRadius){
                    dx = -dx;
            }  

if(y + dy < ballRadius){
    dy = -dy;

}else if(y + dy > canvas.height - ballRadius){

    if(x >  paddleX & x < paddleX + paddleWidth){
        dy = -dy;
    
    } else{
        lives--;
        if(!lives){
            alert("GAME OVER");
            document.location.reload();
        
        } else{
            x = canvas.width / 2;
            y = canvas.height - 30;
            dx = 2;
            dy = -2;
            paddleX = (canvas.width - paddleWidth) / 2;
        }
        
    }

}
if (rightPressed) {  
    paddleX += 8;  
    if (paddleX + paddleWidth > canvas.width) {  
    paddleX = canvas.width - paddleWidth;  
    }  
  }  
  else if (leftPressed) {  
    paddleX -= 8;  
    if (paddleX < 0) {  
      paddleX = 0;  
    }  
  }  
  requestAnimationFrame(draw);  
}  
draw();  



