let x =200;
let xSpeed =1;

let Button = document.getElementById("fast");
function setup(){
  let cnv = createCanvas(400,400);
  cnv.parent("canvasContainer");
}
function draw(){
    background(120,40,240);

    circle(x, height/2, 10);

    x+= xSpeed;
    if(x>width){
      x=0;
    }
}

function increaseSpeed(){
     xSpeed++;
}
Button.addEventListener("click", increaseSpeed)