<template>
  <TabSwitcher>
    <template #[tabs.howItWorks.id]>
      <div class="mb-10 space-y-4">
        <p>
          The <span class="text-main">least recently used (LRU)</span> page replacement algorithm is used in virtual
          memory management. Its purpose is to choose a suitable <span class="text-main">victim page</span> (in this
          case, the algorithm would choose page that has been least recently used) and to swap with the requested page.
        </p>
        <p>
          To understand the concept behind <span class="text-main">virtual memory</span> and <span
            class="text-main">paging</span>, see the <span
            @click="$router.push('/virtual-memory-management/first-in-first-out')"
            class="cursor-pointer text-main">first in first out (FIFO)</span> page
          replacement algorithm, with a full guide to how virtual memory operates.
        </p>
        <h2 class="mt-10 text-xl font-semibold">
          LRU Cache
        </h2>
        <hr class="mb-4 border-neutral-800">
        <p>
          To demonstrate how this algorithm works, it is important to know how an <span class="text-main">LRU
            cache</span> works. An LRU cache consists of a fixed number of slots to hold items (in this case, pages),
          with one side always containing the least recently used (LRU) item, and the other for the most recently used
          (MRU) one:
        </p>
        <Figure src="/algorithms/virtual-memory-management/lru/empty-lru-cache.svg" caption="An empty LRU cache."
          class="max-w-sm"></Figure>
        <Alert alertStyle="warning">
          <p>
            To demonstrate how this algorithm works, an LRU cache is used in this tutorial. However in real computer
            systems, the OS often estimates which page was least recently used rather than implementing an actual LRU
            cache to save space.
          </p>
        </Alert>
        <p>
          When an item, or page, is accessed it is added to the MRU slot:
        </p>
        <Figure src="/algorithms/virtual-memory-management/lru/item-caching-primary.svg"
          caption="Adding a page to an empty LRU cache." class="max-w-lg"></Figure>
        <p>
          If there are already pages inside of the cache when a new page is accessed, all items are shifted to the
          right to make space for the new page:
        </p>
        <Figure src="/algorithms/virtual-memory-management/lru/item-caching-secondary.svg"
          caption="Shifting items to the right to make space for a new page." class="max-w-lg"></Figure>
        <p>
          If the LRU cache is completely full, and a new page is accessed, the page in the LRU slot is first removed,
          then all items are shifted to the right like shown previously:
        </p>
        <Figure src="/algorithms/virtual-memory-management/lru/shifting-out-lru-item.svg"
          caption="Shifting a page out of the cache to make space for new ones." class="max-w-lg"></Figure>
        <h2 class="mt-10 text-xl font-semibold">
          The LRU Page Replacement Algorithm
        </h2>
        <hr class="mb-4 border-neutral-800">
        <p>
          The LRU page replacement algorithm maintains an LRU cache to keep track of which pages were used most
          recently and least recently.
        </p>
        <p>
          When a <span class="text-main">page fault</span> occurs and a <span class="text-main">victim page</span> needs
          to be chosen to make space for the newly requested page, the LRU page is taken out from the cache and is
          selected as the victim page. Then, the newly requested page is added to the cache's most recently used slot:
        </p>
        <Figure src="/algorithms/virtual-memory-management/lru/lru-algorithm.svg"
          caption="How the LRU Algorithm Operates During Page Faults." class="max-w-lg"></Figure>
        <p>
          This algorithm is considerably more efficient that the FIFO page replacement algorithm, resulting in lower
          page faults throughout the runtime of the system.
        </p>
      </div>
    </template>

    <template #[tabs.visualizer.id]>
      <div class="mb-10 space-y-4">
        <h1 class="mb-4 text-xl font-semibold">
          Step By Step Illustration
        </h1>
        <hr class="mb-4 border-neutral-800">
        <form class="space-y-4" ref="form">
          <div class="flex items-end gap-x-4">
            <div class="flex flex-col flex-1 gap-y-2">
              <label class="font-medium">Number of Frames:</label>
              <input type="number" class="w-full field sm:w-60" min="1" max="5" v-model="frameCount">
            </div>
            <button type="button" class="btn" @click="addRow()" :disabled="referenceStr.length === 12">Add Row</button>
          </div>
          <div class="space-y-4 overflow-x-auto">
            <table>
              <thead>
                <tr>
                  <th>Page ID</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(_, index) in referenceStr">
                  <td>
                    <input type="number" min="1" max="10" v-model="referenceStr[index]">
                  </td>
                  <td class="w-20 mx-auto text-center">
                    <TrashButton @click="removeRow(index)" v-if="referenceStr.length > 1"></TrashButton>
                  </td>
                </tr>
              </tbody>
            </table>
            <button type="submit" class="btn" @click.prevent="runAlgorithm()">Run Algorithm</button>
          </div>
        </form>

        <h2 class="mt-10 text-xl font-semibold">
          Results
        </h2>
        <hr class="mb-4 border-neutral-800">
        <RefStringTracer :frame-count="frameCount" :log="algResults.log" :reference-str="referenceStr"
          :total-page-faults="algResults.totalPageFaults" v-if="hasAlgorithmBeenRan">
        </RefStringTracer>
        <EmptySpace v-else>
          <p class="mb-4">
            No results to display yet, try running the algorithm...
          </p>
          <button @click.prevent="() => runAlgorithm()" class="btn">
            Run Algorithm
          </button>
        </EmptySpace>
      </div>
    </template>
  </TabSwitcher>
</template>

<script setup>
import RefStringTracer from '@/components/algorithms/virtual-memory-management/RefStringTracer.vue';
import Alert from '@/components/general/Alert.vue';
import EmptySpace from '@/components/general/EmptySpace.vue';
import Figure from '@/components/general/Figure.vue';
import TrashButton from '@/components/general/TrashButton.vue';
import TabSwitcher from '@/components/TabSwitcher.vue';
import { runPageReplacementAlgorithm } from '@/composables/virtual-memory-management';
import { tabs } from '@/state/tabState';
import { reactive, ref, watch } from 'vue';

const algResults = reactive({
  log: null,
  totalPageFaults: null,
});
const referenceStr = reactive([1, 2, 3, 4, 2, 1, 5, 2, 4, 5, 3, 5]);
const frameCount = ref(3);
const form = ref(null);

const hasAlgorithmBeenRan = ref(false);
watch([referenceStr, frameCount], () => {
  hasAlgorithmBeenRan.value = false;
});

const addRow = () => {
  const randPageId = Math.round((Math.random() * 9) + 1);
  referenceStr.push(randPageId);
};

const removeRow = (index) => {
  referenceStr.splice(index, 1);
}

const runAlgorithm = async () => {
  const isFormValid = form.value.checkValidity();
  if (!isFormValid) return form.value.reportValidity();
  hasAlgorithmBeenRan.value = true;

  const { log, totalPageFaults } = runPageReplacementAlgorithm(referenceStr.slice(), frameCount.value, 'lru');
  algResults.log = log;
  algResults.totalPageFaults = totalPageFaults;
};
</script>