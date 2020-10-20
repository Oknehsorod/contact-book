<template>
  <div v-if="$props.show" class="modal-smooth">
    <div class="modal-body">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Modal",
  props: {
    show: {
      type: Boolean,
      required: true
    }
  }
});
</script>

<style lang="scss">
.modal {
  &-smooth {
    background: rgba(12, 12, 12, 0.7);
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  &-body {
    background: white;
    width: 50%;
    border-radius: 5px;
    padding: 10px;
  }
}
</style>
