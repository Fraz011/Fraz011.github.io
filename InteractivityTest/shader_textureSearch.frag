#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265358979323846

uniform vec2 resolution;
uniform vec2 resolutionOld;
uniform float u_time;
uniform float d;
uniform float parm_fraction;
uniform float parm_fade;
uniform vec2 mouse;

uniform sampler2D tex0;

vec2 concentricCircles(in vec2 st, in vec2 radius) {
    float dist = distance(st,radius);
    return st;
}

void main (void) {
    vec2 st = gl_FragCoord.xy/resolution.xy;
    float tex = texture2D(tex0,st).r;
    float outp = smoothstep(parm_fraction,parm_fraction-parm_fade,tex);
    gl_FragColor = vec4(vec3(outp),1.0);
}