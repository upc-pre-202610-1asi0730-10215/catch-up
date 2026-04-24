<script setup>
/**
 * @component ArticleList
 * @description Presentation component that renders a scrollable list of
 * {@link Article} domain entities.
 *
 * Iterates over the supplied `articles` array and delegates the rendering
 * of each item to the {@link ArticleItem} component.
 *
 * ### Props
 * | Name       | Type       | Required | Description                              |
 * |------------|------------|----------|------------------------------------------|
 * | `articles` | `Article[]`| yes      | Ordered list of articles to display.     |
 */
import {toRefs} from "vue";
import ArticleItem from "./article-item.vue";

const props = defineProps({ articles: { type: Array, required: true }});
const { articles } = toRefs(props);
</script>

<template>
  <div v-for="article in articles">
    <article-item :article="article"/>
  </div>
</template>

<style scoped>

</style>