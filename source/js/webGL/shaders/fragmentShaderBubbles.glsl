precision mediump float;

uniform sampler2D map;

uniform float hue;

uniform vec2 canvasSize;

varying vec2 vUv;

struct Bubble {
  float radius;
  vec2 coord;
};

vec4 getTextureWithBubble(Bubble bubble, vec4 texel) {
  vec2 bubbleCoord = vec2(canvasSize.x * bubble.coord.x, canvasSize.y * bubble.coord.y);

  float distance = distance(gl_FragCoord.xy, bubbleCoord) / bubbleCoord.y;

  if (distance < bubble.radius) {
		const float distortion = 0.02;

    vec2 direction = vec2(bubbleCoord.x / canvasSize.x, bubbleCoord.y / canvasSize.y);

		vec2 shift = direction * (distortion - (distortion / bubble.radius) * distance);

    texel = texture2D(map, vUv + shift);
  }

  return texel;
}

vec3 hueShift(vec3 color, float hue) {
	const vec3 k = vec3(0.57735, 0.57735, 0.57735);

	float cosAngle = cos(hue);

	return vec3(color * cosAngle + cross(k, color) * sin(hue) + k * dot(k, color) * (1.0 - cosAngle));
}

const Bubble bubble1 = Bubble(0.1, vec2(0.95, 1.8));
const Bubble bubble2 = Bubble(0.15, vec2(0.65, 0.65));
const Bubble bubble3 = Bubble(0.25, vec2(1.25, 0.75));

void main() {
  vec4 texel = texture2D(map, vUv);

  texel = getTextureWithBubble(bubble1, texel);
	texel = getTextureWithBubble(bubble2, texel);
	texel = getTextureWithBubble(bubble3, texel);

	if (hue == 0.0) {
    gl_FragColor = texel;
  } else {
    vec3 hueShifted = hueShift(texel.rgb, hue);
		gl_FragColor = vec4(hueShifted.rgb, 1);
  }
}
