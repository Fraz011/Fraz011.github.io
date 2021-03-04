#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution; // This is passed in as a uniform from the sketch.js file
uniform float u_time;

void main() {
  vec2 st = gl_FragCoord.xy/u_resolution.xy; 
  
  gl_FragColor = vec4(st.x,st.y,fract(u_time),1.0); 
}