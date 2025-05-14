// For anyone reading this: I couldn't find a public repo with guitar sounds, so I used a piano sound for the guitar as well. If you have a better solution, please let me know!

// Function to play audio for the piano/guitar keys
function playAudio(keyName, instrument) {
    // # causes issues with the audio file name, so we replace it with "Sharp" to prevent errors
    let dir = `audio/${instrument}/${keyName.replace("#", "Sharp")}.mp3`;
    let audio = new Audio(dir);
    audio.play();
}

// Wait for the piano to be rendered before adding event listeners
document.addEventListener("pianoRendered", function() {
    let keys = document.querySelectorAll(".key");

    // Add event listeners to the keys to play audio when clicked
    keys.forEach(function(key) {
        let keyName = key.id;
        key.addEventListener("click", function() {
            playAudio(keyName, "piano");
        });
    });

    let frets = document.querySelectorAll(".fretInput");
    let strings = document.querySelectorAll(".stringInput");

    // Add event listeners to the fret and string inputs to play audio when the user inputs a value
    frets.forEach(function(fret, index) {
        fret.addEventListener("input", function() {
            let stringKey = strings[index].value;
            let fretValue = fret.value;
            if(fretValue.trim() !== "") {
                let keyName = tab2piano(stringKey, fretValue, index);
                if (keyName) {
                    playAudio(keyName, "piano");
                }
            }
        });

        strings[index].addEventListener("input", function() {
            let stringKey = strings[index].value;
            let fretValue = fret.value;
            if(fretValue.trim() !== "") {
                let keyName = tab2piano(stringKey, fretValue, index);
                if (keyName) {
                    playAudio(keyName, "piano");
                }
            }
        });
    });
});