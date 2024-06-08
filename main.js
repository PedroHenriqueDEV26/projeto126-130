var music1 = ""
var music2 = ""
var pulsoEsqX = 0;
var pulsoEsqY = 0;
var pulsoDirX = 0;
var pulsoDirY = 0;

function preload(){
    music1 = loadSound("musicID.mp3");
    music2 = loadSound("music.mp3");
}

function setup(){
    canvas = createCanvas(450,320);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded)
    poseNet.on("pose", gotPoses)
}

function modelLoaded(){
console.log("modelo carregado")
}

function draw(){
    image(video,0,0,450,320);
    fill("blue")
    circle(pulsoDirX,pulsoDirY, 30)
    fill("red")
    circle(pulsoEsqX,pulsoEsqY,30)
    
}



function gotPoses(results){
    if(results.length > 0){
        console.log(results)

        pulsoDirX = results[0].pose.rightWrist.x
        pulsoDirY = results[0].pose.rightWrist.y

        pulsoEsqX = results[0].pose.leftWrist.x
        pulsoEsqY = results[0].pose.leftWrist.y
    }
}