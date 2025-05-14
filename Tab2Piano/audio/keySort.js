// Goal: to sort the mp3 files in the correct order
// From: 0 to 8 octaves to -4 to 4 octaves and remove b's and replace them with "Sharp"
let fs = require("fs");
let path = require("path");

let middleOctave = 4;
let currentMiddleOctaveIndex = 0;

let keys = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"];
let currentKeys = ["C", "CSharp", "D", "DSharp", "E", "F", "FSharp", "G", "GSharp", "A", "ASharp", "B"];

let octaveArray = [0, 1, 2, 3, 4, 5, 6, 7, 8];
let currentOctaveArray = [-4, -3, -2, -1, 0, 1, 2, 3, 4];

let pianoDir = path.join(__dirname, "/piano");

// Get the current keys with the current octave
let flatKeys = octaveArray.map(octave => {
    return keys.map(key => {
        return key + octave;
    });
}).flat();

// Get the current keys with the current octave
let currentKeysFlat = currentOctaveArray.map(octave => {
    return currentKeys.map(key => {
        if(octave === 0){
            return key;
        }
        return octave + key;
    });
}).flat();

// Rename the files in the piano directory to match the current keys
flatKeys.forEach((key, index) => {
    let filePath = path.join(pianoDir, key + ".mp3");
    fs.rename(filePath, path.join(pianoDir, currentKeysFlat[index] + ".mp3"), (err) => {
        if (err) throw err;
        console.log(`Renamed: ${filePath} to ${currentKeysFlat[index]}.mp3`);
    });
});