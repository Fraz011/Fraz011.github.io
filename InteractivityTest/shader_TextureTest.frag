#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265358979323846

uniform vec2 resolution;
uniform vec2 resolutionOld;
uniform float u_time;
uniform vec2 mouse;

vec2 concentricCircles(in vec2 st, in vec2 radius) {
    float dist = distance(st,radius);
    return st;
}

void main (void) {
    vec2 st = gl_FragCoord.xy/resolution.xy;
    st = fract(st*1.0);
  
    gl_FragColor = vec4(st.x,st.y,0.0,1.0);
    //gl_FragColor = vec4(st.x,st.y,0.0,.0)
}