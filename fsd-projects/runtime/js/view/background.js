var background = function (window) {
    'use strict';
    
    window.opspark = window.opspark || {};
    var draw = window.opspark.draw;
    var createjs = window.createjs;
    
    /*
     * Create a background view for our game application
     */
    window.opspark.makeBackground = function(app,ground) {
        /* Error Checking - DO NOT DELETE */
        if(!app) {
            throw new Error("Invalid app argument");
        }
        if(!ground || typeof(ground.y) == 'undefined') {
            throw new Error("Invalid ground argument");
        }
        
        // useful variables
        var canvasWidth = app.canvas.width;
        var canvasHeight = app.canvas.height;
        var groundY = ground.y;
        
        // container which will be returned
        var background;
        
        //////////////////////////////////////////////////////////////////
        // ANIMATION VARIABLES HERE //////////////////////////////////////
        //////////////////////////////////////////////////////////////////
        // TODO (several):
        var tree;
        var buildings = [];
        var bgImage1;
        var bgImage2;


      
      
        // called at the start of game and whenever the page is resized
        // add objects for display in background. draws each image added to the background once
        function render() {
            background.removeAllChildren();

            // TODO 1:
            // this currently fills the background with an obnoxious yellow;
            // you should modify both the height and color to suit your game
            var backgroundImage = new Image();
            backgroundImage.src = "img/runtime_background.jpg";

            backgroundImage.onload = function() {
                var bmp1 = new createjs.Bitmap(backgroundImage);
                var bmp2 = new createjs.Bitmap(backgroundImage);

                // Scale to fit height up to groundY
                var scaleY = groundY / backgroundImage.height;
                var scaleX = app.canvas.width / backgroundImage.width;

                bmp1.scaleX = scaleX;
                bmp1.scaleY = scaleY;
                bmp2.scaleX = scaleX;
                bmp2.scaleY = scaleY;

                bmp1.x = 0;
                bmp2.x = app.canvas.width;
                bmp1.y = bmp2.y = 0;

                bgImage1 = bmp1;
                bgImage2 = bmp2;

                background.addChildAt(bgImage1, 0);
                background.addChildAt(bgImage2, 0);
            };
            // TODO 2: - Add a moon and starfield
        
            for(var i = 0; i < 100; i++){
                var circle = draw.circle(3, "white", "LightGray", 2);
                circle.x = canvasWidth * Math.random();
                circle.y = groundY * Math.random();
                background.addChild(circle);
            }

            var moon = draw.bitmap("img/moon.png");
            moon.x = canvasWidth - 250;
            moon.y = groundY - 450;
            moon.scaleX = 0.5;
            moon.scaleY = 0.5;
            background.addChild(moon);

            
            
            // TODO 4: Part 1 - Add buildings!     Q: This is before TODO 4 for a reason! Why?
            for(var i = 0; i < 5; i++){
                var buildingColors = ["lightblue", "green", "yellow", "maroon", "pink"];
                var buildingHeight = 200 * Math.random();
                var building = draw.rect(75, buildingHeight, buildingColors[i], "Black", 1);
                building.x = 200 * i;
                building.y = groundY - buildingHeight;
                background.addChild(building);
                buildings.push(building);
            }
            
            // TODO 3: Part 1 - Add a tree
            tree = draw.bitmap("img/tree.png");
            tree.x = 300;
            tree.y = groundY - 225;
            background.addChild(tree);

            
            
        } // end of render function - DO NOT DELETE
        
        
        // Perform background animation
        // called on each timer "tick" - 60 times per second
        function update() {
            // useful variables
            var canvasWidth = app.canvas.width;
            var canvasHeight = app.canvas.height;
            var groundY = ground.y;
            
            // TODO 3: Part 2 - Move the tree!
            tree.x -= 5;

            if(tree.x < - 250){
                tree.x = canvasWidth + 100
            }
            
            // TODO 4: Part 2 - Parallax

            for(var i = 0; i < buildings.length; i++){
                var building = buildings[i];
                building.x -= 3;
                if(building.x < - 100){
                    building.x = canvasWidth + 100;
                }

            }
             var scrollSpeed = 1;

            
            if (bgImage1 && bgImage2 && bgImage1.image && bgImage2.image) {
                var imageWidth = bgImage1.image.width * bgImage1.scaleX;

                bgImage1.x -= scrollSpeed;
                bgImage2.x -= scrollSpeed;

                if (bgImage1.x + imageWidth <= 0) {
                    bgImage1.x = bgImage2.x + imageWidth;
                }
                if (bgImage2.x + imageWidth <= 0) {
                    bgImage2.x = bgImage1.x + imageWidth;
                }
            }

        } // end of update function - DO NOT DELETE
        
        
        
        /* Make a createjs Container for the background and let it know about the render and upate functions*/
        background = new createjs.Container();
        background.resize = render;
        background.update = update;
        
        /* make the background able to respond to resizing and timer updates*/
        app.addResizeable(background);
        app.addUpdateable(background);
        
        /* render and return the background */
        render();
        return background;
    };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = background;
}
