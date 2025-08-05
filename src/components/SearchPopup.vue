<template>
  <div
    class="fixed flex items-center justify-center w-full h-full p-4 -translate-x-1/2 -translate-y-1/2 z-100 top-1/2 left-1/2 bg-zinc-950/50 backdrop-blur-sm"
    @click.self="emit('toggle-search')">
    <div
      class="flex flex-col rounded-md bg-neutral-900 w-full sm:w-130 h-[80vh] bg-[image:repeating-radial-gradient(var(--color-zinc-800)_0,var(--color-zinc-800)_1px,_transparent_1px,_transparent_100%)] bg-[size:20px_20px] shadow-[0_0px_50px_0_#15201f] border border-zinc-700 overflow-hidden">
      <!-- Searchbar -->
      <div class="flex items-center px-4 min-h-12 bg-neutral-900">
        <div class="px-2 mr-4 text-sm border rounded-md cursor-pointer text-neutral-500 border-neutral-500">esc</div>
        <div class="flex items-center flex-1 h-full mr-2 gap-x-2">
          <Icon size="16" class="text-neutral-500">
            <Search></Search>
          </Icon>
          <input type="text" class="w-full h-full text-sm outline-none caret-main" placeholder="Search..."
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
      <div class="relative w-full h-full">
        <Transition name="loading-fade">
          <div class="absolute z-10 flex flex-col items-center justify-center w-full h-full p-4" v-if="noResultsFound">
            <h1 class="text-xl font-medium">No Results to Display!</h1>
            <h1 class="text-neutral-500">Try searching for another algorithm.</h1>
          </div>
        </Transition>
        <Transition name="loading-fade">
          <div class="absolute flex flex-col w-full h-full px-4 pb-4 overflow-auto bg-neutral-900"
            v-if="!noResultsFound">
            <div v-for="[groupName, hits] in formattedResults" class="first:[&>div]:first:mt-4">
              <div class="flex items-center mt-8 mb-4 font-medium gap-x-2">
                <Icon size="24">
                  <Component :is="getGroupIcon(groupName)"></Component>
                </Icon>
                <h1>{{ groupName }}</h1>
              </div>
              <div class="flex flex-col gap-y-4">
                <div v-for="hit in hits"
                  class="p-2 duration-75 border rounded-md cursor-pointer border-neutral-700 hover:bg-neutral-800">
                  <div class="flex items-center mb-2 gap-x-2">
                    <h2 class="font-medium text-neutral-200" v-html="hit.title"></h2>
                    <Icon size=20 class="text-neutral-500">
                      <ChevronRight24Filled></ChevronRight24Filled>
                    </Icon>
                    <h3 class="text-sm text-neutral-500">{{ hit.section.title }}</h3>
                  </div>
                  <p v-html="hit.section.content" class="text-sm text-neutral-200 line-clamp-2"></p>
                </div>
              </div>
            </div>
          </div>
        </Transition>
        <Transition name="loading-fade">
          <div
            class="absolute z-50 flex flex-col items-center justify-center w-full h-full p-4 gap-y-4 backdrop-blur-md"
            v-if="isFetching">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200" class="w-24">
              <path fill="none" stroke-width="10" stroke-linecap="round" stroke-dasharray="300 385"
                stroke-dashoffset="0" class="stroke-main blur-md translate-y-[25px]"
                d="M275 75c0 31-27 50-50 50-58 0-92-100-150-100-28 0-50 22-50 50s23 50 50 50c58 0 92-100 150-100 24 0 50 19 50 50Z">
                <animate attributeName="stroke-dashoffset" calcMode="spline" dur="2" values="685;-685"
                  keySplines="0 0 1 1" repeatCount="indefinite"></animate>
              </path>
              <path fill="none" stroke-width="10" stroke-linecap="round" stroke-dasharray="300 385"
                stroke-dashoffset="0" class="stroke-main translate-y-[25px]"
                d="M275 75c0 31-27 50-50 50-58 0-92-100-150-100-28 0-50 22-50 50s23 50 50 50c58 0 92-100 150-100 24 0 50 19 50 50Z">
                <animate attributeName="stroke-dashoffset" calcMode="spline" dur="2" values="685;-685"
                  keySplines="0 0 1 1" repeatCount="indefinite"></animate>
              </path>
            </svg>
          </div>
        </Transition>
      </div>
      <div class="flex items-center justify-end w-full h-12 px-4 font-medium text-neutral-600 gap-x-2">
        <h3 class="text-sm">Powered by</h3>
        <a target="_blank" href="https://www.algolia.com/">
          <svg class="w-16 py-2" viewBox="0 0 2197 501">
            <path fill-rule="evenodd" clip-rule="evenodd"
              d="M1070.38 275.47V6.08c0-3.63-3.24-6.39-6.82-5.83l-50.46 7.94a5.912 5.912 0 0 0-4.99 5.84l.17 273.22c0 12.92 0 92.7 95.97 95.49 3.33.1 6.09-2.58 6.09-5.91v-40.78c0-2.96-2.19-5.51-5.12-5.84-34.85-4.01-34.85-47.57-34.85-54.72l.01-.02Z"
              class="fill-neutral-600"></path>
            <path
              d="M1902.56 104.9h-50.78a5.9 5.9 0 0 0-5.9 5.9v266.1c0 3.259 2.64 5.9 5.9 5.9h50.78c3.25 0 5.9-2.641 5.9-5.9V110.8c0-3.258-2.65-5.9-5.9-5.9Z"
              class="fill-neutral-600"></path>
            <path fill-rule="evenodd" clip-rule="evenodd"
              d="M1851.78 71.55h50.77c3.26 0 5.9-2.64 5.9-5.9V6.07c0-3.62-3.24-6.39-6.82-5.83l-50.77 7.95a5.902 5.902 0 0 0-4.99 5.83v51.62c0 3.26 2.64 5.9 5.9 5.9l.01.01ZM1764.03 275.47V6.08c0-3.63-3.24-6.39-6.82-5.83l-50.46 7.94a5.912 5.912 0 0 0-4.99 5.84l.17 273.22c0 12.92 0 92.7 95.97 95.49 3.33.1 6.09-2.58 6.09-5.91v-40.78c0-2.96-2.19-5.51-5.12-5.84-34.85-4.01-34.85-47.57-34.85-54.72l.01-.02ZM1631.95 142.89c-11.14-12.25-24.83-21.65-40.78-28.31-15.92-6.53-33.26-9.85-52.07-9.85-18.78 0-36.15 3.17-51.92 9.85-15.59 6.66-29.29 16.05-40.76 28.31-11.47 12.23-20.38 26.87-26.76 44.03-6.38 17.17-9.24 37.37-9.24 58.36 0 20.99 3.19 36.87 9.55 54.21 6.38 17.32 15.14 32.11 26.45 44.36 11.29 12.23 24.83 21.62 40.6 28.46 15.77 6.83 40.12 10.33 52.4 10.48 12.25 0 36.78-3.82 52.7-10.48 15.92-6.68 29.46-16.23 40.78-28.46 11.29-12.25 20.05-27.04 26.25-44.36 6.22-17.34 9.24-33.22 9.24-54.21 0-20.99-3.34-41.19-10.03-58.36-6.38-17.17-15.14-31.8-26.43-44.03h.02Zm-44.43 163.75c-11.47 15.75-27.56 23.7-48.09 23.7-20.55 0-36.63-7.8-48.1-23.7-11.47-15.75-17.21-34.01-17.21-61.2 0-26.89 5.59-49.14 17.06-64.87 11.45-15.75 27.54-23.52 48.07-23.52 20.55 0 36.63 7.78 48.09 23.52 11.47 15.57 17.36 37.98 17.36 64.87 0 27.19-5.72 45.3-17.19 61.2h.01ZM894.416 104.9h-49.33c-48.36 0-90.91 25.48-115.75 64.1-14.52 22.58-22.99 49.63-22.99 78.73 0 44.89 20.13 84.92 51.59 111.1 2.93 2.6 6.05 4.98 9.31 7.14 12.86 8.49 28.11 13.47 44.52 13.47 1.23 0 2.46-.03 3.68-.09.36-.02.71-.05 1.07-.07.87-.05 1.75-.11 2.62-.2.34-.03.68-.08 1.02-.12.91-.1 1.82-.21 2.73-.34.21-.03.42-.07.63-.1 32.89-5.07 61.56-30.82 70.9-62.81v57.83c0 3.26 2.64 5.9 5.9 5.9h50.42c3.26 0 5.9-2.64 5.9-5.9V110.8c0-3.26-2.64-5.9-5.9-5.9h-56.32Zm0 206.92c-12.2 10.16-27.97 13.98-44.84 15.12-.16.01-.33.03-.49.04-1.12.07-2.24.1-3.36.1-42.24 0-77.12-35.89-77.12-79.37 0-10.25 1.96-20.01 5.42-28.98 11.22-29.12 38.77-49.74 71.06-49.74h49.33v142.83ZM2133.97 104.9h-49.33c-48.36 0-90.91 25.48-115.75 64.1-14.52 22.58-22.99 49.63-22.99 78.73 0 44.89 20.13 84.92 51.59 111.1 2.93 2.6 6.05 4.98 9.31 7.14 12.86 8.49 28.11 13.47 44.52 13.47 1.23 0 2.46-.03 3.68-.09.36-.02.71-.05 1.07-.07.87-.05 1.75-.11 2.62-.2.34-.03.68-.08 1.02-.12.91-.1 1.82-.21 2.73-.34.21-.03.42-.07.63-.1 32.89-5.07 61.56-30.82 70.9-62.81v57.83c0 3.26 2.64 5.9 5.9 5.9h50.42c3.26 0 5.9-2.64 5.9-5.9V110.8c0-3.26-2.64-5.9-5.9-5.9h-56.32Zm0 206.92c-12.2 10.16-27.97 13.98-44.84 15.12-.16.01-.33.03-.49.04-1.12.07-2.24.1-3.36.1-42.24 0-77.12-35.89-77.12-79.37 0-10.25 1.96-20.01 5.42-28.98 11.22-29.12 38.77-49.74 71.06-49.74h49.33v142.83ZM1314.05 104.9h-49.33c-48.36 0-90.91 25.48-115.75 64.1-11.79 18.34-19.6 39.64-22.11 62.59a148.518 148.518 0 0 0 .05 32.73c4.28 38.09 23.14 71.61 50.66 94.52 2.93 2.6 6.05 4.98 9.31 7.14 12.86 8.49 28.11 13.47 44.52 13.47 17.99 0 34.61-5.93 48.16-15.97 16.29-11.58 28.88-28.54 34.48-47.75v50.26h-.11v11.08c0 21.84-5.71 38.27-17.34 49.36-11.61 11.08-31.04 16.63-58.25 16.63-11.12 0-28.79-.59-46.6-2.41-2.83-.29-5.46 1.5-6.27 4.22l-12.78 43.11c-1.02 3.46 1.27 7.02 4.83 7.53 21.52 3.08 42.52 4.68 54.65 4.68 48.91 0 85.16-10.75 108.89-32.21 21.48-19.41 33.15-48.89 35.2-88.52V110.8c0-3.26-2.64-5.9-5.9-5.9h-56.32.01Zm0 64.1s.65 139.13 0 143.36c-12.08 9.77-27.11 13.59-43.49 14.7-.16.01-.33.03-.49.04-1.12.07-2.24.1-3.36.1-1.32 0-2.63-.03-3.94-.1-40.41-2.11-74.52-37.26-74.52-79.38 0-10.25 1.96-20.01 5.42-28.98 11.22-29.12 38.77-49.74 71.06-49.74h49.33-.01Z"
              class="fill-neutral-600"></path>
            <path
              d="M249.826.17C113.296.17 1.996 110.25.026 246.32c-2 138.19 110.12 252.7 248.33 253.5 42.68.25 83.79-10.19 120.3-30.03 3.56-1.93 4.11-6.83 1.08-9.51l-23.38-20.72c-4.75-4.21-11.51-5.4-17.36-2.92-25.48 10.84-53.17 16.38-81.71 16.03-111.68-1.37-201.91-94.29-200.13-205.96 1.76-110.26 92-199.41 202.67-199.41h202.69v360.28l-115-102.18c-3.72-3.31-9.42-2.66-12.42 1.31-18.46 24.44-48.53 39.64-81.93 37.34-46.33-3.2-83.87-40.5-87.34-86.81-4.15-55.24 39.63-101.52 94-101.52 49.18 0 89.68 37.85 93.91 85.95.38 4.28 2.31 8.27 5.52 11.12l29.95 26.55c3.4 3.01 8.79 1.17 9.63-3.3 2.16-11.55 2.92-23.58 2.07-35.92-4.82-70.34-61.8-126.93-132.17-131.26-80.68-4.97-148.13 58.14-150.27 137.25-2.09 77.1 61.08 143.56 138.19 145.26 32.19.71 62.03-9.41 86.14-26.95l150.26 133.2c6.44 5.71 16.61 1.14 16.61-7.47V9.65c0-5.24-4.24-9.48-9.48-9.48h-240.36Z"
              class="fill-neutral-600"></path>
          </svg>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ArrowRightAltRound } from '@vicons/material';
import { Search } from '@vicons/tabler';
import { Icon } from '@vicons/utils';
import { algoliasearch } from 'algoliasearch';
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';
import { ChevronRight24Filled } from '@vicons/fluent';
import { useRouter } from 'vue-router';
import { getGroupIcon } from '@/router/routeGroupIcons';

const INDEX_NAME = 'algorithms_index'
const client = ref(null);

const router = useRouter();
const routes = router.getRoutes();

const query = ref('');
const hitResults = ref(null);
const isFetching = ref(false);
const noResultsFound = computed(() => !hitResults.value || hitResults.value?.hits?.length === 0);

const emit = defineEmits(['toggle-search']);

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

console.log(formattedResults);

const search = async () => {
  // isFetching.value = true;
  // return new Promise((resolve) => {
  //   window.setTimeout(() => {
  //     hitResults.value = { nbHits: 10 };
  //     isFetching.value = false;
  //     resolve();
  //   }, 5000);
  // });
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

watch(isFetching, (f) => {
  console.log(f);
});

const closePopup = (e) => {
  if (e.key === "Escape") {
    emit('toggle-search');
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

  document.addEventListener('keydown', closePopup);
});

onUnmounted(() => {
  document.removeEventListener('keydown', closePopup);
});
</script>