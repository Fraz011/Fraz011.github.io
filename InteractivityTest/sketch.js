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
  theShader.setUniform("mouse", [mouseX, map(mouseY, 0, height, height, 0)]);

  // passing the shaderTexture layer geometry to render on
  shaderTexture.rect(0,0,width,height);
  
  background(68);
  fill(218,165,32);
  rect(height,25,width-height-25,height-50);
  // pass the shader as a texture
  // anything drawn after this will have this texture.
  texture(shaderTexture);
  
  rect(25,25,height-50,height-50)
}