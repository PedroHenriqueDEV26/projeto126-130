var music1 = ""
var music2 = ""
var scorepulsoDirX = 0;
var scorepulsoEsqY = 0;
var pulsoDirX = 0;
var pulsoDirY = 0;
var pulsoEsqX = 0;
var pulsoEsqY = 0;
var status = 0;

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

  for (let i = 0; i < poses.length; i++) {
    
    let pose = poses[i].pose;

    musica1Status = musica1.isPlaying();

  
    if (pose.leftWrist.confidence > 0.2) {
      
      fill(255, 0, 0);
      stroke(0, 255, 0);
      strokeWeight(4);
      
     
      let leftWristX = pose.leftWrist.x;
      let leftWristY = pose.leftWrist.y;
      ellipse(leftWristX, leftWristY, 20, 20);
      
      
      musica2.stop();
      
      if (!musica1Status) {
        musica1.play();
      }
    }
    if (pose.rightWrist.confidence > 0.2) {
      fill(0, 0, 255);
      stroke(255, 255, 0);
      strokeWeight(4);
      
      let rightWristX = pose.rightWrist.x;
      let rightWristY = pose.rightWrist.y;
      ellipse(rightWristX, rightWristY, 20, 20);
      
      musica1.stop();
      
      if (!musica2.isPlaying()) {
        musica2.play();
      }
    }
  }
}





function gotPoses(results){
    if(results.length > 0){
        console.log(results)
        scorepulsoDirXpulsoDirX = results[0].pose.keypoints[10].score;
        scorepulsoEsqYpulsoDirY = results[0].pose.keypoints[9].score;
        console.log("scoreLeftWrist ="+ scorepulsoEsqY);

        pulsoDirX = results[0].pose.rightWrist.x;
        pulsoDirY = results[0].pose.rightWrist.y;
        console.log("rightWirstX = "+ pulsoDirX + "pulsoDirY"+ pulsoDirY);

        pulsoEsqX = results[0].pose.pulsoEsqX.x;
        pulsoEsqY = results[0].pose.pulsoEsqY.y;
        console.log("pulsoEsqX= "+ pulsoEsqX +"pulsoEsqY = "+pulsoEsqY)
        
    }
}