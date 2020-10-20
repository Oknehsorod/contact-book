<template>
  <div
    class="contact-item"
    @mouseover="showDeleteButton"
    @mouseleave="hideDeleteButton"
    @click="handleClick"
  >
    <h3>{{ name }}</h3>
    <Button
      v-show="isDeleteShow"
      @click.stop="toggleModal"
      type="danger"
      class="contact-delete"
    >
      Delete
    </Button>
  </div>
  <modal :show="showModal">
    <h1 class="confirm-header">Do you want to delete '{{ $props.name }}' ?</h1>
    <Button class="confirm-button" type="danger" @click="handleDelete"
      >Delete</Button
    >
    <Button class="confirm-button" @click="toggleModal">Cancel</Button>
  </modal>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Button, Modal } from "@/components/ui";

export default defineComponent({
  name: "ContactLabel",
  components: {
    Modal,
    Button
  },
  props: {
    name: {
      type: String,
      required: true
    },
    delete: {
      type: Function,
      required: true
    }
  },
  data() {
    return {
      isDeleteShow: false,
      showModal: false
    };
  },
  methods: {
    handleDelete() {
      this.$props.delete(this.$props.name);
    },
    toggleModal() {
      this.$data.showModal = !this.$data.showModal;
    },
    handleClick() {
      this.$router.push(`/contact/${this.$props.name}`);
    },
    showDeleteButton() {
      this.$data.isDeleteShow = true;
    },
    hideDeleteButton() {
      this.$data.isDeleteShow = false;
    }
  }
});
</script>

<style lang="scss">
.contact {
  &-item {
    font-family: "Roboto", sans-serif;
    border: 1px solid #eee;
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    cursor: pointer;
    & > * {
      margin: 0 5px;
    }
  }
  &-delete {
    margin-left: auto;
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
