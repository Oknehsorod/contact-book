export interface Storage {
  setItem(key: string, val: string): void;
  getItem(key: string): string | null;
  removeItem(key: string): void;
}
