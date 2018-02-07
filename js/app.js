// Enemies our player must avoid
var Enemy = function(x,y) {
    this.x = x;
    this.y = y;
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if(this.x < 606){
    this.x += dt * this.speed * 101;
  } else {}
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x,y) {
  this.x = x;
  this.y = y;
  this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function() {

};

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//use arrows to control the movement of character
//range binding with the game board
Player.prototype.handleInput = function(key) {
  switch(key) {
    case "left":
      if(this.x >= 101){
      this.x -= 101;
      }else {}
      break;
      
    case "right":
      if(this.x <= 303){
      this.x += 101;
      }else{}
      break;
      
    case "up":
      if(this.y >= 60){
      this.y -= 83;
      }else{}
      break;
      
    case "down":
      if(this.y <= 309){
      this.y += 83;
      }else{}
      break;
  }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [];

//enemy spawn with num
function enemiesSpawn(num) {
  var randomX, randomY;
  for(var i = 0; i<num; i++){
    randomX = -(Math.floor(Math.random() * Math.floor(80))) * 101;
    randomY = (Math.floor(Math.random() * Math.floor(3)))*83 + 60;
    allEnemies[i] = new Enemy(randomX,randomY);
    console.log(num);
  }
}

//Generate random speed factor of the speed of the bugs (random from 1 to 3)
function speedFactor(){
  for(var i = 0; i < allEnemies.length; i++){
  allEnemies[i].speed = Math.floor(Math.random() * Math.floor(4)) +1;
  }
}

//initiate the postion of character
var player = new Player(202,83*4+60);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    var key = allowedKeys[e.keyCode];
    player.handleInput(key);
});

var winCount = 0;
//the event checking for conditions
function checkCollisions(){
   var girl = 'image/char-pink-girl.png';
   for(var i = 0; i < allEnemies.length; i++){
   if(player.y == allEnemies[i].y && ((player.x >= allEnemies[i].x && player.x < (allEnemies[i].x +101) || (player.x+60 > allEnemies[i].x && player.x+60 <= allEnemies[i].x+101)))){
     //reset();
    player.x = 202;
    player.y = 392;
    console.log("Again!");
   }else if(player.y === -23) {
      //reset();
      player.x = 101;
      player.y = -23;
      winCount = 1;
      console.log("Win!");

   }
  }
}

var Victory = function(){
  this.sprite1 = 'images/char-pink-girl.png';
  this.sprite2 = 'images/Heart.png';
};

Victory.prototype.render = function(){
    if(winCount === 1){
    //the girl appears with heart
    ctx.drawImage(Resources.get(this.sprite2), 202, -23);
    ctx.drawImage(Resources.get(this.sprite1), 303, -23);
    //Victory alert
    ctx.font = "80px Arial";
    ctx.fillStyle = "red";
    ctx.fillText("Victory!",120,200);
    }
};

var victory = new Victory();

var TimeOut = function(){
  this.sprite = 'images/stone-block.png';
};

TimeOut.prototype.render = function() {
  if(winCount === 0 && allEnemies[allEnemies.length-1].x >=505){
    //every grids turns into stone grid
    for (row = 0; row < 6; row++) {
        for (col = 0; col < 5; col++) {
            ctx.drawImage(Resources.get(this.sprite), col * 101, row * 83);
        }
    }
    //Lose message
    ctx.font = "80px Arial";
    ctx.fillStyle = "black";
    ctx.fillText("Loser!",150,200);
  }
};

var timeOut = new TimeOut();
