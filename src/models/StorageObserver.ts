import { Fields } from "./Contact";

interface StorageObservable {
  events: Record<string, Function[]>;
  on(eventName: string, fn: Function): void;
  off(eventName: string, fn: Function): void;
  trigger(eventName: string, data: Record<string, Fields>): void;
}

class StorageObserver implements StorageObservable {
  events: Record<string, Function[]>;

  constructor() {
    this.events = {};
  }

  on(eventName: string, fn: Function) {
    this.events[eventName] = this.events[eventName] || [];
    this.events[eventName].push(fn);
  }

  off(eventName: string, fn: Function) {
    if (this.events[eventName]) {
      for (let i = 0; i < this.events[eventName].length; i++) {
        if (this.events[eventName][i] === fn) {
          this.events[eventName].splice(i, 1);
          break;
        }
      }
    }
  }

  trigger(eventName: string, data: Record<string, Fields>) {
    if (this.events[eventName]) {
      this.events[eventName].forEach(function(fn) {
        fn(data);
      });
    }
  }
}

export default new StorageObserver();
