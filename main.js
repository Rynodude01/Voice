x = 0;
y = 0;
screen_height = 0;
screen_width = 0;
draw_dice = "";
dice = "";
speak_data = "";
number = 0;
function preload(){
    dice = loadImage("download.jpg");
}
var SpeechRecognition = window.webkitSpeechRecognition;
var recognition = new SpeechRecognition();
function start(){
    document.getElementById("status").innerHTML = "System is listening, please talk.";
    recognition.start();
}
recognition.onresult = function(event){
    console.log(event);
    content = event.results[0][0].transcript;
    document.getElementById("status").innerHTML = "The speech has been recognised "+content;
    number = Number(content);
    if(Number.isInteger(number)){
        document.getElementById("status").innerHTML = "Started drawing dice";
        draw_dice = "set";
    }
    else{
        document.getElementById("status").innerHTML = "The speech has not recognitsed a number";
    }
}
function setup(){
    screen_width = window.innerWidth;
    screen_height = window.innerHeight;
    canvas = createCanvas(screen_width,screen_height-150);
    canvas.position(0,150);
}
function draw(){
    if(draw_dice == "set"){
        for(var i = 1;i <= number;i++){
            x = Math.floor(Math.random()*700);
            y = Math.floor(Math.random()*400);
            image(dice,x,y,75,75);
        }
        document.getElementById("status").innerHTML = number+" dice drawn";
        speak_data = number+" dice drawn";
        speak();
        draw_dice = "";
    }
}
function speak(){
    var synth = window.speechSynthesis;
    var utterThis = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis); speak_data = "";
}