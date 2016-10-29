var canvas, ax, ay, bx, by, t;
var inres = 256;    // Input Resolution
var instep = 32;    // Input Mesh Step
var infactor = 1;   // Input Multiple Factor
var outres = 256;   // Output Resolution
var outstep = 32;   // Output Mesh Step
var outfactor = 1;  // Output Multiple Factor
var state = false;  // Print Calculations to the page
var message;        // Save Calculations to the array

function setup() {
  rectMode(CENTER);

  // INPUT RESOLUTION SELECTOR
  input = createP('INPUT:');
  input.position(50, 45);
  input.id("input");
  
  // create input 8 bit resolution button
  input8 = createButton('256');
  input8.position(100, 50);
  input8.id("res");
  input8.mousePressed(in256);
  
  // create input 10 bit resolution button
  input10 = createButton('1024');
  input10.position(150, 50);
  input10.id("res");
  input10.mousePressed(in1024);
  
  // OUTPUT RESOLUTION SELECTOR
  output = createP('OUTPUT:');
  output.position(226, 50);
  output.id("input");
  
  // create output 8 bit resolution button
  output8 = createButton('256');
  output8.position(290, 50);
  output8.id("res");
  output8.mousePressed(out256);
  
  // create output 10 bit resolution button
  output10 = createButton('1024');
  output10.position(340, 50);
  output10.id("res");
  output10.mousePressed(out1024);
  
  // create get button
  getData = createButton('GET DATA');
  getData.position(450, 50);
  getData.id("btn");
  getData.mousePressed(showData);
  
  // create canvas for curve and infografics
  canvas = createCanvas(612, 612);
  canvas.position(0, 100);
  canvas.parent('curve');
  
  // create paragraph text with calculated data
  result = createP(message);
  result.position(50, 700);
  result.id("result");

  ax = 256;
  ay = height - 256;
  bx = width - 256;
  by = 256;

}

function in256() {
  instep = 32;
  inres = 256;
  infactor = 1;
}
function in1024() {
  instep = 16;
  inres = 1024;
  infactor = 4;
}
function out256() {
  outstep = 32;
  outres = 256;
  outfactor = 1;
}
function out1024() {
  outstep = 16;
  outres = 1024;
  outfactor = 4;
}
function showData() {
  state = true;
}

function draw() {

  background('#333333');
  noFill();

  inputs();         //getting data from user/mouse
  mesh();           //drawing background design based on selected resolution
  myCurve();        //drawing main curve based on input data
  controlPoints();  //drawing control points for adjusting curve 
  points();         //calculations for Y-point based on selected resolution
}

//background mesh design
function mesh() {
  strokeWeight(1);
  stroke('#4D4D4D')
  noFill();
  rect(width / 2, height / 2, 512, 512);
  for (var i = 50; i < 562; i += outstep) {
    fill(96);
    line(i, 50, i, height - 50);
  }
  for (var i = 50; i < 562; i += instep) {
    fill(96);
    line(50, i, height - 50, i);
  }
  for (var i = 50; i <= 562; i += instep * 4) {
    noStroke();
    fill(150);
    textSize(8);
    text((i - 50) / 2 * infactor, 30, height - i);
  }
  stroke(104);
  line(306, 50, 306, height - 50);          // linear defaults
  line(50, 306, width - 50, 306);           // middle line horizontal
  line(50, height - 50, width - 50, 50);    // middle line vertical
  stroke('#4D4D4D')
  for (var i = 50; i <= 562; i += outstep * 4) {
    noStroke();
    fill(150);
    textSize(8);
    text((i - 50) / 2 * outfactor, i, height - 30);
  }
}
//points on curve calcualtons. 
function points() {
  var flag = 0;
  // drawing 3 control point just for fun
  for (var i = 0; i <= 4; i++) {
    t = i / 4;
    x = bezierPoint(50, ax, bx, width - 50, t);
    y = bezierPoint(height - 50, ay, by, 50, t);
    var value = floor((height - 50 - round(y)) / 2);
    fill(255);
    ellipse(x, y, 3, 3);
    textSize(8);
    text(value * infactor, x + 5, y + 5);
  }
  // calculating point according to Resolution
  var values = [];
  for (var i = 0; i <= outres; i++) {
    t = i / outres;
    x = bezierPoint(50, ax, bx, width - 50, t);
    y = bezierPoint(height - 50, ay, by, 50, t);
    var value = floor((height - 50 - round(y)) / 2 * infactor);
    append(values, value);
  }
  var separator = ","
  message = join(values, separator);
  if (state) {
    result.html(" ");
    result.html(message);
    state = false;
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
