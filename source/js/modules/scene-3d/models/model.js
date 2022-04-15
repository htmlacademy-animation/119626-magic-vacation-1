import * as THREE from 'three';

export default class Model extends THREE.Group {
  constructor() {
    super();
  }

  getLathePoints(borderWidth, height, radius) {
    const points = [];

    for (let i = radius; i <= radius + borderWidth; i++) {
      for (let j = 1; j <= height; j++) {
        points.push(new THREE.Vector2(i, j));
      }
    }

    return points;
  }


  getLatheDegrees(degStart, degEnd) {
    const start = THREE.Math.DEG2RAD * degStart;
    const length = THREE.Math.DEG2RAD * (degEnd - degStart);

    return {start, length};
  }
}
