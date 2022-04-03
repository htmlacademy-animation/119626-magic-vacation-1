precision mediump float;

uniform sampler2D uMap;
uniform float uHue;
uniform vec2 uCanvasSize;
uniform bool uShouldRenderBubbles;

uniform float uProgressHue;
uniform float uProgressBubble1;
uniform float uProgressBubble2;
uniform float uProgressBubble3;

const float bubbleBorderWidth = 0.01;
const vec4 bubbleBorderColor = vec4(1.0, 1.0, 1.0, 0.15);

struct Bubble {
  vec2 coords;
  float radius;
  float amplitude;
  float startXCoord;
};

const Bubble bubble1 = Bubble(vec2(0.75, 0.25), 0.3, 0.08, 0.9);
const Bubble bubble2 = Bubble(vec2(1.0, 1.0), 0.25, 0.1, 0.75);
const Bubble bubble3 = Bubble(vec2(1.2, 1.5), 0.2, 0.05, 0.6);

varying vec2 vUv;

vec4 getTextureWithBubbleBorder(vec4 texel, vec4 color) {
  return vec4(mix(texel.rgb, color.rgb, color.a), texel.a);
}

vec2 getBubbleCoords(Bubble bubble, float progress){
  float x = bubble.amplitude * sin(progress * 3.14 * 3.0) + bubble.startXCoord;
  float y = 2.0 * progress + bubble.radius;

  return vec2(uCanvasSize.x * x, uCanvasSize.y * y);
}

vec4 getTextureWithBubble(Bubble bubble, vec4 texel, float progress) {
  float radius = bubble.radius;

  vec2 bubbleCoords = getBubbleCoords(bubble, progress);

  float dist = distance(gl_FragCoord.xy, bubbleCoords) / uCanvasSize.y;

  // distortion
  if (dist < radius) {
    texel = texture2D(uMap, vUv + dist * dist * dist);
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

  if (shouldRenderHighlight && dist > highlightRadius && dist < highlightRadius + bubbleBorderWidth) {
    texel = getTextureWithBubbleBorder(texture2D(uMap, vUv), bubbleBorderColor);
  }

  return texel;
}

vec3 hueShift(vec3 color, float hue) {
	const vec3 k = vec3(0.57735, 0.57735, 0.57735);

	float cosAngle = cos(hue);

	return vec3(color * cosAngle + cross(k, color) * sin(hue) + k * dot(k, color) * (1.0 - cosAngle));
}

void main() {
  vec4 texel = texture2D(uMap, vUv);

  if (uShouldRenderBubbles) {
    // render bubbles
    if (uProgressBubble1 > 0.0) {
      texel = getTextureWithBubble(bubble1, texel, uProgressBubble1);
    }

    if (uProgressBubble2 > 0.0) {
      texel = getTextureWithBubble(bubble2, texel, uProgressBubble2);
    }

    if (uProgressBubble3 > 0.0) {
      texel = getTextureWithBubble(bubble3, texel, uProgressBubble3);
    }

    // hue shift
    float hue = uHue * uProgressHue * -1.0;
    vec3 hueShifted = hueShift(texel.rgb, hue);
		gl_FragColor = vec4(hueShifted.rgb, 1);
  } else {
    gl_FragColor = texel;
  }
}
