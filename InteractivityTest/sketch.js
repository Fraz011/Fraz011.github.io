let Shader;

function preload(){
  // load the shader
  Shader = loadShader('shader.vert', 'shader.frag');
}

function setup() {
    createCanvas(windowWidth, windowHeight-5,WEBGL);
  }
  
function draw() {
    background(0);
    // send resolution of sketch into shader
    Shader.setUniform('u_resolution', [width, height]);
    Shader.setUniform("u_time", millis() / 1000.0);
    fill(255,0,0);
    // shader() sets the active shader with our shader
    shader(Shader);
    rect(0,0,2, 2);
    noStroke();
}

function windowResized(){
    resizeCanvas(windowWidth, windowHeight-5);
}