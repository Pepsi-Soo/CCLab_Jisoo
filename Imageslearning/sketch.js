let gradient;
let horses =[];
//有很多错，下来再改，就是一个连续跑马图
let b =0;
function preload(){
  for(let i= 0; i<9; i++){
    let filename = "mb/muybridge_" + i +".jpg"
    console.log("muybridge" + filename);
  }
gradient = loadImage("mb/muybridge_0.jpg");

}


function setup(){

  let cnv = createCanvas(400,400);
  cnv.parent("canvasContainer");



}
function draw(){
    background(130,40,240);

    push();
    scale(0.5);
image(horses[b],0,0);

pop();

b++;
if(b>8){
   b =0;
}
}