<script setup>
import {ref} from "vue";

const drawerVisible = ref(false);

const toggleDrawer = () => {
  drawerVisible.value = !drawerVisible.value;
};

</script>

<template>
<div>
  <div>
    <pv-menubar>
      <template #start>
        <pv-button icon="pi pi-bars" label="CatchUp" text @click="toggleDrawer"/>
        <!-- Add Source list here -->
      </template>
      <template #end>
        <!-- Add Language Switcher here -->
      </template>
    </pv-menubar>
  </div>
</div>
  <div>
    <!-- Add Article list here -->
    <!-- Add Unavailable content alternate component here -->
  </div>
  <!-- Add Footer content here -->
</template>

<style scoped>

</style>