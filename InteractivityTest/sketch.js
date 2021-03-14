let theShader;
let shaderTexture;

let theta = 0;

let noise;

let x;
let y;
let outsideRadius = 200;
let insideRadius = 100;

let shader = 'shader_textureSearch.frag';

let sliders = [];

function preload(){
  theShader = loadShader('shader.vert',shader);
  noise = loadImage('Noise.png');
  font = loadFont('Verdana.ttf');
  shaderStrings = loadStrings(shader);
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  noStroke();

  // initialize the createGraphics layers
  shaderTexture = createGraphics(windowWidth, windowHeight, WEBGL);
  
  // turn off the createGraphics layers stroke
  shaderTexture.noStroke();

  let SliderIndex = 0;
  for (let index = 0; index < shaderStrings.length; index++) {
    if(match(shaderStrings[index],'uniform float parm_*') != null){
      sliders[SliderIndex] = new slider(height+12.5,25.0+SliderIndex*100,shaderStrings[index].replace('uniform float ','').replace(';',''),random(1.0));
      SliderIndex++;
    }
  }
} 

function draw() {
  //print(params);
  translate(-width/2, -height/2, 0);
  // instead of just setting the active shader we are passing it to the createGraphics layer
  shaderTexture.shader(theShader);

  // here we're using setUniform() to send our uniform values to the shader
  theShader.setUniform("resolution", [width, height]);
  theShader.setUniform("u_time", millis() / 1000.0);
  theShader.setUniform("tex0",noise);

  // passing the shaderTexture layer geometry to render on
  shaderTexture.rect(0,0,width,height);
  
  background(68);
  for (let index = 0; index < sliders.length; index++) {
    sliders[index].drawSlider();
  }

  texture(shaderTexture);  
  rect(25,25,height-50,height-50)
}

function mouseDragged() {
  for (let index = 0; index < sliders.length; index++) {
    sliders[index].updateParm();
  }
}

function mouseClicked(){
  for (let index = 0; index < sliders.length; index++) {
    sliders[index].updateParm();
  }
}

class slider{
  constructor(x,y,name,initValue){
    this.x = x;
    this.y = y;
    this.width = width-height-50;
    this.height = 8.0;
    this.radius = 25.0;
    this.scalar = initValue;
    this.name = name;
    this.fill = color(218,165,32);
  }

  drawSlider(){
    fill(this.fill);
    textSize(height/25);
    textFont(font);
    text(this.name, this.x, this.y+32);
    rect(this.x,this.y+50,this.width,this.height);
    circle(this.x+(this.scalar*this.width),this.y+this.height/2.0+50,this.radius);
    theShader.setUniform(this.name, this.scalar);
  }

  updateParm(){
    if(
    dist(mouseX,mouseY,this.x+(this.scalar*this.width),this.y+this.height/2.0+50) <= this.radius/2 
    || (mouseX > this.x && mouseX < this.x + this.width && mouseY > this.y + 50-this.height*2 && mouseY < this.y + 50 + this.height*4)
    ){
      this.scalar = constrain((mouseX-this.x)/this.width,0.0,1.0);
    }
  }
}
