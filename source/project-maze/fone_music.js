let foneMusicButton = document.querySelector("button.fone-music");
let isPlaying = false;
let foneMusic = new Audio();
foneMusic.src = `files/fone-music.mp3`;
foneMusic.volume = 0.5;
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
