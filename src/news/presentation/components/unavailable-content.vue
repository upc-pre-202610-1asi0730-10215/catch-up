<script setup>
import {useI18n} from "vue-i18n";
import {toRefs} from "vue";

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