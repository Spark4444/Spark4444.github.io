//Initializing variables
let player;
let playerWasDamaged = false;
let attackThrottle = false;
let yMax;
// Set initial position of the player
let x = 35;
let y = 47;
let damage = 0;
let speedX = 0.25;
let speedY = 1;
let moveX = 0;
let moveY = 0;
let playerIsMoving = false;
let orangeLaserTimer;

//Draws the player
function drawHeart(x, y) {
  if(playerFighting){
  if(!playerWasDamaged){
  playerMovementBox.innerHTML = `<img class="player" src="img/heart.png" alt="">`;
  }
  player = document.querySelector(".player");
  player.style.top = `${y}%`;
  player.style.left = `${x}%`;
  }
}

//Checks for collision
function checkCollision(elements, target, damage, deletable, laser) {
  if (playerFighting) {
    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];
      const elemRect = element.getBoundingClientRect();
      const targetRect = target.getBoundingClientRect();
      if (elemRect.top <= targetRect.bottom && elemRect.bottom >= targetRect.top && elemRect.left <= targetRect.right && elemRect.right >= targetRect.left) {
        const id = element.id.toLowerCase();
        if (!attackThrottle) {
          let amountOfHP;
          if (id === 'white' || !laser) {
            if(deletable){
              element.remove();
              clearInterval(bombTimeout);
            }
            attackThrottle = true;
            amountOfHP = parseInt(parseInt(playersHPString) - damage);
            damageTaken += damage;
            damageTakenTimes++;
            playersHPString = amountOfHP.toString();
            showHP();
            audio.reset(8);
            audio.play(8);
            player.classList.add("flash");
            playerWasDamaged = true;
            setTimeout(function() {
              playerWasDamaged = false;
              player.classList.remove("flash");
              attackThrottle = false;
            }, 500);
          } 
          else if (id === 'orange') {
            if (playerIsMoving) {
              clearTimeout(orangeLaserTimer);
              continue;
            }
            else {
              if (!attackThrottle) {
                if(deletable){
                  element.remove();
                  clearInterval(bombTimeout);
                }
                attackThrottle = true;
                orangeLaserTimer = setTimeout(function() {
                  amountOfHP = parseInt(parseInt(playersHPString) - damage);
                  damageTaken += damage;
                  damageTakenTimes++;
                  playersHPString = amountOfHP.toString();
                  showHP();
                  audio.reset(8);
                  audio.play(8);
                  player.classList.add("flash");
                  playerWasDamaged = true;
                  setTimeout(function() {
                    playerWasDamaged = false;
                    player.classList.remove("flash");
                    attackThrottle = false;
                  }, 250);
                }, 250);
              }
            }
          } else if (id === 'blue') {
            if (playerIsMoving) {
              if(deletable){
                element.remove();
                clearInterval(bombTimeout);
              }
              attackThrottle = true;
              amountOfHP = parseInt(parseInt(playersHPString) - damage);
              damageTaken += damage;
              damageTakenTimes++;
              playersHPString = amountOfHP.toString();
              showHP();
              audio.reset(8);
              audio.play(8);
              player.classList.add("flash");
              playerWasDamaged = true;
              setTimeout(function() {
                playerWasDamaged = false;
                player.classList.remove("flash");
                attackThrottle = false;
              }, 500);
            } 
            else {
              continue; // Player avoids damage by not moving
            }
          }
        }
      }
    }
  }
}

//Checks if the player is out of bounds
function checkBorders() {
  if(playerFighting){
  yMax = 100-(player.offsetWidth*100)/(playerMovementBox.offsetHeight);
  if((moveX == 0.25 || moveX == -0.25) &&(moveY == 1 || moveY == -1)){
    if(96 < x && yMax < y){
      x = 96;
      y = yMax;
    }
    else if(96 < x && y < 0){
      x = 96;
      y = 0;
    }
    else if(0 > x && yMax < y){
      x = 0;
      y = yMax;
    }
    else if(0 > x && y < 0){
      x = 0;
      y = 0;
    }
  }
  if(96 < x){
    x = 96;
  }
  else if(0 > x){
    x = 0;
  }
  else if(yMax < y){
    y = yMax;
  }
  else if(y < 0){
    y = 0;
  }
}
}

//Movement of the player
function moveHeart() {
  if(playerFighting && pressedContinue){
  checkBorders();
  x += moveX;
  y += moveY;
  drawHeart(x, y);
  }
}

//Checks if the player is moving
setInterval(() => {
  if(playerFighting){
  if(moveX == 0 && moveY == 0){
    playerIsMoving = false;
  }
  if(moveX !== 0 || moveY !== 0){
    playerIsMoving = true;
  }
  }
},10);

//AWSD key listeners for movement
document.addEventListener('keydown', e => {
  if (playerFighting){
    switch (e.keyCode) {
      case 65: // A
      case 37: // ArrowLeft
        moveX = -speedX;
        moveHeart();
        break;
      case 68: // D
      case 39: // ArrowRight
        moveX = speedX;
        moveHeart();
        break;
      case 87: // W
      case 38: // ArrowUp
        moveY = -speedY;
        moveHeart();
        break;
      case 83: // S
      case 40: // ArrowDown
        moveY = speedY;
        moveHeart();
        break;
      default:
        break;
    }
  }
});

//AWSD keys listeners
document.addEventListener('keyup', e => {
  if (playerFighting){
    switch (e.keyCode) {
      case 65: // A
      case 37: // ArrowLeft
        if (moveX < 0) moveX = 0;
        break;
      case 68: // D
      case 39: // ArrowRight
        if (moveX > 0) moveX = 0;
        break;
      case 87: // W
      case 38: // ArrowUp
        if (moveY < 0) moveY = 0;
        break;
      case 83: // S
      case 40: // ArrowDown
        if (moveY > 0) moveY = 0;
        break;
      default:
        break;
    }
  }
});
