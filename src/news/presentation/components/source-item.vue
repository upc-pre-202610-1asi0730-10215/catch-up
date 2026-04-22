<script setup>
import {Source} from "../../domain/model/source.entity.js";
import {toRefs} from "vue";

const props = defineProps({ source: { type: Source, required: true } });
const emit = defineEmits(["source-selected"]);
const { source } = toRefs(props);

function emitSourceSelectedEvent() {
  emit("source-selected", source);
}
</script>

<template>
<div class="m-4">
  <div @click="emitSourceSelectedEvent" class="flex align-content-start flex-wrap">
    <span class="flex align-items-center justify-content-center mr-2">
      <pv-avatar :aria-label="source.name"
                 :image="source.urlToLogo"
                 shape="circle"/>
    </span>
    <span class="flex align-items-center justify-content-center">
      {{ source.name }}
    </span>
  </div>
</div>
</template>

<style scoped>

</style>