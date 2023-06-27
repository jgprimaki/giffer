import { defineStore } from 'pinia';
import { computed, ref, watch } from 'vue';
import { GiphyFetch } from '@giphy/js-fetch-api';
import { IGif } from '@giphy/js-types';

const giphyFetch = new GiphyFetch(String(process.env.VUE_GIF_API_KEY));

const GIFS_LIMIT_PER_PAGE = 25;

export const useGifStore = defineStore('gif', () => {
  const searchTerm = ref('');
  const currentPage = ref(0);
  const gifs = ref<IGif[]>([]);
  const fetchingGifs = ref(false);

  const offset = computed(() => {
    return currentPage.value * GIFS_LIMIT_PER_PAGE;
  });

  const increaseCurrentPage = () => currentPage.value++;

  const cleanGifList = () => (gifs.value = []);

  watch(searchTerm, () => {
    currentPage.value = 0;
    cleanGifList();
    fetchGifs();
  });

  const fetchPaginatedTrendingGifs = async () =>
    giphyFetch
      .trending({
        offset: Number(offset.value),
        limit: GIFS_LIMIT_PER_PAGE,
      })
      .then((gifsResult) => gifs.value.push(...gifsResult.data));

  const fetchPaginatedSearchableGifs = async () =>
    giphyFetch
      .search(searchTerm.value, {
        offset: Number(offset.value),
        limit: GIFS_LIMIT_PER_PAGE,
      })
      .then((gifsResult) => gifs.value.push(...gifsResult.data));

  const fetchGifs = async () => {
    fetchingGifs.value = true;
    try {
      if (searchTerm.value) await fetchPaginatedSearchableGifs();
      else await fetchPaginatedTrendingGifs();
    } finally {
      fetchingGifs.value = false;
    }
  };

  return {
    searchTerm,
    gifs,
    fetchingGifs,
    increaseCurrentPage,
    fetchGifs,
  };
});
