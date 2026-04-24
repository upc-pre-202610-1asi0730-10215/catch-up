<script setup>
/**
 * @component SourceList
 * @description Presentation component that renders all available {@link Source}
 * entities inside a sliding drawer (sidebar) panel.
 *
 * Each source is rendered by a {@link SourceItem} child component. When the
 * user selects a source the event is forwarded to the parent so it can update
 * the application store and close the drawer.
 *
 * ### Props
 * | Name      | Type       | Required | Description                                      |
 * |-----------|------------|----------|--------------------------------------------------|
 * | `visible` | `Boolean`  | no       | Controls the open/closed state of the drawer.    |
 * | `sources` | `Source[]` | no       | List of source entities to display in the drawer.|
 *
 * ### Emitted events
 * | Event             | Payload   | Description                                       |
 * |-------------------|-----------|---------------------------------------------------|
 * | `source-selected` | `Source`  | Forwarded when the user clicks a source row.      |
 */
import {Source} from "../../domain/model/source.entity.js";
import {toRefs} from "vue";
import SourceItem from "./source-item.vue";

const props = defineProps({ visible: Boolean, sources: Array[Source]});
const emit = defineEmits(['source-selected']);

/**
 * Forwards the `source-selected` event emitted by a child {@link SourceItem}
 * to the parent component.
 *
 * @param {Source} source - The {@link Source} entity selected by the user.
 * @returns {void}
 */
function emitSourceSelectedEvent(source) {
  emit('source-selected', source);
}

const { visible, sources } = toRefs(props);

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