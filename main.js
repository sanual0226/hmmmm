song="";
function setup()
{
canvas=createCanvas(600,500);
canvas.center();
video=createCapture(VIDEO);
video.hide();
poseNet=ml5.poseNet(video, modelLoaded);
poseNet.on('pose', gotPoses);
}
function modelLoaded()
{
  console.log("PoseNet initialized");
}
rightWristX=0;
rightWristY=0;
leftWristX=0;
leftWristY=0;
scoreleftwrist=0;
 function gotPoses(result)
   {
     if(result.length>0)
     {
      
       console.log(result);
       scoreleftwrist=result[0].pose.keypoints[9].score;
       console.log("scoreleftWrist="+scoreleftwrist);
        rightWristX=result[0].pose.rightWrist.x;
        rightWristY=result[0].pose.rightWrist.y;
        console.log("rightWristX="+rightWristX+"rightWristY"+rightWristY);
        leftWristX=result[0].pose.leftWrist.x;
        leftWristY=result[0].pose.leftWrist.y;
        console.log("leftWristX="+leftWristX+"leftWristY"+leftWristY);
     }
   }
 
function draw()
{


    image(video, 0, 0, 600, 500);
    fill('#FF0000');
    stroke('#FF0000');
    if (scoreleftwrist>0.2){
      circle(leftWristX,leftWristY, 20);
      inNumberleftWristY=Number(leftWristY);
      removeDecimal=floor(inNumberleftWristY);
      volume=removeDecimal/500;
      document.getElementById("volume").innerHTML="volume ="+volume;
      song.setVolume(volume);
    }
}

function preload()
{
  song=loadSound("music.mp3");
}
function play()
{
    song.play();
    song.setvolume(1);
    song.rate(1);
}
