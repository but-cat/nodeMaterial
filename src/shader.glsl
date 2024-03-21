// Vertex shader
#if defined(WEBGL2) || defines(WEBGPU)
precision highp sampler2DArray;
#endif
precision highp float;

attribute vec3 position;
attribute vec2 uv;


uniform mat4 u_World;
uniform mat4 u_ViewProjection;
uniform vec2 u_Vector;
uniform float u_Float;
uniform float u_Time;
uniform float u_Float1;


varying vec2 v_uv;




void main(void) {
vec4 output1 = u_World * vec4(position, 1.0);
vec4 output0 = u_ViewProjection * output1;
gl_Position = output0;
v_uv = uv;

}

// Fragment shader
#if defined(WEBGL2) || defines(WEBGPU)
precision highp sampler2DArray;
#endif
precision highp float;

uniform mat4 u_World;
uniform mat4 u_ViewProjection;
uniform vec2 u_Vector;
uniform float u_Float;
uniform float u_Time;
uniform float u_Float1;


varying vec2 v_uv;


float rand(vec2 co){return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);}
float rand(vec2 co, float l) {return rand(vec2(rand(co), l));}
float rand(vec2 co, float l, float t) {return rand(vec2(rand(co, l), t));}

void perlin(vec2 p, float dim, float time, out float result) {
   vec2 pos = floor(p * dim);
   vec2 posx = pos + vec2(1.0, 0.0);
   vec2 posy = pos + vec2(0.0, 1.0);
   vec2 posxy = pos + vec2(1.0);
   
   float c = rand(pos, dim, time);
   float cx = rand(posx, dim, time);
   float cy = rand(posy, dim, time);
   float cxy = rand(posxy, dim, time);
   
   vec2 d = fract(p * dim);
   d = -0.5 * cos(d * 3.14159265358979323846) + 0.5;
   
   float ccx = mix(c, cx, d.x);
   float cycxy = mix(cy, cxy, d.x);
   float center = mix(ccx, cycxy, d.y);
   
   result = center * 2.0 - 1.0;
}

#include<helperFunctions>



void main(void) {
vec2 output3 = v_uv * u_Vector;
float output4 = u_Time / u_Float1;
float output2;
perlin(output3, u_Float, output4, output2);
vec3 xyz2 = vec3(output2, output2, output2).xyz;
gl_FragColor = vec4(xyz2, 1.0);
#ifdef CONVERTTOLINEAR0
gl_FragColor = toLinearSpace(gl_FragColor);
#endif
#ifdef CONVERTTOGAMMA0
gl_FragColor = toGammaSpace(gl_FragColor);
#endif

}