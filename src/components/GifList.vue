<template>
  <main>
    <q-icon
      v-if="store.fetchingGifs"
      name="sync"
      size="xl"
      :class="$style['main__loading-icon']"
    />
    <section
      :class="{
        [$style['main__list']]: true,
        [$style['main__list--loading']]: store.fetchingGifs,
      }"
      @scroll="debouncedScroll"
    >
      <template v-if="hasGifs">
        <section v-for="(gif, index) in store.gifs" :key="index">
          <GifCard :gif="gif" />
        </section>
      </template>
      <template v-else>
        <section :class="$style['main__list__empty']">
          <span :class="$style['main__list__empty__message']">{{
            $t('list.emptyState')
          }}</span>
        </section>
      </template>
    </section>
  </main>
</template>

<script setup lang="ts">
import { onMounted, defineAsyncComponent, computed } from 'vue';
import { debounce } from 'quasar';
import { useGifStore } from 'src/stores/gif-store';

const GifCard = defineAsyncComponent(() => import('../components/GifCard.vue'));

const store = useGifStore();

const DEBOUNCE_BETWEEN_SCROLL = 100; // 100ms

onMounted(async () => {
  store.fetchGifs();
});

const onScroll = (e: any) => {
  const { scrollTop, offsetHeight, scrollHeight } = e.target;
  const onBottom = scrollTop + offsetHeight >= scrollHeight;
  if (onBottom) {
    store.increaseCurrentPage();
    store.fetchGifs();
  }
};

const debouncedScroll = debounce(onScroll, DEBOUNCE_BETWEEN_SCROLL);

const hasGifs = computed(() => {
  return !!store.gifs.length;
});
</script>

<style lang="scss" module>
.main {
  &__loading-icon {
    @apply absolute z-10 right-1/2 top-1/2 animate-spin;
  }

  &__list {
    @apply w-full h-full max-w-screen-lg max-h-[45rem] p-4 overflow-y-auto;
    @apply flex gap-3 flex-wrap;

    &--loading {
      @apply opacity-30;
    }

    &__empty {
      @apply w-full flex justify-center;

      &__message {
        @apply text-lg font-semibold;
      }
    }
  }
}
.container {
  @apply flex;
}
</style>
