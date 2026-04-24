<script setup>
import {Source} from "../../domain/model/source.entity.js";
import {toRef} from "vue";
import SourceItem from "./source-item.vue";

const props = defineProps({ visible: Boolean, sources: Array[Source]});
const emit = defineEmits(['source-selected']);

function emitSourceSelectedEvent(source) {
  emit('source-selected', source);
}

const { visible, sources } = toRef(props);

</script>

<template>
<pv-drawer v-bind:visible="visible">
  <source-item v-for="source in sources"
               :key="source.id"
               :source="source"
               @source-selected="emitSourceSelectedEvent(source)"/>

</pv-drawer>
</template>

<style scoped>

</style>