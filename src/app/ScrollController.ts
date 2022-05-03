class CustomEvent extends Event {
  position = 0;
  percent = 0;
  constructor(type: string, position: number, percent: number) {
    super(type);
    this.position = position;
    this.percent = percent;
  }

  set target(value: EventTarget) {}
}

// eslint-disable-next-line no-unused-vars
type Listener = (event: CustomEvent) => void;

export default class ScrollController {
  private lastScrollPosition = 0;
  private listeners: Array<Function> = [];
  constructor() {
    document.addEventListener("onload", () => {
      this.lastScrollPosition = window.scrollY;
    });
    document.addEventListener("scroll", () => {
      const newScrollPosition = window.scrollY;
      const possibleScrollAmount = document.body.scrollHeight - innerHeight;
      const percent = newScrollPosition / possibleScrollAmount;

      this.lastScrollPosition = newScrollPosition;
      const event = new CustomEvent("scroll", this.lastScrollPosition, percent);

      this.dispatchEvent(event);
    });
  }

  addEventListener(type: string, listener: Listener) {
    if (type === "scroll") {
      this.listeners.push(listener);
    }
  }

  dispatchEvent(event: CustomEvent): void {
    for (let listener of this.listeners) {
      listener(event);
    }
  }
}
