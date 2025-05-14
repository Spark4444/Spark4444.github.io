//Gets a number from a random range
function randomRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//Picks a random value
function randomPick(value, value2) {
    if(Math.floor(Math.random() * (2 - 1 + 1)) + 1 == 1){
        return value;
    }
    else{
        return value2;
    }
}

//Picks a random value from 3
function randomPick3(value, value2, value3) {
  const randomNumber = Math.floor(Math.random() * 3);

  if (randomNumber === 0) {
      return value;
  } else if (randomNumber === 1) {
      return value2;
  } else {
      return value3;
  }
}

//Picks a random value from 3
function randomPick4(num1, num2, num3, num4) {
  let randomNumber = Math.floor(Math.random() * 4);
  if (randomNumber === 0) {
      return num1;
  } else if (randomNumber === 1) {
      return num2;
  } else if (randomNumber === 2) {
      return num3;
  } else {
      return num4;
  }
}

//Gets a random number from two ranges
function randomMultiRange(range1, range2, range3, range4) {
    const ranges = [[range1, range2], [range3, range4]];
    const rangeIndex = Math.floor(Math.random() * ranges.length);
    const range = ranges[rangeIndex];
    return Math.floor(Math.random() * (range[1] - range[0] + 1)) + range[0];
}

function calculateAngle(startY, endY, startX, endX){
  let isLeft, angle;

  let firstLeg = startY - endY;
  let secondLeg = startX - endX; 

  if(secondLeg < 0){
    secondLeg = secondLeg - secondLeg * 2;
    isLeft = true;
  }
  else{
    isLeft = false;
  }

  let hypotenuse = Math.sqrt(firstLeg * firstLeg + secondLeg * secondLeg);

  if(!isLeft){
    angle = Math.acos(firstLeg / hypotenuse) * (180 / Math.PI);
    angle = -angle
  }
  if(isLeft){
    angle = Math.acos(firstLeg / hypotenuse) * (180 / Math.PI);
  }

  return angle
}

// Calculates the percentage of number to total
function calculatePercentage(number, total) {
    return ((number / total) * 100).toFixed(0);
}

//Function that makes letters shake in game
function shakeLetters(){
  let shake = document.querySelectorAll(".shakeElement");
  shake.forEach(shakes => {
    let textInside = shakes.innerHTML;
    shakes.innerHTML = "";
    for(let i = 0;i < textInside.length;i++){
      let letter = textInside[i];
      if(letter == " "){
        shakes.innerHTML += '&nbsp;';
      }
      else{
            shakes.innerHTML += `<div class="word">${letter}</div>`;
      }
    }
  });  
}

setInterval(() => {
  let words = document.querySelectorAll(".word");
  if(words.length != 0){
    if(randomRange(1,2) == 1){
      let randomLetter = randomRange(0,words.length-1);
      words[randomLetter].style.animation = `shake${randomRange(1,4)} 0.1s infinite`;
      setTimeout(() => {
        words.forEach(word => {
          word.style.animation = "";
        });
      }, 100);
    }
    else{
      let randomLetter = randomRange(0,words.length-1);
      let randomLetter2 = randomRange(0,words.length-1);
      words[randomLetter].style.animation = `shake${randomRange(1,4)} 0.1s infinite`;
        words[randomLetter2].style.animation = `shake${randomRange(1,4)} 0.1s infinite`;
      setTimeout(() => {
        words.forEach(word => {
          word.style.animation = "";
        });
      }, 100);
    }
  }
}, randomRange(500,750));

//animate Element function 
function animateElement(element, style, seconds, startValue, endValue) {
  let currentValue = startValue;
  const increment = (endValue - startValue) / (seconds * 60);
  const interval = setInterval(() => {
    if (currentValue >= endValue) {
      clearInterval(interval);
    } else {
      currentValue += increment;
      element.style[style] = currentValue;
    }
  }, 16.67);
}

//Save a value to local storage
function save(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

//Get a value from local storage
function get(key) {
  const value = localStorage.getItem(key);
  return value ? JSON.parse(value) : 0;
}