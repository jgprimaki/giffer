<template>
  <q-input
    v-model="searchValue"
    :class="$style['search']"
    outlined
    :placeholder="$t('search.placeholder')"
    @keydown="handleKeyPress"
  >
    <template v-slot:append>
      <q-icon name="search" @click="setSearchTerm" :class="$style['icon']" />
    </template>
  </q-input>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useGifStore } from 'src/stores/gif-store';

const store = useGifStore();

const searchValue = ref('');

const setSearchTerm = () => (store.searchTerm = searchValue.value);

const handleKeyPress = (event: any) => event.key === 'Enter' && setSearchTerm();
</script>

<style lang="scss" module>
.search {
  @apply w-full mt-5;
  .icon {
    @apply cursor-pointer;
  }
}
</style>
