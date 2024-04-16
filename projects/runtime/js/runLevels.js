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
  

    function createSawBlade(x, y, damage){
      var hitZoneSize = 25;
    var damageFromObstacle = damage;
    var sawBladeHitZone = game.createObstacle(hitZoneSize, damageFromObstacle);
    sawBladeHitZone.x = x;
    sawBladeHitZone.y = y;
    game.addGameItem(sawBladeHitZone);
    var obstacleImage = draw.bitmap("img/sawblade.png");
    sawBladeHitZone.addChild(obstacleImage);
    obstacleImage.x = -25;
    obstacleImage.y = -25;
    }

    function createEnemy(x, y){
      var enemy = game.createGameItem("enemy", 25);
      var redSquare = draw.rect(50, 50, "red");
      redSquare.x = -25;
      redSquare.y = -25;
      enemy.addChild(redSquare);
      enemy.x = x;
      enemy.y = y;
      game.addGameItem(enemy);
      enemy.velocityX = -4;
      enemy.rotationalVelocity = 0;

      
      enemy.onPlayerCollision = function () {
        game.changeIntegrity(-20);
      };

      enemy.onProjectileCollision = function (){
        game.increaseScore(100);
        enemy.shrink();
      }

      

    }

    function createReward(x, y){
      var reward = game.createGameItem("enemy", 25);
      var blueSquare = draw.rect (50, 50, "blue");
      blueSquare.x = -25;
      blueSquare.y = -25;
      reward.addChild(blueSquare);
      reward.x = x;
      reward.y = y;
      game.addGameItem(reward);
      reward.velocityX = -4;


      reward.onPlayerCollision = function (){
        game.changeIntegrity(100);
        game.IncreaseScore(100);
        reward.shrink();
      };

      reward.onProjectileCollision = function (){
       // game.increaseScore(10);
       // reward.shrink();
      }
    }

    function createMarker(x, y){
      var marker = game.createGameItem("marker", 25);
      var yellowSquare = draw.rect(50, 50, "yellow");
      yellowSquare.x = -25;
      yellowSquare.y = -25;
      enemy.addChild(yellowSquare);
      enemy.x = x;
      enemy.y = y;
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
