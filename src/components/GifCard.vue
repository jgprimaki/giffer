<template>
  <q-card :class="$style['scale-element']" @click="toggleModal">
    <q-img
      :src="reducedSizeGifImage"
      :width="`${reducedGifSize}px`"
      :height="`${reducedGifSize}px`"
    >
      <div class="absolute-top">
        {{ imageTitle }}
      </div>
    </q-img>

    <q-card-actions>
      <q-btn flat round color="primary" icon="link" @click.stop="copyURL" />
    </q-card-actions>
  </q-card>

  <ExpandedGifModal
    :gif="gif"
    :modalVisibility="modalVisibility"
    @toggleModal="toggleModal"
  />
</template>

<script setup lang="ts">
import { ref, computed, defineAsyncComponent } from 'vue';
import { IGif } from '@giphy/js-types';
import { copyToClipboard } from 'quasar';
import { useQuasar } from 'quasar';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const $q = useQuasar();

const ExpandedGifModal = defineAsyncComponent(
  () => import('../components/ExpandedGifModal.vue')
);

const reducedGifSize = ref(150);
const modalVisibility = ref(false);

const props = defineProps<{
  gif: IGif;
}>();

const imageTitle = computed(() => {
  return props.gif?.title?.split('GIF')?.[0].trim();
});

const reducedSizeGifImage = computed(() => {
  return props.gif?.images?.downsized?.url;
});

const toggleModal = () => {
  modalVisibility.value = !modalVisibility.value;
};

const copyURL = () =>
  copyToClipboard(props.gif.bitly_url).then(() => {
    $q.notify({
      message: t('urlCopySucess'),
      color: t('urlCopyFail'),
    });
  });
</script>

<style lang="scss" module>
.scale-element {
  @apply transition-transform cursor-pointer;
  &:hover {
    transform: scale(1.2);
    @apply z-10;
  }

  .tooltip {
    @apply text-base bg-blue-400;
  }
}
</style>
