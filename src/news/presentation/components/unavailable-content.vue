<script setup>
/**
 * @component UnavailableContent
 * @description Presentation component displayed when news content cannot be
 * loaded due to one or more API errors.
 *
 * Renders a localized unavailability message followed by the list of error
 * details collected by the application store. Typically shown in place of
 * {@link ArticleList} when the store's `errors` array is non-empty.
 *
 * ### Props
 * | Name     | Type    | Required | Description                                          |
 * |----------|---------|----------|------------------------------------------------------|
 * | `errors` | `any[]` | no       | List of errors accumulated during failed API calls.  |
 */
import {useI18n} from "vue-i18n";
import {toRefs} from "vue";
import ArticleList from "./article-list.vue";

const { t } = useI18n();
const props = defineProps({ errors: null });
const { errors } = toRefs(props);
</script>

<template>
<div>
  <div><h4>{{ t('unavailable-news')}}</h4></div>
  <div v-for="error in errors">
    <h6>{{ error }}</h6>
  </div>
</div>
</template>

<style scoped>

</style>