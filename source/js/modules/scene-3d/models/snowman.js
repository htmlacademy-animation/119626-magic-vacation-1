import * as THREE from 'three';

export default class ModelSnowman extends THREE.Group {
  constructor() {
    super();

    this.defaultMaterial = new THREE.MeshStandardMaterial({color: 0XB2D0F4});

    this.constructChildren();
  }


  constructChildren() {
    this.addHead();
    this.addBody();
    this.addCarrot();
  }

  addHead() {
    const geometry = new THREE.SphereGeometry(44, 32, 32);
    const mesh = new THREE.Mesh(geometry, this.defaultMaterial);

    mesh.position.set(0, 173, 0);

    this.add(mesh);
  }

  addBody() {
    const geometry = new THREE.SphereGeometry(75, 32, 32);
    const mesh = new THREE.Mesh(geometry, this.defaultMaterial);

    mesh.position.set(0, 65, 0);

    this.add(mesh);
  }

  addCarrot() {
    const geometry = new THREE.ConeGeometry(18, 75, 30);
    const material = new THREE.MeshStandardMaterial({color: 0XFF4500});
    const mesh = new THREE.Mesh(geometry, material);

    mesh.position.set(50, 173, 0);
    mesh.rotateZ(THREE.MathUtils.degToRad(-90));

    this.add(mesh);
  }
}
