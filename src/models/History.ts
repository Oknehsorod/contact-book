import { Storage } from "./Storage";

type HistoryState = string;

interface History {
  size: number;
  add(state: HistoryState): void;
  next(): HistoryState;
  prev(): HistoryState;
}

interface HistoryKeys {
  index: string;
  data: string;
}

export class RegularHistory implements History {
  size: number;
  storage: Storage;
  historyKeys: HistoryKeys;
  targetKey: string;

  constructor(
    size = 10,
    historyKeys: HistoryKeys = {
      index: "history:index",
      data: "history:data"
    },
    targetKey = "contacts",
    storage: Storage = window.localStorage
  ) {
    this.size = size;
    this.targetKey = targetKey;
    this.historyKeys = historyKeys;
    this.storage = storage;
  }

  add(state: HistoryState) {
    let stack = this.stack;
    if (stack.length >= this.size) {
      stack = stack.slice(stack.length - this.size);
    }
    stack.push(state);
    this.stack = stack;
    this.currentIndex = stack.length - 1;
  }

  next() {
    if (this.currentIndex < this.stack.length - 1) {
      this.currentIndex += 1;
    }
    this.storage.setItem(this.targetKey, this.currentStack);
    return this.currentStack;
  }

  prev() {
    if (this.currentIndex > 0) {
      this.currentIndex -= 1;
    }
    this.storage.setItem(this.targetKey, this.currentStack);
    return this.currentStack;
  }

  private get currentStack() {
    return this.stack[this.currentIndex];
  }

  private get currentIndex() {
    return parseInt(this.storage.getItem(this.historyKeys.index) || "0");
  }

  private set currentIndex(newVal: number) {
    this.storage.setItem(this.historyKeys.index, newVal.toString());
  }

  private get stack() {
    return JSON.parse(this.storage.getItem(this.historyKeys.data) || '["{}"]');
  }

  private set stack(val: HistoryState[]) {
    this.storage.setItem(this.historyKeys.data, JSON.stringify(val));
  }
}
