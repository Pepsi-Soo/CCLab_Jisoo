// let squareSize = 1;
// ///////可能需要补救下，看笔记吧
// let a = 0;
// let a2 =0;
// let bigRadius =50;
// function setup(){
//   let cnv = createCanvas(400,400);
//   cnv.parent("canvasContainer");

// }
// function draw(){
//     background(120,40,240);

//   push();
//    translate(width/2,height/2);  //公转

//   rotate(radians(a));
// //below here
//     //rect(-squareSize/2+140,-squareSize/2,50,50);
//     push();
//     translate(bigRadius, 0);
//     rotate(radians(a2)); //自转
   
//     // rect(-squareSize/2,-squareSize/2,50,50);

//     fill(0);
//     noStroke();
//     circle(-squareSize/2,-squareSize/2,5);
//     circle(squareSize/2,-squareSize/2,5);
//     circle(squareSize/2,squareSize/2,5);
//     circle(-squareSize/2,squareSize/2,5);
//     pop();

//     fill(225, 10, 10);
//     circle(0,0,5);
// //above here
//     pop();
//  a++;
// a2-=4;

// // bigRadius-=0.1;

// squareSize*=1.01;
//   }

let gradient;


function preload(){
  gradient = loadImage("flower.jpeg");
}




function setup(){

  let cnv = createCanvas(400,400);
  cnv.parent("canvasContainer");
}
function draw(){
    background(130,40,240);
image(gradient,0,0,width,height);


}