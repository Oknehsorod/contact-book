import { RegularContact, Fields, ContactManagerKey } from "./Contact";
import { RegularHistory } from "./History";
import storageObserver from "./StorageObserver";

const history = new RegularHistory();
const so = storageObserver;
const updateHistory = (contacts: Record<string, Fields>) =>
  history.add(JSON.stringify(contacts));

// Contact History Proxy
// Отслеживает историю действий над контактами и добавляет их в историю
// На основе истории дает сигнал о том что история обновлись
export class CHProxy extends RegularContact {
  constructor(
    contactKey: ContactManagerKey = "contacts",
    storage: Storage = window.localStorage
  ) {
    super(contactKey, storage);
  }

  create(name: string) {
    super.create(name);
  }

  update(name: string, fields: Fields) {
    super.update(name, fields);
    updateHistory(super.allContacts);
    so.trigger("update", super.allContacts);
  }

  delete(name: string) {
    super.delete(name);
    updateHistory(super.allContacts);
    so.trigger("update", super.allContacts);
  }
}
