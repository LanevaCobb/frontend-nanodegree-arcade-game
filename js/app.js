// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y + 55;
    this.speed = speed; //speed
    this.step = 101;

};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if(this.x < this.step * 5) {
      this.x += this.speed * dt;
    }
    else {
      this.x = 0;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.



//Create Player class

class Girl {
  constructor() {
    this.x = 200;
    this.y = 350;
    this.sprite = 'images/char-princess-girl.png';
    this.step = 101; // a step forward
    this.jump = 83; // a jump back
  }
}

const player = new Girl();


Girl.prototype.update = function(dt) {
  for(let enemy of allEnemies){ //Check Collisions
    let collisy = this.x - enemy.x - 15;
    let collisx = this.y - enemy.y - 20;
    let distance = Math.sqrt(collisx * collisx + collisy * collisy);
    if(distance < 25) {
     reset();
    }
  }

  if(this.y > 56) { //Did we make it across?
      reset();
      toggle_modal(); //Displays modal when game is won
  }
};

function reset() { //reset girl to original spot
  player.y = 350;
  player.x = 200;
}

function toggle_modal() { //toggle for the modal- on/off
  var modal = document.querySelector('.popup');
  modal.classList.toggle('popup_hide');
}

toggle_modal(); // toggle off

Girl.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Girl.prototype.handleInput = function(input) { //contols the movement of the player using the keybrd. Sets boundaries as well.

  switch(input) {
    case 'left':
      if (this.x > 0) {
        this.x -= this.step;
      }
      break;
    case 'right':
      if (this.x < this.step * 3) {
        this.x += this.step;
      }
      break;
    case 'up':
      if (this.y > this.jump) {
        this.y -= this.jump;
      }
      break;
    case 'down':
      if (this.y < this.jump * 5) {
        this.y += this.jump;
      }
      break;
  }

};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [enemy1 = new Enemy(-101, 10, 300), enemy2 = new Enemy(-101, 100, 250),
                  enemy3 = new Enemy((-101*2.5), 180, 200)];


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
