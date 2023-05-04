// 
//  Maze Garden
//   Welcome to my maze garden! 
//   To play the game, use the arrow keys on your keyboard to move the character through the maze. 

 

var cols = 25;  // How many columns the canvas has
var rows = 25;  // How many rows the canvas has
var spriteSize = 30;  // The size of the grid
var mazeMap;  // Maze map
var wallRect, grassRect;
var playerCol, playerRow; // The player's position in the grid
var goalImg;
var goalX, goalY; // The coordinates of the end point
var controlTimer = -1; // Prevent players from moving too fast
var score = 1000;
var player;
var mist = [];

// download all image assets
function preload() {
  grassRect = loadImage("assets/grass.png");
  wallRect = loadImage("assets/wall.png");
  goalImg = loadImage("assets/goal.png");
}

function setup() {
  //make every col x row be a square
  createCanvas(spriteSize * cols, spriteSize * rows);
  noStroke();
  // download the maze map
  loadMap();
  player = new Player((playerCol + 0.5) * spriteSize, (playerRow + 0.5) * spriteSize, 0.16);

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const index = mazeMap.m[y][x];
      if (index == 1) {
        mist.push(createVector(x, y, 0));
      }
    }
  }
}

function draw() {
  // Draw a maze
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const index = mazeMap.m[y][x];
      if (index == 2 || index == 4) {
        image(wallRect, x * spriteSize, y * spriteSize, spriteSize, spriteSize);
      }
      if (index == 1) {
        image(grassRect, x * spriteSize, y * spriteSize, spriteSize, spriteSize);
      }
    }
  }

  controlPlayer();

  for (let i = 0; i < mist.length; i++) {
    let mm = mist[i];

    if (mm.z == 0 && int(mm.x) == playerCol && int(mm.y) == playerRow) {
      mm.z = 1;
    }

    if (mm.z > 0) {
      fill(0, 0);
    } else {
      fill(0, 150);
    }
    rect(mm.x * spriteSize, mm.y * spriteSize, spriteSize, spriteSize);
  }

  // Draw the player
  player.display();
  player.update();


  // Draw the end point
  image(goalImg, goalX, goalY, spriteSize, spriteSize);

  // Display score
  // noStroke();
  // fill("#e5e5e5");
  // rect(width - 195, height - 27.5, 175, 25);
  // fill(0);
  // textAlign(LEFT, CENTER);
  // textSize(24);
  // text("SCORE: " + score, width - 180, height - 13);

  // Once the player reaches the end, reload the new maze
  if (playerCol == mazeMap.goal.x && playerRow == mazeMap.goal.y) {
    loadMap();
    score += 1000;
  }
}

/* Up, down, left, and right keys to control player movement. */
function controlPlayer() {
  if (controlTimer < 0) {
    if (keyIsDown(LEFT_ARROW)) {
      if (mazeMap.m[playerRow][playerCol - 1] == 1) {
        playerCol--;
        controlTimer = 10;
      }
    } else if (keyIsDown(RIGHT_ARROW)) {
      if (mazeMap.m[playerRow][playerCol + 1] == 1) {
        playerCol++;
        controlTimer = 10;
      }
    } else if (keyIsDown(UP_ARROW)) {
      if (mazeMap.m[playerRow - 1][playerCol] == 1) {
        playerRow--;
        controlTimer = 10;
      }
    } else if (keyIsDown(DOWN_ARROW)) {
      if (mazeMap.m[playerRow + 1][playerCol] == 1) {
        playerRow++;
        controlTimer = 10;
      }
    }
  }
  controlTimer--;
}

/* Load the game map. */
function loadMap() {
  mazeMap = maze((cols - 1) / 2, (rows - 1) / 2);
  playerCol = mazeMap.start.x;
  playerRow = mazeMap.start.y;
  goalX = mazeMap.goal.x * spriteSize;
  goalY = mazeMap.goal.y * spriteSize;
}

/* Generate data for maze map. */
function maze(w, h) {
  // Initialize the map (2w+1)x(2h+1)
  let m = [];
  let values = [];
  for (let y = 0; y < rows; y++) {
    let r = [];
    let v = [];

    for (let x = 0; x < cols; x++) {
      if (x == 0 || y == 0 || x == 2 * w || y == 2 * h) { // The outermost walls are set to 4
        r.push(4);
      } else if (((x % 2) == 0) && ((y % 2) == 0)) {  // The even rows and even columns within it are set to 2
        r.push(2);
      } else {  // The rest is set to 0
        r.push(0);
      }
      v.push(0);
    }

    m.push(r);
    values.push(v);
  }

  // direction variables
  let dx = [1, 0, -1, 0];
  let dy = [0, 1, 0, -1];
  // current search starting point
  let curX = 2 * floor(random(w)) + 1;
  let curY = 2 * floor(random(h)) + 1;
  // start location
  let startX = curX;
  let startY = curY;
  m[curY][curX] = 1;  // Set the id of (curX, curY) to 1.
  // Store the opposite direction of travel
  let stuck = [];

  // search
  let guard = 9999;
  while (guard--) {
    let dirs = [];
    for (let i = 0; i < 4; i++) {
      let sgn = m[curY + dy[i]][curX + dx[i]];
      if (sgn == 2 || sgn == 4) {
        continue;
      }
      if (sgn == 0) {
        const sgn2 = m[curY + 2 * dy[i]][curX + 2 * dx[i]];
        if (sgn2 == 1) {
          m[curY + dy[i]][curX + dx[i]] = 2;
          continue;
        }
        dirs.push(i);
      }
    }
    // If there is a direction to advance
    if (dirs.length > 0) {
      const nextDir = dirs[floor(random(dirs.length))];
      m[curY + dy[nextDir]][curX + dx[nextDir]] = 1;
      m[curY + 2 * dy[nextDir]][curX + 2 * dx[nextDir]] = 1;
      const currentValue = values[curY][curX];
      curX += 2 * dx[nextDir];
      curY += 2 * dy[nextDir];
      values[curY][curX] = currentValue + 1;
      stuck.push((nextDir + 2) % 4);
      continue;
    } else if (stuck.length > 0) {
      // Direction of entry/exit/retreat
      const backDir = stuck.pop();
      curX += 2 * dx[backDir];
      curY += 2 * dy[backDir];
      continue;
    }
    break;
  }

  // Initialize values
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      values[y][x] = 0;
    }
  }

  // cur is set to start and the goal variable is initialized with start
  curX = startX;
  curY = startY;
  let goalX = curX;
  let goalY = curY;
  stuck = [];

  // as just now farthest from start x start y
  while (guard--) {
    let dirs = [];
    for (let i = 0; i < 4; i++) {
      let sgn = m[curY + dy[i]][curX + dx[i]];
      if (sgn == 2 || sgn == 3) { continue; }
      if (sgn == 1) { dirs.push(i); break; }
    }
    if (dirs.length > 0) {
      const nextDir = dirs[0];
      m[curY + dy[nextDir]][curX + dx[nextDir]] = 3;
      const currentValue = values[curY][curX];
      curY += 2 * dy[nextDir];
      curX += 2 * dx[nextDir];
      values[curY][curX] = currentValue + 1;
      if (values[curY][curX] > values[goalY][goalX]) {
        goalY = curY; goalX = curX;
      }
      stuck.push((nextDir + 2) % 4);
      continue;
    } else if (stuck.length > 0) {
      const backDir = stuck.pop();
      curY += 2 * dy[backDir];
      curX += 2 * dx[backDir];
      continue;
    }
    break;
  }
  // the goal has been decided 1 and 3 are
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (m[y][x] == 3) {
        m[y][x] = 1;
      }
    }
  }

  // Determine if it is the starting point. 
  function isStart(x, y) {
    return (startX == 2 * x + 1) && (startY == 2 * y + 1);
  }

  // Determine if it is the endpoint. 
  function isGoal(x, y) {
    return (goalX == 2 * x + 1) && (goalY == 2 * y + 1);
  }

  return { m, start: { x: startX, y: startY }, goal: { x: goalX, y: goalY }, isGoal, isStart };
}

/* Player class */
class Player {
  constructor(_x, _y, _s) {
    this.x = _x;
    this.y = _y;
    this.s = _s;
  }

  /* Up, down, left, and right keys to control player movement. */
  update() {
    this.x = (playerCol + 0.5) * spriteSize;
    this.y = (playerRow + 0.5) * spriteSize;
  }

  /* Draw the game player --- sailor. */
  display() {
    push();
    translate(this.x, this.y + 5);
    scale(this.s);

    // hat
    noStroke();
    fill("#f1faee");
    rect(-50, -100, 100, 30);
    strokeWeight(5);
    stroke(0);
    arc(0, -100, 80, 60, -PI, 0);
    line(-50, -100, 50, -100);
    arc(-50, -85, 30, 30, PI / 2, -PI / 2);
    arc(50, -85, 30, 30, -PI / 2, PI / 2);
    line(-50, -70, 50, -70);
    // line on the hat
    stroke(66, 135, 245);
    strokeWeight(4);
    line(-60, -90, 60, -90);
    stroke(0);

    // face
    fill("#edede9");
    arc(0, -67, 50, 80, 0, PI);

    // eyes
    fill("#fb8500");
    ellipse(-13, -60, 10, 10);
    ellipse(13, -60, 10, 10);

    // mouse
    fill("#e63946");
    strokeWeight(3);
    line(-5, -45, 5, -45);
    arc(0, -45, 10, 20, 0, PI);

    // body
    fill("#457b9d");
    strokeWeight(5);
    arc(0, -27, 40, 100, -PI / 6, PI + PI / 6);

    // legs
    fill(0);
    strokeWeight(10);
    line(-10, 20, -10, 60);
    line(10, 20, 10, 60);

    // neckerchief
    stroke(66, 135, 245);
    strokeWeight(5);
    line(-16, -30, 0, -10);
    line(16, -30, 0, -10);

    // button
    fill(247, 216, 116);
    noStroke();
    for (let i = 0; i < 3; i++) {
      let gap = 8;
      circle(0, i * gap, 5);
    }

    // right arm
    stroke(0);
    strokeWeight(8);
    line(20, -35, 35, -15);
    line(35, -15, 20, 0);

    // left arm
    stroke(0);
    strokeWeight(8);
    line(-20, -35, -25, -5);
    line(-25, -5, -40, -15);

    pop();
  }
}