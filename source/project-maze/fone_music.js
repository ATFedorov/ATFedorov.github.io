let foneMusicButton = document.querySelector("button.fone-music");
let isPlaying = true; // User want to listen fone music (clicked button .fone-music)
let foneMusic = new Audio();
foneMusic.src = `files/fone-music.mp3`;
foneMusic.volume = 0.4;
foneMusic.loop = true;

foneMusicButton.onclick = function() {
  if (isPlaying) {
    
    foneMusic.pause();
    isPlaying = false;
  } else {
    
    foneMusic.play();
    isPlaying = true;
  }
}
