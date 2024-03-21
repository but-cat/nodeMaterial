precision mediump float;
uniform float iTime;
uniform vec2 iResolution;


float func_f752e455_3aad_4639_a293_5063018fdb6c() {
	
        return iTime;
    
}

vec2 func_9bf2b29b_bf09_4f6e_87ca_1da46716b6cf() {
	
        vec2 uv = gl_FragCoord.xy / iResolution.xy;
        uv.x *= iResolution.x / iResolution.y;
        return uv;
    
}

vec3 func_4c4280a6_7b43_4956_a31a_9eeb041aa973(float time,vec2 uv) {
	
        vec3 col = 0.5 + 0.5 * cos( time + uv.xyx + vec3(0,2,4) );
        return col;
    
}

vec3 func_cd96f511_6540_4ee9_b454_65ff7aafa915(vec3 data1) {
	
        return data1;
    
}





vec3 nodeFunction() {



	float var_f752e455_3aad_4639_a293_5063018fdb6c = func_f752e455_3aad_4639_a293_5063018fdb6c();





	vec2 var_9bf2b29b_bf09_4f6e_87ca_1da46716b6cf = func_9bf2b29b_bf09_4f6e_87ca_1da46716b6cf();





	vec3 var_4c4280a6_7b43_4956_a31a_9eeb041aa973 = func_4c4280a6_7b43_4956_a31a_9eeb041aa973(var_f752e455_3aad_4639_a293_5063018fdb6c,var_9bf2b29b_bf09_4f6e_87ca_1da46716b6cf);





	return func_cd96f511_6540_4ee9_b454_65ff7aafa915(var_4c4280a6_7b43_4956_a31a_9eeb041aa973);



}


void main() {
	vec3 col = nodeFunction();
    gl_FragColor = vec4(col,1.0);
}