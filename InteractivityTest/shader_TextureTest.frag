#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265358979323846

uniform vec2 resolution;
uniform vec2 resolutionOld;
uniform float u_time;
uniform float d;
uniform float parm_r;
uniform float parm_g;
uniform float parm_b;
uniform vec2 mouse;

vec2 concentricCircles(in vec2 st, in vec2 radius) {
    float dist = distance(st,radius);
    return st;
}

void main (void) {
    vec2 st = gl_FragCoord.xy/resolution.xy;
    st = fract(st-mouse);
  
    gl_FragColor = vec4(parm_r,parm_g,parm_b,1.0);
}