var init = function (window) {
    'use strict';
    var 
        draw = window.opspark.draw,
        physikz = window.opspark.racket.physikz,
        
        app = window.opspark.makeApp(),
        canvas = app.canvas, 
        view = app.view,
        fps = draw.fps('#000');
        
    
    window.opspark.makeGame = function() {
        
        window.opspark.game = {};
        var game = window.opspark.game;
        
        ////////////////////////////////////////////////////////////
        ///////////////// PROGRAM SETUP ////////////////////////////
        ////////////////////////////////////////////////////////////
        
        // TODO 1 : Declare and initialize our variables
        var circle;         //var to hold a single circle
        var circles = [];       //var to store all circles in on array

        // TODO 2 : Create a function that draws a circle 
        function drawCircle(){                  //allows to draw shapes
            circle = draw.randomCircleInArea( canvas, true, true, "#999", 2); // uses an existing draw function to draw a circle with a random size, color and location
            physikz.addRandomVelocity(circle, canvas); //uses physikz library to provide motion and a random direction and velocity
            view.addChild(circle);       //makes the circle a child of view so it appears on the screen
            circles.push(circle);         // saves circle to an array of circles by pushing it to the end of the array
        }

        // TODO 3 / 7 : Call the drawCircle() function 



        for (var loopsCompleted = 0; loopsCompleted < 200; loopsCompleted++){
            drawCircle();                               // makes 200 circles by looping drawCircle() under the parameters in the for loop
        }

        ////////////////////////////////////////////////////////////
        ///////////////// PROGRAM LOGIC ////////////////////////////
        ////////////////////////////////////////////////////////////
        
        /* 
        This Function is called 60 times/second producing 60 frames/second.
        In each frame, for every circle, it should redraw that circle
        and check to see if it has drifted off the screen.         
        */
        function update() {
            // TODO 4 : Update the circle's position //
           
            //replaced in todo 8/9 with a for loop, using the code that was here before
            
            // TODO 5 / 10 : Call game.checkCirclePosition() on your circles.
         //replaced in todo 8/9 with a for loop, using the code that was here before

            // TODO 8 / 9 : Iterate over the array
           for (var i = 0; i < circles.length; i++){
            physikz.updatePosition(circles[i]);         // makes a way to move all 100 circles and keep all 100 circles within the screen without calling them individually
            game.checkCirclePosition(circles[i]);       //takes the place of the repetative function calls in todo 5 by putting it inside a for loop
           }
            
        }
    
        /* 
        This Function should check the position of a circle that is passed to the 
        Function. If that circle drifts off the screen, this Function should move
        it to the opposite side of the screen.
        */
        game.checkCirclePosition = function(circle) {

            // if the circle has gone past the RIGHT side of the screen then place it on the LEFT
            if ( circle.x > canvas.width ) {
                circle.x = 0;
            }
            
            // TODO 6 : YOUR CODE STARTS HERE //////////////////////
            if( circle.x < canvas.length){       //if the circle has gone past the left side of the screen then place it on the right
                circle.x = 0;
            }
            if(circle.y > canvas.width){    //if the circle has gone past the top side of the screen then place it on the bottom
                circle.y = 0;
            }
            if(circle.y < canvas.length){   //if the circle has gone past the bottom side of the screen then place it on the top
                circle.y = 0;
            }
            // YOUR TODO 6 CODE ENDS HERE //////////////////////////
        }
        
        /////////////////////////////////////////////////////////////
        // --- NO CODE BELOW HERE  --- DO NOT REMOVE THIS CODE --- //
        /////////////////////////////////////////////////////////////
        
        view.addChild(fps);
        app.addUpdateable(fps);
        
        game.circle = circle;
        game.circles = circles;
        game.drawCircle = drawCircle;
        game.update = update;
        
        app.addUpdateable(window.opspark.game);
    }
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = init;
}
