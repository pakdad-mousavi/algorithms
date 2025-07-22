<template>
  <TabSwitcher>
    <template #[tabs.howItWorks.id]>
      <div class="mb-10 space-y-4">
        <p>
          The <span class="text-main">SCAN</span> algorithm is a disk scheduling algorithm used to minimize the <span
            class="text-main">seek time</span> when responding to incoming disk requests, while avoiding starvation. It
          works by moving from one end of the disk to the other, and then back, responding to all requests on the way.
        </p>
        <p>
          This is a disk scheduling algorithm, which requires some basic knowledge about a hard disk. To learn more
          about disk architecture, see the <span class="cursor-pointer text-main"
            @click="$router.push('/disk-scheduling/first-come-first-serve')">First Come First Serve (FCFS)</span>
          algorithm.
        </p>
        <h2 class="mt-10 text-xl font-semibold">
          How the Algorithm Works
        </h2>
        <hr class="mb-4 border-neutral-800">
        <p>
          The SCAN algorithm works like an elevator. It moves from the current head position to the left most end (or
          right most end depending on the head direction), addressing any requests along the way. It then reverses and
          travels to the opposite end, to address any requests left.
        </p>
        <p>
          To put this into perspective, consider the following disk requests plotted on a seek time graph ordered from
          smallest to largest (without any specific vertical order):
        </p>
        <Figure src="/algorithms/disk-scheduling/scan/disk-requests.svg" class="max-w-2xl"
          caption="Disk Requests Plotted on a Graph"></Figure>
        <p>
          The SCAN algorithm travels either to the right most end or the left most end, and fulfills any pending
          requests along the way. The direction in which it initially travels in is determined by the <span
            class="text-main">head direction</span>:
        </p>
        <Figure src="/algorithms/disk-scheduling/scan/direction-of-head.svg" class="max-w-2xl"
          caption="Direction of Head Determines Scan Direction"></Figure>
        <p>
          The following diagram illustrates how the SCAN algorithm would work on the following requests, given the
          direction of the head was left:
        </p>
        <Figure src="/algorithms/disk-scheduling/scan/scan-left-to-right.svg" class="max-w-3xl"
          caption="SCAN Algorithm From Left to Right"></Figure>
        <p>
          If the direction of the head was right, then the SCAN algorithm would first travel to the right most end of
          the disk, and then back:
        </p>
        <Figure src="/algorithms/disk-scheduling/scan/scan-right-to-left.svg" class="max-w-3xl"
          caption="SCAN Algorithm From Right to Left"></Figure>
        <p>
          Finally, to calculate the total seek time, a <span class="text-main">seek time graph</span> can be used. The
          following diagram illustrates the SCAN algorithm's seek time graph, given the following requests and a left
          head direction:
        </p>
        <Figure src="/algorithms/disk-scheduling/scan/scan-seek-time-graph.svg"
          caption="SCAN Algorithm Seek Time Graph"></Figure>
      </div>
    </template>

    <template #[tabs.visualizer.id]>
      <div class="mb-10 space-y-4">
        <!-- Visualizer goes here -->
        <h1 class="mb-4 text-xl font-semibold">
          Step By Step Illustration
        </h1>
        <hr class="mb-4 border-neutral-800">
        <form class="space-y-4" ref="form">
          <!-- Top bar -->
          <div class="flex flex-wrap items-end gap-4">
            <div class="flex flex-col gap-2">
              <label class="font-medium">Current Head Position:</label>
              <input type="number" class="field" :min="MIN_REQUEST" :max="MAX_REQUEST" v-model="headPosition">
            </div>
            <div class="flex flex-col flex-1 gap-2">
              <label class="font-medium">Head Direction:</label>
              <select class="field" v-model="headDirection">
                <option value="left">Left</option>
                <option value="right">Right</option>
              </select>
            </div>
            <button type="button" class="btn" :disabled="diskRequests.length === 15" @click="addRow">Add Row</button>
          </div>
          <!-- Input table -->
          <table>
            <thead>
              <tr>
                <th>Disk Requests</th>
                <th></th> <!-- Extra header for delete button -->
              </tr>
            </thead>
            <tbody>
              <tr v-for="(_, index) in diskRequests">
                <td>
                  <input type="number" v-model="diskRequests[index]" :min="MIN_REQUEST" :max="MAX_REQUEST">
                </td>
                <td class="w-20 mx-auto text-center">
                  <TrashButton @click="removeRow(index)" v-if="diskRequests.length > 1"></TrashButton>
                </td>
              </tr>
            </tbody>
          </table>
          <button type="submit" class="btn" @click.prevent="runAlgorithm">Run Algorithm</button>
        </form>

        <!-- Result component -->
        <h2 class="mt-10 text-xl font-semibold">
          Results
        </h2>
        <hr class="mb-4 border-neutral-800">
        <div v-if="hasAlgorithmBeenRan">
          <SeekTimeGraph :ordered-requests="algResults.orderedRequests" :total-seek-time="algResults.totalSeekTime">
          </SeekTimeGraph>
        </div>
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
import { tabs } from '@/state/tabState';
import Figure from '@/components/general/Figure.vue';
import TrashButton from '@/components/general/TrashButton.vue';
import TabSwitcher from '@/components/TabSwitcher.vue';
import { reactive, ref, watch } from 'vue';
import { runDiskSchedulingAlgorithm } from '@/composables/disk-scheduling';
import EmptySpace from '@/components/general/EmptySpace.vue';
import SeekTimeGraph from '@/components/algorithms/disk-scheduling/SeekTimeGraph.vue';

const form = ref(null);

// Initialize sample data
const diskRequests = reactive([98, 183, 37, 122, 14, 124, 65, 67]);
const headPosition = ref(53);
const headDirection = ref('left');
const MAX_REQUEST = 199;
const MIN_REQUEST = 0;

// Store results and keep track of algorithm state
const algResults = reactive({
  orderedRequests: null,
  totalSeekTime: null,
});
const hasAlgorithmBeenRan = ref(false);

// Hide results
watch([diskRequests, headPosition, headDirection], () => {
  hasAlgorithmBeenRan.value = false;
});

const addRow = () => {
  const randomRequest = Math.round(Math.random() * MAX_REQUEST);
  diskRequests.push(randomRequest);
};

const removeRow = (index) => {
  diskRequests.splice(index, 1);
};

const runAlgorithm = () => {
  const isFormValid = form.value.checkValidity();
  if (!isFormValid) return form.value.reportValidity();

  // Run the algorithm
  const { orderedRequests, totalSeekTime } = runDiskSchedulingAlgorithm(
    headPosition.value,
    diskRequests.slice(),
    "scan",
    headDirection.value
  );
  algResults.orderedRequests = orderedRequests;
  algResults.totalSeekTime = totalSeekTime;

  // Display results
  hasAlgorithmBeenRan.value = true;
}

</script>