var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");
var width = canvas.getAttribute('width');
var height = canvas.getAttribute('height');

var bgImage = new Image();
var logoImage = new Image();
var playImage = new Image();
var instructImage = new Image();
var settingsImage = new Image();
var creditsImage = new Image();
var shipImage = new Image();

shipImage.src = "images/ship.png";  
bgImage.src = "images/bg.jpg";
logoImage.src = "images/logo.png";
playImage.src = "images/play.png";
instructImage.src = "images/instructions.png";
settingsImage.src = "images/settings.png";
creditsImage.src = "images/credits.png";

var buttonX = [192,110,149,160];
var buttonY = [100,140,180,220];
var buttonWidth = [96,260,182,160];
var buttonHeight = [40,40,40,40];

bgImage.onload = function(){
    context.drawImage(bgImage, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
};
logoImage.onload = function(){
    context.drawImage(logoImage, 50, -10);
}
playImage.onload = function(){
    context.drawImage(playImage, buttonX[0], buttonY[0]);
}
instructImage.onload = function(){
    context.drawImage(instructImage, buttonX[1], buttonY[1]);
}
settingsImage.onload = function(){
    context.drawImage(settingsImage, buttonX[2], buttonY[2]);
}
creditsImage.onload = function(){
    context.drawImage(creditsImage, buttonX[3], buttonY[3]);
}