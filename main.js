img="";
status="";
objects=[];
ind="";

function preload(){
sound=loadSound("music2.mp3");
}

function setup(){
canvas=createCanvas(640,420);
canvas.center();
video=createCapture(VIDEO);
video.hide();
objectDetector=ml5.objectDetector('cocossd',modelLoaded);
document.getElementById("t").innerHTML="Status : Detecting objects";
}
function modelLoaded(){
console.log('modelLoaded');
status=true;
}

function gotResult(error,results){
if(error){
console.log(error);
}
else{
console.log(results);
objects=results;
}
}

function draw(){
image(video,0,0,640,420);
if(status != "")
{
objectDetector.detect(video,gotResult);
for (i=0;i<objects.length;i++)
{
document.getElementById("t").innerHTML="status : Object detected";
fill("#FF0000");
percentage=floor(objects[i].confidence*100);
text(objects[i].label+" " +percentage+"%",objects[i].x-400,objects[i].y-350);
noFill();
stroke("#FF0000");
rect(objects[i].x-400,objects[i].y-450,objects[i].width+400,objects[i].height);
if(objects[i].label=="person"){
document.getElementById("p").innerHTML="Baby is there";
ind="0";
console.log("g");
sound.stop();
}
}
if(document.getElementById("p").innerHTML!="Baby is there"){
console.log("rvdcuf");
sound.play("");
document.getElementById("t").innerHTML="Baby is not here";
}
}
document.getElementById("p").innerHTML="";
}