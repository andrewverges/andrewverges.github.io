var runLevels = function (window) {
  window.opspark = window.opspark || {};

  var draw = window.opspark.draw;
  var createjs = window.createjs;
  let currentLevel = 0;

  window.opspark.runLevelInGame = function (game) {
    // some useful constants
    var groundY = game.groundY;

    // this data will allow us to define all of the
    // behavior of our game
    var levelData = window.opspark.levelData;

    // set this to true or false depending on if you want to see hitzones
    game.setDebugMode(true);

    // TODOs 5 through 11 go here
    // BEGIN EDITING YOUR CODE HERE
  

    function createSawBlade(x, y, damage){            //creates function for the obstacle
      var hitZoneSize = 25;                      //sets a hitzone for the obstacle
    var damageFromObstacle = damage;                     //makes the obstacle deal damage
    var sawBladeHitZone = game.createObstacle(hitZoneSize, damageFromObstacle);            //creates obstacle in the game
    sawBladeHitZone.x = x;            //states the x value for the hitzone
    sawBladeHitZone.y = y;             //states the y value for the hitzone
    game.addGameItem(sawBladeHitZone);            //adds the obstacle to the game
    var obstacleImage = draw.bitmap("img/sawblade.png");         //sets the image for the obstacle
    sawBladeHitZone.addChild(obstacleImage);              //adds the image
    obstacleImage.x = -25;              //sets x value for the obstacle
    obstacleImage.y = -25;               //sets y value for the obstacle
    }

    function createEnemy(x, y){                       //creates function for the enemy
      var enemy = game.createGameItem("enemy", 25);              //creates the enemy in the game
      var redSquare = draw.rect(50, 50, "red");           //draws out a red square to be the enemy
      redSquare.x = -25;                //sets the x value for the red square
      redSquare.y = -25;                //sets the y value for the red square
      enemy.addChild(redSquare);           //adds the red square to the game
      enemy.x = x;            //sets x value for the enemy
      enemy.y = y;             //sets y value for the enemy
      game.addGameItem(enemy);         //adds the enemy to the game
      enemy.velocityX = -4;        //speeds up the enemy to the left side of the screen
      enemy.rotationalVelocity = 0;         //can let the square spin around

      
      enemy.onPlayerCollision = function () {            //creates function for when the player collide with the enemy
        game.changeIntegrity(-20);    //when the player hits the enemy, they will lose 20 health
      };

      enemy.onProjectileCollision = function (){         //creates function for when the player shoots the nemy
        game.increaseScore(100);      //when the player shoots the enemym they will gain 100 points
        enemy.shrink();        //when the enemy is shot, it will shrink off the screen
      }

      

    }

    function createReward(x, y){                       //creates function for the reward
      var reward = game.createGameItem("enemy", 25);         //creates the award in the game using the same as the enemy
      var blueSquare = draw.rect (50, 50, "blue");   //draaws a blue square
      blueSquare.x = -25;       // sets x value for the blue square
      blueSquare.y = -25;           // sets y value for the blue square
      reward.addChild(blueSquare);          //adds bluesquare to the game
      reward.x = x;      //sets x value for the reward
      reward.y = y;    //sets y value for the reward
      game.addGameItem(reward);         //adds reward to the game
      reward.velocityX = -4;          //speeds up the reward towards the left side of the screen


      reward.onPlayerCollision = function (){         //creates the function for when the player collides with the reward
        game.changeIntegrity(100);   //the player gains 100 health when it collides with the reward
        game.IncreaseScore(100);    // the player gains 100 score when it collides with the reward
        reward.shrink();     //the reward shrinks when it is collided with
      };

      reward.onProjectileCollision = function (){         //creates function for when the reward gets shot
       // game.increaseScore(10);    
       // reward.shrink();
      }
    }

    function createMarker(x, y){            //creates function for the marker
      var marker = game.createGameItem("marker", 25);         //creates the marker in the game
      var yellowSquare = draw.rect(50, 50, "yellow");      //draws a yellow square
      yellowSquare.x = -25;          //sets x value for the yellow square
      yellowSquare.y = -25;          //sets y value for the yellow square
      enemy.addChild(yellowSquare);       //adds yellow sqquare to the game
      enemy.x = x;        //sets x value for the marker
      enemy.y = y;        //sets y value for the marker
      game.addGameItem(marker);
      enemy.velocityX = -4;

      enemy.onPlayerCollision = function () {
        game.changeIntegrity(-20);
      };

      enemy.onProjectileCollision = function (){
        game.increaseScore(100);
        enemy.shrink();
      }

      

    }
//function calls
    createSawBlade(500, groundY - 110, 10);
    createSawBlade(700, groundY - 110, 20);
    createSawBlade(900, groundY - 110, 100);
    
    createEnemy(800, groundY -50);
    createEnemy(1800, groundY - 50);
    createEnemy(2800, groundY - 50);
    createEnemy(4800, groundY - 50);
    createEnemy(6800, groundY - 50);

    createReward(1000, groundY - 110);

    createMarker(2300, groundY -10);


    function startLevel() {
      // TODO 13 goes below here



      //////////////////////////////////////////////
      // DO NOT EDIT CODE BELOW HERE
      //////////////////////////////////////////////
      if (++currentLevel === levelData.length) {
        startLevel = () => {
          console.log("Congratulations!");
        };
      }
    }
    startLevel();
  };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if (
  typeof process !== "undefined" &&
  typeof process.versions.node !== "undefined"
) {
  // here, export any references you need for tests //
  module.exports = runLevels;
}
