let theShader;
let shaderTexture;

let theta = 0;

let x;
let y;
let outsideRadius = 200;
let insideRadius = 100;


function preload(){
  // load the shader
  theShader = loadShader('shader_TextureTest.vert','shader_TextureTest.frag');
  font = loadFont('Verdana.ttf')
}

function setup() {
  // shaders require WEBGL mode to work
  createCanvas(windowWidth, windowHeight, WEBGL);
  noStroke();

  // initialize the createGraphics layers
  shaderTexture = createGraphics(windowWidth, windowHeight, WEBGL);
  // turn off the createGraphics layers stroke
  shaderTexture.noStroke();

  initresx = width;
  initresy = height;
}

function draw() {
  translate(-width/2, -height/2, 0);
  // instead of just setting the active shader we are passing it to the createGraphics layer
  shaderTexture.shader(theShader);

  // here we're using setUniform() to send our uniform values to the shader
  theShader.setUniform("resolution", [width, height]);
  theShader.setUniform("u_time", millis() / 1000.0);
  if(mouseX > 25 && mouseX < height - 25 && mouseY > 25 && mouseY < height - 25 )
    theShader.setUniform("mouse", [(mouseX-25)/float(height-50), (height-mouseY-25)/float(height-50)]);
  else theShader.setUniform("mouse", [0, height]);

  // passing the shaderTexture layer geometry to render on
  shaderTexture.rect(0,0,width,height);
  
  background(68);
  drawSlider(height+12.5,25.0,width-height-50,10,(millis()/5000.0)%1.0,30.0,'blue Channel','d')
  // pass the shader as a texture
  // anything drawn after this will have this texture.
  texture(shaderTexture);
  
  rect(25,25,height-50,height-50)
}

function drawSlider(x = 0.0, y = 0.0, w = 100, h = 10, d = 0.0, r = 30.0, n = 'Word', pn = 'd'){
  fill(218,165,32);
  textSize(32);
  textFont(font);
  text(n, x, y+32);
  rect(x,y+50,w,h);
  circle(x+(d*w),y+h/2.0+50,r);
  theShader.setUniform(pn, d);
}