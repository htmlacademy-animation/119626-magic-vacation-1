import * as THREE from 'three';
import Model from './model';

export default class ModelSaturn extends Model {
  constructor() {
    super();

    this.colorRed = 0XFC2947;
    this.colorPurple = 0X5B3EA5;
    this.colorWhite = 0X8388AB;

    this.radiusPlanet = 60;
    this.radiusSatelite = 10;
    this.radiusRingInner = 80;
    this.radiusRingOuter = 120;

    this.constructChildren();
  }


  constructChildren() {
    this.addPlanet();
    this.addSatellite();
    this.addRope();
    this.addRing();
  }

  addPlanet() {
    const geometry = new THREE.SphereGeometry(this.radiusPlanet, 32, 32);
    const material = new THREE.MeshStandardMaterial({color: this.colorRed});
    const mesh = new THREE.Mesh(geometry, material);

    this.add(mesh);
  }

  addSatellite() {
    const geometry = new THREE.SphereGeometry(this.radiusSatelite, 32, 32);
    const material = new THREE.MeshStandardMaterial({color: this.colorPurple});
    const mesh = new THREE.Mesh(geometry, material);
    const meshY = this.radiusPlanet * 2;

    mesh.position.set(0, meshY, 0);

    this.add(mesh);
  }

  addRope() {
    const geometry = new THREE.CylinderGeometry(1, 1, 1000, 8);
    const mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({color: this.colorWhite}));
    const meshY = this.radiusPlanet + geometry.parameters.height / 2;

    mesh.position.set(0, meshY, 0);

    this.add(mesh);
  }

  addRing() {
    const points = this.getLathePoints(this.radiusRingOuter - this.radiusRingInner, 2, 80);
    const geometry = new THREE.LatheGeometry(points, 32);
    const material = new THREE.MeshBasicMaterial({color: this.colorPurple, side: THREE.DoubleSide});
    const mesh = new THREE.Mesh(geometry, material);

    mesh.rotateX(THREE.MathUtils.degToRad(18));
    mesh.rotateZ(THREE.MathUtils.degToRad(10));

    this.add(mesh);
  }
}
