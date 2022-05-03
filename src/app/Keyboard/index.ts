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
}
