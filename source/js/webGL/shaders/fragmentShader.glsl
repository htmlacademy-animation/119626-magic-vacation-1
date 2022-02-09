precision mediump float;

uniform sampler2D map;

uniform float hue;

uniform vec2 canvasSize;

uniform bool shouldRenderBubbles;

uniform vec3 bubble1;
uniform vec3 bubble2;
uniform vec3 bubble3;

varying vec2 vUv;

vec4 getTextureWithBubble(vec3 bubble, vec4 texel) {
  float bubbleX = bubble[0];
  float bubbleY = bubble[1];
  float bubbleRadius = bubble[2];

  vec2 bubbleCoord = vec2(canvasSize.x * bubbleX, canvasSize.y * bubbleY);

  float distance = distance(gl_FragCoord.xy, bubbleCoord) / bubbleCoord.y;

  if (distance < bubbleRadius) {
		const float distortion = 0.02;

    vec2 direction = vec2(bubbleCoord.x / canvasSize.x, bubbleCoord.y / canvasSize.y);

		vec2 shift = direction * (distortion - (distortion / bubbleRadius) * distance);

    texel = texture2D(map, vUv + shift);
  }

  return texel;
}

vec3 hueShift(vec3 color, float hue) {
	const vec3 k = vec3(0.57735, 0.57735, 0.57735);

	float cosAngle = cos(hue);

	return vec3(color * cosAngle + cross(k, color) * sin(hue) + k * dot(k, color) * (1.0 - cosAngle));
}

void main() {
  vec4 texel = texture2D(map, vUv);

  if (shouldRenderBubbles == true) {
    texel = getTextureWithBubble(bubble1, texel);
    texel = getTextureWithBubble(bubble2, texel);
    texel = getTextureWithBubble(bubble3, texel);
  }

	if (hue == 0.0) {
    gl_FragColor = texel;
  } else {
    vec3 hueShifted = hueShift(texel.rgb, hue);
		gl_FragColor = vec4(hueShifted.rgb, 1);
  }
}
