<template>
  <button :class="mainClass" v-bind="$attrs">
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "UiButton",
  props: {
    type: {
      type: String
    }
  },
  computed: {
    mainClass(): string {
      const variants: Record<string, string> = {
        primary: "button button-primary",
        danger: "button button-danger"
      };
      return variants[this.$props.type || "primary"];
    }
  }
});
</script>

<style lang="scss">
.button {
  height: 40px;
  font-family: "Roboto", sans-serif;
  font-size: 15px;
  padding: 0 15px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  &-primary {
    background-color: #eee;
    &:hover {
      background-color: darken($color: #eee, $amount: 10);
    }
  }
  &-danger {
    background-color: #f44336;
    color: white;
    &:hover {
      background-color: darken($color: #f44336, $amount: 10);
    }
  }
}
</style>
