(function () {

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
        e.preventDefault();
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
        ball.drawRect((width / 2) + (ballSize / 2), (height / 2) + (ballSize / 2), ballSize, ballSize);
        ball.endFill();
        //Add paddles and ball to the stage
        stage.addChild(p1Paddle);
        stage.addChild(p2Paddle);
        stage.addChild(ball);
    }

    function paddlesControl() {

        if (87 in keysDown) { // Player1 holding W key Down (go up)
            console.log(p2Paddle.y);
            if (!(p1Paddle.y < borderSize + 10)) {
                p1Paddle.y -= 5;//spaceship.speed * modifier;
            }
        }
        if (83 in keysDown) { // Player1 holding S key Down (go down)
            console.log(p1Paddle.y);
            if (!(p1Paddle.y > (height - borderSize - paddleHeight - 10))) {
                p1Paddle.y += 5;// spaceship.speed * modifier;
            }
        }

        if (38 in keysDown) { // Player 2 holding Up Arrow 
            console.log(p2Paddle.y);
            if (!(p2Paddle.y < borderSize + 10)) {
                p2Paddle.y -= 5;//spaceship.speed * modifier;
            }
        }
        if (40 in keysDown) { // Player holding 2 Down Arrow
            console.log(p2Paddle.y);
            if (!(p2Paddle.y > (height - borderSize - paddleHeight - 10))) {
                p2Paddle.y += 5;// spaceship.speed * modifier;
            }
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
    }
    //Game loop, called at each frame
    function gameLoop() {
        //Loop this function 60 times per second
        requestAnimationFrame(gameLoop);
        // Render the stage for the current frame.
        renderer.render(stage);
        //Moves the paddles
        paddlesControl();
    }

})();