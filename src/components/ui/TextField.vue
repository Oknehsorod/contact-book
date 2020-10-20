<template>
  <input type="text" class="textfield" v-bind="$attrs" />
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "UiTextField"
});
</script>

<style lang="scss">
.textfield {
  height: 30px;
  border-radius: 5px;
  border: 1px solid #eee;
  font-family: "Roboto", sans-serif;
  font-size: 20px;
}
</style>
