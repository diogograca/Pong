(function () {

    // Set the width and height of the scene.
    var width = 1280;
    var height = 800;

    // Setup the rendering surface.
    var renderer = new PIXI.CanvasRenderer(width, height);
    renderer.autoResize = true;
    renderer.backgroundColor = 0x000000;//Sets the background for the canvas
    //Stage
    var stage = new PIXI.Stage();

    function setupScenario() {

        var graphics = new PIXI.Graphics();
        var ballSize = 15;
        var borderSize = 20;
        var paddleHeight = 100;
        var paddleWidth = 20;
        var paddleMidPosition = (height / 2) - (paddleHeight / 2);

        graphics.beginFill(0xFFFFFF, 1);       
        //Draws top and bottom border
        graphics.drawRect(0, 0, width, borderSize);        
        graphics.drawRect(0, height - borderSize, width, borderSize);

        //Draws Paddles
        graphics.drawRect(5, paddleMidPosition, paddleWidth, paddleHeight);
        graphics.drawRect(width - paddleWidth - 2, paddleMidPosition, paddleWidth, paddleHeight);

        //Draws ball
        graphics.drawRect((width / 2) + (ballSize / 2), (height / 2) + (ballSize / 2), ballSize, ballSize);
        stage.addChild(graphics);
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
    }

})();