precision mediump float;

uniform sampler2D uMap;
uniform float uHue;
uniform vec2 uCanvasSize;
uniform bool uWithBubble;
uniform vec3 uBubble1;
uniform vec3 uBubble2;
uniform vec3 uBubble3;

varying vec2 vUv;

vec4 getTextureWithBubble(vec3 bubble, vec4 texel) {
  vec2 bubbleCoords = vec2(uCanvasSize.x * bubble.x, uCanvasSize.y * bubble.y);

  float dist = distance(gl_FragCoord.xy, bubbleCoords) / uCanvasSize.y;

  if (dist < bubble.z) {
    vec2 direction = (vec2(bubbleCoords.x / uCanvasSize.x, bubbleCoords.y / uCanvasSize.y ) - vUv);
    texel = texture2D(uMap, vUv + direction * dist);
  }

  return texel;
}

vec3 hueShift(vec3 color, float uHue) {
	const vec3 k = vec3(0.57735, 0.57735, 0.57735);

	float cosAngle = cos(uHue);

	return vec3(color * cosAngle + cross(k, color) * sin(uHue) + k * dot(k, color) * (1.0 - cosAngle));
}

void main() {
  vec4 texel = texture2D(uMap, vUv);

  if (uWithBubble) {
    texel = getTextureWithBubble(uBubble1, texel);
    texel = getTextureWithBubble(uBubble2, texel);
    texel = getTextureWithBubble(uBubble3, texel);
  }

	if (uHue == 0.0) {
    gl_FragColor = texel;
  } else {
    vec3 hueShifted = hueShift(texel.rgb, uHue);
		gl_FragColor = vec4(hueShifted.rgb, 1);
  }
}
