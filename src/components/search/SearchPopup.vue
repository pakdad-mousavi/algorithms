<template>
  <div
    class="fixed flex items-center justify-center w-full h-full p-4 -translate-x-1/2 -translate-y-1/2 z-100 top-1/2 left-1/2 bg-zinc-950/50 backdrop-blur-sm"
    @click.self="closePopup()">
    <div
      class="flex flex-col rounded-md bg-neutral-900 w-full sm:w-130 h-[80vh] max-h-[580px] bg-[image:repeating-radial-gradient(var(--color-zinc-800)_0,var(--color-zinc-800)_1px,_transparent_1px,_transparent_100%)] bg-[size:20px_20px] shadow-[0_0px_50px_0_#15201f] border border-zinc-700 overflow-hidden">
      <!-- Searchbar -->
      <div class="flex items-center px-4 min-h-12 bg-neutral-900">
        <div class="px-2 mr-4 text-sm border rounded-md cursor-pointer text-neutral-500 border-neutral-500">esc</div>
        <div class="flex items-center flex-1 h-full mr-2 gap-x-2">
          <Icon size="16" class="text-neutral-500">
            <Search></Search>
          </Icon>
          <input type="text" class="w-full h-full text-sm outline-none caret-main" placeholder="Search..." v-focus
            v-model="query" @keydown.enter="(async () => await search())()">
        </div>
        <div
          class="flex items-center justify-center px-2 text-sm border rounded-md cursor-pointer text-neutral-500 border-neutral-500 gap-x-1"
          @click="(async () => await search())()">
          <span>enter</span>
          <Icon size="20" class="text-neutral-500">
            <ArrowRightAltRound></ArrowRightAltRound>
          </Icon>
        </div>
      </div>
      <hr class="border-zinc-700">
      <!-- Result Area -->
      <div class="relative w-full h-full">
        <TransitionGroup name="loading-fade">
          <NoResults v-if="noResultsFound"></NoResults>
          <Results v-else :formatted-results="formattedResults"></Results>
          <LoadingResults v-if="isFetching"></LoadingResults>
        </TransitionGroup>
      </div>
      <!-- Algolia Attribution -->
      <Attribution></Attribution>
    </div>
  </div>
</template>

<script setup>
import { ArrowRightAltRound } from '@vicons/material';
import { Search } from '@vicons/tabler';
import { Icon } from '@vicons/utils';
import { algoliasearch } from 'algoliasearch';
import { computed, onMounted, onUnmounted, provide, ref } from 'vue';
import { useRouter } from 'vue-router';
import LoadingResults from './results/LoadingResults.vue';
import NoResults from './results/NoResults.vue';
import Results from './results/Results.vue';
import Attribution from './Attribution.vue';

const INDEX_NAME = 'algorithms_index'
const client = ref(null);

const router = useRouter();
const routes = router.getRoutes();

const query = ref('');
const hitResults = ref(null);
const isFetching = ref(false);
const noResultsFound = computed(() => !hitResults.value || hitResults.value?.hits?.length === 0);

const emit = defineEmits(['toggle-search']);

const closePopup = () => {
  emit('toggle-search');
};

provide('closePopup', closePopup);

const getFirstRelevantSectionSnippet = (hit) => {
  const highlighted_sections = hit._highlightResult.sections;

  let sectionIndex;
  let title;
  for (let i = 0; i < highlighted_sections.length; i++) {
    const section = highlighted_sections[i];
    if (section.title.matchLevel !== "none" || section.content.matchLevel !== "none") {
      sectionIndex = i;
      title = section.title.value;
      break;
    }
  }

  const snippetSections = hit._snippetResult.sections;
  const content = snippetSections[sectionIndex]?.content.value;

  return { title, content };
};

const formattedResults = computed(() => {
  if (!hitResults.value) return;
  const res = [];
  const hits = hitResults.value.hits;
  for (const hit of hits) {
    const section = getFirstRelevantSectionSnippet(hit);
    const groupName = routes.find((r) => r.path === hit.objectID)?.meta?.groupName;
    res.push({
      id: hit.objectID,
      groupName,
      title: hit._highlightResult.title.value,
      section,
    });
  }
  const groupedResults = Object.groupBy(res, ({ groupName }) => groupName);
  return Object.entries(groupedResults);
});

const search = async () => {
  // Return if the search is empty
  if (query.value.trim().length === 0) return;

  let timeout;
  // Reset loading timer
  window.clearTimeout(timeout);
  isFetching.value = false;

  // Start timer
  timeout = window.setTimeout(() => isFetching.value = true, 50);

  // Search options for the query
  const searchOptions = {
    indexName: INDEX_NAME,
    searchParams: {
      query: query.value,
      attributesToSnippet: [
        'sections.content:30',
      ],
      highlightPreTag: '<em class="not-italic text-main">',
      hitsPerPage: 10,
    }
  };
  const results = await client.value.searchSingleIndex(searchOptions);
  hitResults.value = results;

  // Stop timer and reset values
  window.clearTimeout(timeout);
  isFetching.value = false;
}

const handleEscShortcut = (e) => {
  if (e.key === "Escape") {
    closePopup();
  }
};

onMounted(async () => {
  try {
    const { VITE_ALGOLIA_APP_ID, VITE_ALGOLIA_SEARCH_KEY } = import.meta.env;
    const appId = VITE_ALGOLIA_APP_ID || "QS33VZ076T";
    const searchKey = VITE_ALGOLIA_SEARCH_KEY || "7048628bed4cfafc2948e7fff1883b3b";

    if (VITE_ALGOLIA_SEARCH_KEY !== searchKey) {
      console.warn("Search key environment variable is missing. Using demo keys (10 searches/hour max).");
    }

    client.value = algoliasearch(appId, searchKey);
    console.log('Algolia client connected.');
  } catch (error) {
    console.error('Error connecting to Algolia client:', error);
  }

  document.addEventListener('keydown', handleEscShortcut);
});

onUnmounted(() => {
  document.removeEventListener('keydown', handleEscShortcut);
});
</script>