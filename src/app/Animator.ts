import { AnimationAction, AnimationMixer, Mesh } from "three";
import { Keyboard } from "./Keyboard";
import ScrollController from "./ScrollController";

export default class Animator {
  mixer: AnimationMixer;
  action?: AnimationAction;
  obj: Keyboard;

  constructor(obj: Keyboard, controller: ScrollController) {
    this.obj = obj;
    let mesh = new Mesh();
    this.mixer = new AnimationMixer(mesh);

    this.obj.onload = () => {
      this.obj.animations.forEach((clip) => {
        if (this.mixer) {
          this.action = this.mixer.clipAction(clip, this.obj.root);
          this.action.repetitions = 1;
          this.action.play();
          this.action.clampWhenFinished = true;
        }
      });
    };

    controller.addEventListener("scroll", (args) => this.scroll(args));
  }

  scroll({ position, percent }: { position: number; percent: number }) {
    if (this.mixer) {
      this.mixer.setTime(percent);

      const header = document.querySelector("header");
      if (header) {
        if (position === 0) {
          this.mixer.setTime(0);
          header.style.display = "grid";
        }

        if (position > 40) {
          header.style.display = "none";
        }
        if (position < 40) {
          header.style.display = "grid";
          header.style.transform = `translateX(${position * -15}px)`;
        }

        this.obj.scroll({ position, percent });
      }
    }
  }
}
