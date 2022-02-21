precision mediump float;

uniform sampler2D uMap;
uniform float uHue;
uniform vec2 uCanvasSize;
uniform bool uShouldRenderBubbles;

const float bubbleBorderWidth = 0.01;
const vec4 bubbleBorderColor = vec4(1.0, 1.0, 1.0, 0.15);

const vec3 bubble1 = vec3(0.75, 0.25, 0.3);
const vec3 bubble2 = vec3(1.0, 1.0, 0.25);
const vec3 bubble3 = vec3(1.2, 1.5, 0.2);

varying vec2 vUv;

vec4 getTextureWithBubbleBorder(vec4 texel, vec4 color) {
  return vec4(mix(texel.rgb, color.rgb, color.a), texel.a);
}

vec4 getTextureWithBubble(vec3 bubble, vec4 texel) {
  float radius = bubble.z;

  vec2 bubbleCoords = vec2(uCanvasSize.x * bubble.x, uCanvasSize.y * bubble.y);

  float dist = distance(gl_FragCoord.xy, bubbleCoords) / uCanvasSize.y;

  // distortion
  if (dist < radius) {
    texel = texture2D(uMap, vUv + (dist * dist * dist));
  }

  // border
  if (dist > radius && dist <= radius + bubbleBorderWidth) {
    texel = getTextureWithBubbleBorder(texture2D(uMap, vUv), bubbleBorderColor);
  }

  // highlight
  float highlightRadius = radius * 0.75;

  vec2 highlightCoords = gl_FragCoord.xy - bubbleCoords;

  float highlightAngleStart = 2.0;
  float highlightAngleEnd = 2.5;
  float highlightAngle = atan(highlightCoords.y, highlightCoords.x);

  bool shouldRenderHighlight = highlightAngle >= highlightAngleStart && highlightAngle <= highlightAngleEnd;

  if (dist > highlightRadius && dist < highlightRadius + bubbleBorderWidth && shouldRenderHighlight) {
    texel = getTextureWithBubbleBorder(texture2D(uMap, vUv), bubbleBorderColor);
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

  if (uShouldRenderBubbles) {
    texel = getTextureWithBubble(bubble1, texel);
    texel = getTextureWithBubble(bubble2, texel);
    texel = getTextureWithBubble(bubble3, texel);
  }

	if (uHue == 0.0) {
    gl_FragColor = texel;
  } else {
    vec3 hueShifted = hueShift(texel.rgb, uHue);
		gl_FragColor = vec4(hueShifted.rgb, 1);
  }
}
