<template>
  <TabSwitcher>
    <template #[tabs.howItWorks.id]>
      <div class="mb-10 space-y-4">
        <p>
          The <span class="text-main">optimal (MIN)</span> page replacement algorithm is used in virtual
          memory management as a benchmarking algorithm. Its purpose is to choose a suitable <span
            class="text-main">victim page</span> to swap with the newly requested page.
        </p>
        <p>
          To understand the concept behind <span class="text-main">virtual memory</span> and <span
            class="text-main">paging</span>, see the <span
            @click="$router.push('/virtual-memory-management/first-in-first-out')"
            class="cursor-pointer text-main">first in first out (FIFO)</span> page
          replacement algorithm, with a full guide to how virtual memory operates.
        </p>
        <h2 class="mt-10 text-xl font-semibold">
          Optimal (MIN) Page Replacement Algorithm
        </h2>
        <hr class="mb-4 border-neutral-800">
        <p>
          The optimal algorithm is by far the most efficient page replacement algorithm. It has the least amount of page
          faults amongst all other page replacement algorithms.
        </p>
        <Alert alertStyle="warning">
          <p>
            Although the optimal algorithm is the most efficient algorithm, it isn't realistic to implement, as it needs
            to know which pages are going to be requested in the future. However, it is still used as a benchmarking
            algorithm.
          </p>
        </Alert>
        <p>
          When a <span class="text-main">page fault</span> occurs, the optimal algorithm chooses the page that won't be
          used for the longest time in the future as the <span class="text-main">victim page</span>. For example, take
          the following reference string, with the RAM divided into 3 frames:
        </p>
        <Figure src="/algorithms/virtual-memory-management/optimal/sample-ref-string-with-frames.svg"
          caption="Sample Reference String With 3 Frames." class="max-w-lg"></Figure>
        <p>
          The first 3 pages have already been loaded into the RAM. When the 4th page is requested and a <span
            class="text-main">page fault</span> occurs, the optimal algorithm scans the reference string from the
          current position onwards, looking for the first occurences of the pages that are in the current frame. The
          last occuring one (page 3) will be the <span class="text-main">victim page</span>.
        </p>
        <Figure src="/algorithms/virtual-memory-management/optimal/optimal-primary.svg"
          caption="How the Optimal Algorithm Operates." class="max-w-xl"></Figure>
        <p>
          If there is no occurence of a certain page in the current frame, the algorithm instantly picks it as the
          victim page. Since it does not appear again in the reference string, it is no longer needed to be kept in the
          RAM. The following diagram demonstrates the optimal algorithm for the new current frame:
        </p>
        <Figure src="/algorithms/virtual-memory-management/optimal/optimal-secondary.svg"
          caption="Picking a Nonreoccurring Page as the Victim Page." class="max-w-xl"></Figure>
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

  const { log, totalPageFaults } = runPageReplacementAlgorithm(referenceStr.slice(), frameCount.value, 'optimal');
  algResults.log = log;
  algResults.totalPageFaults = totalPageFaults;
};
</script>