import { AnimationClip, Group, Scene } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
export class Keyboard {
  scene: Scene;
  animations: AnimationClip[] = [];
  root?: Group;
  onload = () => {};
  constructor(scene: Scene) {
    this.scene = scene;
    const loader = new GLTFLoader();
    loader.load("/public/Keyboard.glb", (gltf) => {
      this.root = gltf.scene;
      this.animations = gltf.animations;
      this.root.scale.set(100, 100, 100);
      this.root.rotateY(Math.PI);
      this.scene.add(this.root);
      this.onload();
    });
  }

  scroll({ position, percent }: { position: number; percent: number }) {
    if (this.root) {
      this.root.children.forEach((child, i) => {
        console.log(child.name);
        if (
          child.name.startsWith("Knob") ||
          child.name.startsWith("Cylinder")
        ) {
          if (child.name === "Cylinder001") return;
          if (percent > 0.1) {
            const offset = 0.1;
            child.rotation.y = (percent - offset) * 10;
          }
        }
      });
    }
  }
}
