<template>
  <q-dialog v-model="localVisibility" @hide="emit('toggleModal')">
    <q-card>
      <q-card-section>
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <q-card-section>
        <q-img
          :src="expandedSizeGifImage"
          :width="`${expandedGifSize}px`"
          :height="`${expandedGifSize}px`"
        >
        </q-img>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { IGif } from '@giphy/js-types';
const emit = defineEmits(['toggleModal']);

const props = defineProps<{
  modalVisibility: boolean;
  gif: IGif;
}>();

const expandedGifSize = ref(480);
const localVisibility = ref(false);

watch(
  () => props.modalVisibility,
  async (newValue) => {
    localVisibility.value = newValue;
  }
);

const expandedSizeGifImage = computed(() => {
  return props.gif?.images?.original.url;
});
</script>
