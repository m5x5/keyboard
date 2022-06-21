import { Camera } from "three";
import { OrbitControls as _OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export default class OrbitControls extends _OrbitControls {
  constructor(camera: Camera, domElement: HTMLCanvasElement) {
    super(camera, domElement);
    this.target.set(0, 0, 0);
    this.update();
    this.maxAzimuthAngle = Math.PI / 2;
    this.enableRotate = true;
    this.enableZoom = false;
  }
}
