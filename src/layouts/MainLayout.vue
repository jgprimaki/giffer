<template>
  <section :class="$style['main']">
    <q-layout view="lhr lpR lfr" :class="$style['main__layout']">
      <q-header elevated>
        <q-toolbar
          :class="{
            [$style['main__layout__toolbar']]: true,
            [$style['main__layout__toolbar--dark']]: $q.dark.isActive,
          }"
        >
          <q-toolbar-title>{{ $t('header.title') }}</q-toolbar-title>

          <q-btn
            flat
            :text-color="theme.textColor"
            round
            :icon="theme.icon"
            size="sm"
            @click="changeTheme"
          >
            <q-tooltip
              self="center right"
              :class="$style['main__layout__toolbar__tooltip']"
            >
              {{ theme.tooltip }}
            </q-tooltip>
          </q-btn>
        </q-toolbar>
      </q-header>

      <q-page-container :class="$style['container']">
        <router-view />
      </q-page-container>
    </q-layout>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useQuasar } from 'quasar';
import { useI18n } from 'vue-i18n';

const $q = useQuasar();
const { t } = useI18n();

onMounted(() => {
  $q.dark.set(true);
  console.log($q.lang.getLocale());
});

const changeTheme = () => {
  $q.dark.set(!$q.dark.isActive);
};

const theme = computed(() => {
  const dark = $q.dark.isActive;
  return {
    textColor: dark ? 'black' : 'white',
    icon: dark ? 'dark_mode' : 'light_mode',
    tooltip: dark ? t('theme.toLight') : t('theme.toDark'),
  };
});
</script>

<style module lang="scss">
.main {
  @apply flex justify-center;
  &__layout {
    @apply max-w-screen-lg;

    &__toolbar {
      @apply bg-black;

      &--dark {
        @apply bg-white text-black;
      }

      &__tooltip {
        @apply text-base bg-blue-400;
      }
    }
  }
}
</style>
