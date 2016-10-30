var canvas, ax, ay, bx, by, t;

var spacer = 50;
var side = 562;

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
  
  myMesh();         //  drawing background design based on selected resolution  
  myCurve();        //  drawing main curve based on input data
  mouseEvents();    //  getting data from user/mouse
  calcs();          //  calculations for Y-point based on selected resolution
}

//background mesh design
function myMesh() {
  noFill();
  stroke('#4D4D4D')
  rect(width / 2, height / 2, 512, 512);
  
  for (var i = spacer; i < side; i += outstep) {
    line(i, spacer, i, side);
  }
  for (var i = spacer; i < side; i += instep) {
    line(spacer, i, side, i);
  }
  for (var i = spacer; i <= side; i += instep * 4) {
    noStroke();
    fill(150);
    textSize(8);
    text((i - spacer) / 2 * infactor, 30, height - i);
  }
  
  stroke(104);
  line(306, spacer, 306, side);           // linear defaults
  line(spacer, 306, side, 306);           // middle line horizontal
  line(spacer, side, side, spacer);       // middle line vertical

  for (var i = spacer; i <= side; i += outstep * 4) {
    noStroke();
    fill(150);
    textSize(8);
    text((i - spacer) / 2 * outfactor, i, height - 30);
  }
}

//points on curve calcualtons. 
function calcs() {

  // drawing 3 control point just for fun
  for (var i = 0; i <= 4; i++) {
    t = i / 4;
    x = bezierPoint(spacer, ax, bx, side, t);
    y = bezierPoint(side, ay, by, spacer, t);
    var value = floor((side - y) / 2);
    fill(255);
    ellipse(x, y, 3, 3);
    textSize(8);
    text(value * infactor, x + 5, y + 5);
  }
  
  // calculating point according to Resolution
  var values = [];
  for (var i = 0; i < outres; i++) {
    t = i / outres;
    x = bezierPoint(spacer, ax, bx, side, t);
    y = bezierPoint(side, ay, by, spacer, t);
    var value = floor((side - y) / 2 * infactor);
    append(values, value + ", ");
  }
  var separator = " "
  message = join(values, separator);
  if (state) {
    result.html(" ");
    result.html(message);
    state = false;
  }
}

//mouse handler
function mouseEvents() {
  if (mouseIsPressed) {
    if (dist(mouseX, mouseY, ax, ay) < 50) {
      ax = mouseX;
      ay = mouseY;
      if (mouseX >= side  ) ax = side;
      if (mouseX <= spacer) ax = spacer;
      if (mouseY >= side  ) ay = side;
      if (mouseY <= spacer) ay = spacer;
    }
    if (dist(mouseX, mouseY, bx, by) < 50) {
      bx = mouseX;
      by = mouseY;
      if (mouseX >= side  ) bx = side;
      if (mouseX <= spacer) bx = spacer;
      if (mouseY >= side  ) by = side;
      if (mouseY <= spacer) by = spacer;
    }
  }
}

function myCurve() {
  noFill();
  strokeWeight(1);
  stroke(255);
  //curve render based on control points
  bezier(spacer, side, ax, ay, bx, by, side, spacer);
  beginShape();
  fill(127, 50);
  noStroke();
  vertex(spacer, side);
  bezierVertex(ax, ay, bx, by, side, spacer);
  bezierVertex(side, spacer, side, side, side, side);
  endShape();
  //drawing control points for adjusting curve 
  stroke(255, 102, 0);
  fill(255, 102, 0);
  line(spacer, side, ax, ay);
  line(side, spacer, bx, by);
  rect(ax, ay, 5, 5);
  rect(bx, by, 5, 5);
  fill(196);
  noStroke();
}
