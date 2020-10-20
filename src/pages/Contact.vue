<template>
  <main class="contact-data">
    <div class="field-list">
      <field
        v-for="field in fields"
        :key="field"
        :text="field"
        :onChange="updateField"
        :onDelete="showModal"
      />
    </div>

    <div class="contact-actions">
      <ActionPanel :onsubmit="addField" placeholder="Add fields..." />
      <Button @click="undo">Undo</Button>
      <Button @click="redo">Redo</Button>
    </div>
  </main>
  <modal :show="modalShow">
    <h1 class="confirm-header">Do you want to delete '{{ $props.name }}' ?</h1>
    <Button class="confirm-button" type="danger" @click="deleteField"
      >Delete</Button
    >
    <Button class="confirm-button" @click="closeModal">Cancel</Button>
  </modal>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { CHProxy as RegularContact } from "@/models/CHProxy";
import { RegularHistory } from "@/models/History";
import { Fields } from "@/models/Contact";
import storageObserver from "@/models/StorageObserver";

import Field from "@/components/Field.vue";
import ActionPanel from "@/components/ActionPanel.vue";
import { Button, Modal } from "@/components/ui";

const contact = new RegularContact();
const history = new RegularHistory();

export default defineComponent({
  name: "Contact",
  components: {
    Field,
    Modal,
    Button,
    ActionPanel
  },
  beforeRouteUpdate(to, from, next) {
    this.$data.fields =
      new RegularContact().getFields(to.params.name as string) || [];
    next();
  },
  data() {
    return {
      fields: new RegularContact().getFields(this.$route.params.name as string),
      newField: "",
      modalShow: false,
      fieldToDelete: ""
    };
  },
  created() {
    storageObserver.on("update", (data: Record<string, Fields>) => {
      this.$data.fields = data[this.$route.params.name as string];
    });
  },
  methods: {
    getFields(): Fields {
      const name = this.$route.params.name as string;
      return contact.getFields(name) || [];
    },
    addField(field: string) {
      if (field.split(":").length !== 2) {
        return;
      }
      const fields = this.getFields();
      const name = this.$route.params.name as string;
      const mutator = () => fields.push(field);
      mutator();
      contact.update(name, fields);

      this.$data.newField = "";
    },
    showModal(field: string) {
      this.$data.modalShow = true;
      this.$data.fieldToDelete = field;
    },
    closeModal() {
      this.$data.modalShow = false;
      this.$data.fieldToDelete = "";
    },
    updateField(newVal: string, oldVal: string) {
      if (newVal.split(":").length !== 2) {
        return;
      }
      const fields = this.getFields();
      const name = this.$route.params.name as string;
      const mutator = (field: string) => {
        if (field === oldVal) {
          return newVal;
        }
        return field;
      };

      contact.update(name, fields.map(mutator));
    },
    deleteField() {
      const name = this.$route.params.name as string;
      const fields = this.getFields();
      contact.update(
        name,
        fields.filter(f => f !== this.$data.fieldToDelete)
      );

      this.$data.modalShow = false;
      this.$data.fieldToDelete = "";
    },
    undo() {
      storageObserver.trigger("update", JSON.parse(history.prev()));
    },
    redo() {
      storageObserver.trigger("update", JSON.parse(history.next()));
    }
  }
});
</script>

<style lang="scss">
@media (max-width: 768px) {
  main.contact-data {
    display: none;
  }
}

.field-list {
  padding: 10px;
  overflow-x: hidden;
  height: 100%;
}
.contact {
  &-data {
    width: 100%;
    display: flex;
    height: 100%;
    flex-direction: column;
  }
  &-actions {
    display: flex;
    justify-content: center;
    align-items: center;
    & > button {
      margin: 0 5px;
    }
  }
}
.confirm {
  &-header {
    font-family: "Roboto", sans-serif;
    margin: 0 0 10px 0;
  }
  &-button {
    margin: 0 5px;
  }
}
</style>
