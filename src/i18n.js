/**
 * @fileoverview Vue I18n configuration for the CatchUp application.
 *
 * Configures the internationalisation plugin with the supported locales
 * (`en` and `es`), setting English as both the default and the fallback
 * locale. The Composition API mode (`legacy: false`) is used throughout
 * so that `useI18n()` works inside `<script setup>` blocks.
 *
 * @module i18n
 */

import {createI18n} from "vue-i18n";
import en from "./locales/en.json";
import es from "./locales/es.json";

/**
 * Configured Vue I18n instance.
 *
 * Export this and install it via `app.use(i18n)` in `main.js` to make
 * the `$t`, `$i18n`, and `useI18n()` helpers available application-wide.
 *
 * @type {import('vue-i18n').I18n}
 */
const i18n = createI18n({
    legacy: false,
    locale: 'en',
    fallbackLocale: 'en',
    messages: {en, es}
});

export default i18n;