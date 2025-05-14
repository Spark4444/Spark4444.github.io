//Varaibles initilization
let busy = false;
let HPDialogue = false;
let foodDialogue = false;
let pressedContinue = false;

//Function that starts a dialogue with mettaton
function dialogue(){
    if(!attackNumber){
        attackNumber = 0;
    }
    if(!busy){

    chatBox.style.opacity = 1;

    switch(attackNumber){
        case 0:
            typeWriterBox("Get ready for my Neo Legs, the ultimate combination of elegance and power!");
            break;
        case 1:
            typeWriterBox("I'll strike you down with the lightning of my power!");
            break;
        case 2:
            typeWriterBox("Watch as I unleash my impeccable aim and the full fury of my lasers!");
            break;
        case 3:
            typeWriterBox("My NEO Hand will smack you with an unstoppable barrage of blows!");
            break;        
        case 4:
            typeWriterBox("My Neo Head will dazzle you with a barrage of laser beams!");
            break;
        case 5:
            typeWriterBox("Prepare to be crushed under the force of my fabulous leg dash!");
            break;
        case 6:
            typeWriterBox("Ready to be blown away, darling? Enjoy the fireworks kid!");
            break;
        case 7:
            typeWriterBox("Get ready for my stunning missile show, darling!");
            break;        
        case 8:
            typeWriterBox("Did you really think that you were going to beat me, darling?");
            break;
    }
    if(parseInt(playersHPString) < 37 && !HPDialogue){
        HPDialogue = true;
        typeWriterBox("Feeling the pressure, darling? Brace yourself for my ultimate power!");
    }
    if(foodList.length < 5 && !foodDialogue){
        foodDialogue = true;
        typeWriterBox("You're running low on resources, but don't give up yet! The show must go on!");
    }

    if(typeof attackNumber == "number"){
        busy = true;
        pressedContinue = false;
    }
    if(attackNumber == 8){
        audio.mute(0);
        audio.pause(0);
        audio.unmute(9);
        audio.play(9);
    }
    }
}

//Event listener for the user to continue into battle from a dialogue with mettaton
document.addEventListener('keyup', e => {
const key = e.keyCode || e.which;

if(busy){
  switch (key) {
    case 13: // Enter key
    case 90: // Z key
    case 122: // z key
    mettatonBottom = (window.innerHeight - 0.5 * window.innerWidth)/2 + (0.5 * window.innerWidth) * 0.545;
    canvasBottom = (window.innerHeight - 0.5 * window.innerWidth)/2 + (0.5 * window.innerWidth) * 0.795;

    switch(attackNumber){
        case 7:
            attack8();
            break;
        case 6:
            attack7();
            break;
        case 5:
            attack6();
            break;
        case 4:
            attack5();
            break;
        case 3:
            attack4();
            break;
        case 2:
            attack3();
            break;
        case 1:
            attack2();
            break;
        case 0:
            attack1();
            break;
        case 8:
            audio.unmute(12);
            audio.reset(12);
            audio.play(12);
            audio.mute(9);
            audio.pause(9);
            audio.play(10);
            audio.pause(2);
            attack9();
            battleSection.style.opacity = "0";
            lv.style.opacity = "0";
            name.style.opacity = "0";
            break;
    }
    if(typeof attackNumber == "number"){
        clearTimeout(textWrite);
        audio.pause(6);
        chatBox.style.opacity = 0;
        busy = false;
        pressedContinue = true;
        turnsToComplete++;
        if(attackNumber == 8){
            attackNumber = 0;
        }
        else if(attackNumber < 8){
            attackNumber++;
        }
    }
    break;
    default:
    break;
}
}
});