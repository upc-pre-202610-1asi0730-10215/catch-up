import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import PrimeVue from 'primevue/config';
import Material from '@primeuix/themes/material';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import {Avatar, Button, Card, Drawer, Image, Menu, Menubar, SelectButton, Toolbar, Tooltip} from "primevue";
import i18n from "./i18n.js";

createApp(App)
    .use(i18n)
    .use(PrimeVue, { ripple: true, theme: { preset: Material}})
    .component('pv-button', Button)
    .component('pv-select-button', SelectButton)
    .component('pv-avatar', Avatar)
    .component('pv-drawer', Drawer)
    .component('pv-card', Card)
    .component('pv-image', Image)
    .component('pv-toolbar', Toolbar)
    .component('pv-menu', Menu)
    .component('pv-menubar', Menubar)
    .directive('tooltip', Tooltip)
    .mount('#app')
