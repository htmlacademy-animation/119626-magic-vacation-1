import * as THREE from 'three';

export default class ModelPyramid extends THREE.Group {
  constructor() {
    super();

    this.defaultMaterial = new THREE.MeshStandardMaterial({color: 0x1861cf});

    this.constructChildren();
  }


  constructChildren() {
    this.addPyramid();
  }

  addPyramid() {
    const geometry = new THREE.ConeBufferGeometry(Math.hypot(250, 250) / 2, 280, 4);
    const mesh = new THREE.Mesh(geometry, this.defaultMaterial);

    mesh.position.set(0, 125, 0);

    this.add(mesh);
  }
}
