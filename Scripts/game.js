// Set the width and height of the scene.
var width = 1280;
var height = 800;
//Declares the game objects
var p1Paddle = new PIXI.Graphics();
var p2Paddle = new PIXI.Graphics();
var ball = new PIXI.Graphics();
//Ball and paddles properties
var ballSize = 15;
var borderSize = 20;
var paddleHeight = 100;
var paddleWidth = 20;
var paddleSpeed = 15;

//ball speed   
var upwardSpeedBall = 0;
var sideSpeedball = 0;
var ballSpeedMultiplier = 1;

// Setup the rendering surface.
var renderer = new PIXI.CanvasRenderer(width, height);
renderer.autoResize = true;
renderer.backgroundColor = 0x000000;//Sets the background for the canvas
//Stage
var stage = new PIXI.Stage();

// Handle keyboard controls
var keysDown = {};

//Key down event
addEventListener("keydown", function (e) {
    keysDown[e.keyCode] = true;
    //e.preventDefault();
    //e.stopImmediatePropagation();
}, false);
//Key up event
addEventListener("keyup", function (e) {
    delete keysDown[e.keyCode];
}, false);

function setupScenario() {

    var graphics = new PIXI.Graphics();
    var paddleMidPosition = (height / 2) - (paddleHeight / 2);

    graphics.beginFill(0xFFFFFF, 1);
    //Draws top and bottom border
    graphics.drawRect(0, 0, width, borderSize);
    graphics.drawRect(0, height - borderSize, width, borderSize);
    //add borders to the stage
    stage.addChild(graphics);

    //Draws Paddles
    p1Paddle.beginFill(0xFFFFFF, 1);
    p1Paddle.drawRect(0, 0, paddleWidth, paddleHeight);
    p1Paddle.endFill();
    //Set Paddle 1 position
    p1Paddle.x = 5;
    p1Paddle.y = paddleMidPosition;

    p2Paddle.beginFill(0xFFFFFF, 1);
    p2Paddle.drawRect(0, 0, paddleWidth, paddleHeight);
    p2Paddle.endFill();
    //Set Paddle 2 position
    p2Paddle.x = width - paddleWidth - 2;
    p2Paddle.y = paddleMidPosition;

    //Draws ball
    ball.beginFill(0xFFFFFF, 1);
    ball.drawRect(0, 0, ballSize, ballSize);
    ball.x = (width / 2) + (ballSize / 2);
    ball.y = (height / 2) + (ballSize / 2);
    ball.maxX = width + ballSize;
    ball.minX = 0 - ballSize;
    ball.maxY = height - borderSize - ballSize;
    ball.minY = 0 + borderSize;
    ball.endFill();
    //Add paddles and ball to the stage
    stage.addChild(p1Paddle);
    stage.addChild(p2Paddle);
    stage.addChild(ball);
}

function paddlesControl() {

    if (87 in keysDown) { // Player1 holding W key Down (go up)            
        if (!(p1Paddle.y < borderSize + 10)) {
            p1Paddle.y -= paddleSpeed;
        }
    }
    if (83 in keysDown) { // Player1 holding S key Down (go down)            
        if (!(p1Paddle.y > (height - borderSize - paddleHeight - 10))) {
            p1Paddle.y += paddleSpeed;
        }
    }

    if (38 in keysDown) { // Player 2 holding Up Arrow         
        if (!(p2Paddle.y < borderSize + 10)) {
            p2Paddle.y -= paddleSpeed;
        }
    }
    if (40 in keysDown) { // Player holding 2 Down Arrow           
        if (!(p2Paddle.y > (height - borderSize - paddleHeight - 10))) {
            p2Paddle.y += paddleSpeed;
        }
    }
}

//From https://www.w3schools.com/js/js_random.asp
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

//sets the ball speed and direction on setup
function setBallSpeed() {
    //set the direction to right
    var sideDirection = 1;
    //set the direction to upward
    var horizontalDirection = 1;
    //if a random number is less than 0.5, then set the direction to left
    if (Math.random() < 0.5) {
        sideDirection = -1;
    }
    //if a random number is less than 0.5, then set the direction to upward
    if (Math.random() < 0.5) {
        horizontalDirection = -1;
    }
    //sets the ball speed
    sideSpeedball = sideDirection * getRndInteger(1, 10);
    upwardSpeedBall = horizontalDirection * getRndInteger(1, 10);
}

function ballMovement() {
    //Moves the ball
    ball.x += sideSpeedball * ballSpeedMultiplier;
    ball.y += upwardSpeedBall * ballSpeedMultiplier;

    //Determines the ball direction
    if (ball.x < ball.minX || ball.x > ball.maxX) {
        sideSpeedball = sideSpeedball * -1;
        ballSpeedMultiplier += 0.01;
    }
    //Collision Detection on the top and bottom border
    if (ball.y < ball.minY || ball.y > ball.maxY) {
        upwardSpeedBall = upwardSpeedBall * -1;
        ballSpeedMultiplier += 0.01;
    }
    //Collision detection on the p1 paddle
    if ((ball.x - p1Paddle.x) < paddleWidth && ball.y - ballSize > p1Paddle.y && ball.y < (p1Paddle.y + paddleHeight)) {
        sideSpeedball = sideSpeedball * -1;     
    }

    //Collision detection on the p2 paddle
    if ((ball.x + ballSize) > p2Paddle.x && ball.y - ballSize > p2Paddle.y && ball.y < (p2Paddle.y + paddleHeight)) {
        sideSpeedball = sideSpeedball * -1;
    }
}

// Start running the game.  
setup();
function setup() {
    //append the renderer to the view
    document.body.appendChild(renderer.view);
    // Begin the first frame
    setupScenario();
    gameLoop();
    //set the ball speed
    setBallSpeed();
}
//Game loop, called at each frame
function gameLoop() {
    //Loop this function 60 times per second
    requestAnimationFrame(gameLoop);
    // Render the stage for the current frame.
    renderer.render(stage);
    //Moves the paddles
    paddlesControl();
    //Moves the ball
    ballMovement()
}
