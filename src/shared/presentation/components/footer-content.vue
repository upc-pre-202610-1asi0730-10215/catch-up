<script setup>
/**
 * @component FooterContent
 * @description Shared presentation component that renders the application
 * footer, including copyright information, authoring credits, and
 * attribution links for the third-party services (NewsAPI.org and
 * Logo.dev) used by the application.
 *
 * All visible strings are internationalised through Vue I18n so that the
 * footer respects the user's selected locale.
 */
import {useI18n} from "vue-i18n";

const { t } = useI18n();

</script>

<template>
<div class="grid bg-primary mt-4 p-4 align-content-start">
  <div class="col-12 ml-3 align-items-center justify-content-center">
    <p>Copyright &copy; 2026. ACME Studios. All rights reserved.</p>
  </div>
  <div class="col-12 ml-3 mt-3 align-items-center justify-content-center">
    <p>
      {{t('authoring-phrase.intro')}} <i class="pi pi-heart"/>
      {{t('authoring-phrase.use')}} <a href="https://primevue.org/" target="_blank">
      PrimeVue</a>
    {{t('authoring-phrase.author', {brand:'ACME'})}}
    </p>
    <p>
      {{t('footer.powered-by')}} <a href="https://www.newsapi.org">NewsAPI.org</a>
      {{t('footer.and')}} <a href="https://logo.dev">Logo.dev Logo API</a>
    </p>
  </div>
</div>
</template>

<style scoped>

</style>