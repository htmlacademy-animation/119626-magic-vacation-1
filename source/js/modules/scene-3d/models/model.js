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

  getDegLength(degStart, degEnd) {
    return THREE.MathUtils.degToRad(degEnd - degStart);
  }
}
