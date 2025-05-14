//Varaibles initilization
let projectiles = document.querySelector(".particles");
let checkCollisionWithPlayer;
let attackInterval;
let hitbox;
let iteration;
let projectile;
let endOfTheAttack;
let bombTimeout;
let mettatonBottom = (window.innerHeight - 0.5 * window.innerWidth)/2 + (0.5 * window.innerWidth) * 0.545;
let canvasBottom = (window.innerHeight - 0.5 * window.innerWidth)/2 + (0.5 * window.innerWidth) * 0.795;

//Attack 1 (mettaton attacks you with his legs randomly)
function attack1(){
  let legsUp = mettatonBottom - window.innerWidth * 0.189;
  let legsDown = canvasBottom - window.innerWidth * 0.189;
  projectiles.innerHTML = `
  <div class="leg1 legs" style="left:${randomRange(23,71)}%; top:${legsUp}px;">
  <img src="img/leg1.png" style="width: 100%;" alt="">
  <div class="hitbox" style="position: absolute; width: 44%; height: 76%; left: 30%; top: 3%;"></div>
  <div class="hitbox" style="position: absolute; width: 26%; height: 10%; left: 34%; top: 88%;"></div>
  <div class="hitbox" style="position: absolute; width: 33%; height: 9%; left: 41%; top: 79%;"></div>
  <div class="hitbox" style="position: absolute; width: 16%; height: 19%; left: 74%; top: 59%;"></div>
  </div>
  <div class="leg2 legs" style="left:${randomRange(23,71)}%; top:${legsUp}px;">
  <img src="img/leg2.png" style="width: 100%;" alt="">
  <div class="hitbox" style="position: absolute; width: 44%; height: 76%; left: 30%; top: 3%;"></div>
  <div class="hitbox" style="position: absolute; width: 26%; height: 10%; left: 41%; top: 88%;"></div>
  <div class="hitbox" style="position: absolute; width: 33%; height: 9%; left: 28%; top: 79%;"></div>
  <div class="hitbox" style="position: absolute; width: 16%; height: 19%; left: 14%; top: 59%;"></div>
  </div>    
  `;
  x = 47;
  y = 31;
  moveX = 0;
  moveY = 0;
  mettatonGIF.style.opacity = "0";
  projectile = document.querySelectorAll(".legs");
  hitbox = document.querySelectorAll(".hitbox");
  iteration = 1;
  drawHeart(x, y);

  function moveLegs(){
    if(iteration%3 === 1){
      projectile[0].style.top = `${legsDown}px`;
      projectile[1].style.top = `${legsDown}px`;
    }
    else if(iteration%3 === 2){
      projectile[0].style.top = `${legsUp}px`;
      projectile[1].style.top = `${legsUp}px`;
    }
    else if(iteration%3 === 0 && iteration != 0){
      projectile[0].style.left = `${randomRange(23,71)}%`
      projectile[1].style.left = `${randomRange(23,71)}%`
    }
    iteration++;
  }

  attackInterval = setInterval(moveLegs, 333);

  checkCollisionWithPlayer = setInterval(() => {
  moveHeart();
  if(!attackThrottle){
  checkCollision(hitbox, player, 20, false, false);
  }
  }, 10);

  endOfTheAttack = setTimeout(() => {
    appear("* Stage lights are blaring");
  }, 9999);
}

//Attack 2 (mettaton shoots lightning bolts at you while covering the stage)
function attack2(){
  projectiles.innerHTML = `<img src="img/smoke.png" class="smoke" style="opacity:0; top:${mettatonBottom}px" alt="">`;
  x = 47;
  y = 31;
  moveX = 0;
  moveY = 0;
  mettatonGIF.style.filter = "brightness(50%)";
  setTimeout(() => {
    document.querySelector(".smoke").style.opacity = "1";
  }, 10);
  iteration = 0;
  drawHeart(x, y);
  
  function shootLightning(){
    let point1 = { x: `${randomRange(0,window.innerWidth * 0.97)}px`, y: `${randomRange(0,mettatonBottom - window.innerWidth* 0.045)}px` };//initial position of element
    let point2 = { x: `${randomRange(window.innerWidth * 0.24,window.innerWidth * 0.73)}px`, y: `${randomRange(mettatonBottom,canvasBottom - window.innerWidth* 0.045)}px` };//it moves to this position
    iteration++;
    if(iteration == 10){
      iteration = 1;
    }
    let startX = parseInt(point2.x) * window.innerWidth / 100;
    let endX = parseInt(point1.x) * window.innerWidth / 100;
    let startY = parseInt(point2.y) * document.documentElement.scrollHeight / 100;
    let endY = parseInt(point1.y) * document.documentElement.scrollHeight / 100;
    let angle = calculateAngle(startY, endY, startX, endX);
    projectiles.innerHTML += `<img src="img/lightning.gif" id="${iteration}" class="lightning" alt="" style="left:${point1.x}; top:${point1.y};rotate:${angle}deg">`;
    setTimeout(() => {
    if(iteration < 11){
    projectile = document.querySelectorAll(`#\\3${iteration}`);
    }

    projectile[projectile.length - 1].style.left = `${point2.x}`;
    projectile[projectile.length - 1].style.top = `${point2.y}`;
    }, 10);

    setTimeout(() => {
      projectile[projectile.length - 1].style.opacity = `0`;
    }, 500);
  }

  attackInterval = setInterval(shootLightning, 600);

  
  checkCollisionWithPlayer = setInterval(() => {
    moveHeart();
    if(!attackThrottle){
      checkCollision(projectile, player, 15, false, false);
    }
  }, 10);
  
  endOfTheAttack = setTimeout(() => {
    mettatonGIF.style.filter = "";
    appear("* Stage lights are blaring");
  }, 11900);
}

//Attack 3 (mettatons hand shoots lasers randomly)
function attack3(){
  projectiles.innerHTML = `<img src="img/hand.png" class="hand1" style="top:1000%; left:1000%;">`;
  mettatonGIF.style.opacity = "0";
  x = 47;
  y = 31;
  moveX = 0;
  moveY = 0;
  let hand = document.querySelector(".hand1"); 
  drawHeart(x, y);

  function moveHand(){
    hand = document.querySelector(".hand1"); 
    if(randomPick(0,1) == 1){
      let randomNum = randomRange(23,71);
      hand.style.top = `5%`;
      hand.style.left = `${randomNum}%`;
      hand.style.transform = ``;
      setTimeout(() => {
        projectiles.innerHTML += `<div class="laser" id="${randomPick3("White","Blue","Orange")}" style="top: ${window.innerHeight * 0.05 + window.innerWidth * 0.133}px; left:${randomNum + 2.3}%"></div>`;
        setTimeout(() => {
          projectile = document.querySelectorAll(".laser");
          projectile[projectile.length-1].style.height = "100vh";
        },50);
      }, 500);
    }
    else{
      randomNum = randomRange(mettatonBottom - window.innerWidth * 0.017,canvasBottom - window.innerWidth * 0.045); 
      hand.style.left = `90%`;
      hand.style.top = `${randomNum}px`;
      hand.style.transform = `rotate(90deg)`;
      setTimeout(() => {
        projectiles.innerHTML += `<div class="laser" id="${randomPick3("White","Blue","Orange")}" style="top: ${randomNum + window.innerWidth * 0.045 / 2}px; left:76.5%"></div>`;
        setTimeout(() => {
        projectile = document.querySelectorAll(".laser");
        projectile[projectile.length-1].style.width = "77%"; 
        projectile[projectile.length-1].style.left = "0%"; 
        },50);
     }, 500);
    }
  }

  moveHand();

  attackInterval = setInterval(moveHand, 1000);

  checkCollisionWithPlayer = setInterval(() => {
    moveHeart();
    if(!attackThrottle){
      projectile = document.querySelectorAll(".laser");
      checkCollision(projectile, player, 30, false, true);
    }
  }, 10);

  endOfTheAttack = setTimeout(() => {
    appear("* Stage lights are blaring");
  }, 11999);
}

//Attack 4 (mettatons hand follows you around)
function attack4(){
  projectiles.innerHTML = `
  <div class="hand2" style="left: 47%; top:194.07301948051952px">
  <img src="img/hand2.png" style="width: 100%;">
  <div class="hitbox" style="position: absolute; top: 0%; left: 17%; width: 63%; height: 49%"></div>
  <div class="hitbox" style="position: absolute; top: 9%; left: 80%; width: 15%; height: 16%;"></div>
  <div class="hitbox" style="position: absolute; top: 49%; left: 26%; width: 39%; height: 24%;"></div>
  <div class="hitbox" style="position: absolute; top: 57%; left: 5%; width: 21%; height: 22%;"></div>
  <div class="hitbox" style="position: absolute; top: 73%; left: 26%; width: 31%; height: 24%;"></div>
  </div>
  `;
  mettatonGIF.style.opacity = "0";
  x = 47;
  y = 31;
  moveX = 0;
  moveY = 0;
  iteration = 0;
  projectile = document.querySelector(".hand2");
  let hand2 = document.querySelector(".hand2");
  hitbox = document.querySelectorAll(".hitbox");
  drawHeart(x, y);

  function moveHand2(){
    iteration++;
    if(iteration % 3 === 1){
      projectile.style.top = `${canvasBottom - window.innerWidth*0.045/77*277}px`;
    }
    if(iteration % 3 === 2){
      projectile.style.top = `${mettatonBottom - window.innerWidth*0.045/77*277}px`;
    }
    if(iteration % 3 === 0){
      projectile.style.left = `${player.getBoundingClientRect().left+window.innerWidth*0.49*0.04/2 - window.innerWidth*0.045/2}px`;
    }
  }

  setTimeout(() => {
  attackInterval = setInterval(moveHand2,250);
  }, 400);

  checkCollisionWithPlayer = setInterval(() => {
    moveHeart();
    if(!attackThrottle){
      checkCollision(hitbox, player, 30, false, false);
    }
  }, 10);

  endOfTheAttack = setTimeout(() => {
    appear("* Stage lights are blaring");
  }, 12000);
}

//Attack 5 (metaton shoots lasers out of his head)
function attack5(){
  mettatonGIF.style.opacity = "1";
  x = 47;
  y = 31;
  moveX = 0;
  moveY = 0;
  let distanceToEyes = (window.innerHeight - 0.5 * window.innerWidth)/2 + window.innerWidth * 0.068;
  drawHeart(x, y);

  function headShootsLasers(){
    let startX = player.getBoundingClientRect().top;
    let endX = distanceToEyes;
    let startY = player.getBoundingClientRect().left;
    let endY = window.innerWidth * 0.48;
    let angle = calculateAngle(startX, endX, startY, endY);
    projectiles.innerHTML += `<div class="headLaser" id="${randomPick3("White","Blue","Orange")}" style="top:${distanceToEyes}px; rotate:${angle}deg"></div>`;
    
    setTimeout(() => {
    projectile = document.querySelectorAll(".headLaser");
    projectile[projectile.length - 1].style.left = `${player.getBoundingClientRect().left * 2 - window.innerWidth * 0.48}px`;
    projectile[projectile.length - 1].style.top = `${player.getBoundingClientRect().top * 2 - distanceToEyes}px`;
    setTimeout(() => {
      projectile[projectile.length - 1].style.opacity = 0; 
    }, 350);
    }, 10);
  }

  attackInterval = setInterval(headShootsLasers, 710);

  checkCollisionWithPlayer = setInterval(() => {
    moveHeart();
    if(!attackThrottle){
      projectile = document.querySelectorAll(".headLaser");
      checkCollision(projectile, player, 20, false, true);
    }
  }, 10);

  endOfTheAttack = setTimeout(() => {
    appear("* Stage lights are blaring");
  }, 10649);
} 

//Attack 6 (mettaton dashes with his leg at you randomly)
function attack6(){
  let laserColor = randomPick("Blue","Orange");
  projectiles.innerHTML = `
  <div class="legDash">
  <img src="img/leg${laserColor}.png" style="width:100%">
  <div class="hitbox" id="${laserColor}" style="position: absolute; width: 44%; height: 76%; left: 30%; top: 3%;"></div>
  <div class="hitbox" id="${laserColor}" style="position: absolute; width: 26%; height: 10%; left: 34%; top: 88%;"></div>
  <div class="hitbox" id="${laserColor}" style="position: absolute; width: 33%; height: 9%; left: 41%; top: 79%;"></div>
  <div class="hitbox" id="${laserColor}" style="position: absolute; width: 16%; height: 19%; left: 74%; top: 59%;"></div>
  </div>`;
  mettatonGIF.style.opacity = "0";
  x = 47;
  y = 31;
  moveX = 0;
  moveY = 0;
  iteration = 0;
  let legPosition = 1;
  hitbox = document.querySelectorAll(".hitbox");
  projectile = document.querySelector(".legDash");
  drawHeart(x, y);

  function dashLeg(){
    iteration++;
    if(iteration%3 == 1){
      projectile.classList.add("legDashRight");
    }
    if(iteration%3 == 2){
      projectile.classList.remove("legDashRight");
    }
    if(iteration%3 == 0){
      if(legPosition == 0){
        legPosition = 1
      }
      else if(legPosition == 1){
        legPosition = randomRange(0,2);
      }
      else if(legPosition == 2){
        legPosition = 1
      }
      if(legPosition == 1){
        projectile.style.top = "";
        laserColor = randomPick("Blue","Orange");
      }
      if(legPosition == 0 || legPosition == 2){
        laserColor = "White";
      }
      projectile.querySelector("img").src = `img/leg${laserColor}.png`;
      hitbox.forEach(element => {
        element.setAttribute('id', `${laserColor}`);
      });
      if (legPosition == 0) {
        projectile.style.top = `${(canvasBottom - mettatonBottom)*0.6666+mettatonBottom - window.innerWidth*0.18919}px`;
      }
      if (legPosition == 2) {
        projectile.style.top = `${(canvasBottom - mettatonBottom)*0.3333+mettatonBottom}px`;
      }
    }
  }

  attackInterval = setInterval(dashLeg, 500);

  checkCollisionWithPlayer = setInterval(() => {
    moveHeart();
    if(!attackThrottle){
      checkCollision(hitbox, player, 20, false, true);
    }
  }, 10);

  endOfTheAttack = setTimeout(() => {
    appear("* Stage lights are blaring");
  }, 20000);
}

//attack 7 (mettaton shoots bobms at you)
function attack7(){
  projectiles.innerHTML = ``;
  mettatonGIF.style.opacity = "1";
  x = 47;
  y = 31;
  moveX = 0;
  moveY = 0;
  drawHeart(x, y);

  function spawnBombs(){
    let bombDistance = `${randomRange(23,69)}%`;
    projectiles.innerHTML += `
    <div style="top: ${(window.innerHeight - window.innerWidth*0.50)/2+window.innerWidth*0.07}px" class="bomb">
    <img src="img/bomb.gif" style="width:100%">
    <div class="hitbox" style="position: absolute; width: 70%; height: 60%; left: 0%; top: 38%; "></div>
    <div class="hitbox" style="position: absolute; width: 23%; height: 11%; left: 23%; top: 27%; "></div>
    <div class="hitbox" style="position: absolute; width: 53%; height: 17%; left: 30%; top: 10%; "></div>
    <div class="hitbox" style="position: absolute; width: 16%; height: 19%; left: 83%; top: 2%; "></div>
    </div>`;
    setTimeout(() => {
      projectile = document.querySelector(".bomb");
      projectile.style.left = bombDistance;
      projectile.style.top = `${canvasBottom - window.innerWidth * 0.1355}px`;
      bombTimeout = setTimeout(() => {
        audio.reset(13);
        audio.play(13);
        projectile.innerHTML = `<img src="img/explosion.gif" style="width:100%">`;
        projectile.classList.remove("bomb");
        projectile.style.top = ``;
        projectile.style.left = `${parseInt(bombDistance) - 5}%`;
        projectile.classList.add("explosion");
        projectile.style.top = `${canvasBottom-window.innerWidth * 0.1495}px`;
          setTimeout(() => {
          projectile.classList.add("transition");
          projectile.style.width = `0%`;
          projectile.style.top = `${canvasBottom-window.innerWidth*0.056}px`;
          projectile.style.left = `${parseInt(projectile.style.left) + 9}%`;
            setTimeout(() => {
              projectile.remove();  
            }, 900);
          }, 10);
        }, 1000);
    }, 10);
  }

  spawnBombs();
  attackInterval = setInterval(spawnBombs, 2020);

  checkCollisionWithPlayer = setInterval(() => {
    moveHeart();
    if(!attackThrottle){
      let bombs = document.querySelectorAll(".bomb");
      let explosions = document.querySelectorAll(".explosion");
      if (explosions !== null){
      checkCollision(explosions, player, 20, false, false);
      }
      if(bombs !== null){
        checkCollision(bombs, player, 10, true, false);
      }
    }
  }, 10);

  endOfTheAttack = setTimeout(() => {
    appear("* Stage lights are blaring");
  }, 20000);
}

//attack 8 (mettaton shoots rockets at you)
function attack8(){
  projectiles.innerHTML = `
  <div class="wing1 wings">
  <img src="img/wing1.png" style="width:100%">
  <div class="hitbox" style="position: absolute; width: 67%; height: 41%; left: 22%; top: 10%;"></div>
  <div class="hitbox" style="position: absolute; width: 6%; height: 29%; left: 89%; top: 20%;"></div>
  <div class="hitbox" style="position: absolute; width: 5%; height: 13%; left: 95%; top: 29%;"></div>
  <div class="hitbox" style="position: absolute; width: 65%; height: 9%; left: 22%; top: 51%;"></div>
  <div class="hitbox" style="position: absolute;width: 58%;height: 9%; left: 22%; top: 60%;"></div>
  <div class="hitbox" style="position: absolute; width: 50%; height: 9%; left: 22%; top: 69%;"></div>
  </div>
  <div class="wing2 wings">
  <img src="img/wing2.png"  style="width:100%">
  <div class="hitbox" style="position: absolute; width: 67%; height: 41%; left: 11%; top: 10%;"></div>
  <div class="hitbox" style="position: absolute; width: 6%; height: 29%; left: 5%; top: 20%;"></div>
  <div class="hitbox" style="position: absolute; width: 5%; height: 13%; left: 0%; top: 29%;"></div>
  <div class="hitbox" style="position: absolute; width: 65%; height: 9%; left: 13%; top: 51%;"></div>
  <div class="hitbox" style="position: absolute; width: 58%; height: 9%; left: 20%; top: 60%;"></div>
  <div class="hitbox" style="position: absolute; width: 50%; height: 9%; left: 28%; top: 69%;"></div>
  </div>`;
  mettatonGIF.style.opacity = "0";
  x = 47;
  y = 31;
  moveX = 0;
  moveY = 0;
  iteration = 0;
  let rocketLeft;
  hitbox = document.querySelectorAll(".hitbox");
  let wings = document.querySelectorAll(".wings");
  setTimeout(() => {
    wings[0].classList.add("wingsDown");
    wings[1].classList.add("wingsDown");
  }, 10);
  drawHeart(x, y);

  function shootRockets(){
    iteration = 0;
    rocketLeft = 33;
    let randomRocket = randomRange(2,4);
    while(iteration < 6){
      iteration++;
      rocketLeft += 4.5;
      if(iteration !== randomRocket){
      projectiles.innerHTML += `<img src="img/rocket.gif" class="rocket" style="left: ${rocketLeft}%; top:-8vw;">`;
      }
      if(iteration == 5){
        setTimeout(() => {
          projectile.forEach(rocket => {
            rocket.style.top = "100%";
          });
        }, 10);
        setTimeout(() => {
          projectile.forEach(rocket => {
            rocket.remove();
          });
        }, 1900);
      }
    }
  }

  attackInterval = setInterval(shootRockets, 2000);

  checkCollisionWithPlayer = setInterval(() => {
    moveHeart();
    hitbox = document.querySelectorAll(".hitbox");
    projectile = document.querySelectorAll(".rocket");
    if(!attackThrottle && projectile.length > 1){
      checkCollision(projectile, player, 20, true, false);
      checkCollision(hitbox, player, 20, false, false);
    }
  }, 10);

  endOfTheAttack = setTimeout(() => {
    appear("* Stage lights are blaring");
  }, 19000);
}

//attack 9 (mettatons yellow heart shoots bullets at you)
function attack9(){
  projectiles.innerHTML = `<div class="yellowHeartAnimation" style="opacity: 0; top:${window.innerHeight/2 - window.innerWidth*0.25+window.innerWidth*0.109}px"><img src="img/yellowHeart.png" class="yellowHeart"></div><img src="img/yellowHeartBorder.png" class="yellowHeartBorder" style="opacity: 1; top: ${window.innerHeight/2 - window.innerWidth*0.25+window.innerWidth*0.12}px">`;
  setTimeout(() => {
    mettatonGIF.style.opacity = "0";
  }, 700);
  x = 47;
  y = 31;
  moveX = 0;
  moveY = 0;
  let heartHeight, bulletTimeout;
  let heartWidth = 4;
  let imageSRC = "img/bullet.png";
  let imageRatio = 42/23;
  drawHeart(x, y);

  setTimeout(() => {
  yellowHeart = document.querySelector(".yellowHeartAnimation");
  yellowHeartBorder = document.querySelector(".yellowHeartBorder");
  yellowHeart.style.opacity = "1";
  yellowHeartBorder.style.width = "4.8%"
  yellowHeartBorder.style.left = "47.3%"
  yellowHeartBorder.style.top = `${window.innerHeight/2 - window.innerWidth*0.25+window.innerWidth*0.108}px`

  setTimeout(() => {
    yellowHeartBorder.style.opacity = "0";
    yellowHeart.style.rotate = "90deg";
    yellowHeart.style.left = "82%";
    heartHeight = `${player.getBoundingClientRect().top - window.innerWidth * 0.0152}px`;
    yellowHeart.style.top = heartHeight;
  }, 500);
  }, 10);

  function shootBullets(){
    yellowHeart = document.querySelector(".yellowHeartAnimation");
    yellowHeart.style.top = heartHeight;
    bulletTimeout = setTimeout(() => {
      if(heartWidth == 5.6){
        imageSRC = "img/bigBullet.png";
        imageRatio = 155/83;
        yellowHeart.classList.add("yellowHeartBackground");
      }
      projectiles.innerHTML += `<img class="bullet" src="${imageSRC}" style="left:${84 - heartWidth}%; top:${parseInt(heartHeight)+window.innerWidth*0.025-window.innerWidth/100*heartWidth/imageRatio/2}px; width:${heartWidth}%">`;
      audio.play(11);

      setTimeout(() => {
        heartHeight = `${player.getBoundingClientRect().top - window.innerWidth * 0.0152}px`;
        projectile = document.querySelectorAll(".bullet");
        projectile[projectile.length - 1].style.left = "-16%";
        heartWidth += 0.8;
      }, 10);
    }, 751);
  }
  attackInterval = setInterval(shootBullets, 801);

  checkCollisionWithPlayer = setInterval(() => {
    moveHeart();
    if(!attackThrottle){
      checkCollision(projectile, player, 20, true, false);
    }
  }, 10);

  endOfTheAttack = setTimeout(() => {
    clearTimeout(bulletTimeout);
    audio.mute(12);
    setTimeout(() => {
    audio.unmute(0);
    audio.reset(0);
    audio.play(0);
    }, 500);
    battleSection.style.opacity = "1";
    name.style.opacity = "1";
    lv.style.opacity = "1";
    appear("* Stage lights are blaring");
  }, 12600);
}