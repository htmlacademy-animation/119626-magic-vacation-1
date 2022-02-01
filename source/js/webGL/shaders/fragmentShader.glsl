precision mediump float;

uniform sampler2D map;

uniform float hue;

varying vec2 vUv;

vec3 hueShift(vec3 color, float hue) {
	const vec3 k = vec3(0.57735, 0.57735, 0.57735);

	float cosAngle = cos(hue);

	return vec3(color * cosAngle + cross(k, color) * sin(hue) + k * dot(k, color) * (1.0 - cosAngle));
}

void main() {
	vec4 texel = texture2D( map, vUv );

	if (hue == 0.0) {
    gl_FragColor = texel;
  } else {
    vec3 hueShifted = hueShift(texel.rgb, hue);
		gl_FragColor = vec4(hueShifted.rgb, 1);
  }
}
