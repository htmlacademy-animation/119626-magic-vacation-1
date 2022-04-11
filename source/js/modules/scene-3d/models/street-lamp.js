import * as THREE from 'three';

export default class ModelStreetLamp extends THREE.Group {
  constructor() {
    super();

    this.defaultMaterial = new THREE.MeshStandardMaterial({color: 0x514EF3});

    this.constructChildren();
  }


  constructChildren() {
    this.addLamp();
    this.addPillar();
    this.addBase();
  }

  addLamp() {
    const lampTopGeometry = new THREE.CylinderGeometry(45, 57, 6, 4);
    const lampTopMesh = new THREE.Mesh(lampTopGeometry, this.defaultMaterial);

    lampTopMesh.position.set(0, 433, 0);

    this.add(lampTopMesh);

    const lampMidGeometry = new THREE.CylinderGeometry(42, 34, 60, 4);
    const lampMidMaterial = new THREE.MeshStandardMaterial({color: 0xAE9BFF});
    const lampMidMesh = new THREE.Mesh(lampMidGeometry, lampMidMaterial);

    lampMidMesh.position.set(0, 400, 0);

    this.add(lampMidMesh);

    const lampBottomGeometry = new THREE.CylinderGeometry(37, 37, 4, 4);
    const lampBottomMesh = new THREE.Mesh(lampBottomGeometry, this.defaultMaterial);

    lampBottomMesh.position.set(0, 368, 0);

    this.add(lampBottomMesh);
  }

  addPillar() {
    const geometry = new THREE.CylinderGeometry(7, 7, 230, 16);
    const mesh = new THREE.Mesh(geometry, this.defaultMaterial);

    mesh.position.set(0, 251, 0);

    this.add(mesh);
  }

  addBase() {
    const baseTopGeometry = new THREE.SphereGeometry(16, 32, 32);
    const baseTopMesh = new THREE.Mesh(baseTopGeometry, this.defaultMaterial);

    baseTopMesh.position.set(0, 120, 0);

    this.add(baseTopMesh);

    const baseBottomGeometry = new THREE.CylinderGeometry(16, 16, 120, 16);
    const baseBottomMesh = new THREE.Mesh(baseBottomGeometry, this.defaultMaterial);

    baseBottomMesh.position.set(0, 60, 0);

    this.add(baseBottomMesh);
  }
}
