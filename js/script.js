var canvas, ax, ay, bx, by, t;
var step = 16;
var res = 4;


function setup() {
  canvas = createCanvas(612, 612);
  canvas.parent('curve');
  rectMode(CENTER);
  ax = 256;
  ay = height - 256;
  bx = width - 256;
  by = 256;
}

function draw() {
  background('#333333');
  noFill();
  inputs();             //getting data from user/mouse
  mesh();               //drawing background design based on selected resolution
  myCurve();            //drawing main curve based on input data
  controlPoints();      //drawing control points for adjusting curve 
  points();             //calculations for Y-point based on selected resolution
}

//background mesh design
function mesh() {
  strokeWeight(1);
  stroke('#4D4D4D')
  noFill();
  rect(width / 2, height / 2, 512, 512);
  for (var i = 50; i < 562; i += step) {
    fill(96);
    line(i, 50, i, height - 50);
  }
  line(50, height - 50, width - 50, 50);
  for (var i = 50; i <= 562; i += step * 4) {
    noStroke();
    fill(150);
    textSize(8);
    text((i - 50) / 2, i, height - 30);
  }
}

//points on curve calcualtons. 
function points() {
  var values = [];
  for (var i = 0; i <= res; i++) {

    t = i / res;
    x = bezierPoint(50, ax, bx, width - 50, t);
    y = bezierPoint(height - 50, ay, by, 50, t);

    var value = (height - 50 - round(y)) / 2;
    append(values, value);

    fill(255);
    ellipse(x, y, 5, 5);
    text(values[i], x + 5, y + 5);
  }
}


//mouse handler
function inputs() {
  if (mouseIsPressed) {
    if (dist(mouseX, mouseY, ax, ay) < 50) {
      ax = mouseX;
      ay = mouseY;
      if (mouseX >= 562) ax = 562;
      if (mouseX <= 50) ax = 50;
      if (mouseY >= 562) ay = 562;
      if (mouseY <= 50) ay = 50;
    }
    if (dist(mouseX, mouseY, bx, by) < 50) {
      bx = mouseX;
      by = mouseY;
      if (mouseX >= 562) bx = 562;
      if (mouseX <= 50) bx = 50;
      if (mouseY >= 562) by = 562;
      if (mouseY <= 50) by = 50;
    }
  }
}

//control points design
function controlPoints() {

  strokeWeight(1);
  stroke(255, 102, 0);
  fill(255, 102, 0);

  line(50, height - 50, ax, ay);
  line(width - 50, 50, bx, by);
  rect(ax, ay, 5, 5);
  rect(bx, by, 5, 5);

  fill(196);
  noStroke();
}

//curve render based on control points
function myCurve() {
  noFill();
  strokeWeight(1);
  stroke(255);
  bezier(50, height - 50, ax, ay, bx, by, width - 50, 50);
  beginShape();
  fill(127, 50);
  noStroke();
  vertex(50, height - 50);
  bezierVertex(ax, ay, bx, by, width - 50, 50);
  bezierVertex(width - 50, 50, width - 50, height - 50, width - 50, height - 50);
  endShape();;
}
var canvas, ax, ay, bx, by, t;
var step = 16;
var res = 4;


function setup() {
  canvas = createCanvas(612, 612);
  canvas.parent('curve');
  rectMode(CENTER);
  ax = 256;
  ay = height - 256;
  bx = width - 256;
  by = 256;
}

function draw() {
  background('#333333');
  noFill();
  inputs();             //getting data from user/mouse
  mesh();               //drawing background design based on selected resolution
  myCurve();            //drawing main curve based on input data
  controlPoints();      //drawing control points for adjusting curve 
  points();             //calculations for Y-point based on selected resolution
}

//background mesh design
function mesh() {
  strokeWeight(1);
  stroke('#4D4D4D')
  noFill();
  rect(width / 2, height / 2, 512, 512);
  for (var i = 50; i < 562; i += step) {
    fill(96);
    line(i, 50, i, height - 50);
  }
  line(50, height - 50, width - 50, 50);
  for (var i = 50; i <= 562; i += step * 4) {
    noStroke();
    fill(150);
    textSize(8);
    text((i - 50) / 2, i, height - 30);
  }
}

//points on curve calcualtons. 
function points() {
  var values = [];
  for (var i = 0; i <= res; i++) {

    t = i / res;
    x = bezierPoint(50, ax, bx, width - 50, t);
    y = bezierPoint(height - 50, ay, by, 50, t);

    var value = (height - 50 - round(y)) / 2;
    append(values, value);

    fill(255);
    ellipse(x, y, 5, 5);
    text(values[i], x + 5, y + 5);
  }
}


//mouse handler
function inputs() {
  if (mouseIsPressed) {
    if (dist(mouseX, mouseY, ax, ay) < 50) {
      ax = mouseX;
      ay = mouseY;
      if (mouseX >= 562) ax = 562;
      if (mouseX <= 50) ax = 50;
      if (mouseY >= 562) ay = 562;
      if (mouseY <= 50) ay = 50;
    }
    if (dist(mouseX, mouseY, bx, by) < 50) {
      bx = mouseX;
      by = mouseY;
      if (mouseX >= 562) bx = 562;
      if (mouseX <= 50) bx = 50;
      if (mouseY >= 562) by = 562;
      if (mouseY <= 50) by = 50;
    }
  }
}

//control points design
function controlPoints() {

  strokeWeight(1);
  stroke(255, 102, 0);
  fill(255, 102, 0);

  line(50, height - 50, ax, ay);
  line(width - 50, 50, bx, by);
  rect(ax, ay, 5, 5);
  rect(bx, by, 5, 5);

  fill(196);
  noStroke();
}

//curve render based on control points
function myCurve() {
  noFill();
  strokeWeight(1);
  stroke(255);
  bezier(50, height - 50, ax, ay, bx, by, width - 50, 50);
  beginShape();
  fill(127, 50);
  noStroke();
  vertex(50, height - 50);
  bezierVertex(ax, ay, bx, by, width - 50, 50);
  bezierVertex(width - 50, 50, width - 50, height - 50, width - 50, height - 50);
  endShape();;
}
