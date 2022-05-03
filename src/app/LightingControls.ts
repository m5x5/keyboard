import { GUI } from "dat.gui";
import { AmbientLight, Group, PointLight, PointLightHelper } from "three";
const DEBUG = false;

export class LightingControls extends Group {
  private ambientLight = new AmbientLight(0xffffff, 0.4);
  private pointLight = new PointLight();
  constructor() {
    super();
    this.add(this.ambientLight);
    this.ambientLight.intensity = 0.4;
    this.pointLight.distance = 0;
    this.pointLight.decay = 2;
    this.pointLight.intensity = 1;
    this.pointLight.position.x = -98;
    this.pointLight.position.y = 119;
    this.pointLight.position.z = 227;
    if (DEBUG) {
      const gui = new GUI();
      gui.add(this.ambientLight, "intensity", 0, 1);
      gui.add(this.pointLight, "intensity", 0, 1);
      gui.add(this.pointLight, "distance", 0, 1000);
      gui.add(this.pointLight, "decay", 0, 1);
      gui.add(this.pointLight.position, "x", -1000, 1000);
      gui.add(this.pointLight.position, "y", -1000, 1000);
      gui.add(this.pointLight.position, "z", -1000, 1000);
    }
    this.add(this.pointLight);
    const pointLightHelper = new PointLightHelper(this.pointLight);
    this.add(pointLightHelper);
  }
}
