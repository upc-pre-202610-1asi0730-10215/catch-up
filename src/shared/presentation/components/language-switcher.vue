<script setup>
/**
 * @component LanguageSwitcher
 * @description Shared presentation component that renders a segmented button
 * group allowing the user to switch the application's active locale at runtime.
 *
 * Binds directly to Vue I18n's `$i18n.locale` using `v-model` so that the
 * selected locale is reflected globally across the entire application without
 * any additional event handling.
 *
 * The available locale options are derived from `$i18n.availableLocales`,
 * which is configured in `src/i18n.js`.
 */
</script>

<template>
  <pv-select-button v-model="$i18n.locale" :options="$i18n.availableLocales">
    <template #option="slotProps">
      <span>{{ slotProps.option.toUpperCase() }}</span>
    </template>
  </pv-select-button>
</template>

<style scoped>

</style>