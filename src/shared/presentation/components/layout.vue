<script setup>
/**
 * @component Layout
 * @description Root layout component for the News bounded context.
 *
 * Composes the application's top-level shell: a navigation bar (menubar)
 * with a drawer-based source selector, the main article feed, and a footer.
 * It bridges the presentation layer with the {@link newsStore} application
 * store, triggering data loading on mount and coordinating source selection
 * across child components.
 *
 * Responsibilities:
 * - Triggers {@link newsStore.loadSources} on mount.
 * - Toggles the source-selection drawer open/closed.
 * - Delegates source selection to the store via {@link newsStore.setCurrentSource}.
 * - Exposes computed references to `sources`, `articles`, and `errors` from
 *   the store so child components remain decoupled from the store directly.
 */
import {computed, onMounted, ref} from "vue";
import FooterContent from "./footer-content.vue";
import LanguageSwitcher from "./language-switcher.vue";
import {newsStore} from "../../../news/application/news.store.js";
import SourceList from "../../../news/presentation/components/source-list.vue";
import ArticleList from "../../../news/presentation/components/article-list.vue";
import UnavailableContent from "../../../news/presentation/components/unavailable-content.vue";

/** @type {import('vue').Ref<boolean>} Controls the visibility of the source-selection drawer. */
const drawerVisible = ref(false);

/**
 * Toggles the source-selection drawer between open and closed states.
 *
 * @returns {void}
 */
const toggleDrawer = () => {
  drawerVisible.value = !drawerVisible.value;
};

/** @type {import('vue').ComputedRef<import('../../../news/domain/model/source.entity.js').Source[]>} */
const sources = computed(() => newsStore.sources);

/** @type {import('vue').ComputedRef<Error[]>} Errors accumulated by the store during API calls. */
const errors = computed(() => newsStore.errors);

/** @type {import('vue').ComputedRef<import('../../../news/domain/model/article.entity.js').Article[]>} */
let articles = computed(() => newsStore.articles);

/**
 * Incremented whenever the article list needs to be forcibly re-rendered
 * (e.g. after the active source changes).
 *
 * @type {import('vue').Ref<number>}
 */
const rerenderKey = ref(0);

/**
 * Handles a `source-selected` event from the {@link SourceList} component.
 *
 * Delegates the selection to {@link newsStore.setCurrentSource}, refreshes
 * the articles computed reference, forces a re-render of the article list,
 * and closes the drawer.
 *
 * @param {import('../../../news/domain/model/source.entity.js').Source} source
 *   The source entity chosen by the user.
 * @returns {void}
 */
const setSource = source => {
  newsStore.setCurrentSource(source);
  articles = computed(() => newsStore.articles);
  rerenderKey.value += 1; // Force re-render of the article list
  toggleDrawer();
}

onMounted(() => {
  newsStore.loadSources();
  rerenderKey.value += 1;
});

</script>

<template>
<div>
  <div>
    <pv-menubar>
      <template #start>
        <pv-button icon="pi pi-bars" label="CatchUp" text @click="toggleDrawer"/>
        <source-list v-model:sources="sources"
                     v-model:visible="drawerVisible"
                     v-on:source-selected="setSource($event)"/>
      </template>
      <template #end>
        <language-switcher/>
      </template>
    </pv-menubar>
  </div>
</div>
  <div>
    <article-list v-if="articles" v-model:articles="articles" :key="rerenderKey"/>
    <unavailable-content v-else :errors="errors"/>
  </div>
  <footer-content/>
</template>

<style scoped>

</style>