function elements() {

  // INPUT RESOLUTION SELECTOR
  input = createP('INPUT:');
  input.position(50, 57);
  input.id("input");

  // create input 8 bit resolution button
  input8 = createButton('256');
  input8.position(100, 60);
  input8.id("res");
  input8.mousePressed(in256);

  // create input 10 bit resolution button
  input10 = createButton('1024');
  input10.position(150, 60);
  input10.id("res");
  input10.mousePressed(in1024);

  // OUTPUT RESOLUTION SELECTOR
  output = createP('OUTPUT:');
  output.position(226, 57);
  output.id("input");

  // create output 8 bit resolution button
  output8 = createButton('256');
  output8.position(290, 60);
  output8.id("res");
  output8.mousePressed(out256);

  // create output 10 bit resolution button
  output10 = createButton('1024');
  output10.position(340, 60);
  output10.id("res");
  output10.mousePressed(out1024);

  // create get button
  getData = createButton('RESET');
  getData.position(450, 60);
  getData.id("btn");
  getData.mousePressed(reset);

  // create canvas for curve and infografics
  canvas = createCanvas(612, 612);
  canvas.position(0, 70);
  canvas.parent('curve');

  // create header text for calculated data
  summ = createElement('H3', summ);
  summ.position(50, 650);
  summ.id("summ");

  // INPUT RESOLUTION SELECTOR
  input = createP('(copy generated values to clipboard and paste it to your code)');
  input.position(50, 680);
  input.id("input");

  // create paragraph text with calculated data
  result = createP(message);
  result.position(50, 720);
  result.id("result");
}

function in256() {
  instep = 32;
  inres = 256;
  infactor = 1;
  state = true;
}

function in1024() {
  instep = 16;
  inres = 1024;
  infactor = 4;
  state = true;
}

function out256() {
  outstep = 32;
  outres = 256;
  outfactor = 1;
  state = true;
}

function out1024() {
  outstep = 16;
  outres = 1024;
  outfactor = 4;
  state = true;
}

function reset() {
  instep = 32;
  inres = 256;
  outstep = 32;
  outres = 256;
  infactor = 1;
  outfactor = 1;
  ax = 256;
  ay = height - 256;
  bx = width - 256;
  by = 256;
  state = true;
}
