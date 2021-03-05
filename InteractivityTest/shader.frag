#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution; // This is passed in as a uniform from the sketch.js file
uniform float u_time;
uniform vec2 u_mousePosition;

void main() {
  vec2 st = fract((gl_FragCoord.xy-u_mousePosition)/u_resolution.xy); 
  
  gl_FragColor = vec4(st.x,st.y,fract(u_time),1.0); 
}