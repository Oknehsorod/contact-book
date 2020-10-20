<template>
  <div class="contact-layout">
    <aside class="contact-sidebar">
      <div class="contact-list">
        <contact-label
          v-for="contact in allContacts"
          v-bind:key="contact"
          v-bind:name="contact"
          :delete="deleteContact"
        />
      </div>

      <action-panel :onsubmit="addNewContact" placeholder="Add contacts..." />
    </aside>
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { CHProxy as RegularContact } from "@/models/CHProxy";
import storageObserver from "@/models/StorageObserver";
import { Fields } from "@/models/Contact";

import ContactLabel from "@/components/ContactLabel.vue";
import ActionPanel from "@/components/ActionPanel.vue";

const contact = new RegularContact();
export default defineComponent({
  name: "Home",
  components: {
    ContactLabel,
    ActionPanel
  },
  data() {
    return {
      newContactName: "",
      allContacts: Object.keys(contact.allContacts)
    };
  },
  created() {
    storageObserver.on("update", (data: Record<string, Fields>) => {
      this.$data.allContacts = Object.keys(data);
    });
  },
  methods: {
    deleteContact(name: string) {
      contact.delete(name);
    },
    addNewContact(name: string) {
      contact.create(name);
      this.$data.newContactName = "";
    }
  }
});
</script>

<style lang="scss">
@media (max-width: 768px) {
  aside.contact-sidebar {
    width: 100%;
  }
}

.contact {
  &-sidebar {
    width: 300px;
    height: 100%;
    border: 1px solid #121212;
    display: flex;
    flex-direction: column;
    font-family: "Roboto", sans-serif;
    flex-shrink: 0;
  }
  &-layout {
    display: flex;
    height: 100vh;
    overflow: hidden;
  }
  &-list {
    padding: 0;
    overflow-x: hidden;
    height: 100%;
  }
}
</style>
