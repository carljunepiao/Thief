function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    
    document.body.appendChild(this.sound);
    
    this.play = function(){
        this.sound.play();
    }
    
    this.stop = function(){
        this.sound.pause();
    }
}

var mySound;
mySound = new sound("vgame.mp3");

mySound.play();

// $('.enter').click(function () {
//     $(this).parent('#splashscreen').fadeOut(500);
// });
document.getElementById("play").onclick = function () {
    location.href = "index.html";
};

