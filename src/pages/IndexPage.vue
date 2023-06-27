<template>
  <q-page :class="$style['container']">
    <SearchBar />
    <GifList />
  </q-page>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue';

const SearchBar = defineAsyncComponent(
  () => import('../components/SearchBar.vue')
);

const GifList = defineAsyncComponent(() => import('../components/GifList.vue'));
</script>

<style module>
.container {
  @apply flex flex-col gap-4;
}
</style>
