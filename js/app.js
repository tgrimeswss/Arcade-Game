"use strict";
//Project completed by Thomas Grimes
//Globals below
let lives = 5;
let lifespan = document.querySelector('.lives');

let level = 1;
let currentLevel = document.querySelector('.level');

let startPosX = 200;
let startPosY = 400;

lifespan.innerHTML = lives;
currentLevel.innerHTML = level;
//------------------------------------------
// Enemy class
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    if (this.x >= 500) {
        this.x = 0;
    }
    //Collision detector below
    if (this.x - player.x < 50 && this.x - player.x > -40 && player.y === this.y) {
        player.collision();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//-----------------------------------------------------------------------------

//Player class.
var Player = function(x, y) {
    this.sprite = 'images/char-boy.png';
    this.x = startPosX;
    this.y = startPosY;
};

//If there is a collision between player and bug, alertbox appears, lives
//variable is decremented and adjusted on the document.
Player.prototype.collision = function() {
  alert('Those bugs can be nasty!');
  lives = lives - 1;
  if (lives === 0) {
      document.write("<h1>Game Over</h1><h3>You ran out of lives! Please refresh to play again.</h3>");
  }
  lifespan.innerHTML = lives;
  this.x = 200;
  this.y = 400;
};

//Drawing the player on the screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//restart function resets the player back to startPosX and startPosY as well
//as decrement 'lives' variable if player messes up. If 'lives are = 0, then'
//there will be a message protrayed on the doc saying 'Game Over!'
Player.prototype.restart = function() {
    if (this.y <= 75) {
        alert('Hooray! You did it!');
        level = level + 1;
        currentLevel.innerHTML = level;
        this.resetPlayer();
    } else {
        alert('Aww shucks. Try to stay on the board!');
        lives = lives - 1;
        lifespan.innerHTML = lives;
        this.resetPlayer();
    }
    if (lives === 0) {
        document.write("<h1>Game Over</h1><h3>You ran out of lives! Please refresh to play again.</h3>");
    }
    if (level > 3) {
        document.write("<h1>Congratulations!</h1><h3>You beat the game!</h3>");
    }
};

//Puts the player back at the starting position
Player.prototype.resetPlayer = function() {
  this.x = startPosX;
  this.y = startPosY;
};

//Below are the 'if' statements running through a users keypad entry
Player.prototype.handleInput = function(e) {
    switch (e) {
        case 'up':
            if (this.y <= 75) {
                this.restart();
                //alert('Hooray! You did it!')
            } else {
                this.y -= 85;
            }
            break;
        case 'down':
            if (this.y >= 395) {
                this.restart();
                //alert('Aww shucks. Try again!')
            } else {
                this.y += 85;
            }
            break;
        case 'left':
            if (this.x <= 0) {
                this.restart();
                //alert('Aww shucks. Try again!')
            } else {
                this.x -= 100;
            }
            break;
        case 'right':
            if (this.x >= 400) {
                this.restart();
                //alert('Aww shucks. Try again!')
            } else {
                this.x += 100;
            }
            break;
    }
};



// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let allEnemies = [new Enemy(0, 60, 175),
  new Enemy(0, 145, 200),
  new Enemy(0, 230, 300),
  new Enemy(0, 315, 150)];

let player = new Player(startPosX, startPosY);



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', (e) => {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
