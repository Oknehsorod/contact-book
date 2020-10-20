<template>
  <div>
    <div
      v-if="!isChange"
      class="field-view"
      @mouseover="showDeleteButton = true"
      @mouseleave="showDeleteButton = false"
    >
      <span @click="isChange = true">
        {{ $data.currentText }}
      </span>
      <Button v-show="showDeleteButton" type="danger" @click="handleDelete"
        >Delete</Button
      >
    </div>
    <div v-else class="field-view">
      <TextField
        type="text"
        :value="currentText"
        @input="currentText = $event.target.value"
      />
      <Button @click="handleChange">Done</Button>
      <Button @click="isChange = false">Cancel</Button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { Button, TextField } from "@/components/ui";

export default defineComponent({
  name: "Field",
  components: {
    TextField,
    Button
  },
  props: {
    text: {
      type: String,
      required: true
    },
    onDelete: {
      type: Function,
      required: true
    },
    onChange: {
      type: Function,
      required: true
    }
  },
  data() {
    return {
      isChange: false,
      currentText: this.$props.text,
      showDeleteButton: false
    };
  },
  methods: {
    handleDelete() {
      this.$props.onDelete(this.$data.currentText);
    },

    handleChange() {
      if (this.$data.currentText !== "") {
        this.$props.onChange(this.$data.currentText, this.$props.text);
      }
    }
  }
});
</script>

<style lang="scss">
.field-view {
  font-size: 20px;
  font-family: "Roboto", sans-serif;
  margin: 10px 0;
  height: 40px;
  display: flex;
  align-items: center;
}
</style>
