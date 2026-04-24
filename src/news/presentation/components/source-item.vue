<script setup>
/**
 * @component SourceItem
 * @description Presentation component that renders a single {@link Source}
 * domain entity as a clickable list row consisting of a logo avatar and the
 * source's display name.
 *
 * Clicking the row emits a `source-selected` event that bubbles up through
 * the source selection drawer to the application store.
 *
 * ### Props
 * | Name     | Type     | Required | Description                       |
 * |----------|----------|----------|-----------------------------------|
 * | `source` | `Source` | yes      | The source entity to display.     |
 *
 * ### Emitted events
 * | Event             | Payload            | Description                              |
 * |-------------------|--------------------|------------------------------------------|
 * | `source-selected` | `Ref<Source>`      | Emitted when the user clicks the row.    |
 */
import {Source} from "../../domain/model/source.entity.js";
import {toRefs} from "vue";

const props = defineProps({ source: { type: Source, required: true } });
const emit = defineEmits(["source-selected"]);
const { source } = toRefs(props);

/**
 * Emits the `source-selected` event carrying the reactive reference to the
 * current source entity so that ancestor components can update the
 * application store.
 *
 * @returns {void}
 */
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