import { Storage } from "./Storage";

export type Fields = string[];
export type Contacts = Record<string, Fields>;
export type ContactManagerKey = string;
export interface ContactManager {
  allContacts: Contacts;
  create(name: string): void;
  update(name: string, data: Fields): void;
  getFields(name: string): Fields | null;
  delete(name: string): void;
}

export class RegularContact implements ContactManager {
  private localStorage: Storage;
  private contactKey: ContactManagerKey;

  constructor(
    contactKey: ContactManagerKey = "contacts",
    storage: Storage = window.localStorage
  ) {
    this.contactKey = contactKey;
    this.localStorage = storage;
  }

  create(name: string) {
    if (name === "") {
      return;
    }

    this.update(name, []);
  }

  delete(name: string) {
    const data = this.allContacts;
    delete data[name];
    this.allContacts = data;
  }

  update(name: string, fields: Fields) {
    const data = this.allContacts;
    data[name] = [...new Set(fields)];
    this.allContacts = data;
  }

  getFields(name: string): Fields | null {
    return this.allContacts[name] || null;
  }

  get allContacts(): Contacts {
    return JSON.parse(this.localStorage.getItem(this.contactKey) || "{}");
  }

  set allContacts(data: Contacts) {
    this.localStorage.setItem(this.contactKey, JSON.stringify(data));
  }
}
