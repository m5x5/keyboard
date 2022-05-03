import {
  AnimationAction,
  AudioListener,
  Color,
  PerspectiveCamera,
  Raycaster,
  Scene,
  Vector2,
  Vector3,
  WebGLRenderer,
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Animator from "./Animator";
import { Keyboard } from "./Keyboard";
import { LightingControls } from "./LightingControls";
import ScrollController from "./ScrollController";

const CONTROLS_ENABLED = false;

export class App {
  private readonly fov = 45;
  private readonly aspect = innerWidth / innerHeight;
  private readonly near = 0.1;
  private far = 1000.0;

  private readonly scene = new Scene();
  private readonly camera = new PerspectiveCamera(
    this.fov,
    this.aspect,
    this.near,
    this.far
  );
  private readonly renderer = new WebGLRenderer({
    antialias: true,
    canvas: document.getElementById("main-canvas") as HTMLCanvasElement,
  });

  private readonly controls;
  private readonly listener = new AudioListener();

  private keyboard: Keyboard;

  private lightingControls = new LightingControls();
  private action?: AnimationAction;

  constructor() {
    this.scene.add(this.lightingControls);

    this.camera.position.set(0, 200, 0);
    this.camera.lookAt(new Vector3(0, 0, 0));
    this.camera.add(this.listener);

    this.renderer.setSize(innerWidth, innerHeight);
    this.renderer.setClearColor(new Color(0x181818));
    this.keyboard = new Keyboard(this.scene);
    this.keyboard.root?.position.setX(50);

    const scrollController = new ScrollController();
    new Animator(this.keyboard, scrollController);

    if (CONTROLS_ENABLED) {
      this.controls = new OrbitControls(this.camera, this.renderer.domElement);
      this.controls.target.set(0, 0, 0);
      this.controls.update();
      this.controls.maxAzimuthAngle = Math.PI / 2;
      this.controls.enableRotate = true;
      this.controls.enableZoom = false;
    }

    document.addEventListener("mousedown", this.checkIntersection.bind(this));
    this.render();
  }

  private adjustCanvasSize() {
    this.renderer.setSize(innerWidth, innerHeight);
    this.camera.aspect = innerWidth / innerHeight;
    this.camera.updateProjectionMatrix();
  }

  private render() {
    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(this.render.bind(this));

    this.adjustCanvasSize();
  }

  private checkIntersection(event: MouseEvent) {
    const ray = new Raycaster();
    const mouse = new Vector2();

    mouse.x = (event.clientX / this.renderer.domElement.clientWidth) * 2 - 1;
    mouse.y = -(event.clientY / this.renderer.domElement.clientHeight) * 2 + 1;

    ray.setFromCamera(mouse, this.camera);

    if (this.action?.paused) {
      console.log(this.action?.getRoot());
    }
  }
}
