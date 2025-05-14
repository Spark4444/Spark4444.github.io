class Audio {
    //Tracks
    tracks = [
        document.querySelector("#audio"),
        document.querySelector("#audio1"),
        document.querySelector("#audio2"),
        document.querySelector("#audio3"),
        document.querySelector("#audio4"),
        document.querySelector("#audio5"),
        document.querySelector("#audio6"),
        document.querySelector("#audio7"),
        document.querySelector("#audio8"),
        document.querySelector("#audio9"),
        document.querySelector("#audio10"),
        document.querySelector("#audio11"),
        document.querySelector("#audio12"),
        document.querySelector("#audio13"),
        document.querySelector("#audio14"),
        document.querySelector("#audio15")
    ]

    constructor() { this.pauseAll(); }

    //Pauses every track
    pauseAll(){
        this.tracks.forEach(function(track) {
            track.pause();
            track.volume = volume.value / 100;
        }, this);
    }

    //Plays every track
    playAll(){
        this.tracks.forEach(function(track) {
            track.play();
            track.volume = volume.value / 100;
        }, this);
    }

    //Pauses a track
    pause(index){
        this.tracks[index].pause();
    }

    //Plays a track
    play(index){
        this.tracks[index].play();
    }

    //Resets a track
    reset(index){
        this.tracks[index].currentTime = 0;
    }

    //Changes volume of the track
    volumeAll(value){
        this.tracks.forEach(function(track) {
            track.volume = value / 100;
        }, this);
    }

    //Changes volume of the track
    volume(index, value){
        this.tracks[index].volume = value;
    }

    //Mutes a track
    mute(index){
        this.tracks[index].muted = true;
    }

    //Unmutes a track
    unmute(index){
        this.tracks[index].muted = false;
    }
}

const audio = new Audio();