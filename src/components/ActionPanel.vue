<template>
  <div class="action-panel">
    <TextField
      :value="text"
      @input="text = $event.target.value"
      @keyup.enter="add"
      v-bind="$attrs"
    />
    <Button @click="add">Add</Button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Button, TextField } from "@/components/ui";

export default defineComponent({
  props: {
    onsubmit: {
      type: Function,
      required: true
    }
  },
  components: {
    Button,
    TextField
  },
  data() {
    return {
      text: ""
    };
  },
  methods: {
    add() {
      if (this.$data.text === "") {
        return;
      }

      this.$props.onsubmit(this.$data.text);
      this.$data.text = "";
    }
  }
});
</script>

<style lang="scss">
.action-panel {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 5px;
  & > * {
    margin: 0 5px;
  }
}
</style>
