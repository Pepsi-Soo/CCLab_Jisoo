let NofStars = 2;
let stars = [];
let NofCatch = 0;
let CanCatch = 1;
let shipX = 0;
let sailorX = 0;

function setup() {
  let canvas = createCanvas(800, 400);
  canvas.parent("canvasContainer");
  background(220);
}

function keyPressed() {
  if (keyCode === RIGHT_ARROW) {
    sailorX += 20;
  }
  if (keyCode === LEFT_ARROW) {
    sailorX -= 20;
  }
}

function draw() {
  background(0);

  if (random(1) < 0.01 && stars.length < 10) {
    for (let i = 0; i < NofStars; i++) {
      stars.push(new Star(random(width), 0));
    }
  }

  noStroke();
  //the deepest sea
  fill(29, 72, 92);
  arc(300, 400, 800, 400, -PI, 0);
  arc(0, 400, 800, 400, -PI, 0);
  arc(700, 400, 800, 400, -PI, 0);

  //level 2
  fill(68, 103, 152);
  arc(200, 450, 800, 400, -PI, 0);
  arc(0, 450, 400, 430, -PI, 0);
  arc(600, 450, 700, 450, -PI, 0);
  //level 3
  fill(98, 135, 159);
  arc(200, 500, 1000, 400, -PI, 0);
  arc(0, 400, 500, 270, -PI, 0);
  arc(700, 550, 500, 450, -PI, 0);
  arc(500, 550, 300, 450, -PI, 0);
  //level 4
  fill(169, 194, 221);
  arc(70, 400, 500, 180, -PI, 0);
  arc(300, 400, 300, 150, -PI, 0);

  //the island
  fill(237, 174, 64);
  arc(50, 400, 1600, 80, -PI, 0);
  //ship
  ship(shipX, 0, 0);

  //sailor
  sailor(sailorX, 350, 0.5);

  //stars
  for (let i = 0; i < stars.length; i++) {
    let s = stars[i];
    s.fall();
    s.reappear();
    s.checkIfcatch();
    if (s.checkIfenough() != true) {
      s.display();
    }
    if (stars[i].isDone) {
      stars.splice(i, 1);
      console.log("done!");
    }
    // console.log(stars.length)
  }

  //ship leaves
  if (NofCatch == 30) {
    text("You successfully let the ship set sail!",width/2,height/2);
    
    
    shipX--;
  }
  text("Brightness Level:" + NofCatch, 5, 12);
  text(
    "Start by clicking the mouse then use the left & right arrow to move the sailor",
    5,
    25
  );
}

class Star {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.xSpd = 0;
    this.ySpd = random(1, 3);
    this.r = 60;
    this.CanCatch = 1;
    this.isDone = false;
  }

  fall() {
    this.x += this.xSpd;
    this.y += this.ySpd;
  }

  reappear() {
    if (this.x < 0) {
      this.x = width;
    } else if (this.x > width) {
      this.x = 0;
    }
    if (this.y < 0) {
      this.y = 240;
    } else if (this.y > 300) {
      this.y = 0;
      // this.isDone = true;
    }
  }
  checkIfcatch() {
    let d = dist(sailorX, 310, this.x + 50, this.y + 50);
    //console.log(sailorX)
    // console.log("d",d);
    if (d < this.r && this.CanCatch == 1) {
      NofCatch++;
      this.CanCatch = -1;
      this.isDone = true;
    } else {
      //console.log("0");
    }
  }
  checkIfenough() {
    if (NofCatch >= 30) {
      NofCatch = 30;
      return true;
    }
  }

  display() {
    push();
    translate(this.x, this.y);
    fill(245, 227, 147);
    noStroke();
    triangle(50, 50, 55, 35, 60, 50);
    triangle(55, 45, 70, 50, 55, 55);
    triangle(50, 50, 63, 65, 60, 50);
    triangle(50, 50, 45, 65, 58, 50);
    triangle(55, 45, 40, 50, 55, 55);

    // ellipse(0, 0, 70, 70)
    pop();

    // push()
    // fill(255, 255, 0)
    // // ellipse(sailorX, 310, 10, 10);
    // ellipse(this.x, this.y, 70, 70)
    // pop()
    // fill(237, 174, 64)
    // text("Brightness Level:" + this.NofCatch, 5, 12);
    // console.log(this.NofCatch);
  }
}

function sailor(x, y, s) {
  push();
  translate(x, y);
  scale(s);
  //hat
  fill(255);
  strokeWeight(5);
  stroke(0);
  arc(0, -100, 80, 60, -PI, 0);
  line(-50, -100, 50, -100);
  arc(-50, -85, 30, 30, PI / 2, -PI / 2);
  arc(50, -85, 30, 30, -PI / 2, PI / 2);
  rect(-50, -100, 100, 30);
  line(-50, -70, 50, -70);
  //face
  arc(0, -67, 50, 80, 0, PI);
  //eyes
  ellipse(-13, -60, 5, 5);
  ellipse(13, -60, 5, 5);
  //mouse
  strokeWeight(3);
  line(-5, -45, 5, -45);
  arc(0, -45, 10, 20, 0, PI);
  //body
  strokeWeight(5);
  arc(0, -27, 40, 100, -PI / 6, PI + PI / 6);
  //legs
  fill(0);
  strokeWeight(10);
  line(-10, 20, -10, 60);
  line(10, 20, 10, 60);
  //neckerchief
  stroke(66, 135, 245);
  strokeWeight(5);
  line(-16, -30, 0, -10);
  line(16, -30, 0, -10);
  //button
  fill(247, 216, 116);
  noStroke();
  for (let i = 0; i < 3; i++) {
    let gap = 8;
    circle(0, i * gap, 5);
  }
  //line on the hat
  stroke(66, 135, 245);
  strokeWeight(4);
  line(-60, -90, 60, -90);
  //right arm
  stroke(0);
  strokeWeight(8);
  line(20, -35, 35, -15);
  line(35, -15, 20, 0);
  //left arm
  stroke(0);
  strokeWeight(8);
  line(-20, -35, -35, -15);
  line(-35, -15, -60, -35);
  //bag
  noStroke();
  fill(173, 172, 168);
  ellipse(-60, -37, 50, 10);
  pop();
}
function ship(x, y, s) {
  push();
  translate(x, y);
  stroke(57, 73, 171);
  strokeWeight(5);
  //shiphat
  fill(255);
  rect(520, 250, 30, 60);
  stroke(231, 2, 2);
  line(524, 260, 546, 260);

  //shiphead
  stroke(57, 73, 171);
  fill(255, 171, 145);
  arc(520, 320, 120, 100, -PI, 0);
  //shipbody
  fill(255, 224, 130);
  arc(600, 300, 300, 120, 0, PI);
  for (let i = 0; i < 5; i++) {
    strokeWeight(3);
    fill(100, 181, 246);
    circle(500 + 45 * i, 320, 25);
  }

  pop();
}
